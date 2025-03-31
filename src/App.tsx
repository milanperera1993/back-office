import { ConfigProvider } from "antd";
import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "./components/Navbar";

function App() {
  const location = useLocation();
  const [icons, setIcons] = useState(location.pathname !== "/login");

  useEffect(() => {
    setIcons(location.pathname !== "/login");
  }, [location.pathname]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#f45334",
        },
      }}
    >
      <NavBar icons={icons} />
      <Outlet />
    </ConfigProvider>
  );
}

export default App;
