FROM node:18 AS build
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build

FROM node:18 AS final
COPY --from=build /app/build ./build
COPY --from=build /app/package.json .
EXPOSE 80
EXPOSE 443
ENTRYPOINT ["node", "build"]