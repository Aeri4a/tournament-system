import { MigrationInterface, QueryRunner } from 'typeorm';

export class TournamentRegistration1748893920069 implements MigrationInterface {
  name = 'TournamentRegistration1748893920069';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tournament_registrations" ("id" SERIAL NOT NULL, "tournamentId" integer NOT NULL, "userId" integer NOT NULL, "licenseNumber" character varying(100) NOT NULL, "currentRanking" integer NOT NULL, "registrationDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_be910cb4843625ac6127801435d" UNIQUE ("tournamentId", "licenseNumber"), CONSTRAINT "UQ_98301ff9bd29f286759625d1715" UNIQUE ("tournamentId", "userId"), CONSTRAINT "PK_3354f23042eaec7b08ec3b61b81" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a0854dd5082187c75a7ce58468" ON "tournament_registrations" ("tournamentId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c415e08c7384bc574a13ac318c" ON "tournament_registrations" ("userId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "tournaments" DROP COLUMN "registeredParticipantsCount"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_registrations" ADD CONSTRAINT "FK_c415e08c7384bc574a13ac318cf" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tournament_registrations" DROP CONSTRAINT "FK_c415e08c7384bc574a13ac318cf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournaments" ADD "registeredParticipantsCount" integer NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c415e08c7384bc574a13ac318c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a0854dd5082187c75a7ce58468"`,
    );
    await queryRunner.query(`DROP TABLE "tournament_registrations"`);
  }
}
