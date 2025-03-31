import { ConfigProvider } from "antd";
import { Outlet } from "react-router-dom";

function App() {

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#f45334",
        },
      }}
    >
      {/* <NavBar icons={icons} /> */}
      <Outlet />
    </ConfigProvider>
  );
}

export default App;
