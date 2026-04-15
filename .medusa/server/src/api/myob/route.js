"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = void 0;
const GET = async (req, res) => {
    console.log("=== [2] HALAMAN DI-REFRESH, NARIK DATA... ===");
    try {
        const myobService = req.scope.resolve("myob");
        const existing = await myobService.listMyobs();
        // KAMERA 2: Intip apa yang dikembalikan oleh Supabase
        console.log("Data yang ditarik dari DB:", existing);
        if (existing.length > 0) {
            const data = existing[0];
            res.status(200).json({
                myob_content: {
                    contentType: data.content_type,
                    mediaUrl: data.media_url,
                    posterUrl: data.poster_url,
                    heading: data.heading,
                    quoteVerbatim: data.quote_verbatim,
                    buttonText: data.button_text,
                    buttonLink: data.button_link
                }
            });
        }
        else {
            console.log("Data masih kosong di DB!");
            res.status(200).json({ myob_content: null });
        }
    }
    catch (error) {
        console.error("=== ERROR GET ===", error);
        res.status(500).json({ error: "Gagal menarik data" });
    }
};
exports.GET = GET;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBpL215b2Ivcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRU8sTUFBTSxHQUFHLEdBQUcsS0FBSyxFQUFFLEdBQWtCLEVBQUUsR0FBbUIsRUFBRSxFQUFFO0lBQ25FLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0NBQStDLENBQUMsQ0FBQTtJQUU1RCxJQUFJLENBQUM7UUFDSCxNQUFNLFdBQVcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUM3QyxNQUFNLFFBQVEsR0FBRyxNQUFNLFdBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQTtRQUU5QyxzREFBc0Q7UUFDdEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUVuRCxJQUFJLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDeEIsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ3hCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNuQixZQUFZLEVBQUU7b0JBQ1osV0FBVyxFQUFFLElBQUksQ0FBQyxZQUFZO29CQUM5QixRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVM7b0JBQ3hCLFNBQVMsRUFBRSxJQUFJLENBQUMsVUFBVTtvQkFDMUIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO29CQUNyQixhQUFhLEVBQUUsSUFBSSxDQUFDLGNBQWM7b0JBQ2xDLFVBQVUsRUFBRSxJQUFJLENBQUMsV0FBVztvQkFDNUIsVUFBVSxFQUFFLElBQUksQ0FBQyxXQUFXO2lCQUM3QjthQUNGLENBQUMsQ0FBQTtRQUNKLENBQUM7YUFBTSxDQUFDO1lBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFBO1lBQ3ZDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7UUFDOUMsQ0FBQztJQUNILENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUN6QyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxvQkFBb0IsRUFBRSxDQUFDLENBQUE7SUFDdkQsQ0FBQztBQUNILENBQUMsQ0FBQTtBQS9CWSxRQUFBLEdBQUcsT0ErQmYifQ==