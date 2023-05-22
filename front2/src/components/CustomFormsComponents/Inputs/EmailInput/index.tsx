import React, { useState, useEffect } from "react";
import { FormsContext } from "@/context/formsContext";

interface IResponseElement {
  elementName: string;
  isError: boolean;
}

interface EmailInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * `EmailInput` is a React functional component that provides a controlled input field for email addresses.
 * It performs validation on the input to ensure it only contains valid email addresses. If an invalid email is entered,
 * it displays an error message. The component also reports back any input error state through a callback function.
 *
 * @component
 * @param {object} props - Properties passed to component
 * @param {string} id - The id of the input element
 * @param {string} name - The name of the input element
 * @param {string} type - The type of the input element. Should be "email" for this component
 * @param {string} autoComplete - Whether to allow autocomplete of the input element
 * @param {string} aria-label - The aria-label of the input element
 * @param {boolean} required - Whether the input field is required or not
 * @param {string} className - The CSS classes to apply to the input element
 * @param {function} onChange - Function to call when the input value changes
 * @param {string} value - The current value of the input element
 *
 * @example
 * <EmailInput
 *   id="email"
 *   name="email"
 *   type="email"
 *   autoComplete="email"
 *   aria-label="E-mail"
 *   required
 *   className="your-class-name"
 *   onChange={e => setEmail(e.target.value)}
 *   value={email}
 * />
 *
 * @returns {React.ElementType} Returns a controlled input field for email addresses with validation and error reporting capabilities
 */

const EmailInput: React.FC<EmailInputProps> = ({
  value = "",
  onChange,
  onBlur,
  name,
  ...props
}) => {
  const [email, setEmail] = useState<string>((value || "").toString());
  const [error, setError] = useState<string | null>(null);

  const { setHasError, hasError } = React.useContext(FormsContext);

  useEffect(() => {
    setEmail(value);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (error) setError(null);
    const newValue = e.target.value;
    setEmail(newValue);
    onChange && onChange(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (email) {
      /**
       *  Regex para validação de email
       * Verifica se o endereço de email começa com uma sequência válida de caracteres
       * Garante que o endereço de email contém o símbolo '@'
       * Verifica se após o '@', existe um nome de domínio válido
       * Certifica-se de que após o nome de domínio, há pelo menos um domínio de nível superior (como .com, .net, etc.) que consiste em pelo menos duas letras
       * Verifica se a sequência não contém nenhum caracter ilegal e está de acordo com o formato padrão do email
       */
      const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+$/;
      const isValid = emailRegex.test(email);

      if (!isValid) {
        setError("Email inválido.");
      } else {
        setError(null);
      }
    }
    onBlur && onBlur(e);
  };

  useEffect(() => {
    const previousHasError = hasError;

    // Se não houver erro, seta o hasError para false, porém se o hasError já for true, não seta para false. Se o hasError já estava como true, isso que dizer que outro componente já está com erro.
    const isError = !error && previousHasError != true ? false : true;
    setHasError(isError);
  }, [error]);

  return (
    <div className="flex flex-col">
      <input
        {...props}
        value={email}
        onBlur={handleBlur}
        onChange={handleInputChange}
      />

      {error && (
        <small className="text-red-900 bg-red-100 text-sm p-2 rounded-lg mt-2">
          {error}
        </small>
      )}
    </div>
  );
};

export default EmailInput;
