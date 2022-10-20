import {Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {Flight} from "./Flight";
import {User} from "./User";

@Entity()
export class Ticket {
    @ManyToOne(() => User, (user) => user.tickets, {onDelete: "CASCADE"})
    login: User;

    @ManyToOne(() => Flight, (flight) => flight.tickets, {onDelete: "CASCADE"})
    flight: Flight;

    @PrimaryGeneratedColumn()
    id: number;

    @Column() // PrimaryColumn should be two ManyToMany relations before this line?
    FIO_pass: string;

    @Column()
    numPass: string;

    @Column()
    numPlace: string;

    @Column()
    status: string;
}
