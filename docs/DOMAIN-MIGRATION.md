# ドメイン移行手順書

Studio（ノーコード）からFirebase Hostingへのドメイン移行手順です。
エックスサーバードメインを使用している場合の設定方法を解説します。

---

## 目次

1. [概要](#1-概要)
2. [事前準備](#2-事前準備)
3. [Firebase Console でのカスタムドメイン追加](#3-firebase-console-でのカスタムドメイン追加)
4. [エックスサーバードメインでのDNS設定](#4-エックスサーバードメインでのdns設定)
5. [SSL証明書の発行と確認](#5-ssl証明書の発行と確認)
6. [移行後の確認](#6-移行後の確認)
7. [トラブルシューティング](#7-トラブルシューティング)
8. [参考リンク](#8-参考リンク)

---

## 1. 概要

### 移行の流れ

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Studio         │     │  DNS設定変更    │     │  Firebase       │
│  (現在の公開先)  │ ──▶ │  (Xサーバー)    │ ──▶ │  Hosting        │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### 所要時間

| 作業項目 | 所要時間 |
|---------|---------|
| Firebase Console設定 | 5〜10分 |
| DNS設定変更 | 10〜15分 |
| DNS反映待ち | 数時間〜最大24時間 |
| SSL証明書発行 | 数時間〜最大24時間 |

### 注意事項

- DNS設定変更中は一時的にサイトにアクセスできなくなる可能性があります
- 移行作業は**アクセスの少ない時間帯**（深夜・早朝）に行うことを推奨
- 事前にFirebaseへのデプロイが完了していることを確認してください

---

## 2. 事前準備

### 2.1 Firebase Hostingへのデプロイ確認

移行前に、Firebaseのデフォルトドメインでサイトが正常に動作することを確認します。

```bash
# ビルドとデプロイ
npm run build
firebase deploy --only hosting
```

デプロイ後、以下のURLでサイトが表示されることを確認：
- `https://fractal-hokan.web.app`
- `https://fractal-hokan.firebaseapp.com`

### 2.2 必要な情報の準備

| 項目 | 値 |
|-----|---|
| 移行するドメイン | `fractal-hokan.com` |
| Firebaseプロジェクト | `fractal-hokan` |
| エックスサーバーアカウント | ログイン情報を確認 |

### 2.3 現在のDNS設定のバックアップ

移行前に現在のDNS設定をスクリーンショットで保存しておくことを推奨します。

---

## 3. Firebase Console でのカスタムドメイン追加

### 3.1 Firebase Consoleにアクセス

1. [Firebase Console](https://console.firebase.google.com/) にログイン
2. プロジェクト `fractal-hokan` を選択
3. 左メニューから **「Hosting」** をクリック

### 3.2 カスタムドメインの追加

1. **「カスタムドメインを追加」** ボタンをクリック
2. ドメイン名を入力：`fractal-hokan.com`
3. **「続行」** をクリック

### 3.3 TXTレコード情報の取得

Firebase Consoleに以下の情報が表示されます：

| 項目 | 値（例） |
|-----|---------|
| タイプ | TXT |
| ホスト | `@` または `fractal-hokan.com` |
| 値 | `firebase=xxxxxxxxxxxxxxxxxx`（一意の値） |

**この値をコピーしておいてください。**

### 3.4 wwwサブドメインの追加（重要）

`www.fractal-hokan.com` も追加します。これを忘れると「Site Not Found」エラーが発生する場合があります。

1. 再度 **「カスタムドメインを追加」** をクリック
2. `www.fractal-hokan.com` を入力
3. **「続行」** をクリック

---

## 4. エックスサーバードメインでのDNS設定

### 4.1 管理画面へのアクセス

#### XServerドメイン契約管理ページの場合

1. [XServerドメイン管理ページ](https://secure.xserver.ne.jp/xapanel/login/xdomain/) にアクセス
2. メールアドレス（またはXServerアカウントID）とパスワードでログイン
3. 対象ドメインの **「DNSレコード設定」** をクリック

#### エックスサーバー（レンタルサーバー）の場合

1. [サーバーパネル](https://secure.xserver.ne.jp/xapanel/login/xserver/server/) にログイン
2. **「ドメイン」** セクションから **「DNSレコード設定」** をクリック
3. 対象ドメインを選択

### 4.2 既存レコードの確認と削除

**重要**: Firebase Hostingを使用するには、以下のレコードを削除または変更する必要があります。

削除が必要なレコード：
- 既存のAレコード（Studioや他サービスを指しているもの）
- 既存のAAAAレコード（IPv6レコード）
- Studio用のCNAMEレコード

### 4.3 TXTレコードの追加（所有権確認用）

1. **「DNSレコード追加」** タブをクリック
2. 以下を入力：

| 項目 | 入力値 |
|-----|-------|
| ホスト名 | `（空欄）` または `@` |
| 種別 | `TXT` |
| 内容 | Firebase Consoleで表示された値 |
| 優先度 | （入力不要） |

3. **「確認画面へ進む」** → **「追加する」** をクリック

### 4.4 Aレコードの追加

Firebase Consoleで表示された2つのIPアドレスを追加します。

**1つ目のAレコード：**

| 項目 | 入力値 |
|-----|-------|
| ホスト名 | `（空欄）` または `@` |
| 種別 | `A` |
| 内容 | `151.101.1.195`（Firebase提供のIP） |

**2つ目のAレコード：**

| 項目 | 入力値 |
|-----|-------|
| ホスト名 | `（空欄）` または `@` |
| 種別 | `A` |
| 内容 | `151.101.65.195`（Firebase提供のIP） |

> **注意**: 上記IPアドレスは例です。Firebase Consoleで表示された実際の値を使用してください。

### 4.5 wwwサブドメインの設定

wwwサブドメイン用にCNAMEレコードを追加：

| 項目 | 入力値 |
|-----|-------|
| ホスト名 | `www` |
| 種別 | `CNAME` |
| 内容 | `fractal-hokan.com` |

または、Aレコードで設定：

| 項目 | 入力値 |
|-----|-------|
| ホスト名 | `www` |
| 種別 | `A` |
| 内容 | `151.101.1.195`（Firebase提供のIP） |

### 4.6 設定後のDNSレコード一覧（例）

| ホスト名 | 種別 | 内容 |
|---------|------|------|
| @ | A | 151.101.1.195 |
| @ | A | 151.101.65.195 |
| @ | TXT | firebase=xxxxxxxxxxxxxxxxxx |
| www | CNAME | fractal-hokan.com |

---

## 5. SSL証明書の発行と確認

### 5.1 Firebase Console での検証

1. エックスサーバーでDNS設定を保存後、Firebase Consoleに戻る
2. **「検証」** ボタンをクリック
3. TXTレコードが正しく設定されていれば検証が完了

### 5.2 ステータスの確認

Firebase Console の Hosting ページでドメインのステータスを確認：

| ステータス | 説明 |
|-----------|------|
| 保留中（Pending） | DNS設定の反映待ち |
| 接続済み（Connected） | 正常に接続完了 |
| 証明書プロビジョニング中 | SSL証明書発行中 |

### 5.3 SSL証明書発行の待機

- SSL証明書の発行には**数時間〜最大24時間**かかる場合があります
- 発行中は「証明書が無効」という警告が表示されることがありますが、正常なプロセスです
- Firebase Hosting は自動でSSL証明書を発行・更新します

---

## 6. 移行後の確認

### 6.1 サイト表示の確認

以下のURLでサイトが正常に表示されることを確認：

- `https://fractal-hokan.com`
- `https://www.fractal-hokan.com`

### 6.2 HTTPS接続の確認

- ブラウザのアドレスバーに鍵マークが表示されること
- `http://` でアクセスした場合、`https://` にリダイレクトされること

### 6.3 各ページの動作確認

- [ ] トップページ
- [ ] 採用情報ページ（`/recruit`）
- [ ] フラクタルを知るページ（`/about-fractal`）
- [ ] お問い合わせフォーム
- [ ] 外部リンク（Instagram等）

### 6.4 DNS伝播の確認ツール

[Google Admin Toolbox Dig](https://toolbox.googleapps.com/apps/dig/) を使用してDNS設定を確認できます。

```
ドメイン: fractal-hokan.com
レコードタイプ: A
```

---

## 7. トラブルシューティング

### 7.1 「Site Not Found」エラー

**原因**: ドメイン設定が不完全

**解決策**:
- `fractal-hokan.com` と `www.fractal-hokan.com` の両方がFirebaseに追加されているか確認
- AレコードのIPアドレスが正しいか確認
- DNS反映に時間がかかっている可能性があるため、数時間待って再確認

### 7.2 検証エラー（TXTレコード）

**原因**: TXTレコードが正しく設定されていない、または反映されていない

**解決策**:
- エックスサーバーでTXTレコードの内容を再確認
- DNS反映に最大24時間かかる場合があるため、時間をおいて再試行

### 7.3 SSL証明書エラー

**原因**: SSL証明書がまだ発行されていない

**解決策**:
- DNS設定後、最大24時間待つ
- 既存のAAAAレコードやCAAレコードが残っていないか確認
- 他サービス（Studio）へのレコードが残っていないか確認

### 7.4 メールが届かなくなった

**原因**: MXレコードを誤って削除した

**解決策**:
- MXレコードは変更しないでください
- 誤って削除した場合は、元の値に戻す

---

## 8. 参考リンク

### Firebase

- [Firebase Hosting カスタムドメイン設定（公式）](https://firebase.google.com/docs/hosting/custom-domain)
- [Firebase App Hosting カスタムドメイン設定](https://firebase.google.com/docs/app-hosting/custom-domain)

### エックスサーバー

- [エックスサーバー DNSレコード編集（公式）](https://www.xserver.ne.jp/manual/man_domain_dns_setting.php)
- [XServerドメイン DNSレコード設定](https://www.xdomain.ne.jp/manual/man_domain_dns_setting.php)
- [XServerドメイン契約管理ページ](https://www.xdomain.ne.jp/manual/man_tool_xdomain.php)

### ツール

- [Google Admin Toolbox Dig](https://toolbox.googleapps.com/apps/dig/) - DNS設定確認ツール
- [DNS Checker](https://dnschecker.org/) - DNS伝播確認ツール

### 関連記事

- [Firebase Hosting カスタムドメイン設定手順（Zenn）](https://zenn.dev/tarotarotaros/articles/2025-10-27_1)
- [Xserver × Firebase 連携（Qiita）](https://qiita.com/Ryota-Nakamura-317/items/682394ce1858a0f1cbd1)
- [Firebase Hostingに独自ドメインを設定する](https://lpeg.info/webworks/firebase/firebase_domain.html)

---

## 移行チェックリスト

### 移行前

- [ ] Firebaseへのデプロイが完了している
- [ ] デフォルトドメイン（`.web.app`）でサイトが表示される
- [ ] 現在のDNS設定をバックアップした
- [ ] 移行作業の時間帯を決定した

### Firebase Console

- [ ] カスタムドメインを追加した（`fractal-hokan.com`）
- [ ] wwwサブドメインも追加した（`www.fractal-hokan.com`）
- [ ] TXTレコードの値を取得した
- [ ] AレコードのIPアドレスを取得した

### エックスサーバードメイン

- [ ] 既存のAレコード（Studio用）を削除した
- [ ] 既存のAAAAレコードを削除した
- [ ] TXTレコードを追加した
- [ ] Aレコード（2つ）を追加した
- [ ] wwwサブドメインの設定を追加した

### 移行後

- [ ] Firebase Consoleで検証が完了した
- [ ] ドメインステータスが「接続済み」になった
- [ ] SSL証明書が発行された
- [ ] `https://fractal-hokan.com` でサイトが表示される
- [ ] `https://www.fractal-hokan.com` でサイトが表示される
- [ ] お問い合わせフォームが動作する

---

## 更新履歴

| 日付 | 内容 |
|-----|------|
| 2025-12-13 | 初版作成 |
