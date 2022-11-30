import { filterValues } from "https://deno.land/std@0.165.0/collections/filter_values.ts";

export type Config = {
  homeUrl: string;
  redirectUrl: string;
  clientId: string;
  clientSecret: string;
};

// Draw the config from the ENV vars.
const config: Record<string, string | undefined> = {
  homeUrl: Deno.env.get("HOME_URL"),
  clientId: Deno.env.get("CLIENT_ID"),
  clientSecret: Deno.env.get("CLIENT_SECRET"),
};

// Check all required keys are present.
const filteredConfig: Record<string, undefined> = filterValues(
  config,
  (it: string | undefined) => it === undefined,
);

// Warn user if keys are missing.
if (Object.keys(filteredConfig).length > 0) {
  const missingKeys = Object.keys(filteredConfig).map((str) =>
    str.replace(/[A-Z]/g, (letter) => `_${letter}`).toUpperCase()
  );
  console.error(`Missing required config keys: ${missingKeys}`);
  Deno.exit(1);
}

// Set the redirectUrl once the config has been validated.
config.redirectUrl = `${config.homeUrl}/callback`;

export default config as Config;
