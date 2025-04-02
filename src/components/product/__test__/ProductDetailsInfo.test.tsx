// ProductDetailsInfo.test.tsx
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import ProductDetailsInfo from "../ProductDetailsInfo";

describe("ProductDetailsInfo", () => {
  test("renders product details with correct price and attributes when in_stock is string 'true'", () => {
    const getAttributeMock = jest.fn((code: string) => {
      switch (code) {
        case "price":
          return 199.99;
        case "color":
          return "Blue";
        case "material":
          return "Leather";
        case "in_stock":
          return "true";
        default:
          return "";
      }
    });

    const { container } = render(
      <ProductDetailsInfo getAttribute={getAttributeMock} />
    );

    expect(screen.getByText("€199.99")).toBeInTheDocument();
    expect(screen.getByText("Product Details")).toBeInTheDocument();
    expect(screen.getByText("Color")).toBeInTheDocument();
    expect(screen.getByText("Blue")).toBeInTheDocument();
    expect(screen.getByText("Material")).toBeInTheDocument();
    expect(screen.getByText("Leather")).toBeInTheDocument();
    expect(screen.getByText("In Stock")).toBeInTheDocument();
    expect(screen.getByText("Yes")).toBeInTheDocument();
    expect(container.querySelectorAll(".ant-divider").length).toBe(2);
  });

  test("renders 'Yes' for In Stock when getAttribute returns boolean true", () => {
    const getAttributeMock = jest.fn((code: string) => {
      switch (code) {
        case "price":
          return 59.99;
        case "color":
          return "Yellow";
        case "material":
          return "Silk";
        case "in_stock":
          return true;
        default:
          return "";
      }
    });

    render(<ProductDetailsInfo getAttribute={getAttributeMock} />);
    expect(screen.getByText("€59.99")).toBeInTheDocument();
    expect(screen.getByText("Yes")).toBeInTheDocument();
  });

  test("renders 'No' for In Stock when getAttribute returns false", () => {
    const getAttributeMock = jest.fn((code: string) => {
      switch (code) {
        case "price":
          return 49.99;
        case "color":
          return "Green";
        case "material":
          return "Cotton";
        case "in_stock":
          return false;
        default:
          return "";
      }
    });

    render(<ProductDetailsInfo getAttribute={getAttributeMock} />);
    expect(screen.getByText("€49.99")).toBeInTheDocument();
    expect(screen.getByText("No")).toBeInTheDocument();
  });
});
