// Instagram Carousel Publishing API
// Publishes carousel posts to Instagram via Facebook Graph API
import { NextResponse } from 'next/server';

const FB_GRAPH_API = 'https://graph.facebook.com/v21.0';

interface CarouselRequest {
  imageUrls: string[];  // Public URLs of images to post
  caption: string;
  accessToken?: string; // Override token if provided
}

interface MediaContainer {
  id: string;
}

// Create a media container for a single image
async function createImageContainer(
  igUserId: string,
  imageUrl: string,
  accessToken: string,
  isCarouselItem: boolean = true
): Promise<MediaContainer> {
  const params = new URLSearchParams({
    image_url: imageUrl,
    access_token: accessToken,
  });

  if (isCarouselItem) {
    params.append('is_carousel_item', 'true');
  }

  const response = await fetch(`${FB_GRAPH_API}/${igUserId}/media?${params}`, {
    method: 'POST',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Failed to create image container: ${JSON.stringify(error)}`);
  }

  return response.json();
}

// Check container status until ready
async function waitForContainerReady(
  containerId: string,
  accessToken: string,
  maxAttempts: number = 30
): Promise<boolean> {
  for (let i = 0; i < maxAttempts; i++) {
    const response = await fetch(
      `${FB_GRAPH_API}/${containerId}?fields=status_code&access_token=${accessToken}`
    );

    if (!response.ok) {
      throw new Error('Failed to check container status');
    }

    const data = await response.json();

    if (data.status_code === 'FINISHED') {
      return true;
    }

    if (data.status_code === 'ERROR') {
      throw new Error(`Container processing failed: ${data.status_code}`);
    }

    // Wait 2 seconds before checking again
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  throw new Error('Container processing timeout');
}

// Create carousel container from multiple image containers
async function createCarouselContainer(
  igUserId: string,
  childrenIds: string[],
  caption: string,
  accessToken: string
): Promise<MediaContainer> {
  const params = new URLSearchParams({
    media_type: 'CAROUSEL',
    children: childrenIds.join(','),
    caption: caption,
    access_token: accessToken,
  });

  const response = await fetch(`${FB_GRAPH_API}/${igUserId}/media?${params}`, {
    method: 'POST',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Failed to create carousel container: ${JSON.stringify(error)}`);
  }

  return response.json();
}

// Publish the carousel
async function publishCarousel(
  igUserId: string,
  carouselContainerId: string,
  accessToken: string
): Promise<{ id: string }> {
  const params = new URLSearchParams({
    creation_id: carouselContainerId,
    access_token: accessToken,
  });

  const response = await fetch(`${FB_GRAPH_API}/${igUserId}/media_publish?${params}`, {
    method: 'POST',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Failed to publish carousel: ${JSON.stringify(error)}`);
  }

  return response.json();
}

export async function POST(request: Request) {
  try {
    const body: CarouselRequest = await request.json();
    const { imageUrls, caption } = body;

    // Get credentials from environment or request
    const accessToken = body.accessToken || process.env.INSTAGRAM_ACCESS_TOKEN;
    const igUserId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;

    if (!accessToken) {
      return NextResponse.json(
        { success: false, error: 'Missing Instagram access token. Set INSTAGRAM_ACCESS_TOKEN in environment.' },
        { status: 401 }
      );
    }

    if (!igUserId) {
      return NextResponse.json(
        { success: false, error: 'Missing Instagram Business Account ID. Set INSTAGRAM_BUSINESS_ACCOUNT_ID in environment.' },
        { status: 401 }
      );
    }

    if (!imageUrls || imageUrls.length < 2 || imageUrls.length > 10) {
      return NextResponse.json(
        { success: false, error: 'Carousel requires 2-10 images' },
        { status: 400 }
      );
    }

    console.log(`Creating carousel with ${imageUrls.length} images...`);

    // Step 1: Create container for each image
    const containerIds: string[] = [];
    for (let i = 0; i < imageUrls.length; i++) {
      console.log(`Creating container for image ${i + 1}/${imageUrls.length}...`);
      const container = await createImageContainer(igUserId, imageUrls[i], accessToken);
      containerIds.push(container.id);

      // Wait for container to be ready
      await waitForContainerReady(container.id, accessToken);
      console.log(`Image ${i + 1} container ready: ${container.id}`);
    }

    // Step 2: Create carousel container
    console.log('Creating carousel container...');
    const carouselContainer = await createCarouselContainer(
      igUserId,
      containerIds,
      caption,
      accessToken
    );

    // Wait for carousel container to be ready
    await waitForContainerReady(carouselContainer.id, accessToken);
    console.log(`Carousel container ready: ${carouselContainer.id}`);

    // Step 3: Publish the carousel
    console.log('Publishing carousel...');
    const published = await publishCarousel(igUserId, carouselContainer.id, accessToken);

    console.log(`Carousel published! Post ID: ${published.id}`);

    return NextResponse.json({
      success: true,
      postId: published.id,
      message: `Carousel with ${imageUrls.length} images published successfully!`,
      instagramUrl: `https://www.instagram.com/p/${published.id}/`
    });

  } catch (error) {
    console.error('Instagram publish error:', error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}

// GET endpoint to check API status and credentials
export async function GET() {
  const hasToken = !!process.env.INSTAGRAM_ACCESS_TOKEN;
  const hasAccountId = !!process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;

  return NextResponse.json({
    status: 'Instagram API endpoint ready',
    configured: hasToken && hasAccountId,
    missing: [
      !hasToken && 'INSTAGRAM_ACCESS_TOKEN',
      !hasAccountId && 'INSTAGRAM_BUSINESS_ACCOUNT_ID',
    ].filter(Boolean),
    usage: {
      method: 'POST',
      body: {
        imageUrls: ['https://example.com/image1.jpg', '...'],
        caption: 'Your carousel caption with #hashtags',
      },
    },
  });
}
