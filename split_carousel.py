#!/usr/bin/env python3
"""
Split a 2x2 grid image into 4 separate Instagram carousel slides.
Usage: python3 split_carousel.py input_image.jpg
"""
import sys
from PIL import Image
import os

def split_grid(input_path):
    # Open the image
    img = Image.open(input_path)
    width, height = img.size

    # Calculate half dimensions
    half_width = width // 2
    half_height = height // 2

    # Get the base name without extension
    base_name = os.path.splitext(input_path)[0]
    ext = os.path.splitext(input_path)[1]

    # Define the 4 quadrants (left, upper, right, lower)
    quadrants = [
        (0, 0, half_width, half_height),           # Top-left (slide 1)
        (half_width, 0, width, half_height),       # Top-right (slide 2)
        (0, half_height, half_width, height),      # Bottom-left (slide 3)
        (half_width, half_height, width, height),  # Bottom-right (slide 4)
    ]

    output_files = []
    for i, box in enumerate(quadrants, 1):
        cropped = img.crop(box)
        output_path = f"{base_name}_slide{i}{ext}"
        cropped.save(output_path, quality=95)
        output_files.append(output_path)
        print(f"Created: {output_path} ({cropped.size[0]}x{cropped.size[1]})")

    return output_files

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 split_carousel.py input_image.jpg")
        sys.exit(1)

    input_file = sys.argv[1]
    if not os.path.exists(input_file):
        print(f"Error: File not found: {input_file}")
        sys.exit(1)

    output_files = split_grid(input_file)
    print(f"\nDone! Created {len(output_files)} slides.")
