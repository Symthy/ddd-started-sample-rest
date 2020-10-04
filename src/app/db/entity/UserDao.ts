import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity('users')
export class UserDao {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    type!: string;

}
