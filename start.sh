#!/bin/bash

docker run -it \
           -v $PWD:/app \
           -v hardhat_cache:/root/.cache/hardhat-nodejs \
           --name polygon_contracts \
           --rm \
           polygon_contracts $1