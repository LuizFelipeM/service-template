import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: "user" })
export class UserDao {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  id: string

  @Column("text", { name: "name" })
  name: string

  @Column("text", { name: "email" })
  email: string
}
