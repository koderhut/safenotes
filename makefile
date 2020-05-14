
build : main.go
	CGO_ENABLED=0 go build -ldflags="-extldflags=-static" -o built/safenotes .

build-docker:
	@if [ ! -f '.safenotes.prod.yaml' ]; then echo ">>> Missing .safenotes.prod.yaml" && exit 1; fi;
	docker build --target PROD -f build/docker/Dockerfile ${BUILDARGS} --tag safenotes:${TAG} .

react-sh:
	docker exec -ti sn-react bash

clean:
	rm -rf built/*