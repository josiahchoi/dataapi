import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({name: 'tableformat1'} )
export class SpecEntity {

    @PrimaryColumn()
    row: number;

    @Column()
    columnName: string;

    @Column()
    dataType: string;
}
