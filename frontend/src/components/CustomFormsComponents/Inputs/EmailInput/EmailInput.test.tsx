import React from "react";
import { render, fireEvent } from "@testing-library/react";
import EmailInput from "./index";

describe("EmailInput", () => {
  it("should render without errors", () => {
    const { getByLabelText } = render(
      <EmailInput
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        aria-label="E-mail"
        required
        className="your-class-name"
        onChange={() => {}}
        value=""
      />
    );

    expect(getByLabelText("E-mail")).toBeInTheDocument();
  });

  it("should display an error message when an invalid email is entered", () => {
    const { getByLabelText, getByText } = render(
      <EmailInput
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        aria-label="E-mail"
        required
        className="your-class-name"
        onChange={() => {}}
        value=""
      />
    );

    const input = getByLabelText("E-mail");
    fireEvent.change(input, { target: { value: "invalid-email" } });
    fireEvent.blur(input);

    expect(getByText("Email inválido.")).toBeInTheDocument();
  });

  it("should not display an error message when a valid email is entered", () => {
    const { getByLabelText, queryByText } = render(
      <EmailInput
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        aria-label="E-mail"
        required
        className="your-class-name"
        onChange={() => {}}
        value=""
      />
    );

    const input = getByLabelText("E-mail");
    fireEvent.change(input, { target: { value: "valid-email@example.com" } });
    fireEvent.blur(input);

    expect(queryByText("Email inválido.")).not.toBeInTheDocument();
  });
});
