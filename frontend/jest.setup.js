// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
// jest.setup.js
import "@testing-library/jest-dom/extend-expect";

// Armazena a função original do console.error
let originalError;

beforeAll(() => {
  // Armazena a função original do console.error
  originalError = console.error;

  // Substitui o console.error por um mock de função personalizado
  console.error = (...args) => {
    // Chama a função original do console.error com os argumentos fornecidos
    originalError(...args);

    // Lança um erro para interromper a execução dos testes e inclui a mensagem de erro
    throw new Error(
      `Teste interrompido devido a console.error: ${args.join(" ")}`
    );
  };
});

// Restaura o console.error original após a execução dos testes
afterAll(() => {
  console.error = originalError;
});
