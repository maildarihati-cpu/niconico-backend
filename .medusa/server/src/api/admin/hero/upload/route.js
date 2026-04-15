"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = void 0;
const utils_1 = require("@medusajs/utils");
const POST = async (req, res) => {
    const fileModuleService = req.scope.resolve(utils_1.Modules.FILE);
    const heroService = req.scope.resolve("hero");
    // 1. Ambil file dari multer
    const file = req.file;
    // 2. Ambil kategori dari body (dikirim oleh MediaLibrary Frontend)
    // Kalau kosong, kita kasih default 'hero-banner'
    const category = req.body.category || "hero-banner";
    if (!file) {
        return res.status(400).json({ message: "Mana file-nya bos? Kosong nih!" });
    }
    try {
        // 3. Simpan file fisik ke Storage (Cloudflare R2 via File Module)
        const uploadedFile = await fileModuleService.createFiles({
            filename: file.originalname,
            mimeType: file.mimetype,
            content: file.buffer,
        });
        // 4. DAFTARKAN KE DATABASE HERO (Sebagai record Media Library)
        // Kita cek jumlah data di kategori ini untuk menentukan posisi urutan
        const existingInStore = await heroService.listHeroes({ category });
        const heroRecord = await heroService.createHeroes({
            image_url: uploadedFile.url,
            category: category,
            position: existingInStore.length,
        });
        // 5. Kembalikan data lengkap ke Frontend
        return res.status(200).json({
            success: true,
            url: heroRecord.image_url,
            id: heroRecord.id
        });
    }
    catch (error) {
        console.error("Upload Error:", error);
        return res.status(500).json({ message: "Gagal simpan ke storage atau database." });
    }
};
exports.POST = POST;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL2hlcm8vdXBsb2FkL3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLDJDQUF5QztBQUdsQyxNQUFNLElBQUksR0FBRyxLQUFLLEVBQUUsR0FBa0IsRUFBRSxHQUFtQixFQUFFLEVBQUU7SUFDcEUsTUFBTSxpQkFBaUIsR0FBdUIsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsZUFBTyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzdFLE1BQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFjLE1BQU0sQ0FBQyxDQUFBO0lBRTFELDRCQUE0QjtJQUM1QixNQUFNLElBQUksR0FBSSxHQUFXLENBQUMsSUFBSSxDQUFBO0lBRTlCLG1FQUFtRTtJQUNuRSxpREFBaUQ7SUFDakQsTUFBTSxRQUFRLEdBQUksR0FBRyxDQUFDLElBQVksQ0FBQyxRQUFRLElBQUksYUFBYSxDQUFBO0lBRTVELElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNWLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsQ0FBQyxDQUFBO0lBQzVFLENBQUM7SUFFRCxJQUFJLENBQUM7UUFDSCxrRUFBa0U7UUFDbEUsTUFBTSxZQUFZLEdBQUcsTUFBTSxpQkFBaUIsQ0FBQyxXQUFXLENBQUM7WUFDdkQsUUFBUSxFQUFFLElBQUksQ0FBQyxZQUFZO1lBQzNCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU07U0FDckIsQ0FBQyxDQUFBO1FBRUYsK0RBQStEO1FBQy9ELHNFQUFzRTtRQUN0RSxNQUFNLGVBQWUsR0FBRyxNQUFNLFdBQVcsQ0FBQyxVQUFVLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFBO1FBRWxFLE1BQU0sVUFBVSxHQUFHLE1BQU0sV0FBVyxDQUFDLFlBQVksQ0FBQztZQUNoRCxTQUFTLEVBQUUsWUFBWSxDQUFDLEdBQUc7WUFDM0IsUUFBUSxFQUFFLFFBQVE7WUFDbEIsUUFBUSxFQUFFLGVBQWUsQ0FBQyxNQUFNO1NBQzFCLENBQUMsQ0FBQTtRQUVULHlDQUF5QztRQUN6QyxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQzFCLE9BQU8sRUFBRSxJQUFJO1lBQ2IsR0FBRyxFQUFFLFVBQVUsQ0FBQyxTQUFTO1lBQ3pCLEVBQUUsRUFBRSxVQUFVLENBQUMsRUFBRTtTQUNsQixDQUFDLENBQUE7SUFDSixDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxDQUFBO1FBQ3JDLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsd0NBQXdDLEVBQUUsQ0FBQyxDQUFBO0lBQ3BGLENBQUM7QUFDSCxDQUFDLENBQUE7QUEzQ1ksUUFBQSxJQUFJLFFBMkNoQiJ9