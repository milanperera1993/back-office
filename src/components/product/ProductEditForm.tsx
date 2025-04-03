
import { Form, Input, Switch, Button, Space, type FormInstance } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { ProductFormValues } from "../../pages/ProductDetails";

export const StyledButton = styled(Button)`
  width: 100%;
`;

interface ProductEditFormProps {
  form: FormInstance<ProductFormValues>;
  isLoading: boolean;
  onFinish: (values: ProductFormValues) => void;
  showInlineButtons: boolean;
  onCancel: () => void;
}

const ProductEditForm = ({
  form,
  isLoading,
  onFinish,
  showInlineButtons,
  onCancel,
}: ProductEditFormProps) => {
  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.List name="attributes">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{ display: "flex", marginBottom: 8 }}
                align="baseline"
              >
                {/* Attribute Code with Conditional Disabled */}
                <Form.Item noStyle shouldUpdate>
                  {() => {
                    const currentCode = form.getFieldValue([
                      "attributes",
                      name,
                      "code",
                    ]);
                    return (
                      <Form.Item
                        {...restField}
                        name={[name, "code"]}
                        rules={[{ required: true, message: "Missing attribute code" }]}
                      >
                        <Input
                          placeholder="Attribute Code"
                          disabled={currentCode === "in_stock"}
                        />
                      </Form.Item>
                    );
                  }}
                </Form.Item>

                {/* Conditional Attribute Value */}
                <Form.Item
                  noStyle
                  shouldUpdate={(prevValues, curValues) => {
                    const prevCode = prevValues.attributes?.[name]?.code;
                    const curCode = curValues.attributes?.[name]?.code;
                    return prevCode !== curCode;
                  }}
                >
                  {() => {
                    const currentCode = form.getFieldValue([
                      "attributes",
                      name,
                      "code",
                    ]);
                    return currentCode === "in_stock" ? (
                      <Form.Item
                        {...restField}
                        name={[name, "value"]}
                        valuePropName="checked"
                        rules={[{ required: true, message: "Missing attribute value" }]}
                      >
                        <Switch />
                      </Form.Item>
                    ) : (
                      <Form.Item
                        {...restField}
                        name={[name, "value"]}
                        rules={[{ required: true, message: "Missing attribute value" }]}
                      >
                        <Input placeholder="Attribute Value" />
                      </Form.Item>
                    );
                  }}
                </Form.Item>

                {/* Conditional Remove Icon: do not render if code is "in_stock" */}
                <Form.Item noStyle shouldUpdate>
                  {() => {
                    const currentCode = form.getFieldValue([
                      "attributes",
                      name,
                      "code",
                    ]);
                    return currentCode === "in_stock" ? null : (
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    );
                  }}
                </Form.Item>
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add Attribute
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      {showInlineButtons && (
        <div style={{ display: "flex", gap: "16px", marginTop: "16px" }}>
          <StyledButton
            type="primary"
            htmlType="submit"
            style={{ flex: 1 }}
            size="large"
            disabled={isLoading}
          >
            Save
          </StyledButton>
          <StyledButton
            size="large"
            onClick={onCancel}
            style={{ flex: 1 }}
            disabled={isLoading}
          >
            Cancel
          </StyledButton>
        </div>
      )}
    </Form>
  );
};

export default ProductEditForm;
