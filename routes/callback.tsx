import { encode } from "https://deno.land/std@0.160.0/encoding/base64.ts";
import { deleteCookie, getCookies, setCookie } from "https://deno.land/std@0.165.0/http/cookie.ts";
import { Handlers } from "$fresh/server.ts";
import config from "../config.ts";

const stateCookieKey = "spotify_auth_state";
const { homeUrl, redirectUrl, clientId, clientSecret } = config;

export const handler: Handlers = {
  async GET(req) {
    const queryParams = new URL(req.url).searchParams;
    const code = queryParams.get("code") || "";
    const state = queryParams.get("state");

    const headers = new Headers(req.headers);
    const cookies = getCookies(headers);
    const storedState = cookies[stateCookieKey];

    if (state === undefined || state !== storedState) {
      const params = new URLSearchParams({ error: "state_mismatch" });
      return Response.redirect(new URL(`${redirectUrl}/?${params}`));
    } else {
      deleteCookie(headers, stateCookieKey);

      const request = new Request(
        "https://accounts.spotify.com/api/token",
        {
          body: new URLSearchParams({
            code,
            redirect_uri: redirectUrl,
            grant_type: "authorization_code",
          }),
          method: "POST",
          headers: new Headers({
            "Authorization": "Basic " + encode(`${clientId}:${clientSecret}`),
            "Content-Type": "application/x-www-form-urlencoded",
          }),
        },
      );

      const response = await fetch(request);

      let params: URLSearchParams | string = "";

      if (!response.ok) {
        params = new URLSearchParams({ error: "invalid_token" });
      }

      const { access_token, refresh_token }: Record<string, string> = await response.json();
      setCookie(headers, {
        name: "access_token",
        value: access_token,
        maxAge: 3600,
      });
      setCookie(headers, { name: "refresh_token", value: refresh_token });

      headers.set("location", new URL(`${homeUrl}/#?${params}`).toString());
      return new Response(null, { status: 302, headers });
    }
  },
};
