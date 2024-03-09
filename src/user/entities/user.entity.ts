import { Todo } from "src/todo/entities/todo.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: String;
    
    @Column()
    lastName: String;
    
    @Column()
    email: String;
    
    @Column()
    password: String;

    @OneToMany( () => Todo, (todo) => todo.user)
    todos : Todo[];
}
