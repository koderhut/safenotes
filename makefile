
build : main.go
	go build -o built/safenotes2 .

react-sh:
	docker exec -ti sn-react bash

clean:
	rm -rf built/*