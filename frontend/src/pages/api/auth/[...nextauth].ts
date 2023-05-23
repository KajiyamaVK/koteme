import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    //Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    //Credentials
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        // Verifique se as credenciais são válidas
        if (credentials) {
          // Se as credenciais forem válidas, retorne um objeto de usuário compatível com a interface User
          return {
            id: "1",
            name: "Admin",
            email: "admin@example.com",
            image: null,
          };
        } else {
          // Se as credenciais forem inválidas, rejeite com um erro
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  secret: process.env.SECRET,
});
