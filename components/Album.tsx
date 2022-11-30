import "spotify-web-api-js";

export default function Album(
  { album }: { album: SpotifyApi.AlbumObjectFull },
) {
  const artists = album.artists.map((
    artist: SpotifyApi.ArtistObjectSimplified,
  ) => artist.name).join(", ");
  const name = album.name;
  const releaseDate = new Date(album.release_date);
  const coverArt = album.images[0].url;

  return (
    <div class="flex justify-center" key={album.id}>
      <div class="rounded-lg shadow-md bg(white dark:gray-700) max-w-sm">
        <img class="rounded-t-lg" src={coverArt} loading="lazy" alt={`${name} album cover art`} />
        <div class="p-6">
          <h5 class="text(gray-900 dark:gray-50) text-xl font-bold mb-2">
            <a
              class="hover:underline text(hover:blue-700 hover:dark:blue-300)"
              href={album.external_urls.spotify}
            >
              {name}
            </a>
          </h5>
          <p class="text(gray-700 dark:gray-200) text-base mb-4">
            {artists}
          </p>
          <p class="text(gray-500 dark:gray-300) text-sm mb-2">
            {releaseDate.toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
