"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = void 0;
const GET = async (req, res) => {
    // Mengambil service reviews
    const reviewService = req.scope.resolve("reviews");
    // Mengambil data reviews dari database
    const reviews = await reviewService.listReviews({}, {
        order: { created_at: "DESC" },
        take: 10
    });
    // Langsung kembalikan JSON. 
    // Biarkan middleware.ts yang mengurus izin akses (CORS) secara otomatis.
    return res.json({ reviews });
};
exports.GET = GET;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3Jldmlld3Mvcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRU8sTUFBTSxHQUFHLEdBQUcsS0FBSyxFQUFFLEdBQWtCLEVBQUUsR0FBbUIsRUFBRSxFQUFFO0lBQ25FLDRCQUE0QjtJQUM1QixNQUFNLGFBQWEsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUVsRCx1Q0FBdUM7SUFDdkMsTUFBTSxPQUFPLEdBQUcsTUFBTSxhQUFhLENBQUMsV0FBVyxDQUM3QyxFQUFFLEVBQ0Y7UUFDRSxLQUFLLEVBQUUsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFO1FBQzdCLElBQUksRUFBRSxFQUFFO0tBQ1QsQ0FDRixDQUFBO0lBRUQsNkJBQTZCO0lBQzdCLHlFQUF5RTtJQUN6RSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFBO0FBQzlCLENBQUMsQ0FBQTtBQWhCWSxRQUFBLEdBQUcsT0FnQmYifQ==