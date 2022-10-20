import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Ticket} from "./Ticket";
import {Plane} from "./Plane";
import {Airline} from "./Airline";

@Entity()
export class Flight {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  flightNum: string

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

  @ManyToOne(() => Plane, (plane) => plane.flights)
  plane: number

  @ManyToOne(() => Airline, (airline) => airline.flights)
  airline: number

  @OneToMany(() => Ticket, (ticket) => ticket.flight)
  tickets: Ticket[]
}
