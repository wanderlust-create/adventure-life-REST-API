export interface UserSourceData {
  first_name: string;
  last_name: string;
  email: string;
  trips: string[];
}
export interface EventSourceData {
  title: string;
  city: string;
  country: string;
}
export function isInteger(input:string) {
  return input?.match(/^\d+$/) ?? false
}
