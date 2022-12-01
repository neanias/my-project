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
        <h1 class="text-5xl text-center font-bold mb-4">
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
            <div class="flex flex-col justify-center items-center mx-auto">
              <div class="flex flex-col items-center gap-2 max-w-prose">
                <p class="">
                  This is a site to help visualise your saved albums by their release date. Spotify
                  doesn't <em>currently</em>{" "}
                  allow users to sort the albums in their collection by their release dates, only
                  supporting sorting by when they were saved, alphabetically or by the artist.
                </p>
                <p>
                  To remedy this, this site shows you your saved albums in descending order of
                  release, with the latest albums being shown first. If you have a lot of saved
                  albums, this may be a bit sluggish as the app has to download <strong>all</strong>
                  {" "}
                  of them to sort them. If you don't have many albums, this may be less helpful for
                  you.
                </p>
                <p>
                  <strong>
                    If you have the Privacy Badger browser extension installed, you will need to
                    disable it for this site!
                  </strong>
                </p>
                <a class="flex justify-center my-5" href="/login">
                  <Button>
                    Log in to Spotify
                  </Button>
                </a>
              </div>
            </div>
          )}
      </div>
    </>
  );
}
