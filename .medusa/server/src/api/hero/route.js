"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = void 0;
const GET = async (req, res) => {
    const heroService = req.scope.resolve("hero");
    // FIX: Jangan biarkan kosong! Kita harus minta yang stikernya 'hero-banner' saja.
    const data = await heroService.listHeroes({
        category: "hero-banner" // <--- INI KUNCINYA BOS!
    }, {
        order: { position: "ASC" }
    });
    return res.status(200).json({ heroes: data });
};
exports.GET = GET;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2hlcm8vcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBR08sTUFBTSxHQUFHLEdBQUcsS0FBSyxFQUFFLEdBQWtCLEVBQUUsR0FBbUIsRUFBRSxFQUFFO0lBQ25FLE1BQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBRTdDLGtGQUFrRjtJQUNsRixNQUFNLElBQUksR0FBRyxNQUFNLFdBQVcsQ0FBQyxVQUFVLENBQ3ZDO1FBQ0UsUUFBUSxFQUFFLGFBQWEsQ0FBQyx5QkFBeUI7S0FDbEQsRUFDRDtRQUNFLEtBQUssRUFBRSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUU7S0FDM0IsQ0FDRixDQUFBO0lBRUQsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO0FBQy9DLENBQUMsQ0FBQTtBQWRZLFFBQUEsR0FBRyxPQWNmIn0=