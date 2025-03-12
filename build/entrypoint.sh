#!/bin/sh

ROOT_DIR=/etc/nginx/html/ui

# Replace env vars in JavaScript files
echo "Replacing env constants in JS"
for file in $ROOT_DIR/static/js/environment.js;
do
  echo "Processing $file ...";
  sed -i 's|HERODOTUS_SERVER_PROJECT|'${HERODOTUS_SERVER_PROJECT}'|g' $file
  sed -i 's|HERODOTUS_PROJECT_NAME|'${HERODOTUS_PROJECT_NAME}'|g' $file
  sed -i 's|HERODOTUS_OAUTH2_CLIENT_ID|'${HERODOTUS_OAUTH2_CLIENT_ID}'|g' $file
  sed -i 's|HERODOTUS_OAUTH2_CLIENT_SECRET|'${HERODOTUS_OAUTH2_CLIENT_SECRET}'|g' $file
  sed -i 's|HERODOTUS_OAUTH2_REDIRECT_URI|'${HERODOTUS_OAUTH2_REDIRECT_URI}'|g' $file
  sed -i 's|HERODOTUS_USE_DISABLE_DEVTOOL|'${HERODOTUS_USE_DISABLE_DEVTOOL}'|g' $file
done

echo "Starting Nginx"
