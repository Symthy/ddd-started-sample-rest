import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, ManyToMany, JoinTable } from "typeorm";
import { UserDao } from "./UserDao";

@Entity('groups')
export class GroupDao {

  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column()
  name!: string;

  @OneToOne(type => UserDao)
  @JoinColumn({ name: 'user_id'})
  owner!: string;

  @ManyToMany(type => UserDao)
  @JoinTable({
    joinColumn: {
      name: 'group_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },})
  member?: UserDao[];

  @CreateDateColumn({ name: 'create_at' })
  readonly createdAt!: Date;

  @CreateDateColumn({ name: 'update_at' })
  readonly updatedAt!: Date;
}
