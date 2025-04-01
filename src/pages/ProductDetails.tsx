import {
  Row,
  Col,
  Typography,
  Button,
  Divider,
  Descriptions,
  Grid,
  Layout,
} from "antd";
import styled from "styled-components";
import { NAVBAR_HEIGHT } from "../constants/dimensions";
import useVh from "../hooks/useVh";
import { useLocation } from "react-router-dom";
import { Product } from "../types/common";

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const ProductContainer = styled.div`
  margin: 0 auto;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  height: calc(var(--vh, 1vh) * 100 - ${NAVBAR_HEIGHT} - 48px);
  position: relative;
  max-width: 1200px;
  padding: 0 16px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    align-items: flex-start;
    padding-top: 16px;
    padding-bottom: 48px;
  }
`;

const ProductImageWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  border-radius: 8px;
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const ProductInfo = styled.div`
  padding: 0 16px;
`;

const Price = styled(Text)`
  font-size: 28px;
  font-weight: bold;
  color: #ff4d4f;
`;

const StyledButton = styled(Button)`
  margin-top: 20px;
  width: 100%;

  @media (max-width: 768px) {
    display: none; /* hide inline button on smaller screens */
  }
`;

const FixedEditButton = styled(Button)`
  position: fixed;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  width: 90%;

  @media (min-width: 769px) {
    display: none;
  }
`;

const EmptyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(var(--vh, 1vh) * 100 - ${NAVBAR_HEIGHT} - 48px);
`;

const ProductDetails = () => {
  useVh();
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const location = useLocation();
  const product = location.state?.product as Product;

  // Helper function to get attribute value by code
  const getAttribute = (code: string) => {
    const attr = product.attributes.find((a) => a.code === code);
    return attr ? attr.value : "";
  };

  if (!product) {
    return (
      <Layout>
        <EmptyContainer>
          <h2>No product details available.</h2>
        </EmptyContainer>
      </Layout>
    );
  }

  return (
    <>
      <ProductContainer>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <ProductImageWrapper>
              <ProductImage
                src="https://cdn1.home24.net/images/media/catalog/product/1000x1000/jpg/c/c/cc7b691811bf4a308a4284b667928563.avif"
                alt="Product"
              />
            </ProductImageWrapper>
          </Col>
          <Col xs={24} md={12}>
            <ProductInfo>
              <Title level={2}>{product.name}</Title>
              <Text type="secondary">Category: Furniture</Text>
              <Divider />
              <Price>€{getAttribute("price")}</Price>
              <Divider />
              <Descriptions
                title="Product Details"
                bordered
                column={1}
                size="small"
              >
                <Descriptions.Item label="Color">
                  {getAttribute("color")}
                </Descriptions.Item>
                <Descriptions.Item label="Material">
                  {getAttribute("material")}
                </Descriptions.Item>
                <Descriptions.Item label="In Stock">
                  {getAttribute("in_stock") ? "Yes" : "No"}
                </Descriptions.Item>
              </Descriptions>
              <Divider />
              <StyledButton type="primary" size="large">
                Edit Product
              </StyledButton>
            </ProductInfo>
          </Col>
        </Row>
      </ProductContainer>
      {isMobile && (
        <FixedEditButton type="primary" size="large">
          Edit Product
        </FixedEditButton>
      )}
    </>
  );
};

export default ProductDetails;
