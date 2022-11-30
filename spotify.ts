import SpotifyWebApi from "spotify-web-api-js";

interface Pagination {
  next?: string;
  items: SpotifyApi.SavedAlbumObject[];
}

export type GroupedAlbums = Map<number, SpotifyApi.AlbumObjectFull[]>;

const spotifyApi = new SpotifyWebApi();

const getAllPages = async <Response extends Pagination>(
  request: Promise<Response>,
): Promise<Response> => {
  const paginatedResponse = await request;

  let currentResponse = paginatedResponse;

  while (currentResponse.next) {
    currentResponse = await spotifyApi.getGeneric(
      currentResponse.next,
    ) as Response;
    paginatedResponse.items = paginatedResponse.items.concat(
      currentResponse.items,
    );
  }

  return paginatedResponse;
};

const groupAlbumsByYear = (albums: SpotifyApi.SavedAlbumObject[]) =>
  albums.reduce(
    (group, { album }) => {
      const releaseYear = (new Date(album.release_date)).getFullYear();
      if (group.has(releaseYear)) group.get(releaseYear)!.push(album);
      else group.set(releaseYear, [album]);
      return group;
    },
    new Map(),
  );

const sortGroupedAlbumsInDescendingOrder = (groupedAlbums: GroupedAlbums) =>
  groupedAlbums.forEach((albums, year: number) => {
    groupedAlbums.set(
      year,
      albums.sort(
        (
          left: SpotifyApi.AlbumObjectFull,
          right: SpotifyApi.AlbumObjectFull,
        ) => {
          const leftDate = new Date(left.release_date);
          const rightDate = new Date(right.release_date);

          if (leftDate > rightDate) {
            return -1;
          } else if (rightDate > leftDate) {
            return 1;
          }

          return 0;
        },
      ),
    );
  });

export default async function fetchSavedAlbums(
  access_token: string,
): Promise<GroupedAlbums> {
  spotifyApi.setAccessToken(access_token);

  const paginatedResponse = await getAllPages<
    SpotifyApi.UsersSavedAlbumsResponse
  >(
    spotifyApi.getMySavedAlbums({ limit: 50 }),
  );

  const groupedAlbums = groupAlbumsByYear(paginatedResponse.items);
  sortGroupedAlbumsInDescendingOrder(groupedAlbums);

  return groupedAlbums;
}
