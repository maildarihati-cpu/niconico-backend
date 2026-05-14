"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20260408014654 = void 0;
const migrations_1 = require("@medusajs/framework/mikro-orm/migrations");
class Migration20260408014654 extends migrations_1.Migration {
    async up() {
        this.addSql(`create table if not exists "store_location" ("id" text not null, "name" text not null, "address" text not null, "image_main" text not null, "image_sub1" text null, "image_sub2" text null, "maps_link" text null, "wa_link" text null, "is_featured" boolean not null default false, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "store_location_pkey" primary key ("id"));`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_store_location_deleted_at" ON "store_location" ("deleted_at") WHERE deleted_at IS NULL;`);
    }
    async down() {
        this.addSql(`drop table if exists "store_location" cascade;`);
    }
}
exports.Migration20260408014654 = Migration20260408014654;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWlncmF0aW9uMjAyNjA0MDgwMTQ2NTQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9zdG9yZS1sb2NhdGlvbi9taWdyYXRpb25zL01pZ3JhdGlvbjIwMjYwNDA4MDE0NjU0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHlFQUFxRTtBQUVyRSxNQUFhLHVCQUF3QixTQUFRLHNCQUFTO0lBRTNDLEtBQUssQ0FBQyxFQUFFO1FBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyw4Y0FBOGMsQ0FBQyxDQUFDO1FBQzVkLElBQUksQ0FBQyxNQUFNLENBQUMseUhBQXlILENBQUMsQ0FBQztJQUN6SSxDQUFDO0lBRVEsS0FBSyxDQUFDLElBQUk7UUFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7Q0FFRjtBQVhELDBEQVdDIn0=