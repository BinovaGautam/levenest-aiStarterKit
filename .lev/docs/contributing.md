# Contributing Guide

Thank you for your interest in improving Levenest!

## Creating a New Agent

1. Copy `lib/agents/agent-crud-agent.yaml` to a new file under `lib/agents/`.
2. Populate mandatory fields: `id`, `name`, `version`, `type`, `description`, `inputs`, `outputs`.
3. If your agent extends an existing one, add `inherits: <base-agent-id>`.
4. Run `lev lint` – the Fundamentals Enforcer ensures schema compliance.
5. Submit a PR describing *why* the new agent is needed.

## Creating a New Workflow

1. Define the YAML in `lib/workflows/` with a unique `id` and `version`.
2. Reference agents using the `agent@<version>` syntax.
3. Keep steps **idempotent** – each step should be safely re-run.
4. Validate with `lev lint`.  Fix any dependency errors reported by the Dependency Resolver agent.

## Adding a Package to `lev_modules`

1. Use the (future) CLI: `lev install @third-party/my-awesome-agent@1.2.0`.
2. The Package Manager agent will fetch the package and update `lev_modules/index.json`.
3. Packages are immutable; never edit files inside `lev_modules/` directly.

## Coding Standards

* Prefer YAML over JSON unless machine-generated.
* Write self-documenting descriptions.
* Keep commits atomic and reference workflows or tasks when possible.

## Working with Base Packages vs. Project Lib

* **Do not edit files** inside `lev_modules/`; they are read-only and version-locked.
* To extend a base agent/workflow, create a new YAML in `lib/` and add `inherits: <pkg-id>@<range>`.
* If you believe a base package needs improvement, open an issue or PR in its *source repository*—not in your project repo.

## Schema & Determinism Checklist

Before submitting, ensure:

1. All YAML passes `lev lint` with zero *critical* violations.
2. Agent/workflow IDs do **not** clash with existing packages (run `lev search <id>` to be sure).
3. Any prompt templates are versioned and include strict response-schema instructions.
4. New workflows include at least one Gatekeeper or Enforcer step to maintain determinism. 