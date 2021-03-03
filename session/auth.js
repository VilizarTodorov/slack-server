import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import _ from "lodash";
// import { SECRET, SECRET2 } from "../helpers/constants";

export const createTokens = async (user, secret, secret2) => {
  const token = jwt.sign(
    {
      user: _.pick(user, ["id", "username"]),
    },
    secret,
    {
      expiresIn: "1h",
    }
  );

  const refreshToken = jwt.sign(
    {
      user: _.pick(user, ["id"]),
    },
    secret2,
    {
      expiresIn: "7d",
    }
  );

  return [token, refreshToken];
};

export const refreshTokens = async (token, refreshToken, models, SECRET, SECRET2) => {
  let userId = 0;
  try {
    const {
      user: { id },
    } = jwt.decode(refreshToken);

    userId = id;
  } catch (error) {
    return {};
  }

  if (!userId) {
    return {};
  }

  const user = await models.user.findOne({ where: { id: userId }, raw: true });

  if (!user) {
    return {};
  }

  const refreshTokenSecret = `${user.password}${SECRET2}`;

  try {
    jwt.verify(refreshToken, refreshTokenSecret);
  } catch (error) {
    console.log(error);
    return {};
  }

  const [newToken, newRefreshToken] = await createTokens(user, SECRET, refreshTokenSecret);
  return {
    token: newToken,
    refreshToken: newRefreshToken,
    user,
  };
};

export const tryLogin = async (email, password, models, SECRET, SECRET2) => {
  const user = await models.user.findOne({ where: { email }, raw: true });

  if (!user) {
    // user with provided email is not found

    return {
      ok: false,
      errors: [{ path: "email", message: "Email or password is incorrect" }],
    };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    // wrong password

    return {
      ok: false,
      errors: [{ path: "password", message: "Email or password is incorrect" }],
    };
  }

  const refreshTokenSecret = `${user.password}${SECRET2}`;

  const [token, refreshToken] = await createTokens(user, SECRET, refreshTokenSecret);

  return {
    ok: true,
    token,
    refreshToken,
  };
};
