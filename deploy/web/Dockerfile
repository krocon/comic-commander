FROM nginxinc/nginx-unprivileged

#RUN rm /etc/nginx/conf.d/default.conf

COPY dist/apps/comiccommander /usr/share/nginx/html

COPY deploy/web/conf /etc/nginx

USER root

EXPOSE 4200 80

CMD ["nginx", "-g", "daemon off;"]
