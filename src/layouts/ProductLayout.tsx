import  { useEffect, useState, useMemo, useCallback } from "react";
import { Layout, Grid } from "antd";
import type { MenuProps } from "antd";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import SideDrawer from "../components/SideDrawer";
import { DRAWER_WIDTH } from "../constants/dimensions";
import SideMenu from "../components/SideMenu";
import { useFetchCategoriesQuery } from "../redux/categories/categoriesApi";
import { CategoryResponse } from "../types/common";

const { Content } = Layout;
const { useBreakpoint } = Grid;

const StyledContent = styled(Content)`
  padding: 24px;
  transition: margin-left 0.3s;
`;

const ProductLayout = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams<{ categoryId: string }>();
  const screens = useBreakpoint();
  const isMobile = !screens.lg;

  const [drawerVisible, setDrawerVisible] = useState(false);

  
  const openDrawer = useCallback(() => {
    setDrawerVisible(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setDrawerVisible(false);
  }, []);

  const defaultCategoryResponse: CategoryResponse = {
    id: 0,
    name: "",
    categories: [],
  };

  const {
    data: categoriesResponse = defaultCategoryResponse,
    isLoading,
    isError,
  } = useFetchCategoriesQuery();

  const menuItems = useMemo<NonNullable<MenuProps["items"]>>(() => {
    return (
      categoriesResponse?.categories?.map((category) => ({
        key: category.id.toString(),
        label: category.name,
      })) ?? []
    );
  }, [categoriesResponse]);


  const defaultKey = useMemo(() => {
    return categoryId || (menuItems.length > 0 ? (menuItems[0] as { key: string }).key : "");
  }, [categoryId, menuItems]);


  const defaultCategory = useMemo(() => {
    return (
      categoriesResponse.categories.find((cat) => cat.id.toString() === defaultKey) ||
      null
    );
  }, [categoriesResponse.categories, defaultKey]);

  // Redirect to the default category if no categoryId is provided
  useEffect(() => {
    if (!categoryId && defaultKey) {
      navigate(`/products/${defaultKey}`, {
        state: { category: defaultCategory },
      });
    }
  }, [categoryId, defaultKey, defaultCategory, navigate]);

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
        <SideMenu
          categoryResponse={categoriesResponse}
          onSelectItem={() => {
            setTimeout(() => {
              closeDrawer();
            }, 300);
          }}
          defaultSelectedKey={defaultKey}
          menuItems={menuItems}
        />
      </SideDrawer>
      <StyledContent>
        <Outlet />
      </StyledContent>
    </>
  );
};

export default ProductLayout;
