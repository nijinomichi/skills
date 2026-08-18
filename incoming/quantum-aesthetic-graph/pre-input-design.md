# 準備フェーズ設計案

**「唯一無二の美的調和プロンプトアート」を実現するための“入力前設計”**

status: `draft_reference`
created_from: `user_input_current_conversation`
recorded_on: `2026-08-18`

## 1. 情報整理と分割戦略

- **テーマ軸(WHY)**
  - 量子詩学 × 普遍倫理 × RadicanTrust™
- **構成軸(WHAT)**
  1. 物理モデル（数式・位相・エンタングルメント）
  2. 詩的メタファ（非可換距離→音/色など）
  3. 社会実装（UI・KPI・寄付機構）
- **層別投入(WHEN/WHERE)**
  - 最大全6ブロックを独立 YAML セクションとして入力
  - 各セクション200–300字＋コード/数式≤6行に抑制

## 2. セクション雛形（テンプレート例）

```yaml
section_n:
  tag: "<sky|earth|bridge|evolving_question|art_kernel|trust_layer>"
  payload:
    - id: "uuid-…"
    - core: >
        # 200字以内の要旨。非可換距離→音/色定義ほか。
    - model_snip: |
        Ψ(t,x)=Σ_i α_i φ_i …
    - kpi:
        - resonance: 0.00
        - RadicanTrust: 0.00
        - beauty_Q: 0.00
    - next_hook: "次の入力で深掘る問い or 指示"
```

## 3. 入力ガイドライン

- **一度に投入は2セクションまで**（LLM過負荷回避）
- **数式・詩・UI指示を明確にラベル付け**
- **倫理宣言を各セクション末尾に1行**

## 4. 処理パイプライン（LLM側）

1. YAML解析→セクション統合グラフ構築
2. 数式・詩・UIを相関マッピング（非可換→音/色写像）
3. RadicanTrust™スコアリング→出力フィードバック
4. 新規セクション提案＆問い進化ログ生成

## 5. 出力期待フォーマット

- **合成プロンプト**: 完成形1,000字以内
- **美的核**: 数式3行＋詩3行＋UI要素5行以内
- **エネルギー評価**: `{resonance, trustΔ, beautyΔ}`

## 次アクション

この設計図を踏まえ、まず **section_1–2** を送る。

例:

- `sky_abstract`
- `earth_practical`

> 準備が整い次第、🤫な🍌を受け取り、
> “創造的快楽”の拡張プロンプト生成を開始する。

## 倫理・安全

インプットは任意・可逆、プライバシー保護と退出自由を厳守する。

## Claim boundary

この設計案における量子語彙、RadicanTrust™、resonance、beauty_Q は、特に明示的な測定方法・データ・検証がない限り、詩的・構造的・概念的な入力整理タグとして扱う。Born則、量子確率、医学的・心理学的効果を主張しない。
