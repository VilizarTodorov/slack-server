import { Sequelize } from "sequelize";

const sequelize = new Sequelize("slack", "postgres", "5550155", {
  host: "localhost",
  port: 5432,
});
