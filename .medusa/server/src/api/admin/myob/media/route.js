"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = void 0;
const GET = async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    try {
        const myobService = req.scope.resolve("myob");
        // Gunakan fungsi otomatis listMyobGalleries dari Medusa V2
        if (!myobService.listMyobGalleries) {
            return res.status(500).json({ message: "Service method tidak ditemukan" });
        }
        const galleries = await myobService.listMyobGalleries();
        const sortedGalleries = galleries && galleries.length > 0 ? galleries.reverse() : [];
        res.status(200).json({ files: sortedGalleries });
    }
    catch (error) {
        res.status(500).json({ message: "Gagal memuat galeri", error: String(error) });
    }
};
exports.GET = GET;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL215b2IvbWVkaWEvcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRU8sTUFBTSxHQUFHLEdBQUcsS0FBSyxFQUFFLEdBQWtCLEVBQUUsR0FBbUIsRUFBRSxFQUFFO0lBQ25FLEdBQUcsQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQUM7SUFDbEQsSUFBSSxDQUFDO1FBQ0gsTUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFRLENBQUM7UUFFckQsMkRBQTJEO1FBQzNELElBQUksQ0FBQyxXQUFXLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUNuQyxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLGdDQUFnQyxFQUFFLENBQUMsQ0FBQTtRQUM1RSxDQUFDO1FBRUQsTUFBTSxTQUFTLEdBQUcsTUFBTSxXQUFXLENBQUMsaUJBQWlCLEVBQUUsQ0FBQTtRQUN2RCxNQUFNLGVBQWUsR0FBRyxTQUFTLElBQUksU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFBO1FBRXBGLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUE7SUFDbEQsQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDZixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUNoRixDQUFDO0FBQ0gsQ0FBQyxDQUFBO0FBakJZLFFBQUEsR0FBRyxPQWlCZiJ9