"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Mail,
  Check,
  CheckCheck,
  Pencil,
  X,
  Sparkles,
  Copy,
  AlertCircle,
  Trash2,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import {
  sanitizeInput,
  validateName,
  validateTopic,
  validateBudget,
  validateMessage,
} from "@/lib/sanitize";

type ContactMethod = "whatsapp" | "email";
type ActiveModalField = "name" | "purpose" | "topic" | "budget" | "message" | null;

const PURPOSE_PRESETS = [
  "Konsultasi Projek",
  "Penawaran Kerjasama",
  "Jasa Pembuatan Sistem",
  "Konsultasi Teknis",
  "Diskusi Kebutuhan",
  "Tanya-Tanya Dulu",
];

const TOPIC_PRESETS = [
  "Pembuatan Landing Page",
  "Restrukturisasi & Permak Excel",
  "Pembuatan App Web / ERP Internal",
  "Migrasi Data Shopee ke WooCommerce",
  "Translasi Inggris ke Indonesia (Kontekstual)",
  "Refactoring / Permak Website WordPress",
  "Kustomisasi Lainnya",
];

const BUDGET_PRESETS = [
  "< Rp 1 Juta",
  "Rp 1 - 3 Juta",
  "Rp 3 - 5 Juta",
  "> Rp 5 Juta",
  "Fleksibel / Sesuai Kesepakatan",
];

export function WhatsappForm() {
  const [method, setMethod] = useState<ContactMethod>("whatsapp");
  const [name, setName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [topic, setTopic] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Email kontak diambil dari Environment Variable publik
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";

  // Modal State for interactive placeholder click
  const [activeModal, setActiveModal] = useState<ActiveModalField>(null);
  const [tempValue, setTempValue] = useState("");
  const [modalError, setModalError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (activeModal && inputRef.current) {
      inputRef.current.focus();
    }
  }, [activeModal]);

  const openModal = (field: ActiveModalField) => {
    setModalError(null);
    setActiveModal(field);
    if (field === "name") setTempValue(name);
    else if (field === "purpose") setTempValue(purpose || PURPOSE_PRESETS[0]);
    else if (field === "topic") setTempValue(topic || TOPIC_PRESETS[0]);
    else if (field === "budget") setTempValue(budget || BUDGET_PRESETS[0]);
    else if (field === "message") setTempValue(message);
  };

  const handleSaveModal = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setModalError(null);
    const sanitized = sanitizeInput(tempValue, 800);

    if (activeModal === "name") {
      const val = validateName(sanitized);
      if (!val.isValid) {
        setModalError(val.error || "Nama tidak valid.");
        return;
      }
      setName(sanitized);
    } else if (activeModal === "purpose") {
      const val = validateTopic(sanitized);
      if (!val.isValid) {
        setModalError(val.error || "Jenis keperluan tidak valid.");
        return;
      }
      setPurpose(sanitized);
    } else if (activeModal === "topic") {
      const val = validateTopic(sanitized);
      if (!val.isValid) {
        setModalError(val.error || "Topik tidak valid.");
        return;
      }
      setTopic(sanitized);
    } else if (activeModal === "budget") {
      const val = validateBudget(sanitized);
      if (!val.isValid) {
        setModalError(val.error || "Budget tidak valid.");
        return;
      }
      setBudget(sanitized);
    } else if (activeModal === "message") {
      const val = validateMessage(sanitized);
      if (!val.isValid) {
        setModalError(val.error || "Pesan tidak valid.");
        return;
      }
      setMessage(sanitized);
    }

    setActiveModal(null);
  };

  // Display texts (fallbacks)
  const displayName = name.trim() || "[Nama Kamu]";
  const displayPurpose = purpose.trim() || "[Konsultasi Projek]";
  const displayTopic = topic.trim() || "[Topik Projek]";
  const displayBudget = budget.trim() || "[Estimasi Budget]";
  const displayMessage = message.trim() || "[Isi Pesan Klien]";

  // Clean values for payloads
  const actualName = name.trim() || "Calon Klien";
  const actualPurpose = purpose.trim() || "Konsultasi Projek";
  const actualTopic = topic.trim() || "Konsultasi Tugas";
  const actualBudget = budget.trim() || "Sesuai Diskusi";
  const actualMessage = message.trim();

  const getPurposeVerb = (p: string) => {
    const lower = p.toLowerCase();
    if (lower.startsWith("konsultasi")) return `berkonsultasi mengenai`;
    if (lower.startsWith("penawaran")) return `mengajukan ${lower} mengenai`;
    if (lower.startsWith("jasa")) return `menggunakan ${lower} untuk`;
    if (lower.startsWith("diskusi")) return `berdiskusi santai mengenai`;
    if (lower.startsWith("tanya")) return `bertanya-tanya seputar`;
    return `mengajukan ${p} mengenai`;
  };

  const purposeVerb = getPurposeVerb(actualPurpose);

  const waText = actualMessage
    ? `Halo Haidir, nama saya *${actualName}*. Saya ingin ${purposeVerb} *${actualTopic}* dengan estimasi budget *${actualBudget}*.\n\n*Deskripsi Tambahan :*\n${actualMessage}`
    : `Halo Haidir, nama saya *${actualName}*. Saya ingin ${purposeVerb} *${actualTopic}* dengan estimasi budget *${actualBudget}*.`;

  const emailSubject = `${actualPurpose}: ${actualTopic} - ${actualName}`;
  const emailBody = actualMessage
    ? `Halo Haidir,

Perkenalkan nama saya ${actualName}. Saya ingin ${purposeVerb} mengenai ${actualTopic} dengan estimasi budget ${actualBudget}.

Deskripsi Tambahan / Pesan:
${actualMessage}

Terima kasih,
${actualName}`
    : `Halo Haidir,

Perkenalkan nama saya ${actualName}. Saya ingin ${purposeVerb} mengenai ${actualTopic} dengan estimasi budget ${actualBudget}.

Terima kasih,
${actualName}`;

  const handleSendAction = () => {
    setValidationError(null);

    // 1. Validasi Keamanan Sisi Klien
    const nameVal = validateName(name);
    if (!nameVal.isValid) {
      setValidationError(nameVal.error || "Nama tidak valid.");
      return;
    }
    const topicVal = validateTopic(topic);
    if (!topicVal.isValid) {
      setValidationError(topicVal.error || "Topik tidak valid.");
      return;
    }
    const budgetVal = validateBudget(budget);
    if (!budgetVal.isValid) {
      setValidationError(budgetVal.error || "Budget tidak valid.");
      return;
    }
    const messageVal = validateMessage(message);
    if (!messageVal.isValid) {
      setValidationError(messageVal.error || "Pesan tidak valid.");
      return;
    }

    if (method === "whatsapp") {
      const encodedText = encodeURIComponent(waText);
      const targetNum = atob("BASE64-NOMOR-WA-DIHAPUS");
      window.open(`https://wa.me/${targetNum}?text=${encodedText}`, "_blank");

      // Logging background API
      fetch("/api/contact/whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: sanitizeInput(name, 60),
          purpose: sanitizeInput(purpose, 80),
          topic: sanitizeInput(topic, 100),
          budget: sanitizeInput(budget, 60),
          message: sanitizeInput(message, 800),
        }),
      }).catch(() => {});
    } else {
      const encodedSubject = encodeURIComponent(sanitizeInput(emailSubject, 150));
      const encodedBody = encodeURIComponent(sanitizeInput(emailBody, 1200));
      const targetEmail = contactEmail;
      if (!targetEmail) {
        setValidationError("Alamat email tujuan belum dikonfigurasi di environment variable.");
        return;
      }

      // Buka Gmail Web Compose langsung di tab baru (kompatibel semua OS & browser)
      const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${targetEmail}&su=${encodedSubject}&body=${encodedBody}`;
      const mailtoUrl = `mailto:${targetEmail}?subject=${encodedSubject}&body=${encodedBody}`;

      const win = window.open(gmailWebUrl, "_blank");
      if (!win || win.closed || typeof win.closed === "undefined") {
        window.location.href = mailtoUrl;
      }
    }
  };

  const handleCopyText = () => {
    const textToCopy = method === "whatsapp" ? waText : `Subject: ${emailSubject}\n\n${emailBody}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isWa = method === "whatsapp";

  return (
    <section
      id="kontak"
      className="py-20 bg-white border-b border-stone-200/60 font-sans transition-colors duration-300 relative"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Ceritain Tugas Kamu ke Saya
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm mt-2 leading-relaxed">
            Isi bagian yang disorot, nanti teksnya nempel di WhatsApp kamu dan masih bisa kamu edit sebelum kirim.
          </p>

          {/* Medium Switcher / Toggle Pills */}
          <div className="mt-6 inline-flex p-1.5 bg-stone-100 rounded-xl border border-stone-200 shadow-inner gap-1">
            <button
              type="button"
              onClick={() => {
                setMethod("whatsapp");
                setValidationError(null);
              }}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                isWa
                  ? "bg-[#008069] text-white shadow-sm scale-100"
                  : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/60"
              }`}
            >
              <FaWhatsapp className="w-4 h-4" />
              <span>WhatsApp Chat</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMethod("email");
                setValidationError(null);
              }}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                !isWa
                  ? "bg-[#0b57d0] text-white shadow-sm scale-100"
                  : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/60"
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Email Draft</span>
            </button>
          </div>
        </div>

        {/* Validation Error Banner if any */}
        {validationError && (
          <div className="max-w-2xl mx-auto mb-6 p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2.5 animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <p className="flex-1 font-medium">{validationError}</p>
            <button
              type="button"
              onClick={() => setValidationError(null)}
              className="text-rose-400 hover:text-rose-700 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Centered Main Interactive Card Container */}
        <div className="max-w-2xl mx-auto">
          {isWa ? (
            /* ========================================================================= */
            /* 1. WHATSAPP WEB DIRECT INTERACTIVE CHAT WINDOW (Comfort Dark Theme) */
            /* ========================================================================= */
            <div className="rounded-2xl overflow-hidden border border-stone-800 shadow-2xl bg-[#0b141a] text-[#e9edef] transition-all duration-300">
              {/* Header Bar */}
              <div className="px-4 py-3 bg-[#202c33] flex items-center justify-between border-b border-stone-800/80">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://avatars.githubusercontent.com/u/111673708?v=4"
                      alt="Haidir Aditya"
                      className="w-10 h-10 rounded-full object-cover border border-[#2a3942]"
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#008069] border-2 border-[#202c33]" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-[#e9edef] leading-tight flex items-center gap-1.5">
                      Haidir Aditya
                    </p>
                    <p className="text-[11px] text-stone-400 font-normal leading-tight mt-0.5">
                      Systems &amp; Software Engineer
                    </p>
                  </div>
                </div>
              </div>

              {/* Chat Canvas with Interactive Bubble */}
              <div className="relative p-5 sm:p-7 min-h-70 flex flex-col justify-end bg-[#0b141a] overflow-hidden">
                {/* Doodle Background Pattern */}
                <div
                  className="absolute inset-0 opacity-[0.05] pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(#008069 1px, transparent 1px), radial-gradient(#8696a0 1px, #0b141a 1px)`,
                    backgroundSize: "24px 24px",
                    backgroundPosition: "0 0, 12px 12px",
                  }}
                />

                {/* Authentic WhatsApp Date Badge */}
                <div className="relative z-10 self-center mb-2.5 px-3 py-0.5 rounded-md bg-[#182229] text-[11px] font-medium text-[#8696a0] shadow-xs select-none">
                  Hari Ini
                </div>

                {/* Interactive Guide Tooltip Badge */}
                <div className="relative z-10 self-center mb-7 sm:mb-8 px-3.5 py-1 rounded-full bg-[#182229] border border-[#008069]/40 text-[11px] text-[#8696a0] flex items-center gap-1.5 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-[#008069]" />
                  <span>Klik bagian bergaris putus-putus untuk mengisi pesan</span>
                </div>

                {/* 1st Bubble: Intro & Kebutuhan */}
                <div className="relative z-10 self-end max-w-[95%] sm:max-w-[90%] bg-[#005c4b] text-[#e9edef] rounded-2xl rounded-tr-xs p-3.5 sm:p-4 shadow-md border border-[#025144] space-y-2">
                  <div className="text-xs sm:text-[13px] leading-relaxed whitespace-pre-wrap font-sans text-stone-100">
                    <span>Halo Haidir, nama saya </span>
                    <span className="relative group/tip inline-flex items-center">
                      <button
                        type="button"
                        onClick={() => openModal("name")}
                        aria-label="Isi Nama Pengirim"
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-semibold text-xs transition-all cursor-pointer ${
                          name.trim()
                            ? "bg-[#00483a] text-white border border-[#008069]/70 hover:bg-[#005a48]"
                            : "bg-[#0f2c25] text-amber-200/90 border border-dashed border-amber-600/50 hover:bg-[#143830]"
                        }`}
                      >
                        <span>{displayName}</span>
                        <Pencil className="w-3 h-3 text-[#8696a0] shrink-0" />
                      </button>
                      <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/tip:opacity-100 group-hover/tip:-top-9 transition-all duration-200 z-30">
                        <span className="relative block px-2.5 py-1 text-[11px] font-semibold text-stone-100 bg-stone-900/95 border border-stone-700 rounded-md shadow-xl whitespace-nowrap">
                          Klik untuk mengisi Nama
                          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-stone-900" />
                        </span>
                      </span>
                    </span>
                    <span>. Saya ingin </span>
                    <span className="relative group/tip inline-flex items-center">
                      <button
                        type="button"
                        onClick={() => openModal("purpose")}
                        aria-label="Pilih Keperluan Kontak"
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-semibold text-xs transition-all cursor-pointer ${
                          purpose.trim()
                            ? "bg-[#00483a] text-white border border-[#008069]/70 hover:bg-[#005a48]"
                            : "bg-[#0f2c25] text-amber-200/90 border border-dashed border-amber-600/50 hover:bg-[#143830]"
                        }`}
                      >
                        <span>{displayPurpose}</span>
                        <Pencil className="w-3 h-3 text-[#8696a0] shrink-0" />
                      </button>
                      <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/tip:opacity-100 group-hover/tip:-top-9 transition-all duration-200 z-30">
                        <span className="relative block px-2.5 py-1 text-[11px] font-semibold text-stone-100 bg-stone-900/95 border border-stone-700 rounded-md shadow-xl whitespace-nowrap">
                          Klik untuk memilih Keperluan
                          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-stone-900" />
                        </span>
                      </span>
                    </span>
                    <span> mengenai </span>
                    <span className="relative group/tip inline-flex items-center">
                      <button
                        type="button"
                        onClick={() => openModal("topic")}
                        aria-label="Pilih Topik Projek"
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-semibold text-xs transition-all cursor-pointer ${
                          topic.trim()
                            ? "bg-[#00483a] text-white border border-[#008069]/70 hover:bg-[#005a48]"
                            : "bg-[#0f2c25] text-amber-200/90 border border-dashed border-amber-600/50 hover:bg-[#143830]"
                        }`}
                      >
                        <span>{displayTopic}</span>
                        <Pencil className="w-3 h-3 text-[#8696a0] shrink-0" />
                      </button>
                      <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/tip:opacity-100 group-hover/tip:-top-9 transition-all duration-200 z-30">
                        <span className="relative block px-2.5 py-1 text-[11px] font-semibold text-stone-100 bg-stone-900/95 border border-stone-700 rounded-md shadow-xl whitespace-nowrap">
                          Klik untuk memilih Topik
                          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-stone-900" />
                        </span>
                      </span>
                    </span>
                    <span> dengan estimasi budget </span>
                    <span className="relative group/tip inline-flex items-center">
                      <button
                        type="button"
                        onClick={() => openModal("budget")}
                        aria-label="Pilih Estimasi Budget"
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-semibold text-xs transition-all cursor-pointer ${
                          budget.trim()
                            ? "bg-[#00483a] text-white border border-[#008069]/70 hover:bg-[#005a48]"
                            : "bg-[#0f2c25] text-amber-200/90 border border-dashed border-amber-600/50 hover:bg-[#143830]"
                        }`}
                      >
                        <span>{displayBudget}</span>
                        <Pencil className="w-3 h-3 text-[#8696a0] shrink-0" />
                      </button>
                      <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/tip:opacity-100 group-hover/tip:-top-9 transition-all duration-200 z-30">
                        <span className="relative block px-2.5 py-1 text-[11px] font-semibold text-stone-100 bg-stone-900/95 border border-stone-700 rounded-md shadow-xl whitespace-nowrap">
                          Klik untuk memilih Budget
                          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-stone-900" />
                        </span>
                      </span>
                    </span>
                    <span>.</span>
                  </div>

                  <div className="flex items-center justify-end gap-1 text-[10px] text-[#8696a0] font-mono select-none pt-0.5">
                    <span>12:00</span>
                    <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />
                  </div>
                </div>

                {/* 2nd Bubble: Detail Pesan Klien */}
                <div className="relative z-10 self-end max-w-[95%] sm:max-w-[90%] bg-[#005c4b] text-[#e9edef] rounded-2xl rounded-tr-xs p-3.5 sm:p-4 shadow-md border border-[#025144] space-y-2 mt-2">
                  <div className="text-xs sm:text-[13px] leading-relaxed whitespace-pre-wrap font-sans text-stone-100 flex flex-col items-start gap-1.5 w-full">
                    <span className="font-semibold text-[11px] text-[#8696a0] block">
                      Deskripsi Tambahan (Opsional):
                    </span>
                    <div className="relative group/tip w-full">
                      <button
                        type="button"
                        onClick={() => openModal("message")}
                        aria-label="Tulis Deskripsi Tambahan"
                        className={`w-full inline-flex items-start justify-between text-left gap-1.5 px-2.5 py-1.5 rounded-md text-xs sm:text-[13px] transition-all cursor-pointer ${
                          message.trim()
                            ? "bg-[#00483a] text-white border border-[#008069]/70 hover:bg-[#005a48]"
                            : "bg-[#0f2c25] text-amber-200/90 border border-dashed border-amber-600/50 hover:bg-[#143830]"
                        }`}
                      >
                        <span className="leading-snug flex-1">{displayMessage}</span>
                        <Pencil className="w-3 h-3 text-[#8696a0] shrink-0 mt-0.5" />
                      </button>
                      <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/tip:opacity-100 group-hover/tip:-top-9 transition-all duration-200 z-30">
                        <span className="relative block px-2.5 py-1 text-[11px] font-semibold text-stone-100 bg-stone-900/95 border border-stone-700 rounded-md shadow-xl whitespace-nowrap">
                          Klik untuk menulis Pesan
                          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-stone-900" />
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-1 text-[10px] text-[#8696a0] font-mono select-none pt-0.5">
                    <span>12:01</span>
                    <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />
                  </div>
                </div>
              </div>

              {/* Bottom Action Bar: Full-Width Send Button + Separate Reset Button */}
              <div className="p-3.5 sm:p-4 bg-[#202c33] border-t border-stone-800/80 flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleSendAction}
                  aria-label="Kirim Draft ke WhatsApp"
                  className="flex-1 py-3 px-5 rounded-xl bg-[#008069] hover:bg-[#006e5a] active:scale-[0.99] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all shadow-md cursor-pointer"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="shrink-0"
                  >
                    <path d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z" />
                  </svg>
                  <span>Kirim Draft ke WhatsApp</span>
                </button>
                <div className="relative group/tip flex items-center justify-center shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setName("");
                      setPurpose("");
                      setTopic("");
                      setBudget("");
                      setMessage("");
                    }}
                    className="p-3 rounded-xl bg-[#182229] hover:bg-red-950/40 text-[#8696a0] hover:text-red-400 border border-stone-700/60 transition-all cursor-pointer shadow-xs"
                    aria-label="Reset / Buang Draf"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <div className="pointer-events-none absolute -top-9 right-0 opacity-0 group-hover/tip:opacity-100 group-hover/tip:-top-10 transition-all duration-200 z-30">
                    <div className="relative px-2.5 py-1 text-[11px] font-semibold text-stone-100 bg-stone-900/95 border border-stone-700 rounded-md shadow-xl whitespace-nowrap">
                      Reset / Buang Draf
                      <div className="absolute top-full right-4 border-4 border-transparent border-t-stone-900" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* ========================================================================= */
            /* 2. GMAIL CLIENT DIRECT INTERACTIVE COMPOSE WINDOW */
            /* ========================================================================= */
            <div className="rounded-2xl overflow-hidden border border-stone-300 shadow-xl bg-white text-stone-800 transition-all duration-300 font-sans">
              {/* Gmail Top Header Bar */}
              <div className="px-4 py-2.5 bg-[#f2f6fc] border-b border-stone-200/90 flex items-center select-none">
                <span className="text-xs sm:text-sm font-semibold text-[#041e49]">
                  Pesan Baru
                </span>
              </div>

              {/* Penerima Row */}
              <div className="px-4 py-2.5 flex items-center gap-3 border-b border-stone-200/80 text-xs sm:text-sm">
                <span className="text-stone-500 font-medium w-16 shrink-0">Penerima</span>
                <div className="flex items-center gap-1.5 flex-1 min-w-0">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[#0b57d0] font-semibold text-xs shadow-2xs">
                    Haidir Aditya (Email Resmi)
                  </span>
                </div>
              </div>

              {/* Subjek Row */}
              <div className="px-4 py-2 flex items-center gap-3 border-b border-stone-200/80 text-xs sm:text-sm">
                <span className="text-stone-500 font-medium w-16 shrink-0">Subjek</span>
                <span className="text-stone-800 font-medium truncate flex-1">
                  {emailSubject}
                </span>
              </div>

              {/* Email Compose Body */}
              <div className="p-5 sm:p-6 min-h-60 text-xs sm:text-[13.5px] leading-relaxed text-stone-800 space-y-3.5 font-sans bg-white">
                <p>Halo Haidir,</p>
                <p className="leading-relaxed">
                  <span>Perkenalkan nama saya </span>
                  <span className="relative group/tip inline-flex items-center">
                    <button
                      type="button"
                      onClick={() => openModal("name")}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold transition-all cursor-pointer ${
                        name.trim()
                          ? "bg-blue-100 text-blue-900 border border-blue-300 hover:bg-blue-200"
                          : "bg-blue-50 text-blue-700 border border-dashed border-blue-400 hover:bg-blue-100"
                      }`}
                    >
                      <span>{displayName}</span>
                      <Pencil className="w-3 h-3 text-blue-600" />
                    </button>
                    <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/tip:opacity-100 group-hover/tip:-top-9 transition-all duration-200 z-30">
                      <span className="relative block px-2.5 py-1 text-[11px] font-semibold text-stone-100 bg-stone-900/95 border border-stone-700 rounded-md shadow-xl whitespace-nowrap">
                        Klik untuk mengisi Nama
                        <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-stone-900" />
                      </span>
                    </span>
                  </span>
                  <span>. Saya ingin </span>
                  <span className="relative group/tip inline-flex items-center">
                    <button
                      type="button"
                      onClick={() => openModal("purpose")}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold transition-all cursor-pointer ${
                        purpose.trim()
                          ? "bg-blue-100 text-blue-900 border border-blue-300 hover:bg-blue-200"
                          : "bg-blue-50 text-blue-700 border border-dashed border-blue-400 hover:bg-blue-100"
                      }`}
                    >
                      <span>{displayPurpose}</span>
                      <Pencil className="w-3 h-3 text-blue-600" />
                    </button>
                    <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/tip:opacity-100 group-hover/tip:-top-9 transition-all duration-200 z-30">
                      <span className="relative block px-2.5 py-1 text-[11px] font-semibold text-stone-100 bg-stone-900/95 border border-stone-700 rounded-md shadow-xl whitespace-nowrap">
                        Klik untuk memilih Keperluan
                        <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-stone-900" />
                      </span>
                    </span>
                  </span>
                  <span> mengenai </span>
                  <span className="relative group/tip inline-flex items-center">
                    <button
                      type="button"
                      onClick={() => openModal("topic")}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold transition-all cursor-pointer ${
                        topic.trim()
                          ? "bg-blue-100 text-blue-900 border border-blue-300 hover:bg-blue-200"
                          : "bg-blue-50 text-blue-700 border border-dashed border-blue-400 hover:bg-blue-100"
                      }`}
                    >
                      <span>{displayTopic}</span>
                      <Pencil className="w-3 h-3 text-blue-600" />
                    </button>
                    <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/tip:opacity-100 group-hover/tip:-top-9 transition-all duration-200 z-30">
                      <span className="relative block px-2.5 py-1 text-[11px] font-semibold text-stone-100 bg-stone-900/95 border border-stone-700 rounded-md shadow-xl whitespace-nowrap">
                        Klik untuk memilih Topik
                        <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-stone-900" />
                      </span>
                    </span>
                  </span>
                  <span> dengan estimasi budget </span>
                  <span className="relative group/tip inline-flex items-center">
                    <button
                      type="button"
                      onClick={() => openModal("budget")}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold transition-all cursor-pointer ${
                        budget.trim()
                          ? "bg-blue-100 text-blue-900 border border-blue-300 hover:bg-blue-200"
                          : "bg-blue-50 text-blue-700 border border-dashed border-blue-400 hover:bg-blue-100"
                      }`}
                    >
                      <span>{displayBudget}</span>
                      <Pencil className="w-3 h-3 text-blue-600" />
                    </button>
                    <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/tip:opacity-100 group-hover/tip:-top-9 transition-all duration-200 z-30">
                      <span className="relative block px-2.5 py-1 text-[11px] font-semibold text-stone-100 bg-stone-900/95 border border-stone-700 rounded-md shadow-xl whitespace-nowrap">
                        Klik untuk memilih Budget
                        <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-stone-900" />
                      </span>
                    </span>
                  </span>
                  <span>.</span>
                </p>

                <div className="pt-1">
                  <p className="font-semibold text-stone-700 text-xs mb-1">
                    Deskripsi Tambahan / Pesan:
                  </p>
                  <div className="relative group/tip w-full">
                    <button
                      type="button"
                      onClick={() => openModal("message")}
                      className={`w-full text-left p-2.5 rounded-lg text-xs sm:text-[13px] transition-all cursor-pointer flex items-start justify-between gap-2 ${
                        message.trim()
                          ? "bg-stone-50 border border-stone-300 text-stone-800 hover:border-blue-400"
                          : "bg-stone-50/60 border border-dashed border-stone-300 text-stone-500 hover:border-blue-400"
                      }`}
                    >
                      <span className="leading-relaxed flex-1">{displayMessage}</span>
                      <Pencil className="w-3 h-3 text-stone-500 shrink-0 mt-0.5" />
                    </button>
                    <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/tip:opacity-100 group-hover/tip:-top-9 transition-all duration-200 z-30">
                      <span className="relative block px-2.5 py-1 text-[11px] font-semibold text-stone-100 bg-stone-900/95 border border-stone-700 rounded-md shadow-xl whitespace-nowrap">
                        Klik untuk menulis Pesan
                        <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-stone-900" />
                      </span>
                    </span>
                  </div>
                </div>

                <p className="pt-2 text-stone-600">
                  Terima kasih,
                  <br />
                  <span className="font-semibold text-stone-800">{actualName}</span>
                </p>
              </div>

              {/* Gmail Bottom Action Bar */}
              <div className="p-3.5 sm:p-4 bg-[#f2f6fc] border-t border-stone-200/90 flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleSendAction}
                  aria-label="Kirim Draft Lewat Email"
                  className="flex-1 py-3 px-5 rounded-xl bg-[#0b57d0] hover:bg-[#0842a0] active:scale-[0.99] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all shadow-md cursor-pointer"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="shrink-0"
                  >
                    <path d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z" />
                  </svg>
                  <span>Kirim Draft</span>
                </button>
                <div className="relative group/tip flex items-center justify-center shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setName("");
                      setPurpose("");
                      setTopic("");
                      setBudget("");
                      setMessage("");
                    }}
                    className="p-3 rounded-xl bg-white hover:bg-red-50 text-stone-500 hover:text-red-600 border border-stone-300 shadow-xs hover:border-red-200 transition-all cursor-pointer shrink-0"
                    aria-label="Reset / Buang Draf"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <div className="pointer-events-none absolute -top-9 right-0 opacity-0 group-hover/tip:opacity-100 group-hover/tip:-top-10 transition-all duration-200 z-30">
                    <div className="relative px-2.5 py-1 text-[11px] font-semibold text-stone-100 bg-stone-900/95 border border-stone-700 rounded-md shadow-xl whitespace-nowrap">
                      Reset / Buang Draf
                      <div className="absolute top-full right-4 border-4 border-transparent border-t-stone-900" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Secondary Action Buttons below Card */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleCopyText}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-stone-100 hover:bg-stone-200/80 active:scale-95 text-stone-900 font-bold text-xs sm:text-sm border border-stone-300/70 shadow-xs transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#008069]" />
                  <span className="text-[#008069] font-bold">Draf Berhasil Disalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-stone-900" />
                  <span>Salin Seluruh Teks Draf</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setMethod(isWa ? "email" : "whatsapp");
                setValidationError(null);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-stone-50 active:scale-95 text-stone-900 font-bold text-xs sm:text-sm border border-stone-300/80 shadow-xs transition-all cursor-pointer"
            >
              {isWa ? (
                <>
                  <Mail className="w-4 h-4 text-stone-900" />
                  <span>Diskusi via Email</span>
                </>
              ) : (
                <>
                  <FaWhatsapp className="w-4 h-4 text-stone-900" />
                  <span>Diskusi via WhatsApp</span>
                </>
              )}
            </button>
          </div>
          </div>
        </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE POPUP MODAL FOR PLACEHOLDER EDITING */}
      {/* ========================================================================= */}
      {activeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-stone-200 space-y-4 animate-in zoom-in-95 duration-200 text-stone-900 font-sans"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-stone-100 text-stone-700 flex items-center justify-center font-bold text-xs">
                  <Pencil className="w-4 h-4" />
                </span>
                <h3 className="font-bold text-sm text-stone-900">
                  {activeModal === "name" && "Masukkan Nama Kamu"}
                  {activeModal === "purpose" && "Pilih / Tulis Jenis Keperluan"}
                  {activeModal === "topic" && "Pilih / Tulis Topik Projek"}
                  {activeModal === "budget" && "Pilih Estimasi Budget"}
                  {activeModal === "message" && "Tulis Detail Kebutuhan / Pesan"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-1 rounded-md text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Validation Error if any */}
            {modalError && (
              <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{modalError}</span>
              </div>
            )}

            {/* Modal Input Form */}
            <form onSubmit={handleSaveModal} className="space-y-4">
              {/* 1. Name Input */}
              {activeModal === "name" && (
                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1.5">
                    Nama Lengkap / Panggilan:
                  </label>
                  <input
                    ref={inputRef as React.RefObject<HTMLInputElement>}
                    type="text"
                    required
                    maxLength={60}
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    placeholder="Contoh: Budi Prasetyo"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-[#008069] focus:ring-2 focus:ring-[#008069]/20 transition-all"
                  />
                </div>
              )}

              {/* 2. Purpose Input & Presets */}
              {activeModal === "purpose" && (
                <div className="space-y-3">
                  <label className="block text-xs font-semibold text-stone-600">
                    Pilih jenis keperluan atau ketik sendiri:
                  </label>
                  <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                    {PURPOSE_PRESETS.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setTempValue(preset)}
                        className={`text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                          tempValue === preset
                            ? "bg-[#008069] text-white border-[#008069] font-semibold shadow-xs"
                            : "bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200"
                        }`}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                  <input
                    ref={inputRef as React.RefObject<HTMLInputElement>}
                    type="text"
                    maxLength={80}
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    placeholder="Contoh: Konsultasi Projek / Kerjasama..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-[#008069] focus:ring-2 focus:ring-[#008069]/20 transition-all"
                  />
                </div>
              )}

              {/* 2. Topic Input & Presets */}
              {activeModal === "topic" && (
                <div className="space-y-3">
                  <label className="block text-xs font-semibold text-stone-600">
                    Pilih opsi cepat atau ketik sendiri:
                  </label>
                  <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                    {TOPIC_PRESETS.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setTempValue(preset)}
                        className={`text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                          tempValue === preset
                            ? "bg-[#008069] text-white border-[#008069] font-semibold shadow-xs"
                            : "bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200"
                        }`}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                  <input
                    ref={inputRef as React.RefObject<HTMLInputElement>}
                    type="text"
                    maxLength={100}
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    placeholder="Atau ketik topik custom..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-[#008069] focus:ring-2 focus:ring-[#008069]/20 transition-all"
                  />
                </div>
              )}

              {/* 3. Budget Input & Presets */}
              {activeModal === "budget" && (
                <div className="space-y-3">
                  <label className="block text-xs font-semibold text-stone-600">
                    Pilih range estimasi budget:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {BUDGET_PRESETS.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setTempValue(preset)}
                        className={`text-xs px-3.5 py-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          tempValue === preset
                            ? "bg-[#008069] text-white border-[#008069] font-bold shadow-xs"
                            : "bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200 font-medium"
                        }`}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                  <input
                    ref={inputRef as React.RefObject<HTMLInputElement>}
                    type="text"
                    maxLength={60}
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    placeholder="Atau ketik nominal custom..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-[#008069] focus:ring-2 focus:ring-[#008069]/20 transition-all"
                  />
                </div>
              )}

              {/* 4. Message Textarea */}
              {activeModal === "message" && (
                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1.5">
                    Jelaskan apa yang ingin kamu buat atau bantu:
                  </label>
                  <textarea
                    ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                    rows={4}
                    maxLength={800}
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    placeholder="Contoh: Saya butuh dibuatkan landing page untuk usaha katering dengan 3 halaman..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-[#008069] focus:ring-2 focus:ring-[#008069]/20 transition-all resize-none"
                  />
                  <div className="text-[11px] text-stone-400 text-right mt-1 font-mono">
                    {tempValue.length}/800 karakter
                  </div>
                </div>
              )}

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100 transition-all cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#008069] hover:bg-[#006e5a] text-white text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
                >
                  Simpan &amp; Terapkan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}


