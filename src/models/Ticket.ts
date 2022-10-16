import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Ticket {
    @PrimaryColumn()
    login: string;

    @PrimaryColumn()
    flight: number;

    @Column()
    FIO_pass: string;

    @Column()
    numPass: number;

    @Column()
    numPlace: string;

    @Column()
    status: string;
}
