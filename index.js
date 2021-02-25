import express from "express";
import { ApolloServer } from "apollo-server-express";
import { loadFilesSync, makeExecutableSchema, mergeResolvers, mergeTypeDefs } from "graphql-tools";
import sequelize from "./models";
import path from "path";
import { SECRET, SECRET2 } from "./helpers/constants";
import jwt from "jsonwebtoken";
import { refreshTokens } from "./session/auth";

const addUserMiddleware = async (req, res, next) => {
  const token = req.headers["x-token"];

  if (token) {
    try {
      const { user } = jwt.verify(token, SECRET);
      req.user = user;
    } catch (error) {
      const refreshToken = req.headers["x-refresh-token"];
      const newTokens = await refreshTokens(token, refreshToken, sequelize.models, SECRET, SECRET2);
      if (newTokens.token && newTokens.refreshToken) {
        res.set("Access-Control-Expose-Headers", "x-token, x-refresh-token");
        res.set("x-token", newTokens.token);
        res.set("x-refresh-token", newTokens.refreshToken);
      }

      req.user = newTokens.user;
    }
  }

  next();
};

const fm = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, "./schemas")));
const resolvers = mergeResolvers(loadFilesSync(path.join(__dirname, "./resolvers")));

const schema = makeExecutableSchema({ typeDefs, resolvers });
const PORT = 8080;

const app = express();
app.use(addUserMiddleware);

const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    return {
      models: sequelize.models,
      user: req.user,
      SECRET,
      SECRET2,
    };
  },
  // context: {
  //   models: sequelize.models,
  //   user: {
  //     id: 1,
  //   },
  //   SECRET,
  //   SECRET2,
  // },
});
server.applyMiddleware({ app });

sequelize.sync().then(() => {
  app.listen({ port: PORT }, () => console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`));
  fm();
});
