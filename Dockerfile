FROM node:14-alpine

WORKDIR /app

# Copy and install packages

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN ["apk", "add", "git"]
RUN ["yarn"]

# Copy project files

COPY contracts contracts
COPY src src
COPY hardhat.config.ts hardhat.config.ts
COPY tsconfig.json tsconfig.json

EXPOSE 8545

# Set entrypoint to hardhat. See README.md to check how to use this command
ENTRYPOINT ["yarn", "hardhat"]