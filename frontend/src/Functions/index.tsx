export function scrollTo(section: string) {
  const element = document.getElementById(section);

  if (element) {
    const offset = -150; // set the offset value
    const options: ScrollIntoViewOptions = {
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    };
    const scrollTop =
      element.getBoundingClientRect().top + window.scrollY + offset;
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: scrollTop, ...options });
    });
  }
}

const bcrypt = require("bcryptjs");
export function hashPassword(password: string) {
  const salt: string = bcrypt.genSaltSync(10);
  const hash: string = bcrypt.hashSync(password, salt);

  return hash;
}

/*
Function that validates if an email is valid. Returns true if it is valid, false if it is not. 

Must: 

- Have the @ symbol
- Have a domain name
- Have a domain extension with at least 2 characters and no more than 4 characters
- Have no spaces
- Have content before the @ symbol
- convert all characters to lowercase
*/

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,4}$/i;
  return emailRegex.test(email.toLowerCase());
};

export const markingInputAsInvalid = (HTMLElement: HTMLElement) => {
  const classes = ["shadow-lg", "shadow-red-700"];
  HTMLElement?.classList.add(...classes);
};

export const emptyRequeriedFields = () => {
  const requiredFields =
    document.querySelectorAll<HTMLInputElement>("[required]");
  const emptyRequiredFields: HTMLInputElement[] = [];
  requiredFields.forEach((field) => {
    if (!field.value) {
      emptyRequiredFields.push(field);
    }
  });

  return emptyRequiredFields;
};

export const validateForm = () => {
  const emptyRequiredFields = emptyRequeriedFields();
  if (emptyRequiredFields.length > 0) {
    emptyRequiredFields[0].focus();
    markingInputAsInvalid(emptyRequiredFields[0]);
    return false;
  }

  const emailInputs = document.querySelectorAll<HTMLInputElement>(
    'input[type="email"]'
  );

  emailInputs.forEach((input) => {
    if (!validateEmail(input.value)) {
      markingInputAsInvalid(input);
      return false;
    }
    return true;
  });
};
