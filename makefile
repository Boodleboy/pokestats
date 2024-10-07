run:
	npm run start

deploy:
	npm run build
	docker build -t boodleboy/pokestats .
	docker push boodleboy/pokestats
	ssh server1 'bash -s' < ./scripts/deploy.sh

