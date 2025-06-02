import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToMany,
} from 'typeorm';
import { TournamentRegistration } from './tournament-registration.entity';

export enum TournamentDiscipline {
  PING_PONG = 'pingpong',
}

@Entity('tournaments')
export class Tournament {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({
    type: 'enum',
    enum: TournamentDiscipline,
    default: TournamentDiscipline.PING_PONG,
  })
  discipline: TournamentDiscipline;

  @Column({ type: 'timestamptz' })
  startTime: Date;

  @Column({ type: 'timestamptz' })
  registrationDeadline: Date;

  @Column({ type: 'varchar', length: 500 })
  locationAddress: string;

  // @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  // latitude?: number;
  // @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  // longitude?: number;

  @Column({ type: 'int' })
  maxParticipants: number;

  // @Column({ type: 'int', default: 0 })
  // registeredParticipantsCount: number;

  @OneToMany(() => TournamentRegistration, (tourReg) => tourReg.tournamentId)
  registrations: TournamentRegistration[];

  @Column('text', { array: true, nullable: true })
  sponsorLogoUrls?: string[];

  @Column({ type: 'int' })
  @Index()
  organizerId: number;

  // @ManyToOne(() => User, user => user.organizedTournaments)
  // @JoinColumn({ name: 'organizerId' })
  // organizer: User;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  get isRegistrationOpen(): boolean {
    return (
      new Date() < this.registrationDeadline &&
      this.registrations.length < this.maxParticipants
    );
  }
}
