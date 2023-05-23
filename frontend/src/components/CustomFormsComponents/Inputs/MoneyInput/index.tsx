import React, { useState, useEffect } from "react";
import { FormsContext } from "@/context/formsContext";

interface MoneyInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value"
  > {
  /** The value to be displayed in the input */
  value?: string;
  /** Function to handle changes to the input */
  onChange: (value: string) => void;
}
/**
 * `MoneyInput` is a React functional component that provides a controlled input field for monetary values.
 * This component performs validation on the input to ensure it only contains valid monetary values.
 *
 * @component
 *
 * @param {Object} props - Properties passed to component
 * @param {string} props.name - The name of the input field. It will be returned in the reportInputError callback.
 * @param {string} [props.value=''] - The initial value of the input field. Defaults to an empty string.
 * @param {Function} props.onChange - Callback function that is called when the input value changes. The new value is passed as an argument.
 * @param {Function} [props.reportInputError] - Optional callback function that is called when an invalid input is detected. An object containing the input name and a boolean indicating the error state is passed as an argument.
 *
 * @example
 * <MoneyInput
 *    name="price"
 *    value="12.34"
 *    onChange={newValue => console.log(`New price: ${newValue}`)}
 *    reportInputError={({elementName, isError}) => console.log(`Error state of ${elementName} is ${isError}`)}
 * />
 *
 * @returns {React.ElementType} Returns a controlled input field for monetary values with validation and error reporting capabilities
 */

const MoneyInput: React.FC<MoneyInputProps> = ({
  value: propValue = "",
  onChange,
  ...props
}) => {
  const [value, setValue] = useState<string>(propValue);
  const [error, setError] = useState<string | null>(null);

  const { setHasError, hasError } = React.useContext(FormsContext);

  useEffect(() => {
    setValue(propValue);
  }, [propValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value.replace(",", ".");

    if (newValue.startsWith(".")) {
      newValue = "0" + newValue;
    }

    if (newValue === "") {
      setError(null);
      setValue(newValue);
    } else if (
      !/^(\d+)?([.]?\d{0,2})?$/.test(newValue) &&
      !/^(\d+)[.]$/.test(newValue)
    ) {
      if (/[a-zA-Z]/.test(newValue)) {
        setError("Não é permitido o uso de letras.");
      } else if (/^[^.]+\..*\.+/.test(newValue)) {
        setError("Você pode usar apenas um ponto.");
      } else if (/\..{3,}/.test(newValue)) {
        setError("Você pode usar apenas dois números após o ponto.");
      } else {
        setError(
          "Caracteres inválidos. Por favor, insira apenas números e um ponto."
        );
      }
    } else {
      setError(null);
      setValue(newValue);
    }
  };

  const handleBlur = () => {
    if (value !== "" && !value.includes(".")) {
      setValue(value + ".00");
    } else if (value.match(/\.\d$/)) {
      setValue(value + "0");
    } else if (value.endsWith(".")) {
      setValue(value + "00");
    }
  };

  useEffect(() => {
    const previousHasError = hasError;

    // Se não houver erro, seta o hasError para false, porém se o hasError já for true, não seta para false. Se o hasError já estava como true, isso que dizer que outro componente já está com erro.
    const isError = !error && !previousHasError ? false : true;

    if (isError !== hasError) {
      setHasError(isError);
    }
  }, [error, setHasError, hasError]);

  useEffect(() => {
    if (onChange) {
      onChange(value);
    }
  }, [value, onChange]);

  return (
    <div className="flex flex-col w-full">
      <input
        {...props}
        type="text"
        value={value}
        onChange={handleInputChange}
        onBlur={handleBlur}
      />
      {error && (
        <small className="text-red-900 bg-red-100 text-sm p-2 rounded-lg mt-2">
          {error}
        </small>
      )}
    </div>
  );
};

export default MoneyInput;
