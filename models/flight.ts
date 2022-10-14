import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Flight extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  flightNum: string

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
