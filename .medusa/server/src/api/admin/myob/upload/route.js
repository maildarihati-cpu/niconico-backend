"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = void 0;
const utils_1 = require("@medusajs/utils");
const POST = async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    // Pakai File Module standar Medusa V2
    const fileModuleService = req.scope.resolve(utils_1.Modules.FILE);
    const myobService = req.scope.resolve("myob");
    const files = req.files;
    if (!files || files.length === 0) {
        return res.status(400).json({ message: "Tidak ada file yang diupload" });
    }
    try {
        // Siapkan data file untuk diupload
        const filePayloads = files.map((f) => ({
            filename: f.originalname,
            mimeType: f.mimetype,
            content: f.buffer,
        }));
        // createFiles selalu menghasilkan Array
        const uploadedFiles = await fileModuleService.createFiles(filePayloads);
        // Ambil file pertama dengan aman
        const firstFile = Array.isArray(uploadedFiles) ? uploadedFiles[0] : uploadedFiles;
        if (myobService.createMyobGalleries) {
            await myobService.createMyobGalleries({ url: firstFile.url });
        }
        // Kembalikan ke frontend dalam format array agar form bisa membacanya
        res.status(200).json({ files: Array.isArray(uploadedFiles) ? uploadedFiles : [uploadedFiles] });
    }
    catch (error) {
        console.error("[MYOB Upload Error]", error);
        res.status(500).json({ message: "Upload Gagal", error: String(error) });
    }
};
exports.POST = POST;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL215b2IvdXBsb2FkL3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLDJDQUF5QztBQUVsQyxNQUFNLElBQUksR0FBRyxLQUFLLEVBQUUsR0FBa0IsRUFBRSxHQUFtQixFQUFFLEVBQUU7SUFDcEUsR0FBRyxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztJQUVsRCxzQ0FBc0M7SUFDdEMsTUFBTSxpQkFBaUIsR0FBdUIsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsZUFBTyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzdFLE1BQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBUSxDQUFDO0lBRXJELE1BQU0sS0FBSyxHQUFJLEdBQVcsQ0FBQyxLQUFLLENBQUM7SUFFakMsSUFBSSxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO1FBQ2pDLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsOEJBQThCLEVBQUUsQ0FBQyxDQUFBO0lBQzFFLENBQUM7SUFFRCxJQUFJLENBQUM7UUFDSCxtQ0FBbUM7UUFDbkMsTUFBTSxZQUFZLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztZQUMxQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLFlBQVk7WUFDeEIsUUFBUSxFQUFFLENBQUMsQ0FBQyxRQUFRO1lBQ3BCLE9BQU8sRUFBRSxDQUFDLENBQUMsTUFBTTtTQUNsQixDQUFDLENBQUMsQ0FBQztRQUVKLHdDQUF3QztRQUN4QyxNQUFNLGFBQWEsR0FBRyxNQUFNLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUV4RSxpQ0FBaUM7UUFDakMsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUM7UUFFbEYsSUFBSSxXQUFXLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztZQUNuQyxNQUFNLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLEdBQUcsRUFBRSxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQTtRQUNoRSxDQUFDO1FBRUQsc0VBQXNFO1FBQ3RFLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDakcsQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDZixPQUFPLENBQUMsS0FBSyxDQUFDLHFCQUFxQixFQUFFLEtBQUssQ0FBQyxDQUFBO1FBQzNDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUN6RSxDQUFDO0FBQ0gsQ0FBQyxDQUFBO0FBckNZLFFBQUEsSUFBSSxRQXFDaEIifQ==