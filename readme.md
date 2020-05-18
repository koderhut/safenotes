# SafeNotes

A self-hosting app that allows to quickly and securely exchange sensitive information like credentials.

## Instalation

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
