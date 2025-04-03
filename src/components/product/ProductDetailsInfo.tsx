import styled from "styled-components";
import { Descriptions, Divider, Typography } from "antd";
import { AttributeValue } from "../../types/common";

const { Text } = Typography;

const Price = styled(Text)`
  font-size: 28px;
  font-weight: bold;
  color: #ff4d4f;
`;


interface ProductDetailsInfoProps {
  attributes: AttributeValue[];
}

const ProductDetailsInfo = ({ attributes }: ProductDetailsInfoProps) => {
  const priceAttr = attributes.find(attr => attr.code === "price");
  const otherAttributes = attributes.filter(attr => attr.code !== "price");

  const formatValue = (value: string | number | boolean) => {
    return typeof value === "boolean" ? (value ? "Yes" : "No") : value;
  };

  return (
    <>
      {priceAttr && <Price>€{priceAttr.value}</Price>}
      <Divider />
      <Descriptions title="Product Details" bordered column={1} size="small">
        {otherAttributes.map(attr => (
          <Descriptions.Item key={attr.code} label={attr.code}>
            {formatValue(attr.value)}
          </Descriptions.Item>
        ))}
      </Descriptions>
      <Divider />
    </>
  );
};

export default ProductDetailsInfo;
