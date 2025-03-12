#!/bin/sh

ROOT_DIR=/etc/nginx/html/ui

# environment.js.gz 会影响环境变量的设置
ENV_GZIP_FILE=$ROOT_DIR/static/js/environment.js.gz
  
# 检查文件是否存在  
if [ -f "$ENV_GZIP_FILE" ]; then  
  # 文件存在，删除它  
  rm "$ENV_GZIP_FILE"  
  echo "Gzip file '$ENV_GZIP_FILE' deleted."  
else  
  echo "Gzip file '$ENV_GZIP_FILE' not exist."  
fi

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

echo "Replace result is:"
echo "--------------------------------------------------"

cat $ROOT_DIR/static/js/environment.js;

echo "--------------------------------------------------"

echo "Starting Nginx"
