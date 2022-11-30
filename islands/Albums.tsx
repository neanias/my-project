import { useState } from "preact/hooks";
import Album from "../components/Album.tsx";
import { Button } from "../components/Button.tsx";
import fetchSavedAlbums, { type GroupedAlbums } from "../spotify.ts";

interface AlbumsProps {
  access_token: string;
  refresh_token: string;
}

export default function Albums(props: AlbumsProps) {
  const [albums, setAlbums] = useState(new Map() as GroupedAlbums);
  const [loading, setLoading] = useState(false);

  const getMySavedAlbums = async () => {
    setLoading(true);

    const savedAlbums = await fetchSavedAlbums(props.access_token);

    setAlbums(savedAlbums);
    setLoading(false);
  };

  return (
    <div class="py-5">
      {albums.size === 0
        ? (
          <div class="flex justify-center">
            <Button onClick={getMySavedAlbums} disabled={loading}>
              {loading ? "Fetching albums..." : "Fetch albums"}
            </Button>
          </div>
        )
        : (
          Array.from(albums.entries()).sort((a, b) => b[0] - a[0]).map((
            [year, albums],
          ) => (
            <section class="mt-5" key={year}>
              <header class="text-3xl text-center font-bold mt-0 mb-6">
                {year}
              </header>
              <main class="grid grid-cols-1 gap-3 md:grid-cols-5 xl:grid-cols-7 content-evenly">
                {albums.map((album: SpotifyApi.AlbumObjectFull) => (
                  <Album
                    album={album}
                  />
                ))}
              </main>
            </section>
          ))
        )}
    </div>
  );
}
