import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class GroupDao {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToOne(type => UserDao)
  @JoinColumn()
  owner!: string;

}
