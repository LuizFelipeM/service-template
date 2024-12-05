up-rabbit:
	docker-compose -f docker/docker-compose.rabbitmq.yml up -d
up-dev:
	docker-compose -f docker/docker-compose.dev.yml --env-file .env up -d
up-dev-build:
	docker-compose -f docker/docker-compose.dev.yml --env-file .env up -d --build
up:
	docker-compose -f docker/docker-compose.yml --env-file .env up -d
up-build:
	docker-compose -f docker/docker-compose.yml --env-file .env up -d --build
down:
	docker-compose -f docker/docker-compose.yml --env-file .env down