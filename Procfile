release: pushd ./frontend \
  && npm ci --no-fund \
  && npm run build:prod \
  && popd \
  && pushd ./backend \
  && npm ci --no-fund

web: cd backend && npm start
