import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  firstName: string;

  @Column({ length: 40 })
  lastName: string;

  @Column({ unique: true, length: 50 })
  email: string;

  @Column({ select: false })
  passwordHash: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({ type: 'text', nullable: true })
  activationToken: string | null;

  @Column({ type: 'timestamp with time zone', nullable: true })
  activationExpires: Date | null;

  @Column({ type: 'text', nullable: true })
  passwordResetToken: string | null;

  @Column({ type: 'timestamp with time zone', nullable: true })
  passwordResetExpires: Date | null;

  @CreateDateColumn()
  createdAt: Date;
}
