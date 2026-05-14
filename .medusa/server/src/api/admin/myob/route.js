"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = exports.GET = void 0;
const GET = async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    try {
        const myobService = req.scope.resolve("myob");
        // Gunakan fungsi otomatis bawaan Medusa V2
        const myobs = await myobService.listMyobs();
        // Karena konten MYOB biasanya cuma 1 baris di database, ambil index ke-0
        const content = myobs && myobs.length > 0 ? myobs[0] : null;
        res.status(200).json({ myob_content: content || {} });
    }
    catch (error) {
        res.status(500).json({ message: "Gagal memuat konten MYOB", error: String(error) });
    }
};
exports.GET = GET;
const POST = async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    try {
        const myobService = req.scope.resolve("myob");
        // OBAT TYPESCRIPT: Tegaskan bahwa req.body adalah tipe Object
        const payload = req.body;
        // Cek apakah data MYOB sudah ada di database
        const existingMyobs = await myobService.listMyobs();
        let updatedContent;
        if (existingMyobs && existingMyobs.length > 0) {
            // Kalau sudah ada, kita UPDATE data yang ada
            updatedContent = await myobService.updateMyobs({
                id: existingMyobs[0].id,
                ...payload
            });
        }
        else {
            // Kalau database kosong, kita CREATE baru
            updatedContent = await myobService.createMyobs(payload);
        }
        res.status(200).json({ message: "Berhasil update", myob_content: updatedContent });
    }
    catch (error) {
        console.error("[MYOB Save Error]", error);
        res.status(500).json({ message: "Gagal simpan konten", error: String(error) });
    }
};
exports.POST = POST;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL215b2Ivcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRU8sTUFBTSxHQUFHLEdBQUcsS0FBSyxFQUFFLEdBQWtCLEVBQUUsR0FBbUIsRUFBRSxFQUFFO0lBQ25FLEdBQUcsQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQUM7SUFDbEQsSUFBSSxDQUFDO1FBQ0gsTUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFRLENBQUM7UUFFckQsMkNBQTJDO1FBQzNDLE1BQU0sS0FBSyxHQUFHLE1BQU0sV0FBVyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRTVDLHlFQUF5RTtRQUN6RSxNQUFNLE9BQU8sR0FBRyxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBRTVELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsWUFBWSxFQUFFLE9BQU8sSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBQ3ZELENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2YsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDckYsQ0FBQztBQUNILENBQUMsQ0FBQTtBQWZZLFFBQUEsR0FBRyxPQWVmO0FBRU0sTUFBTSxJQUFJLEdBQUcsS0FBSyxFQUFFLEdBQWtCLEVBQUUsR0FBbUIsRUFBRSxFQUFFO0lBQ3BFLEdBQUcsQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQUM7SUFDbEQsSUFBSSxDQUFDO1FBQ0gsTUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFRLENBQUM7UUFFckQsOERBQThEO1FBQzlELE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxJQUEyQixDQUFDO1FBRWhELDZDQUE2QztRQUM3QyxNQUFNLGFBQWEsR0FBRyxNQUFNLFdBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNwRCxJQUFJLGNBQWMsQ0FBQztRQUVuQixJQUFJLGFBQWEsSUFBSSxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQzlDLDZDQUE2QztZQUM3QyxjQUFjLEdBQUcsTUFBTSxXQUFXLENBQUMsV0FBVyxDQUFDO2dCQUM3QyxFQUFFLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3ZCLEdBQUcsT0FBTzthQUNYLENBQUMsQ0FBQztRQUNMLENBQUM7YUFBTSxDQUFDO1lBQ04sMENBQTBDO1lBQzFDLGNBQWMsR0FBRyxNQUFNLFdBQVcsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDMUQsQ0FBQztRQUVELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFlBQVksRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFBO0lBQ3BGLENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUN6QyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUNoRixDQUFDO0FBQ0gsQ0FBQyxDQUFBO0FBNUJZLFFBQUEsSUFBSSxRQTRCaEIifQ==