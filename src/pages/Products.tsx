import { useState } from "react";
import useVh from "../hooks/useVh";
import { Table, Pagination, Select } from "antd";
import type { ColumnsType } from "antd/es/table";
import styled from "styled-components";

import { Product } from "../types/Product";
import { ProductOutlined } from "@ant-design/icons";
import { NAVBAR_HEIGHT } from "../constants/dimensions";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

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
  box-sizing: border-box;
  height: calc(var(--vh, 1vh) * 100 - ${NAVBAR_HEIGHT} - 100px);
  position: relative;
`;

interface StyledTableProps {
  columns: ColumnsType<Product>;
}

const StyledTable = styled(Table)<StyledTableProps>`
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
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const onPageSizeChange = (value: number) => {
    setPageSize(value);
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentProducts = products.slice(startIndex, endIndex);

  const columns: ColumnsType<Product> = [
    {
      title: "Id",
      width: 70,
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Image",
      key: "image",
      render: () => (
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
          <span>Image</span>
        </div>
      ),
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
    {
      title: "Actions",
      key: "actions",
      width: 100,
      align:"right",
      fixed: "right",
      render: (_, record) => (
        <div style={{ textAlign: "right" }}>
          <ProductOutlined
            style={{ fontSize: "24px", cursor: "pointer" }}
            onClick={() =>
              navigate(`/product/${record.id}`, {
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
      <TableContainer>
        <StyledTable
          dataSource={currentProducts}
          columns={columns}
          rowKey="id"
          pagination={false}
          scroll={{
            x: 800,
            scrollToFirstRowOnChange: true,
          }}
          sticky={{ offsetHeader: 0 }}
        />
      </TableContainer>
      <PaginationContainer>
        <div>
          <Select
            defaultValue={pageSize}
            onChange={onPageSizeChange}
            style={{ width: 80 }}
          >
            <Option value={5}>5 / page</Option>
            <Option value={10}>10 / page</Option>
            <Option value={25}>25 / page</Option>
            <Option value={50}>50 / page</Option>
          </Select>
        </div>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={products.length}
          onChange={onPageChange}
        />
      </PaginationContainer>
    </div>
  );
};

export default Products;
