# Service Template

This template cover all the key aspects needed for the development of a end-to-end microservice: Frontend, Backend, Database, Messaging.

## Architecture

The hexagonal architecture was choosen due to their flexibility. The idea of coding for adapters, decoupling the internal domain from the external world, makes the hexagonal architecture well suited for the flexibility required among different microservices.

Other good benefit of defining a unique architecture and other tools/technologies among all microservices using this template is setting a standard and facilitating the projects maintenance. If all projects use the same stack and architecture, is easier to understand and locate things inside different projects contributing to an easy maintainability.

Docker was also added to the project as the primary way of development so no need to set up external databases or message brokers.

## Technologies

The technologies also were choosen based on their flexibility, simplicity and previous knowledge. Also, worth mentioning, that this technologies are selected so they can be easily updated/replaced independently if necessary, this is the reason behind why I decided not to go with NestJS, everything would be thighted to it.
- Typescript + NodeJS
- Express - API
- TSyringe - DI Container
- TypeORM - Database ORM
- PostgreSQL - DBMS
- RabbitMQ - Message broker

## To Do
- Add RabbitMQ to docker-compose.yml
- Add linter to reinforce code standard