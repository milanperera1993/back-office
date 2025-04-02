import { Drawer } from "antd"
import { CloseOutlined } from "@ant-design/icons";
import styled from "styled-components";

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

const LogoImg = styled.img`
  height: 42px;
`;

const DrawerCloseButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  svg {
    font-size: 24px;
  }
`;

interface SideDrawerProps {
  drawerVisible: boolean;
  isMobile: boolean;
  drawerWidth: number;
  closeDrawer: () => void;
  children?: React.ReactNode;
}

const SideDrawer = ({drawerVisible, isMobile, drawerWidth, closeDrawer, children}: SideDrawerProps) => {
  return (
    <Drawer
    placement="left"
    onClose={closeDrawer}
    open={drawerVisible}
    closable={false}
    width={drawerWidth}
    title={
      <DrawerHeader>
        <DrawerTitleLogo>
          <LogoImg
            src="https://www.home24.de/corgi/pageapps/prepurchase/_next/static/media/home-24-logo.192e9885.svg"
            alt="Home24 Logo"
          />
        </DrawerTitleLogo>
        <DrawerCloseButton data-testid="drawer-close-button" onClick={closeDrawer}>
          <CloseOutlined />
        </DrawerCloseButton>
      </DrawerHeader>
    }
    mask={isMobile}
    style={!isMobile ? { position: "absolute" } : {}}
    styles={{ body: { padding: 0 }, header: { padding: 0 } }}
  >
    {children}
  </Drawer>
  )
}
export default SideDrawer