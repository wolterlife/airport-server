import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Airline {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nameOfAirline: string;

    @Column()
    office: string;
}
