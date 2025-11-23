import sys
from pathlib import Path

try:
    import PyPDF2
except Exception:
    print('PyPDF2 not installed', file=sys.stderr)
    raise

pdf_path = Path('assets/amaan_resume.pdf')
if not pdf_path.exists():
    print('PDF not found at', pdf_path)
    sys.exit(2)

out_path = pdf_path.with_suffix('.txt')

text = []
with open(pdf_path, 'rb') as f:
    reader = PyPDF2.PdfReader(f)
    for i, page in enumerate(reader.pages):
        try:
            page_text = page.extract_text()
        except Exception:
            page_text = ''
        text.append(page_text or '')

full = '\n\n'.join(text)
with open(out_path, 'w', encoding='utf-8') as o:
    o.write(full)

print('Wrote extracted text to', out_path)
print('\n----- PREVIEW -----\n')
print(full[:2000])
