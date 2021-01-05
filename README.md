# LSTN ALNG - Music should be shared.

Listen Along is bringing back listening rooms. Intimate opportunities to share and experience music with your friends. A shared queue can be added to and edited by anyone present in the listening room. Vote songs up the queue and jam synchronously together via Spotify—-even when you can't be together.

<!-- **Link to site:** https://tytysam.github.io/TheBoys_Supe-r_Destruction/ -->

---

### Technologies used:

- React.js
- Next.js
- Node.js
- Express.js
- Socket.io
- Redux
- Bootstrap
- Spotify Web API

## User Stories

- User + one or more friends can all visit the same “Listening Room” together
- There will be an active song queue that anyone in the room can edit and add to and have it be played synchronously across all devices via Spotify

## Roadmap:

### Address ongoing bugs and issues:

- Current Bugs: none reported...
- Current Issues:
  - Manage end-queue( )...

### What's Next...

- Multiple rooms
- Build-out chatbox functionality for each room
- Get our Recommender-Robot functioning
- Light/Dark modes! Add a switch to toggle modes.
-

## Install:

<details>
<summary>Instructions...</summary>
<br />

### Setting up

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

You will need to register your own Spotify app and set the credentials in a couple of config files. For that:

1. Create an application on [Spotify's Developer Site](https://developer.spotify.com/my-applications/)

2. Add both http://localhost:3000/auth/callback (for development) and <production_domain>/auth/callback (if you want to deploy your app somewhere) as redirect uris

3. Create a `.env` file in the root of the project with the following variables;

   - `HOST`
   - `CLIENT_ID`
   - `CLIENT_SECRET`

For Example:

```
HOST=http://localhost:3000
CLIENT_ID=<your_client_id>
CLIENT_SECRET=<your_client_secret>
```

### Dependencies

Install the dependencies running `npm install`.

### Running

During development, run `npm run dev`.

When running on production, run `npm run build && npm run start`.

</details>
