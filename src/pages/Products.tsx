import { useState } from "react";
import useVh from "../hooks/useVh";
import { Table, Pagination } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import styled from "styled-components";
import type { SorterResult } from "antd/es/table/interface";

import { Product } from "../types/common";
import { ProductOutlined } from "@ant-design/icons";
import { NAVBAR_HEIGHT } from "../constants/dimensions";
import { useNavigate } from "react-router-dom";
import PageSizeSelector from "../components/PageSizeSelector";

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
      { code: "price", value: 1999.99 },
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
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const [sortedInfo, setSortedInfo] = useState<SorterResult<Product>>(
    {} as SorterResult<Product>
  );

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const onPageSizeChange = (value: number) => {
    setPageSize(value);
    setCurrentPage(1);
  };

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

  const sortedProducts = [...products];
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
              navigate(`/products/${record.id}`, {
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
          total={products.length}
          onChange={onPageChange}
        />
      </PaginationContainer>
    </div>
  );
};

export default Products;
