#!/usr/bin/env bash
# Regenerates per-page HTML shells (clean URLs), sitemap.xml and robots.txt.
# Usage from repo root: SITE=https://your-domain/ bash scripts/generate-pages.sh
set -e
SITE="${SITE:-https://engineerbelalaymanahmed.github.io/}"; N="Engineer Belal Ayman Ahmed"; : > sitemap.tmp
gen(){ d="$1"; root="./"; out="index.html"; pg="home"; u=""
  if [ -n "$d" ]; then mkdir -p "$d"; root="../"; out="$d/index.html"; pg="$d"; u="$d/"; fi
  sed -e "s~{{ROOT}}~$root~g" -e "s~{{PAGE}}~$pg~g" -e "s~{{TITLE}}~$2~g" -e "s~{{DESC}}~$3~g" -e "s~{{SITE}}~$SITE~g" -e "s~{{PATH}}~$u~g" scripts/template.html > "$out"
  echo "<url><loc>${SITE}${u}</loc></url>" >> sitemap.tmp; }
gen "" "$N - Cybersecurity and Digital Marketing" "Cybersecurity researcher in ethical hacking and OSINT, and digital marketing strategist. Building secure digital solutions."
gen information "About - $N" "Skills, services and professional profile of cybersecurity researcher and digital marketing strategist Belal Ayman Ahmed."
gen portfolio "Portfolio - $N" "Projects and case studies in cybersecurity research and digital marketing."
gen certifications "Certifications - $N" "Searchable gallery of professional certifications and credentials."
gen social "Social Hub - $N" "All professional and personal accounts in one place."
gen contact "Contact - $N" "Professional email, phone, WhatsApp and Telegram for Engineer Belal Ayman Ahmed."
printf '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n%s\n</urlset>\n' "$(cat sitemap.tmp)" > sitemap.xml; rm sitemap.tmp
printf 'User-agent: *\nAllow: /\nSitemap: %ssitemap.xml\n' "$SITE" > robots.txt
