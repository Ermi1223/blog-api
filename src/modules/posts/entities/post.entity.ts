import { Comment } from '../../comments/entities/comment.entity';
import { User } from '../../auth/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column('text')
  content!: string;

  @ManyToOne(() => User, (user) => user.posts, { eager: true })
  author!: User;

  @OneToMany(() => Comment, (comment) => comment.post, { cascade: true })
  comments!: Comment[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
