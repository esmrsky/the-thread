#!/bin/sh
# Builds the site from src/ parts:
#   index.html          — standalone site (open it, or host it anywhere)
#   build/artifact.html — same content without the document wrapper (for Claude artifact preview)
set -e
cd "$(dirname "$0")"

JS_FILES="src/20-icons.js src/21-data-threads.js src/22-data-pattern.js src/23-data-codes.js src/24-data-walking.js src/25-data-mind.js src/26-data-triune.js src/30-app.js"

{
  printf '<title>The Thread — A Field Manual to the Bible</title>\n<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible+Next:ital,wght@0,400..800;1,400..700&amp;family=Figtree:ital,wght@0,400..900;1,400..700&amp;family=Literata:ital,opsz,wght@0,7..72,400..800;1,7..72,400..700&amp;family=Source+Serif+4:ital,opsz,wght@0,8..60,400..800;1,8..60,400..700&amp;display=swap">\n<style>\n'
  cat src/00-style.css
  printf '</style>\n'
  cat src/10-shell.html
  printf '<script>\n'
  cat $JS_FILES
  printf '\n</script>\n'
} > build/artifact.html

{
  printf '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>The Thread — A Field Manual to the Bible</title>\n<meta name="description" content="Maps of the threads, patterns, and codes that tie the whole Bible together — all of it pointing to Jesus.">\n<link rel="icon" href="data:image/svg+xml,%%3Csvg xmlns=%%27http://www.w3.org/2000/svg%%27 viewBox=%%270 0 24 24%%27%%3E%%3Cpath d=%%27M2 18c4.5 0 3.5-9 7.5-9s2.5 8 7 8%%27 fill=%%27none%%27 stroke=%%27%%23e05a66%%27 stroke-width=%%272.2%%27 stroke-linecap=%%27round%%27 stroke-dasharray=%%273 2.4%%27/%%3E%%3Cpath d=%%27M18.6 4.3v8.9M16.2 7.2h4.8%%27 fill=%%27none%%27 stroke=%%27%%23cfa648%%27 stroke-width=%%272.4%%27 stroke-linecap=%%27round%%27/%%3E%%3C/svg%%3E">\n<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible+Next:ital,wght@0,400..800;1,400..700&amp;family=Figtree:ital,wght@0,400..900;1,400..700&amp;family=Literata:ital,opsz,wght@0,7..72,400..800;1,7..72,400..700&amp;family=Source+Serif+4:ital,opsz,wght@0,8..60,400..800;1,8..60,400..700&amp;display=swap">\n<style>\n'
  cat src/00-style.css
  printf '</style>\n</head>\n<body>\n'
  cat src/10-shell.html
  printf '<script>\n'
  cat $JS_FILES
  printf '\n</script>\n</body>\n</html>\n'
} > index.html

echo "Built index.html ($(wc -c < index.html | tr -d ' ') bytes) and build/artifact.html"
