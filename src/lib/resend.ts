import { Resend } from 'resend'

// Pastikan API Key di .env terbaca
export const resend = new Resend(process.env.RESEND_API_KEY)