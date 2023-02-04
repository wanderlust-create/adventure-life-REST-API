import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("user", (table) => {
      table.increments("id").primary();
      table.string("email", 100).unique().notNullable();
      table.string("firstName", 100).notNullable();
      table.string("lastName", 100).notNullable();
      table.timestamps(true, true);
    })
    .createTable("city", (table) => {
      table.increments("id").primary();
      table.string("name", 100).notNullable();
      table.string("country", 100).notNullable();
      table.timestamps(true, true);
    })
    .createTable("event", (table) => {
      table.increments("id").primary();
      table
        .integer("cityId")
        .notNullable()
        .references("id")
        .inTable("city")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("title").notNullable();
      table.timestamps(true, true);
    })
    .createTable("userCity", (table) => {
      table.increments("id").primary();
      table
        .integer("userId")
        .notNullable()
        .references("id")
        .inTable("user")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("cityId")
        .notNullable()
        .references("id")
        .inTable("city")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists("userCity")
    .dropTableIfExists("event")
    .dropTableIfExists("city")
    .dropTableIfExists("user");
}
