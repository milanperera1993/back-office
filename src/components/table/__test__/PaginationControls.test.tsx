import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, screen } from "@testing-library/react";
import PaginationControls from "../PaginationControls";

jest.mock("../../PageSizeSelector", () => {
  return ({ pageSize, onPageSizeChange }: { pageSize: number; onPageSizeChange: (value: number) => void; }) => (
    <button
      data-testid="page-size-selector"
      onClick={() => onPageSizeChange(20)}
    >
      PageSize {pageSize}
    </button>
  );
});

describe("PaginationControls", () => {
  const onPageChangeMock = jest.fn();
  const onPageSizeChangeMock = jest.fn();

  beforeEach(() => {
    onPageChangeMock.mockClear();
    onPageSizeChangeMock.mockClear();
  });

  test("renders the component with the correct props", () => {
    render(
      <PaginationControls
        currentPage={1}
        pageSize={10}
        total={50}
        onPageChange={onPageChangeMock}
        onPageSizeChange={onPageSizeChangeMock}
      />
    );

    const pageSizeSelector = screen.getByTestId("page-size-selector");
    expect(pageSizeSelector).toBeInTheDocument();
    expect(pageSizeSelector).toHaveTextContent("PageSize 10");

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  test("calls onPageChange when a pagination page is clicked", () => {
    render(
      <PaginationControls
        currentPage={1}
        pageSize={10}
        total={50}
        onPageChange={onPageChangeMock}
        onPageSizeChange={onPageSizeChangeMock}
      />
    );
  
    const pageTwoButton = screen.getByText("2");
    fireEvent.click(pageTwoButton);
    expect(onPageChangeMock).toHaveBeenCalledWith(2, 10);
  });
  

  test("calls onPageSizeChange when the PageSizeSelector is clicked", () => {
    render(
      <PaginationControls
        currentPage={1}
        pageSize={10}
        total={50}
        onPageChange={onPageChangeMock}
        onPageSizeChange={onPageSizeChangeMock}
      />
    );

    const pageSizeSelectorButton = screen.getByTestId("page-size-selector");
    fireEvent.click(pageSizeSelectorButton);

    expect(onPageSizeChangeMock).toHaveBeenCalledWith(20);
  });
});
