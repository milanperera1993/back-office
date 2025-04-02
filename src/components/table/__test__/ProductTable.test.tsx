import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent, within } from "@testing-library/react";
import ProductTable from "../ProductTable";
import { Product } from "../../../types/common";
import { SorterResult } from "antd/es/table/interface";

jest.mock("@ant-design/icons", () => ({
  ProductOutlined: (props: React.SVGProps<SVGSVGElement>) => (
    <svg data-testid="product-icon" onClick={props.onClick} />
  ),
}));

const dummyProduct: Product = {
  id: 11,
  name: "Smart TV Model 1",
  category_id: 3,
  image_url:
    "https://cdn1.home24.net/images/media/catalog/product/1000x1000/png/w/u/wuerfelregal-grapwood-eiche-massiv-3079897.avif",
  attributes: [
    {
      code: "color",
      value: "red",
    },
    {
      code: "material",
      value: "plastic1",
    },
    {
      code: "price",
      value: 107.53,
    },
    {
      code: "in_stock",
      value: false,
    },
  ],
};

const dummyProducts: Product[] = [dummyProduct];

const sortedInfo: SorterResult<Product> = {
  columnKey: "",
  order: undefined,
};

describe("ProductTable", () => {
  test("renders table headers correctly", () => {
    render(
      <ProductTable
        products={dummyProducts}
        sortedInfo={sortedInfo}
        onTableChange={() => {}}
        onProductClick={() => {}}
      />
    );

    expect(screen.getByText("Id")).toBeInTheDocument();
    expect(screen.getByText("Image")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Price")).toBeInTheDocument();
    expect(screen.getByText("In Stock")).toBeInTheDocument();
    expect(screen.getByText("Attributes")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
  });

  test("calls onProductClick when action icon is clicked", () => {
    const onProductClickMock = jest.fn();

    const { getByTestId } = render(
      <ProductTable
        products={dummyProducts}
        sortedInfo={sortedInfo}
        onTableChange={() => {}}
        onProductClick={onProductClickMock}
      />
    );

    const actionIcon = getByTestId("product-icon");
    fireEvent.click(actionIcon);

    expect(onProductClickMock).toHaveBeenCalledTimes(1);
    expect(onProductClickMock).toHaveBeenCalledWith(dummyProduct);
  });
  
  test("renders product image when image_url is provided", () => {
    const productWithImage = {
      ...dummyProduct,
      image_url: "https://example.com/image.jpg",
    };
    render(
      <ProductTable
        products={[productWithImage]}
        sortedInfo={sortedInfo}
        onTableChange={() => {}}
        onProductClick={() => {}}
      />
    );
    
    expect(screen.getByAltText(productWithImage.name)).toHaveAttribute(
      "src",
      productWithImage.image_url
    );
  });

  test("renders only non-filtered attributes", () => {
    const productWithAttributes = {
      ...dummyProduct,
      attributes: [
        { code: "color", value: "blue" },
        { code: "size", value: "large" },
        { code: "price", value: 123.45 },
        { code: "in_stock", value: true },
      ],
    };

    render(
      <ProductTable
        products={[productWithAttributes]}
        sortedInfo={sortedInfo}
        onTableChange={() => {}}
        onProductClick={() => {}}
      />
    );

    const attributesCell = screen.getByTestId("attributes-cell");
    expect(attributesCell).toBeInTheDocument();

    expect(within(attributesCell).queryByText(/price/i)).toBeNull();
    expect(within(attributesCell).queryByText(/in_stock/i)).toBeNull();
  });
});
