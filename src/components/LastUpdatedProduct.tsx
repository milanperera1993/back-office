import styled from "styled-components";
import { Product } from "../types/common";

const Container = styled.div`
  padding: 8px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-width: 200px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const ProductImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 4px;
  margin-right: 8px;
`;

const ProductName = styled.h4`
  font-size: 14px;
  margin: 0;
  color: #333;
`;

const AttributesTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  color: #666;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #eee;
`;

const TableCell = styled.td`
  padding: 2px 4px;
  text-align: center;
`;

interface LastUpdatedProductProps {
  product: Product;
}

const LastUpdatedProduct: React.FC<LastUpdatedProductProps> = ({ product }) => {
  const priceAttribute = product.attributes.find((attr) => attr.code === "price");
  const otherAttributes = product.attributes.filter((attr) => attr.code !== "price");

  return (
    <Container>
      <Header>
        {product.image_url && (
          <ProductImage src={product.image_url} alt={product.name} />
        )}
        <ProductName>{product.name}</ProductName>
      </Header>
      <AttributesTable>
        <tbody>
          {priceAttribute && (
            <TableRow>
              <TableCell>Price</TableCell>
              <TableCell>€{priceAttribute.value.toString()}</TableCell>
            </TableRow>
          )}
          {otherAttributes.map((attr) => (
            <TableRow key={attr.code}>
              <TableCell>{attr.code}</TableCell>
              <TableCell>{attr.value.toString()}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </AttributesTable>
    </Container>
  );
};

export default LastUpdatedProduct;