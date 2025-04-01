import React, { useState } from "react";
import { Table, Pagination } from "antd";
import type { ColumnsType } from "antd/es/table";
import styled from "styled-components";
import { Product } from "../types/Product";

const products: Product[] = [
  {
    id: 1,
    name: "Modern Leather Sofa",
    category_id: 3,
    attributes: [
      { code: "color", value: "brown" },
      { code: "material", value: "leather" },
      { code: "price", value: 999.99 },
      { code: "in_stock", value: true },
    ],
  },
  {
    id: 2,
    name: "Glass Coffee Table",
    category_id: 4,
    attributes: [
      { code: "color", value: "transparent" },
      { code: "dimensions", value: "120x60x45 cm" },
      { code: "price", value: 299.99 },
      { code: "in_stock", value: false },
    ],
  },
  {
    id: 3,
    name: "Glass Coffee Table",
    category_id: 4,
    attributes: [
      { code: "color", value: "transparent" },
      { code: "dimensions", value: "120x60x45 cm" },
      { code: "price", value: 299.99 },
      { code: "in_stock", value: false },
    ],
  },
  {
    id: 4,
    name: "Glass Coffee Table",
    category_id: 4,
    attributes: [
      { code: "color", value: "transparent" },
      { code: "dimensions", value: "120x60x45 cm" },
      { code: "price", value: 299.99 },
      { code: "in_stock", value: false },
    ],
  },
  {
    id: 5,
    name: "Glass Coffee Table",
    category_id: 4,
    attributes: [
      { code: "color", value: "transparent" },
      { code: "dimensions", value: "120x60x45 cm" },
      { code: "price", value: 299.99 },
      { code: "in_stock", value: false },
    ],
  },
  {
    id: 6,
    name: "Glass Coffee Table",
    category_id: 4,
    attributes: [
      { code: "color", value: "transparent" },
      { code: "dimensions", value: "120x60x45 cm" },
      { code: "price", value: 299.99 },
      { code: "in_stock", value: false },
    ],
  },
  {
    id: 7,
    name: "Glass Coffee Table",
    category_id: 4,
    attributes: [
      { code: "color", value: "transparent" },
      { code: "dimensions", value: "120x60x45 cm" },
      { code: "price", value: 299.99 },
      { code: "in_stock", value: false },
    ],
  },
];

const getPrice = (record: Product): number => {
  const priceAttr = record.attributes.find((attr) => attr.code === "price");
  return typeof priceAttr?.value === "number" ? priceAttr.value : 0;
};

const getInStock = (record: Product): boolean => {
  const inStockAttr = record.attributes.find(
    (attr) => attr.code === "in_stock"
  );
  return typeof inStockAttr?.value === "boolean" ? inStockAttr.value : false;
};

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  padding: 16px; /* optional padding */
  box-sizing: border-box;
  height: calc(100vh - 180px); /* Adjust height to fit within parent */
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: right;
  margin-top: 16px;
  bottom: 0;
`;

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentProducts = products.slice(startIndex, endIndex);
  const columns: ColumnsType<Product> = [
    {
      title: "Image",
      key: "image",
      render: () => (
        <div
          style={{
            width: 80,
            height: 80,
            background: "#f0f0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span>Image</span>
        </div>
      ),
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Price",
      key: "price",
      render: (_, record) => `$${getPrice(record).toFixed(2)}`,
      sorter: (a, b) => getPrice(a) - getPrice(b),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "In Stock",
      key: "in_stock",
      render: (_, record) => (getInStock(record) ? "Yes" : "No"),
      sorter: (a, b) => {
        const aInStock = getInStock(a) ? 1 : 0;
        const bInStock = getInStock(b) ? 1 : 0;
        return aInStock - bInStock;
      },
      sortDirections: ["ascend", "descend"],
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
  ];

  return (
    <div style={{ position: "relative", height: "400px" }}>
      <TableContainer>
        <Table
          dataSource={currentProducts}
          columns={columns}
          rowKey="id"
          pagination={false}
        />
      </TableContainer>
      <PaginationContainer>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={products.length}
          onChange={onPageChange}
        />
      </PaginationContainer>
    </div>
  );
}
export default Products;
