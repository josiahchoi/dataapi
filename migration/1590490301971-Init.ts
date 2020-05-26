import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1590490301971 implements MigrationInterface {
    name = 'Init1590490301971'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `tableformat1_data` (`row` int NOT NULL AUTO_INCREMENT, `column1` varchar(255) NOT NULL, `column2` varchar(255) NOT NULL, `column3` varchar(255) NOT NULL, PRIMARY KEY (`row`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `tableformat1` (`row` int NOT NULL, `columnName` varchar(255) NOT NULL, `dataType` varchar(255) NOT NULL, PRIMARY KEY (`row`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `tableformat1`");
        await queryRunner.query("DROP TABLE `tableformat1_data`");
    }

}
