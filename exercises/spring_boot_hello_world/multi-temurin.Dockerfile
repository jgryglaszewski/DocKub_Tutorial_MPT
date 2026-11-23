# syntax=docker/dockerfile:1
FROM maven:3-eclipse-temurin-21-alpine AS builder
COPY ./pom.xml .
RUN mvn dependency:go-offline dependency:resolve-plugins
COPY . .
RUN mvn package

FROM eclipse-temurin:21-jre-alpine AS runtime
COPY --from=builder /target/helloworldapp.jar .
EXPOSE 8080
CMD [ "java", "-jar", "helloworldapp.jar" ]