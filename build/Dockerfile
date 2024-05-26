FROM nginx:latest

LABEL cn.herodotus.image.authors="herodotus@aliyun.com"

ENV LISTEN_PORT=8000
ENV SERVER_NAME=localhost
ENV HERODOTUS_SERVER_ADDR=192.168.101.10:8847
ENV HERODOTUS_SERVER_PROJECT=dante
ENV HERODOTUS_PROJECT_NAME="Herodotus Cloud"
ENV HERODOTUS_OAUTH2_CLIENT_ID='14a9cf797931430896ad13a6b1855611'
ENV HERODOTUS_OAUTH2_CLIENT_SECRET='a05fe1fc50ed42a4990c6c6fc4bec398'
ENV HERODOTUS_OAUTH2_REDIRECT_URI='http://192.168.101.10:3000/authorization-code'

COPY dist/  /etc/nginx/html/ui
COPY favicon.ico  /etc/nginx/html/ui
COPY template.conf /etc/nginx/templates/default.conf.template
COPY docker-entrypoint.sh /

RUN chmod 777 /docker-entrypoint.sh

EXPOSE 8000

CMD /docker-entrypoint.sh nginx -g 'daemon off;'

