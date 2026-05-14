"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20260403113406 = void 0;
const migrations_1 = require("@medusajs/framework/mikro-orm/migrations");
class Migration20260403113406 extends migrations_1.Migration {
    async up() {
        this.addSql(`create table if not exists "myob" ("id" text not null, "content_type" text not null, "media_url" text null, "poster_url" text null, "heading" text not null, "quote_verbatim" text not null, "button_text" text not null, "button_link" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "myob_pkey" primary key ("id"));`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_myob_deleted_at" ON "myob" ("deleted_at") WHERE deleted_at IS NULL;`);
    }
    async down() {
        this.addSql(`drop table if exists "myob" cascade;`);
    }
}
exports.Migration20260403113406 = Migration20260403113406;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWlncmF0aW9uMjAyNjA0MDMxMTM0MDYuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9teW9iL21pZ3JhdGlvbnMvTWlncmF0aW9uMjAyNjA0MDMxMTM0MDYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEseUVBQXFFO0FBRXJFLE1BQWEsdUJBQXdCLFNBQVEsc0JBQVM7SUFFM0MsS0FBSyxDQUFDLEVBQUU7UUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLHFhQUFxYSxDQUFDLENBQUM7UUFDbmIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxxR0FBcUcsQ0FBQyxDQUFDO0lBQ3JILENBQUM7SUFFUSxLQUFLLENBQUMsSUFBSTtRQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLHNDQUFzQyxDQUFDLENBQUM7SUFDdEQsQ0FBQztDQUVGO0FBWEQsMERBV0MifQ==