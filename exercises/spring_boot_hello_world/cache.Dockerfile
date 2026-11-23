# syntax=docker/dockerfile:1
FROM ubuntu:24.04
RUN apt update && apt install -y default-jdk maven
COPY ./pom.xml .
RUN mvn dependency:go-offline dependency:resolve-plugins
COPY . .
EXPOSE 8080
CMD [ "mvn", "spring-boot:run" ]