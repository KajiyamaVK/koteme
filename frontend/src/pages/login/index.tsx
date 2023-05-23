import Button from "@mui/material/Button";
import { useState, FormEvent } from "react";
import Image from "next/image";
import img1 from "public/imgs/login/img1.jpg";
import Logo from "@/components/Logo";
import img2 from "public/imgs/login/img2.jpg";
import googleLogo from "public/imgs/login/google_logo.png";
import { useEffect } from "react";
import { signIn, getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { hashPassword } from "@/Functions";
import { AiOutlineArrowLeft } from "react-icons/ai";
import {
  PasswordInput,
  EmailInput,
} from "@/components/CustomFormsComponents/Inputs";

export interface IFormData {
  email?: string;
  senha?: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
};

export default function Login() {
  useEffect(() => {
    const paragraphs = document.getElementsByTagName("p");

    const classesToAdd = [
      "xl:text-gray-900",
      "dark:text-gray-100",
      "text-gray-100",
    ];

    for (let i = 0; i < paragraphs.length; i++) {
      paragraphs[i].classList.add(...classesToAdd);
    }

    const labels = document.getElementsByTagName("label");
    for (let i = 0; i < labels.length; i++) {
      labels[i].classList.add(...classesToAdd);
    }
  }, []);

  interface IHandleSubmit {
    provider: string;
    event?: FormEvent;
  }

  const [isRegistering, setRegistering] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  async function handleSubmit({ provider, event }: IHandleSubmit) {
    //Consume API route to login

    event && event.preventDefault();

    if (isRegistering) {
      await fetch("/api/newUserRegistration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: { email },
          password: { password },
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    } else {
      await signIn(provider);
    }
  }

  return (
    <div className="flex">
      {/* Login Left site - only appears on large screens */}
      <div className=" hidden xl:block  xl:w-[730px] h-screen relative ">
        {/* Image on top of the left side */}
        <div className="h-2/3">
          <Image src={img1} alt="Images at login page" />
        </div>
        {/* Box at the bottom */}
        <div className="absolute bottom-0 dialog h-80 rounded-tr-3xl  w-[830px] py-10 px-20 ">
          {/* Title of the bottom text*/}
          <h1 className="text-3xl font-bold">
            Porque cotação não é cliente quem faz
          </h1>
          {/* Bottom description */}
          <div className="indent-3 mt-5 text-white">
            Quando vamos comprar na web, geralmente é o usuário quem faz o
            processo de cotação. Não mais. Seja muito bem vindo ao{" "}
            <span>
              <Logo isLoginPage />!
            </span>
          </div>

          <Button variant="contained" className="mt-5 ">
            Saiba Mais
          </Button>
        </div>
      </div>
      {/* Right side - Login Form */}
      <form
        noValidate
        className="xl:w-1/2 h-screen flex m-auto items-center"
        onSubmit={(e) => handleSubmit({ provider: "credentials", event: e })}
      >
        {/* Login Background Image using Image component */}

        <Image
          src={img2}
          fill
          alt="Images at login page"
          object-fit="contain"
          object-position="center"
          className="z-0 xl:hidden"
        />

        <div className="w-1/2 m-auto  min-w-[300px] z-10">
          <div
            style={{ fontSize: "clamp(4rem, 10vw, 6rem)" }}
            className=" flex w-full justify-center"
          >
            <Logo isLoginPage />
          </div>
          <label
            htmlFor="email"
            className="xl:text-gray-900 dark:text-gray-100  text-gray-100 inline-block mt-10"
          >
            E-mail
          </label>
          <EmailInput
            className="w-full border-2 border-gray-300 rounded-md p-2 mt-2"
            value={email}
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="senha" className="inline-block mt-5">
            Senha {isRegistering && " (mínimo 6 caracteres)"}
          </label>
          <PasswordInput
            className="w-full border-2 border-gray-300 rounded-md p-2 mt-2"
            value={password}
            name="senha"
            id="senha"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className={`${isRegistering ? "block" : "hidden"} `}>
            <label htmlFor="senha" className="inline-block mt-5">
              Confirme a senha
            </label>

            <PasswordInput
              className="w-full border-2 border-gray-300 rounded-md p-2 mt-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-between ">
            <div
              className={`flex mt-5 cursor-pointer ${
                isRegistering ? "block" : "hidden"
              }`}
              onClick={() => setRegistering(false)}
            >
              <AiOutlineArrowLeft className="text-teal-600 mt-[4px] font-bold" />
              <p className="font-bold !text-teal-600">Voltar</p>
            </div>
            <Button
              variant="contained"
              type="submit"
              name="submit"
              className={"mt-5 "}
            >
              {isRegistering ? "Cadastrar" : "Entrar"}
            </Button>
          </div>
          <div className={`${isRegistering ? "hidden" : "block"}`}>
            <p className="mt-10">Ou logue com:</p>
            <Image
              src={googleLogo}
              alt="Google Logo"
              className="h-auto w-5 mt-2 cursor-pointer"
              onClick={() => {
                handleSubmit({ provider: "google" });
              }}
            />
          </div>
          <div className={`${isRegistering ? "hidden" : "block"}`}>
            <p className="mt-10">Não tem uma conta?</p>
            <p
              className="cursor-pointer !text-teal-600 font-bold"
              onClick={() => {
                setRegistering(true);
              }}
            >
              Cadastre-se{" "}
            </p>
          </div>
          <p className="mt-5">
            Não conhece o <Logo isLoginPage />?
          </p>
          <a href="#" className="text-teal-600">
            <b>Clique aqui e saiba mais</b>
          </a>
        </div>
      </form>
    </div>
  );
}
