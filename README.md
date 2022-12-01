# Spotify Albums by Release Date

A wee app to help visualise the albums a user has saved on Spotify.

## Setup

This project requires having 3 environment variables set: `CLIENT_ID`, `CLIENT_SECRET` and
`HOME_URL`. The client key pair come from the Spotify API apps in the Spotify developer dashboard.
These can be provided either by setting environment variables in the shell or by using `.envrc` and
a tool like [direnv](https://direnv.net/).

**The Spotify API app must have `http://localhost:8000/callback` as a callback if you are using the
default settings.**

### Using direnv

Copy `.envrc.sample` to `.envrc` and add your Spotify API app client id and secret to it. The
`HOME_URL` variable is already populated with the default development URL for Deno.

## Usage

Start the project:

```
deno task start
```

This will watch the project directory and restart as necessary.

## TODOs and Considerations

- [ ] Stop being blocked by Privacy Badger
- [ ] Fetch all user albums asynchronously (might run into rate limits)
- [ ] Is there a better way to approach the interactivity?
- [ ] Should the albums be fetched on the server or on the client?
