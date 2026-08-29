---
name: bananamoon-provenance-bridge
description: Safely bridge verified BananaMoon provenance into BananaBot manifests and publication-facing artifacts without mutating canonical sources. Use whenever the user asks to prepare, inspect, repair, generate, or validate BananaMoon manifests, GitHub Actions that update BananaMoon state, raw JSON endpoints, provenance-to-publication bridges, or branch/path alignment involving BananaBot and BananaMoon-QuantumTrust-Review. Observe first, verify exact paths and source commits, preserve claim boundaries, and keep wallet/signing logic out of this workflow.
---

# BananaMoon Provenance Bridge

Build and review a non-destructive bridge from verified BananaMoon provenance to publication-facing BananaBot manifests.

The governing principle is:

> 壊さずに変化させ、変化の証拠を残し、その証拠を次の創造へ返すこと。

This skill does not make BananaBot a new canonical source for BananaMoon. BananaBot may publish or mirror a reviewed manifest, but provenance ownership remains with the repository or artifact that actually established the fact.

## Default mode

Start in `observe_only`.

Do not create, update, merge, publish, pin, mint, sign, or connect a wallet until the relevant source facts and paths are verified. Prefer a working branch and reviewable draft changes.

## Canonical responsibility map

Treat responsibilities as separate:

- `nijinomichi/BananaMoon-QuantumTrust-Review`: provenance memory, artifact identity, CID and SHA verification, restoration record.
- `nijinomichi/BananaBot`: interaction/runtime orchestration and publication-facing manifest delivery.
- `nijinomichi/bana-quantum-graph-`: graph representation and rendering, not BananaMoon NFT provenance authority.
- Notion: detailed human-readable archaeology and decision history, not an execution authority.

Read `references/source-contract.md` before implementing or changing a manifest workflow.

## Required workflow

### 1. Establish the observation target

Record:

```yaml
observation_target:
  repository:
  branch:
  requested_paths: []
  mode: observe_only
```

Never silently substitute the default branch for a user-specified branch.

### 2. Verify exact path identity

For every required file or directory, verify the path returned by GitHub, not only its visual label.

Pay special attention to invisible or Unicode whitespace. Distinguish, for example:

```text
data
data<space>
<space>data
data<U+2009>
```

A valid BananaMoon manifest path should be exactly:

```text
data/bananamoon-latest.json
```

A GitHub Actions workflow must live under exactly:

```text
.github/workflows/
```

A file under `github/workflows/` is ordinary repository content and is not registered as a GitHub Actions workflow merely because it contains YAML.

### 3. Identify source facts before generating output

Prefer verified source records over placeholder manifest values.

For the current BananaMoon lineage, inspect at minimum:

```text
BananaMoon-QuantumTrust-Review/PROVENANCE.md
BananaMoon-QuantumTrust-Review/CID_INVESTIGATION.md
BananaBot/docs/banana-bot-linktree.md
BananaBot/data/bananamoon-latest.json   # when present on the target branch
```

Classify every candidate field:

```yaml
fact_state:
  verified: []
  observed_unverified: []
  placeholder: []
  hypothesis: []
```

Never promote a placeholder such as `bafy-initial-placeholder` or `sha256-initial-placeholder` to a verified field.

### 4. Use a minimal publication manifest

A publication-facing manifest should contain only fields that have a defined source and semantics.

Recommended minimum shape:

```json
{
  "schema_version": "bananamoon.manifest.v1",
  "artifact_id": "bananamoon-quantum-nft-1of1",
  "source_repository": "nijinomichi/BananaMoon-QuantumTrust-Review",
  "source_ref": "<commit-sha>",
  "metadata_cid": "<verified-cid>",
  "image_cid": "<verified-image-cid>",
  "metadata_sha256": "<verified-sha256>",
  "verification_state": "verified_completed"
}
```

Do not add poetic or scientific-sounding scores unless their semantics are explicitly defined. RadicanTrust™ values are not Born-rule probabilities, financial guarantees, or universal trust measurements.

### 5. Separate deterministic content from execution metadata

The deterministic manifest should describe the artifact and source facts.

Runtime metadata belongs in a separate execution or publication envelope when needed:

```yaml
publication_envelope:
  generated_at:
  workflow_run_id:
  target_branch:
  publisher:
  idempotency_key:
```

Do not place volatile timestamps inside a content object whose stable hash is meant to represent the same provenance state across repeated runs.

### 6. Prefer a small deterministic builder

BananaBot is currently Python-based. Prefer a small Python builder or validator over introducing Node.js solely for this bridge unless the repository already has a reviewed JavaScript toolchain.

Candidate files for an implementation phase:

```text
scripts/build_bananamoon_manifest.py
.github/workflows/update-bananamoon-manifest.yml
data/bananamoon-latest.json
tests/test_bananamoon_manifest.py
```

The builder should:

1. accept explicit source facts or a reviewed source record;
2. validate CID/SHA field shape without claiming blockchain ownership;
3. generate deterministic JSON with stable key ordering and newline behavior;
4. refuse placeholders in a `verified_*` state;
5. never access private keys, wallet seeds, or signing APIs;
6. never mutate BananaMoon canonical provenance files.

### 7. Publication workflow safety

A workflow may validate and regenerate the manifest only when its trigger and permissions are explicit.

Default permissions should be minimal. If the workflow commits generated output, make that write boundary obvious and reviewable. Do not add repository secrets unless the workflow actually requires them.

Do not copy wallet automation patterns from unrelated Safe/Gnosis repositories into this bridge.

The following remain prohibited unless a separate, explicitly reviewed project authorizes them:

```yaml
prohibited:
  - wallet_connection
  - seed_phrase_handling
  - private_key_handling
  - onchain_signing
  - Safe_transaction_execution
  - token_transfer
  - minting
```

### 8. Reproducibility and provenance

For a generated manifest, record enough information to reproduce and compare the output:

```yaml
reproducibility:
  inputs:
    - source_ref
    - source_fact_values
  transformation:
    builder_version:
    command:
  environment:
    runtime:
  output:
    sha256:
```

If multiple source artifacts contribute, use an ordered `inputs[]` list rather than a single ambiguous `parent_hash`.

Do not recursively embed entire previous provenance records. Reference them by repository/ref/path/hash.

### 9. Promotion gates

Before moving from observation to implementation, require:

```yaml
promotion_gate:
  requires:
    - exact branch confirmed
    - exact paths confirmed
    - source facts classified
    - placeholders identified
    - canonical owner identified
    - diff review planned
    - no wallet/signing scope
```

Before merge, additionally require:

```yaml
merge_gate:
  requires:
    - tests pass
    - workflow syntax reviewed
    - generated JSON is deterministic
    - raw URL resolves on the intended branch
    - source_ref is reproducible
    - no secret values committed
    - human review
```

## Output format during preparation

When the user asks to prepare before implementation, return this structure:

```yaml
expedition_readiness:
  goal:
  verified_resources: []
  missing_resources: []
  ambiguities: []
  hazards: []
  candidate_files: []
  tools_required: []
  promotion_gate:
  next_safe_action:
```

Do not implement beyond the current gate merely because the eventual destination is obvious.

## Interpretation boundary

A missing or placeholder workflow can be a useful design seed. It is not evidence of authorization, authorship, or intended inheritance.

Treat external absence as observation material:

```text
external absence
→ explicit observation
→ local design decision
→ reviewed implementation in our own lineage
```

Never treat it as:

```text
external absence
→ permission to fill another repository
```
