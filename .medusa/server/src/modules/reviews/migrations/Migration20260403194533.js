"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20260403194533 = void 0;
const migrations_1 = require("@medusajs/framework/mikro-orm/migrations");
class Migration20260403194533 extends migrations_1.Migration {
    async up() {
        this.addSql(`create table if not exists "review" ("id" text not null, "customer_name" text not null, "review_text" text not null, "rating" integer not null default 5, "image_url" text null, "country_code" text not null, "country_name" text not null, "is_displayed" boolean not null default true, "rank" integer not null default 0, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "review_pkey" primary key ("id"));`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_review_deleted_at" ON "review" ("deleted_at") WHERE deleted_at IS NULL;`);
    }
    async down() {
        this.addSql(`drop table if exists "review" cascade;`);
    }
}
exports.Migration20260403194533 = Migration20260403194533;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWlncmF0aW9uMjAyNjA0MDMxOTQ1MzMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9yZXZpZXdzL21pZ3JhdGlvbnMvTWlncmF0aW9uMjAyNjA0MDMxOTQ1MzMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEseUVBQXFFO0FBRXJFLE1BQWEsdUJBQXdCLFNBQVEsc0JBQVM7SUFFM0MsS0FBSyxDQUFDLEVBQUU7UUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLDhlQUE4ZSxDQUFDLENBQUM7UUFDNWYsSUFBSSxDQUFDLE1BQU0sQ0FBQyx5R0FBeUcsQ0FBQyxDQUFDO0lBQ3pILENBQUM7SUFFUSxLQUFLLENBQUMsSUFBSTtRQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLHdDQUF3QyxDQUFDLENBQUM7SUFDeEQsQ0FBQztDQUVGO0FBWEQsMERBV0MifQ==