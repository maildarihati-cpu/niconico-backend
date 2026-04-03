import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260403165944 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "hero" ("id" text not null, "title" text not null, "sub_title" text not null, "image_url" text not null, "button_text" text not null, "button_link" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "hero_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_hero_deleted_at" ON "hero" ("deleted_at") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "hero" cascade;`);
  }

}
