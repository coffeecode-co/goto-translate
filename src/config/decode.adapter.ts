import { decode as decoder } from "entities";

export const decode = (input: string): string => {
  return decoder(input);
};
