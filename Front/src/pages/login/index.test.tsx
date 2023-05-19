import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./index";

test("renders login page", () => {
  render(<Login />);
  const emailInput = screen.getByText(/E-mail/i);
  const passwordInput = screen.getByLabelText(/Senha/i);
  const submitButton = screen.getByRole("button", { name: /Entrar/i });
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

test("Click on register showss another password input for confirmation and the button back", () => {
  render(<Login />);
  fireEvent.click(screen.getByText(/Cadastre-se/i));
  const confirmPasswordInput = screen.getByText(/Confirme a senha/i);
  const back = screen.getByText(/Voltar/i);

  expect(confirmPasswordInput).toBeInTheDocument();
  expect(back).toBeInTheDocument();
});
