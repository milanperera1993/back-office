import React, { useState } from "react";
import styled from "styled-components";
import { Button, Form, Input, Typography } from "antd";

const { Title } = Typography;

interface LoginFormValues {
  email: string;
  password: string;
}

const Container = styled.div`
  height: 100vh;
  background-color: #efefef;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
`;

const Card = styled.div`
  width: 100%;
  max-width: 400px;
  background: #fff;
  padding: 24px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const StyledTitle = styled(Title)`
  text-align: center;
  margin-bottom: 16px;
`;

const StyledInput = styled(Input)`
  border: 1px solid #ccc;
  height: 40px;
  box-shadow: none;
`;

const StyledPasswordInput = styled(Input.Password)`
  border: 1px solid #ccc;
  height: 40px;
  box-shadow: none;
`;

const StyledButton = styled(Button)<{ $valid: boolean }>`
  background-color: ${({ $valid }) => ($valid ? "#f45334" : "#e2e2e2")} !important;
  color: ${({ $valid }) => ($valid ? "#fff" : "#000")} !important;
  border: none !important;
  font-weight: 500;
  height: 40px;
  border-radius: 4px;
  cursor: ${({ $valid }) => ($valid ? "pointer" : "not-allowed")};
`;

const LoginScreen: React.FC = () => {
  const [form] = Form.useForm();
  const [isFormValid, setIsFormValid] = useState(false);

  /**
   * handle form submission. onFinished failed is not used cause it's being handled using the button disable logic.
   * @param values
   */
  const onFinish = (values: LoginFormValues) => {
    console.log("Form values:", values);
  };

  /**
   * validate the form fields on values change
   */
  const onValuesChange = () => {
    const requiredFields = ["email", "password"];
    const fields = form.getFieldsValue(requiredFields);
    const allFieldsFilled = requiredFields.every((field) => !!fields[field]);

    const hasErrors = form
      .getFieldsError(requiredFields)
      .some(({ errors }) => errors.length > 0);

    setIsFormValid(allFieldsFilled && !hasErrors);
  };

  return (
    <Container>
      <Card>
        <StyledTitle level={3}>Sign In</StyledTitle>
        <Form
          form={form}
          name="loginForm"
          layout="vertical"
          onFinish={onFinish}
          onValuesChange={onValuesChange}
        >
          <Form.Item
            name="email"
            label="Email Address"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <StyledInput placeholder="Email Address" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <StyledPasswordInput placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <StyledButton
              block
              htmlType="submit"
              disabled={!isFormValid}
              $valid={isFormValid}
            >
              Sign In
            </StyledButton>
          </Form.Item>
        </Form>
      </Card>
    </Container>
  );
};

export default LoginScreen;
