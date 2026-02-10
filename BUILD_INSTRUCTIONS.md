# GeoRace Documents Build Instructions

This repository contains scripts to generate comprehensive documentation for the GeoRace project, including markdown files, presentations (PPTX), and other assets.

## Available Scripts

### Unix/Linux/macOS: `build_zip.sh`

The main build script that generates all documentation files directly in the repository root.

**Usage:**
```bash
bash build_zip.sh
```

**Requirements:**
- `bash` (any POSIX-compliant shell)
- `pandoc` (optional, for DOCX/PPTX generation)
- `mmdc` (optional, for diagram rendering)

**Output:**
- Generates all markdown files in the repository root directory
- Creates `assets/` directory with diagrams and wireframes
- Backs up existing files with timestamp (e.g., `GeoRace.md.bak.20240210120000`)
- If pandoc is available, also generates DOCX and PPTX files

**Key Changes:**
- ✅ No longer creates `geo_race_export/` or ZIP files
- ✅ Files are written directly to repository root
- ✅ Automatic backup of existing files before overwriting
- ✅ Non-destructive (preserves previous versions)

### Windows: `build_files.bat` and `build_files.ps1`

Windows scripts that provide equivalent functionality to `build_zip.sh`.

**Usage (Option 1 - Batch file):**
```batch
build_files.bat
```

**Usage (Option 2 - PowerShell directly):**
```powershell
pwsh -ExecutionPolicy Bypass -File build_files.ps1
```

**Requirements:**
- Windows PowerShell or PowerShell Core
- `pandoc` (optional, for DOCX/PPTX generation)

**Output:**
- Generates all markdown files in the repository root directory
- Creates `assets/` directory with diagrams and wireframes
- Backs up existing files with timestamp
- Same functionality as `build_zip.sh`

**Note:** The batch file (`build_files.bat`) will automatically detect and use the available PowerShell version (PowerShell Core preferred, Windows PowerShell as fallback).

### Legacy Windows Scripts

**⚠️ Note:** The following scripts are deprecated and will be removed in a future version:

- `build_zip.bat` - Old Windows build script (creates geo_race_export folder)
- `make_zip.bat` - Creates ZIP from geo_race_export folder

Please use `build_files.bat` or `build_files.ps1` instead.

## What's Generated

The build scripts generate the following files directly in the repository root:

### Markdown Files
- `GeoRace.md` - Main project description
- `GeoRace_ppt.md` - Presentation content (15 slides)
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

### Assets (in `assets/` directory)
- `architecture.mmd` - Mermaid diagram source
- `architecture.png` - Rendered architecture diagram (if mmdc available)
- `wireframe_home.svg` - Home screen wireframe
- `wireframe_duel_modal.svg` - Duel modal wireframe
- `wireframe_live.svg` - Live race wireframe
- `wireframe_result.svg` - Result screen wireframe

### Generated Documents (if pandoc available)
- `*.docx` - Word documents for each markdown file
- `GeoRace_presentation.pptx` - PowerPoint presentation

### Backup Files
When a file is regenerated, the existing version is automatically backed up with a timestamp:
- Format: `filename.bak.YYYYMMDDHHMMSS`
- Example: `GeoRace.md.bak.20240210120000`
- These backups are excluded from git (via `.gitignore`)

## Key Features of the Presentation

The generated `GeoRace_ppt.md` includes **15 slides** with:

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

### Windows: "PowerShell not found"
Install Windows PowerShell (included in Windows 7+) or PowerShell Core. The batch file will detect the available version automatically.

### Permission errors on Linux/macOS
Make the script executable:
```bash
chmod +x build_zip.sh
```

## .gitignore

Build artifacts and backups are excluded from version control:
- `geo_race_export/` - Old output directory (deprecated)
- `build_output/` - Old output directory (deprecated)
- `GeoRace_documents_bundle.zip` - Old ZIP bundle (deprecated)
- `*.bak.*` - Backup files created by build scripts

## License

Part of the GeoRace project by TLX542.
