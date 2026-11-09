# Docker vs. uv

During our last presentation, we were asked why one should use Docker if there are tools like uv. The fact that this question was asked tells us that, while we were focused on the “works on my machine” problem, we did a poor job of describing what containerization is and what Docker is used for. This short text outlines the differences between these two tools.

## Similarities

As mentioned during the presentation, both uv and Docker can solve the “works on my machine” problem. After, for example, cloning a Python project from GitHub, we can make it work with just a few commands. Similarly, after pulling an image from Docker Hub, only one command is needed. So Docker barely saves any additional effort here, and the image takes up more disk space (but this trade-off brings many benefits). But the similarities end here. uv is a Python package manager, so it only manages Python-related dependencies, while Docker is a containerization tool that packages the system configuration, the application, its dependencies, the runtime environment, and much more.

## Containerization

A container can be described as a box that contains an application and all its dependencies (it is a running process). Containers are created from container images, which provide binary files, libraries, configuration, etc. To put it simply, when we build an image, we tell Docker: “Imagine you are Ubuntu xyz, download this and that, here is my application’s source code (or binary), and when I run this image, execute this command inside.” Docker follows the instructions and saves a snapshot[^1] (which we call an image) of that “Ubuntu xyz” environment. From now on, whenever we want, we can create containers based on the image. For example, after building an image of our Python back-end app, we can run three instances in separate containers. Images are immutable, which makes them reusable. Containers are isolated from both the host OS and other containers[^2].

### Why is this useful?

It can solve the “works on my machine” problem, but we already know that, so what else? One example is the microservices architecture. Let’s imagine we have a giant application (we call this a monolithic architecture). At some point, we may realize that some parts of that application can be reused elsewhere, or we may want to replace one part with a different one. We can cut that big application into smaller pieces (a microservices architecture), and then we can develop each piece independently, swap pieces whenever we want, or reuse them elsewhere. But deployment suddenly becomes really hard. To solve that problem, we may pack every app into an image, and now all microservices have the same interface (through Docker), so we can automate deployment and management (through Docker Compose or orchestration). Now someone may ask how microservices work together if every container is isolated. To overcome this problem, a virtual network is established, which the containers use to communicate.

### Orchestration

Containers may stop working for known or unknown reasons. To keep the application working, such a container needs to be restarted. This can be done manually, but in big systems it would be too much to handle. That is why we can use orchestration: Kubernetes will watch over the containers for us and restart them if needed. This is called self-healing, and it is only one example of orchestration, but we won’t describe it in greater detail to keep things simple.

## uv

As mentioned earlier, uv is a Python package manager: it keeps track of the dependencies of a project or script and installs them when needed. These dependencies are kept in a “virtual environment”, which means that different projects don’t see each other’s dependencies (the OS doesn’t see them either, although there are exceptions).

### Where is this useful?

It is useful, of course, in Python development. uv installs everything we tell it to without making a mess in the OS. It also enables us to have different versions of the same library for different projects (even different versions of Python) without any problems with system configuration. uv configuration can easily be exported, so other developers can quickly install the same dependencies.

### Limitations of uv

uv will not install system libraries, set up a database or do anything unrelated to Python. Anything outside the Python ecosystem has to be handled by other tools, which is where Docker comes in.

## Summary

uv is great for managing Python applications, Docker on the other hand is great at managing environment in which Python application will run. Often, Docker and uv are used together: uv is responsible for intalling Python packages inside the Docker image.
___
**References (9.11.2026)**:
- https://docs.astral.sh/uv/
- https://docs.astral.sh/uv/guides/integration/docker/
- https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/
- https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-an-image/
- https://docs.docker.com/manuals/
- https://aws.amazon.com/microservices/

[^1]: Docker does much more than create a simple snapshot but we want to keep things simple for now.
[^2]: Under the hood, containers share the kernel with the host OS, so the isolation is not at the level of a virtual machine. However, the differences between containers and virtual machines are not the topic of this text.
