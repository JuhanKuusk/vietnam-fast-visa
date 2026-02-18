#!/usr/bin/env python3
"""
Remove white borders from images and resize to Instagram Reels format.
"""
from PIL import Image, ImageChops
import os

REELS_WIDTH = 1080
REELS_HEIGHT = 1920
OUTPUT_DIR = "/Users/JuhanKuusk/DEVELOPMENT/Vietnam Visa/app/public"

def trim_white_borders(img, threshold=250):
    """Remove white/near-white borders from image."""
    # Convert to RGB if needed
    if img.mode != 'RGB':
        img = img.convert('RGB')

    # Get image data
    width, height = img.size
    pixels = img.load()

    # Find boundaries (where non-white content starts)
    left = 0
    right = width
    top = 0
    bottom = height

    # Find left boundary
    for x in range(width):
        found_content = False
        for y in range(height):
            r, g, b = pixels[x, y]
            if r < threshold or g < threshold or b < threshold:
                found_content = True
                break
        if found_content:
            left = x
            break

    # Find right boundary
    for x in range(width - 1, -1, -1):
        found_content = False
        for y in range(height):
            r, g, b = pixels[x, y]
            if r < threshold or g < threshold or b < threshold:
                found_content = True
                break
        if found_content:
            right = x + 1
            break

    # Find top boundary
    for y in range(height):
        found_content = False
        for x in range(width):
            r, g, b = pixels[x, y]
            if r < threshold or g < threshold or b < threshold:
                found_content = True
                break
        if found_content:
            top = y
            break

    # Find bottom boundary
    for y in range(height - 1, -1, -1):
        found_content = False
        for x in range(width):
            r, g, b = pixels[x, y]
            if r < threshold or g < threshold or b < threshold:
                found_content = True
                break
        if found_content:
            bottom = y + 1
            break

    print(f"  Trimming: left={left}, top={top}, right={right}, bottom={bottom}")
    print(f"  Original: {width}x{height} -> Trimmed: {right-left}x{bottom-top}")

    return img.crop((left, top, right, bottom))

def process_image(input_path, output_path):
    """Load image, trim borders, resize to Reels format, save."""
    print(f"\nProcessing: {os.path.basename(input_path)}")

    img = Image.open(input_path)
    print(f"  Original size: {img.size}")

    # Trim white borders
    trimmed = trim_white_borders(img)

    # Resize to exact Reels format
    resized = trimmed.resize((REELS_WIDTH, REELS_HEIGHT), Image.Resampling.LANCZOS)

    # Save as high-quality JPEG
    resized.save(output_path, "JPEG", quality=95)

    file_size = os.path.getsize(output_path) / 1024
    print(f"  Final: {resized.size}, File: {file_size:.1f}KB")
    print(f"  Saved: {output_path}")

if __name__ == "__main__":
    # Process each reel image
    for i in range(1, 5):
        input_path = f"{OUTPUT_DIR}/vietnam_visa_reel_{i}.jpg"
        output_path = f"{OUTPUT_DIR}/vietnam_reel_{i}_clean.jpg"

        if os.path.exists(input_path):
            process_image(input_path, output_path)
        else:
            print(f"File not found: {input_path}")

    print("\nDone! Created clean versions without white borders.")
