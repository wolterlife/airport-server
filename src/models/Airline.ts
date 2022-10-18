import {Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique} from "typeorm";
import {Plane} from "./Plane";

@Entity()
export class Airline {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nameOfAirline: string;

    @Column()
    office: string;

    @OneToMany(() => Plane, (plane) => plane.airline)
    planes: Plane[]
}
