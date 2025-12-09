#!/usr/bin/env python3
"""
Convert a SARIF file into CSV and Markdown table formats.
Usage:
  python tools/sarif_to_table.py /path/to/file.sarif [output_dir]

Outputs files: <inputname>-YYYYMMDD-HHMMSS.csv and .md in the output_dir (default: security-scans/)
"""
import json
import sys
import os
import csv
from datetime import datetime


def safe_get(d, *keys):
    v = d
    for k in keys:
        if not isinstance(v, dict):
            return None
        v = v.get(k)
        if v is None:
            return None
    return v


def extract_results(sarif):
    tool_name = None
    runs = sarif.get('runs', [])
    for run in runs:
        tool = run.get('tool', {}).get('driver', {})
        if 'name' in tool:
            tool_name = tool['name']
            break
    rows = []
    for run in runs:
        tool = run.get('tool', {}).get('driver', {})
        tool_name = tool.get('name', tool_name)
        rules = {r.get('id'): r for r in run.get('tool', {}).get('driver', {}).get('rules', [])}
        for res in run.get('results', []):
            rule_id = res.get('ruleId') or safe_get(res, 'rule', 'id') or ''
            rule = rules.get(rule_id, {})
            rule_name = rule.get('name') or rule.get('shortDescription', {}).get('text', '')
            message = safe_get(res, 'message', 'text') or ''
            level = res.get('level') or safe_get(res, 'properties', 'severity') or ''
            locations = res.get('locations') or []
            if locations:
                pl = safe_get(locations[0], 'physicalLocation') or {}
                art = safe_get(pl, 'artifactLocation') or {}
                file_path = art.get('uri') or ''
                region = pl.get('region') or {}
                start_line = region.get('startLine')
                end_line = region.get('endLine')
                snippet = region.get('snippet', {}).get('text') if region.get('snippet') else ''
            else:
                file_path = ''
                start_line = ''
                end_line = ''
                snippet = ''
            uri = file_path
            timestamp = sarif.get('metadata', {}).get('timestamp', '')

            rows.append({
                'ruleId': rule_id,
                'ruleName': rule_name,
                'severity': level,
                'message': message.replace('\n',' ').strip(),
                'filePath': file_path,
                'startLine': start_line if start_line is not None else '',
                'endLine': end_line if end_line is not None else '',
                'snippet': snippet.replace('\n',' ') if snippet else '',
                'tool': tool_name or '',
                'timestamp': timestamp
            })
    return rows


def write_csv(rows, outpath):
    fieldnames = ['ruleId','ruleName','severity','message','filePath','startLine','endLine','snippet','tool','timestamp']
    with open(outpath, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for r in rows:
            writer.writerow(r)


def write_markdown(rows, outpath):
    # create a Markdown table (limit snippet length)
    h = ['Rule ID','Rule Name','Severity','Message','File','Start','End','Snippet','Tool','Timestamp']
    lines = []
    lines.append('| ' + ' | '.join(h) + ' |')
    lines.append('| ' + ' | '.join(['---']*len(h)) + ' |')
    for r in rows:
        snippet = r.get('snippet','')
        if len(snippet) > 200:
            snippet = snippet[:197] + '...'
        row = [
            r.get('ruleId',''),
            r.get('ruleName',''),
            r.get('severity',''),
            r.get('message',''),
            r.get('filePath',''),
            str(r.get('startLine','')),
            str(r.get('endLine','')),
            snippet,
            r.get('tool',''),
            r.get('timestamp','')
        ]
        # escape pipes
        row = [c.replace('|','\|') if isinstance(c,str) else c for c in row]
        lines.append('| ' + ' | '.join(row) + ' |')
    with open(outpath, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))


def main():
    if len(sys.argv) < 2:
        print('Usage: python tools/sarif_to_table.py /path/to/file.sarif [output_dir]')
        sys.exit(2)
    infile = sys.argv[1]
    outdir = sys.argv[2] if len(sys.argv) > 2 else 'security-scans'
    if not os.path.exists(infile):
        print('File not found:', infile)
        sys.exit(1)
    os.makedirs(outdir, exist_ok=True)
    with open(infile, 'r', encoding='utf-8') as f:
        data = json.load(f)
    rows = extract_results(data)
    if not rows:
        print('No results found in SARIF file.')
    timestamp = datetime.now().strftime('%Y%m%d-%H%M%S')
    base = os.path.splitext(os.path.basename(infile))[0]
    csv_out = os.path.join(outdir, f'{base}-{timestamp}.csv')
    md_out = os.path.join(outdir, f'{base}-{timestamp}.md')
    write_csv(rows, csv_out)
    write_markdown(rows, md_out)
    print('Wrote', csv_out)
    print('Wrote', md_out)


if __name__ == '__main__':
    main()
