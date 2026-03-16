import * as nodemailer from "nodemailer";
import { gmail_v1, auth } from "@googleapis/gmail";

// グローバルキャッシュ（コールドスタート対策）
let cachedGmailClient: gmail_v1.Gmail | null = null;

export function getGmailClient(): gmail_v1.Gmail {
  if (cachedGmailClient) return cachedGmailClient;

  const saKeyJson = process.env.GMAIL_SA_KEY_JSON;
  if (!saKeyJson) throw new Error("GMAIL_SA_KEY_JSON is not set");

  const gmailFrom = process.env.GMAIL_FROM;
  if (!gmailFrom) throw new Error("GMAIL_FROM is not set");

  let saKey: { client_email: string; private_key: string };
  try {
    saKey = JSON.parse(saKeyJson);
  } catch (e) {
    throw new Error("GMAIL_SA_KEY_JSON is not valid JSON: " + (e as Error).message);
  }

  const jwtClient = new auth.JWT({
    email: saKey.client_email,
    key: saKey.private_key,
    scopes: ["https://www.googleapis.com/auth/gmail.send"],
    subject: gmailFrom,
  });

  cachedGmailClient = new gmail_v1.Gmail({ auth: jwtClient });
  return cachedGmailClient;
}

// streamTransporter: 遅延初期化でキャッシュ（テストでモック可能にするため）
let cachedStreamTransporter: nodemailer.Transporter | null = null;
function getStreamTransporter(): nodemailer.Transporter {
  if (!cachedStreamTransporter) {
    cachedStreamTransporter = nodemailer.createTransport({ streamTransport: true, newline: "unix" });
  }
  return cachedStreamTransporter;
}

export async function sendViaGmailApi(
  gmailClient: gmail_v1.Gmail,
  mailOptions: {
    from?: string;
    to?: string;
    subject?: string;
    html?: string;
    text?: string;
  }
): Promise<void> {
  const info = await getStreamTransporter().sendMail(mailOptions);

  const chunks: Buffer[] = [];
  for await (const chunk of info.message as NodeJS.ReadableStream) {
    chunks.push(Buffer.from(chunk as Buffer | string));
  }

  const raw = Buffer.concat(chunks)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");

  await gmailClient.users.messages.send({
    userId: "me",
    requestBody: { raw },
  });
}
