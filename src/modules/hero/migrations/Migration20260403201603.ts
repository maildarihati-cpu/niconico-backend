import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260403201603 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "hero" add column if not exists "category" text not null default 'hero-banner';`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "hero" drop column if exists "category";`);
  }

}
