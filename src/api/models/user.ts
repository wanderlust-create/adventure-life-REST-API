import { Model, RelationMappings } from "objection";
import { join } from "path";
import City from "./city";

class User extends Model {
  static tableName = "user";
  readonly id!: number;
  firstName!: string;
  lastName!: string;
  email!: string;
  createdAt?: Date;
  updatedAt?: Date;

  //optional
  city?: City[];

  static jsonSchema = {
    type: "object",
    required: ["firstName", "lastName", "email"],
    properties: {
      id: { type: "integer" },
      firstName: { type: "string", minLength: 1, maxLength: 255 },
      lastName: { type: "string", minLength: 1, maxLength: 255 },
      email: { type: "string", minLength: 4, maxLength: 255 },
    },
  };

  static relationMappings: RelationMappings = {
    city: {
      relation: Model.ManyToManyRelation,
      modelClass: join(__dirname, "city"),
      join: {
        from: "user.id",
        through: {
          from: "userCity.userId",
          to: "userCity.cityId",
        },
        to: "city.id",
      },
      filter: (query) => query.select("name"),
    },
  };
}

export default User;
