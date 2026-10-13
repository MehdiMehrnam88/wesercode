import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

type Payload = Record<string, unknown>;

const limiter = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

function cleanText(value: unknown, max: number) {
  return typeof value === 'string' ? value.replace(/[\u0000-\u001F\u007F]/g, '').trim().slice(0, max) : '';
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

function clientIp(request: NextRequest) {
  const forwarded = request.headers.get('x-forwarded-for');
  return (forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown').slice(0, 80);
}

function sameOrigin(request: NextRequest) {
  const origin = request.headers.get('origin');
  if (!origin) return true;
  try {
    const a = new URL(origin);
    const forwardedHost = request.headers.get('x-forwarded-host')?.split(',')[0]?.trim();
    const forwardedProto = request.headers.get('x-forwarded-proto')?.split(',')[0]?.trim();
    const host = forwardedHost || request.headers.get('host') || new URL(request.url).host;
    const protocol = forwardedProto || new URL(request.url).protocol.replace(':', '');
    return a.host === host && a.protocol.replace(':', '') === protocol;
  } catch {
    return false;
  }
}

async function sendWithResend(input: { name: string; email: string; company: string; phone: string; projectType: string; message: string }) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  if (!key || !from) throw new Error('Email provider is not configured');
  const to = process.env.CONTACT_TO || 'hello@wesercode.de';
  const text = [`Name: ${input.name}`, `Email: ${input.email}`, `Company: ${input.company || '—'}`, `Phone: ${input.phone || '—'}`, `Project type: ${input.projectType || '—'}`, '', input.message].join('\n');
  const response = await fetch('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ from, to: [to], reply_to: input.email, subject: `WeserCode project inquiry — ${input.name}`, text }) });
  if (!response.ok) throw new Error('Email provider failed');
}

async function sendWithSmtp(input: { name: string; email: string; company: string; phone: string; projectType: string; message: string }) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM;
  if (!host || !user || !pass || !from) throw new Error('SMTP is not configured');
  const transporter = nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } });
  const to = process.env.CONTACT_TO || 'hello@wesercode.de';
  await transporter.sendMail({ from, to, replyTo: input.email, subject: `WeserCode project inquiry — ${input.name}`, text: [`Name: ${input.name}`, `Email: ${input.email}`, `Company: ${input.company || '—'}`, `Phone: ${input.phone || '—'}`, `Project type: ${input.projectType || '—'}`, '', input.message].join('\n') });
}

export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) return NextResponse.json({ message: 'Invalid request origin.' }, { status: 403 });

  const ip = clientIp(request);
  const now = Date.now();
  const current = limiter.get(ip);
  if (current && current.resetAt > now && current.count >= MAX_REQUESTS) return NextResponse.json({ message: 'Too many requests. Please try again later.' }, { status: 429 });
  if (!current || current.resetAt <= now) limiter.set(ip, { count: 1, resetAt: now + WINDOW_MS });
  else current.count += 1;

  let payload: Payload;
  try { payload = await request.json(); } catch { return NextResponse.json({ message: 'Invalid request.' }, { status: 400 }); }

  // Honeypot: bots receive a normal-looking success response without contacting email infrastructure.
  if (cleanText(payload.website, 120)) return NextResponse.json({ ok: true });

  const name = cleanText(payload.name, 120);
  const email = cleanText(payload.email, 254);
  const company = cleanText(payload.company, 160);
  const phone = cleanText(payload.phone, 80);
  const projectType = cleanText(payload.projectType, 100);
  const message = cleanText(payload.message, 5000);
  const privacyConsent = payload.privacyConsent === 'yes' || payload.privacyConsent === true;
  const locale = payload.locale === 'de' ? 'de' : 'en';

  const missing: string[] = [];
  if (name.length < 2) missing.push(locale === 'de' ? 'Name' : 'Name');
  if (!isValidEmail(email)) missing.push(locale === 'de' ? 'E-Mail' : 'Email');
  if (message.length < 10) missing.push(locale === 'de' ? 'Nachricht (mind. 10 Zeichen)' : 'Message (at least 10 characters)');
  if (!privacyConsent) missing.push(locale === 'de' ? 'Datenschutzbestätigung' : 'Privacy consent');
  if (missing.length) return NextResponse.json({ message: locale === 'de' ? `Bitte ergänzen oder prüfen: ${missing.join(', ')}.` : `Please complete or check: ${missing.join(', ')}.` }, { status: 400 });

  const input = { name, email, company, phone, projectType, message };
  try {
    const provider = (process.env.EMAIL_PROVIDER || 'smtp').toLowerCase();
    if (provider === 'resend') await sendWithResend(input);
    else if (provider === 'smtp') await sendWithSmtp(input);
    else throw new Error('Unknown email provider');
  } catch {
    return NextResponse.json({ message: locale === 'de' ? 'Die Nachricht konnte nicht zugestellt werden. Bitte schreiben Sie direkt an hello@wesercode.de.' : 'The message could not be delivered. Please email hello@wesercode.de directly.' }, { status: 503 });
  }

  return NextResponse.json({ ok: true });
}
