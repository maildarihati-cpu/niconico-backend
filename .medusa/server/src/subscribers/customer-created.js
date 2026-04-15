"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = customerCreatedHandler;
const utils_1 = require("@medusajs/framework/utils"); // 👈 Wajib import ini di v2
const resend_1 = require("../lib/resend");
const welcome_1 = __importDefault(require("../emails/welcome"));
const render_1 = require("@react-email/render");
const React = __importStar(require("react"));
async function customerCreatedHandler({ event: { data }, container, }) {
    console.log("🔥 EVENT TERTANGKAP: Kustomer baru dengan ID:", data.id);
    try {
        // 1. CARA MEDUSA V2: Gunakan Module Service, bukan old service
        const customerModuleService = container.resolve(utils_1.Modules.CUSTOMER);
        // 2. Method-nya ganti nama jadi retrieveCustomer
        const customer = await customerModuleService.retrieveCustomer(data.id);
        if (!customer.email) {
            console.log("⚠️ Kustomer tidak punya email, operasi dihentikan.");
            return;
        }
        const htmlContent = await (0, render_1.render)(React.createElement(welcome_1.default, {
            customerName: customer.first_name || "there"
        }));
        const resendResponse = await resend_1.resend.emails.send({
            // UBAH BAGIAN INI BOS 👇
            from: "info@niconicoresort.com",
            to: customer.email,
            subject: "Welcome to Niconico Resort",
            html: htmlContent,
        });
        console.log(`✅ Welcome email sukses dikirim ke: ${customer.email}`);
    }
    catch (error) {
        console.error(`❌ ERROR DI SUBSCRIBER:`, error);
    }
}
exports.config = {
    event: "customer.created",
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItY3JlYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zdWJzY3JpYmVycy9jdXN0b21lci1jcmVhdGVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU9BLHlDQXNDQztBQTVDRCxxREFBbUQsQ0FBQyw0QkFBNEI7QUFDaEYsMENBQXNDO0FBQ3RDLGdFQUE0QztBQUM1QyxnREFBNEM7QUFDNUMsNkNBQThCO0FBRWYsS0FBSyxVQUFVLHNCQUFzQixDQUFDLEVBQ25ELEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxFQUNmLFNBQVMsR0FDc0I7SUFFL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQ0FBK0MsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7SUFFckUsSUFBSSxDQUFDO1FBQ0gsK0RBQStEO1FBQy9ELE1BQU0scUJBQXFCLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxlQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7UUFFakUsaURBQWlEO1FBQ2pELE1BQU0sUUFBUSxHQUFHLE1BQU0scUJBQXFCLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBRXRFLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvREFBb0QsQ0FBQyxDQUFBO1lBQ2pFLE9BQU07UUFDVixDQUFDO1FBRUQsTUFBTSxXQUFXLEdBQUcsTUFBTSxJQUFBLGVBQU0sRUFDOUIsS0FBSyxDQUFDLGFBQWEsQ0FBQyxpQkFBWSxFQUFFO1lBQ2hDLFlBQVksRUFBRSxRQUFRLENBQUMsVUFBVSxJQUFJLE9BQU87U0FDN0MsQ0FBQyxDQUNILENBQUE7UUFFRCxNQUFNLGNBQWMsR0FBRyxNQUFNLGVBQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQzlDLHlCQUF5QjtZQUN6QixJQUFJLEVBQUUseUJBQXlCO1lBQy9CLEVBQUUsRUFBRSxRQUFRLENBQUMsS0FBSztZQUNsQixPQUFPLEVBQUUsNEJBQTRCO1lBQ3JDLElBQUksRUFBRSxXQUFXO1NBQ2xCLENBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxHQUFHLENBQUMsc0NBQXNDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFBO0lBRXJFLENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsRUFBRSxLQUFLLENBQUMsQ0FBQTtJQUNoRCxDQUFDO0FBQ0gsQ0FBQztBQUVZLFFBQUEsTUFBTSxHQUFxQjtJQUN0QyxLQUFLLEVBQUUsa0JBQWtCO0NBQzFCLENBQUEifQ==