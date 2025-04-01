import { Typography, Button } from "antd";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
`;

const ErrorContent = styled.div`
  text-align: center;
`;

const ErrorCode = styled(Title)`
  && {
    font-size: 10rem;
    color: #f45334;
    margin-bottom: 0;
  }
  @media (max-width: 768px) {
    && {
      font-size: 6rem;
    }
  }
`;

const ErrorText = styled(Text)`
  && {
    font-size: 1.5rem;
    color: #f45334;
  }
`;

const ErrorBoundary = () => {
  const navigate = useNavigate();

  const goHome = () => navigate("/");

  return (
    <Container>
      <ErrorContent>
        <ErrorCode>404</ErrorCode>
        <ErrorText>
          Sorry, the page you are looking for does not exist.
        </ErrorText>
        <br />
        <Button
          size="large"
          onClick={goHome}
          style={{
            marginTop: "24px",
            backgroundColor: "#f45334",
            color: "#fff",
            borderColor: "#f45334",
          }}
        >
          Go to Home
        </Button>
      </ErrorContent>
    </Container>
  );
};
export default ErrorBoundary;
