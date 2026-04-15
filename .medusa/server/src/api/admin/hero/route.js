"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = exports.GET = void 0;
const GET = async (req, res) => {
    const heroService = req.scope.resolve("hero");
    // 1. Ambil kategori dari query parameter (?category=reviews)
    const { category } = req.query;
    // 2. Tentukan filter: 
    // Jika ada kategori di URL, pakai itu. Jika tidak ada, default ke 'hero-banner'
    const filter = category ? { category } : { category: "hero-banner" };
    const data = await heroService.listHeroes(filter, {
        // Tetap pakai urutan posisi agar rapi
        order: { position: "ASC" }
    });
    return res.status(200).json({ heroes: data });
};
exports.GET = GET;
const POST = async (req, res) => {
    const heroService = req.scope.resolve("hero");
    const payload = req.body;
    let result;
    if (payload.id) {
        // --- PROSES EDIT ---
        // Kita pastikan ID dikirim dalam objek sesuai standar Medusa v2
        result = await heroService.updateHeroes(payload);
    }
    else {
        // --- PROSES TAMBAH BARU ---
        // Ambil data yang sudah ada untuk menentukan posisi terakhir
        const existing = await heroService.listHeroes({
            category: payload.category || "hero-banner"
        });
        // Set posisi otomatis di paling akhir
        payload.position = existing.length;
        // Pastikan kategori tersimpan (kalau kosong, kasih default 'hero-banner')
        if (!payload.category) {
            payload.category = "hero-banner";
        }
        result = await heroService.createHeroes(payload);
    }
    return res.status(200).json({ success: true, hero: result });
};
exports.POST = POST;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL2hlcm8vcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBR08sTUFBTSxHQUFHLEdBQUcsS0FBSyxFQUFFLEdBQWtCLEVBQUUsR0FBbUIsRUFBRSxFQUFFO0lBQ25FLE1BQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFjLE1BQU0sQ0FBQyxDQUFBO0lBRTFELDZEQUE2RDtJQUM3RCxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsR0FBRyxDQUFDLEtBQThCLENBQUE7SUFFdkQsdUJBQXVCO0lBQ3ZCLGdGQUFnRjtJQUNoRixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxDQUFBO0lBRXBFLE1BQU0sSUFBSSxHQUFHLE1BQU0sV0FBVyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUU7UUFDaEQsc0NBQXNDO1FBQ3RDLEtBQUssRUFBRSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUU7S0FDM0IsQ0FBQyxDQUFBO0lBRUYsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO0FBQy9DLENBQUMsQ0FBQTtBQWhCWSxRQUFBLEdBQUcsT0FnQmY7QUFFTSxNQUFNLElBQUksR0FBRyxLQUFLLEVBQUUsR0FBa0IsRUFBRSxHQUFtQixFQUFFLEVBQUU7SUFDcEUsTUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQWMsTUFBTSxDQUFDLENBQUE7SUFFMUQsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLElBQVcsQ0FBQTtJQUUvQixJQUFJLE1BQU0sQ0FBQztJQUNYLElBQUksT0FBTyxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ2Ysc0JBQXNCO1FBQ3RCLGdFQUFnRTtRQUNoRSxNQUFNLEdBQUcsTUFBTSxXQUFXLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ2xELENBQUM7U0FBTSxDQUFDO1FBQ04sNkJBQTZCO1FBQzdCLDZEQUE2RDtRQUM3RCxNQUFNLFFBQVEsR0FBRyxNQUFNLFdBQVcsQ0FBQyxVQUFVLENBQUM7WUFDNUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRLElBQUksYUFBYTtTQUM1QyxDQUFDLENBQUE7UUFFRixzQ0FBc0M7UUFDdEMsT0FBTyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFBO1FBRWxDLDBFQUEwRTtRQUMxRSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3RCLE9BQU8sQ0FBQyxRQUFRLEdBQUcsYUFBYSxDQUFBO1FBQ2xDLENBQUM7UUFFRCxNQUFNLEdBQUcsTUFBTSxXQUFXLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ2xELENBQUM7SUFFRCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQTtBQUM5RCxDQUFDLENBQUE7QUE3QlksUUFBQSxJQUFJLFFBNkJoQiJ9