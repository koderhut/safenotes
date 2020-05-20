# SafeNotes

A self-hosting app that allows to quickly and securely exchange sensitive information like credentials.

## Instalation

### From Docker Hub:
Run: ``docker run --rm -p 80:80 safenotes:latest serve -v``

> **Warning:** This image with default configuration should only be used for a quick test run and not production.
> For a production mode you should take a look at the environment variables and override
> the configuration as needed

### From Source:
1) Clone the Github repository:
``git clone https://github.com/koderhut/safenotes`` 
2) Run the build command to build the Docker image: 
``make build build-docker TAG=0.1.0``
3) Create and configure the `.safenotes.yaml` configuration file:
`` cp .configs/.safenotes.yaml.example ${HOME}/.safenotes.yaml ``
4) Create a Docker container: 
``docker run --name=safenotes -v $(pwd)/.safenotes.yaml:/safenotes/.safenotes.yaml -p 80:80 -p443:443 safenotes:0.1.0``

## Tech stack
Frontend is built using React, TailwindCSS and CryptoJs.
Backend is built using Go.

# Third-party
Icons used in frontend app made by [Vectors Market](https://www.flaticon.com/authors/vectors-market) from [www.flaticon.com](https://www.flaticon.com/) 

## License
Check license file found in the repository
