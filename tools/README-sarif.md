SARIF to Table converter

This small tool converts a SARIF file (e.g. Trivy output in SARIF) into a CSV and a Markdown table.

Usage

```bash
python tools/sarif_to_table.py path/to/trivy-results.sarif [output_dir]
```

Outputs

- `output_dir/<inputbasename>-YYYYMMDD-HHMMSS.csv`
- `output_dir/<inputbasename>-YYYYMMDD-HHMMSS.md`

No external Python packages required (uses stdlib only).
