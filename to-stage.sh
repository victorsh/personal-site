#!/bin/bash

cd stage
find . ! \( -name 'dev-server.js' -o -name 'index.html' \) -type f -exec rm -f {} +
cd ../
cp -R dist/. stage/
