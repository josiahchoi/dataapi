import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity({name: 'tableformat1_data'})
export class DataEntity {
  @PrimaryGeneratedColumn()
  row: number;
  
  @Column()
  column1: string;

  @Column()
  column2: string;

  @Column()
  column3: string;
}
