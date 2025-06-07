import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TournamentRegistration } from './tournament-registration.entity';
import { TournamentDiscipline } from 'common';
import { UserEntity } from './user.entity';
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

  @OneToMany(() => TournamentRegistration, (tourReg) => tourReg.tournament)
  registrations: TournamentRegistration[];

  @Column('text', { array: true, nullable: true })
  sponsorLogoUrls?: string[];

  @Column({ type: 'int' })
  @Index()
  organizerId: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'organizerId' })
  organizer: UserEntity;

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
