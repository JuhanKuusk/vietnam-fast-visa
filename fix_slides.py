#!/usr/bin/env python3
"""
Fix slide images by removing white borders and resizing to exact Instagram Reels format (1080x1920).
"""
from PIL import Image
import os

# Instagram Reels dimensions
REELS_WIDTH = 1080
REELS_HEIGHT = 1920

def get_grid_image_path():
    base = "/Users/JuhanKuusk/DEVELOPMENT/Vietnam Visa/app/public"
    for f in os.listdir(base):
        if "Visa approval" in f and f.endswith(".png") and "slide" not in f:
            return os.path.join(base, f)
    return None

def split_grid_without_borders(input_path, output_dir):
    """Split 2x2 grid image, removing the white border between images."""
    img = Image.open(input_path)
    width, height = img.size
    print(f"Original grid size: {width}x{height}")

    # The grid has white lines between images
    # We need to find the actual content areas
    # Looking at the image, the border appears to be about 12-15 pixels

    half_width = width // 2
    half_height = height // 2

    # Border/gap size to skip (estimate ~15px on each side of the center line)
    border = 8

    # Define crop boxes that exclude the white borders
    # (left, upper, right, lower)
    quadrants = [
        # Top-left: start at 0, end before center-border
        (0, 0, half_width - border, half_height - border),
        # Top-right: start after center+border, end at width
        (half_width + border, 0, width, half_height - border),
        # Bottom-left
        (0, half_height + border, half_width - border, height),
        # Bottom-right
        (half_width + border, half_height + border, width, height),
    ]

    output_files = []
    for i, box in enumerate(quadrants, 1):
        cropped = img.crop(box)

        # Resize to exact Reels format (1080x1920) using high-quality resampling
        resized = cropped.resize((REELS_WIDTH, REELS_HEIGHT), Image.Resampling.LANCZOS)

        # Save as high-quality JPEG
        output_path = os.path.join(output_dir, f"vietnam_visa_reel_{i}.jpg")
        resized.save(output_path, "JPEG", quality=95)

        file_size = os.path.getsize(output_path) / 1024
        print(f"Created: {output_path}")
        print(f"  Cropped from: {box} -> {cropped.size}")
        print(f"  Final size: {resized.size}, File: {file_size:.1f}KB")
        output_files.append(output_path)

    return output_files

if __name__ == "__main__":
    input_file = get_grid_image_path()
    if not input_file:
        print("Error: Could not find grid image")
        exit(1)

    print(f"Processing: {input_file}")
    output_dir = "/Users/JuhanKuusk/DEVELOPMENT/Vietnam Visa/app/public"

    output_files = split_grid_without_borders(input_file, output_dir)
    print(f"\nDone! Created {len(output_files)} slides without white borders.")
