import Button from "@mui/material/Button";
import Image from "next/image";
import img1 from "@@/imgs/login/img1.jpg";

export default function login() {
  return (
    <div className="flex">
      {/* Login Left site - only appears on large screens */}
      <div className=" hidden lg:block  lg:w-[730px] h-screen relative">
        {/* Image on top of the left side */}
        <div className="h-2/3">
          <Image src={img1} layout="cover" alt="Images at login page" />
        </div>
        {/* Box at the bottom */}
        <div className="absolute bottom-0 dialog h-80 rounded-tr-3xl  w-[830px] py-10 px-20 ">
          {/* Title of the bottom text*/}
          <h1 className="text-3xl font-bold">
            Cotação não é cliente quem faz
          </h1>
          {/* Bottom description */}
          <p className="indent-3 mt-5">
            Quando vamos comprar na web, geralmente é o usuário quem faz o
            processo de cotação. Não mais. Seja muito bem vindo ao Cotar!
          </p>

          <Button
            variant="contained"
            className="mt-5 bg-teal-600 hover:bg-teal-900"
          >
            Saiba Mais
          </Button>
        </div>
      </div>
      <div className="lg:w-1/2 h-screen"></div>
    </div>
  );
}
