import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Post } from '../../posts/entities/post.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('text', { nullable: false })
  content!: string;

  @ManyToOne(() => User, (user) => user.comments, { eager: true, nullable: false })
  author!: User;

  @ManyToOne(() => Post, (post) => post.comments, { nullable: false, onDelete: 'CASCADE' })
  post!: Post;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
