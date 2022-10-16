import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Plane {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    model: string;

    @Column()
    year: number;

    @Column()
    airline: number;

    @Column()
    totalPlaces: number
}
