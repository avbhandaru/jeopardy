# jeopardy
This is the Jeopardy monorepo

**NOTE: This will be the best jeopardy thing you've ever laid your eggs in!**

## Setup
### Backend:
```sh
curl https://sh.rustup.rs -sSf | sh
echo 'export PATH=$HOME/.cargo/bin:$PATH' >> ~/.zshrc
echo 'source $HOME/.cargo' >> ~/.zshrc
cargo install diesel_cli --no-default-features --features postgres
brew install bazelisk
```

### Local infrastructure:
First download docker from [here](https://www.docker.com/products/docker-desktop/). Then start docker desktop. And then run the following commands:
```sh
cd infrastructure
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

First run the migrations:
```sh
cd backend/db
diesel migration run \
    --database-url postgres://jeopardy:password@localhost:5432/jeopardy \
    --migration-dir ./migrations \
    --config-file diesel.toml
```

To add some test data do this:
```sh
DATABASE_URL=postgres://jeopardy:password@localhost:5432/jeopardy bazel run //backend:main
```

### General:
```sh
brew install yarn
```

### Frontend:
```sh
brew install nvm
mkdir ~/.nvm
```

Add the following lines to your `~/.zshrc`
```sh
export NVM_DIR="$HOME/.nvm"
[ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"  # This loads nvm
[ -s "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion
```

Then run to install node:
```sh
source ~/.zshrc
nvm install 20.13.1
brew install ibazel
bazel run @pnpm//:pnpm -- --dir $PWD/frontend install
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

To run the frontend React app:
```sh
bazel build //frontend/...
ibazel run //frontend:dev_server
open http://localhost:9000 # Port we're running the frontend from
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

## Database TODOs:
1. ~Get inserts and updates working~
1. ~Get update_timestamps() working~
1. Move schema types to new DAL (data access layer) library
1. Figure out naming convention of migration files

## High priority items
1. Get `GraphQL` server working + initial patterns
2. ~Get Schema migrations and ORM setup~
3. ~Get docker-compose.yaml file for local database and testing~

## Frontend TODOs:
1. Move to TypeScript
1. Add MaterialUI components and dependency
1. Add Apollo GraphQL binary
1. Get `bazel run //:buildifier` working again

## Low priority items
1. Husky pre-commit setup
