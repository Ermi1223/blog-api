import { Post } from '../../posts/entities/post.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @OneToMany(() => Post, (post) => post.author)
  posts!: Post[];    
  @OneToMany(() => Comment, (comment) => comment.author)
  comments!: Comment[];
}
