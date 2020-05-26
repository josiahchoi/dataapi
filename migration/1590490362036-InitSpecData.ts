import {MigrationInterface, QueryRunner} from "typeorm";

export class InitSpecData1590490362036 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("INSERT INTO `tableformat1` (`row`,`columnName`,`dataType`) VALUES (1, 'name', 'TEXT')");
        await queryRunner.query("INSERT INTO `tableformat1` (`row`,`columnName`,`dataType`) VALUES (2, 'valid', 'BOOLEAN')");
        await queryRunner.query("INSERT INTO `tableformat1` (`row`,`columnName`,`dataType`) VALUES (3, 'count', 'INTEGER')");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
