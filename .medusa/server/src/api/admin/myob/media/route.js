"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = void 0;
const GET = async (req, res) => {
    try {
        const myobService = req.scope.resolve("myob");
        // Tarik langsung dari tabel galeri kita, bukan dari File Provider Medusa
        const galleries = await myobService.listMyobGalleries();
        // Urutkan dari yang terbaru (dibalik)
        res.status(200).json({ files: galleries.reverse() });
    }
    catch (error) {
        res.status(500).json({ message: "Gagal memuat galeri" });
    }
};
exports.GET = GET;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL215b2IvbWVkaWEvcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRU8sTUFBTSxHQUFHLEdBQUcsS0FBSyxFQUFFLEdBQWtCLEVBQUUsR0FBbUIsRUFBRSxFQUFFO0lBQ25FLElBQUksQ0FBQztRQUNILE1BQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBRTdDLHlFQUF5RTtRQUN6RSxNQUFNLFNBQVMsR0FBRyxNQUFNLFdBQVcsQ0FBQyxpQkFBaUIsRUFBRSxDQUFBO1FBRXZELHNDQUFzQztRQUN0QyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBQ3RELENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2YsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsQ0FBQyxDQUFBO0lBQzFELENBQUM7QUFDSCxDQUFDLENBQUE7QUFaWSxRQUFBLEdBQUcsT0FZZiJ9