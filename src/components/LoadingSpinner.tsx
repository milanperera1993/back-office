import { Spin } from "antd";

const LoadingSpinner = () => {
  return (
    <div style={{ position: "relative", height: "400px" }}>
      <div
        style={{
          position: "relative",
          height: "400px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin size="large" />
      </div>
    </div>
  );
};
export default LoadingSpinner;
