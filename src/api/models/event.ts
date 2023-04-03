import { Model, RelationMappings } from "objection";
import { join } from "path";
import City from "./city";

class Event extends Model {
  static tableName = "event";
  readonly id!: number;
  readonly cityId!: number;
  title!: string;
  createdAt?: Date;
  updatedAt?: Date;

  //optional
  city?: City;

  static jsonSchema = {
    type: "object",
    required: ["cityId", "title"],
    properties: {
      id: { type: "integer" },
      cityId: { type: "string", minLength: 1, maxLength: 255 },
      title: { type: "string", minLength: 1, maxLength: 255 },
    },
  };

  static relationMappings: RelationMappings = {
    city: {
      relation: Model.BelongsToOneRelation,
      modelClass: join(__dirname, "city"),
      join: {
        from: "event.cityId",
        to: "city.id",
      },
      filter: (query) => query.select("id", "name"),
    },
  };
}
export default Event;
