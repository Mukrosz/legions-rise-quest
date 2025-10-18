#!/usr/bin/env python3
"""
Create placeholder enemy images for Stage 2 testing
These are simple colored squares with text - replace with real artwork later
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_placeholder(filename, color, title, size=500):
    """Create a colored placeholder image with text"""
    # Create image
    img = Image.new('RGB', (size, size), color=color)
    draw = ImageDraw.Draw(img)
    
    # Try to use a nice font, fall back to default
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 40)
        small_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 24)
    except:
        font = ImageFont.load_default()
        small_font = font
    
    # Draw title
    bbox = draw.textbbox((0, 0), title, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    x = (size - text_width) // 2
    y = (size - text_height) // 2 - 40
    
    # Shadow
    draw.text((x+2, y+2), title, fill=(0, 0, 0), font=font)
    # Main text
    draw.text((x, y), title, fill=(255, 255, 255), font=font)
    
    # Add subtitle
    subtitle = "PLACEHOLDER"
    bbox2 = draw.textbbox((0, 0), subtitle, font=small_font)
    text_width2 = bbox2[2] - bbox2[0]
    x2 = (size - text_width2) // 2
    y2 = y + text_height + 20
    draw.text((x2+1, y2+1), subtitle, fill=(0, 0, 0), font=small_font)
    draw.text((x2, y2), subtitle, fill=(200, 200, 200), font=small_font)
    
    # Save
    output_dir = '../public/enemies/'
    os.makedirs(output_dir, exist_ok=True)
    output_path = os.path.join(output_dir, filename)
    img.save(output_path, 'PNG')
    print(f"✓ Created {output_path}")

def main():
    print("Creating placeholder enemy images...")
    print()
    
    # Beastmaster - dark brown/orange (rhino/earth tones)
    create_placeholder('beastmaster.png', (139, 69, 19), 'BEASTMASTER')
    
    # Tigress - white/orange (fire tones)
    create_placeholder('tigress.png', (255, 140, 0), 'TIGRESS')
    
    # Archer - red/brown (desert tones)
    create_placeholder('archer.png', (178, 34, 34), 'ARCHER')
    
    print()
    print("✓ All placeholders created in public/enemies/")
    print()
    print("These are temporary placeholders for testing.")
    print("Replace with real artwork when ready, then encode with stego_encoder.py")

if __name__ == '__main__':
    main()

