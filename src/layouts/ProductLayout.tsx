import React, { useState } from "react";
import { Layout, Grid } from "antd";
import type { MenuProps } from "antd";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import SideDrawer from "../components/SideDrawer";
import { DRAWER_WIDTH } from "../constants/dimensions";
import SideMenu from "../components/SideMenu";
import { useGetCategoriesQuery } from "../redux/categories/categoriesApi";
import { CategoryResponse } from "../types/common";

const { Content } = Layout;
const { useBreakpoint } = Grid;

const StyledContent = styled(Content)`
  padding: 24px;
  transition: margin-left 0.3s;
`;

const ProductLayout: React.FC = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.lg;

  const [drawerVisible, setDrawerVisible] = useState(false);
  const openDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  const defaultCategoryResponse: CategoryResponse = {
    id: 0,
    name: "",
    categories: [],
  };

  const {
    data: categoriesResponse = defaultCategoryResponse,
    isLoading,
    isError,
  } = useGetCategoriesQuery();

  const menuItems: MenuProps["items"] =
    categoriesResponse?.categories?.map((category) => ({
      key: category.id.toString(),
      label: category.name,
    })) ?? [];

    const defaultKey =
    menuItems && menuItems.length > 0
      ? (menuItems[0] as { key: string }).key
      : "";  

  return (
    <>
      <Navbar
        disableBurgerHandler={isLoading || isError}
        onBurgerClick={openDrawer}
      />
      <SideDrawer
        drawerVisible={drawerVisible}
        isMobile={isMobile}
        drawerWidth={DRAWER_WIDTH}
        closeDrawer={closeDrawer}
      >
        <SideMenu defaultSelectedKey={defaultKey} menuItems={menuItems} />
      </SideDrawer>
      <StyledContent>
        <Outlet />
      </StyledContent>
    </>
  );
};

export default ProductLayout;
