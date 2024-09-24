#!/bin/sh

sudo su

IMAGE=pokestats
CONTAINER=$IMAGE-container

docker pull boodleboy/$IMAGE:latest

docker stop $CONTAINER
docker rm $CONTAINER

docker run -d \
	--name $CONTAINER \
	-p 3000:80 \
	-v /etc/letsencrypt:/etc/letsencrypt \
	--restart unless-stopped \
	boodleboy/$IMAGE:latest

