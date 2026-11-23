# syntax=docker/dockerfile:1
FROM ubuntu:24.04 AS builder
RUN apt update && apt install -y default-jdk maven
COPY ./pom.xml .
RUN mvn dependency:go-offline dependency:resolve-plugins
COPY . .
RUN mvn package

FROM ubuntu:24.04 AS runtime
RUN apt update && apt install -y default-jre
COPY --from=builder /target/helloworldapp.jar .
EXPOSE 8080
CMD [ "java", "-jar", "helloworldapp.jar" ]