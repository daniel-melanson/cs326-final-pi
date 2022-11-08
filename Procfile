release: cd ./frontend && pwd && npm ci --no-fund --production=false && npm run build:prod && cd ../backend && npm ci --no-fund --production=false && npm run build

web: node ./backend/dist/main.js
