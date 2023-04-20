import Button from "@mui/material/Button";
import Image from "next/image";
import img1 from "@@/imgs/login/img1.jpg";
import Logo from "@/components/Logo";
import img2 from "@@/imgs/login/img2.jpg";

export default function login() {
  return (
    <div className="flex">
      {/* Login Left site - only appears on large screens */}
      <div className=" hidden xl:block  xl:w-[730px] h-screen relative">
        {/* Image on top of the left side */}
        <div className="h-2/3">
          <Image src={img1} layout="cover" alt="Images at login page" />
        </div>
        {/* Box at the bottom */}
        <div className="absolute bottom-0 dialog h-80 rounded-tr-3xl  w-[830px] py-10 px-20 ">
          {/* Title of the bottom text*/}
          <h1 className="text-3xl font-bold">
            Porque cotação não é cliente quem faz
          </h1>
          {/* Bottom description */}
          <p className="indent-3 mt-5">
            Quando vamos comprar na web, geralmente é o usuário quem faz o
            processo de cotação. Não mais. Seja muito bem vindo ao{" "}
            <span>
              <Logo />
            </span>
            !
          </p>

          <Button variant="contained" className="mt-5 ">
            Saiba Mais
          </Button>
        </div>
      </div>
      {/* Right side - Login Form */}
      <div className="xl:w-1/2 h-screen flex m-auto items-center">
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
            style={{ fontSize: "clamp(3rem, 10vw, 6rem)" }}
            className=" flex w-full justify-center"
          >
            <Logo />
          </div>
          <p className="mt-5">Email</p>
          <input
            type="text"
            className="w-full border-2 border-gray-300 rounded-md p-2 mt-2"
          />
          <p className="mt-5">Senha</p>
          <input
            type="password"
            className="w-full border-2 border-gray-300 rounded-md p-2 mt-2"
          />
          <Button variant="contained" className="mt-5 ">
            Entrar
          </Button>

          <p className="mt-10">
            Não tem uma conta?<br/>
            <a href="#" className="text-teal-600">
              <b>Cadastre-se</b>
            </a>
          </p>

          <p className="mt-5">
            Não conhece o <Logo/>?<br/>
            <a href="#" className="text-teal-600">
              <b>Clique aqui e saiba mais</b>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
