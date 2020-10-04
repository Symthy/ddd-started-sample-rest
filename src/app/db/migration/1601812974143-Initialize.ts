import {MigrationInterface, QueryRunner} from "typeorm";

export class Initialize1601812974143 implements MigrationInterface {
    name = 'Initialize1601812974143'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "groups" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "ownerId" integer, CONSTRAINT "REL_4d8d8897aef1c049336d8dde13" UNIQUE ("ownerId"), CONSTRAINT "PK_659d1483316afb28afd3a90646e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "group_members" ("group_id" character varying NOT NULL, "user_id" integer NOT NULL, "groupIdId" integer, "userIdId" integer, CONSTRAINT "REL_356fa634ec62182888d9155959" UNIQUE ("groupIdId"), CONSTRAINT "REL_9b553e80f0bf9af521923f3361" UNIQUE ("userIdId"), CONSTRAINT "PK_f5939ee0ad233ad35e03f5c65c1" PRIMARY KEY ("group_id", "user_id"))`);
        await queryRunner.query(`ALTER TABLE "groups" ADD CONSTRAINT "FK_4d8d8897aef1c049336d8dde13f" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_members" ADD CONSTRAINT "FK_356fa634ec62182888d91559591" FOREIGN KEY ("groupIdId") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_members" ADD CONSTRAINT "FK_9b553e80f0bf9af521923f33613" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "group_members" DROP CONSTRAINT "FK_9b553e80f0bf9af521923f33613"`);
        await queryRunner.query(`ALTER TABLE "group_members" DROP CONSTRAINT "FK_356fa634ec62182888d91559591"`);
        await queryRunner.query(`ALTER TABLE "groups" DROP CONSTRAINT "FK_4d8d8897aef1c049336d8dde13f"`);
        await queryRunner.query(`DROP TABLE "group_members"`);
        await queryRunner.query(`DROP TABLE "groups"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
