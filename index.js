import express from "express";
import { ApolloServer } from "apollo-server-express";
import { loadFilesSync, makeExecutableSchema, mergeResolvers, mergeTypeDefs } from "graphql-tools";
import sequelize from "./models";
import path from "path";
import { SECRET, SECRET2 } from "./helpers/constants";

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

const server = new ApolloServer({
  schema,
  context: {
    models: sequelize.models,
    user: {
      id: 1,
    },
    SECRET,
    SECRET2,
  },
});
server.applyMiddleware({ app });

sequelize.sync().then(() => {
  app.listen({ port: PORT }, () => console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`));
  fm();
});
