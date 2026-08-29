# BananaMoon Provenance Bridge — Source Contract

Snapshot date: 2026-08-30 (Asia/Tokyo)

This reference captures the currently observed responsibility boundaries and known source material. It is not a substitute for re-reading the repositories before a write operation.

## 1. Canonical responsibility

### `nijinomichi/BananaMoon-QuantumTrust-Review`

Role: provenance memory for BananaMoon / QuantumTrust.

Observed primary references:

- `PROVENANCE.md`
- `CID_INVESTIGATION.md`

The current records identify a verified primary BananaMoon metadata artifact with:

```yaml
verified_primary_artifact:
  metadata_cid: "bafkreiakqycxg6lsy7mzzycbn36mrvxzdu4iovedmiaipjaui6oogq2gxm"
  image_cid: "bafkreibodjqc27g6ijvcylghabhq6bvwc4ocf35jkhxyugholam4izqmre"
  metadata_file: "bananamoon_metadata.json"
  metadata_size: "823B"
  metadata_sha256: "0a8605737972c7d99ce0416efcc8d6f91d38875483620087a414479ce34346bb"
  classification: "verified_primary_artifact"
  final_state: "verified_completed"
```

Before publishing these values into another repository, re-read the source files and resolve the exact source commit.

Important remaining provenance questions in the source repository include which metadata variant is the production file and whether a minting flow references the verified metadata CID. Therefore, a manifest must not infer mint status or onchain ownership from CID verification alone.

## 2. BananaBot responsibility

Repository: `nijinomichi/BananaBot`

Role: Discord/runtime orchestration and publication-facing artifact delivery.

`docs/banana-bot-linktree.md` describes:

- GitHub as a public blueprint and review history.
- Pinata as an optional IPFS artifact vault.
- Notion as mission control and decision history.
- BananaMoon-QuantumTrust-Review as the provenance memory where BananaBot's journey is remembered.

This makes BananaBot a suitable place for a public mirror/manifest, but not a replacement provenance authority.

## 3. Manifest branch observations

### `feature/bananamoon-manifest`

Observed on 2026-08-30:

- Branch exists.
- `.github/workflows/update-bananamoon-manifest.yml` was not found.
- `data/bananamoon-latest.json` was not found.

Re-observe before relying on this state.

### `feature/bananamoon-manifest-v2`

Observed on 2026-08-30:

- Branch exists.
- Exact directory `data` exists.
- Exact path `data/bananamoon-latest.json` exists.
- `.github/workflows/` exists but contains only `ci.yml` at the observed time.
- `.github/workflows/update-bananamoon-manifest.yml` was not found.

Observed manifest content is placeholder material:

```json
{
  "id": "artifact_initial",
  "source": "BananaBot",
  "cid": "bafy-initial-placeholder",
  "sha256": "sha256-initial-placeholder",
  "github_commit": "",
  "created_at": "2026-07-22T04:35:00+09:00",
  "previous_cid": "",
  "trust_state": "unresolved",
  "observer_effect": true
}
```

Do not promote these placeholder values into a verified manifest.

## 4. Exact path rules

The publication data path is intended to be exactly:

```text
data/bananamoon-latest.json
```

The GitHub Actions path is intended to be exactly:

```text
.github/workflows/update-bananamoon-manifest.yml
```

Always inspect the API-returned `path` field. Visual inspection alone is insufficient because Unicode whitespace may be nearly invisible.

A raw publication URL for the v2 branch would take this form once the intended file is approved:

```text
https://raw.githubusercontent.com/nijinomichi/BananaBot/feature/bananamoon-manifest-v2/data/bananamoon-latest.json
```

Do not treat URL shape as proof of content validity. Resolve the file and validate its contents.

## 5. External Safe/Gnosis observation boundary

The external repository `Safe-Wallet-Custom-Secure-dApp/.github-private` was observed as design material only.

A file at:

```text
github/workflows/update-readme.yml
```

on branch `thegoodeth12-patch-1` contained only a placeholder comment. This path is not `.github/workflows/` and therefore is not, by location alone, a registered GitHub Actions workflow.

Use that absence only as a design prompt. Do not copy wallet, signer, private-key, Safe transaction, or token-transfer behavior into BananaMoon manifest publication.

## 6. Source confidence levels

Use these labels:

```yaml
confidence:
  verified_source_fact:
    meaning: "explicitly established by a reviewed provenance source"
  observed_repository_fact:
    meaning: "observed directly in a repository but not necessarily provenance-authoritative"
  placeholder:
    meaning: "intentionally incomplete value; must never be promoted as verified"
  hypothesis:
    meaning: "interpretation requiring review or additional evidence"
```

## 7. Minimum manifest source set

Before generating a verified publication manifest, obtain:

```yaml
required_inputs:
  - source_repository
  - exact_source_commit
  - metadata_cid
  - image_cid
  - metadata_sha256
  - verification_state
  - manifest_schema_version
```

For reproducibility, also record the builder version and generated output hash outside or alongside the stable manifest.
