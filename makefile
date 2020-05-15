
build-app:
	CGO_ENABLED=0 go build -ldflags="-extldflags=-static" -o dist/safenotes .

build-docker:
	@if [ ! -f '.safenotes.prod.yaml' ]; then echo ">>> Missing .safenotes.prod.yaml" && exit 1; fi;
	DOCKER_BUILDKIT=1 docker build --target PROD -f build/docker/Dockerfile ${BUILDARGS} --tag safenotes:${TAG} .

react-dev:
	docker-compose --project-directory webapp/react -f webapp/react/docker-compose.yaml up -d

react-sh:
	docker exec -ti sn-react bash

clean:
	rm -rf dist/*

