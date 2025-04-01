import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Breadcrumb } from "antd";
import type { TableProps } from "antd/es/table";
import type { SorterResult } from "antd/es/table/interface";
import { useFetchProductsQuery } from "../redux/products/productsApi";
import useVh from "../hooks/useVh";
import type { Product, Category } from "../types/common";
import LoadingSpinner from "../components/LoadingSpinner";
import ProductTable from "../components/table/ProductTable";
import PaginationControls from "../components/table/PaginationControls";
import { getInStock, getPrice } from "../utils/common";

const Products: React.FC = () => {
  useVh();
  const navigate = useNavigate();
  const { categoryId } = useParams<{ categoryId: string }>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(25);
  const [sortedInfo, setSortedInfo] = useState<SorterResult<Product>>(
    {} as SorterResult<Product>
  );

  const location = useLocation();
  const category = location.state?.category as Category | undefined;

  const { data: productsResponse, isLoading } = useFetchProductsQuery();

  if (isLoading || !productsResponse || !categoryId) {
    return <LoadingSpinner />;
  }

  let productsList: Product[] = Array.isArray(productsResponse)
    ? productsResponse
    : [productsResponse];

  // Optionally filter products by category if categoryId isn't "2" to show all products
  if (categoryId !== "2") {
    productsList = productsList.filter(
      (product) => product.category_id === Number(categoryId)
    );
  }

  // Sort products based on sortedInfo
  const sortedProducts = [...productsList];
  if (sortedInfo && sortedInfo.order && sortedInfo.columnKey) {
    sortedProducts.sort((a, b) => {
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

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  // Handlers
  const handleTableChange: TableProps<Product>["onChange"] = (
    _pagination,
    _filters,
    sorter
  ) => {
    if (Array.isArray(sorter)) {
      setSortedInfo(sorter[0]);
    } else {
      setSortedInfo(sorter);
    }
  };

  const handleProductClick = (product: Product) => {
    navigate(`/products/${categoryId}/details/${product.id}`, {
      state: { product, category },
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
    setCurrentPage(1);
  };

  return (
    <div style={{ position: "relative", height: "400px" }}>
      <Breadcrumb
        style={{ marginBottom: "16px", padding: "0 16px" }}
        items={[{ title: "Products" }, { title: category?.name }]}
      />
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
    </div>
  );
};

export default Products;
