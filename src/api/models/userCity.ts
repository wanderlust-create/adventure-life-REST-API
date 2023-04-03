import { Model, RelationMappings } from "objection";
import { join } from "path";
import City from "./city";
import User from "./user";

class UserCity extends Model {
  static tableName = "userCity";
  readonly id!: number;
  readonly cityId!: number;
  readonly userId!: number;
  createdAt?: Date;
  updatedAt?: Date;

  //optional
  city?: City;
  user?: User;

  static jsonSchema = {
    type: "object",
    required: ["cityId", "userId"],
    properties: {
      id: { type: "integer" },
      cityId: { type: "string", minLength: 1, maxLength: 255 },
      userId: { type: "string", minLength: 1, maxLength: 255 },
    },
  };

  static get relationMappings() {
    return {
      city: {
        relation: Model.HasOneRelation,
        modelClass: join(__dirname, "city"),
        filter: (query) => query.select("id", "name", "country"),
        join: {
          from: "userCity.cityId",
          to: "city.id",
        },
      },
      user: {
        relation: Model.HasOneRelation,
        modelClass: join(__dirname, "user"),
        filter: (query) => query.select("id", "firstName", "lastName"),
        join: {
          from: "userCity.userId",
          to: "user.id",
        },
      },
    };
  }
}

export default UserCity;
