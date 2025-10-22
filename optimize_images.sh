#!/bin/bash
# Image Optimization Script for Legion's Rise Quest
# Optimizes background images and thumbnails while maintaining quality

cd /home/fridgerova/.cursor-tutor/legion_rise/public

echo "🎨 IMAGE OPTIMIZATION REPORT"
echo "=============================="
echo ""

# Function to optimize and report
optimize_bg() {
  local file=$1
  local quality=$2
  local max_width=$3
  
  echo "Processing: $file"
  local original_size=$(du -h "$file" | cut -f1)
  
  # Optimize: resize to max width, reduce quality, strip metadata
  convert "$file" \
    -resize "${max_width}x>" \
    -quality ${quality} \
    -strip \
    "${file}.tmp" && mv "${file}.tmp" "$file"
  
  local new_size=$(du -h "$file" | cut -f1)
  echo "  Before: $original_size → After: $new_size"
  echo ""
}

optimize_thumbnail() {
  local file=$1
  local quality=$2
  local max_size=$3
  
  echo "Processing: $file"
  local original_size=$(du -h "$file" | cut -f1)
  
  # Optimize: resize to max dimensions, reduce quality, strip metadata
  convert "$file" \
    -resize "${max_size}x${max_size}>" \
    -quality ${quality} \
    -strip \
    "${file}.tmp" && mv "${file}.tmp" "$file"
  
  local new_size=$(du -h "$file" | cut -f1)
  echo "  Before: $original_size → After: $new_size"
  echo ""
}

echo "📸 OPTIMIZING BACKGROUND IMAGES"
echo "Target: 1920px width, 82% quality"
echo "--------------------------------"

# Background images - reduce to 1920px width, 82% quality
for bg in stage1-bg.png stage2-bg.png stage3-bg.png stage4-bg.png stage5-bg.png final-bg.png; do
  if [ -f "$bg" ]; then
    optimize_bg "$bg" 82 1920
  fi
done

# Colosseum image
if [ -f "colosseum-sunset.jpg" ]; then
  optimize_bg "colosseum-sunset.jpg" 85 1920
fi

# Parchment scroll
if [ -f "parchment-scroll.png" ]; then
  optimize_bg "parchment-scroll.png" 85 1200
fi

echo ""
echo "🖼️  OPTIMIZING ENEMY THUMBNAILS"
echo "Target: 512px, 88% quality"
echo "--------------------------------"

# Enemy thumbnails - reduce to 512px, 88% quality
for enemy in enemies/beastmaster.png enemies/tigress.png enemies/archer.png; do
  if [ -f "$enemy" ]; then
    optimize_thumbnail "$enemy" 88 512
  fi
done

echo ""
echo "🔐 OPTIMIZING ENCRYPTED IMAGES"
echo "Target: 1024px, 85% quality"
echo "--------------------------------"

# Encrypted images - reduce to 1024px, 85% quality (must maintain steganography!)
for enc in enemies/beastmaster_enc.png enemies/tigress_enc.png enemies/archer_enc.png; do
  if [ -f "$enc" ]; then
    echo "⚠️  SKIPPING: $enc (contains steganography data)"
  fi
done

echo ""
echo "✅ OPTIMIZATION COMPLETE!"
echo ""
echo "📊 FINAL SIZES:"
du -sh .
echo ""
echo "Backup location: ../image_backups/"

