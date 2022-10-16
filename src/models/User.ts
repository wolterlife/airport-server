import {Column, PrimaryColumn} from "typeorm";

export class User {
    @PrimaryColumn()
    login: string

    @Column()
    password: string

    @Column()
    role: string
}

