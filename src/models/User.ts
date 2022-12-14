import {Column, Entity, OneToMany, PrimaryColumn} from "typeorm";
import {Ticket} from "./Ticket";

@Entity()
export class User {
    @PrimaryColumn()
    login: string

    @Column()
    password?: string

    @Column()
    roles: string

    @OneToMany(() => Ticket, (ticket) => ticket.login)
    tickets: Ticket[]
}

