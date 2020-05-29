# SafeNotes

[![SafeNotes](https://circleci.com/gh/koderhut/safenotes.svg?style=shield)](https://circleci.com/gh/koderhut/safenotes)
![GitHub go.mod Go version](https://img.shields.io/github/go-mod/go-version/koderhut/safenotes?style=flat-square)
![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/koderhut/safenotes?style=flat-square)
![Docker Pulls](https://img.shields.io/docker/pulls/denisrendler/safenotes?style=flat-square)
![GitHub](https://img.shields.io/github/license/koderhut/safenotes?style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/koderhut/safenotes?style=flat-square)
![GitHub Release Date](https://img.shields.io/github/release-date/koderhut/safenotes?style=flat-square)
![PullRequests are Welcomed](https://img.shields.io/badge/PRs-welcome-green?style=flat-square)


A self-hosting app that allows to quickly and securely exchange sensitive information like credentials.

## Instalation

### From Docker Hub:
Run: ``docker run --rm -p 80:80 denisrendler/safenotes:latest serve -v``

> **Warning:** This image with default configuration should only be used for a quick test run and not production.
> For a production mode you should take a look at the environment variables and override the configuration as needed

**For PRODUCTION usage you need to take the following steps:**
1) copy the file [configs/.safenotes.yaml.example](https://github.com/koderhut/safenotes/blob/master/configs/.safenotes.yaml.example) to your host machine

2) update the contents according to your needs, most of the times this means just updating the domain names

3) run the container with bind-mounts for the certificates and new config, ie: 

``docker run --name=safenotes --restart=unless-stoppped -v $(pwd)/certs:/safenotes/config -v $(pwd)/.safenotes.prod.yaml:/safenotes/.safenotes.yaml denisrendler/safenotes:latest``

4) enjoy


### From Source:
1) Clone the Github repository:
``git clone https://github.com/koderhut/safenotes`` 

2) Create and configure the `.safenotes.yaml` configuration file:
`` cp .configs/.safenotes.yaml.example ${HOME}/.safenotes.yaml ``

3) Run the build command to build the Docker image: 
``make release-docker REPO=safenotes TAG=self-hosted``

4) Create a Docker container: 
``docker run --name=safenotes -v $(pwd)/.safenotes.yaml:/safenotes/.safenotes.yaml  -v $(pwd)/certs:/safenotes/config -p 80:80 -p 443:443 safenotes:self-hosted``

## Tech stack
Frontend is built using React, TailwindCSS and CryptoJs.
Backend is built using Go.

# Third-party
Icons used in frontend app made by [Vectors Market](https://www.flaticon.com/authors/vectors-market) from [www.flaticon.com](https://www.flaticon.com/) 

## License
Check license file found in the repository
