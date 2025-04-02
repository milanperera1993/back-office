import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent, } from "@testing-library/react";
import Navbar from "../Navbar";
import { AuthContext } from "../../provider/util";
import { Grid } from "antd";
import { useSelector } from "react-redux";

const mockedUseSelector = useSelector as unknown as jest.Mock;
const authContextValue = {
  currentUser: null, 
  loginUser: jest.fn(),
  logoutUser:  jest.fn() ,
};
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

jest.mock("antd", () => {
  const antd = jest.requireActual("antd");
  return {
    ...antd,
    Grid: {
      ...antd.Grid,
      useBreakpoint: jest.fn(),
    },
  };
});

describe("Navbar", () => {
  const mockLogoutUser = jest.fn();
  const mockOnBurgerClick = jest.fn();

  beforeEach(() => {
    mockLogoutUser.mockReset();
    mockOnBurgerClick.mockReset();
    mockedUseSelector.mockReset();
    (Grid.useBreakpoint as jest.Mock).mockReturnValue({ xl: true, xxl: false });
  });

  const renderNavbar = (props = {}) => {
    return render(
      <AuthContext.Provider value={authContextValue}>
        <Navbar {...props} />
      </AuthContext.Provider>
    );
  };

  test("renders the logo image with correct src and alt", () => {
    mockedUseSelector.mockReturnValue(null); // no updated product
    renderNavbar();

    const logoImg = screen.getByAltText("Home24 Logo");
    expect(logoImg).toBeInTheDocument();
    expect(logoImg).toHaveAttribute(
      "src",
      "https://www.home24.de/corgi/pageapps/prepurchase/_next/static/media/home-24-logo.192e9885.svg"
    );
  });

  test("renders burger icon and triggers onBurgerClick when clicked", () => {
    mockedUseSelector.mockReturnValue(null);
    renderNavbar({
      icons: true,
      onBurgerClick: mockOnBurgerClick,
      disableBurgerHandler: false,
    });

    const burgerIcon = document.querySelector('svg[data-icon="menu"]');
    expect(burgerIcon).toBeInTheDocument();

    if (burgerIcon && burgerIcon.parentElement) {
      fireEvent.click(burgerIcon.parentElement);
      expect(mockOnBurgerClick).toHaveBeenCalledTimes(1);
    }
  });

  test("does not trigger onBurgerClick when disableBurgerHandler is true", () => {
    mockedUseSelector.mockReturnValue(null);
    renderNavbar({
      icons: true,
      onBurgerClick: mockOnBurgerClick,
      disableBurgerHandler: true,
    });

    const burgerIcon = document.querySelector('svg[data-icon="menu"]');
    expect(burgerIcon).toBeInTheDocument();

    if (burgerIcon && burgerIcon.parentElement) {
      fireEvent.click(burgerIcon.parentElement);
      expect(mockOnBurgerClick).not.toHaveBeenCalled();
    }
  });

  test("renders Updates with correct label when updatedProduct exists", () => {
    const updatedProduct = {
      name: "Updated Product",
      image_url: "https://example.com/product.jpg",
      attributes: [
        { code: "price", value: 150 },
        { code: "color", value: "blue" },
      ],
    };
    mockedUseSelector.mockReturnValue(updatedProduct);
    renderNavbar({ icons: true });

    const updatesLabel = screen.getByText("Updates(1)");
    expect(updatesLabel).toBeInTheDocument();

    fireEvent.click(updatesLabel);

    const updatedProductName = screen.getByText("Updated Product");
    expect(updatedProductName).toBeInTheDocument();
  });

  test("renders Updates(0) when no updatedProduct is available", () => {
    mockedUseSelector.mockReturnValue(null);
    renderNavbar({ icons: true });

    const updatesLabel = screen.getByText("Updates(0)");
    expect(updatesLabel).toBeInTheDocument();
  });

  test("does not render navigation icons when icons prop is false", () => {
    mockedUseSelector.mockReturnValue(null);
    renderNavbar({ icons: false });

    const burgerIcon = document.querySelector('svg[data-icon="menu"]');
    
    expect(burgerIcon).toBeNull();
    expect(screen.queryByText("Profile")).toBeNull();
    expect(screen.queryByText(/Updates/)).toBeNull();
  });
});
