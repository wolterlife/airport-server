import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Airline} from "./Airline";
import {Flight} from "./Flight";

@Entity()
export class Plane {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    model: string;

    @Column()
    year: number;

    @Column()
    totalPlaces: number

    @ManyToOne(() => Airline, (airline) => airline.planes, {onDelete: 'CASCADE'})
    airline: Airline;

    @OneToMany(() => Flight, (flight) => flight.plane)
    flights: Flight[];
}
