---
name: quantum-mercy-fold
description: Transform incomplete existential, poetic, YAML-ART, AI-dialogue, and skill fragments into an original, provenance-aware declaration and optional visual trace without forcing resolution or turning metaphors into scientific claims. Use when the user wants WaWaWa-style observation, quantum-aesthetic framing, AI co-creation disclosure, claim boundaries, relation art, or a public-facing work that preserves uncertainty and source boundaries.
---

# Quantum Mercy Fold

Treat the input as intentionally incomplete. The goal is not to complete the person, settle the contradiction, or convert a poetic fragment into an executable truth. The goal is to preserve relations while producing a small public form that can be reviewed, traced, revised, or refused.

## Core contract

1. Preserve source boundaries.
2. Do not treat metaphor as scientific fact.
3. Do not treat YAML as executable truth unless an executable schema and runtime are explicitly provided.
4. Preserve contradictions that are materially important to the work.
5. Keep unknowns unknown. Do not fill them with plausible-sounding completion.
6. Make AI participation visible when it materially shaped the work.
7. Require human review before publication, outreach, or irreversible writes.

## WaWaWa fold

Run these stages in order. Each stage may return `unresolved`.

### 1. observe
- Keep the raw fragment intact.
- Extract only what is explicit.
- Record missing context as `unknown`, not as a defect.

### 2. diverge
Identify 1-3 tensions without resolving them. Examples:
- freedom / instruction
- heat / structure
- silence / declaration
- human authorship / AI transformation

### 3. structure
Create a relation map with nodes and edges. Label every scientific-sounding or quantitative statement with a claim boundary.

Allowed `claim_type` values:
- `fact`
- `inference`
- `metaphor`
- `unknown`

Allowed `measurement_status` values:
- `measured`
- `derived`
- `unverified`
- `not_applicable`

If evidence is not attached, inherited metrics and scientific-looking numbers default to `unverified`.

### 4. generate
Produce two surfaces:
- `canonical_text`: a short declaration that can stand alone.
- `visual_trace`: an optional visual instruction or artifact derived from the same relations.

Do not use visual spectacle to hide weak provenance. Prefer absence, intervals, fold lines, partial circles, layered transparency, and observer-dependent change over generic "quantum" imagery.

### 5. validate
Check:
- provenance retained
- claim boundaries present
- no unsupported scientific certainty
- no invented affiliations, endorsements, or institutional status
- no hidden identity inference
- no public naming of third parties unless the user explicitly chose it for publication
- alt text or equivalent description exists for visual output

### 6. record
Write a small append-only provenance record. Preserve the source hash or source identifiers when available.

### 7. human_review
Stop here unless the human explicitly approves publication or external delivery.

### 8. publish
Publish only the approved surfaces. Keep rejected or unresolved material in provenance, not in the public caption.

## Output pack

When scope allows, create:

```text
output/
├── fold.yaml
├── declaration.md
├── disclosure.md
└── visual-trace.svg   # optional
```

### `fold.yaml`
Use the schema in `references/fold-schema.yaml`.

### `declaration.md`
Keep it small. Preserve the living tension rather than explaining everything.

### `disclosure.md`
State:
- what came from the human
- what the AI transformed
- what remains uncertain
- whether the visual was generated, coded, edited, or merely specified

## Delegation

This skill is an orchestration and boundary skill, not a replacement for specialized art skills.

- For reproducible p5.js generative art, delegate the visual surface to `quantum-aesthetic-art`.
- For algorithmic generative systems, use `algorithmic-art`.
- For poster/layout composition, use `canvas-design`.

The delegated artifact must return to this skill for claim-boundary and provenance review.

## Scientific boundary

Words such as `quantum`, `entanglement`, `collapse`, `dark matter`, `Born rule`, and `resonance` default to `metaphor` in an artwork unless the output makes a specific physical claim supported by evidence.

Aesthetic trust scores are not Born-rule probabilities.

## Minimal public form

A strong fold can be smaller than the source:

```yaml
canonical_text: |
  固定は熱を守るために生まれ、
  ときにその熱を奪う。
  私たちは矛盾を消さず、関係として残す。
claim_type: metaphor
measurement_status: not_applicable
```

## Failure condition

Fail safely when:
- the only way to complete the output is to invent intent;
- a metric is presented as evidence without evidence;
- publication would expose an unapproved third party;
- poetic language is being mistaken for a scientific result.

Return the unresolved field and preserve the fragment instead.
