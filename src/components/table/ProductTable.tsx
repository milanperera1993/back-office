import styled from "styled-components";
import { ColumnsType, SorterResult } from "antd/es/table/interface";
import { Product } from "../../types/common";
import { Table, TableProps } from "antd";
import { getInStock, getPrice } from "../../utils/common";
import { ProductOutlined } from "@ant-design/icons";

import { NAVBAR_HEIGHT } from "../../constants/dimensions";

interface ProductTableProps {
  products: Product[];
  sortedInfo: SorterResult<Product>;
  onTableChange: TableProps<Product>["onChange"];
  onProductClick: (product: Product) => void;
}

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  box-sizing: border-box;
  height: calc(var(--vh, 1vh) * 100 - ${NAVBAR_HEIGHT} - 160px);
  position: relative;

  @media (max-width: 768px) {
    height: calc(var(--vh, 1vh) * 100 - ${NAVBAR_HEIGHT} - 140px);
  }
`;

const StyledTable = styled(
  Table as React.ComponentType<TableProps<Product>>
)`
  width: 100%;
`;

const ProductTable = ({products, sortedInfo, onTableChange, onProductClick}: ProductTableProps) => {
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
      render: (_, record: Product) => (
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
      sortOrder:
        sortedInfo.columnKey === "name" ? sortedInfo.order : undefined,
    },
    {
      title: "Price",
      key: "price",
      render: (_, record: Product) =>
        `$${getPrice(record).toFixed(2)}`,
      sorter: (a, b) => getPrice(a) - getPrice(b),
      sortOrder:
        sortedInfo.columnKey === "price" ? sortedInfo.order : undefined,
    },
    {
      title: "In Stock",
      key: "in_stock",
      render: (_, record: Product) =>
        getInStock(record) ? "Yes" : "No",
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
      render: (_, record: Product) => (
        <div data-testid="attributes-cell">
          {record.attributes
            .filter(
              (attr) => attr.code !== "price" && attr.code !== "in_stock"
            )
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
      render: (_, record: Product) => (
        <div style={{ textAlign: "right" }}>
          <ProductOutlined
            style={{ fontSize: "24px", cursor: "pointer" }}
            onClick={() => onProductClick(record)}
          />
        </div>
      ),
    },
  ];

  return (
    <TableContainer>
      <StyledTable
        dataSource={products}
        columns={columns}
        rowKey="id"
        pagination={false}
        onChange={onTableChange}
        scroll={{
          x: 800,
          scrollToFirstRowOnChange: true,
        }}
        sticky={{ offsetHeader: 0 }}
      />
    </TableContainer>
  );
}
export default ProductTable