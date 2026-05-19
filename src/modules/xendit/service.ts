import { AbstractPaymentProvider } from "@medusajs/framework/utils";
import { Xendit } from "xendit-node";

// 🌟 KITA GANTI NAMA CLASS-NYA JADI HURUF KECIL "xendit" 
// Biar Awilix langsung mengenali tanpa butuh alias!
class xendit extends AbstractPaymentProvider {
  static identifier = "xendit";
  protected xenditClient: any;

  constructor(container: any, options: any) {
    super(container, options);
    
    // Inisialisasi Xendit pakai kunci rahasia dari Railway
    this.xenditClient = new Xendit({
      secretKey: process.env.XENDIT_SECRET_KEY || "xnd_test_kunci_rahasia_bos_disini",
    });
  }

  // 1. Fungsi saat kustomer klik Checkout
  async initiatePayment(context: any): Promise<any> {
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
    } catch (error: any) {
      console.error("Gagal membuat tagihan Xendit:", error);
      return { error: error.message };
    }
  }

  // 2. Fungsi Cek Status Pembayaran
  async getPaymentStatus(paymentSessionData: any): Promise<any> {
    return "pending";
  }

  // 🌟 FUNGSI WEBHOOK 
  async getWebhookActionAndData(payload: any): Promise<any> {
    return {
      action: "successful", 
      data: payload?.data || {},
    };
  }

  // FUNGSI-FUNGSI WAJIB BAWAAN MEDUSA
  async updatePayment(context: any): Promise<any> { return this.initiatePayment(context); }
  async authorizePayment(paymentSessionData: any, context?: any): Promise<any> { return { status: "authorized", data: paymentSessionData }; }
  async capturePayment(paymentSessionData: any): Promise<any> { return paymentSessionData; }
  async refundPayment(paymentSessionData: any, refundAmount?: any): Promise<any> { return paymentSessionData; }
  async cancelPayment(paymentSessionData: any): Promise<any> { return paymentSessionData; }
  async deletePayment(paymentSessionData: any): Promise<any> { return; }
  async retrievePayment(paymentSessionData: any): Promise<any> { return paymentSessionData; }
}

// 🌟 PASTIKAN EXPORT-NYA JUGA "xendit"
export default xendit;