"use client";

import { contactTypes } from "@/lib/data";
import { FormEvent, useState } from "react";
import BackgroundTriangles from "./BackgroundTriangles";

export default function Contact({ initialContactType, embedded = false, hideTitle = false }: { initialContactType?: string, embedded?: boolean, hideTitle?: boolean }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactType: initialContactType || contactTypes[0],
    message: "",
    privacyAgreed: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
    privacyAgreed: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      message: "",
      privacyAgreed: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "氏名を入力してください";
    }

    if (!formData.email.trim()) {
      newErrors.email = "メールアドレスを入力してください";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "有効なメールアドレスを入力してください";
    }

    if (!formData.message.trim()) {
      newErrors.message = "お問い合わせメッセージを入力してください";
    }

    if (!formData.privacyAgreed) {
      newErrors.privacyAgreed = "プライバシーポリシーに同意してください";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm() || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("送信に失敗しました");
      }

      // 送信成功
      alert("お問い合わせを送信しました。");

      // フォームリセット
      setFormData({
        name: "",
        email: "",
        contactType: contactTypes[0],
        message: "",
        privacyAgreed: false,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("送信に失敗しました。もう一度お試しください。");
      setIsSubmitting(false);
    }
  };

  const content = (
    <div className={`section-card section-card-mint ${embedded ? "max-w-3xl mx-auto shadow-md" : ""}`}>
      {/* セクションタイトル */}
      {embedded && !hideTitle && (
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-primary">
          お問い合わせ
        </h2>
      )}

        {/* フォーム */}
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          {/* 氏名 */}
          <div>
            <label htmlFor="name" className="block font-medium mb-2">
              氏名 <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-3 bg-white border-2 border-[var(--color-accent-pink)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-pink)]"
              placeholder="山田 太郎"
            />
            {errors.name && (
              <p className="text-red-600 text-base mt-1">{errors.name}</p>
            )}
          </div>

          {/* メールアドレス */}
          <div>
            <label htmlFor="email" className="block font-medium mb-2">
              メールアドレス <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-3 bg-white border-2 border-[var(--color-accent-pink)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-pink)]"
              placeholder="example@example.com"
            />
            {errors.email && (
              <p className="text-red-600 text-base mt-1">{errors.email}</p>
            )}
          </div>

          {/* お問い合わせ内容 */}
          <div>
            <label htmlFor="contactType" className="block font-medium mb-2">
              お問い合わせ内容
            </label>
            <select
              id="contactType"
              value={formData.contactType}
              onChange={(e) =>
                setFormData({ ...formData, contactType: e.target.value })
              }
              className="w-full px-4 py-3 bg-white border-2 border-[var(--color-accent-pink)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-pink)]"
            >
              {contactTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* お問い合わせメッセージ */}
          <div>
            <label htmlFor="message" className="block font-medium mb-2">
              お問い合わせメッセージ <span className="text-red-600">*</span>
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              rows={6}
              className="w-full px-4 py-3 bg-white border-2 border-[var(--color-accent-pink)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-pink)] resize-none"
              placeholder="お問い合わせ内容をご記入ください"
            />
            {errors.message && (
              <p className="text-red-600 text-base mt-1">{errors.message}</p>
            )}
          </div>

          {/* プライバシーポリシー同意 */}
          <div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.privacyAgreed}
                onChange={(e) =>
                  setFormData({ ...formData, privacyAgreed: e.target.checked })
                }
                className="mt-1 w-5 h-5 border-2 border-[var(--color-accent-pink)] rounded focus:ring-2 focus:ring-[var(--color-accent-pink)]"
              />
              <span className="text-base">
                プライバシーポリシーに同意します{" "}
                <span className="text-red-600">*</span>
              </span>
            </label>
            {errors.privacyAgreed && (
              <p className="text-red-600 text-base mt-1">
                {errors.privacyAgreed}
              </p>
            )}
          </div>

          {/* 送信ボタン */}
          <div className="text-center pt-2 md:pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary px-8 md:px-12 py-3 md:py-4 text-base md:text-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "送信中..." : "送信する"}
            </button>
          </div>
        </form>
      </div>
  );

  if (embedded) {
    return content;
  }

  return (
    <section
      id="contact"
      className="section-wrapper bg-white relative overflow-hidden"
    >
      <BackgroundTriangles pattern="contact" />
      <div className="section-inner relative z-10">
        <div className="section-title-area">
          <h2 className="section-title">お問い合わせ</h2>
          <div className="section-title-line" />
        </div>
        <div className="section-content">
          {content}
        </div>
      </div>
    </section>
  );
}
