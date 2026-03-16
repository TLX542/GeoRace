# Documentation & checklist Accessibilité (A11Y) — GeoRace

But : rules for writing accessible specs & product checks.

## Docs checklist (for specs, PRD, presentation)
- [ ] Use semantic headings (H1, H2, H3)
- [ ] Provide alt text for images / diagrams (in repository as alt in markdown)
- [ ] Tables have captions and headers
- [ ] Links have descriptive text (no "click here")
- [ ] All color examples include contrast ratio values
- [ ] PDFs exported must include document title and searchable text

## Product checklist (per screen)
- [ ] Screen reader labels (VoiceOver/TalkBack)
- [ ] Focus order logical & visible focus indicator
- [ ] Touch target >= 44x44dp
- [ ] Contrast >= 4.5:1 (normal text)
- [ ] Dynamic text / font scaling supported
- [ ] Keyboard navigation for maps (fallback interactions)

## Test plan & evidence
- Manual tests with VoiceOver / TalkBack (record in `info/research/a11y_tests/`)
- Automated checks: axe (for web parts), color contrast tools
- Evidence expected: screenshots with VoiceOver spoken labels, logs of test cases (TC-A11Y-001..)

-- Fin.