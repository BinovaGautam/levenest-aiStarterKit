# Fundamentals Guide

`fundamentals.yaml` is the policy contract between humans and machines inside a Levenest project.  Each directory can declare its own `fundamentals.yaml`; rules are composable and inherit down the tree unless explicitly overridden.

## Rule Structure

```yaml
- id: enforce-iso-task-names           # Unique identifier
  applies_to: "workspace/tasks/*.yaml"  # Glob relative to the directory
  type: critical                       # critical | modest | info
  description: "Task files must begin with ISO date"
  conditions:
    pattern: "^\\d{4}-\\d{2}-\\d{2}.*\\.yaml$"  # Optional additional constraints
```

### Types

* **critical** – Build must fail or CLI errors out if violated
* **modest** – Warning; execution continues but is recorded
* **info** – Purely informational

## Enforcement Flow

1. `lev lint` or any workflow invokes the **Fundamentals Enforcer Agent**.
2. The agent loads all `fundamentals.yaml` files up the directory chain.
3. It expands glob patterns and evaluates rules.
4. Violations are aggregated into a report.
5. Critical violations abort the current operation.

## Authoring Best Practices

* Use precise `applies_to` patterns.
* Prefer **critical** only for rules that are absolutely blocking.
* Where possible, add `conditions` (regex, size limits, etc.) for extra safety.
* Document *why* a rule exists in the description.

## Additional Core Rules

* **No Shadowing IDs** – An agent/workflow defined in `lib/` must not reuse an `id` provided by any installed package (avoids ambiguity).
* **Immutable lev_modules** – Any attempt to write inside `lev_modules/` outside the Package Manager agent will fail a *critical* rule. 