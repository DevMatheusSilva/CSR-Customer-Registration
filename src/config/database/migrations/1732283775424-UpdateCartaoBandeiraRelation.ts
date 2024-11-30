import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class UpdateCartaoBandeiraRelation1732283775424 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE tb_cartao DROP CONSTRAINT IF EXISTS "FK_c3152af07afd4cec5f382ddd9f8"`
        );

        await queryRunner.changeColumn(
            "tb_cartao",
            "bandeiraId",
            new TableColumn({
                name: "bandeiraId",
                type: "uuid",
                isNullable: true,
            })
        );

        await queryRunner.createForeignKey(
            "tb_cartao",
            new TableForeignKey({
                columnNames: ["bandeiraId"],
                referencedTableName: "tb_bandeira",
                referencedColumnNames: ["id"],
                onDelete: "SET NULL",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("tb_cartao", "tb_cartao_bandeiraId_fk");

        await queryRunner.changeColumn(
            "tb_cartao",
            "bandeiraId",
            new TableColumn({
                name: "bandeiraId",
                type: "int",
                isUnique: true,
            })
        );

        await queryRunner.query(
            `ALTER TABLE tb_cartao ADD CONSTRAINT "REL_c3152af07afd4cec5f382ddd9f" UNIQUE (bandeiraId)`
        );
    }

}
