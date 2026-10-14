import { CONTACT } from '../data/content';

export interface ChannelSignup {
  name: string;
  phone: string;
  city: string;
  neighborhood: string;
  message: string;
}

export function buildWhatsAppLink(message: string, phone: string = CONTACT.whatsapp): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function buildChannelSignupMessage(data: ChannelSignup): string {
  const lines = [
    'Olá! Quero participar do *canal oficial da Digital da Causa Animal* no WhatsApp 🐾',
    '',
    `*Nome:* ${data.name}`,
    `*WhatsApp:* +55 ${data.phone}`,
    `*Cidade:* ${data.city}`,
    `*Bairro:* ${data.neighborhood}`,
  ];
  if (data.message.trim()) lines.push('', `*Mensagem:* ${data.message.trim()}`);
  return lines.join('\n');
}

export function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : '';
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function isValidPhone(formatted: string): boolean {
  return formatted.replace(/\D/g, '').length >= 10;
}

export const WHATSAPP_MESSAGES = {
  general: 'Olá! Vim pelo site da Digital da Causa Animal e gostaria de mais informações 🐾',
  school: 'Olá! Gostaria de levar o projeto de educação sobre a causa animal para a minha escola. Escola/cidade: ',
  donation: 'Olá! Quero ajudar a causa animal com doação de ração 🐾',
} as const;
