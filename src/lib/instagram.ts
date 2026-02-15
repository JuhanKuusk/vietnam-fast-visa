/**
 * Instagram Graph API Service
 * For posting images and carousels to Instagram Business Account
 *
 * Requirements:
 * 1. Facebook App with Instagram Graph API permissions
 * 2. Instagram Business Account connected to Facebook Page
 * 3. Long-lived access token with permissions:
 *    - instagram_basic
 *    - instagram_content_publish
 *    - pages_read_engagement
 */

const INSTAGRAM_API_VERSION = 'v18.0';
const INSTAGRAM_API_BASE = `https://graph.facebook.com/${INSTAGRAM_API_VERSION}`;

interface InstagramConfig {
  accessToken: string;
  instagramAccountId: string;
}

interface MediaContainerResponse {
  id: string;
}

interface PublishResponse {
  id: string;
}

interface InstagramError {
  error: {
    message: string;
    type: string;
    code: number;
    error_subcode?: number;
    fbtrace_id: string;
  };
}

/**
 * Get Instagram configuration from environment variables
 */
export function getInstagramConfig(): InstagramConfig {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const instagramAccountId = process.env.INSTAGRAM_ACCOUNT_ID;

  if (!accessToken) {
    throw new Error('INSTAGRAM_ACCESS_TOKEN environment variable is not set');
  }
  if (!instagramAccountId) {
    throw new Error('INSTAGRAM_ACCOUNT_ID environment variable is not set');
  }

  return { accessToken, instagramAccountId };
}

/**
 * Create a media container for a single image
 * Images must be hosted at a publicly accessible URL
 */
export async function createImageContainer(
  imageUrl: string,
  caption?: string
): Promise<string> {
  const { accessToken, instagramAccountId } = getInstagramConfig();

  const params = new URLSearchParams({
    image_url: imageUrl,
    access_token: accessToken,
  });

  if (caption) {
    params.append('caption', caption);
  }

  const response = await fetch(
    `${INSTAGRAM_API_BASE}/${instagramAccountId}/media?${params.toString()}`,
    { method: 'POST' }
  );

  const data = await response.json();

  if (!response.ok) {
    const error = data as InstagramError;
    throw new Error(`Instagram API Error: ${error.error.message}`);
  }

  return (data as MediaContainerResponse).id;
}

/**
 * Create a carousel item container (for use in carousel posts)
 * Must be created before the carousel container
 */
export async function createCarouselItemContainer(
  imageUrl: string,
  isVideo: boolean = false
): Promise<string> {
  const { accessToken, instagramAccountId } = getInstagramConfig();

  const params = new URLSearchParams({
    is_carousel_item: 'true',
    access_token: accessToken,
  });

  if (isVideo) {
    params.append('media_type', 'VIDEO');
    params.append('video_url', imageUrl);
  } else {
    params.append('image_url', imageUrl);
  }

  const response = await fetch(
    `${INSTAGRAM_API_BASE}/${instagramAccountId}/media?${params.toString()}`,
    { method: 'POST' }
  );

  const data = await response.json();

  if (!response.ok) {
    const error = data as InstagramError;
    throw new Error(`Instagram API Error: ${error.error.message}`);
  }

  return (data as MediaContainerResponse).id;
}

/**
 * Create a carousel container with multiple items
 * @param childrenIds - Array of media container IDs (2-10 items)
 * @param caption - Caption for the carousel post
 */
export async function createCarouselContainer(
  childrenIds: string[],
  caption?: string
): Promise<string> {
  const { accessToken, instagramAccountId } = getInstagramConfig();

  if (childrenIds.length < 2 || childrenIds.length > 10) {
    throw new Error('Carousel must have between 2 and 10 items');
  }

  const params = new URLSearchParams({
    media_type: 'CAROUSEL',
    children: childrenIds.join(','),
    access_token: accessToken,
  });

  if (caption) {
    params.append('caption', caption);
  }

  const response = await fetch(
    `${INSTAGRAM_API_BASE}/${instagramAccountId}/media?${params.toString()}`,
    { method: 'POST' }
  );

  const data = await response.json();

  if (!response.ok) {
    const error = data as InstagramError;
    throw new Error(`Instagram API Error: ${error.error.message}`);
  }

  return (data as MediaContainerResponse).id;
}

/**
 * Check the status of a media container
 * Container must be in FINISHED state before publishing
 */
export async function checkContainerStatus(
  containerId: string
): Promise<{ status: string; status_code?: string }> {
  const { accessToken } = getInstagramConfig();

  const params = new URLSearchParams({
    fields: 'status,status_code',
    access_token: accessToken,
  });

  const response = await fetch(
    `${INSTAGRAM_API_BASE}/${containerId}?${params.toString()}`
  );

  const data = await response.json();

  if (!response.ok) {
    const error = data as InstagramError;
    throw new Error(`Instagram API Error: ${error.error.message}`);
  }

  return data;
}

/**
 * Wait for a media container to be ready for publishing
 * Polls the status every 5 seconds, timeout after 5 minutes
 */
export async function waitForContainerReady(
  containerId: string,
  maxWaitMs: number = 300000
): Promise<void> {
  const startTime = Date.now();
  const pollInterval = 5000; // 5 seconds

  while (Date.now() - startTime < maxWaitMs) {
    const status = await checkContainerStatus(containerId);

    if (status.status_code === 'FINISHED') {
      return;
    }

    if (status.status_code === 'ERROR') {
      throw new Error(`Container processing failed: ${status.status}`);
    }

    // Wait before next poll
    await new Promise((resolve) => setTimeout(resolve, pollInterval));
  }

  throw new Error('Timeout waiting for container to be ready');
}

/**
 * Publish a media container to Instagram
 * Container must be in FINISHED state
 */
export async function publishMedia(containerId: string): Promise<string> {
  const { accessToken, instagramAccountId } = getInstagramConfig();

  const params = new URLSearchParams({
    creation_id: containerId,
    access_token: accessToken,
  });

  const response = await fetch(
    `${INSTAGRAM_API_BASE}/${instagramAccountId}/media_publish?${params.toString()}`,
    { method: 'POST' }
  );

  const data = await response.json();

  if (!response.ok) {
    const error = data as InstagramError;
    throw new Error(`Instagram API Error: ${error.error.message}`);
  }

  return (data as PublishResponse).id;
}

/**
 * Post a single image to Instagram
 * @param imageUrl - Publicly accessible URL of the image
 * @param caption - Caption for the post
 */
export async function postSingleImage(
  imageUrl: string,
  caption?: string
): Promise<string> {
  // Create container
  const containerId = await createImageContainer(imageUrl, caption);

  // Wait for processing
  await waitForContainerReady(containerId);

  // Publish
  const mediaId = await publishMedia(containerId);

  return mediaId;
}

/**
 * Post a carousel to Instagram
 * @param imageUrls - Array of publicly accessible image URLs (2-10)
 * @param caption - Caption for the carousel post
 */
export async function postCarousel(
  imageUrls: string[],
  caption?: string
): Promise<string> {
  if (imageUrls.length < 2 || imageUrls.length > 10) {
    throw new Error('Carousel must have between 2 and 10 images');
  }

  // Create carousel item containers for each image
  const childrenIds: string[] = [];
  for (const imageUrl of imageUrls) {
    const childId = await createCarouselItemContainer(imageUrl);
    childrenIds.push(childId);

    // Small delay between requests to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  // Wait for all children to be ready
  for (const childId of childrenIds) {
    await waitForContainerReady(childId);
  }

  // Create carousel container
  const carouselContainerId = await createCarouselContainer(childrenIds, caption);

  // Wait for carousel container to be ready
  await waitForContainerReady(carouselContainerId);

  // Publish
  const mediaId = await publishMedia(carouselContainerId);

  return mediaId;
}

/**
 * Get Instagram account info (for testing connection)
 */
export async function getAccountInfo(): Promise<{
  id: string;
  username: string;
  name: string;
  profile_picture_url?: string;
}> {
  const { accessToken, instagramAccountId } = getInstagramConfig();

  const params = new URLSearchParams({
    fields: 'id,username,name,profile_picture_url',
    access_token: accessToken,
  });

  const response = await fetch(
    `${INSTAGRAM_API_BASE}/${instagramAccountId}?${params.toString()}`
  );

  const data = await response.json();

  if (!response.ok) {
    const error = data as InstagramError;
    throw new Error(`Instagram API Error: ${error.error.message}`);
  }

  return data;
}

/**
 * Refresh a long-lived token (tokens last 60 days, should refresh before expiry)
 * Call this periodically to keep your access token valid
 */
export async function refreshAccessToken(currentToken: string): Promise<{
  access_token: string;
  token_type: string;
  expires_in: number;
}> {
  const params = new URLSearchParams({
    grant_type: 'ig_refresh_token',
    access_token: currentToken,
  });

  const response = await fetch(
    `${INSTAGRAM_API_BASE}/refresh_access_token?${params.toString()}`
  );

  const data = await response.json();

  if (!response.ok) {
    const error = data as InstagramError;
    throw new Error(`Instagram API Error: ${error.error.message}`);
  }

  return data;
}

/**
 * Create a Reels container for video upload
 * @param videoUrl - Publicly accessible URL of the video (MP4)
 * @param caption - Caption for the Reel
 * @param coverUrl - Optional cover image URL
 * @param shareToFeed - Whether to share to feed (default true)
 */
export async function createReelsContainer(
  videoUrl: string,
  caption?: string,
  coverUrl?: string,
  shareToFeed: boolean = true
): Promise<string> {
  const { accessToken, instagramAccountId } = getInstagramConfig();

  const params = new URLSearchParams({
    media_type: 'REELS',
    video_url: videoUrl,
    access_token: accessToken,
  });

  if (caption) {
    params.append('caption', caption);
  }

  if (coverUrl) {
    params.append('cover_url', coverUrl);
  }

  // share_to_feed defaults to true, only set if false
  if (!shareToFeed) {
    params.append('share_to_feed', 'false');
  }

  const response = await fetch(
    `${INSTAGRAM_API_BASE}/${instagramAccountId}/media?${params.toString()}`,
    { method: 'POST' }
  );

  const data = await response.json();

  if (!response.ok) {
    const error = data as InstagramError;
    throw new Error(`Instagram API Error: ${error.error.message}`);
  }

  return (data as MediaContainerResponse).id;
}

/**
 * Post a Reel to Instagram
 * @param videoUrl - Publicly accessible URL of the video (MP4)
 * @param caption - Caption for the Reel
 * @param coverUrl - Optional cover image URL
 * @param shareToFeed - Whether to also share to feed (default true)
 */
export async function postReel(
  videoUrl: string,
  caption?: string,
  coverUrl?: string,
  shareToFeed: boolean = true
): Promise<string> {
  // Create container
  const containerId = await createReelsContainer(videoUrl, caption, coverUrl, shareToFeed);

  // Wait for processing (videos take longer)
  await waitForContainerReady(containerId, 600000); // 10 minute timeout for videos

  // Publish
  const mediaId = await publishMedia(containerId);

  return mediaId;
}
