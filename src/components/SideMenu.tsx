import styled from "styled-components";
import { Menu, MenuProps } from "antd";

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
}

const SideMenu = ({menuItems}: SideMenuProps) => {
  return (
    <StyledMenu
      mode="inline"
      items={menuItems}
      defaultOpenKeys={["1"]}
      defaultSelectedKeys={["1-1"]}
      style={{ borderRight: 0 }}
      onSelect={(e) => console.log("Selected:", e)}
    />
  );
};
export default SideMenu;
