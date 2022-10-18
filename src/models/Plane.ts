import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Airline} from "./Airline";

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
}
