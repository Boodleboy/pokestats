run:
	npm run start

deploy:
	docker build -t boodleboy/pokestats .
	docker push boodleboy/pokestats
	ssh server1 'bash -s' < ./scripts/deploy.sh

