import { Sequelize } from "sequelize";
import applyExtraSetup from "./applyExtraSetup";
import UserModel from "./user.model";
import InstrumentModel from "./instrument.model";
import OrchestraModel from "./orchestra.model";

const sequelize = new Sequelize("postgres", "postgres", "5550155", {
  dialect: "postgres",
  host: "localhost",
  port: 5432,
});

const modelDefiners = [
  UserModel,
  InstrumentModel,
  OrchestraModel,
  // Add more models here...
  // require('./models/item'),
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
applyExtraSetup(sequelize);

// We export the sequelize connection instance to be used around our app.
export default sequelize;
