FROM node:18 AS build
WORKDIR /app
COPY . .
ENV VITE_API_URL=https://bcgapi.sencha.moe
RUN npm i
RUN npm run build

FROM node:18 AS final
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/build ./build
COPY --from=build /app/package.json .
EXPOSE 3000
ENTRYPOINT ["node", "build"]