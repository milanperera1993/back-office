import {
  Row,
  Col,
  Typography,
  Button,
  Divider,
  Descriptions,
  Grid,
  Layout,
  Form,
  Input,
  Switch,
  notification,
} from "antd";
import styled from "styled-components";
import { NAVBAR_HEIGHT } from "../constants/dimensions";
import useVh from "../hooks/useVh";
import { useLocation, useNavigate } from "react-router-dom";
import { Category, Product } from "../types/common";
import { useEffect, useState } from "react";
import {
  useFetchProductByIdQuery,
  useUpdateProductMutation,
} from "../redux/products/productsApi";

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

const FixedActionContainer = styled.div`
  position: fixed;
  bottom: 16px;
  left: 0;
  right: 0;
  padding: 0 16px;
  z-index: 1000;
  display: flex;
  gap: 8px;
`;

const EmptyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(var(--vh, 1vh) * 100 - ${NAVBAR_HEIGHT} - 48px);
`;

interface ProductFormValues {
  color: string;
  material: string;
  in_stock: boolean;
}

const ProductDetails = () => {
  useVh();
  const location = useLocation();
  const navigate = useNavigate();

  const initialProduct = location.state?.product as Product;
  const category = location.state?.category as Category;

  const [product, setProduct] = useState<Product>(initialProduct);

  const [updateProduct, { isLoading }] = useUpdateProductMutation();
  const { data: fetchedProduct, refetch } = useFetchProductByIdQuery(
    product.id
  );

  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const [notificationApi, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (fetchedProduct) {
      setProduct(fetchedProduct);
    }
  }, [fetchedProduct]);

  const [editing, setEditing] = useState(false);
  const [form] = Form.useForm();

  // Helper function to get attribute value by code
  const getAttribute = (code: string) => {
    const attr = product.attributes.find((a) => a.code === code);
    return attr ? attr.value : "";
  };

  // Toggle to edit mode and set initial form values
  const handleEditClick = () => {
    form.setFieldsValue({
      color: getAttribute("color"),
      material: getAttribute("material"),
      in_stock:
        getAttribute("in_stock") === "true" ||
        getAttribute("in_stock") === true,
    });
    setEditing(true);
  };

  // Save updated values
  const handleSave = async (values: ProductFormValues) => {
    const updatedProduct: Product = {
      ...product,
      attributes: product.attributes.map((attr) => {
        if (attr.code === "color") {
          return { ...attr, value: values.color };
        }
        if (attr.code === "material") {
          return { ...attr, value: values.material };
        }
        if (attr.code === "in_stock") {
          return { ...attr, value: values.in_stock };
        }
        return attr;
      }),
    };

    try {
      const updated = await updateProduct(updatedProduct).unwrap();
      setProduct(updated);
      notificationApi.success({
        message: "Success",
        description: "Product successfully updated",
        placement: "topRight",
      });
      refetch();
      navigate(location.pathname, {
        replace: true,
        state: { ...location.state, product: updated },
      });
    } catch (error) {
      console.error("Failed to update product:", error);
      notificationApi.success({
        message: "Error",
        description: "Failed to update product",
        placement: "topRight",
      });
    } finally {
      setEditing(false);
    }
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
      {contextHolder}
      <ProductContainer>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <ProductImageWrapper>
              <ProductImage src={product.image_url} alt="Product" />
            </ProductImageWrapper>
          </Col>
          <Col xs={24} md={12}>
            <ProductInfo>
              <Title level={2}>{product.name}</Title>
              <Text type="secondary">Category: {category?.name}</Text>
              <Divider />
              <Price>€{getAttribute("price")}</Price>
              <Divider />
              {editing ? (
                <Form form={form} layout="vertical" onFinish={handleSave}>
                  <Form.Item
                    label="Color"
                    name="color"
                    rules={[
                      { required: true, message: "Please input the color!" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Material"
                    name="material"
                    rules={[
                      { required: true, message: "Please input the material!" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="In Stock"
                    name="in_stock"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                  {!isMobile && (
                    <div
                      style={{
                        display: "flex",
                        gap: "16px",
                        marginTop: "16px",
                      }}
                    >
                      <StyledButton
                        type="primary"
                        htmlType="submit"
                        style={{ flex: 1 }}
                        size="large"
                        disabled={isLoading}
                      >
                        Save
                      </StyledButton>
                      <StyledButton
                        size="large"
                        onClick={() => setEditing(false)}
                        style={{ flex: 1 }}
                        disabled={isLoading}
                      >
                        Cancel
                      </StyledButton>
                    </div>
                  )}
                </Form>
              ) : (
                <>
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
                      {getAttribute("in_stock") === "true" ||
                      getAttribute("in_stock") === true
                        ? "Yes"
                        : "No"}
                    </Descriptions.Item>
                  </Descriptions>
                  <Divider />
                  <StyledButton
                    type="primary"
                    size="large"
                    onClick={handleEditClick}
                    disabled={isLoading}
                  >
                    Edit Product
                  </StyledButton>
                </>
              )}
            </ProductInfo>
          </Col>
        </Row>
      </ProductContainer>
      {isMobile && editing && (
        <FixedActionContainer>
          <Button
            type="primary"
            size="large"
            onClick={() => form.submit()}
            block
            disabled={isLoading}
          >
            Save
          </Button>
          <Button
            size="large"
            onClick={() => setEditing(false)}
            block
            disabled={isLoading}
          >
            Cancel
          </Button>
        </FixedActionContainer>
      )}
      {isMobile && !editing && (
        <FixedEditButton
          type="primary"
          size="large"
          onClick={handleEditClick}
          disabled={isLoading}
        >
          Edit Product
        </FixedEditButton>
      )}
    </>
  );
};

export default ProductDetails;
