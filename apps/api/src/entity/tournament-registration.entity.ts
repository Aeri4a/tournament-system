import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { UserEntity } from './user.entity';
// import { Tournament } from './tournament.entity';

@Entity('tournament_registrations')
@Unique(['tournamentId', 'userId'])
@Unique(['tournamentId', 'licenseNumber']) // not sure
export class TournamentRegistration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  @Index()
  tournamentId: number;

  @Column({ type: 'int' })
  @Index()
  userId: number;

  @Column({ type: 'varchar', length: 100 })
  licenseNumber: string;

  @Column({ type: 'int' })
  currentRanking: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  registrationDate: Date;

  // @ManyToOne(() => Tournament, (tournament) => tournament.id, {
  //   onDelete: 'CASCADE',
  // })
  // @JoinColumn({ name: 'tournamentId' })
  // tournament: Tournament;

  @ManyToOne(() => UserEntity, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
