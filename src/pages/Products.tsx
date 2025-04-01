import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useVh from "../hooks/useVh";

import { Table, Pagination, Skeleton, Breadcrumb } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { Category, Product } from "../types/common";
import type { SorterResult } from "antd/es/table/interface";

import styled from "styled-components";

import { ProductOutlined } from "@ant-design/icons";
import { NAVBAR_HEIGHT } from "../constants/dimensions";

import PageSizeSelector from "../components/PageSizeSelector";

import { useFetchProductsQuery } from "../redux/products/productsApi";


// Helper functions to get price
const getPrice = (record: Product): number => {
  const priceAttr = record.attributes.find((attr) => attr.code === "price");
  return typeof priceAttr?.value === "number" ? priceAttr.value : 0;
};

// Helper function to get in stock status
const getInStock = (record: Product): boolean => {
  const inStockAttr = record.attributes.find(
    (attr) => attr.code === "in_stock"
  );
  return typeof inStockAttr?.value === "boolean" ? inStockAttr.value : false;
};

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  box-sizing: border-box;
  height: calc(var(--vh, 1vh) * 100 - ${NAVBAR_HEIGHT} - 130px);
  position: relative;
`;

const StyledTable = styled(Table as React.ComponentType<TableProps<Product>>)`
  width: 100%;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  bottom: 0;
`;

const Products = () => {
  useVh();
  const navigate = useNavigate();
  const { categoryId } = useParams<{ categoryId: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [sortedInfo, setSortedInfo] = useState<SorterResult<Product>>(
    {} as SorterResult<Product>
  );

  const location = useLocation();
  const category = location.state?.category as Category

  const { data: productsResponse, isLoading } = useFetchProductsQuery();

  if (isLoading || !productsResponse || !categoryId) {
    return (
      <div style={{ position: "relative", height: "400px" }}>
        <TableContainer>
          <Skeleton active paragraph={{ rows: 6 }} />
        </TableContainer>
      </div>
    );
  }
  let productsList: Product[] = Array.isArray(productsResponse)
    ? productsResponse
    : [productsResponse];

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

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const onPageSizeChange = (value: number) => {
    setPageSize(value);
    setCurrentPage(1);
  };

  // Handle table change event
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

  const columns: ColumnsType<Product> = [
    {
      title: "Id",
      width: 70,
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      sortOrder: sortedInfo.columnKey === "id" ? sortedInfo.order : undefined,
    },
    {
      title: "Image",
      key: "image",
      render: (_, record) => (
        <div
          style={{
            width: 60,
            height: 60,
            background: "#f0f0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {record.image_url ? (
            <img
              src={record.image_url}
              alt={record.name}
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          ) : (
            <span>Image</span>
          )}
        </div>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : undefined,
    },
    {
      title: "Price",
      key: "price",
      render: (_, record) => `$${getPrice(record).toFixed(2)}`,
      sorter: (a, b) => getPrice(a) - getPrice(b),
      sortOrder:
        sortedInfo.columnKey === "price" ? sortedInfo.order : undefined,
    },
    {
      title: "In Stock",
      key: "in_stock",
      render: (_, record) => (getInStock(record) ? "Yes" : "No"),
      sorter: (a, b) => {
        const aStock = getInStock(a) ? 1 : 0;
        const bStock = getInStock(b) ? 1 : 0;
        return aStock - bStock;
      },
      sortOrder:
        sortedInfo.columnKey === "in_stock" ? sortedInfo.order : undefined,
    },
    {
      title: "Attributes",
      key: "attributes",
      render: (_, record) => (
        <div>
          {record.attributes
            .filter((attr) => attr.code !== "price" && attr.code !== "in_stock")
            .map((attr) => (
              <div key={attr.code}>
                <strong>{attr.code}:</strong> {String(attr.value)}
              </div>
            ))}
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      align: "right",
      fixed: "right",
      render: (_, record) => (
        <div style={{ textAlign: "right" }}>
          <ProductOutlined
            style={{ fontSize: "24px", cursor: "pointer" }}
            onClick={() =>
              navigate(`/products/${categoryId}/details/${record.id}`, {
                state: { product: record },
              })
            }
          />
        </div>
      ),
    },
  ];

  return (
    <div style={{ position: "relative", height: "400px" }}>
      <Breadcrumb style={{ marginBottom: "16px", padding: "0 16px" }}
      items={[
        {
          title: "Products",
        },
        {
          title: category?.name,
        },
      ]} />
      <TableContainer>
        <StyledTable
          dataSource={currentProducts}
          columns={columns}
          rowKey="id"
          pagination={false}
          onChange={handleTableChange}
          scroll={{
            x: 800,
            scrollToFirstRowOnChange: true,
          }}
          sticky={{ offsetHeader: 0 }}
        />
      </TableContainer>
      <PaginationContainer>
        <PageSizeSelector
          pageSize={pageSize}
          onPageSizeChange={onPageSizeChange}
        />
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={productsList.length}
          onChange={onPageChange}
          showSizeChanger={false}
          showLessItems={true}
        />
      </PaginationContainer>
    </div>
  );
};

export default Products;
