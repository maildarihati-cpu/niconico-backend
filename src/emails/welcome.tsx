import { Html, Body, Head, Heading, Text, Container, Button, Img, Section } from '@react-email/components'
import * as React from 'react'

interface WelcomeEmailProps {
  customerName: string;
}

export default function WelcomeEmail({ customerName = "Guest" }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          {/* Logo Brand Bos */}
          <Section style={logoSection}>
             <Text style={logoText}>NICONICO RESORT</Text>
          </Section>

          <Heading style={h1}>Welcome to the Club, {customerName}.</Heading>
          
          <Text style={text}>
            Thank you for joining Niconico Resort. We believe in radical stillness and confidence companions. Your journey to the perfect getaway starts here.
          </Text>

          <Text style={text}>
            As a welcome gift, enjoy <strong>10% OFF</strong> your first purchase with the code: <strong>NICO10</strong>.
          </Text>

          <Section style={btnContainer}>
            <Button style={button} href="http://localhost:8000">
              Explore Collections
            </Button>
          </Section>

          <Text style={footer}>
            Jl. Nelayan No.10, Canggu, Bali • hello@niconicoresort.com
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

// === STYLING (CSS in JS ala React Email) ===
const main = { backgroundColor: '#ffffff', fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif' }
const container = { margin: '0 auto', padding: '40px 20px', maxWidth: '600px' }
const logoSection = { textAlign: 'center' as const, marginBottom: '32px' }
const logoText = { fontSize: '24px', fontWeight: 'bold', letterSpacing: '0.2em', color: '#ED5725' }
const h1 = { color: '#111', fontSize: '24px', fontWeight: 'bold', paddingTop: '16px', paddingBottom: '16px' }
const text = { color: '#444', fontSize: '15px', lineHeight: '24px', marginBottom: '20px' }
const btnContainer = { textAlign: 'center' as const, marginTop: '32px', marginBottom: '32px' }
const button = { backgroundColor: '#ED5725', borderRadius: '4px', color: '#fff', fontSize: '14px', fontWeight: 'bold', textDecoration: 'none', textAlign: 'center' as const, padding: '14px 24px' }
const footer = { color: '#8898aa', fontSize: '12px', textAlign: 'center' as const, marginTop: '60px' }