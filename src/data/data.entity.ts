import { Column, Entity, PrimaryColumn } from 'typeorm';


@Entity({name: 'tableformat1_data'})
export class DataEntity {
  @PrimaryColumn()
  row: number;
  
  @Column()
  column1: string;

  @Column()
  column2: string;

  @Column()
  column3: string;
}
