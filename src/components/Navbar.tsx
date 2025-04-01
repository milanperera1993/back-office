// Navbar.tsx
import React from "react";
import styled from "styled-components";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Row, Col, Grid } from "antd";

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
  width: 46px;
  height: 46px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 12px;
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
  gap: 24px;
  padding-right: 16px;
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
}

const Navbar: React.FC<NavBarProps> = ({ icons = true, onBurgerClick }) => {
  const screens = useBreakpoint();
  const headerPadding = screens.xl || screens.xxl ? "0 48px" : "0 16px";

  return (
    <StyledHeader padding={headerPadding}>
      <Row style={{ width: "100%" }} align="middle" justify="space-between" wrap={false}>
        <Col>
          <Row align="middle" wrap={false}>
            {icons && (
              <BurgerIconContainer onClick={onBurgerClick}>
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
              <NavIcon>
                <UserOutlined />
                <NavLabel>Profile</NavLabel>
              </NavIcon>
            </NavRight>
          )}
        </Col>
      </Row>
    </StyledHeader>
  );
};

export default Navbar;
