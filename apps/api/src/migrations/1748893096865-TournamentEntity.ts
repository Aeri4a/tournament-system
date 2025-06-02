import { MigrationInterface, QueryRunner } from 'typeorm';

export class TournamentEntity1748893096865 implements MigrationInterface {
  name = 'TournamentEntity1748893096865';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."tournaments_discipline_enum" AS ENUM('pingpong')`,
    );
    await queryRunner.query(
      `CREATE TABLE "tournaments" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "discipline" "public"."tournaments_discipline_enum" NOT NULL DEFAULT 'pingpong', "startTime" TIMESTAMP WITH TIME ZONE NOT NULL, "registrationDeadline" TIMESTAMP WITH TIME ZONE NOT NULL, "locationAddress" character varying(500) NOT NULL, "maxParticipants" integer NOT NULL, "registeredParticipantsCount" integer NOT NULL DEFAULT '0', "sponsorLogoUrls" text array, "organizerId" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_6d5d129da7a80cf99e8ad4833a9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_56d61850223447c3b8900979de" ON "tournaments" ("organizerId") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_56d61850223447c3b8900979de"`,
    );
    await queryRunner.query(`DROP TABLE "tournaments"`);
    await queryRunner.query(`DROP TYPE "public"."tournaments_discipline_enum"`);
  }
}
