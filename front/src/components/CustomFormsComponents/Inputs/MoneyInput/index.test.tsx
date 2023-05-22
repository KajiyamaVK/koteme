import React from "react";
import { render, fireEvent } from "@testing-library/react";
import MoneyInput from "./index";

describe("MoneyInput", () => {
  it("should render with the correct initial value", () => {
    const { getByRole } = render(
      <MoneyInput value="10.00" onChange={() => {}} />
    );
    const input = getByRole("textbox") as HTMLInputElement;
    expect(input.value).toBe("10.00");
  });

  it("should update the value when the input changes", () => {
    const onChange = jest.fn();
    const { getByRole } = render(
      <MoneyInput value="10.00" onChange={onChange} />
    );
    const input = getByRole("textbox") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "20.00" } });
    expect(onChange).toHaveBeenCalledWith("20.00");
    expect(input.value).toBe("20.00");
  });

  it("should format the input value correctly", () => {
    const onChange = jest.fn();
    const { getByRole } = render(<MoneyInput value="10" onChange={onChange} />);
    const input = getByRole("textbox") as HTMLInputElement;
    fireEvent.blur(input);
    expect(onChange).toHaveBeenCalledWith("10.00");
    expect(input.value).toBe("10.00");
  });

  it("should show an error message for invalid input", () => {
    const { getByRole, getByText } = render(
      <MoneyInput value="" onChange={() => {}} />
    );
    const input = getByRole("textbox") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "abc" } });
    expect(getByText("Não é permitido o uso de letras.")).toBeInTheDocument();
    fireEvent.change(input, { target: { value: "1.234" } });
    expect(
      getByText("Você pode usar apenas dois números após o ponto.")
    ).toBeInTheDocument();
  });
});
