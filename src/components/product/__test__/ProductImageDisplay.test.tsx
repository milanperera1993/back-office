import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import "jest-styled-components";
import ProductImageDisplay from "../ProductImageDisplay";

describe("ProductImageDisplay", () => {
  const imageUrl = "https://example.com/image.jpg";
  const altText = "Example Image";

  test("renders an image with the correct src and alt attributes", () => {
    render(<ProductImageDisplay imageUrl={imageUrl} alt={altText} />);
    const imageElement = screen.getByRole("img");
    expect(imageElement).toHaveAttribute("src", imageUrl);
    expect(imageElement).toHaveAttribute("alt", altText);
  });

  test("renders the image inside a wrapper with proper styling", () => {
    const { container } = render(
      <ProductImageDisplay imageUrl={imageUrl} alt={altText} />
    );
    const wrapper = container.firstChild;
    expect(wrapper).toHaveStyleRule("border-radius", "8px");
    expect(wrapper).toHaveStyleRule("width", "100%");
    expect(wrapper).toHaveStyleRule("overflow", "hidden");
  });
});
