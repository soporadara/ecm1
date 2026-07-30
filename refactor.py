import os
import re

admin_dir = 'resources/js/Pages/Admin'

files_to_check = []
for root, dirs, files in os.walk(admin_dir):
    for file in files:
        if file.endswith('.tsx'):
            files_to_check.append(os.path.join(root, file))

modified_count = 0

for file_path in files_to_check:
    with open(file_path, 'r') as f:
        content = f.read()

    # Skip if no confirm used
    if 'confirm(' not in content:
        continue
        
    print(f"Refactoring {file_path}")
    
    # Add import
    if "import { confirmAction }" not in content:
        # Find first line starting with import
        lines = content.split('\n')
        for i, line in enumerate(lines):
            if line.startswith('import '):
                lines.insert(i, "import { confirmAction } from '@/Components/ConfirmModal';")
                break
        content = '\n'.join(lines)
        
    # Specifically targeting common handler names for safety
    content = re.sub(r'(const handle[A-Za-z0-9_]+\s*=\s*)\((.*?)\)\s*=>\s*{', r'\1async (\2) => {', content)
    content = re.sub(r'(const delete[A-Za-z0-9_]+\s*=\s*)\((.*?)\)\s*=>\s*{', r'\1async (\2) => {', content)
    content = re.sub(r'(const remove[A-Za-z0-9_]+\s*=\s*)\((.*?)\)\s*=>\s*{', r'\1async (\2) => {', content)
    
    # We must ensure not to duplicate async, e.g. `const fn = async async (...)`
    content = content.replace('async async', 'async')
    
    # Case 1: if (!confirm('...')) return;
    content = re.sub(r'if\s*\(!window\.confirm\((.*?)\)\)\s*return;', r'if (!(await confirmAction(\1))) return;', content)
    content = re.sub(r'if\s*\(!confirm\((.*?)\)\)\s*return;', r'if (!(await confirmAction(\1))) return;', content)
    
    # Case 2: if (confirm('...')) {
    content = re.sub(r'if\s*\(window\.confirm\((.*?)\)\)\s*{', r'if (await confirmAction(\1)) {', content)
    content = re.sub(r'if\s*\(confirm\((.*?)\)\)\s*{', r'if (await confirmAction(\1)) {', content)
    
    with open(file_path, 'w') as f:
        f.write(content)
        
    modified_count += 1

print(f"Refactored {modified_count} files.")
