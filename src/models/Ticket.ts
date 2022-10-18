import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn} from "typeorm";
import {Flight} from "./Flight";
import {User} from "./User";

@Entity()
export class Ticket {
    @ManyToOne(() => User, (user) => user.tickets)
    login: User;

    @ManyToOne(() => Flight, (flight) => flight.tickets)
    flight: Flight;

    @PrimaryColumn() // PrimaryColumn should be two ManyToMany relations before this line
    FIO_pass: string;

    @Column()
    numPass: number;

    @Column()
    numPlace: string;

    @Column()
    status: string;
}
