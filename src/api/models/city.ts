import { Model, RelationMappings } from 'objection';
import { join } from 'path';
import Event from './event';
import User from './user';

class City extends Model {
  static tableName = 'city';
  readonly id!: number;
  name!: string;
  country!: string;
  createdAt?: Date;
  updatedAt?: Date;

  //optional
  event?: Event[];
  user?: User[];

  static jsonSchema = {
    type: 'object',
    required: ['name', 'country'],
    properties: {
      id: { type: 'integer' },
      name: { type: 'string', minLength: 1, maxLength: 255 },
      country: { type: 'string', minLength: 1, maxLength: 255 },
    },
  };

  static relationMappings: RelationMappings = {
    event: {
      relation: Model.HasManyRelation,
      modelClass: join(__dirname, 'event'),
      join: {
        from: 'event.cityId',
        to: 'city.id',
      },
      filter: (query) => query.select('id', 'title'),
    },
    user: {
      relation: Model.ManyToManyRelation,
      modelClass: join(__dirname, 'users'),
      join: {
        from: 'city.id',
        through: {
          from: 'userCity.cityId',
          to: 'userCity.userId',
        },
        to: 'user.id',
      },
      filter: (query) => query.select('id', 'firstName', 'lastName'),
    },
  };
}

export default City;
