import knex, { Knex } from "knex";
if (process.env.NODE_ENV === "production") {
  throw new Error("Can not run seeds in production enviroment");
}

// Interface Objects for Source Data
import { UserSourceData, EventSourceData } from "../../config/utils";

// Import Source data
import eventData = require("../source/events.json");
import userData = require("../source/users.json");
const cityData = eventData
  .map((event: EventSourceData) => event.city)
  .filter(
    (value: string, index: number, self: string[]) =>
      self.indexOf(value) === index
  );

// Seed data from source files
export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("userCity")
    .del()
    .then(() => {
      return knex("event").del();
    })
    .then(() => {
      return knex("city").del();
    })
    .then(() => {
      return knex("user").del();
    })
    // Creates new entries in db: uses helper functions below
    .then(() => {
      let cityPromises = [];
      cityData.forEach((city: string) => {
        cityPromises.push(createCity(knex, city));
      });
      return Promise.all(cityPromises);
    })
    .then(() => {
      let eventPromises = [];
      eventData.forEach((event: EventSourceData) => {
        let city = event.city;
        eventPromises.push(createEvent(knex, event, city));
      });
      return Promise.all(eventPromises);
    })
    .then(() => {
      let userPromises = [];
      userData.forEach((user: UserSourceData) => {
        userPromises.push(createUser(knex, user));
      });
      return Promise.all(userPromises);
    })
    .then(() => {
      let userCityPromises = [];
      userData.forEach((user: UserSourceData) => {
        userCityPromises.push(createUserCityData(knex, user));
      });
      return Promise.all(userCityPromises);
    });
}

// Helper Functions to insert the data into the db
const createCity = (knex: Knex, city: string) => {
  let countryName = eventData.find((event) => {
    if (event.city === city) {
      return event.country;
    }
  });
  return knex("city").insert({
    name: city,
    country: countryName.country,
  });
};
const createEvent = async (
  knex: Knex,
  event: EventSourceData,
  city: string
) => {
  const cityRecord = await knex("city").where("name", city).first();
  return await knex("event").insert({
    title: event.title,
    cityId: cityRecord.id,
  });
};
const createUser = (knex: Knex, user: UserSourceData) => {
  return knex("user").insert({
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
  });
};
const createUserCityData = async (knex: Knex, user: UserSourceData) => {
  const userRecord = await knex("user").where("email", user.email).first();
  let userCityPromises = [];
  user.trips.forEach((city: string) => {
    userCityPromises.push(createUserCity(knex, city, userRecord.id));
  });
  return await Promise.all(userCityPromises);
};
const createUserCity = async (knex: Knex, city: string, userId: number) => {
  const cityRecord = await knex("city").where("name", city).first();
  return await knex("userCity").insert({
    userID: userId,
    cityID: cityRecord.id,
  });
};
