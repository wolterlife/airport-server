import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class User {
    @PrimaryColumn()
    login: string

    @Column()
    password: string

    @Column()
    role: string
}

