#!/bin/sh
# Builds the site from src/ parts:
#   index.html          — standalone site (open it, or host it anywhere)
#   build/artifact.html — same content without the document wrapper (for Claude artifact preview)
set -e
cd "$(dirname "$0")"

JS_FILES="src/20-icons.js src/21-data-threads.js src/22-data-pattern.js src/23-data-codes.js src/24-data-walking.js src/25-data-mind.js src/26-data-triune.js src/30-app.js"

{
  printf '<title>The Thread — A Field Manual to the Bible</title>\n<style>\n'
  cat src/00-style.css
  printf '</style>\n'
  cat src/10-shell.html
  printf '<script>\n'
  cat $JS_FILES
  printf '\n</script>\n'
} > build/artifact.html

{
  printf '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>The Thread — A Field Manual to the Bible</title>\n<meta name="description" content="Maps of the threads, patterns, and codes that tie the whole Bible together — all of it pointing to Jesus.">\n<style>\n'
  cat src/00-style.css
  printf '</style>\n</head>\n<body>\n'
  cat src/10-shell.html
  printf '<script>\n'
  cat $JS_FILES
  printf '\n</script>\n</body>\n</html>\n'
} > index.html

echo "Built index.html ($(wc -c < index.html | tr -d ' ') bytes) and build/artifact.html"
