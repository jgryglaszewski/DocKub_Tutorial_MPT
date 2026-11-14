> [!TIP]
> Add your user to the docker group so you don’t need sudo each time:
> ```bash
> sudo usermod -aG docker $USER
> ```
> Then apply the change. The easiest way is to log out and log back in. Or, in the same terminal, run:
> ```bash
> newgrp docker
> ```
