import { NextRequest, NextResponse } from "next/server";

// お問い合わせフォームのデータ型
interface ContactFormData {
  name: string;
  email: string;
  type: string;
  message: string;
}

// バリデーション
function validateFormData(data: ContactFormData): string | null {
  if (!data.name || data.name.trim().length === 0) {
    return "氏名は必須です";
  }
  if (!data.email || data.email.trim().length === 0) {
    return "メールアドレスは必須です";
  }
  // 簡易的なメールアドレス検証
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return "有効なメールアドレスを入力してください";
  }
  if (!data.message || data.message.trim().length === 0) {
    return "お問い合わせメッセージは必須です";
  }
  if (data.message.length > 5000) {
    return "メッセージは5000文字以内で入力してください";
  }
  return null;
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json();

    // バリデーション
    const validationError = validateFormData(data);
    if (validationError) {
      return NextResponse.json(
        { success: false, error: validationError },
        { status: 400 }
      );
    }

    // TODO: メール送信機能を実装
    // 以下は本番環境でNodemailerやSendGridを使用してメール送信を実装
    // 現在は受信確認のログ出力のみ

    console.log("=== お問い合わせ受信 ===");
    console.log("氏名:", data.name);
    console.log("メール:", data.email);
    console.log("種別:", data.type);
    console.log("メッセージ:", data.message);
    console.log("受信日時:", new Date().toISOString());
    console.log("========================");

    // 成功レスポンス
    return NextResponse.json({
      success: true,
      message: "お問い合わせを受け付けました。担当者より折り返しご連絡いたします。",
    });
  } catch (error) {
    console.error("お問い合わせ処理エラー:", error);
    return NextResponse.json(
      {
        success: false,
        error: "送信中にエラーが発生しました。しばらく経ってから再度お試しください。",
      },
      { status: 500 }
    );
  }
}

// GETリクエストは許可しない
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}
