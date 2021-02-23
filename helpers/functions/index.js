import _ from "lodash";
import { ValidationError } from "sequelize";

const formatErrors = (e) => {
  if (e instanceof ValidationError) {
    return e.errors.map((x) => _.pick(x, ["path", "message"]));
  }
  return [{ path: "name", message: "something went wrong" }];
};

export { formatErrors };
