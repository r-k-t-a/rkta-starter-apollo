#!/bin/bash

GENERATED_PATH=src/@types/apollo-client
SERVER_SCHEMA_FILE=$GENERATED_PATH/codegen.json

npx apollo client:download-schema $SERVER_SCHEMA_FILE --excludes=src/**/*.{ts,tsx,graphql} > /dev/null

npx apollo client:codegen --localSchemaFile=$SERVER_SCHEMA_FILE --target=typescript --addTypename --outputFlat --watch $GENERATED_PATH
