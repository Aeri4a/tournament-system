import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserEntity1746613900973 implements MigrationInterface {
  name = 'UserEntity1746613900973';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "firstName" character varying(30) NOT NULL, "lastName" character varying(40) NOT NULL, "email" character varying(50) NOT NULL, "passwordHash" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT false, "activationToken" text, "activationExpires" TIMESTAMP WITH TIME ZONE, "passwordResetToken" text, "passwordResetExpires" TIMESTAMP WITH TIME ZONE, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
