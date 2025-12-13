import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactFormData {
  name: string;
  email: string;
  contactType: string;
  message: string;
  privacyAgreed: boolean;
}

// レート制限用のシンプルなインメモリストア
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 5; // 1時間あたりの最大リクエスト数
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1時間（ミリ秒）

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}

// 入力のサニタイズ
function sanitizeInput(input: string): string {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// バリデーション
function validateFormData(data: ContactFormData): string | null {
  if (!data.name || typeof data.name !== "string" || data.name.trim().length === 0) {
    return "氏名は必須です";
  }
  if (data.name.length > 100) {
    return "氏名は100文字以内で入力してください";
  }

  if (!data.email || typeof data.email !== "string") {
    return "メールアドレスは必須です";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return "有効なメールアドレスを入力してください";
  }
  if (data.email.length > 254) {
    return "メールアドレスが長すぎます";
  }

  if (!data.message || typeof data.message !== "string" || data.message.trim().length === 0) {
    return "メッセージは必須です";
  }
  if (data.message.length > 5000) {
    return "メッセージは5000文字以内で入力してください";
  }

  if (data.privacyAgreed !== true) {
    return "プライバシーポリシーへの同意が必要です";
  }

  return null;
}

export async function POST(request: NextRequest) {
  try {
    // IPアドレスの取得（レート制限用）
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";

    // レート制限チェック
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "リクエストが多すぎます。しばらく経ってからお試しください。" },
        { status: 429 }
      );
    }

    // リクエストボディの解析
    const body: ContactFormData = await request.json();

    // バリデーション
    const validationError = validateFormData(body);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    // 入力のサニタイズ
    const sanitizedData = {
      name: sanitizeInput(body.name.trim()),
      email: body.email.trim().toLowerCase(),
      contactType: sanitizeInput(body.contactType || "その他"),
      message: sanitizeInput(body.message.trim()),
    };

    // メール送信設定
    // 環境変数から設定を取得
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // 管理者宛メール
    const adminMailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      subject: `【お問い合わせ】${sanitizedData.contactType} - ${sanitizedData.name}様`,
      html: `
        <h2>ウェブサイトからのお問い合わせ</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr>
            <th style="border: 1px solid #ddd; padding: 12px; text-align: left; background-color: #f5f5f5; width: 30%;">氏名</th>
            <td style="border: 1px solid #ddd; padding: 12px;">${sanitizedData.name}</td>
          </tr>
          <tr>
            <th style="border: 1px solid #ddd; padding: 12px; text-align: left; background-color: #f5f5f5;">メールアドレス</th>
            <td style="border: 1px solid #ddd; padding: 12px;"><a href="mailto:${sanitizedData.email}">${sanitizedData.email}</a></td>
          </tr>
          <tr>
            <th style="border: 1px solid #ddd; padding: 12px; text-align: left; background-color: #f5f5f5;">お問い合わせ内容</th>
            <td style="border: 1px solid #ddd; padding: 12px;">${sanitizedData.contactType}</td>
          </tr>
          <tr>
            <th style="border: 1px solid #ddd; padding: 12px; text-align: left; background-color: #f5f5f5;">メッセージ</th>
            <td style="border: 1px solid #ddd; padding: 12px; white-space: pre-wrap;">${sanitizedData.message}</td>
          </tr>
        </table>
      `,
      text: `
ウェブサイトからのお問い合わせ

氏名: ${sanitizedData.name}
メールアドレス: ${sanitizedData.email}
お問い合わせ内容: ${sanitizedData.contactType}
メッセージ:
${sanitizedData.message}
      `.trim(),
    };

    // お客様への自動返信メール
    const customerMailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: sanitizedData.email,
      subject: "【フラクタル訪問看護ステーション】お問い合わせありがとうございます",
      html: `
        <p>${sanitizedData.name} 様</p>
        <p>この度はお問い合わせいただき、誠にありがとうございます。</p>
        <p>以下の内容でお問い合わせを承りました。<br>
        担当者より折り返しご連絡させていただきますので、今しばらくお待ちください。</p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <h3>お問い合わせ内容</h3>
        <p><strong>お問い合わせ種別:</strong> ${sanitizedData.contactType}</p>
        <p><strong>メッセージ:</strong></p>
        <p style="white-space: pre-wrap; background-color: #f9f9f9; padding: 15px; border-radius: 5px;">${sanitizedData.message}</p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="font-size: 12px; color: #666;">
          ※このメールは自動送信されています。<br>
          ※このメールに心当たりがない場合は、お手数ですが削除してください。
        </p>
        <p style="margin-top: 20px;">
          フラクタル訪問看護 船橋<br>
          〒274-0072 千葉県船橋市三山6丁目22-2 パレドール小川201<br>
          TEL: 047-770-1228
        </p>
      `,
      text: `
${sanitizedData.name} 様

この度はお問い合わせいただき、誠にありがとうございます。

以下の内容でお問い合わせを承りました。
担当者より折り返しご連絡させていただきますので、今しばらくお待ちください。

---

お問い合わせ種別: ${sanitizedData.contactType}

メッセージ:
${sanitizedData.message}

---

※このメールは自動送信されています。
※このメールに心当たりがない場合は、お手数ですが削除してください。

フラクタル訪問看護 船橋
〒274-0072 千葉県船橋市三山6丁目22-2 パレドール小川201
TEL: 047-770-1228
      `.trim(),
    };

    // メール送信実行
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(customerMailOptions),
    ]);

    return NextResponse.json(
      { message: "お問い合わせを送信しました" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "送信に失敗しました。しばらく経ってからお試しください。" },
      { status: 500 }
    );
  }
}
