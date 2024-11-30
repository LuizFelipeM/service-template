import { AmqpClient } from "amqp-simple-client";
import { container } from "tsyringe";
import { DataSource, Repository } from "typeorm";
import { UserDao } from "./infrastructure/adapters/data-access-objects/User.dao";

export function containerRegister(dataSource: DataSource) {
  container.register<AmqpClient>(AmqpClient, { useValue: new AmqpClient(process.env.RABBITMQ_URL!) })

  //#region Repositories
  container.register<Repository<UserDao>>(Repository<UserDao>, { useValue: dataSource.getRepository(UserDao) })
  //#endregion
}