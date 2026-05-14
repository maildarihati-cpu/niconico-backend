"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PUT = PUT;
exports.DELETE = DELETE;
// PUT: Untuk Update Data keseluruhan DAN Toggle Switch "Featured"
async function PUT(req, res) {
    const storeLocationService = req.scope.resolve("storeLocation");
    const { id } = req.params; // Ambil ID dari URL
    const data = req.body;
    const updatedStore = await storeLocationService.updateStoreLocations({
        id,
        ...data // Update field apa saja yang dikirim dari frontend (termasuk is_featured)
    });
    res.json({ store: updatedStore });
}
// DELETE: Untuk Hapus Store
async function DELETE(req, res) {
    const storeLocationService = req.scope.resolve("storeLocation");
    const { id } = req.params;
    await storeLocationService.deleteStoreLocations(id);
    res.json({ success: true, message: "Store deleted" });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL3N0b3JlLWxvY2F0aW9uL1tpZF0vcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSxrQkFXQztBQUdELHdCQU9DO0FBdEJELGtFQUFrRTtBQUMzRCxLQUFLLFVBQVUsR0FBRyxDQUFDLEdBQWtCLEVBQUUsR0FBbUI7SUFDL0QsTUFBTSxvQkFBb0IsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQTtJQUMvRCxNQUFNLEVBQUUsRUFBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQSxDQUFDLG9CQUFvQjtJQUM5QyxNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsSUFBVyxDQUFBO0lBRTVCLE1BQU0sWUFBWSxHQUFHLE1BQU0sb0JBQW9CLENBQUMsb0JBQW9CLENBQUM7UUFDbkUsRUFBRTtRQUNGLEdBQUcsSUFBSSxDQUFDLDBFQUEwRTtLQUNuRixDQUFDLENBQUE7SUFFRixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUE7QUFDbkMsQ0FBQztBQUVELDRCQUE0QjtBQUNyQixLQUFLLFVBQVUsTUFBTSxDQUFDLEdBQWtCLEVBQUUsR0FBbUI7SUFDbEUsTUFBTSxvQkFBb0IsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQTtJQUMvRCxNQUFNLEVBQUUsRUFBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQTtJQUV6QixNQUFNLG9CQUFvQixDQUFDLG9CQUFvQixDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBRW5ELEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFBO0FBQ3ZELENBQUMifQ==