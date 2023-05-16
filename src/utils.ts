import { isAddress } from "ethers";

import { input } from "@inquirer/prompts";

export const trial =
  (transformer: (value: string) => string | boolean | Promise<string | boolean>, error: string) =>
  async (value: string) => {
    try {
      return (await transformer(value)) || error;
    } catch (err: any) {
      return `${error} "${value}": ${err.message}`;
    }
  };

export const inputAddress = (config: { message: string; default?: string }) =>
  input({
    ...config,
    validate: trial((value) => isAddress(value), "Invalid address"),
  });

export const inputNumber = (config: { message: string; min: number; default?: string }) =>
  input({
    ...config,
    validate: trial((value) => {
      const amount = parseInt(value);

      if (isNaN(amount)) return false;
      if (amount < config.min) return `Value below minimum: ${config.min}`;

      return true;
    }, "Invalid value"),
  });
