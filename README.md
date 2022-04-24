> Disclaimer: this project is only meant to showcase my development skills!

<h1 align="center">
YOUTUBE CLONE V3
</h1>

<p align="center">
a (semi) fully functional youtube clone built with NextJS 
</p>

## Features

- Dark and Light mode
- Responsive design
- Sign in with Google Oauth (pending approvement for my app from Google)
- Top loading bar
- Search for a video
- Get videos of a category
- Watch video
- Video dislike count! 😎 (credits to: [returnyoutubedislike](https://github.com/Anarios/return-youtube-dislike))
- List of user's subscriptions
- Unit-tested components
- And more...

## Pages

**Home Page**

The home page shows a list of popular videos of a region (current region is UK)

There is also the categories bar to choose from that brings videos of the chosen category

![home page](https://i.ibb.co/GJN3207/Opera-Snapshot-2022-04-22-112840-localhost.png)

**Search Page**
The search page shows a list of videos based on the search input

![search page](https://i.ibb.co/9GMdN7G/search.png)

**Watch page**

The watch page shows the video, related videos and the comments of the video.

the video stats are formatted, ex: 100000 will be displayed as 100k

![watch page](https://i.ibb.co/D5QHx7b/watch.png)

**subscriptions page**
This is shown for signed users only (pending approvement from Google)

It displays a list of the channels the user is subscribed to. Clicking on a channel will redirect the user the the channel page.

![subscription page](https://i.ibb.co/jfRDfxj/subs.png)

**Channel page**
The channel page displays channel stats and channel's videos

![channel page](https://i.ibb.co/hYLBrzS/channel.png)

## Technologies

This project is built with:

- Nextjs
- NextAuth
- react testing library
- Zustand (just for the category bar)

Also nice packages i've used and like to mention:

- next-themes (for theme handling)

- react infinite scroll component

- react indiana drag scroll (used for categories bar)

- react-timeago (formats date to "date.. ago")

## Running locally

1 - clone this repo, install the dependencies:
`npm install`

2 - At the root directory create `.env.local` file, fill the needed info

```env
NEXT_PUBLIC_YOUTUBE_KEY = youtube api key here

GOOGLE_ID = google client id
GOOGLE_SECRET = google client secret

NEXTAUTH_SECRET = any secret word
NEXTAUTH_URL = http://localhost:3000 or website url if deployed

SECRET= any secret word
```

3 - run the command `npm run dev`
