import {BaseEntity, Column, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

export class User extends BaseEntity{
    @PrimaryColumn()
    login: string

    @Column()
    password: string

    @Column()
    role: string
}

