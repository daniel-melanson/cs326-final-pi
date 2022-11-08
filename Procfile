release: pushd ./frontend && npm ci --no-fund & npm run build:prod && popd && pushd ./backend && npm ci --no-fund && popd

web: cd backend && npm start
