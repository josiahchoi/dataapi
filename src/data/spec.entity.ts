import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity()
export class SpecEntity {

    @PrimaryGeneratedColumn()
    row: number;

    @Column()
    columnName: string;

    @Column()
    dataType: string;
}
