FROM --platform=linux/amd64 node:22.4-slim as base

FROM base as build
WORKDIR /src
COPY --link package*.json .
RUN npm install
COPY --link . .
RUN npm run build
RUN npm prune


FROM base
COPY --from=build /src/.output/. /app/
EXPOSE 3000
RUN rm -rf /tmp/*.*

# Command to keep the container running
CMD [ "node", "/app/server/index.mjs" ]
