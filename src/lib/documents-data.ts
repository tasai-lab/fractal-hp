export type DocumentCategoryId = "bcp" | "contract";

export interface Document {
  id: string;
  title: string;
  description: string;
  category: DocumentCategoryId;
  filePath: string;
  fileSize: string;
  /** フォーマット: "YYYY年M月" */
  updatedAt: string;
}

export interface DocumentCategory {
  id: DocumentCategoryId;
  title: string;
  description: string;
}

export const documentCategories: DocumentCategory[] = [
  {
    id: "bcp",
    title: "事業継続計画（BCP）",
    description:
      "感染症や災害発生時においても、必要なサービスを継続的に提供するための計画です。",
  },
  {
    id: "contract",
    title: "契約書・重要事項説明書",
    description:
      "訪問看護サービスのご利用にあたっての契約内容および重要事項をまとめた書類です。",
  },
];

export const documents: Document[] = [
  {
    id: "bcp-infection",
    title: "感染症発生時における業務継続計画（BCP）",
    description:
      "新型コロナウイルス等の感染症発生時に、訪問看護サービスを継続するための計画です。",
    category: "bcp",
    filePath: "/documents/bcp-infection.pdf",
    fileSize: "449KB",
    updatedAt: "2025年2月",
  },
  {
    id: "bcp-disaster",
    title: "自然災害発生時における業務継続計画（BCP）",
    description:
      "地震・台風等の自然災害発生時に、訪問看護サービスを継続するための計画です。",
    category: "bcp",
    filePath: "/documents/bcp-disaster.pdf",
    fileSize: "463KB",
    updatedAt: "2025年2月",
  },
  {
    id: "contract-visiting-nursing",
    title: "訪問看護サービス契約書",
    description: "訪問看護サービスのご利用に関する契約書です。",
    category: "contract",
    filePath: "/documents/contract-visiting-nursing.pdf",
    fileSize: "235KB",
    updatedAt: "2025年2月",
  },
  {
    id: "contract-regular-patrol",
    title: "定期巡回・随時対応型訪問看護 契約書兼重要事項説明書",
    description:
      "定期巡回・随時対応型訪問看護サービスの契約内容および重要事項説明書です。",
    category: "contract",
    filePath: "/documents/contract-regular-patrol.pdf",
    fileSize: "234KB",
    updatedAt: "2025年2月",
  },
];
