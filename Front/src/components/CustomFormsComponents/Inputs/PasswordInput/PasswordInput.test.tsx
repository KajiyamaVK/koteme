import React from "react";
import { render, fireEvent } from "@testing-library/react";
import PasswordInput from "./index";

describe("PasswordInput", () => {
  it("should render without errors", () => {
    const { getByRole } = render(<PasswordInput />);
    const passwordInput = getByRole("textbox");
    expect(passwordInput).toBeInTheDocument();
  });

  it("should validate password length", () => {
    const { getByRole, getByText } = render(<PasswordInput minLength={8} />);
    const passwordInput = getByRole("textbox");
    fireEvent.change(passwordInput, { target: { value: "1234567" } });
    fireEvent.blur(passwordInput);
    const errorText = getByText("A senha deve ter pelo menos 8 caracteres.");
    expect(errorText).toBeInTheDocument();
  });

  it("should validate special character requirement", () => {
    const { getByRole, getByText } = render(
      <PasswordInput specialCharRequired={true} />
    );
    const passwordInput = getByRole("textbox");
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.blur(passwordInput);
    const errorText = getByText(
      "A senha deve conter pelo menos um caracter especial."
    );
    expect(errorText).toBeInTheDocument();
  });

  it("should validate uppercase letter requirement", () => {
    const { getByRole, getByText } = render(
      <PasswordInput uppercaseRequired={true} />
    );

    const passwordInput = getByRole("textbox");
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.blur(passwordInput);
    const errorText = getByText(
      "A senha deve conter pelo menos uma letra maiúscula."
    );
    expect(errorText).toBeInTheDocument();
  });

  it("should validate number requirement", () => {
    const { getByRole, getByText } = render(
      <PasswordInput numberRequired={true} />
    );
    const passwordInput = getByRole("textbox");
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.blur(passwordInput);
    const errorText = getByText("A senha deve conter pelo menos um número.");
    expect(errorText).toBeInTheDocument();
  });

  it("should validate only numbers", () => {
    const { getByRole, getByText } = render(
      <PasswordInput onlyNumbers={true} />
    );
    const passwordInput = getByRole("textbox");
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.blur(passwordInput);
    const errorText = getByText("A senha deve conter apenas números.");
    expect(errorText).toBeInTheDocument();
  });

  it("should validate only letters", () => {
    const { getByRole, getByText } = render(
      <PasswordInput onlyLetters={true} />
    );
    const passwordInput = getByRole("textbox");
    fireEvent.change(passwordInput, { target: { value: "123456" } });
    fireEvent.blur(passwordInput);
    const errorText = getByText("A senha deve conter apenas letras.");
    expect(errorText).toBeInTheDocument();
  });
});
