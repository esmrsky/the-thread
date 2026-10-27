#!/usr/bin/env python3
"""Writes the Russian page shell: src/10-shell.html with every visible English string swapped
for its Russian twin from src/ru/10-shell.json.

    python3 tools/ru-shell.py > build/ru-shell.html     (build.sh does this)

Each English fragment has to occur exactly `count` times (default 1) in the English shell, or
the build stops. That is the point: an edit to the English shell that the Russian table does not
know about fails here instead of leaving English text on the Russian page."""
import json
import os
import sys

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
shell = open(os.path.join(ROOT, 'src', '10-shell.html'), encoding='utf-8').read()
table = json.load(open(os.path.join(ROOT, 'src', 'ru', '10-shell.json'), encoding='utf-8'))

problems = []
for pair in table['pairs']:
    en, ru = pair[0], pair[1]
    want = pair[2] if len(pair) > 2 else 1
    found = shell.count(en)
    if found != want:
        problems.append('expected %d, found %d: %s' % (want, found, en[:90]))
        continue
    shell = shell.replace(en, ru)

if problems:
    sys.stderr.write('ru-shell: the English shell no longer matches src/ru/10-shell.json\n  ' +
                     '\n  '.join(problems) + '\n')
    sys.exit(1)
sys.stdout.write(shell)
