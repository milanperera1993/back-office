import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  Suspense,
} from "react";
import {
  Row,
  Col,
  Typography,
  Button,
  Divider,
  Grid,
  Layout,
  Form,
  notification,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { NAVBAR_HEIGHT } from "../constants/dimensions";
import useVh from "../hooks/useVh";
import { useLocation, useNavigate } from "react-router-dom";
import { Category, Product } from "../types/common";
import {
  useFetchProductByIdQuery,
  useUpdateProductMutation,
} from "../redux/products/productsApi";
import { useDispatch } from "react-redux";
import { setUpdatedProduct } from "../redux/products/productSlice";
import ProductImageDisplay from "../components/product/ProductImageDisplay";
import ProductHeader from "../components/product/ProductHeader";
import ProductDetailsInfo from "../components/product/ProductDetailsInfo";
import LoadingSpinner from "../components/LoadingSpinner";

// Lazy load components used conditionally
const ProductEditForm = React.lazy(
  () => import("../components/product/ProductEditForm")
);
const MobileFixedActions = React.lazy(
  () => import("../components/product/MobileFixedActions")
);

const { Text } = Typography;
const { useBreakpoint } = Grid;


const BackButton = styled(Button)`
  position: absolute;
  top: 16px;
  left: 0px;
  height: 40px;
  width: 40px !important;
  z-index: 1000;
  font-size: 24px;
  padding: 16px
`;

const ProductContainer = styled.div`
  margin: 0 auto;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  height: calc(var(--vh, 1vh) * 100 - ${NAVBAR_HEIGHT} - 100px);
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
    height: calc(var(--vh, 1vh) * 100 - ${NAVBAR_HEIGHT} - 60px);
  }
`;

const ProductInfo = styled.div`
  padding: 0 16px;
`;

const Price = styled(Text)`
  font-size: 28px;
  font-weight: bold;
  color: #ff4d4f;
`;

export const StyledButton = styled(Button)`
  width: 100%;

  @media (max-width: 768px) {
    display: none; /* Hide inline button on smaller screens */
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

// Updated form interface
export interface ProductFormValues {
  attributes?: { code: string; value: string | number | boolean }[];
}

const ProductDetails = () => {
  useVh();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialProduct = location.state?.product as Product;
  const category = location.state?.category as Category;
  const [product, setProduct] = useState<Product>(initialProduct);
  const [editing, setEditing] = useState<boolean>(false);
  const [form] = Form.useForm<ProductFormValues>();

  const [updateProduct, { isLoading }] = useUpdateProductMutation();
  const { data: fetchedProduct, refetch } = useFetchProductByIdQuery(product.id);

  const [notificationApi, contextHolder] = notification.useNotification();
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  // Create a mapping of attribute codes to values for easy lookup
  const attributesMap = useMemo(() => {
    return product.attributes.reduce<Record<string, string | number | boolean>>((acc, attr) => {
      acc[attr.code] = attr.value;
      return acc;
    }, {});
  }, [product.attributes]);

  const getAttribute = useCallback(
    (code: string): string | number | boolean => {
      return attributesMap[code] ?? "";
    },
    [attributesMap]
  );

  useEffect(() => {
    if (fetchedProduct) {
      setProduct(fetchedProduct);
    }
  }, [fetchedProduct]);

  // Handler to toggle edit mode and set form values with attributes array
  const handleEditClick = useCallback((): void => {
    form.setFieldsValue({
      attributes: product.attributes,
    });
    setEditing(true);
  }, [form, product.attributes]);

  // Save updated product data using the dynamic attributes
  const handleSave = useCallback(
    async (values: ProductFormValues): Promise<void> => {
      const updatedProduct: Product = {
        ...product,
        attributes: values.attributes ?? [],
      };

      try {
        const updated = await updateProduct(updatedProduct).unwrap();
        setProduct(updated);
        dispatch(setUpdatedProduct(updated));
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
        notificationApi.error({
          message: "Error",
          description: "Failed to update product",
          placement: "topRight",
        });
      } finally {
        setEditing(false);
      }
    },
    [product, updateProduct, dispatch, notificationApi, refetch, navigate, location]
  );

  const handleCancelEdit = useCallback((): void => {
    setEditing(false);
  }, []);

  const handleMobileSave = useCallback((): void => {
    form.submit();
  }, [form]);

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
      <BackButton
          type="default"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
        >
        </BackButton>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <ProductImageDisplay
              imageUrl={product.image_url || ""}
              alt="Product"
            />
          </Col>
          <Col xs={24} md={12}>
            <ProductInfo>
              {!editing && (
                <>
                  <ProductHeader product={product} category={category} />
                  <ProductDetailsInfo attributes={product.attributes} />
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

              {/* Always mount the edit form but hide it when not editing */}
              <div style={{ display: editing ? "block" : "none" }}>
                <Price>€{getAttribute("price")}</Price>
                <Divider />
                <Suspense fallback={<LoadingSpinner />}>
                  <ProductEditForm
                    form={form}
                    isLoading={isLoading}
                    onFinish={handleSave}
                    showInlineButtons={!isMobile}
                    onCancel={handleCancelEdit}
                  />
                </Suspense>
              </div>
            </ProductInfo>
          </Col>
        </Row>
      </ProductContainer>
      {isMobile && editing && (
        <Suspense fallback={<LoadingSpinner />}>
          <MobileFixedActions
            isLoading={isLoading}
            onSave={handleMobileSave}
            onCancel={handleCancelEdit}
          />
        </Suspense>
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
