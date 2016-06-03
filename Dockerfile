FROM node:5.11

EXPOSE 80

RUN apt-get update \
 && apt-get install -y git nginx build-essential \
 && apt-get clean

COPY default.conf /etc/nginx/conf.d/
RUN rm /etc/nginx/sites-enabled/default
CMD ["nginx", "-g", "daemon off;"]
