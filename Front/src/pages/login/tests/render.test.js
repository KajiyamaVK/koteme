import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import Login from "..";

//Render tests
test("Rendering the e-mail and password fields", () => {
  render(<Login />);
  const inputs = screen.getAllByRole("textbox");

  expect(inputs).toHaveLength(2);
});

test("Checking if the submit button is rendered", () => {
  render(<Login />);
  const submitButton = screen.getByText(/entrar/i);

  expect(submitButton).toBeInTheDocument();
});

test("Checking if the Learn More button is rendered", () => {
  render(<Login />);
  const learnMoreButton = screen.getByText("Saiba Mais");

  expect(learnMoreButton).toBeInTheDocument();
});
