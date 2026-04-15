"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20260403201603 = void 0;
const migrations_1 = require("@medusajs/framework/mikro-orm/migrations");
class Migration20260403201603 extends migrations_1.Migration {
    async up() {
        this.addSql(`alter table if exists "hero" add column if not exists "category" text not null default 'hero-banner';`);
    }
    async down() {
        this.addSql(`alter table if exists "hero" drop column if exists "category";`);
    }
}
exports.Migration20260403201603 = Migration20260403201603;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWlncmF0aW9uMjAyNjA0MDMyMDE2MDMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9oZXJvL21pZ3JhdGlvbnMvTWlncmF0aW9uMjAyNjA0MDMyMDE2MDMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEseUVBQXFFO0FBRXJFLE1BQWEsdUJBQXdCLFNBQVEsc0JBQVM7SUFFM0MsS0FBSyxDQUFDLEVBQUU7UUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLHVHQUF1RyxDQUFDLENBQUM7SUFDdkgsQ0FBQztJQUVRLEtBQUssQ0FBQyxJQUFJO1FBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsZ0VBQWdFLENBQUMsQ0FBQztJQUNoRixDQUFDO0NBRUY7QUFWRCwwREFVQyJ9