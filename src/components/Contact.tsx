"use client";

import { contactTypes } from "@/lib/data";
import { FormEvent, useState } from "react";
import BackgroundTriangles from "./BackgroundTriangles";

export default function Contact() {
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

    if (!validateForm()) {
      return;
    }

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
    }
  };

  return (
    <section
      id="contact"
      className="section-wrapper bg-white relative overflow-hidden"
    >
      <BackgroundTriangles pattern="contact" />
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* 丸みを帯びた四角形で囲む */}
        <div className="section-card section-card-mint max-w-3xl mx-auto">
          {/* セクションタイトル */}
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            お問い合わせ
          </h2>

          {/* フォーム */}
          <form onSubmit={handleSubmit} className="space-y-6">
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
                <p className="text-red-600 text-sm mt-1">{errors.name}</p>
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
                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
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
                <p className="text-red-600 text-sm mt-1">{errors.message}</p>
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
                <span className="text-sm">
                  プライバシーポリシーに同意します{" "}
                  <span className="text-red-600">*</span>
                </span>
              </label>
              {errors.privacyAgreed && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.privacyAgreed}
                </p>
              )}
            </div>

            {/* 送信ボタン */}
            <div className="text-center pt-4">
              <button
                type="submit"
                className="btn-primary px-12 py-4 text-lg hover:opacity-90 transition-opacity"
              >
                送信する
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
