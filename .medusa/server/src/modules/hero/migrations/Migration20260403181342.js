"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20260403181342 = void 0;
const migrations_1 = require("@medusajs/framework/mikro-orm/migrations");
class Migration20260403181342 extends migrations_1.Migration {
    async up() {
        this.addSql(`create table if not exists "hero_setting" ("id" text not null, "global_title" text not null default 'SIMPLY BE YOUR OWN', "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "hero_setting_pkey" primary key ("id"));`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_hero_setting_deleted_at" ON "hero_setting" ("deleted_at") WHERE deleted_at IS NULL;`);
        this.addSql(`alter table if exists "hero" drop column if exists "title", drop column if exists "sub_title", drop column if exists "button_text", drop column if exists "button_link";`);
    }
    async down() {
        this.addSql(`drop table if exists "hero_setting" cascade;`);
        this.addSql(`alter table if exists "hero" add column if not exists "title" text not null, add column if not exists "sub_title" text not null, add column if not exists "button_text" text not null, add column if not exists "button_link" text not null;`);
    }
}
exports.Migration20260403181342 = Migration20260403181342;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWlncmF0aW9uMjAyNjA0MDMxODEzNDIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9oZXJvL21pZ3JhdGlvbnMvTWlncmF0aW9uMjAyNjA0MDMxODEzNDIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEseUVBQXFFO0FBRXJFLE1BQWEsdUJBQXdCLFNBQVEsc0JBQVM7SUFFM0MsS0FBSyxDQUFDLEVBQUU7UUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLGdUQUFnVCxDQUFDLENBQUM7UUFDOVQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxxSEFBcUgsQ0FBQyxDQUFDO1FBRW5JLElBQUksQ0FBQyxNQUFNLENBQUMsMEtBQTBLLENBQUMsQ0FBQztJQUMxTCxDQUFDO0lBRVEsS0FBSyxDQUFDLElBQUk7UUFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDO1FBRTVELElBQUksQ0FBQyxNQUFNLENBQUMsOE9BQThPLENBQUMsQ0FBQztJQUM5UCxDQUFDO0NBRUY7QUFmRCwwREFlQyJ9