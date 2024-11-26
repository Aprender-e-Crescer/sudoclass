import { z } from "zod";
import { config } from "firebase-functions";

function snakeCase(obj: Record<string, string | undefined>) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key.toLowerCase(), value]),
  );
}

function getEmulatorEnv() {
  return config().env;
}

function getProductionEnv() {
  return snakeCase(process.env);
}

function getEnv() {
  try {
    return getEmulatorEnv();
  } catch (error) {
    return getProductionEnv();
  }
}

export const env = z
  .object({
    database_url: z.string(),
  })
  .parse(getEnv());
