up:
	docker-compose -f docker/docker-compose.yml up -d
up-build:
	docker-compose -f docker/docker-compose.yml up -d --build
down:
	docker-compose down