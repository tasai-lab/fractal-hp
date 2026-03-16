import { validateFormData, sanitizeInput, checkRateLimit, clearRateLimitStore, contact } from "../index";
import type { Request, Response } from "@google-cloud/functions-framework";

const mockSend = jest.fn();
jest.mock("resend", () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: { send: mockSend },
  })),
}));

describe("validateFormData", () => {
  const validData = {
    name: "山田 太郎",
    email: "test@example.com",
    contactType: "サービスについて",
    message: "テストメッセージです",
    privacyAgreed: true,
  };

  it("有効なデータでnullを返す", () => {
    expect(validateFormData(validData)).toBeNull();
  });

  it("氏名が空の場合エラー", () => {
    expect(validateFormData({ ...validData, name: "" })).toBe("氏名は必須です");
  });

  it("氏名が100文字超の場合エラー", () => {
    expect(validateFormData({ ...validData, name: "あ".repeat(101) })).toBe("氏名は100文字以内で入力してください");
  });

  it("メールが空の場合エラー", () => {
    expect(validateFormData({ ...validData, email: "" })).toBe("メールアドレスは必須です");
  });

  it("メールが不正形式の場合エラー", () => {
    expect(validateFormData({ ...validData, email: "invalid" })).toBe("有効なメールアドレスを入力してください");
  });

  it("メールが254文字超の場合エラー", () => {
    const longEmail = "a".repeat(246) + "@test.com";
    expect(validateFormData({ ...validData, email: longEmail })).toBe("メールアドレスが長すぎます");
  });

  it("メッセージが空の場合エラー", () => {
    expect(validateFormData({ ...validData, message: "" })).toBe("メッセージは必須です");
  });

  it("メッセージが5000文字超の場合エラー", () => {
    expect(validateFormData({ ...validData, message: "あ".repeat(5001) })).toBe("メッセージは5000文字以内で入力してください");
  });

  it("プライバシーポリシー未同意の場合エラー", () => {
    expect(validateFormData({ ...validData, privacyAgreed: false })).toBe("プライバシーポリシーへの同意が必要です");
  });
});

describe("sanitizeInput", () => {
  it("HTMLタグをエスケープする", () => {
    expect(sanitizeInput('<script>alert("xss")</script>')).toBe(
      "&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;"
    );
  });

  it("シングルクォートをエスケープする", () => {
    expect(sanitizeInput("it's")).toBe("it&#39;s");
  });

  it("通常テキストはそのまま返す", () => {
    expect(sanitizeInput("こんにちは")).toBe("こんにちは");
  });
});

function createMockReq(overrides: Partial<Request> = {}): Request {
  return {
    method: "POST",
    headers: { "x-forwarded-for": "127.0.0.1" },
    body: {
      name: "山田 太郎",
      email: "test@example.com",
      contactType: "サービスについて",
      message: "テストメッセージです",
      privacyAgreed: true,
    },
    ...overrides,
  } as unknown as Request;
}

function createMockRes(): Response & { _status: number; _json: unknown } {
  const res = {
    _status: 0,
    _json: null as unknown,
    set: jest.fn().mockReturnThis(),
    status: jest.fn().mockImplementation(function (this: typeof res, code: number) {
      this._status = code;
      return this;
    }),
    json: jest.fn().mockImplementation(function (this: typeof res, data: unknown) {
      this._json = data;
    }),
    send: jest.fn(),
  };
  return res as unknown as Response & { _status: number; _json: unknown };
}

describe("contact handler", () => {
  beforeEach(() => {
    clearRateLimitStore();
    mockSend.mockReset();
    process.env.RESEND_API_KEY = "re_test_key";
    process.env.CONTACT_EMAIL = "admin@test.com";
    process.env.MAIL_FROM = "Test <noreply@test.com>";
  });

  it("正常送信時に200を返す", async () => {
    mockSend.mockResolvedValue({ data: { id: "msg_123" }, error: null });
    const req = createMockReq();
    const res = createMockRes();
    await contact(req, res);
    expect(res._status).toBe(200);
    expect(mockSend).toHaveBeenCalledTimes(2);
  });

  it("Resend APIエラー時に500を返す", async () => {
    mockSend.mockResolvedValue({ data: null, error: { message: "API key invalid", statusCode: 403 } });
    const req = createMockReq();
    const res = createMockRes();
    await contact(req, res);
    expect(res._status).toBe(500);
  });

  it("GETリクエストに405を返す", async () => {
    const req = createMockReq({ method: "GET" });
    const res = createMockRes();
    await contact(req, res);
    expect(res._status).toBe(405);
  });

  it("バリデーションエラー時に400を返す", async () => {
    const req = createMockReq({ body: { name: "", email: "", message: "", privacyAgreed: false } });
    const res = createMockRes();
    await contact(req, res);
    expect(res._status).toBe(400);
  });
});

describe("checkRateLimit", () => {
  beforeEach(() => {
    clearRateLimitStore();
  });

  it("初回リクエストを許可する", () => {
    expect(checkRateLimit("192.168.1.1")).toBe(true);
  });

  it("5回目まで許可し、6回目で拒否する", () => {
    for (let i = 0; i < 5; i++) {
      expect(checkRateLimit("192.168.1.2")).toBe(true);
    }
    expect(checkRateLimit("192.168.1.2")).toBe(false);
  });

  it("異なるIPは独立してカウントする", () => {
    for (let i = 0; i < 5; i++) {
      checkRateLimit("10.0.0.1");
    }
    expect(checkRateLimit("10.0.0.2")).toBe(true);
  });
});
