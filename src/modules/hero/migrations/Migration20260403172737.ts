import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260403172737 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "hero" add column if not exists "position" integer not null default 0;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "hero" drop column if exists "position";`);
  }

}
