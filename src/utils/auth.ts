import jwt from "jsonwebtoken";

export const generateToken = ({ ...fields }) => {
  return jwt.sign(
    {
      ...fields,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "10h",
    }
  );
};
