import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { UserDao } from "./UserDao";

@Entity('groups')
export class GroupDao {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToOne(type => UserDao)
  @JoinColumn()
  owner!: string;

}
