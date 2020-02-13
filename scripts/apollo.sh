#!/bin/bash

GENERATED_PATH=src/@types/generated
SERVER_SCHEMA_FILE=$GENERATED_PATH/server-schema.json

npx apollo client:download-schema $SERVER_SCHEMA_FILE --excludes=src/**/*.{ts,tsx,graphql}

npx apollo codegen:generate --localSchemaFile=$SERVER_SCHEMA_FILE --target=typescript --addTypename --outputFlat --watch $GENERATED_PATH
