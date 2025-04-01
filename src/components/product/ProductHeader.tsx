import { Divider, Typography } from "antd";
import { Category, Product } from "../../types/common";

const { Title, Text } = Typography;
interface ProductHeaderProps {
  product: Product;
  category?: Category;
}

const ProductHeader = ({ product, category }: ProductHeaderProps) => {
  return (
    <>
      <Title level={2}>{product.name}</Title>
      <Text type="secondary">Category: {category?.name}</Text>
      <Divider />
    </>
  );
};
export default ProductHeader;
