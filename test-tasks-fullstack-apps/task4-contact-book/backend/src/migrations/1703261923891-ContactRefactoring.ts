import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class ContactRefactoring1703261923891 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "contact",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "phoneNumber",
                        type: "varchar",
                    },
                ],
            }),
            true,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
