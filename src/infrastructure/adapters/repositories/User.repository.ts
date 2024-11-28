import { injectable, inject } from "tsyringe";
import { Repository } from "typeorm";
import { User } from "../../../domain/entities/User.entity";
import { UserDao } from "../data-access-objects/User.dao";
import { Email } from "../../../domain/value-objects/Email.valueobject";

@injectable()
export class UserRepository {
  constructor(@inject(Repository<UserDao>) private repository: Repository<UserDao>) { }

  async findById(id: string): Promise<User | null> {
    const userDao = await this.repository.findOneBy({ id })
    return userDao ? new User(userDao.name, Email.create(userDao.email), userDao.id) : null;
  }

  async save(user: User): Promise<void> {
    await this.repository.save({
      id: user.id,
      name: user.name,
      email: user.email.getValue()
    });
  }
}