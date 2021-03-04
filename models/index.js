import { Sequelize } from "sequelize";
import applyExtraSetup from "./applyExtraSetup";
import UserModelDefiner from "./user.model";
import TeamModelDefiner from "./team.model";
import MessageModelDefiner from "./message.model";
import ChannelModelDefiner from "./channel.model";
import MemberModelDefiner from "./member.model";

const sequelize = new Sequelize("postgres://postgres:5550155@localhost:5432/postgres");

const modelDefiners = [
  UserModelDefiner,
  TeamModelDefiner,
  MessageModelDefiner,
  ChannelModelDefiner,
  MemberModelDefiner,
  // Add more models here...
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
applyExtraSetup(sequelize);

// We export the sequelize connection instance to be used around our app.
export default sequelize;
