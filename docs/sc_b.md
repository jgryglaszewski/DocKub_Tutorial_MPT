CMD

## basic.Dockerfile

- exit spring-boot app in terminal
- close terminal
> vscode
- type `docker build -t sb-hello:basic` --file basic.Dockerfile . 
- type:
    - `docker run --name sb-app-basic -p 9090:8080 sb-hello:basic`
    or
    - `docker run --name sb-app-basic -p 127.0.0.1:9090:8080 sb-hello:basic`
> browser+terminal
- go to http://localhost:9090/names
- in terminal type `curl -X POST localhost:9090/greeting -H 'Content-type:application-json' -d '{"name": "Marcin"}'`
- watch in browser
- type `curl -X POST localhost:9090/greeting -H 'Content-type:application-json' -d '{"name": "Jan"}'`
> vscode
- run another instance of the app: `docker run --name sb-app2-basic -p 9091:8080 sb-hello:basic`
- point out downloading all of the dependencies once again by Maven
> browser
- go to http://localhost:9091/names - there's nothing there, because its data is stored in other database running in other container