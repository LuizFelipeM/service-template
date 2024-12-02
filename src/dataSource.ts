import { DataSource } from 'typeorm'
import { UserDao } from './infrastructure/adapters/data-access-objects/User.dao'

export const dataSource = new DataSource({
	type: 'postgres',
	url: process.env.DB_CONNECTION_STRING,
	synchronize: true,
	// ssl: true,
	logging: false,
	entities: [UserDao],
	migrations: [],
	subscribers: [],
})
