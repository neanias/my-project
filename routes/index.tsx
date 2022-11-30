import { useState } from "preact/hooks";
import { getCookies } from "https://deno.land/std@0.165.0/http/cookie.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { Button } from "../components/Button.tsx";
import Albums from "../islands/Albums.tsx";

interface Tokens {
  access_token: string;
  refresh_token: string;
}

export const handler: Handlers<Tokens | null> = {
  GET(req, ctx) {
    const cookies = getCookies(req.headers);

    if (cookies.access_token === undefined) {
      return ctx.render(null);
    }

    return ctx.render(
      {
        access_token: cookies["access_token"],
        refresh_token: cookies["refresh_token"],
      },
    );
  },
};

export default function Home({ data }: PageProps<Tokens | null>) {
  const [loggedIn, _] = useState(data !== null);

  return (
    <>
      <Head>
        <title>Spotify Albums by Release Date</title>
      </Head>
      <div class="dark:text-white">
        <h1 class="text-5xl text-center font-bold">
          Spotify Albums by Release Date
        </h1>
        {loggedIn
          ? (
            <Albums
              access_token={data!.access_token}
              refresh_token={data!.refresh_token}
            />
          )
          : (
            <a class="flex justify-center py-5" href="/login">
              <Button>
                Log in to Spotify
              </Button>
            </a>
          )}
      </div>
    </>
  );
}
