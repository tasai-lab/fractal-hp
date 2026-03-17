"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { applicationMessage } from "@/lib/recruit-data";

type ContactForm = {
  name: string;
  email: string;
  message: string;
  privacyAgreed: boolean;
};

type ContactErrors = {
  name: string;
  email: string;
  message: string;
  privacyAgreed: string;
};

const initialForm: ContactForm = {
  name: "",
  email: "",
  message: "",
  privacyAgreed: false,
};

const initialErrors: ContactErrors = {
  name: "",
  email: "",
  message: "",
  privacyAgreed: "",
};

type Props = {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  hideButton?: boolean;
};

export default function RecruitContact({ isOpen: controlledIsOpen, onOpenChange, hideButton }: Props) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen ?? internalIsOpen;
  const setIsOpen = (open: boolean) => {
    setInternalIsOpen(open);
    onOpenChange?.(open);
  };

  const [form, setForm] = useState<ContactForm>(initialForm);
  const [errors, setErrors] = useState<ContactErrors>(initialErrors);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const validate = (): boolean => {
    const newErrors: ContactErrors = { name: "", email: "", message: "", privacyAgreed: "" };
    if (!form.name.trim()) newErrors.name = "氏名を入力してください";
    if (!form.email.trim()) {
      newErrors.email = "メールアドレスを入力してください";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "有効なメールアドレスを入力してください";
    }
    if (!form.message.trim()) newErrors.message = "メッセージを入力してください";
    if (!form.privacyAgreed) newErrors.privacyAgreed = "プライバシーポリシーに同意してください";
    setErrors(newErrors);
    return !Object.values(newErrors).some((e) => e);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || isSubmitting) return;
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, contactType: "求人・採用について" }),
      });
      if (!response.ok) throw new Error("送信に失敗しました");
      alert("お問い合わせを送信しました。");
      setForm(initialForm);
      setIsOpen(false);
    } catch {
      alert("送信に失敗しました。もう一度お試しください。");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {!hideButton && (
        <div id="contact" className="fixed bottom-6 right-4 lg:right-8 z-40">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="px-6 py-3 rounded-full bg-[var(--color-olive)] text-white font-semibold shadow-lg hover:opacity-90 transition"
          >
            応募する
          </button>
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[var(--color-paper)] rounded-3xl shadow-xl border border-white"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative px-6 py-8 md:px-8 md:py-10">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center"
                aria-label="閉じる"
              >
                <span className="text-lg text-ink-soft">×</span>
              </button>
              <div className="space-y-6">
                <div>
                  <p className="text-xs tracking-[0.3em] text-ink-soft">CONTACT</p>
                  <h3 className="heading-mincho text-2xl md:text-4xl text-[var(--color-olive)] mt-3">
                    応募・お問い合わせ
                  </h3>
                </div>
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-white">
                  <Image
                    src="/images/recruit/labels/contact-photo.webp"
                    alt="募集お問い合わせ"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
                <div className="text-ink-soft">
                  <p className="leading-relaxed">{applicationMessage.main}</p>
                  <p className="text-sm mt-2">{applicationMessage.visit}</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="recruit-contact-name" className="block text-sm font-medium text-[var(--color-olive)] mb-1">
                      氏名 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="recruit-contact-name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-[var(--color-sand)] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-olive)]/30"
                      placeholder="山田 太郎"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="recruit-contact-email" className="block text-sm font-medium text-[var(--color-olive)] mb-1">
                      メールアドレス <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="recruit-contact-email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-[var(--color-sand)] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-olive)]/30"
                      placeholder="example@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="recruit-contact-message" className="block text-sm font-medium text-[var(--color-olive)] mb-1">
                      メッセージ <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="recruit-contact-message"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 bg-white border border-[var(--color-sand)] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-olive)]/30 resize-none"
                      placeholder="ご質問やご希望をお聞かせください"
                    />
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                  </div>
                  <div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.privacyAgreed}
                        onChange={(e) => setForm({ ...form, privacyAgreed: e.target.checked })}
                        className="mt-1 w-5 h-5 rounded border-[var(--color-sand)] text-[var(--color-olive)] focus:ring-[var(--color-olive)]/30"
                      />
                      <span className="text-sm text-ink-soft">
                        プライバシーポリシーに同意します <span className="text-red-500">*</span>
                      </span>
                    </label>
                    {errors.privacyAgreed && <p className="text-red-500 text-sm mt-1">{errors.privacyAgreed}</p>}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-full bg-[var(--color-olive)] text-white font-semibold hover:opacity-90 transition disabled:opacity-50"
                  >
                    {isSubmitting ? "送信中..." : "送信する"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
