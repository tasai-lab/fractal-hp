"use client";

import { contactTypes } from "@/lib/data";
import { FormEvent, useState } from "react";

type AreaContactProps = {
  areaName: string;
  themeColor: string;
};

export default function AreaContact({ areaName, themeColor }: AreaContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactType: contactTypes[0],
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
  const [isSubmitted, setIsSubmitted] = useState(false);

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          message: `【${areaName}エリアページからのお問い合わせ】\n${formData.message}`,
        }),
      });

      if (!response.ok) {
        throw new Error("送信に失敗しました");
      }

      setIsSubmitted(true);
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

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: `${themeColor}15` }}
        >
          <svg className="w-8 h-8" style={{ color: themeColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-lg font-bold mb-2" style={{ color: themeColor }}>
          お問い合わせを送信しました
        </p>
        <p className="text-gray-500 text-sm">
          担当者より折り返しご連絡いたします。
        </p>
      </div>
    );
  }

  const inputClass = "w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 transition-shadow";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="area-name" className="block text-sm font-medium text-gray-700 mb-1.5">
          氏名 <span className="text-red-500 text-xs">必須</span>
        </label>
        <input
          type="text"
          id="area-name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={inputClass}
          style={{ "--tw-ring-color": `${themeColor}40` } as React.CSSProperties}
          placeholder="山田 太郎"
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="area-email" className="block text-sm font-medium text-gray-700 mb-1.5">
          メールアドレス <span className="text-red-500 text-xs">必須</span>
        </label>
        <input
          type="email"
          id="area-email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={inputClass}
          style={{ "--tw-ring-color": `${themeColor}40` } as React.CSSProperties}
          placeholder="example@example.com"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="area-contactType" className="block text-sm font-medium text-gray-700 mb-1.5">
          お問い合わせ内容
        </label>
        <select
          id="area-contactType"
          value={formData.contactType}
          onChange={(e) => setFormData({ ...formData, contactType: e.target.value })}
          className={inputClass}
          style={{ "--tw-ring-color": `${themeColor}40` } as React.CSSProperties}
        >
          {contactTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="area-message" className="block text-sm font-medium text-gray-700 mb-1.5">
          メッセージ <span className="text-red-500 text-xs">必須</span>
        </label>
        <textarea
          id="area-message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={5}
          className={`${inputClass} resize-none`}
          style={{ "--tw-ring-color": `${themeColor}40` } as React.CSSProperties}
          placeholder="お問い合わせ内容をご記入ください"
        />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
      </div>

      <div>
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.privacyAgreed}
            onChange={(e) => setFormData({ ...formData, privacyAgreed: e.target.checked })}
            className="mt-0.5 w-4 h-4 rounded border-gray-300"
            style={{ accentColor: themeColor }}
          />
          <span className="text-sm text-gray-600">
            プライバシーポリシーに同意します <span className="text-red-500 text-xs">必須</span>
          </span>
        </label>
        {errors.privacyAgreed && <p className="text-red-500 text-xs mt-1">{errors.privacyAgreed}</p>}
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 text-white font-bold rounded-full transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: themeColor }}
        >
          {isSubmitting ? "送信中..." : "無料相談を申し込む"}
        </button>
      </div>
    </form>
  );
}
