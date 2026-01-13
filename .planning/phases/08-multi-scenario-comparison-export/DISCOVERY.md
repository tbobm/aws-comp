# Phase 8 Discovery: Multi-Scenario Comparison & Export

**Research Depth:** Level 2 - Standard Research (15-30 min)
**Completed:** 2026-01-13

## Problem Statement

Enable users to:
1. Create multiple volume scenarios (Scenario A, B, C) for same service
2. Compare costs across all scenarios simultaneously in charts
3. Export comparison charts as downloadable PNG images

## Research Questions

### Q1: What library should we use for chart export?

**Answer: recharts-to-png**

- **npm package:** `recharts-to-png@3.0.1` (latest stable)
- **Compatibility:** Works with Recharts 3.x (we use ^3.3.0 ✓)
- **Dependencies:** html2canvas ^1.2.0 (auto-installed)
- **TypeScript:** Full support
- **Bundle size:** 26.5 KB unpacked
- **Maturity:** 39 versions, actively maintained (last update 6 months ago)

**Key API:**
```typescript
import { useCurrentPng } from 'recharts-to-png';

const [getPng, { ref, isLoading }] = useCurrentPng();
// Attach ref to Recharts component
// Call getPng() to get PNG data URL
// Use FileSaver.js to download: FileSaver.saveAs(png, 'chart.png')
```

**Why not alternatives:**
- `html2canvas` directly: recharts-to-png already wraps it with Recharts-specific handling
- `dom-to-image`: Less maintained, more complex API

### Q2: How should we manage multi-scenario state?

**Answer: Extend existing useState pattern with array**

Current pattern in ComparisonLayout.tsx:
```typescript
const [config1, setConfig1] = useState<TConfig>(defaultConfig1);
const [config2, setConfig2] = useState<TConfig>(defaultConfig2);
```

New pattern for multi-scenario:
```typescript
type Scenario = { id: string; label: string; config: TConfig };
const [scenarios, setScenarios] = useState<Scenario[]>([
  { id: 'a', label: 'Scenario A', config: defaultConfig1 },
  { id: 'b', label: 'Scenario B', config: defaultConfig2 },
]);
```

**Why not state management library (Redux, Zustand):**
- Scenarios are page-local state (not global)
- Simple array operations (add, remove, update)
- No need for external dependencies
- Current app uses local useState successfully

**Operations needed:**
- Add scenario: `setScenarios([...scenarios, newScenario])`
- Remove scenario: `setScenarios(scenarios.filter(s => s.id !== id))`
- Update config: `setScenarios(scenarios.map(s => s.id === id ? {...s, config} : s))`

### Q3: How to display multiple scenarios in charts?

**Answer: Pass all scenarios to ComparisonChart**

Current chart supports 2 configs (Bar dataKey for each). Recharts Bar component can handle N series dynamically:

```typescript
<BarChart data={chartData}>
  {scenarios.map((scenario) => (
    <Bar key={scenario.id} dataKey={scenario.label} fill={getColor(scenario.id)} />
  ))}
</BarChart>
```

**Color palette:** Use existing primary-500, secondary-500, plus add tertiary colors from Material Design theme.

## Implementation Decisions

### Architecture

**Option A (chosen): Extend ComparisonLayout**
- Pros: Reuses existing generic framework, minimal code duplication
- Cons: More complex props and logic in one component

**Option B: New MultiScenarioLayout component**
- Pros: Separation of concerns, cleaner architecture
- Cons: Duplicates ComparisonLayout logic, harder to maintain consistency

**Decision:** Option A - Extend ComparisonLayout with optional multi-scenario mode via props.

### User Flow

1. User sees "Add Scenario" button (max 4 scenarios for readability)
2. Each scenario has: label input, config form, cost breakdown, remove button
3. Chart shows all scenarios as separate bars with distinct colors
4. "Export Chart" button appears when scenarios exist
5. Click export → downloads `aws-{service}-comparison.png`

### Component Changes

**ComparisonLayout.tsx:**
- Add `enableMultiScenario?: boolean` prop
- When enabled: render scenario manager instead of fixed 2-config layout
- Pass all scenarios to ComparisonChart

**ComparisonChart.tsx:**
- Accept `scenarios: Array<{label: string; breakdown: GenericCostBreakdown}>` prop
- Dynamically generate Bar components
- Add export button with recharts-to-png integration

## Dependencies to Install

```bash
npm install recharts-to-png file-saver
npm install -D @types/file-saver
```

## Risks and Mitigations

**Risk 1: Chart becomes cluttered with >3 scenarios**
- Mitigation: Limit to 4 scenarios max, show warning if chart becomes hard to read

**Risk 2: Export includes UI elements (buttons, forms)**
- Mitigation: recharts-to-png targets specific chart ref, excludes surrounding UI

**Risk 3: Dark mode affects exported chart colors**
- Mitigation: Use theme-independent colors for chart bars, test export in both themes

## References

- recharts-to-png: https://github.com/brammitch/recharts-to-png
- npm package: https://www.npmjs.com/package/recharts-to-png
- html2canvas: https://html2canvas.hertzen.com/
- FileSaver.js: https://github.com/eligrey/FileSaver.js

## Next Steps

Create PLAN.md with tasks:
1. Install dependencies (recharts-to-png, file-saver)
2. Add multi-scenario state management to ComparisonLayout
3. Update ComparisonChart to support N scenarios
4. Add chart export functionality with download button
5. Add scenario management UI (add, remove, label editing)

---
*Discovery completed: 2026-01-13*
*Ready for planning*
