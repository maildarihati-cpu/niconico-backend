import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260408014654 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "store_location" ("id" text not null, "name" text not null, "address" text not null, "image_main" text not null, "image_sub1" text null, "image_sub2" text null, "maps_link" text null, "wa_link" text null, "is_featured" boolean not null default false, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "store_location_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_store_location_deleted_at" ON "store_location" ("deleted_at") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "store_location" cascade;`);
  }

}
