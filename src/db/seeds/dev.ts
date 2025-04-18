import type { Knex } from 'knex';
import { UserSourceData, EventSourceData } from '../../config/utils';
import eventData from '../source/events.json';
import userData from '../source/users.json';

if (process.env.NODE_ENV === 'production') {
  throw new Error('❌ Cannot run seeds in production environment');
}

// Extract unique city names
const cityData = eventData
  .map((event: EventSourceData) => event.city)
  .filter((city, index, self) => self.indexOf(city) === index);

// 🌱 Main seed function
export async function seed(knex: Knex): Promise<void> {
  console.log('🌱 Seeding database...');

  await knex.transaction(async (trx) => {
    await trx('userCity').del();
    await trx('event').del();
    await trx('city').del();
    await trx('user').del();

    await Promise.all(cityData.map((city) => createCity(trx, city)));
    await Promise.all(eventData.map((event) => createEvent(trx, event)));
    await Promise.all(userData.map((user) => createUser(trx, user)));
    await Promise.all(userData.map((user) => createUserCityData(trx, user)));
  });

  console.log('✅ Seeding complete');
}

// 🔧 Helper: Create a city
const createCity = async (knex: Knex, city: string) => {
  const event = eventData.find((e) => e.city === city);
  if (!event) throw new Error(`❌ Country not found for city: ${city}`);

  return knex('city').insert({
    name: city,
    country: event.country,
  });
};

// 🔧 Helper: Create an event
const createEvent = async (knex: Knex, event: EventSourceData) => {
  const city = await knex('city').where({ name: event.city }).first();
  if (!city) throw new Error(`❌ City not found for event: ${event.title}`);

  return knex('event').insert({
    title: event.title,
    cityId: city.id,
  });
};

// 🔧 Helper: Create a user
const createUser = (knex: Knex, user: UserSourceData) => {
  return knex('user').insert({
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
  });
};

// 🔧 Helper: Link user to cities
const createUserCityData = async (knex: Knex, user: UserSourceData) => {
  const userRecord = await knex('user').where({ email: user.email }).first();
  if (!userRecord) throw new Error(`❌ User not found for email: ${user.email}`);

  const promises = user.trips.map((city) => createUserCity(knex, city, userRecord.id));
  return Promise.all(promises);
};

// 🔧 Helper: Link user-city
const createUserCity = async (knex: Knex, cityName: string, userId: number) => {
  const city = await knex('city').where({ name: cityName }).first();
  if (!city) throw new Error(`❌ City not found for user-city trip: ${cityName}`);

  return knex('userCity').insert({
    userId,
    cityId: city.id,
  });
};
