import { Entity, OneToOne, JoinColumn } from "typeorm";
import { GroupDao } from "./GroupDao";
import { UserDao } from "./UserDao";

@Entity()
export class GroupMemberDao {

  @OneToOne(type => GroupDao)
  @JoinColumn()
  group_id!: string;

  @OneToOne(type => UserDao)
  @JoinColumn()
  user_id!: number;

}
