up:
	docker-compose -f docker/docker-compose.yml --env-file .env up -d
up-build:
	docker-compose -f docker/docker-compose.yml --env-file .env up -d --build
down:
	docker-compose -f docker/docker-compose.yml --env-file .env down