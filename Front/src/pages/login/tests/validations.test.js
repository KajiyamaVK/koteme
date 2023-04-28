import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import Login from "..";

//Required fields tests
test("form cannot be submitted when password field is null", () => {
  render(<Login />);
  const passwordInput = screen.getByLabelText(/senha/i);
  expect(passwordInput).toHaveAttribute("required");
});
