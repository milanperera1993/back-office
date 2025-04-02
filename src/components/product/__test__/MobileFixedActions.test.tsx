import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import MobileFixedActions from "../MobileFixedActions";

describe("MobileFixedActions", () => {
  const onSaveMock = jest.fn();
  const onCancelMock = jest.fn();

  beforeEach(() => {
    onSaveMock.mockReset();
    onCancelMock.mockReset();
  });

  test("renders Save and Cancel buttons", () => {
    render(
      <MobileFixedActions
        isLoading={false}
        onSave={onSaveMock}
        onCancel={onCancelMock}
      />
    );

    const saveButton = screen.getByRole("button", { name: /save/i });
    const cancelButton = screen.getByRole("button", { name: /cancel/i });

    expect(saveButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });

  test("calls onSave when the Save button is clicked", () => {
    render(
      <MobileFixedActions
        isLoading={false}
        onSave={onSaveMock}
        onCancel={onCancelMock}
      />
    );

    const saveButton = screen.getByRole("button", { name: /save/i });
    fireEvent.click(saveButton);
    expect(onSaveMock).toHaveBeenCalledTimes(1);
  });

  test("calls onCancel when the Cancel button is clicked", () => {
    render(
      <MobileFixedActions
        isLoading={false}
        onSave={onSaveMock}
        onCancel={onCancelMock}
      />
    );

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(cancelButton);
    expect(onCancelMock).toHaveBeenCalledTimes(1);
  });

  test("buttons are disabled when isLoading is true", () => {
    render(
      <MobileFixedActions
        isLoading={true}
        onSave={onSaveMock}
        onCancel={onCancelMock}
      />
    );

    const saveButton = screen.getByRole("button", { name: /save/i });
    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    expect(saveButton).toBeDisabled();
    expect(cancelButton).toBeDisabled();
  });

  test("buttons are enabled when isLoading is false", () => {
    render(
      <MobileFixedActions
        isLoading={false}
        onSave={onSaveMock}
        onCancel={onCancelMock}
      />
    );

    const saveButton = screen.getByRole("button", { name: /save/i });
    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    expect(saveButton).not.toBeDisabled();
    expect(cancelButton).not.toBeDisabled();
  });
});
