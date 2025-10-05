# FEEL℃ VILLA LP（villa.feeldo.co.jp）
最終目的：見学予約（フォーム送信 → info@feeldo.co.jp）

## 1) 公開手順（Vercel）
1. https://vercel.com にログイン（GoogleでOK）
2. New Project → "Import" → "feeldc-villa-lp.zip" をアップロード
3. Deploy を押すと仮URL（https://xxxx.vercel.app）が発行

## 2) メール送信の設定（Resend）
1. https://resend.com でアカウント作成（無料）
2. API Keys → "Create API Key" → 値をコピー
3. Vercel のプロジェクト → Settings → Environment Variables に追加：
   - `RESEND_API_KEY` = （上で作ったキー）
   - `TO_EMAIL` = info@feeldc.jp（任意）
4. Vercel → Deployments → Redeploy（または "Preview" 再デプロイ）

※ 代替案：Formspree / Brevo / SendGrid でも可。必要ならコードを差し替えます。

## 3) 独自ドメイン紐づけ（villa.feeldo.co.jp）
1. Vercel → Project → Settings → Domains → "Add"
2. `villa.feeldo.co.jp` を追加
3. 指示される DNS レコード（CNAME）をドメイン管理側に追加
   - 例）`villa` → `cname.vercel-dns.com.`
4. 数分〜1時間で有効化

## 4) 既存HPから誘導
- feeldo.co.jp のグローバルナビ or VILLAページにバナー/ボタンでリンク
- 販売終了時は Vercel 側で "Delete Project" するだけ（既存HPの実績にサムネを残す）

## 5) 変更ポイント
- 文言・価格・写真は `/index.html` を編集して再デプロイ
- 会社情報・電話・メールの表記はフッターと「お問い合わせ」欄を修正

## 6) セキュリティ/迷惑対策
- Resend 側のドメイン認証（SPF/DKIM）を設定すると到達率が上がります
- reCAPTCHA を足したい場合は /index.html にスニペットを追加可能

---
不明点があればこのREADMEを開いたままご連絡ください。