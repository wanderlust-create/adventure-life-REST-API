/**
 * Shape of individual user data from the source JSON file.
 */
export interface UserSourceData {
  first_name: string;
  last_name: string;
  email: string;
  trips: string[];
}

/**
 * Shape of individual event data from the source JSON file.
 */
export interface EventSourceData {
  title: string;
  city: string;
  country: string;
}

/**
 * Checks if the given input string is a valid integer.
 * @param input The input string to validate
 * @returns True if input is an integer string, false otherwise
 */
export function isInteger(input: string): boolean {
  return /^\d+$/.test(input);
}
