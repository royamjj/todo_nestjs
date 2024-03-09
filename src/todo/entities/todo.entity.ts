import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: String;
    
    @Column()
    status: String;

    @ManyToOne( () => User, (user) => user.todos)
    user : User;
}