
# build the front-end app
FROM node:latest as build_fe

COPY resources/react /project
WORKDIR /project
# very heavy and time consuming process so try to take it from cache
RUN yarn install
RUN yarn build-prod \
    && yarn prep-deploy

# build the backend app
FROM golang:latest as build_be
COPY ./ /project
WORKDIR /project
RUN make build

RUN chmod +x /project/built/safenotes2

# build the production final image
FROM scratch as PROD

ENV DOMAIN={localhost}

COPY --from=build_fe /project/build/ /safenotes/react
COPY --from=build_be /project/built/safenotes2 /safenotes/safenotes
COPY --from=build_be /project/.safenotes.prod.yaml /safenotes/.safenotes.yaml

WORKDIR /project

ENTRYPOINT ["/safenotes/safenotes dump:envjs -f && /safenotes/safenotes"]
CMD ["serve"]