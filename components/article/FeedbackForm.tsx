"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { apiFetch } from "../../lib/api";
import { Check, Gift, AlertCircle, HelpCircle, Loader2, Sparkles } from "lucide-react";

// Offline Barcode Generator Component (Code 39 standard)
const CODE39_PATTERNS: Record<string, string> = {
  '0': '000110100',
  '1': '100100001',
  '2': '001100001',
  '3': '101100000',
  '4': '000110001',
  '5': '100110000',
  '6': '001110000',
  '7': '000100101',
  '8': '100100100',
  '9': '001100100',
  '*': '010010100'
};

function Barcode({ value }: { value: string }) {
  const fullVal = `*${value}*`;

  const narrowWidth = 2;
  const wideWidth = 5;
  const gapWidth = 2;

  let currentX = 15;
  const height = 65;
  const rects: React.ReactNode[] = [];

  for (let i = 0; i < fullVal.length; i++) {
    const char = fullVal[i].toUpperCase();
    const pattern = CODE39_PATTERNS[char];
    if (!pattern) continue;

    for (let j = 0; j < 9; j++) {
      const isBar = j % 2 === 0;
      const isWide = pattern[j] === '1';
      const width = isWide ? wideWidth : narrowWidth;

      if (isBar) {
        rects.push(
          <rect
            key={`${i}-${j}`}
            x={currentX}
            y={8}
            width={width}
            height={height}
            fill="#0f172a"
          />
        );
      }
      currentX += width;
    }

    if (i < fullVal.length - 1) {
      currentX += gapWidth;
    }
  }

  const totalWidth = currentX + 15;

  return (
    <div className="flex flex-col items-center justify-center p-5 bg-white border border-slate-100 rounded-2xl shadow-sm max-w-full overflow-x-auto">
      <svg width={totalWidth} height={height + 25} viewBox={`0 0 ${totalWidth} ${height + 25}`} className="mx-auto">
        {rects}
        <text
          x={totalWidth / 2}
          y={height + 20}
          textAnchor="middle"
          fontSize="14"
          fontFamily="monospace"
          fontWeight="bold"
          fill="#0f172a"
          letterSpacing="4"
        >
          {value}
        </text>
      </svg>
    </div>
  );
}

export default function FeedbackForm({ articleId }: { articleId: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isOtherChecked, setIsOtherChecked] = useState(false);
  const [otherCategory, setOtherCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const recaptchaRef = useRef<HTMLDivElement>(null);

  // Fetch active categories dynamically
  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await apiFetch("/api/categories");
        if (res.data) {
          setCategories(res.data);
        }
      } catch (err) {
        console.error("Gagal memuat kategori:", err);
      } finally {
        setCategoriesLoading(false);
      }
    }
    loadCategories();
  }, []);

  // Initialize reCAPTCHA when script loads via global callback
  useEffect(() => {
    (window as any).onRecaptchaLoad = () => {
      setRecaptchaLoaded(true);
    };

    if (typeof window !== "undefined" && (window as any).grecaptcha && (window as any).grecaptcha.render) {
      setRecaptchaLoaded(true);
    }

    return () => {
      delete (window as any).onRecaptchaLoad;
    };
  }, []);

  useEffect(() => {
    if (recaptchaLoaded && recaptchaRef.current && typeof window !== "undefined" && (window as any).grecaptcha) {
      const grecaptcha = (window as any).grecaptcha;
      if (typeof grecaptcha.render === "function") {
        try {
          grecaptcha.render(recaptchaRef.current, {
            sitekey: "6LfwVUQtAAAAAFJv7DeMujnnzrnDYB2nHw9G3j5p",
            callback: (token: string) => {
              setRecaptchaToken(token);
              setErrorMsg("");
            },
            "expired-callback": () => {
              setRecaptchaToken("");
            },
            "error-callback": () => {
              setRecaptchaToken("");
            }
          });
        } catch (err) {
          console.error("Gagal merender reCAPTCHA:", err);
        }
      }
    }
  }, [recaptchaLoaded, success]);

  const handleCategoryChange = (catName: string) => {
    setSelectedCategories(prev =>
      prev.includes(catName)
        ? prev.filter(c => c !== catName)
        : [...prev, catName]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim()) return setErrorMsg("Nama lengkap wajib diisi.");
    if (!phone.trim()) return setErrorMsg("Nomor WhatsApp/HP wajib diisi.");
    if (selectedCategories.length === 0 && !isOtherChecked) {
      return setErrorMsg("Pilih minimal satu kategori yang Anda sukai.");
    }
    if (isOtherChecked && !otherCategory.trim()) {
      return setErrorMsg("Masukkan kategori lainnya yang Anda sukai.");
    }
    if (!recaptchaToken) {
      return setErrorMsg("Harap centang reCAPTCHA 'I'm not a robot'.");
    }

    setLoading(true);
    try {
      const res = await apiFetch("/api/feedbacks", {
        method: "POST",
        body: JSON.stringify({
          name,
          phone,
          categories: selectedCategories,
          otherCategory: isOtherChecked ? otherCategory : null,
          recaptchaToken,
          articleId
        })
      });

      if (res.data?.verificationCode) {
        setVerificationCode(res.data.verificationCode);
        setSuccess(true);
      } else {
        setErrorMsg("Gagal menyimpan feedback. Silakan coba lagi.");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Gagal menyimpan feedback.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="mt-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 md:p-12 text-white shadow-xl shadow-teal-500/20 text-center relative overflow-hidden">
        {/* Floating background decorative details */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/5 rounded-full blur-3xl -ml-20 -mb-20"></div>

        <div className="max-w-2xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-md rounded-full mb-2 border border-white/20 animate-bounce">
            <Gift className="w-10 h-10 text-white" />
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Terima Kasih Atas Feedback Anda!</h2>
          <p className="text-teal-100 text-sm md:text-base leading-relaxed">
            Feedback Anda sangat berharga bagi peningkatan kualitas informasi di <strong>kita-sehat.id</strong>. Sebagai apresiasi, kami telah menyiapkan bingkisan menarik untuk Anda!
          </p>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-8 my-8 max-w-md mx-auto space-y-6 shadow-inner">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-teal-200">Kode Verifikasi Anda</span>
              <div className="text-4xl md:text-5xl font-black tracking-wider text-white mt-1">
                {verificationCode}
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <span className="text-[10px] uppercase font-bold tracking-widest text-teal-200 block mb-3">Barcode Kupon</span>
              <Barcode value={verificationCode} />
            </div>
          </div>

          <div className="flex items-start justify-center gap-3 text-left max-w-lg mx-auto bg-black/10 rounded-xl p-4 text-xs text-teal-50">
            <Sparkles className="w-5 h-5 flex-shrink-0 text-amber-300" />
            <p className="leading-relaxed">
              <strong>Penting:</strong> Simpan halaman ini atau ambil tangkapan layar (screenshot) barcode dan tunjukkan kepada Admin.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12 bg-white border border-slate-100 rounded-3xl p-6 md:p-10 shadow-lg shadow-slate-100/50">
      {/* Script Loader for Google reCAPTCHA v2 */}
      <Script
        src="https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit"
        strategy="afterInteractive"
      />

      <div className="mb-8 text-center max-w-xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#0098b0]/10 text-[#0098b0] mb-3">
          <Gift size={12} /> Feedback Reward
        </span>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Bantu kami meningkatkan Kita-Sehat.id</h2>
        <p className="text-sm text-slate-500 leading-relaxed">
          Kategori informasi kesehatan apa yang paling Anda sukai? Isi form feedback singkat di bawah ini
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Input */}
          <div className="space-y-2">
            <label htmlFor="feedback-name" className="text-sm font-bold text-slate-700 block">
              Nama Lengkap
            </label>
            <input
              type="text"
              id="feedback-name"
              placeholder="Contoh: Budi Santoso"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#0098b0] focus:ring-2 focus:ring-[#0098b0]/10 transition-all font-medium"
              required
            />
          </div>

          {/* Phone Input */}
          <div className="space-y-2">
            <label htmlFor="feedback-phone" className="text-sm font-bold text-slate-700 block">
              Nomor WhatsApp / HP
            </label>
            <input
              type="tel"
              id="feedback-phone"
              placeholder="Contoh: 081234567890"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#0098b0] focus:ring-2 focus:ring-[#0098b0]/10 transition-all font-medium"
              required
            />
          </div>
        </div>

        {/* Categories Checkbox Grid */}
        <div className="space-y-3 pt-2">
          <label className="text-sm font-bold text-slate-700 block">
            Kategori Apa Yang Paling Anda Sukai di kita-sehat.id?
          </label>

          {categoriesLoading ? (
            <div className="flex items-center gap-2 text-slate-400 py-3 text-xs">
              <Loader2 className="animate-spin" size={16} />
              Memuat pilihan kategori...
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {categories.map((cat) => {
                const isChecked = selectedCategories.includes(cat.name);
                return (
                  <label
                    key={cat.id}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer select-none transition-all ${isChecked
                      ? "border-[#0098b0] bg-cyan-50/20 text-[#0098b0]"
                      : "border-slate-200 bg-white hover:bg-slate-50 text-slate-600"
                      }`}
                  >
                    <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${isChecked
                      ? "border-[#0098b0] bg-[#0098b0] text-white"
                      : "border-slate-300 bg-white"
                      }`}>
                      {isChecked && <Check size={12} strokeWidth={3} />}
                    </div>
                    <span className="text-xs font-semibold">{cat.name}</span>
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={isChecked}
                      onChange={() => handleCategoryChange(cat.name)}
                    />
                  </label>
                );
              })}

              {/* "Lainnya" Checkbox */}
              <label
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer select-none transition-all ${isOtherChecked
                  ? "border-[#0098b0] bg-cyan-50/20 text-[#0098b0]"
                  : "border-slate-200 bg-white hover:bg-slate-50 text-slate-600"
                  }`}
              >
                <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${isOtherChecked
                  ? "border-[#0098b0] bg-[#0098b0] text-white"
                  : "border-slate-300 bg-white"
                  }`}>
                  {isOtherChecked && <Check size={12} strokeWidth={3} />}
                </div>
                <span className="text-xs font-semibold">Lainnya</span>
                <input
                  type="checkbox"
                  className="hidden"
                  checked={isOtherChecked}
                  onChange={(e) => {
                    setIsOtherChecked(e.target.checked);
                    if (!e.target.checked) setOtherCategory("");
                  }}
                />
              </label>
            </div>
          )}
        </div>

        {/* Sliding input text field for "Lainnya" */}
        {isOtherChecked && (
          <div className="space-y-2 animate-fadeIn">
            <label htmlFor="feedback-other" className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Sebutkan Kategori Lain Yang Anda Sukai
            </label>
            <input
              type="text"
              id="feedback-other"
              placeholder="Masukkan kategori lain..."
              value={otherCategory}
              onChange={(e) => setOtherCategory(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#0098b0] focus:ring-2 focus:ring-[#0098b0]/10 transition-all font-medium"
              required={isOtherChecked}
            />
          </div>
        )}

        {/* reCAPTCHA v2 Display container */}
        <div className="flex justify-center md:justify-start pt-2">
          <div ref={recaptchaRef} id="recaptcha-widget-container"></div>
        </div>

        {/* Error Message */}
        {errorMsg && (
          <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs font-semibold leading-relaxed">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Action Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-[#103174] hover:bg-blue-900 disabled:opacity-50 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 cursor-pointer text-sm"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={16} />
              Mengirimkan...
            </>
          ) : (
            <>
              <Gift size={16} />
              Kirim Feedback
            </>
          )}
        </button>
      </form>
    </div>
  );
}
