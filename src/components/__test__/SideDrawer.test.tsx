import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import SideDrawer from "../SideDrawer";

describe("SideDrawer", () => {
  const drawerWidth = 300;

  test("renders SideDrawer with header logo and children when visible", () => {
    const mockClose = jest.fn();

    render(
      <SideDrawer
        drawerVisible={true}
        isMobile={true}
        drawerWidth={drawerWidth}
        closeDrawer={mockClose}
      >
        <div>Test Content</div>
      </SideDrawer>
    );

    const logoImage = screen.getByAltText("Home24 Logo");
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute(
      "src",
      "https://www.home24.de/corgi/pageapps/prepurchase/_next/static/media/home-24-logo.192e9885.svg"
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  test("calls closeDrawer when the close button is clicked", () => {
    const mockClose = jest.fn();

    render(
      <SideDrawer
        drawerVisible={true}
        isMobile={true}
        drawerWidth={drawerWidth}
        closeDrawer={mockClose}
      >
        <div>Test Content</div>
      </SideDrawer>
    );

    const closeButton = screen.getByTestId("drawer-close-button");
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  test("does not render children when drawerVisible is false", () => {
    const mockClose = jest.fn();

    render(
      <SideDrawer
        drawerVisible={false}
        isMobile={true}
        drawerWidth={drawerWidth}
        closeDrawer={mockClose}
      >
        <div>Test Content</div>
      </SideDrawer>
    );
    expect(screen.queryByText("Test Content")).toBeNull();
  });
});
