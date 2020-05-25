import { PrimaryGeneratedColumn, Column } from "typeorm";

export class SpecEntity {

    @PrimaryGeneratedColumn()
    row: number;

    @Column()
    columnName: string;

    @Column()
    dataType: string;
}
