import styled from "styled-components";
import { Menu, MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import { CategoryResponse } from "../types/common";

const StyledMenu = styled(Menu)`
  padding-top: 2rem;
  .ant-menu-item,
  .ant-menu-submenu-title {
    min-height: 60px;
    line-height: 60px;
  }
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

interface SideMenuProps {
  menuItems: MenuProps["items"];
  defaultSelectedKey: string;
  onSelectItem: () => void;
  categoryResponse: CategoryResponse;
}

const SideMenu = ({
  menuItems = [],
  defaultSelectedKey,
  onSelectItem,
  categoryResponse,
}: SideMenuProps) => {
  const navigate = useNavigate();
  const handleSelect: MenuProps["onSelect"] = (e) => {
    const selectedCategory = categoryResponse.categories.find(
      (cat) => cat.id.toString() === e.key
    );
    navigate(`/products/${e.key}`, {
      state: { category: selectedCategory },
    });
    onSelectItem();
  };

  return (
    <StyledMenu
      mode="inline"
      items={menuItems}
      defaultSelectedKeys={[defaultSelectedKey]}
      style={{ borderRight: 0 }}
      onSelect={handleSelect}
    />
  );
};
export default SideMenu;
