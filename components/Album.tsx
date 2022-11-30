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
      <div class="rounded-lg shadow-md bg-white max-w-sm">
        <img class="rounded-t-lg" src={coverArt} loading="lazy" />
        <div class="p-6">
          <h5 class="text-gray-900 text-xl font-medium mb-2">
            <a
              class="hover:underline hover:text-blue-700"
              href={album.external_urls.spotify}
            >
              {name}
            </a>
          </h5>
          <p class="text-gray-700 text-base mb-4">
            {artists}
          </p>
          <p class="text-gray-500 text-sm mb-2">
            {releaseDate.toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
