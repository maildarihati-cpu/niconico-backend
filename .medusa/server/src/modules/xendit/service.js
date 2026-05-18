"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
const xendit_node_1 = require("xendit-node");
class XenditProviderService extends utils_1.AbstractPaymentProvider {
    constructor(container, options) {
        super(container, options);
        // Inisialisasi Xendit pakai kunci rahasia dari Railway
        this.xenditClient = new xendit_node_1.Xendit({
            secretKey: process.env.XENDIT_SECRET_KEY || "xnd_test_kunci_rahasia_bos_disini",
        });
    }
    // 1. Fungsi saat kustomer klik Checkout
    async initiatePayment(context) {
        try {
            const invoice = await this.xenditClient.Invoice.createInvoice({
                data: {
                    externalId: `order_niconico_${Date.now()}`,
                    amount: context.amount || 0,
                    description: `Niconico Resort Payment - ${context?.email || 'Customer'}`,
                }
            });
            return {
                id: invoice.id,
                data: invoice,
            };
        }
        catch (error) {
            console.error("Gagal membuat tagihan Xendit:", error);
            return { error: error.message };
        }
    }
    // 2. Fungsi Cek Status Pembayaran
    async getPaymentStatus(paymentSessionData) {
        return "pending";
    }
    // =====================================================================
    // 🌟 FUNGSI WEBHOOK (Ini dia yang tadi dicari-cari Medusa!)
    // =====================================================================
    async getWebhookActionAndData(payload) {
        // Ini adalah pintu penerima notifikasi dari Xendit.
        // Kita set default dulu agar TypeScript diam. Nanti logikanya bisa diperdalam.
        return {
            action: "successful",
            data: payload?.data || {},
        };
    }
    // =====================================================================
    // FUNGSI-FUNGSI WAJIB BAWAAN MEDUSA
    // =====================================================================
    async updatePayment(context) {
        return this.initiatePayment(context);
    }
    async authorizePayment(paymentSessionData, context) {
        return { status: "authorized", data: paymentSessionData };
    }
    async capturePayment(paymentSessionData) {
        return paymentSessionData;
    }
    async refundPayment(paymentSessionData, refundAmount) {
        return paymentSessionData;
    }
    async cancelPayment(paymentSessionData) {
        return paymentSessionData;
    }
    async deletePayment(paymentSessionData) {
        return;
    }
    async retrievePayment(paymentSessionData) {
        return paymentSessionData;
    }
}
XenditProviderService.identifier = "xendit";
exports.default = XenditProviderService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL3hlbmRpdC9zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscURBQW9FO0FBQ3BFLDZDQUFxQztBQUVyQyxNQUFNLHFCQUFzQixTQUFRLCtCQUF1QjtJQUl6RCxZQUFZLFNBQWMsRUFBRSxPQUFZO1FBQ3RDLEtBQUssQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFMUIsdURBQXVEO1FBQ3ZELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxvQkFBTSxDQUFDO1lBQzdCLFNBQVMsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixJQUFJLG1DQUFtQztTQUNoRixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsd0NBQXdDO0lBQ3hDLEtBQUssQ0FBQyxlQUFlLENBQUMsT0FBWTtRQUNoQyxJQUFJLENBQUM7WUFDSCxNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQztnQkFDNUQsSUFBSSxFQUFFO29CQUNKLFVBQVUsRUFBRSxrQkFBa0IsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFO29CQUMxQyxNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDO29CQUMzQixXQUFXLEVBQUUsNkJBQTZCLE9BQU8sRUFBRSxLQUFLLElBQUksVUFBVSxFQUFFO2lCQUN6RTthQUNGLENBQUMsQ0FBQztZQUVILE9BQU87Z0JBQ0wsRUFBRSxFQUFFLE9BQU8sQ0FBQyxFQUFFO2dCQUNkLElBQUksRUFBRSxPQUFPO2FBQ2QsQ0FBQztRQUNKLENBQUM7UUFBQyxPQUFPLEtBQVUsRUFBRSxDQUFDO1lBQ3BCLE9BQU8sQ0FBQyxLQUFLLENBQUMsK0JBQStCLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDdEQsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDbEMsQ0FBQztJQUNILENBQUM7SUFFRCxrQ0FBa0M7SUFDbEMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLGtCQUF1QjtRQUM1QyxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBRUQsd0VBQXdFO0lBQ3hFLDREQUE0RDtJQUM1RCx3RUFBd0U7SUFDeEUsS0FBSyxDQUFDLHVCQUF1QixDQUFDLE9BQVk7UUFDeEMsb0RBQW9EO1FBQ3BELCtFQUErRTtRQUMvRSxPQUFPO1lBQ0wsTUFBTSxFQUFFLFlBQVk7WUFDcEIsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLElBQUksRUFBRTtTQUMxQixDQUFDO0lBQ0osQ0FBQztJQUVELHdFQUF3RTtJQUN4RSxvQ0FBb0M7SUFDcEMsd0VBQXdFO0lBRXhFLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBWTtRQUM5QixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBdUIsRUFBRSxPQUFhO1FBQzNELE9BQU8sRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxrQkFBa0IsRUFBRSxDQUFDO0lBQzVELENBQUM7SUFFRCxLQUFLLENBQUMsY0FBYyxDQUFDLGtCQUF1QjtRQUMxQyxPQUFPLGtCQUFrQixDQUFDO0lBQzVCLENBQUM7SUFFRCxLQUFLLENBQUMsYUFBYSxDQUFDLGtCQUF1QixFQUFFLFlBQWtCO1FBQzdELE9BQU8sa0JBQWtCLENBQUM7SUFDNUIsQ0FBQztJQUVELEtBQUssQ0FBQyxhQUFhLENBQUMsa0JBQXVCO1FBQ3pDLE9BQU8sa0JBQWtCLENBQUM7SUFDNUIsQ0FBQztJQUVELEtBQUssQ0FBQyxhQUFhLENBQUMsa0JBQXVCO1FBQ3pDLE9BQU87SUFDVCxDQUFDO0lBRUQsS0FBSyxDQUFDLGVBQWUsQ0FBQyxrQkFBdUI7UUFDM0MsT0FBTyxrQkFBa0IsQ0FBQztJQUM1QixDQUFDOztBQWhGTSxnQ0FBVSxHQUFHLFFBQVEsQ0FBQztBQW1GL0Isa0JBQWUscUJBQXFCLENBQUMifQ==