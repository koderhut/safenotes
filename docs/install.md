# Installation steps

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
