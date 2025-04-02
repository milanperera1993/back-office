import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import ProductHeader from "../ProductHeader";
import { Product, Category } from "../../../types/common";

describe("ProductHeader", () => {
  const product: Product = {
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

  const category: Category = {
    id: 1,
    name: "Test Category",
  };

  test("renders product name and category when category is provided", () => {
    const { container } = render(
      <ProductHeader product={product} category={category} />
    );

    const title = screen.getByRole("heading", { level: 2 });

    expect(title).toHaveTextContent(product.name);
    expect(screen.getByText(`Category: ${category.name}`)).toBeInTheDocument();
    expect(container.querySelector(".ant-divider")).toBeInTheDocument();
  });

  test("renders product name without category when category is not provided", () => {
    const { container } = render(<ProductHeader product={product} />);

    const title = screen.getByRole("heading", { level: 2 });

    expect(title).toHaveTextContent(product.name);
    expect(screen.getByText("Category:")).toBeInTheDocument();
    expect(container.querySelector(".ant-divider")).toBeInTheDocument();
  });
});
