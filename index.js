import express from "express";
import { ApolloServer } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import typeDefs from "./schema";
import resolvers from "./resolvers";
import sequelize from "./models";

const fm = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
fm();

const schema = makeExecutableSchema({ typeDefs, resolvers });
const PORT = 8080;

const app = express();

const server = new ApolloServer({ schema });
server.applyMiddleware({ app });

app.listen({ port: PORT }, () => console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`));
