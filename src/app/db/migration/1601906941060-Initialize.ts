import {MigrationInterface, QueryRunner} from "typeorm";

export class Initialize1601906941060 implements MigrationInterface {
    name = 'Initialize1601906941060'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, "create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "groups" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "REL_9f71bda715870718997ed62f64" UNIQUE ("user_id"), CONSTRAINT "PK_659d1483316afb28afd3a90646e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "groups_member_users" ("group_id" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_18ec06278eeacc61219e166c30a" PRIMARY KEY ("group_id", "user_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_aa4650c340e5acb4a4b652be5a" ON "groups_member_users" ("group_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_12495c9bd57b3a3d4ffcd416b1" ON "groups_member_users" ("user_id") `);
        await queryRunner.query(`ALTER TABLE "groups" ADD CONSTRAINT "FK_9f71bda715870718997ed62f64b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "groups_member_users" ADD CONSTRAINT "FK_aa4650c340e5acb4a4b652be5a4" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "groups_member_users" ADD CONSTRAINT "FK_12495c9bd57b3a3d4ffcd416b15" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "groups_member_users" DROP CONSTRAINT "FK_12495c9bd57b3a3d4ffcd416b15"`);
        await queryRunner.query(`ALTER TABLE "groups_member_users" DROP CONSTRAINT "FK_aa4650c340e5acb4a4b652be5a4"`);
        await queryRunner.query(`ALTER TABLE "groups" DROP CONSTRAINT "FK_9f71bda715870718997ed62f64b"`);
        await queryRunner.query(`DROP INDEX "IDX_12495c9bd57b3a3d4ffcd416b1"`);
        await queryRunner.query(`DROP INDEX "IDX_aa4650c340e5acb4a4b652be5a"`);
        await queryRunner.query(`DROP TABLE "groups_member_users"`);
        await queryRunner.query(`DROP TABLE "groups"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
