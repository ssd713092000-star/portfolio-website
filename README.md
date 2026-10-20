# Swayam Sampad Das: Portfolio

A static portfolio site written in TypeScript (Vite), served by nginx in Docker.

## Edit the content
All the words on the site are in `src/content.ts`. Your photo is `public/portrait.jpg`.
Put your résumé at `public/Swayam_Sampad_Das_Resume.pdf` so the "Résumé (PDF)" link works.

## Run locally with Docker
```
docker build -t swayam-portfolio .
docker run -d --name swayam-portfolio -p 8080:8080 swayam-portfolio
```
Open http://localhost:8080

To pick up edits, rebuild:
```
docker rm -f swayam-portfolio
docker build -t swayam-portfolio .
docker run -d --name swayam-portfolio -p 8080:8080 swayam-portfolio
```

## Deploy
- **Vercel**: import the GitHub repo. It detects Vite (build `npm run build`, output `dist`).
- **Render** (uses the Dockerfile): New → Web Service → pick the repo → Runtime: Docker. The container listens on `$PORT`.
