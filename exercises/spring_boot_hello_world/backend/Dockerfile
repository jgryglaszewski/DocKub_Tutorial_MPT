# from https://gist.github.com/gabrielbauman/b518981a730c7ff397a8140dc1204628
# Cache maven dependencies as an intermediate docker image
# (This only happens when pom.xml changes or you clear your docker image cache)
FROM maven:3-eclipse-temurin-21-alpine@sha256:6e5df865a159b4e738ea7c330c069f872eecfd4e978963720f8b0264338c300d AS dependencies
COPY pom.xml /build/
WORKDIR /build/
RUN mvn --batch-mode dependency:go-offline dependency:resolve-plugins

# Build the app using Maven and the cached dependencies
# (This only happens when your source code changes or you clear your docker image cache)
# Should work offline, but https://issues.apache.org/jira/browse/MDEP-82
FROM maven:3-eclipse-temurin-21-alpine@sha256:6e5df865a159b4e738ea7c330c069f872eecfd4e978963720f8b0264338c300d AS build
COPY --from=dependencies /root/.m2 /root/.m2
COPY pom.xml /build/
COPY src /build/src
WORKDIR /build/
RUN mvn package

# Run the application (using the JRE, not the JDK)
# This assumes that your dependencies are packaged in application.jar
FROM eclipse-temurin:21-jre-alpine@sha256:ac05c3c42b7c2f1a52c9bd52f01041fa1958231b15ebeae7420429cbc5baf474
COPY --from=build /build/target/helloworldapp.jar ./helloworldapp.jar
EXPOSE 8080
CMD ["java", "-jar", "./helloworldapp.jar"]


# docker run --rm -p 8080:8080 --name helloworldapp helloworld