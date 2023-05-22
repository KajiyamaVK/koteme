import { useSession, signOut, getSession } from "next-auth/react";
import Button from "@mui/material/Button";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
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

export default function Home() {
  const { data: session } = useSession();
  console.log(session);

  return (
    <div>
      <h1>Home</h1>
      <Button type="submit" variant="contained" onClick={() => signOut()}>
        Sair
      </Button>
    </div>
  );
}
