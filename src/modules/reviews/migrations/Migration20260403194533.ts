import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260403194533 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "review" ("id" text not null, "customer_name" text not null, "review_text" text not null, "rating" integer not null default 5, "image_url" text null, "country_code" text not null, "country_name" text not null, "is_displayed" boolean not null default true, "rank" integer not null default 0, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "review_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_review_deleted_at" ON "review" ("deleted_at") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "review" cascade;`);
  }

}
