import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class UpdateRelacaoLogMuitosPraUm1732534207942 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "tb_log" DROP CONSTRAINT IF EXISTS "FK_tb_log_usuario"`
        );

        await queryRunner.query(
            `ALTER TABLE "tb_log" DROP COLUMN IF EXISTS "usuarioId"`
        );

        await queryRunner.addColumn(
            "tb_log",
            new TableColumn({
                name: "usuarioId",
                type: "uuid",
                isNullable: true,
            })
        );

        await queryRunner.createForeignKey(
            "tb_log",
            new TableForeignKey({
                columnNames: ["usuarioId"],
                referencedColumnNames: ["id"],
                referencedTableName: "tb_usuario",
                onDelete: "SET NULL",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("tb_log", "FK_tb_log_usuario");

        await queryRunner.dropColumn("tb_log", "usuarioId");

        await queryRunner.addColumn(
            "tb_log",
            new TableColumn({
                name: "usuarioId",
                type: "uuid",
                isUnique: true,
                isNullable: true,
            })
        );

        await queryRunner.createForeignKey(
            "tb_log",
            new TableForeignKey({
                columnNames: ["usuarioId"],
                referencedColumnNames: ["id"],
                referencedTableName: "tb_usuario",
                onDelete: "SET NULL",
            })
        );
    }

}
