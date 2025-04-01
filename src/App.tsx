import { ConfigProvider } from "antd";
import { Outlet } from "react-router-dom";
import AuthProvider from "./provider/AuthProvider";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#f45334",
        },
      }}
    >
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;
