import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("account", (table) => {
    table.increments("id").primary();
    table.string("document_number").notNullable();
  });

  await knex.schema.createTable("transaction", (table) => {
    table.increments("id").primary();
    table.integer("account_id").unsigned().references("id").inTable("account");
    table.double("amount", 14, 2).notNullable();
    table.timestamp("timestamp").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("transaction");
  await knex.schema.dropTableIfExists("account");
}
