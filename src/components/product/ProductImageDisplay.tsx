import styled from "styled-components";

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

interface ProductImageDisplayProps {
  imageUrl: string;
  alt: string;
}

const ProductImageDisplay = ({ imageUrl, alt }: ProductImageDisplayProps) => {
  return (
    <ProductImageWrapper>
      <ProductImage src={imageUrl} alt={alt} />
    </ProductImageWrapper>
  );
};
export default ProductImageDisplay;
