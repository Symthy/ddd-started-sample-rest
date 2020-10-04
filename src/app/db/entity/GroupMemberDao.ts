import { Entity, OneToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { GroupDao } from "./GroupDao";
import { UserDao } from "./UserDao";

@Entity('group_members')
export class GroupMemberDao {

  @PrimaryColumn({ name: 'group_id' })
  @OneToOne(type => GroupDao)
  @JoinColumn()
  groupId!: string;

  @PrimaryColumn({ name: 'user_id' })
  @OneToOne(type => UserDao)
  @JoinColumn()
  userId!: number;

}
