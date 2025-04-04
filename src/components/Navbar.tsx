import React, { useContext } from "react";
import styled from "styled-components";
import { ClockCircleOutlined, MenuOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Row, Col, Grid, Dropdown } from "antd";
import { AuthContext } from "../provider/util";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import LastUpdatedProduct from "./LastUpdatedProduct";
import { useLocation } from "react-router-dom";

const { Header } = Layout;
const { useBreakpoint } = Grid;

const StyledHeader = styled(Header)<{ padding: string }>`
  background: #fff;
  border-bottom: 1px solid #ccc;
  padding: ${(props) => props.padding};
  height: 80px;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 10;
`;

const BurgerIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 20px;
  svg {
    font-size: 24px;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  img {
    height: 42px;
  }
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const NavIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  color: #4b4b4b;
  cursor: pointer;
  svg {
    font-size: 24px;
  }
`;

const NavLabel = styled.span`
  margin-top: 4px;
  line-height: 1;
`;

interface NavBarProps {
  icons?: boolean;
  onBurgerClick?: () => void;
  disableBurgerHandler?: boolean;
}

const Navbar: React.FC<NavBarProps> = ({
  icons = true,
  onBurgerClick,
  disableBurgerHandler = false,
}) => {
  const screens = useBreakpoint();
  const location = useLocation();
  const showBurgerIcon = !location.pathname.includes("/details/");
  const headerPadding = screens.md ? "0 48px" : "0 24px";
  const { logoutUser } = useContext(AuthContext);

  const logoutHandler = () => {
    logoutUser();
  };

  const updatedProduct = useSelector((state: RootState) => state.product.updatedProduct);

  return (
    <StyledHeader padding={headerPadding}>
      <Row style={{ width: "100%" }} align="middle" justify="space-between" wrap={false}>
        <Col>
          <Row align="middle" wrap={false}>
            {icons &&  showBurgerIcon &&(
              <BurgerIconContainer onClick={disableBurgerHandler ? undefined : onBurgerClick}>
                <MenuOutlined />
              </BurgerIconContainer>
            )}
            <Logo>
              <img
                src="https://www.home24.de/corgi/pageapps/prepurchase/_next/static/media/home-24-logo.192e9885.svg"
                alt="Home24 Logo"
              />
            </Logo>
          </Row>
        </Col>
        <Col>
          {icons && (
            <NavRight>
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "logout",
                      label: "Logout",
                      onClick: logoutHandler,
                    },
                  ],
                }}
                trigger={["click"]}
                placement="bottomRight"
              >
                <NavIcon>
                  <UserOutlined />
                  <NavLabel>Profile</NavLabel>
                </NavIcon>
              </Dropdown>
              {updatedProduct ? (
                <Dropdown
                  dropdownRender={() => <LastUpdatedProduct product={updatedProduct} />}
                  trigger={["click"]}
                  placement="bottomRight"
                >
                  <NavIcon>
                    <ClockCircleOutlined />
                    <NavLabel>Updates(1)</NavLabel>
                  </NavIcon>
                </Dropdown>
              ) : (
                <NavIcon>
                  <ClockCircleOutlined />
                  <NavLabel>Updates(0)</NavLabel>
                </NavIcon>
              )}
            </NavRight>
          )}
        </Col>
      </Row>
    </StyledHeader>
  );
};

export default Navbar;