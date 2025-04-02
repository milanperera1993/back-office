import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import LoadingSpinner from "../LoadingSpinner";

describe("LoadingSpinner", () => {
  test("renders container with correct styles", () => {
    const { container } = render(<LoadingSpinner />);
  
    const outerDiv = container.firstChild;
    expect(outerDiv).toHaveStyle("height: 400px");
    expect(outerDiv).toHaveStyle("position: relative");
    
    const innerDiv = outerDiv?.firstChild;
    expect(innerDiv).toHaveStyle("display: flex");
    expect(innerDiv).toHaveStyle("justify-content: center");
    expect(innerDiv).toHaveStyle("align-items: center");
    expect(innerDiv).toHaveStyle("height: 400px");
    expect(innerDiv).toHaveStyle("position: relative");
  });

  test("renders an Ant Design Spin component with large size", () => {
    const { container } = render(<LoadingSpinner />);
    
    const spinner = container.querySelector(".ant-spin");
    
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass("ant-spin-lg");
  });
});
