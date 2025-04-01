import styled from "styled-components";
import { Button } from "antd";

const FixedActionContainer = styled.div`
  position: fixed;
  bottom: 16px;
  left: 0;
  right: 0;
  padding: 0 16px;
  z-index: 1000;
  display: flex;
  gap: 8px;
`;

interface MobileFixedActionsProps {
  isLoading: boolean;
  onSave: () => void;
  onCancel: () => void;
}

const MobileFixedActions = ({
  isLoading,
  onSave,
  onCancel,
}: MobileFixedActionsProps) => {
  return (
    <FixedActionContainer>
      <Button
        type="primary"
        size="large"
        onClick={onSave}
        block
        disabled={isLoading}
      >
        Save
      </Button>
      <Button size="large" onClick={onCancel} block disabled={isLoading}>
        Cancel
      </Button>
    </FixedActionContainer>
  );
};
export default MobileFixedActions;
