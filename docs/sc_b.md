# Super duper scenario:

## Download docker engine:

> browser

Go to official docker website / application development / Docker Engine
- We will be using Linux
- Docker desktop for Windows
- Remember about post-installation setup
- firewall problems (juefdabliu is nono, nftables are experimental)
- guide for iptables (we won't be covering that)

## Hello World
>terminal
- type `systemctl status docker` to see funny things
- `docker run hello-world` to start
  - docker pulls image from dockerhub
  - docker creates container based on pulled image
- `docker images` to list images
- mention "container vs image" on github
- short explanarion of difference
- `docker ps` and `docker ps -a` to see containers
- what is status of container
- `docker rm` to remove container
- `docker image rm` to remove image

## Web API
> vscode
- talk about webapi

> browser + terminal
- show webapi working
- show curling (in terminal type `curl -X POST localhost:8080/greeting -H 'Content-type:application-json' -d '{"name": "Marcin"}'`)
- we won't that automated

## Dockerfile
> vscode + terminal
- show first docker (explain) <!-- - `docker build .` untagged -->
- `docker build -t sb-hello:basic .` is ok <!-- - `docker run --name <name> <image>` unresponsive -->
- `docker run --name sb-app2-basic -p 127.0.0.1:9090:8080 -d sb-hello:basic` is ok
- `docker ps`
- talk about statuses

> browser + terminal <!-- - show that it is unresponsive -->
- go to http://localhost:9090/names
- in terminal type `curl -X POST localhost:9090/greeting -H 'Content-type:application-json' -d '{"name": "Marcin"}'`
- run another instance of the app: `docker run --name sb-app2-basic -p 9091:8080 -d sb-hello:basic`
- point out downloading all of the dependencies once again by Maven
- go to http://localhost:9091/names - there's nothing there, because its data is stored in other database running in other container

## cache.Dockerfile
> vscode + terminal
- we don't want maven to download everything everytime container is started
- show cache Dockerfile
- `docker build -t sb-hello:cache --file cache.Dockerfile .`
- `docker run --name sb-app-cache -p 9092:8080 -d sb-hello:cache`

> browser + terminal
- `curl -X POST localhost:9092/greeting -H 'Content-type:application-json' -d '{"name": "Marcin"}'`
- go to http://localhost:9092/names

> vscode + terminal
- `docker images`
- show size - size is even bigger then previously because maven downloaded dependencies
- talk about caching, change 'hello' to 'greetings' and build again - fast
- change pom.xml - slow

> Optional <br>
> vscode + terminal
> - `docker run -it --name sb-app-cache-2 -p 9093:8080  sb-hello:cache sh` for debugging

## multi.Dockerfile

- show multistage Docker
- `docker build -t sb-hello:multi --file multi.Dockerfile .`
- `docker run --name sb-app-multi -p 9093:8080 -d sb-hello:multi`

> browser + terminal
- `curl -X POST localhost:9093/greeting -H 'Content-type:application-json' -d '{"name": "Marcin"}'`
- go to http://localhost:9093/names
- `docker images` - size still big

> Optional <br>
> vscode + terminal
> - `docker build -t sb-hello:multi-builder --target builder --file multi.Dockerfile .`
> - `docker -it --name sb-app-multi-builder sb-hello:multi-builder` for debugging

## multi-temurin.Dockerfile
> vscode + terminal
- show temurin Dockerfile
- point out all the quirks
- `docker build -t sb-hello:multi-temurin --file multi-temurin.Dockerfile .`
- `docker images` - size small

## multi-multi.Dockerfile
- show last Dockerfile
- talk it through
