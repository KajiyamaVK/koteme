import React, { useState, useEffect } from "react";
import { FormsContext } from "../../../../context/formsContext";

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  minLength?: number;
  value?: string;
  specialCharRequired?: boolean;
  uppercaseRequired?: boolean;
  numberRequired?: boolean;
  onlyNumbers?: boolean;
  onlyLetters?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * `PasswordInput` is a component that provides a password input field with various validation options.
 *
 * @component
 * @param {Object} props - Properties passed to the component.
 * @param {number} [props.minLength=6] - The minimum length of the password.
 * @param {boolean} [props.specialCharRequired=false] - Indicates whether the password should contain at least one special character.
 * @param {boolean} [props.uppercaseRequired=false] - Indicates whether the password should contain at least one uppercase letter.
 * @param {boolean} [props.numberRequired=false] - Indicates whether the password should contain at least one number.
 * @param {boolean} [props.onlyNumbers=false] - Indicates whether the password should contain only numbers.
 * @param {boolean} [props.onlyLetters=false] - Indicates whether the password should contain only letters.
 *
 * @example
 * <PasswordInput minLength={8} specialCharRequired={true} uppercaseRequired={true} />
 *
 * @returns {React.ElementType} Returns a password type input element with built-in password validation.
 */
const PasswordInput: React.FC<PasswordInputProps> = ({
  minLength = 6,
  value = "",
  specialCharRequired = false,
  uppercaseRequired = false,
  numberRequired = false,
  onlyNumbers = false,
  onlyLetters = false,
  name,
  onChange,
  ...props
}) => {
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState<string>(value.toString());
  const [hasError, setHasError] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (error) setError(null);
    const newValue = e.target.value;
    setPassword(newValue);
    onChange && onChange(e);
  };

  const validatePassword = (value: string) => {
    let errorMessages = [];
    if (value.length < minLength) {
      errorMessages.push(
        `A senha deve ter pelo menos ${minLength} caracteres.`
      );
    }
    if (specialCharRequired && !/[!@#$%^&*(),.?":{}|<>]/g.test(value)) {
      errorMessages.push(
        "A senha deve conter pelo menos um caracter especial."
      );
    }
    if (uppercaseRequired && !/[A-Z]/.test(value)) {
      errorMessages.push("A senha deve conter pelo menos uma letra maiúscula.");
    }
    if (numberRequired && !/[0-9]/.test(value)) {
      errorMessages.push("A senha deve conter pelo menos um número.");
    }
    if (onlyNumbers && !/^\d+$/.test(value)) {
      errorMessages.push("A senha deve conter apenas números.");
    }
    if (onlyLetters && !/^[A-Za-z]+$/.test(value)) {
      errorMessages.push("A senha deve conter apenas letras.");
    }

    setError(errorMessages.join(" "));
    return errorMessages.length === 0;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    validatePassword(e.target.value);
    if (props.onBlur) props.onBlur(e);
  };

  useEffect(() => {
    const previousHasError = hasError;

    // Se não houver erro, seta o hasError para false, porém se o hasError já for true, não seta para false. Se o hasError já estava como true, isso que dizer que outro componente já está com erro.
    const isError = !error && !previousHasError ? false : true;

    if (isError !== hasError) {
      setHasError(isError);
    }
  }, [error, setHasError, hasError]);

  return (
    <div className="flex flex-col">
      <input
        {...props}
        type="password"
        onChange={handleInputChange}
        value={password}
        onBlur={handleBlur}
        role="textbox"
      />
      {error && (
        <small className=" text-red-900 bg-red-100 text-sm p-2 rounded-lg mt-2">
          {error}
        </small>
      )}
    </div>
  );
};

export default PasswordInput;
