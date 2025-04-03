import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import ProductDetailsInfo from "../ProductDetailsInfo";

describe("ProductDetailsInfo", () => {
  test("renders product details with correct price and attributes when in_stock is string 'true'", () => {
    const dummyProduct = {
      id: 1,
      attributes: [
        { code: "price", value: 199.99 },
        { code: "color", value: "Blue" },
        { code: "material", value: "Leather" },
        { code: "in_stock", value: "true" }
      ]
    };

    const { container } = render(
      <ProductDetailsInfo attributes={dummyProduct.attributes} />
    );

    expect(screen.getByText("€199.99")).toBeInTheDocument();
    expect(screen.getByText("Product Details")).toBeInTheDocument();
    expect(screen.getByText("color")).toBeInTheDocument();
    expect(screen.getByText("Blue")).toBeInTheDocument();
    expect(screen.getByText("material")).toBeInTheDocument();
    expect(screen.getByText("Leather")).toBeInTheDocument();
    expect(screen.getByText("in_stock")).toBeInTheDocument();
    expect(screen.getByText("true")).toBeInTheDocument();
    expect(container.querySelectorAll(".ant-divider").length).toBe(2);
  });

  test("renders 'Yes' for In Stock when product attribute returns boolean true", () => {
    const dummyProduct = {
      id: 2,
      attributes: [
        { code: "price", value: 59.99 },
        { code: "color", value: "Yellow" },
        { code: "material", value: "Silk" },
        { code: "in_stock", value: true }
      ]
    };

    render(<ProductDetailsInfo attributes={dummyProduct.attributes} />);
    expect(screen.getByText("€59.99")).toBeInTheDocument();
    expect(screen.getByText("Yes")).toBeInTheDocument();
  });

  test("renders 'No' for In Stock when product attribute returns boolean false", () => {
    const dummyProduct = {
      id: 3,
      attributes: [
        { code: "price", value: 49.99 },
        { code: "color", value: "Green" },
        { code: "material", value: "Cotton" },
        { code: "in_stock", value: false }
      ]
    };

    render(<ProductDetailsInfo attributes={dummyProduct.attributes} />);
    expect(screen.getByText("€49.99")).toBeInTheDocument();
    expect(screen.getByText("No")).toBeInTheDocument();
  });
});