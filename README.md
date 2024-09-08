# jeopardy
This is the Jeopardy monorepo

**NOTE: This will be the best jeopardy thing you've ever laid your eggs in!**

## Setup
Backend:
```sh
brew install rustup
brew install bazelisk
```

General:
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
./bazel-bin/backend/main
```

To run directly:
```sh
bazel run //backend:main
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
