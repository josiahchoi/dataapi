import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1590423961782 implements MigrationInterface {
    name = 'Init1590423961782'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `data_entity` (`row` int NOT NULL AUTO_INCREMENT, `column1` varchar(255) NULL, `column2` varchar(255) NULL, `column3` varchar(255) NULL, `column4` varchar(255) NULL, `column5` varchar(255) NULL, `column6` varchar(255) NULL, `column7` varchar(255) NULL, `column8` varchar(255) NULL, `column9` varchar(255) NULL, `column10` varchar(255) NULL, PRIMARY KEY (`row`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `spec_entity` (`row` int NOT NULL AUTO_INCREMENT, `columnName` varchar(255) NOT NULL, `dataType` varchar(255) NOT NULL, PRIMARY KEY (`row`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `spec_entity`");
        await queryRunner.query("DROP TABLE `data_entity`");
    }

}
