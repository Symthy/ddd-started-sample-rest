import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, ManyToMany, JoinTable } from "typeorm";
import { UserModel } from "./UserModel";

@Entity('groups')
export class GroupModel {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToOne(type => UserModel)
  @JoinColumn({ name: 'user_id'})
  owner!: UserModel;

  @ManyToMany(type => UserModel)
  @JoinTable({
    joinColumn: {
      name: 'group_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },})
  members?: UserModel[];

  @CreateDateColumn({ name: 'create_at' })
  readonly createdAt!: Date;

  @CreateDateColumn({ name: 'update_at' })
  readonly updatedAt!: Date;

  constructor(id?: number, name?: string, owner?: UserModel, members?: Array<UserModel>) {

  }
}
