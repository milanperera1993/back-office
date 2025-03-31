import React, { useState } from "react";
import { Layout, Drawer, Menu, Grid } from "antd";
import type { MenuProps } from "antd";
import styled from "styled-components";
import { CloseOutlined } from "@ant-design/icons";
import Navbar from "../components/Navbar";

const { Sider, Content } = Layout;
const { useBreakpoint } = Grid;

const StyledSider = styled(Sider)`
  min-height: 100vh;
  background: #fff !important;
  border-right: 1px solid #f0f0f0;
`;

const SiderHeader = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #f0f0f0;
`;

const LogoImg = styled.img`
  height: 42px;
`;

const StyledContent = styled(Content)`
  padding: 24px;
`;

const DrawerHeader = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  border-bottom: 1px solid #f0f0f0;
`;

const DrawerTitleLogo = styled.div`
  display: flex;
  align-items: center;
`;

const DrawerCloseButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  svg {
    font-size: 24px;
  }
`;

const StyledMenu = styled(Menu)`
  padding-top: 2rem;
  .ant-menu-item-selected {
    background-color: #f45334 !important;
    color: white !important;
  }

  .ant-menu-item-selected a {
    color: white !important;
  }

  .ant-menu-item:not(.ant-menu-item-selected):hover {
    background-color: #e2e2e2 !important;
  }
`;

const menuItems: MenuProps["items"] = [
  {
    key: "1",
    label: "Products",
    children: [
      { key: "1-1", label: "All Products" },
      { key: "1-2", label: "TV" },
      { key: "1-3", label: "Audio & Video" },
      { key: "1-4", label: "Home Appliances" },
      { key: "1-5", label: "Kitchen Applicances" },
    ],
  },
];

const DashboardLayout: React.FC = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.xl;

  const [drawerVisible, setDrawerVisible] = useState(false);
  const openDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  if (isMobile) {
    return (
      <>
        <Navbar drawerVisible={true} onBurgerClick={openDrawer} />
        <Drawer
          placement="left"
          onClose={closeDrawer}
          open={drawerVisible}
          closable={false}
          width={300}
          title={
            <DrawerHeader>
              <DrawerTitleLogo>
                <LogoImg
                  src="https://www.home24.de/corgi/pageapps/prepurchase/_next/static/media/home-24-logo.192e9885.svg"
                  alt="Home24 Logo"
                />
              </DrawerTitleLogo>
              <DrawerCloseButton onClick={closeDrawer}>
                <CloseOutlined />
              </DrawerCloseButton>
            </DrawerHeader>
          }
          styles={{ body: { padding: 0 }, header: { padding: 0 } }}
        >
          <StyledMenu
            mode="inline"
            items={menuItems}
            defaultOpenKeys={["1"]}
            defaultSelectedKeys={["1-1"]}
            style={{ borderRight: 0 }}
          />
        </Drawer>
        <StyledContent>
          <h1>Dashboard Content</h1>
        </StyledContent>
      </>
    );
  }

  return (
    <Layout>
      <StyledSider width={300}>
        <SiderHeader>
          <LogoImg
            src="https://www.home24.de/corgi/pageapps/prepurchase/_next/static/media/home-24-logo.192e9885.svg"
            alt="Home24 Logo"
          />
        </SiderHeader>
        <StyledMenu
          mode="inline"
          items={menuItems}
          defaultOpenKeys={["1"]}
          defaultSelectedKeys={["1-1"]}
          style={{ borderRight: 0 }}
        />
      </StyledSider>
      <Layout>
        <Navbar />
        <StyledContent>
          <h1>Dashboard Content</h1>
        </StyledContent>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
