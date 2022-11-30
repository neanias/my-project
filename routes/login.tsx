import { setCookie } from "https://deno.land/std@0.165.0/http/cookie.ts";
import { Handlers } from "$fresh/server.ts";
import config from "../config.ts";

const stateCookieKey = "spotify_auth_state";
const { redirectUrl, clientId } = config;

export const handler: Handlers = {
  GET(req) {
    const state = crypto.randomUUID();
    const headers = new Headers(req.headers);
    setCookie(headers, { name: stateCookieKey, value: state });

    const params = new URLSearchParams({
      response_type: "code",
      client_id: clientId,
      scope: "user-library-read",
      redirect_uri: redirectUrl,
      state,
    });

    const spotifyUrl = new URL("https://accounts.spotify.com/authorize");
    headers.set("location", new URL(`${spotifyUrl}?${params}`).toString());
    return new Response(null, { status: 302, headers });
  },
};
