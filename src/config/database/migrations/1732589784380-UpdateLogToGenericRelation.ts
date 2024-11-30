import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class UpdateLogToGenericRelation1732589784380 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE tb_log DROP CONSTRAINT IF EXISTS "FK_usuario_logs"`);
        await queryRunner.query(`ALTER TABLE tb_log DROP COLUMN "usuarioId"`);

        await queryRunner.addColumn(
            "tb_log",
            new TableColumn({
                name: "entidadeId",
                type: "uuid",
                isNullable: true,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("tb_log", "entidadeId");

        await queryRunner.addColumn(
            "tb_log",
            new TableColumn({
                name: "usuarioId",
                type: "int",
                isNullable: true,
            })
        );

        await queryRunner.query(`
            ALTER TABLE tb_log
            ADD CONSTRAINT "FK_usuario_logs"
            FOREIGN KEY ("usuarioId") REFERENCES tb_usuario("id")
            ON DELETE SET NULL
        `);
    }

}
