"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = void 0;
const utils_1 = require("@medusajs/utils");
const POST = async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    try {
        const fileService = req.scope.resolve(utils_1.Modules.FILE);
        const heroService = req.scope.resolve("hero");
        // 🌟 PERBAIKAN: Tangkap sebagai "files" (Array), bukan "file" (Single)
        const files = req.files;
        const category = req.body?.category || "hero-banner";
        if (!files || files.length === 0) {
            return res.status(400).json({ message: "File kosong" });
        }
        // Eksekusi upload ke Storage Medusa
        const uploadedFiles = await fileService.createFiles([{
                filename: files[0].originalname,
                mimeType: files[0].mimetype,
                content: files[0].buffer,
            }]);
        const finalUrl = Array.isArray(uploadedFiles) ? uploadedFiles[0].url : uploadedFiles.url;
        const listMethod = typeof heroService.listHeroes === 'function' ? 'listHeroes' : 'listHeros';
        const createMethod = typeof heroService.createHeroes === 'function' ? 'createHeroes' : 'createHeros';
        const existing = await heroService[listMethod]({ category });
        const heroRecord = await heroService[createMethod]({
            image_url: finalUrl,
            category: category,
            position: existing ? existing.length : 0,
        });
        return res.status(200).json({ success: true, url: heroRecord.image_url, id: heroRecord.id });
    }
    catch (error) {
        console.error("Hero Upload Error:", error);
        return res.status(500).json({ message: error.message });
    }
};
exports.POST = POST;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL2hlcm8vdXBsb2FkL3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDJDQUF5QztBQUVsQyxNQUFNLElBQUksR0FBRyxLQUFLLEVBQUUsR0FBa0IsRUFBRSxHQUFtQixFQUFFLEVBQUU7SUFDcEUsR0FBRyxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztJQUNsRCxJQUFJLENBQUM7UUFDSCxNQUFNLFdBQVcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxlQUFPLENBQUMsSUFBSSxDQUFRLENBQUM7UUFDM0QsTUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFRLENBQUM7UUFFckQsdUVBQXVFO1FBQ3ZFLE1BQU0sS0FBSyxHQUFJLEdBQVcsQ0FBQyxLQUFLLENBQUM7UUFDakMsTUFBTSxRQUFRLEdBQUksR0FBRyxDQUFDLElBQVksRUFBRSxRQUFRLElBQUksYUFBYSxDQUFDO1FBRTlELElBQUksQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUUsQ0FBQztZQUNqQyxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxDQUFDLENBQUM7UUFDMUQsQ0FBQztRQUVELG9DQUFvQztRQUNwQyxNQUFNLGFBQWEsR0FBRyxNQUFNLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDbkQsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZO2dCQUMvQixRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVE7Z0JBQzNCLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTTthQUN6QixDQUFDLENBQUMsQ0FBQztRQUVKLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUM7UUFFekYsTUFBTSxVQUFVLEdBQUcsT0FBTyxXQUFXLENBQUMsVUFBVSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUM7UUFDN0YsTUFBTSxZQUFZLEdBQUcsT0FBTyxXQUFXLENBQUMsWUFBWSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUM7UUFFckcsTUFBTSxRQUFRLEdBQUcsTUFBTSxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBRTdELE1BQU0sVUFBVSxHQUFHLE1BQU0sV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ2pELFNBQVMsRUFBRSxRQUFRO1lBQ25CLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDekMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxTQUFTLEVBQUUsRUFBRSxFQUFFLFVBQVUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBQzlGLENBQUM7SUFBQyxPQUFPLEtBQVUsRUFBRSxDQUFDO1FBQ3BCLE9BQU8sQ0FBQyxLQUFLLENBQUMsb0JBQW9CLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDM0MsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQTtJQUN6RCxDQUFDO0FBQ0gsQ0FBQyxDQUFBO0FBdkNZLFFBQUEsSUFBSSxRQXVDaEIifQ==