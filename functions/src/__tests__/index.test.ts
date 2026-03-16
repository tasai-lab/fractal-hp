jest.mock("@googleapis/gmail", () => {
  const mockSend = jest.fn().mockResolvedValue({ data: { id: "mock-id" } });
  return {
    gmail_v1: {
      Gmail: jest.fn().mockImplementation(() => ({
        users: { messages: { send: mockSend } },
      })),
    },
    auth: { JWT: jest.fn().mockImplementation(() => ({ mock: "jwt" })) },
  };
});

jest.mock("nodemailer", () => ({
  createTransport: jest.fn(),
}));

import * as nodemailer from "nodemailer";
import { gmail_v1 } from "@googleapis/gmail";
import { sendViaGmailApi } from "../gmail-utils";
import { Readable } from "stream";

const mockSend = (gmail_v1.Gmail as jest.Mock)().users.messages.send as jest.Mock;

function setupStreamMock(data: Buffer) {
  const mockStream = new Readable({
    read() {
      this.push(data);
      this.push(null);
    },
  });
  const mockSendMail = jest.fn().mockResolvedValue({ message: mockStream });
  (nodemailer.createTransport as jest.Mock).mockReturnValue({ sendMail: mockSendMail });
  mockSend.mockResolvedValue({ data: { id: "test-id" } });
  return { mockSendMail };
}

describe("sendViaGmailApi", () => {
  beforeEach(() => jest.clearAllMocks());

  it("streamTransportでMIME生成→base64url→Gmail API送信", async () => {
    const mimeBuffer = Buffer.from("From: test@example.com\r\nTo: to@example.com\r\n\r\nBody");
    const { mockSendMail } = setupStreamMock(mimeBuffer);
    const gmailClient = { users: { messages: { send: mockSend } } };

    const mailOptions = {
      from: "from@example.com",
      to: "to@example.com",
      subject: "テスト",
      html: "<p>テスト</p>",
      text: "テスト",
    };

    await sendViaGmailApi(gmailClient as any, mailOptions);

    expect(mockSendMail).toHaveBeenCalledWith(mailOptions);
    expect(mockSend).toHaveBeenCalledTimes(1);

    const callArg = mockSend.mock.calls[0][0];
    expect(callArg).toMatchObject({
      userId: "me",
      requestBody: { raw: expect.any(String) },
    });

    const raw: string = callArg.requestBody.raw;
    expect(raw).not.toMatch(/[+/]/);
    expect(raw).not.toMatch(/=$/);
  });

  it("base64urlのURLセーフ変換が正しく行われる", async () => {
    setupStreamMock(Buffer.alloc(3, 0xfb));
    const gmailClient = { users: { messages: { send: mockSend } } };

    await sendViaGmailApi(gmailClient as any, { from: "a@b.com", to: "c@d.com" });

    const raw: string = mockSend.mock.calls[0][0].requestBody.raw;
    expect(raw).not.toContain("+");
    expect(raw).not.toContain("/");
    expect(raw).not.toMatch(/=+$/);
  });
});

function isolateGmailUtils(envOverrides: Record<string, string | undefined> = {}) {
  const ORIGINAL_ENV = process.env;
  process.env = { ...ORIGINAL_ENV, ...envOverrides };

  const MockJWT = jest.fn().mockImplementation(() => ({ mock: "jwt" }));
  const MockGmail = jest.fn().mockImplementation(() => ({ mock: "gmail" }));
  jest.doMock("@googleapis/gmail", () => ({
    gmail_v1: { Gmail: MockGmail },
    auth: { JWT: MockJWT },
  }));
  jest.doMock("nodemailer", () => ({ createTransport: jest.fn() }));

  const { getGmailClient } = require("../gmail-utils");
  return { getGmailClient, MockJWT, MockGmail, restore: () => { process.env = ORIGINAL_ENV; } };
}

describe("getGmailClient", () => {
  beforeEach(() => jest.resetModules());

  it("GMAIL_SA_KEY_JSONが未設定のときエラーをthrowする", () => {
    jest.isolateModules(() => {
      const { getGmailClient, restore } = isolateGmailUtils({ GMAIL_SA_KEY_JSON: undefined });
      expect(() => getGmailClient()).toThrow("GMAIL_SA_KEY_JSON is not set");
      restore();
    });
  });

  it("GMAIL_FROMが未設定のときエラーをthrowする", () => {
    const fakeKey = { client_email: "test@project.iam.gserviceaccount.com", private_key: "fake" };
    jest.isolateModules(() => {
      const { getGmailClient, restore } = isolateGmailUtils({
        GMAIL_SA_KEY_JSON: JSON.stringify(fakeKey),
        GMAIL_FROM: undefined,
      });
      expect(() => getGmailClient()).toThrow("GMAIL_FROM is not set");
      restore();
    });
  });

  it("不正なJSONのときエラーをthrowする", () => {
    jest.isolateModules(() => {
      const { getGmailClient, restore } = isolateGmailUtils({
        GMAIL_SA_KEY_JSON: "invalid-json",
        GMAIL_FROM: "test@example.com",
      });
      expect(() => getGmailClient()).toThrow("GMAIL_SA_KEY_JSON is not valid JSON");
      restore();
    });
  });

  it("正常な設定でGmailクライアントを返す", () => {
    const fakeKey = {
      client_email: "test@project.iam.gserviceaccount.com",
      private_key: "-----BEGIN RSA PRIVATE KEY-----\nfake\n-----END RSA PRIVATE KEY-----",
    };
    jest.isolateModules(() => {
      const { getGmailClient, MockJWT, MockGmail, restore } = isolateGmailUtils({
        GMAIL_SA_KEY_JSON: JSON.stringify(fakeKey),
        GMAIL_FROM: "noreply@example.com",
      });
      const client = getGmailClient();

      expect(MockJWT).toHaveBeenCalledWith({
        email: fakeKey.client_email,
        key: fakeKey.private_key,
        scopes: ["https://www.googleapis.com/auth/gmail.send"],
        subject: "noreply@example.com",
      });
      expect(MockGmail).toHaveBeenCalled();
      expect(client).toEqual({ mock: "gmail" });
      restore();
    });
  });

  it("2回目以降はキャッシュされたクライアントを返す", () => {
    const fakeKey = { client_email: "test@project.iam.gserviceaccount.com", private_key: "fake" };
    jest.isolateModules(() => {
      const { getGmailClient, MockJWT, restore } = isolateGmailUtils({
        GMAIL_SA_KEY_JSON: JSON.stringify(fakeKey),
        GMAIL_FROM: "noreply@example.com",
      });

      const client1 = getGmailClient();
      const client2 = getGmailClient();

      expect(client1).toBe(client2);
      expect(MockJWT).toHaveBeenCalledTimes(1);
      restore();
    });
  });
});
