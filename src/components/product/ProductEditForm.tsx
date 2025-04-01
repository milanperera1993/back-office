import { Form, Input, Switch, type FormInstance } from "antd";
import { ProductFormValues, StyledButton } from "../../pages/ProductDetails";

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
      <Form.Item
        label="Color"
        name="color"
        rules={[{ required: true, message: "Please input the color!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Material"
        name="material"
        rules={[{ required: true, message: "Please input the material!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="In Stock" name="in_stock" valuePropName="checked">
        <Switch />
      </Form.Item>
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
