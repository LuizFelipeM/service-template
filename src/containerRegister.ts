import { container } from "tsyringe";
import { DataSource, Repository } from "typeorm";
import { UserDao } from "./infrastructure/adapters/data-access-objects/User.dao";

export function containerRegister(dataSource: DataSource) {
  container.register<Repository<UserDao>>(Repository<UserDao>, { useValue: dataSource.getRepository(UserDao) })
}