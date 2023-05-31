#! /bin/sh

# Rebind env vars to PUBLIC_ for svelte
# export PUBLIC_IMMICH_SERVER_URL=$IMMICH_SERVER_URL
# export PUBLIC_IMMICH_API_URL_EXTERNAL=$IMMICH_API_URL_EXTERNAL

npx prisma migrate deploy

exec node build