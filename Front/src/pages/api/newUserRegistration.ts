import { NextApiRequest, NextApiResponse } from "next";
import jwt from "next-auth/jwt";
import { getToken } from "next-auth/jwt";

interface IUser {
  email: string;
  password: string;
  hash: string;
}

export default function newUserRegistration(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password, hash } = req.body;
  const bcrypt = require("bcryptjs");
  let validationResult: boolean = false;
  if (hash) {
    validationResult = bcrypt.compareSync(password, hash);
  }

  console.log(req.body);
  res.status(200).json({ validationResult });
}
