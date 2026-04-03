import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260403181342 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "hero_setting" ("id" text not null, "global_title" text not null default 'SIMPLY BE YOUR OWN', "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "hero_setting_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_hero_setting_deleted_at" ON "hero_setting" ("deleted_at") WHERE deleted_at IS NULL;`);

    this.addSql(`alter table if exists "hero" drop column if exists "title", drop column if exists "sub_title", drop column if exists "button_text", drop column if exists "button_link";`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "hero_setting" cascade;`);

    this.addSql(`alter table if exists "hero" add column if not exists "title" text not null, add column if not exists "sub_title" text not null, add column if not exists "button_text" text not null, add column if not exists "button_link" text not null;`);
  }

}
