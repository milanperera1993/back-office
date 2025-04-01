import React, { useState } from "react";
import { Layout, Grid } from "antd";
import type { MenuProps } from "antd";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import SideDrawer from "../components/SideDrawer";
import { DRAWER_WIDTH } from "../constants/dimensions";
import SideMenu from "../components/SideMenu";

const { Content } = Layout;
const { useBreakpoint } = Grid;

const StyledContent = styled(Content)`
  padding: 24px;
  transition: margin-left 0.3s;
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

const ProductLayout: React.FC = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.lg;

  const [drawerVisible, setDrawerVisible] = useState(false);
  const openDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  return (
    <>
      <Navbar onBurgerClick={openDrawer} />
      <SideDrawer  drawerVisible={drawerVisible} isMobile={isMobile} drawerWidth={DRAWER_WIDTH} closeDrawer={closeDrawer} >
        <SideMenu menuItems={menuItems} />
      </SideDrawer>
      <StyledContent>
        <Outlet/>
      </StyledContent>
    </>
  );
};

export default ProductLayout;
