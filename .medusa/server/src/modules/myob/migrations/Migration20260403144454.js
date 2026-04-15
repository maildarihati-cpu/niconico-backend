"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20260403144454 = void 0;
const migrations_1 = require("@medusajs/framework/mikro-orm/migrations");
class Migration20260403144454 extends migrations_1.Migration {
    async up() {
        this.addSql(`create table if not exists "myob_gallery" ("id" text not null, "url" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "myob_gallery_pkey" primary key ("id"));`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_myob_gallery_deleted_at" ON "myob_gallery" ("deleted_at") WHERE deleted_at IS NULL;`);
    }
    async down() {
        this.addSql(`drop table if exists "myob_gallery" cascade;`);
    }
}
exports.Migration20260403144454 = Migration20260403144454;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWlncmF0aW9uMjAyNjA0MDMxNDQ0NTQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9teW9iL21pZ3JhdGlvbnMvTWlncmF0aW9uMjAyNjA0MDMxNDQ0NTQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEseUVBQXFFO0FBRXJFLE1BQWEsdUJBQXdCLFNBQVEsc0JBQVM7SUFFM0MsS0FBSyxDQUFDLEVBQUU7UUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLDBRQUEwUSxDQUFDLENBQUM7UUFDeFIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxxSEFBcUgsQ0FBQyxDQUFDO0lBQ3JJLENBQUM7SUFFUSxLQUFLLENBQUMsSUFBSTtRQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLDhDQUE4QyxDQUFDLENBQUM7SUFDOUQsQ0FBQztDQUVGO0FBWEQsMERBV0MifQ==