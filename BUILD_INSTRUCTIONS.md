# GeoRace Documents Build Instructions

This repository contains scripts to generate a comprehensive documentation bundle for the GeoRace project, including markdown files, presentations (PPTX), and other assets.

## Available Scripts

### Unix/Linux/macOS: `build_zip.sh`

The main build script that creates all documentation and packages it into a ZIP file.

**Usage:**
```bash
bash build_zip.sh
```

**Requirements:**
- `bash` (any POSIX-compliant shell)
- `zip` command (standard on most Unix systems)
- `pandoc` (optional, for DOCX/PPTX generation)
- `mmdc` (optional, for diagram rendering)

**Output:**
- Creates `geo_race_export/` directory with all generated files
- Generates `GeoRace_documents_bundle.zip` containing the complete bundle

### Windows: `build_zip.bat`

Windows batch script with intelligent fallback behavior.

**Usage:**
```batch
build_zip.bat
```

**Behavior:**
1. **Priority 1:** If Git Bash is available, delegates to `build_zip.sh` (generates full 22-slide presentation)
2. **Priority 2:** If WSL (Windows Subsystem for Linux) is available, delegates to `build_zip.sh` via WSL (generates full 22-slide presentation)
3. **Fallback:** Uses embedded PowerShell to generate essential files and create ZIP (generates minimal 3-slide presentation)

**Note:** For the complete 22-slide presentation with all new content, install Git Bash or WSL. The PowerShell fallback generates a minimal version with only the first 3 slides to avoid content duplication.

**Requirements:**
- Windows 7 or later (for PowerShell)
- `pandoc` (optional, for PPTX generation)
- Git Bash or WSL (optional, for full build)

**Output:**
- Creates `geo_race_export/` directory
- Generates `GeoRace_documents_bundle.zip`

### Windows ZIP-only: `make_zip.bat`

Creates only the ZIP archive from an existing `geo_race_export/` folder.

**Usage:**
```batch
make_zip.bat
```

**Requirements:**
- Existing `geo_race_export/` directory (created by running `build_zip.bat` or `build_zip.sh`)

**Output:**
- Generates `GeoRace_documents_bundle.zip`
- Returns error code 1 if `geo_race_export/` doesn't exist

## What's Generated

The build scripts generate:

### Markdown Files
- `GeoRace.md` - Main project description
- `GeoRace_ppt.md` - Presentation content (22 slides)
- `GeoRace_Personas.md` - User personas
- `GeoRace_PBS.md` - Functional scope
- `GeoRace_Benchmark_Matrix.md` - Competitor comparison
- `GeoRace_Contexte_Securite.md` - Security context
- `GeoRace_Architecture.md` - System architecture
- `GeoRace_Stack_Justification.md` - Technology stack
- `GeoRace_Wireframes.md` - UI wireframes
- `GeoRace_Couts_Table.md` - Cost estimates
- `GeoRace_Etude_Comparative.md` - Hosting comparison
- `GeoRace_Risques_Mitigation.md` - Risk matrix
- `GeoRace_EcoScore.md` - Eco-score analysis

### Assets
- `assets/architecture.mmd` - Mermaid diagram source
- `assets/architecture.png` - Rendered architecture diagram (if mmdc available)
- `assets/wireframe_*.svg` - UI wireframe diagrams

### Generated Documents (if pandoc available)
- `*.docx` - Word documents for each markdown file
- `GeoRace_presentation.pptx` - PowerPoint presentation

## Key Features of the Presentation

The generated `GeoRace_ppt.md` includes **22 slides** (when using bash/WSL or build_zip.sh) with:

1. **Slide 2 - Pitch 30-45s pour mercredi**: Ready-to-present 30-45 second pitch
2. **Slide 10 - Pourquoi nous nous démarquons**: Barriers to entry and competitive advantages
3. **Slide 12 - Comment convertir les utilisateurs existants**: Concrete tactics for converting users from Strava/Nike Run Club

**Note:** The PowerShell fallback in `build_zip.bat` (when bash/WSL is not available) generates only the first 3 slides. For the complete 22-slide presentation, use bash/WSL or run `build_zip.sh` directly.

Enhanced emphasis on:
- **DUEL mode** as the core differentiator
- **Real-time competition** vs passive tracking
- **ELO system** for balanced matchmaking
- **Equidistant finish point** algorithm

## Installation of Optional Tools

### Install Pandoc
- **macOS:** `brew install pandoc`
- **Ubuntu/Debian:** `sudo apt-get install pandoc`
- **Windows:** Download from https://pandoc.org/installing.html

### Install Mermaid CLI (mmdc)
```bash
npm install -g @mermaid-js/mermaid-cli
```

## Troubleshooting

### "pandoc: command not found"
Install pandoc (see above) or proceed without it. The build will generate markdown files but skip DOCX/PPTX generation.

### "mmdc not found"
Install mermaid-cli (see above) or proceed without it. The build will skip diagram rendering but include the source `.mmd` file.

### Windows: "bash not found"
The script will automatically fall back to PowerShell mode. For full functionality, install Git for Windows (includes Git Bash) or WSL.

## .gitignore

Build artifacts are excluded from version control:
- `geo_race_export/` - Generated documentation folder
- `GeoRace_documents_bundle.zip` - Final ZIP bundle

## License

Part of the GeoRace project by TLX542.
