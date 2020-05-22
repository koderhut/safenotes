
GOCMD=go
GOBUILD=$(GOCMD) build
GOCLEAN=$(GOCMD) clean
GOTEST=$(GOCMD) test
GOGET=$(GOCMD) get
GOLIST=$(GOCMD) list
BINARY_NAME=safenotes
PKGS=$(shell ${GOLIST} ./... | grep -v /vendor)
COVERAGEDIR=./dist/coverage

.PHONY: build
build:
	CGO_ENABLED=0 $(GOBUILD) -ldflags="-extldflags=-static" -o dist/$(BINARY_NAME) .

.PHONY: release-docker
release-docker:
	@if [ ! -f '.safenotes.prod.yaml' ]; then echo ">>> Missing .safenotes.prod.yaml" && exit 1; fi;
	DOCKER_BUILDKIT=1 docker build --target PROD -f build/docker/Dockerfile ${OPTS} --tag safenotes:${TAG} .

.PHONY: react-dev
react-dev:
	docker-compose --project-directory webapp/react -f webapp/react/docker-compose.yaml up -d

.PHONY: react-sh
react-sh:
	docker exec -ti sn-react bash

.PHONY: clean
clean:
	rm -rf dist/*

.PHONY: test
test:
	@echo "Running tests..."
	@$(GOTEST) ${OPTS} $(PKGS)

.PHONY: test-coverage
test-coverage:
	@echo "Running test with coverage..."
	@$(GOTEST) -json -covermode=atomic -coverpkg=./... $(PKGS)
