# BananaMoon Manifest Expedition — Readiness Inventory

Snapshot date: 2026-08-30 (Asia/Tokyo)

## Goal

Prepare a non-destructive publication bridge:

```text
verified BananaMoon provenance
→ deterministic manifest builder
→ data/bananamoon-latest.json
→ GitHub raw endpoint / downstream readers
```

This preparation phase does not modify BananaBot `main`, BananaMoon canonical provenance, wallets, signing systems, or onchain state.

## Verified resources collected

### BananaBot

Repository: `nijinomichi/BananaBot`

Observed branches:

- `feature/bananamoon-manifest`
- `feature/bananamoon-manifest-v2`

Observed on `feature/bananamoon-manifest-v2`:

- exact directory: `data`
- existing file: `data/bananamoon-latest.json`
- current content: placeholder manifest
- exact Actions directory: `.github/workflows`
- current observed workflow there: `ci.yml`
- missing: `.github/workflows/update-bananamoon-manifest.yml`

BananaBot runtime is Python-based and already has a test directory and CI workflow, so Python is the lowest-surprise implementation language for the builder.

### BananaMoon provenance source

Repository: `nijinomichi/BananaMoon-QuantumTrust-Review`

Observed source files:

- `PROVENANCE.md`
- `CID_INVESTIGATION.md`

Current main head observed during preparation:

```text
bd45efcbc73df964c34847c664701aa5e659c83f
```

The source records currently identify:

```yaml
metadata_cid: "bafkreiakqycxg6lsy7mzzycbn36mrvxzdu4iovedmiaipjaui6oogq2gxm"
image_cid: "bafkreibodjqc27g6ijvcylghabhq6bvwc4ocf35jkhxyugholam4izqmre"
metadata_sha256: "0a8605737972c7d99ce0416efcc8d6f91d38875483620087a414479ce34346bb"
verification_state: "verified_completed"
```

These values are provenance facts, not proof of current mint ownership, wallet control, sale state, or economic value.

## Missing resources / unresolved questions

Before implementation, resolve:

1. Exact BananaBot target branch for the first implementation (`feature/bananamoon-manifest-v2` is the current best candidate because the exact `data` directory and placeholder manifest already exist).
2. Exact BananaBot target branch head commit at the moment implementation starts.
3. Whether the stable manifest should represent only the verified metadata artifact or also include a reviewed pointer to a publication/mint state.
4. Whether `artifact_id` should be a new stable identifier or preserve a reviewed historical identifier.
5. Whether the first workflow should only validate/build, or also commit the generated manifest back to its branch.
6. Whether a publication envelope is needed in v1 or can be deferred until a downstream publisher exists.

## Required tools

### Observation and review

- GitHub repository/file/branch reads
- exact path inspection through API-returned `path`
- Git commit references
- diff review

### Local/deterministic implementation

- Python 3.x
- standard library: `json`, `hashlib`, `argparse`, `pathlib`
- `pytest` or existing repository test runner
- GitHub Actions

Avoid adding new dependencies unless they solve a demonstrated need.

### Validation

- JSON parser
- SHA-256 hashing
- GitHub Actions YAML review
- raw URL fetch check after branch publication

## Candidate implementation files

Do not create these until the promotion gate is approved:

```text
scripts/build_bananamoon_manifest.py
tests/test_bananamoon_manifest.py
.github/workflows/update-bananamoon-manifest.yml
data/bananamoon-latest.json
```

Optional later files:

```text
docs/bananamoon-manifest-contract.md
data/bananamoon-publication-envelope.json
```

## Proposed manifest v1 fields

```yaml
schema_version: "bananamoon.manifest.v1"
artifact_id: "bananamoon-quantum-nft-1of1"
source_repository: "nijinomichi/BananaMoon-QuantumTrust-Review"
source_ref: "<exact commit>"
metadata_cid: "<verified value>"
image_cid: "<verified value>"
metadata_sha256: "<verified value>"
verification_state: "verified_completed"
```

Fields deliberately excluded from v1 unless separately reviewed:

- wallet address
- owner address
- private key / signer material
- transaction hash
- token price
- mint guarantee
- RadicanTrust score
- observer-effect claims
- mutable timestamp inside stable content

## Hazards

```yaml
hazards:
  invisible_path_whitespace:
    mitigation: "Inspect API-returned path and exact raw URL."
  placeholder_promotion:
    mitigation: "Reject placeholder CID/SHA values in verified state."
  canonical_drift:
    mitigation: "Pin source_repository + source_ref."
  volatile_manifest_hash:
    mitigation: "Keep timestamps/runtime IDs outside deterministic content."
  wallet_scope_creep:
    mitigation: "No wallet/signing/onchain code in this bridge."
  readme_overclaim:
    mitigation: "Only document functions that have executable code and tests."
```

## Expedition phases

### Base Camp 0 — Observation

Status: largely complete.

- repositories identified
- exact `data` directory confirmed on v2
- placeholder manifest confirmed
- verified provenance source identified
- wallet boundary declared

### Camp 1 — Contract

Next safe phase.

- freeze manifest v1 field semantics
- decide target branch
- pin source commit
- decide builder input method
- define deterministic serialization

### Camp 2 — Builder + tests

- implement Python builder/validator
- reject placeholders
- generate stable JSON
- hash generated output
- test repeated generation for byte identity

### Camp 3 — Workflow

- add `.github/workflows/update-bananamoon-manifest.yml`
- use minimal permissions
- run builder + tests
- avoid secrets unless a later publication adapter actually requires them

### Camp 4 — Publication observation

- verify GitHub file URL
- verify raw URL
- compare output hash
- record branch/ref/run provenance

### Summit gate — Human review

Only after all prior camps:

- review diff
- verify no wallet/signing scope
- verify source facts
- decide whether to open/merge PR

## Current recommendation

Use `feature/bananamoon-manifest-v2` as the likely implementation branch, but remain in observation/contract mode until its exact head and manifest v1 semantics are fixed.

Do not merge or touch `main` during preparation.
