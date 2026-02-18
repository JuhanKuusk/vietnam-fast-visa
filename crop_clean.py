#!/usr/bin/env python3
"""
Crop grid image with larger margins to completely remove white borders.
"""
from PIL import Image
import os

REELS_WIDTH = 1080
REELS_HEIGHT = 1920
OUTPUT_DIR = "/Users/JuhanKuusk/DEVELOPMENT/Vietnam Visa/app/public"

def find_grid_image():
    base = "/Users/JuhanKuusk/DEVELOPMENT/Vietnam Visa/app/public"
    for f in os.listdir(base):
        if "Visa approval" in f and f.endswith(".png") and "slide" not in f and "reel" not in f:
            return os.path.join(base, f)
    return None

def crop_grid(input_path):
    """Crop 2x2 grid with larger margins to remove all white borders."""
    img = Image.open(input_path)
    width, height = img.size
    print(f"Original grid: {width}x{height}")

    # Grid is 1024x1536
    # Each quadrant should be ~512x768 but has white borders
    # The white border/gap is about 16px total (8px on each side)

    half_w = width // 2   # 512
    half_h = height // 2  # 768

    # Crop more aggressively - take 16px off each internal edge
    margin = 16

    # Define crop boxes (left, top, right, bottom)
    crops = [
        # Top-left: keep left/top edges, trim right/bottom edges
        (0, 0, half_w - margin, half_h - margin),
        # Top-right: trim left edge, keep right edge, trim bottom
        (half_w + margin, 0, width, half_h - margin),
        # Bottom-left: keep left, trim top, trim right, keep bottom
        (0, half_h + margin, half_w - margin, height),
        # Bottom-right: trim left/top, keep right/bottom
        (half_w + margin, half_h + margin, width, height),
    ]

    for i, box in enumerate(crops, 1):
        cropped = img.crop(box)
        cropped_w, cropped_h = cropped.size
        print(f"\nSlide {i}: cropped to {cropped_w}x{cropped_h}")

        # Resize to Reels format
        final = cropped.resize((REELS_WIDTH, REELS_HEIGHT), Image.Resampling.LANCZOS)

        output_path = os.path.join(OUTPUT_DIR, f"reel_slide_{i}.jpg")
        final.save(output_path, "JPEG", quality=95)

        size_kb = os.path.getsize(output_path) / 1024
        print(f"Saved: {output_path} ({size_kb:.0f}KB)")

if __name__ == "__main__":
    grid_path = find_grid_image()
    if grid_path:
        print(f"Processing: {grid_path}")
        crop_grid(grid_path)
        print("\nDone!")
    else:
        print("Grid image not found")
