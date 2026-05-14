"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = void 0;
const POST = async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    try {
        const heroService = req.scope.resolve("hero");
        const payload = req.body;
        const listMethod = typeof heroService.listHeroSettings === 'function' ? 'listHeroSettings' : 'listHero_settings';
        const updateMethod = typeof heroService.updateHeroSettings === 'function' ? 'updateHeroSettings' : 'updateHero_settings';
        const createMethod = typeof heroService.createHeroSettings === 'function' ? 'createHeroSettings' : 'createHero_settings';
        const existing = await heroService[listMethod]();
        if (existing && existing.length > 0) {
            await heroService[updateMethod]({ id: existing[0].id, global_title: payload.title });
        }
        else {
            await heroService[createMethod]({ global_title: payload.title });
        }
        return res.status(200).json({ success: true });
    }
    catch (error) {
        console.error("Hero Settings Error:", error);
        return res.status(500).json({ message: "Gagal simpan title" });
    }
};
exports.POST = POST;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL2hlcm8vc2V0dGluZ3Mvcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRU8sTUFBTSxJQUFJLEdBQUcsS0FBSyxFQUFFLEdBQWtCLEVBQUUsR0FBbUIsRUFBRSxFQUFFO0lBQ3BFLEdBQUcsQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQUM7SUFDbEQsSUFBSSxDQUFDO1FBQ0gsTUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFRLENBQUM7UUFDckQsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLElBQXlCLENBQUM7UUFFOUMsTUFBTSxVQUFVLEdBQUcsT0FBTyxXQUFXLENBQUMsZ0JBQWdCLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUM7UUFDakgsTUFBTSxZQUFZLEdBQUcsT0FBTyxXQUFXLENBQUMsa0JBQWtCLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUM7UUFDekgsTUFBTSxZQUFZLEdBQUcsT0FBTyxXQUFXLENBQUMsa0JBQWtCLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUM7UUFFekgsTUFBTSxRQUFRLEdBQUcsTUFBTSxXQUFXLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztRQUVqRCxJQUFJLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQ3BDLE1BQU0sV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsWUFBWSxFQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZGLENBQUM7YUFBTSxDQUFDO1lBQ04sTUFBTSxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxZQUFZLEVBQUUsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDbkUsQ0FBQztRQUVELE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtJQUNoRCxDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMsc0JBQXNCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDN0MsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxDQUFDLENBQUE7SUFDaEUsQ0FBQztBQUNILENBQUMsQ0FBQTtBQXZCWSxRQUFBLElBQUksUUF1QmhCIn0=