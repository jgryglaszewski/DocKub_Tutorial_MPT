FROM eclipse-temurin:21-alpine@sha256:82801f9dcdcbad5a05082aba8c86d1da5b72ccb498e71318b1f91b5a477887b3 AS build
COPY . /usr/src/helloworldapp
WORKDIR /usr/src/helloworldapp
RUN javac HelloWorld.java

FROM eclipse-temurin:21-jre-alpine@sha256:ac05c3c42b7c2f1a52c9bd52f01041fa1958231b15ebeae7420429cbc5baf474
COPY --from=build /usr/src/helloworldapp/HelloWorld.class /usr/src/helloworldapp/
WORKDIR /usr/src/helloworldapp

CMD ["java", "HelloWorld"]
