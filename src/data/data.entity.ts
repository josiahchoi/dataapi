import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';


@Entity()
export class DataEntity {
  @PrimaryGeneratedColumn()
  row: number;
  
  @Column({nullable: true})
  column1: string;

  @Column({nullable: true})
  column2: string;

  @Column({nullable: true})
  column3: string;

  @Column({nullable: true})
  column4: string;

  @Column({nullable: true})
  column5: string;

  @Column({nullable: true})
  column6: string;

  @Column({nullable: true})
  column7: string;

  @Column({nullable: true})
  column8: string;

  @Column({nullable: true})
  column9: string;

  @Column({nullable: true})
  column10: string;
}
