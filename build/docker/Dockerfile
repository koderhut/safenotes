
# build the front-end app
FROM node:latest as build_fe

COPY webapp/react /project
WORKDIR /project
# very heavy and time consuming process so try to take it from cache
RUN yarn install
RUN yarn build-prod

# build the backend app
FROM golang:latest as build_be
COPY ./ /project
WORKDIR /project

RUN make build-app \
    && chmod +x /project/dist/safenotes

# build the production final image
FROM scratch as PROD

ENV DOMAIN={localhost}

COPY --from=build_fe /project/build/ /safenotes/react
COPY --from=build_be /project/dist/safenotes /safenotes/safenotes
COPY --from=build_be /project/.safenotes.prod.yaml /safenotes/.safenotes.yaml

WORKDIR /safenotes

VOLUME /safenotes

#EXPOSE 80, 443

ENTRYPOINT ["/safenotes/safenotes"]
CMD ["serve"]
