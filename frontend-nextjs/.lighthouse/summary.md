# Lighthouse Summary

Base URL: http://localhost:3100

| Route | Perf | A11y | BP | SEO |
| --- | --- | --- | --- | --- |
| home | 86 | 96 | 77 | 100 |
| namhae | 78 | 96 | 77 | 100 |
| minyoung | 99 | 96 | 77 | 100 |
| project-planit | 100 | 96 | 77 | 100 |
| project-rd-autonote | 97 | 96 | 77 | 100 |

## Failing audits (per route)

### home
- **performance**
  - [53] Total Blocking Time — 330 ms
  - [50] Use efficient cache lifetimes — Est savings of 17 KiB
  - [0] Forced reflow
  - [50] Improve image delivery — Est savings of 11,014 KiB
  - [50] Legacy JavaScript — Est savings of 11 KiB
  - [0] Network dependency tree
  - [0] Render-blocking requests — Est savings of 130 ms
  - [62] Max Potential First Input Delay — 210 ms
  - [50] Reduce unused JavaScript — Est savings of 220 KiB
  - [50] Avoid enormous network payloads — Total size was 14,782 KiB
- **accessibility**
  - [0] Background and foreground colors do not have a sufficient contrast ratio.
- **best-practices**
  - [0] Uses third-party cookies — 1 cookie found
  - [0] Issues were logged in the `Issues` panel in Chrome Devtools

### namhae
- **performance**
  - [16] Largest Contentful Paint — 4.1 s
  - [50] Use efficient cache lifetimes — Est savings of 17 KiB
  - [0] Forced reflow
  - [0] Improve image delivery — Est savings of 21,203 KiB
  - [0] Legacy JavaScript — Est savings of 11 KiB
  - [0] Network dependency tree
  - [0] Render-blocking requests — Est savings of 130 ms
  - [56] Time to Interactive — 4.2 s
  - [50] Reduce unused JavaScript — Est savings of 209 KiB
  - [50] Avoid enormous network payloads — Total size was 21,970 KiB
- **accessibility**
  - [0] Background and foreground colors do not have a sufficient contrast ratio.
- **best-practices**
  - [0] Uses third-party cookies — 2 cookies found
  - [0] Issues were logged in the `Issues` panel in Chrome Devtools

### minyoung
- **performance**
  - [50] Use efficient cache lifetimes — Est savings of 17 KiB
  - [0] Forced reflow
  - [50] Improve image delivery — Est savings of 9,129 KiB
  - [50] Legacy JavaScript — Est savings of 11 KiB
  - [0] Network dependency tree
  - [0] Render-blocking requests — Est savings of 130 ms
  - [50] Reduce unused JavaScript — Est savings of 209 KiB
  - [50] Avoid enormous network payloads — Total size was 9,864 KiB
- **accessibility**
  - [0] Background and foreground colors do not have a sufficient contrast ratio.
- **best-practices**
  - [0] Uses third-party cookies — 1 cookie found
  - [0] Issues were logged in the `Issues` panel in Chrome Devtools

### project-planit
- **performance**
  - [50] Use efficient cache lifetimes — Est savings of 17 KiB
  - [0] Forced reflow
  - [50] Improve image delivery — Est savings of 4,064 KiB
  - [0] LCP request discovery
  - [50] Legacy JavaScript — Est savings of 11 KiB
  - [0] Network dependency tree
  - [0] Render-blocking requests — Est savings of 130 ms
  - [50] Reduce unused JavaScript — Est savings of 234 KiB
  - [50] Avoid enormous network payloads — Total size was 4,901 KiB
- **accessibility**
  - [0] Background and foreground colors do not have a sufficient contrast ratio.
  - [0] Elements with visible text labels do not have matching accessible names.
- **best-practices**
  - [0] Uses third-party cookies — 1 cookie found
  - [0] Issues were logged in the `Issues` panel in Chrome Devtools

### project-rd-autonote
- **performance**
  - [50] Use efficient cache lifetimes — Est savings of 17 KiB
  - [0] Forced reflow
  - [50] Improve image delivery — Est savings of 20,724 KiB
  - [0] LCP request discovery
  - [50] Legacy JavaScript — Est savings of 11 KiB
  - [0] Network dependency tree
  - [0] Render-blocking requests — Est savings of 130 ms
  - [76] Time to Interactive — 3.2 s
  - [86] Max Potential First Input Delay — 140 ms
  - [50] Reduce unused JavaScript — Est savings of 234 KiB
  - [50] Avoid enormous network payloads — Total size was 21,608 KiB
- **accessibility**
  - [0] Background and foreground colors do not have a sufficient contrast ratio.
  - [0] Elements with visible text labels do not have matching accessible names.
- **best-practices**
  - [0] Uses third-party cookies — 1 cookie found
  - [0] Issues were logged in the `Issues` panel in Chrome Devtools