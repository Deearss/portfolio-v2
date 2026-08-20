import { NextRequest, NextResponse } from "next/server";
import {
  sanitizeInput,
  validateName,
  validateTopic,
  validateBudget,
  validateMessage,
} from "@/lib/sanitize";

// Nomor WhatsApp tersimpan murni di server-side environment variable (tanpa hardcoded string di repo)
const SERVER_WA_NUMBER = process.env.WHATSAPP_PHONE;

export async function POST(req: NextRequest) {
  try {
    if (!SERVER_WA_NUMBER) {
      return NextResponse.json(
        { error: "Konfigurasi nomor WhatsApp belum disetel di server (WHATSAPP_PHONE missing)." },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { name, topic, budget, message, purpose } = body;

    // 1. Validasi Input Ketat
    const nameVal = validateName(name || "");
    if (!nameVal.isValid) {
      return NextResponse.json({ error: nameVal.error }, { status: 400 });
    }

    const topicVal = validateTopic(topic || "");
    if (!topicVal.isValid) {
      return NextResponse.json({ error: topicVal.error }, { status: 400 });
    }

    const budgetVal = validateBudget(budget || "");
    if (!budgetVal.isValid) {
      return NextResponse.json({ error: budgetVal.error }, { status: 400 });
    }

    const messageVal = validateMessage(message || "");
    if (!messageVal.isValid) {
      return NextResponse.json({ error: messageVal.error }, { status: 400 });
    }

    // 2. Sanitasi Bersih
    const cleanName = sanitizeInput(name || "Calon Klien", 60);
    const cleanTopic = sanitizeInput(topic || "Konsultasi Projek", 100);
    const cleanBudget = sanitizeInput(budget || "Sesuai Diskusi", 60);
    const cleanPurpose = sanitizeInput(purpose || "Konsultasi Projek", 80);
    const cleanMessage = message ? sanitizeInput(message, 800).trim() : "";

    const purposeVerb =
      cleanPurpose.toLowerCase() === "konsultasi projek"
        ? "berkonsultasi"
        : cleanPurpose.toLowerCase();

    // 3. Susun Teks Pesan WhatsApp
    const finalWaText = cleanMessage
      ? `Halo Haidir, nama saya ${cleanName}. Saya ingin ${purposeVerb} mengenai ${cleanTopic} dengan estimasi budget ${cleanBudget}.\n\nDeskripsi Tambahan :\n${cleanMessage}`
      : `Halo Haidir, nama saya ${cleanName}. Saya ingin ${purposeVerb} mengenai ${cleanTopic} dengan estimasi budget ${cleanBudget}.`;

    const encodedText = encodeURIComponent(finalWaText);
    const dispatchUrl = `https://wa.me/${SERVER_WA_NUMBER}?text=${encodedText}`;

    return NextResponse.json({
      success: true,
      url: dispatchUrl,
      sanitizedText: finalWaText,
    });
  } catch {
    return NextResponse.json(
      { error: "Terjadi kesalahan saat memproses permintaan." },
      { status: 500 }
    );
  }
}
