import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import LastUpdatedProduct from "../LastUpdatedProduct";
import { Product } from "../../types/common";

const productWithAllAttributes: Product = {
  id: 11,
  name: "Test Product",
  category_id: 3,
  image_url: "https://example.com/test.jpg",
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
      value: 100,
    },
    {
      code: "in_stock",
      value: false,
    },
    { code: "size", value: "L" },
  ],
};

const productWithoutImage: Product = {
  id: 11,
  name: "No Image Product",
  category_id: 3,
  image_url: "",
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
      value: 100,
    },
    {
      code: "in_stock",
      value: false,
    },
  ],
};

describe("LastUpdatedProduct", () => {
  test("renders product image and product name when image_url is provided", () => {
    render(<LastUpdatedProduct product={productWithAllAttributes} />);
    const productImage = screen.getByRole("img");

    expect(productImage).toHaveAttribute("src", "https://example.com/test.jpg");
    expect(productImage).toHaveAttribute("alt", "Test Product");
    expect(screen.getByText("Test Product")).toBeInTheDocument();
  });

  test("renders price attribute row with euro sign", () => {
    render(<LastUpdatedProduct product={productWithAllAttributes} />);

    expect(screen.getByText("Price")).toBeInTheDocument();
    expect(screen.getByText("€100")).toBeInTheDocument();
  });

  test("renders non-price attribute rows correctly", () => {
    render(<LastUpdatedProduct product={productWithAllAttributes} />);

    expect(screen.getByText("color")).toBeInTheDocument();
    expect(screen.getByText("red")).toBeInTheDocument();
    expect(screen.getByText("size")).toBeInTheDocument();
    expect(screen.getByText("L")).toBeInTheDocument();
  });

  test("does not render product image when image_url is not provided", () => {
    render(<LastUpdatedProduct product={productWithoutImage} />);

    expect(screen.queryByRole("img")).toBeNull();
    expect(screen.getByText("No Image Product")).toBeInTheDocument();
  });
});
