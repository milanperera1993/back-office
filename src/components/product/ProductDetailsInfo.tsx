import styled from "styled-components";
import { Descriptions, Divider, Typography } from "antd";

const { Text } = Typography;

const Price = styled(Text)`
  font-size: 28px;
  font-weight: bold;
  color: #ff4d4f;
`;

interface ProductDetailsInfoProps {
  getAttribute: (code: string) => string | number | boolean;
}

const ProductDetailsInfo = ({getAttribute}: ProductDetailsInfoProps) => {
  return (
    <>
    <Price>€{getAttribute("price")}</Price>
    <Divider />
    <Descriptions title="Product Details" bordered column={1} size="small">
      <Descriptions.Item label="Color">
        {getAttribute("color")}
      </Descriptions.Item>
      <Descriptions.Item label="Material">
        {getAttribute("material")}
      </Descriptions.Item>
      <Descriptions.Item label="In Stock">
        {getAttribute("in_stock") === "true" ||
        getAttribute("in_stock") === true
          ? "Yes"
          : "No"}
      </Descriptions.Item>
    </Descriptions>
    <Divider />
  </>
  )
}
export default ProductDetailsInfo