# Levenest

Levenest is a programmable software-development operating system (Dev-OS) built for **agent-driven automation**.  It provides a predictable folder layout, YAML-first configuration, and an opinionated rule engine (`fundamentals.yaml`) so that autonomous or human agents can collaborate safely inside any codebase.

Key pillars:

1. **Everything is YAML** – agents, workflows, rules, and even project configuration are expressed as readable YAML.  JSON is reserved only for the immutable `lev_modules/index.json` registry for third-party packages.
2. **Rule-governed** – every directory ships with a `fundamentals.yaml` file that is actively enforced by the `fundamentals-enforcer-agent` and the CLI (`lev lint`).
3. **Composable agents & workflows** – agents declare strict input/output contracts; workflows chain them together declaratively.  Version locking (`agent@1.0.0`) prevents drift.
4. **Immutable modules** – external logic lives in `lev_modules/` and is never mutated after installation.  This guarantees reproducibility and auditability.
5. **First-class CLI** (future) – the `lev` CLI will bootstrap projects, validate rules, execute workflows, and manage packages.

![Levenest high-level diagram](future.png)

## Base Packages vs. Project Library

Levenest mirrors the Node.js philosophy:

* **Base & Community Modules** live in `.lev/lev_modules/` and are installed via `lev install <pkg>`.
* **Project Library (`.lev/lib/`)** contains thin wrappers that *extend* or *compose* those base modules for your specific project needs.
* Fundamentals rule forbids redefining an `id` already provided by a package—eliminates shadowing ambiguities.

A typical extension pattern:

```yaml
# .lev/lib/agents/react-codegen-agent.yaml
inherits: "@base/codegen-agent@^1.0.0"
framework: react
```

## Making LLMs Deterministic

Levenest is designed for **LLM-first automation** with minimal human intervention.  Reliability is achieved through multiple guard-rails:

1. **Structured Input Schemas** – Every workflow begins with typed YAML requests; missing fields abort early.
2. **Canonical Prompt Templates** – Version-locked prompt packages enforce strict "respond in schema" instructions.
3. **Automated Schema Validation** – Responses are parsed against JSON-Schemas; failures trigger auto-repair loops.
4. **Cross-Agent Redundancy** – Generate → Review → Critic → Gatekeeper pattern catches hallucinations.
5. **Rule Enforcement** – The Fundamentals Enforcer stops any artefact that violates project rules.
6. **Deterministic Compilers** – LLM output is treated as input to deterministic code generators, ensuring identical results given same versions.
7. **Sandbox & Replay Logs** – All changes staged in isolation; full audit trail allows replay and regression tests.
8. **Human Escalation** – Confidence thresholds route edge cases to a human-interaction agent.

With these layers combined, real-world success rates >99 % are attainable for well-defined tasks. 