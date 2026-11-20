# Babyyyyyyy's Little Love Garden 🌷

A responsive, pink romantic surprise website built with React + Vite.

## Run locally

1. Install Node.js (LTS): https://nodejs.org/
2. Extract this folder.
3. Open a terminal in this folder and run:

```bash
npm install
npm run dev
```

4. Open the local URL Vite prints (usually http://localhost:5173).

## Build for deployment

```bash
npm run build
```

The production website is created in the `dist` folder.

## Publish free with Vercel

1. Create a free account at https://vercel.com/
2. Push this project to a GitHub repository.
3. In Vercel, choose **Add New → Project** and import that repository.
4. Vercel detects Vite automatically. Keep the build command `npm run build` and output directory `dist`.
5. Click Deploy. Vercel gives you a shareable HTTPS link.

You can also deploy the `dist` folder using another static hosting provider.

## Personalize before sharing

- Update the letter text in `src/main.jsx` to include your own memories and inside jokes.
- Add your preferred signature in the letter/footer if you want.
- This version intentionally has no tracking, login, backend or data collection.

## Notes

- The page has no paid API dependencies.
- The website does not autoplay music. It currently uses no music file, keeping the experience quiet and gentle.
- All interactive elements work locally in the browser.
