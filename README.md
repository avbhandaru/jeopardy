# jeopardy
This is the Jeopardy monorepo

**NOTE: This will be the best jeopardy thing you've ever laid your eggs in!**

## Setup
### Backend:
```sh
# curl https://sh.rustup.rs -sSf | sh
# echo 'export PATH=$HOME/.cargo/bin:$PATH' >> ~/.zshrc
# echo 'source $HOME/.cargo' >> ~/.zshrc
# cargo install diesel_cli --no-default-features --features postgres
brew install bazelisk
```

### Local infrastructure:
First download docker from [here](https://www.docker.com/products/docker-desktop/). Then start docker desktop. And then run the following commands:
```sh
docker-compose up -d
docker ps
brew install libpq
echo 'export PATH=$PATH:/opt/homebrew/opt/libpq/bin' >> ~/.zshrc
source ~/.zshrc
```

Now you should be able to access your database using `psql` like so:
```sh
psql -d postgres://jeopardy:password@localhost:5432/jeopardy
```

**Temporary**: To add some test data do this:
```
create table users (id int primary key, name text);
insert into users (id, name) values (1, 'Akhil'), (2, 'Matt'), (3, 'Hana'), (4, 'Alex');
```

### General:
```sh
brew install yarn
brew install nvm
mkdir ~/.nvm
```

Add the following lines to your `~/.zshrc`
```sh
export NVM_DIR="$HOME/.nvm"
[ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"  # This loads nvm
[ -s "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion
```

Then run:
```sh
source ~/.zshrc
nvm install 18.20.4
```

## Run
To build and then run using the generated binary:
```sh
bazel build //backend/...
DATABASE_URL='...' ./bazel-bin/backend/main
```

To run directly:
```sh
DATABASE_URL='...' bazel run //backend:main
```

**NOTE:** For a local postgres docker container the `DATABASE_URL` is:
```
postgres://jeopardy:password@localhost:5432/jeopardy
```

To build and test a particular sub-tree:
```sh
bazel build //backend/lib/...
bazel test //backend/lib/tests/...
```

To build and test a particular target:
```sh
bazel build //backend/lib:lib
bazel test //backend/lib/tests:tests
```

To format all of our `BUILD.bazel` files:
```sh
bazel run //:buildifier
```

## Zed Settings
```json
TODO
```

## Goals
1. Build the entire project using Bazel
2. Use `Rust, TypeScript, Terraform` for implementation
3. Use `GraphQL, Apollo, React`
4. Use `MaterialUI` or `Antd` for frontend development (until we want more customization)
5. Use a modern SQL migration tool

## High priority items
1. Get `GraphQL` server working + initial patterns
2. Get Schema migrations and ORM setup
3. Get docker-compose.yaml file for local database and testing

## Low priority items
1. Husky pre-commit setup
