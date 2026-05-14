"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
exports.POST = POST;
// GET: Ambil semua data store untuk ditampilkan di tabel admin
async function GET(req, res) {
    const storeLocationService = req.scope.resolve("storeLocation");
    const store_locations = await storeLocationService.listStoreLocations({}, {
        order: { created_at: "DESC" } // Urutkan dari yang terbaru
    });
    res.json({ store_locations });
}
// POST: Tambah store baru
async function POST(req, res) {
    const storeLocationService = req.scope.resolve("storeLocation");
    const data = req.body;
    const newStore = await storeLocationService.createStoreLocations({
        name: data.name,
        address: data.address,
        image_main: data.image_main,
        image_sub1: data.image_sub1 || null,
        image_sub2: data.image_sub2 || null,
        maps_link: data.maps_link || null,
        wa_link: data.wa_link || null,
        is_featured: data.is_featured || false
    });
    res.json({ store: newStore });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL3N0b3JlLWxvY2F0aW9uL3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0Esa0JBT0M7QUFHRCxvQkFnQkM7QUEzQkQsK0RBQStEO0FBQ3hELEtBQUssVUFBVSxHQUFHLENBQUMsR0FBa0IsRUFBRSxHQUFtQjtJQUMvRCxNQUFNLG9CQUFvQixHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0lBQy9ELE1BQU0sZUFBZSxHQUFHLE1BQU0sb0JBQW9CLENBQUMsa0JBQWtCLENBQUMsRUFBRSxFQUFFO1FBQ3hFLEtBQUssRUFBRSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsQ0FBQyw0QkFBNEI7S0FDM0QsQ0FBQyxDQUFBO0lBRUYsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUE7QUFDL0IsQ0FBQztBQUVELDBCQUEwQjtBQUNuQixLQUFLLFVBQVUsSUFBSSxDQUFDLEdBQWtCLEVBQUUsR0FBbUI7SUFDaEUsTUFBTSxvQkFBb0IsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQTtJQUMvRCxNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsSUFBVyxDQUFBO0lBRTVCLE1BQU0sUUFBUSxHQUFHLE1BQU0sb0JBQW9CLENBQUMsb0JBQW9CLENBQUM7UUFDL0QsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1FBQ2YsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1FBQ3JCLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtRQUMzQixVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJO1FBQ25DLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUk7UUFDbkMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSTtRQUNqQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJO1FBQzdCLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxJQUFJLEtBQUs7S0FDdkMsQ0FBQyxDQUFBO0lBRUYsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFBO0FBQy9CLENBQUMifQ==