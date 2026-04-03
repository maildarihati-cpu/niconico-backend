import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260403144454 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "myob_gallery" ("id" text not null, "url" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "myob_gallery_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_myob_gallery_deleted_at" ON "myob_gallery" ("deleted_at") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "myob_gallery" cascade;`);
  }

}
