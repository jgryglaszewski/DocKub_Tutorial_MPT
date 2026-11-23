# syntax=docker/dockerfile:1
FROM ubuntu:24.04
RUN apt update && apt install -y default-jdk maven
COPY . .
EXPOSE 8080
CMD [ "mvn", "spring-boot:run" ]