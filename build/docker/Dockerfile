#####
# Part of the safenotes package
# Copyright © 2020 Denis Rendler <connect@rendler.me>
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#####

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

ARG VERSION="0.1.0"

LABEL "Maintainer"="Denis Rendler <connect@rendler.me>" \
      "App"="SafeNotes" \
      "Version"=${VERSION}

COPY --from=build_fe /project/build/ /safenotes/www
COPY --from=build_be /project/dist/safenotes /safenotes/safenotes
COPY --from=build_be /project/.safenotes.prod.yaml /safenotes/.safenotes.yaml

WORKDIR /safenotes

VOLUME /safenotes/www

ARG http_port=80
ARG https_port=443
EXPOSE ${http_port}/tcp \
       ${https_port}/tcp

ENTRYPOINT ["/safenotes/safenotes"]
CMD ["serve"]
