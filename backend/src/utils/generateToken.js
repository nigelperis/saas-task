import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      organizationId: user.organizationId,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};
