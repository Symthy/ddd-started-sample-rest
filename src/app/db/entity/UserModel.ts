import { User } from "#/domain/User";
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm";

@Entity('users')
export class UserModel {

    @PrimaryGeneratedColumn()
    readonly id!: number;

    @Column()
    name!: string;

    @Column()
    type!: string;

    @CreateDateColumn({ name: 'create_at' })
    readonly createdAt!: Date;

    @CreateDateColumn({ name: 'update_at' })
    readonly updatedAt!: Date;

    constructor(user: User) {
        this.id = user.id.value;
        this.name = user.name.value;
        this.type = user.type ? user.type.toString(): "";
    }
}
