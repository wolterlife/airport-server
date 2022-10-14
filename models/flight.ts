import {Column, DataSource, Entity, PrimaryGeneratedColumn} from "typeorm";

const flights = [];

@Entity()
export class Flight {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  flightNum: number

  @Column()
  airline: string

  @Column()
  airDepart: string

  @Column()
  airDest: string

  @Column()
  dateDest: string

  @Column()
  timeDest: string

  @Column()
  dateDepart: string

  @Column()
  timeDepart: string

  @Column()
  freePlaces: number

  @Column()
  plane: number
}
