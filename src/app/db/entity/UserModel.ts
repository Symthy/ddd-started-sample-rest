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

    constructor(id?: number, name?: string, type?: string) {
        if (id) {
            this.id = id;
        }
        if (name) {
            this.name = name;
        }
        if (type) {
            this.type = type;
        }
    }
}
