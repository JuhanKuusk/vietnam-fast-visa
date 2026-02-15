// Image Upload API for Instagram
// Accepts PNG/JPEG, converts to JPEG if needed, and stores for Instagram API access
import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import sharp from 'sharp';

// Store images temporarily in public folder for Instagram API access
const UPLOAD_DIR = join(process.cwd(), 'public', 'instagram-uploads');

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    const fileName = formData.get('fileName') as string || 'image';

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No image file provided' },
        { status: 400 }
      );
    }

    // Ensure upload directory exists
    await mkdir(UPLOAD_DIR, { recursive: true });

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const timestamp = Date.now();
    const safeFileName = fileName.replace(/[^a-zA-Z0-9-_]/g, '-');
    const jpegFileName = `${safeFileName}-${timestamp}.jpg`;
    const filePath = join(UPLOAD_DIR, jpegFileName);

    // Convert to JPEG using sharp (handles PNG, WEBP, etc.)
    await sharp(buffer)
      .jpeg({
        quality: 90,
        mozjpeg: true, // Better compression
      })
      .resize({
        width: 1080,
        height: 1350,
        fit: 'inside',
        withoutEnlargement: true,
      })
      .toFile(filePath);

    // Generate public URL
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kehastuudio.ee';
    const publicUrl = `${siteUrl}/instagram-uploads/${jpegFileName}`;

    console.log(`Image uploaded: ${publicUrl}`);

    return NextResponse.json({
      success: true,
      fileName: jpegFileName,
      url: publicUrl,
      message: 'Image converted to JPEG and uploaded',
    });

  } catch (error) {
    console.error('Image upload error:', error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}

// Batch upload multiple images
export async function PUT(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('images') as File[];
    const baseName = formData.get('baseName') as string || 'carousel';

    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No images provided' },
        { status: 400 }
      );
    }

    await mkdir(UPLOAD_DIR, { recursive: true });

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kehastuudio.ee';
    const uploadedUrls: string[] = [];
    const timestamp = Date.now();

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const safeBaseName = baseName.replace(/[^a-zA-Z0-9-_]/g, '-');
      const jpegFileName = `${safeBaseName}-slide-${i + 1}-${timestamp}.jpg`;
      const filePath = join(UPLOAD_DIR, jpegFileName);

      await sharp(buffer)
        .jpeg({
          quality: 90,
          mozjpeg: true,
        })
        .resize({
          width: 1080,
          height: 1350,
          fit: 'inside',
          withoutEnlargement: true,
        })
        .toFile(filePath);

      const publicUrl = `${siteUrl}/instagram-uploads/${jpegFileName}`;
      uploadedUrls.push(publicUrl);

      console.log(`Uploaded slide ${i + 1}: ${publicUrl}`);
    }

    return NextResponse.json({
      success: true,
      count: uploadedUrls.length,
      urls: uploadedUrls,
      message: `${uploadedUrls.length} images converted and uploaded`,
    });

  } catch (error) {
    console.error('Batch upload error:', error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
