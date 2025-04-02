import React, { useState, useMemo, useCallback, Suspense } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Breadcrumb } from "antd";
import type { TableProps } from "antd/es/table";
import type { SorterResult } from "antd/es/table/interface";
import { useFetchProductsQuery } from "../redux/products/productsApi";
import useVh from "../hooks/useVh";
import type { Product, Category } from "../types/common";
import LoadingSpinner from "../components/LoadingSpinner";
import { getInStock, getPrice } from "../utils/common";

// Lazy loading for split
const ProductTable = React.lazy(() => import("../components/table/ProductTable"));
const PaginationControls = React.lazy(
  () => import("../components/table/PaginationControls")
);

const Products = () => {
  useVh();
  const navigate = useNavigate();
  const { categoryId } = useParams<{ categoryId: string }>();
  const location = useLocation();

  const category = location.state?.category as Category | undefined;
  const { data: productsResponse, isLoading } = useFetchProductsQuery();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(25);
  const [sortedInfo, setSortedInfo] = useState<SorterResult<Product>>(
    {} as SorterResult<Product>
  );

  // Compute a safe default for productsList even if productsResponse is undefined.
  const productsList: Product[] = useMemo(() => {
    if (!productsResponse) return [];
    const list = Array.isArray(productsResponse)
      ? productsResponse
      : [productsResponse];
    if (categoryId && categoryId !== "2") {
      return list.filter(
        (product) => product.category_id === Number(categoryId)
      );
    }
    return list;
  }, [productsResponse, categoryId]);

  // Memoize sorting to avoid unnecessary recalculations.
  const sortedProducts = useMemo(() => {
    const sorted = [...productsList];
    if (sortedInfo && sortedInfo.order && sortedInfo.columnKey) {
      sorted.sort((a, b) => {
        const key = sortedInfo.columnKey;
        let result = 0;
        if (key === "id") {
          result = a.id - b.id;
        } else if (key === "name") {
          result = a.name.localeCompare(b.name);
        } else if (key === "price") {
          result = getPrice(a) - getPrice(b);
        } else if (key === "in_stock") {
          result = (getInStock(a) ? 1 : 0) - (getInStock(b) ? 1 : 0);
        }
        return sortedInfo.order === "ascend" ? result : -result;
      });
    }
    return sorted;
  }, [productsList, sortedInfo]);

  // Memoize pagination calculations.
  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedProducts.slice(startIndex, startIndex + pageSize);
  }, [sortedProducts, currentPage, pageSize]);


  // Stabilize event handlers using useCallback.
  const handleTableChange = useCallback<NonNullable<TableProps<Product>["onChange"]>>(
    (_pagination, _filters, sorter) => {
      if (Array.isArray(sorter)) {
        setSortedInfo(sorter[0]);
      } else {
        setSortedInfo(sorter);
      }
    },
    []
  );

  const handleProductClick = useCallback(
    (product: Product) => {
      navigate(`/products/${categoryId}/details/${product.id}`, {
        state: { product, category },
      });
    },
    [navigate, categoryId, category]
  );

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handlePageSizeChange = useCallback((value: number) => {
    setPageSize(value);
    setCurrentPage(1);
  }, []);

  
  if (isLoading || !productsResponse || !categoryId) {
    return <LoadingSpinner />;
  }

  return (
    <div style={{ position: "relative", height: "400px" }}>
      <Breadcrumb
        style={{ marginBottom: "16px", padding: "0 16px" }}
        items={[{ title: "Products" }, { title: category?.name }]}
      />
      <Suspense fallback={<LoadingSpinner />}>
        <ProductTable
          products={currentProducts}
          sortedInfo={sortedInfo}
          onTableChange={handleTableChange}
          onProductClick={handleProductClick}
        />
        <PaginationControls
          currentPage={currentPage}
          pageSize={pageSize}
          total={productsList.length}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </Suspense>
    </div>
  );
};

export default Products;
