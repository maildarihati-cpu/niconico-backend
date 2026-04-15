"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPTIONS = OPTIONS;
exports.GET = GET;
// 1. OPTIONS: Wajib ada buat ngasih izin CORS ke browser Next.js
async function OPTIONS(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.status(200).send();
}
// 2. GET: Tarik data Store
async function GET(req, res) {
    // Kasih izin CORS juga di respon GET-nya
    res.setHeader("Access-Control-Allow-Origin", "*");
    try {
        const storeLocationService = req.scope.resolve("storeLocation");
        // Tarik maksimal 3 data yang di-ceklis "Featured"
        const store_locations = await storeLocationService.listStoreLocations({
            is_featured: true
        }, {
            take: 3
        });
        // Hitung total semua store yang ada
        const [, count] = await storeLocationService.listAndCountStoreLocations();
        res.json({ store_locations, count });
    }
    catch (error) {
        res.status(500).json({ error: "Gagal narik data" });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlLWxvY2F0aW9uL3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0EsMEJBS0M7QUFHRCxrQkFxQkM7QUE5QkQsaUVBQWlFO0FBQzFELEtBQUssVUFBVSxPQUFPLENBQUMsR0FBa0IsRUFBRSxHQUFtQjtJQUNuRSxHQUFHLENBQUMsU0FBUyxDQUFDLDZCQUE2QixFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQ2pELEdBQUcsQ0FBQyxTQUFTLENBQUMsOEJBQThCLEVBQUUsY0FBYyxDQUFDLENBQUE7SUFDN0QsR0FBRyxDQUFDLFNBQVMsQ0FBQyw4QkFBOEIsRUFBRSxjQUFjLENBQUMsQ0FBQTtJQUM3RCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFBO0FBQ3hCLENBQUM7QUFFRCwyQkFBMkI7QUFDcEIsS0FBSyxVQUFVLEdBQUcsQ0FBQyxHQUFrQixFQUFFLEdBQW1CO0lBQy9ELHlDQUF5QztJQUN6QyxHQUFHLENBQUMsU0FBUyxDQUFDLDZCQUE2QixFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBRWpELElBQUksQ0FBQztRQUNILE1BQU0sb0JBQW9CLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUE7UUFFL0Qsa0RBQWtEO1FBQ2xELE1BQU0sZUFBZSxHQUFHLE1BQU0sb0JBQW9CLENBQUMsa0JBQWtCLENBQUM7WUFDcEUsV0FBVyxFQUFFLElBQUk7U0FDbEIsRUFBRTtZQUNELElBQUksRUFBRSxDQUFDO1NBQ1IsQ0FBQyxDQUFBO1FBRUYsb0NBQW9DO1FBQ3BDLE1BQU0sQ0FBQyxFQUFFLEtBQUssQ0FBQyxHQUFHLE1BQU0sb0JBQW9CLENBQUMsMEJBQTBCLEVBQUUsQ0FBQTtRQUV6RSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7SUFDdEMsQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDZixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxrQkFBa0IsRUFBRSxDQUFDLENBQUE7SUFDckQsQ0FBQztBQUNILENBQUMifQ==