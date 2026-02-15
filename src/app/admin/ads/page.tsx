'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import JSZip from 'jszip';

// Simple password for admin access
const ADMIN_PASSWORD = 'vietnamvisa2024';

interface BlobFile {
  url: string;
  pathname: string;
  uploadedAt: string;
}

interface CarouselGroup {
  timestamp: string;
  files: BlobFile[];
  date: Date;
  format?: string; // e.g., "IG Story", "IG Post", "FB"
  isEditing?: boolean; // Track if carousel is in edit mode
}

interface VideoFile {
  url: string;
  pathname: string;
  uploadedAt: string;
  size?: number;
}

interface ZipImageGroup {
  format: string;
  images: { name: string; blob: Blob; id: string }[];
  caption?: string;
  link?: string;
}

interface LibraryImage {
  url: string;
  pathname: string;
  uploadedAt: string;
}

interface Draft {
  id: string;
  createdAt: string;
  updatedAt: string;
  format: 'post' | 'story' | 'reel';
  imageUrls: string[];
  videoUrl?: string; // URL to generated video
  caption: string;
  hashtags: string[];
  status: 'draft' | 'scheduled' | 'posted';
}

export default function AdManagerPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [carousels, setCarousels] = useState<CarouselGroup[]>([]);
  const [videos, setVideos] = useState<VideoFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [posting, setPosting] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [postResult, setPostResult] = useState<{ success: boolean; message: string } | null>(null);
  const [selectedCarousel, setSelectedCarousel] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState<string>('');

  // ZIP upload state
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  const [zipGroups, setZipGroups] = useState<ZipImageGroup[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // Active tab
  const [activeTab, setActiveTab] = useState<'images' | 'videos' | 'ai' | 'library'>('images');

  // Library state
  const [libraryImages, setLibraryImages] = useState<LibraryImage[]>([]);
  const [libraryLoading, setLibraryLoading] = useState(false);
  const [selectedForCarousel, setSelectedForCarousel] = useState<string[]>([]);
  const [libraryDragOver, setLibraryDragOver] = useState(false);
  const [uploadingToLibrary, setUploadingToLibrary] = useState(false);
  const libraryInputRef = useRef<HTMLInputElement>(null);

  // Draft preview modal state
  const [showDraftPreview, setShowDraftPreview] = useState(false);
  const [draftFormat, setDraftFormat] = useState<'post' | 'story' | 'reel'>('post');
  const [draftCaption, setDraftCaption] = useState('');
  const [draftPreviewIndex, setDraftPreviewIndex] = useState(0);
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [savingDraft, setSavingDraft] = useState(false);

  // Drag state for library selected images reordering
  const [draggedLibrarySelected, setDraggedLibrarySelected] = useState<string | null>(null);
  const [dragOverLibrarySelected, setDragOverLibrarySelected] = useState<string | null>(null);

  // Video generation state
  const [generatingVideo, setGeneratingVideo] = useState(false);
  const [videoProgress, setVideoProgress] = useState('');
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);

  // AI Design Generator state
  const [aiPrompt, setAiPrompt] = useState('');
  const [generatedSpec, setGeneratedSpec] = useState<Record<string, unknown> | null>(null);
  const [generating, setGenerating] = useState(false);
  const [aiService, setAiService] = useState('LPG Massaaž');
  const [aiLanguage, setAiLanguage] = useState<'et' | 'en' | 'fi'>('et');
  const [aiSlideCount, setAiSlideCount] = useState(8);

  // Drag and drop state for image reordering (ZIP preview)
  const [draggedImage, setDraggedImage] = useState<{ groupFormat: string; imageId: string } | null>(null);
  const [dragOverImage, setDragOverImage] = useState<{ groupFormat: string; imageId: string } | null>(null);

  // Drag and drop state for uploaded carousel reordering
  const [draggedCarouselImage, setDraggedCarouselImage] = useState<{ timestamp: string; url: string } | null>(null);
  const [dragOverCarouselImage, setDragOverCarouselImage] = useState<{ timestamp: string; url: string } | null>(null);
  const [editingCarousel, setEditingCarousel] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
      // Store in sessionStorage for page refresh
      sessionStorage.setItem('admin_auth', 'true');
    } else {
      setError('Vale parool / Wrong password');
    }
  };

  // Fetch library images
  const fetchLibrary = useCallback(async () => {
    setLibraryLoading(true);
    try {
      const res = await fetch('/api/ads/library');
      if (!res.ok) throw new Error('Failed to fetch library');
      const data = await res.json();
      setLibraryImages(data.blobs || []);
    } catch (err) {
      console.error('Error fetching library:', err);
    } finally {
      setLibraryLoading(false);
    }
  }, []);

  // Fetch drafts
  const fetchDrafts = useCallback(async () => {
    try {
      const res = await fetch('/api/ads/drafts');
      if (!res.ok) throw new Error('Failed to fetch drafts');
      const data = await res.json();
      setDrafts(data.drafts || []);
    } catch (err) {
      console.error('Error fetching drafts:', err);
    }
  }, []);

  const fetchCarousels = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/instagram/blobs');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();

      // Group files by timestamp (ig_TIMESTAMP_N.ext pattern)
      const groups: Record<string, BlobFile[]> = {};
      const videoList: VideoFile[] = [];

      console.log('Fetched blobs:', data.blobs?.length || 0, data.blobs?.map((b: BlobFile) => b.pathname));
      for (const file of data.blobs || []) {
        // Check if it's a video file (reel_*.mp4, reel_*.webm, reel_*.mov)
        const isVideo = file.pathname.match(/instagram\/reel_\d+\.(mp4|webm|mov)$/i) ||
                       file.pathname.includes('/reel_') ||
                       file.pathname.endsWith('.mp4') ||
                       file.pathname.endsWith('.webm') ||
                       file.pathname.endsWith('.mov');

        if (isVideo) {
          console.log('Found video:', file.pathname, file.url);
          videoList.push(file);
          continue;
        }

        const match = file.pathname.match(/instagram\/ig_(\d+)_\d+\./);
        if (match) {
          const timestamp = match[1];
          if (!groups[timestamp]) {
            groups[timestamp] = [];
          }
          groups[timestamp].push(file);
        }
      }

      // Convert to array and sort by date (newest first)
      const carouselList: CarouselGroup[] = Object.entries(groups)
        .map(([timestamp, files]) => ({
          timestamp,
          files: files.sort((a, b) => {
            const aNum = parseInt(a.pathname.match(/_(\d+)\./)?.[1] || '0');
            const bNum = parseInt(b.pathname.match(/_(\d+)\./)?.[1] || '0');
            return aNum - bNum;
          }),
          date: new Date(parseInt(timestamp)),
        }))
        .sort((a, b) => b.date.getTime() - a.date.getTime());

      // Sort videos by date (newest first)
      const sortedVideos = videoList.sort((a, b) => {
        const aTime = parseInt(a.pathname.match(/reel_(\d+)\./)?.[1] || '0');
        const bTime = parseInt(b.pathname.match(/reel_(\d+)\./)?.[1] || '0');
        return bTime - aTime;
      });

      setCarousels(carouselList);
      setVideos(sortedVideos);
    } catch (err) {
      console.error('Error fetching carousels:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Check if already authenticated
    if (sessionStorage.getItem('admin_auth') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCarousels();
      fetchLibrary();
      fetchDrafts();
    }
  }, [isAuthenticated, fetchCarousels, fetchLibrary, fetchDrafts]);

  const handlePost = async (carousel: CarouselGroup) => {
    if (carousel.files.length < 2) {
      setPostResult({ success: false, message: 'Carousel needs at least 2 images' });
      return;
    }

    setPosting(carousel.timestamp);
    setPostResult(null);

    try {
      const imageUrls = carousel.files.map(f => f.url);

      const res = await fetch('/api/instagram/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: imageUrls.length === 1 ? 'single' : 'carousel',
          imageUrls,
          caption: caption || undefined,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setPostResult({ success: true, message: `Postitatud! Media ID: ${data.mediaId}` });
        setCaption('');
        setSelectedCarousel(null);
      } else {
        setPostResult({ success: false, message: data.error || 'Posting failed' });
      }
    } catch (err) {
      setPostResult({
        success: false,
        message: err instanceof Error ? err.message : 'Unknown error'
      });
    } finally {
      setPosting(null);
    }
  };

  const handlePostReel = async (video: VideoFile) => {
    setPosting(video.url);
    setPostResult(null);

    try {
      const res = await fetch('/api/instagram/post-reel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          videoUrl: video.url,
          caption: caption || undefined,
          coverUrl: coverImageUrl || undefined,
          shareToFeed: true,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setPostResult({ success: true, message: `Reel postitatud! Media ID: ${data.mediaId}` });
        setCaption('');
        setCoverImageUrl('');
        setSelectedVideo(null);
      } else {
        setPostResult({ success: false, message: data.error || 'Reel posting failed' });
      }
    } catch (err) {
      setPostResult({
        success: false,
        message: err instanceof Error ? err.message : 'Unknown error'
      });
    } finally {
      setPosting(null);
    }
  };

  const handleDelete = async (carousel: CarouselGroup) => {
    if (!confirm('Kustuta see karussell? / Delete this carousel?')) return;

    try {
      const res = await fetch('/api/instagram/upload', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ urls: carousel.files.map(f => f.url) }),
      });

      if (res.ok) {
        fetchCarousels();
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleDeleteVideo = async (video: VideoFile) => {
    if (!confirm('Kustuta see video? / Delete this video?')) return;

    try {
      const res = await fetch('/api/instagram/upload-video', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: video.url }),
      });

      if (res.ok) {
        fetchCarousels();
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  // Video file upload
  const handleVideoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check by MIME type or file extension
    const videoExtensions = ['.mp4', '.mov', '.webm', '.m4v'];
    const isVideo = file.type.startsWith('video/') ||
      videoExtensions.some(ext => file.name.toLowerCase().endsWith(ext));

    if (!isVideo) {
      setUploadProgress('Palun vali video fail (MP4, MOV, WebM) / Please select a video file');
      return;
    }

    setUploading(true);
    setUploadProgress('Video üleslaadimine... / Uploading video...');

    try {
      const formData = new FormData();
      formData.append('video', file);

      const res = await fetch('/api/instagram/upload-video', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setUploadProgress(`Video ${(data.size / 1024 / 1024).toFixed(1)}MB ules laetud / Video uploaded`);
        await fetchCarousels();
        // Clear after 3 seconds
        setTimeout(() => setUploadProgress(''), 3000);
      } else {
        setUploadProgress(`Viga: ${data.error}`);
      }
    } catch (err) {
      setUploadProgress(`Viga: ${err instanceof Error ? err.message : 'Upload failed'}`);
    } finally {
      setUploading(false);
      // Reset the input
      if (videoInputRef.current) {
        videoInputRef.current.value = '';
      }
    }
  };

  // ZIP file processing
  const processZipFile = async (file: File) => {
    setUploading(true);
    setUploadProgress('ZIP faili avamine... / Opening ZIP file...');
    setZipGroups([]);

    try {
      const zip = await JSZip.loadAsync(file);
      const groups: Record<string, { name: string; blob: Blob; id: string }[]> = {};

      // Get all image files from ZIP
      const imageFiles: { path: string; file: JSZip.JSZipObject }[] = [];

      zip.forEach((relativePath, zipEntry) => {
        if (!zipEntry.dir && /\.(png|jpg|jpeg|webp)$/i.test(relativePath)) {
          imageFiles.push({ path: relativePath, file: zipEntry });
        }
      });

      setUploadProgress(`Leitud ${imageFiles.length} pilti... / Found ${imageFiles.length} images...`);

      // Group images by format folder
      for (const { path, file: zipEntry } of imageFiles) {
        // Extract format from path - e.g., "IG Story/slide_1.png" -> "IG Story"
        const parts = path.split('/');
        let format = 'Uldine / General';

        if (parts.length >= 2) {
          // Check if first folder is a format folder
          const folder = parts[0];
          if (folder.includes('IG') || folder.includes('FB') || folder.includes('Instagram') || folder.includes('Facebook') || folder.includes('Story') || folder.includes('Post')) {
            format = folder;
          }
        }

        if (!groups[format]) {
          groups[format] = [];
        }

        const blob = await zipEntry.async('blob');
        const fileName = parts[parts.length - 1];
        const id = `${format}-${fileName}-${Date.now()}-${Math.random().toString(36).substring(7)}`;
        groups[format].push({ name: fileName, blob, id });
      }

      // Sort images in each group by name (to maintain slide order)
      const sortedGroups: ZipImageGroup[] = Object.entries(groups).map(([format, images]) => ({
        format,
        images: images.sort((a, b) => {
          // Extract numbers from filenames for natural sorting
          const aNum = parseInt(a.name.match(/\d+/)?.[0] || '0');
          const bNum = parseInt(b.name.match(/\d+/)?.[0] || '0');
          return aNum - bNum;
        }),
        caption: '',
        link: '',
      }));

      setZipGroups(sortedGroups);
      setUploadProgress(`Valmis: ${sortedGroups.length} formaati, ${imageFiles.length} pilti kokku / Ready: ${sortedGroups.length} formats, ${imageFiles.length} images total`);
    } catch (err) {
      console.error('ZIP processing error:', err);
      setUploadProgress(`Viga: ${err instanceof Error ? err.message : 'ZIP tootlemine ebaonnestus'}`);
    } finally {
      setUploading(false);
    }
  };

  const handleZipUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.zip')) {
      setUploadProgress('Palun vali ZIP fail / Please select a ZIP file');
      return;
    }

    await processZipFile(file);
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);

    const file = event.dataTransfer.files[0];
    if (!file) return;

    // Check if it's a video (by MIME type or file extension)
    const videoExtensions = ['.mp4', '.mov', '.webm', '.m4v'];
    const isVideo = file.type.startsWith('video/') ||
      videoExtensions.some(ext => file.name.toLowerCase().endsWith(ext));

    if (isVideo) {
      setUploading(true);
      setUploadProgress('Video üleslaadimine... / Uploading video...');

      try {
        const formData = new FormData();
        formData.append('video', file);

        const res = await fetch('/api/instagram/upload-video', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();

        if (data.success) {
          setUploadProgress(`Video ${(data.size / 1024 / 1024).toFixed(1)}MB ules laetud / Video uploaded`);
          await fetchCarousels();
          setActiveTab('videos'); // Switch to videos tab
          setTimeout(() => setUploadProgress(''), 3000);
        } else {
          setUploadProgress(`Viga: ${data.error}`);
        }
      } catch (err) {
        setUploadProgress(`Viga: ${err instanceof Error ? err.message : 'Upload failed'}`);
      } finally {
        setUploading(false);
      }
      return;
    }

    // Check if it's a ZIP
    if (!file.name.toLowerCase().endsWith('.zip')) {
      setUploadProgress('Palun lohista ZIP fail voi video / Please drop a ZIP file or video');
      return;
    }

    await processZipFile(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
  };

  const uploadGroupToBlob = async (group: ZipImageGroup) => {
    setUploading(true);
    setUploadProgress(`Uleslaadimine: ${group.format}... / Uploading: ${group.format}...`);

    try {
      const formData = new FormData();

      // Images are already in the user's custom order from drag-and-drop
      for (const image of group.images) {
        // Determine content type from filename
        const ext = image.name.split('.').pop()?.toLowerCase() || 'png';
        const contentType = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' :
                          ext === 'webp' ? 'image/webp' : 'image/png';

        const file = new File([image.blob], image.name, { type: contentType });
        formData.append('files', file);
      }

      const res = await fetch('/api/instagram/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        // Pre-fill the caption if one was set for this group
        if (group.caption) {
          setCaption(group.caption);
        }

        setUploadProgress(`${group.format}: ${data.count} pilti ules laetud / images uploaded`);
        // Refresh the carousel list
        await fetchCarousels();
        // Remove this group from zipGroups
        setZipGroups(prev => prev.filter(g => g.format !== group.format));

        // Show success message with link info if provided
        if (group.link) {
          setPostResult({
            success: true,
            message: `Pildid ules laetud! Link postituseks: ${group.link}`
          });
        }
      } else {
        setUploadProgress(`Viga: ${data.error}`);
      }
    } catch (err) {
      setUploadProgress(`Viga: ${err instanceof Error ? err.message : 'Upload failed'}`);
    } finally {
      setUploading(false);
    }
  };

  const uploadAllGroups = async () => {
    for (const group of zipGroups) {
      await uploadGroupToBlob(group);
    }
    setZipGroups([]);
    setUploadProgress('Koik formaadid ules laetud! / All formats uploaded!');
  };

  // AI Design Generator handler
  const handleGenerateDesign = async () => {
    if (!aiPrompt.trim()) return;

    setGenerating(true);
    setGeneratedSpec(null);
    setPostResult(null);

    try {
      const res = await fetch('/api/design/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: aiPrompt,
          service: aiService,
          language: aiLanguage,
          slideCount: aiSlideCount,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setGeneratedSpec(data.designSpec);
        setPostResult({
          success: true,
          message: `Disain genereeritud! Kasutatud ${data.usage?.inputTokens || 0} + ${data.usage?.outputTokens || 0} tokenit.`
        });
      } else {
        setPostResult({ success: false, message: data.error || 'Generation failed' });
      }
    } catch (err) {
      setPostResult({
        success: false,
        message: err instanceof Error ? err.message : 'Generation failed'
      });
    } finally {
      setGenerating(false);
    }
  };

  const copySpecToClipboard = () => {
    if (generatedSpec) {
      navigator.clipboard.writeText(JSON.stringify(generatedSpec, null, 2));
      setPostResult({ success: true, message: 'JSON kopeeritud! Kleebi Figma pluginasse.' });
    }
  };

  // Image reordering functions
  const handleImageDragStart = (groupFormat: string, imageId: string) => {
    setDraggedImage({ groupFormat, imageId });
  };

  const handleImageDragOver = (e: React.DragEvent, groupFormat: string, imageId: string) => {
    e.preventDefault();
    if (draggedImage?.groupFormat === groupFormat && draggedImage?.imageId !== imageId) {
      setDragOverImage({ groupFormat, imageId });
    }
  };

  const handleImageDragLeave = () => {
    setDragOverImage(null);
  };

  const handleImageDrop = (e: React.DragEvent, groupFormat: string, targetImageId: string) => {
    e.preventDefault();
    if (!draggedImage || draggedImage.groupFormat !== groupFormat) {
      setDraggedImage(null);
      setDragOverImage(null);
      return;
    }

    setZipGroups(prev => prev.map(group => {
      if (group.format !== groupFormat) return group;

      const images = [...group.images];
      const draggedIndex = images.findIndex(img => img.id === draggedImage.imageId);
      const targetIndex = images.findIndex(img => img.id === targetImageId);

      if (draggedIndex === -1 || targetIndex === -1) return group;

      // Remove dragged item and insert at target position
      const [draggedItem] = images.splice(draggedIndex, 1);
      images.splice(targetIndex, 0, draggedItem);

      return { ...group, images };
    }));

    setDraggedImage(null);
    setDragOverImage(null);
  };

  const handleImageDragEnd = () => {
    setDraggedImage(null);
    setDragOverImage(null);
  };

  // Move image left/right (alternative to drag and drop for mobile)
  const moveImage = (groupFormat: string, imageId: string, direction: 'left' | 'right') => {
    setZipGroups(prev => prev.map(group => {
      if (group.format !== groupFormat) return group;

      const images = [...group.images];
      const currentIndex = images.findIndex(img => img.id === imageId);

      if (currentIndex === -1) return group;

      const newIndex = direction === 'left' ? currentIndex - 1 : currentIndex + 1;
      if (newIndex < 0 || newIndex >= images.length) return group;

      // Swap positions
      [images[currentIndex], images[newIndex]] = [images[newIndex], images[currentIndex]];

      return { ...group, images };
    }));
  };

  // Update caption for a zip group
  const updateGroupCaption = (groupFormat: string, newCaption: string) => {
    setZipGroups(prev => prev.map(group =>
      group.format === groupFormat ? { ...group, caption: newCaption } : group
    ));
  };

  // Update link for a zip group
  const updateGroupLink = (groupFormat: string, newLink: string) => {
    setZipGroups(prev => prev.map(group =>
      group.format === groupFormat ? { ...group, link: newLink } : group
    ));
  };

  // Uploaded carousel reordering functions
  const handleCarouselImageDragStart = (timestamp: string, url: string) => {
    setDraggedCarouselImage({ timestamp, url });
  };

  const handleCarouselImageDragOver = (e: React.DragEvent, timestamp: string, url: string) => {
    e.preventDefault();
    if (draggedCarouselImage?.timestamp === timestamp && draggedCarouselImage?.url !== url) {
      setDragOverCarouselImage({ timestamp, url });
    }
  };

  const handleCarouselImageDragLeave = () => {
    setDragOverCarouselImage(null);
  };

  const handleCarouselImageDrop = (e: React.DragEvent, timestamp: string, targetUrl: string) => {
    e.preventDefault();
    if (!draggedCarouselImage || draggedCarouselImage.timestamp !== timestamp) {
      setDraggedCarouselImage(null);
      setDragOverCarouselImage(null);
      return;
    }

    setCarousels(prev => prev.map(carousel => {
      if (carousel.timestamp !== timestamp) return carousel;

      const files = [...carousel.files];
      const draggedIndex = files.findIndex(f => f.url === draggedCarouselImage.url);
      const targetIndex = files.findIndex(f => f.url === targetUrl);

      if (draggedIndex === -1 || targetIndex === -1) return carousel;

      // Remove dragged item and insert at target position
      const [draggedItem] = files.splice(draggedIndex, 1);
      files.splice(targetIndex, 0, draggedItem);

      return { ...carousel, files };
    }));

    setDraggedCarouselImage(null);
    setDragOverCarouselImage(null);
  };

  const handleCarouselImageDragEnd = () => {
    setDraggedCarouselImage(null);
    setDragOverCarouselImage(null);
  };

  // Move carousel image left/right (alternative to drag and drop)
  const moveCarouselImage = (timestamp: string, url: string, direction: 'left' | 'right') => {
    setCarousels(prev => prev.map(carousel => {
      if (carousel.timestamp !== timestamp) return carousel;

      const files = [...carousel.files];
      const currentIndex = files.findIndex(f => f.url === url);

      if (currentIndex === -1) return carousel;

      const newIndex = direction === 'left' ? currentIndex - 1 : currentIndex + 1;
      if (newIndex < 0 || newIndex >= files.length) return carousel;

      // Swap positions
      [files[currentIndex], files[newIndex]] = [files[newIndex], files[currentIndex]];

      return { ...carousel, files };
    }));
  };

  // Toggle edit mode for carousel
  const toggleCarouselEdit = (timestamp: string) => {
    setEditingCarousel(prev => prev === timestamp ? null : timestamp);
  };

  // Library functions
  const handleLibraryUpload = async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    if (fileArray.length === 0) return;

    // Filter only images
    const imageFiles = fileArray.filter(f =>
      f.type.startsWith('image/') || /\.(jpg|jpeg|png|webp)$/i.test(f.name)
    );

    if (imageFiles.length === 0) {
      setPostResult({ success: false, message: 'Palun vali pildifailid / Please select image files' });
      return;
    }

    setUploadingToLibrary(true);
    setUploadProgress(`Laen ules ${imageFiles.length} pilti... / Uploading ${imageFiles.length} images...`);

    try {
      const formData = new FormData();
      imageFiles.forEach(f => formData.append('files', f));

      const res = await fetch('/api/ads/library', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setUploadProgress(`${data.count} pilti lisatud kogusse / images added to library`);
        await fetchLibrary();
        setTimeout(() => setUploadProgress(''), 3000);
      } else {
        setUploadProgress(`Viga: ${data.error}`);
      }
    } catch (err) {
      setUploadProgress(`Viga: ${err instanceof Error ? err.message : 'Upload failed'}`);
    } finally {
      setUploadingToLibrary(false);
    }
  };

  const handleLibraryInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleLibraryUpload(e.target.files);
    }
    // Reset input
    if (libraryInputRef.current) {
      libraryInputRef.current.value = '';
    }
  };

  const handleLibraryDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setLibraryDragOver(false);
    handleLibraryUpload(e.dataTransfer.files);
  };

  const toggleImageSelection = (url: string) => {
    setSelectedForCarousel(prev => {
      if (prev.includes(url)) {
        return prev.filter(u => u !== url);
      } else {
        if (prev.length >= 10) {
          setPostResult({ success: false, message: 'Maksimaalselt 10 pilti karusselliks / Maximum 10 images for carousel' });
          return prev;
        }
        return [...prev, url];
      }
    });
  };

  const deleteFromLibrary = async (urls: string[]) => {
    if (!confirm(`Kustuta ${urls.length} pilti? / Delete ${urls.length} images?`)) return;

    try {
      const res = await fetch('/api/ads/library', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ urls }),
      });

      if (res.ok) {
        // Remove deleted images from selection
        setSelectedForCarousel(prev => prev.filter(u => !urls.includes(u)));
        await fetchLibrary();
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  // Reorder selected images for carousel
  const handleSelectedDragStart = (url: string) => {
    setDraggedLibrarySelected(url);
  };

  const handleSelectedDragOver = (e: React.DragEvent, url: string) => {
    e.preventDefault();
    if (draggedLibrarySelected && draggedLibrarySelected !== url) {
      setDragOverLibrarySelected(url);
    }
  };

  const handleSelectedDrop = (e: React.DragEvent, targetUrl: string) => {
    e.preventDefault();
    if (!draggedLibrarySelected || draggedLibrarySelected === targetUrl) {
      setDraggedLibrarySelected(null);
      setDragOverLibrarySelected(null);
      return;
    }

    setSelectedForCarousel(prev => {
      const newArr = [...prev];
      const draggedIdx = newArr.indexOf(draggedLibrarySelected);
      const targetIdx = newArr.indexOf(targetUrl);
      if (draggedIdx === -1 || targetIdx === -1) return prev;

      newArr.splice(draggedIdx, 1);
      newArr.splice(targetIdx, 0, draggedLibrarySelected);
      return newArr;
    });

    setDraggedLibrarySelected(null);
    setDragOverLibrarySelected(null);
  };

  const handleSelectedDragEnd = () => {
    setDraggedLibrarySelected(null);
    setDragOverLibrarySelected(null);
  };

  const moveSelectedImage = (url: string, direction: 'left' | 'right') => {
    setSelectedForCarousel(prev => {
      const idx = prev.indexOf(url);
      if (idx === -1) return prev;

      const newIdx = direction === 'left' ? idx - 1 : idx + 1;
      if (newIdx < 0 || newIdx >= prev.length) return prev;

      const newArr = [...prev];
      [newArr[idx], newArr[newIdx]] = [newArr[newIdx], newArr[idx]];
      return newArr;
    });
  };

  // Draft functions
  const openDraftPreview = () => {
    if (selectedForCarousel.length === 0) {
      setPostResult({ success: false, message: 'Vali vahemalt 1 pilt / Select at least 1 image' });
      return;
    }
    setDraftCaption('');
    setDraftPreviewIndex(0);
    setShowDraftPreview(true);
  };

  const saveDraft = async () => {
    setSavingDraft(true);
    // Debug: log the video URL being saved
    console.log('[saveDraft] generatedVideoUrl:', generatedVideoUrl);
    try {
      const draftPayload = {
        format: draftFormat,
        imageUrls: selectedForCarousel,
        caption: draftCaption,
        hashtags: draftCaption.match(/#\w+/g) || [],
        videoUrl: generatedVideoUrl || undefined,
      };
      console.log('[saveDraft] payload:', draftPayload);

      const res = await fetch('/api/ads/drafts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(draftPayload),
      });

      const data = await res.json();
      console.log('[saveDraft] response:', data);

      if (data.success) {
        setPostResult({ success: true, message: generatedVideoUrl ? 'Video mustand salvestatud!' : 'Mustand salvestatud!' });
        setShowDraftPreview(false);
        setSelectedForCarousel([]);
        setDraftCaption('');
        setGeneratedVideoUrl(null); // Clear video URL after saving
        await fetchDrafts();
      } else {
        setPostResult({ success: false, message: data.error || 'Saving failed' });
      }
    } catch (err) {
      setPostResult({ success: false, message: err instanceof Error ? err.message : 'Saving failed' });
    } finally {
      setSavingDraft(false);
    }
  };

  const deleteDraft = async (id: string) => {
    if (!confirm('Kustuta mustand? / Delete draft?')) return;

    try {
      const res = await fetch('/api/ads/drafts', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: [id] }),
      });

      if (res.ok) {
        await fetchDrafts();
      }
    } catch (err) {
      console.error('Delete draft error:', err);
    }
  };

  const postDraftToInstagram = async (draft: Draft) => {
    setPosting(draft.id);
    setPostResult(null);

    try {
      let res;

      // If draft has a video, post as Reel
      if (draft.videoUrl) {
        res = await fetch('/api/instagram/post-reel', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            videoUrl: draft.videoUrl,
            caption: draft.caption || undefined,
            shareToFeed: true,
          }),
        });
      } else {
        // Post as image or carousel
        res = await fetch('/api/instagram/post', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: draft.imageUrls.length === 1 ? 'single' : 'carousel',
            imageUrls: draft.imageUrls,
            caption: draft.caption || undefined,
          }),
        });
      }

      const data = await res.json();

      if (data.success) {
        setPostResult({ success: true, message: `${draft.videoUrl ? 'Reel' : 'Postitus'} postitatud! Media ID: ${data.mediaId}` });
        // Update draft status
        await fetch('/api/ads/drafts', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: draft.id, status: 'posted' }),
        });
        await fetchDrafts();
      } else {
        setPostResult({ success: false, message: data.error || 'Posting failed' });
      }
    } catch (err) {
      setPostResult({ success: false, message: err instanceof Error ? err.message : 'Posting failed' });
    } finally {
      setPosting(null);
    }
  };

  // =============================
  // REELS IMAGE FORMATTING
  // Format images with blurred background, centered original, and drop shadow
  // =============================

  const REELS_CONFIG = {
    OUTPUT_WIDTH: 1080,
    OUTPUT_HEIGHT: 1920,
    CENTER_SCALE_WIDTH: 0.85,  // Max 85% of output width
    CENTER_SCALE_HEIGHT: 0.55, // Max 55% of output height - leaves room for solid color above/below
    SHADOW_OFFSET: 15,
    SHADOW_BLUR: 50,
    SHADOW_OPACITY: 100,
  };

  // Create solid color background from image's average/dominant color
  // Completely uniform - no gradients, no details, just one solid color
  const createSolidColorBackground = (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    outputWidth: number,
    outputHeight: number
  ) => {
    // Create a small canvas to sample the image colors
    const sampleSize = 50; // Sample at 50x50 for speed
    const sampleCanvas = document.createElement('canvas');
    sampleCanvas.width = sampleSize;
    sampleCanvas.height = sampleSize;
    const sampleCtx = sampleCanvas.getContext('2d')!;

    // Draw the entire image scaled down to sample canvas
    sampleCtx.drawImage(img, 0, 0, img.width, img.height, 0, 0, sampleSize, sampleSize);

    // Get pixel data and calculate average color
    const imageData = sampleCtx.getImageData(0, 0, sampleSize, sampleSize);
    const pixels = imageData.data;

    let totalR = 0, totalG = 0, totalB = 0;
    const pixelCount = sampleSize * sampleSize;

    for (let i = 0; i < pixels.length; i += 4) {
      totalR += pixels[i];
      totalG += pixels[i + 1];
      totalB += pixels[i + 2];
    }

    const avgR = Math.round(totalR / pixelCount);
    const avgG = Math.round(totalG / pixelCount);
    const avgB = Math.round(totalB / pixelCount);

    console.log('[createSolidColorBackground] Average color:', `rgb(${avgR}, ${avgG}, ${avgB})`);

    // Fill the entire canvas with the solid average color
    ctx.fillStyle = `rgb(${avgR}, ${avgG}, ${avgB})`;
    ctx.fillRect(0, 0, outputWidth, outputHeight);

    console.log('[createSolidColorBackground] Done - solid color background');
  };

  // Format a single image for Reels (blurred background + centered image + shadow)
  const formatImageForReels = async (imageUrl: string): Promise<Blob> => {
    return new Promise(async (resolve, reject) => {
      try {
        const { OUTPUT_WIDTH, OUTPUT_HEIGHT, CENTER_SCALE_WIDTH, CENTER_SCALE_HEIGHT, SHADOW_OFFSET, SHADOW_BLUR, SHADOW_OPACITY } = REELS_CONFIG;

        console.log('[formatImageForReels] Starting with URL:', imageUrl);

        // Fetch image as blob first to avoid CORS issues
        const response = await fetch(imageUrl, { mode: 'cors', credentials: 'omit' });
        if (!response.ok) throw new Error(`Failed to fetch image: ${response.status}`);
        const imageBlob = await response.blob();
        const imageBitmapUrl = URL.createObjectURL(imageBlob);

        // Load the image from blob URL
        const img = document.createElement('img');

        await new Promise<void>((imgResolve, imgReject) => {
          img.onload = () => {
            console.log('[formatImageForReels] Image loaded:', img.width, 'x', img.height);
            imgResolve();
          };
          img.onerror = (e) => {
            console.error('[formatImageForReels] Image load error:', e);
            imgReject(new Error('Failed to load image'));
          };
          img.src = imageBitmapUrl;
        });

        // Create main canvas for output (1080x1920)
        const canvas = document.createElement('canvas');
        canvas.width = OUTPUT_WIDTH;
        canvas.height = OUTPUT_HEIGHT;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Could not get canvas context');

        console.log('[formatImageForReels] Creating canvas:', OUTPUT_WIDTH, 'x', OUTPUT_HEIGHT);

        // Step 1: Create solid color background from image's average color
        // Completely uniform - no gradients, no details, just one solid color
        createSolidColorBackground(ctx, img, OUTPUT_WIDTH, OUTPUT_HEIGHT);

        // Step 2: Calculate centered foreground image dimensions
        // Scale to fit within bounds while preserving aspect ratio
        const maxWidth = Math.round(OUTPUT_WIDTH * CENTER_SCALE_WIDTH);
        const maxHeight = Math.round(OUTPUT_HEIGHT * CENTER_SCALE_HEIGHT);

        // Calculate scale ratio to fit within bounds
        const scaleByWidth = maxWidth / img.width;
        const scaleByHeight = maxHeight / img.height;
        const scaleRatio = Math.min(scaleByWidth, scaleByHeight);

        const fgWidth = Math.round(img.width * scaleRatio);
        const fgHeight = Math.round(img.height * scaleRatio);

        // Center horizontally and vertically
        const fgX = Math.round((OUTPUT_WIDTH - fgWidth) / 2);
        const fgY = Math.round((OUTPUT_HEIGHT - fgHeight) / 2);

        console.log('[formatImageForReels] Foreground:', fgX, fgY, fgWidth, fgHeight, 'scale:', scaleRatio.toFixed(2));

        // Step 3: Draw drop shadow
        ctx.save();
        ctx.shadowColor = `rgba(0, 0, 0, ${SHADOW_OPACITY / 255})`;
        ctx.shadowBlur = SHADOW_BLUR;
        ctx.shadowOffsetX = SHADOW_OFFSET;
        ctx.shadowOffsetY = SHADOW_OFFSET;

        // Draw a filled rectangle for the shadow
        ctx.fillStyle = 'white';
        ctx.fillRect(fgX, fgY, fgWidth, fgHeight);
        ctx.restore();

        // Step 4: Draw the centered foreground image on top
        ctx.drawImage(img, fgX, fgY, fgWidth, fgHeight);

        console.log('[formatImageForReels] Done drawing, converting to blob');

        // Clean up blob URL
        URL.revokeObjectURL(imageBitmapUrl);

        // Convert to blob
        canvas.toBlob(
          (blob) => {
            if (blob) {
              console.log('[formatImageForReels] Created blob:', blob.size, 'bytes');
              resolve(blob);
            } else {
              reject(new Error('Failed to create image blob'));
            }
          },
          'image/png',
          1.0
        );
      } catch (error) {
        console.error('[formatImageForReels] Error:', error);
        reject(error);
      }
    });
  };

  // Format all selected images for Reels and upload to library
  const [formattingImages, setFormattingImages] = useState(false);
  const [formatProgress, setFormatProgress] = useState('');

  const formatImagesForReels = async (imageUrls: string[]) => {
    if (imageUrls.length === 0) {
      setPostResult({ success: false, message: 'Vali vähemalt 1 pilt / Select at least 1 image' });
      return;
    }

    setFormattingImages(true);
    setFormatProgress(`Piltide vormistamine... / Formatting images... (0/${imageUrls.length})`);

    try {
      const formattedUrls: string[] = [];

      for (let i = 0; i < imageUrls.length; i++) {
        setFormatProgress(`Piltide vormistamine... / Formatting images... (${i + 1}/${imageUrls.length})`);

        // Format the image
        const formattedBlob = await formatImageForReels(imageUrls[i]);

        // Upload to library - API expects 'files' field, not 'file'
        const formData = new FormData();
        formData.append('files', formattedBlob, `reels_formatted_${Date.now()}_${i + 1}.png`);

        const uploadRes = await fetch('/api/ads/library', {
          method: 'POST',
          body: formData,
        });

        if (!uploadRes.ok) {
          const errorData = await uploadRes.json().catch(() => ({}));
          throw new Error(errorData.error || `Failed to upload formatted image ${i + 1}`);
        }

        const uploadData = await uploadRes.json();
        // API returns urls array, get the first one
        formattedUrls.push(uploadData.urls?.[0] || uploadData.url);
      }

      // Update selected images with formatted ones
      setSelectedForCarousel(formattedUrls);

      // Refresh library
      await fetchLibrary();

      setFormatProgress('');
      setPostResult({
        success: true,
        message: `${imageUrls.length} pilti vormistatud Reels formaati! / ${imageUrls.length} images formatted for Reels!`
      });
    } catch (error) {
      console.error('Error formatting images:', error);
      setPostResult({
        success: false,
        message: `Piltide vormistamine ebaõnnestus: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    } finally {
      setFormattingImages(false);
      setFormatProgress('');
    }
  };

  // Generate MP4 video slideshow from images using server-side API
  const generateVideoFromImages = async (imageUrls: string[], durationPerSlide = 3) => {
    if (imageUrls.length === 0) {
      setPostResult({ success: false, message: 'Vali vahemalt 1 pilt / Select at least 1 image' });
      return;
    }

    setGeneratingVideo(true);
    setVideoProgress('Video loomine serveris... / Creating video on server...');
    setGeneratedVideoUrl(null);

    try {
      // Call server-side video generation API
      const response = await fetch('/api/ads/create-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          images: imageUrls,
          duration: durationPerSlide,
          format: draftFormat,
        }),
      });

      const data = await response.json();

      if (data.success) {
        console.log('[generateVideo] Video created successfully:', data.url);
        setGeneratedVideoUrl(data.url);
        setVideoProgress('Video valmis! / Video ready!');
        setPostResult({
          success: true,
          message: `MP4 video loodud! ${(data.size / 1024 / 1024).toFixed(1)}MB - Salvesta mustand.`
        });
        // Refresh video list
        await fetchCarousels();
        // If modal is not open, open it now
        if (!showDraftPreview) {
          setShowDraftPreview(true);
        }
      } else if (data.setup_instructions) {
        // API not configured - show setup instructions
        setPostResult({
          success: false,
          message: `Video API pole seadistatud. Mine https://creatomate.com ja loo tasuta konto, siis lisa CREATOMATE_API_KEY Vercel keskkonna muutujatesse.`
        });
      } else {
        throw new Error(data.error || 'Video creation failed');
      }

    } catch (err) {
      console.error('Video generation error:', err);
      setPostResult({
        success: false,
        message: `Video loomine ebaonnestus: ${err instanceof Error ? err.message : 'Unknown error'}`
      });
    } finally {
      setGeneratingVideo(false);
      setVideoProgress('');
    }
  };

  // Format video timestamp to readable date
  const getVideoDate = (video: VideoFile): Date => {
    const match = video.pathname.match(/reel_(\d+)\./);
    if (match) {
      return new Date(parseInt(match[1]));
    }
    return new Date(video.uploadedAt);
  };

  // Login page
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">
            Vietnam Visa Ad Manager
          </h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Parool / Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-pink-500 focus:outline-none"
                placeholder="Enter password..."
                autoFocus
              />
            </div>
            {error && (
              <p className="text-red-400 mb-4 text-sm">{error}</p>
            )}
            <button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Logi sisse / Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Main admin page
  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Vietnam Visa Ad Manager
          </h1>
          <button
            onClick={() => {
              sessionStorage.removeItem('admin_auth');
              setIsAuthenticated(false);
            }}
            className="text-gray-400 hover:text-white text-sm"
          >
            Logi valja / Logout
          </button>
        </div>

        {postResult && (
          <div className={`mb-6 p-4 rounded-lg ${postResult.success ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300'}`}>
            {postResult.message}
            <button
              onClick={() => setPostResult(null)}
              className="ml-4 text-sm underline"
            >
              Sulge / Close
            </button>
          </div>
        )}

        {/* Tab buttons */}
        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setActiveTab('ai')}
            className={`px-4 py-2 rounded transition-colors ${
              activeTab === 'ai'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            AI Disain
          </button>
          <button
            onClick={() => setActiveTab('images')}
            className={`px-4 py-2 rounded transition-colors ${
              activeTab === 'images'
                ? 'bg-pink-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Pildid / Images ({carousels.length})
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`px-4 py-2 rounded transition-colors ${
              activeTab === 'videos'
                ? 'bg-pink-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Videod / Reels ({videos.length})
          </button>
          <button
            onClick={() => setActiveTab('library')}
            className={`px-4 py-2 rounded transition-colors ${
              activeTab === 'library'
                ? 'bg-teal-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Pildikogu / Library ({libraryImages.length})
          </button>
        </div>

        <div className="mb-6 flex flex-wrap gap-4">
          <button
            onClick={fetchCarousels}
            disabled={loading}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors disabled:opacity-50"
          >
            {loading ? 'Laadin...' : 'Varskenda / Refresh'}
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors disabled:opacity-50"
          >
            Lae ules ZIP / Upload ZIP
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (videoInputRef.current) {
                videoInputRef.current.click();
              }
            }}
            type="button"
            disabled={uploading}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition-colors disabled:opacity-50"
          >
            Lae ules Video / Upload Video
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".zip"
            onChange={handleZipUpload}
            className="hidden"
          />
          <input
            ref={videoInputRef}
            type="file"
            accept="video/*,.mp4,.mov,.webm,.m4v"
            onChange={handleVideoUpload}
            className="hidden"
          />
        </div>

        {/* ZIP/Video Drop Zone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`mb-6 border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragOver
              ? 'border-blue-500 bg-blue-900/20'
              : 'border-gray-600 hover:border-gray-500'
          }`}
        >
          <div className="text-gray-400">
            <p className="text-lg mb-2">
              Lohista ZIP voi Video siia / Drag ZIP or Video file here
            </p>
            <p className="text-sm">
              Figma plugina &quot;Ekspordi KOIK (ZIP + Video)&quot; nupust saadud fail voi MP4/MOV video
            </p>
          </div>
        </div>

        {/* Upload Progress */}
        {uploadProgress && (
          <div className="mb-6 p-4 bg-gray-800 rounded-lg">
            <p className="text-gray-300">{uploadProgress}</p>
          </div>
        )}

        {/* ZIP Groups Preview */}
        {zipGroups.length > 0 && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">
                ZIP sisu / ZIP Contents ({zipGroups.length} formaati)
              </h2>
              <button
                onClick={uploadAllGroups}
                disabled={uploading}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors disabled:opacity-50"
              >
                {uploading ? 'Uleslaadimine...' : 'Lae koik ules / Upload All'}
              </button>
            </div>

            <div className="grid gap-4">
              {zipGroups.map((group) => (
                <div
                  key={group.format}
                  className="bg-gray-800 rounded-lg p-4"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-medium text-white">
                      {group.format} ({group.images.length} pilti)
                    </h3>
                    <button
                      onClick={() => uploadGroupToBlob(group)}
                      disabled={uploading}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors disabled:opacity-50"
                    >
                      Lae ules / Upload
                    </button>
                  </div>

                  {/* Caption and Link fields */}
                  <div className="grid gap-3 mb-4 md:grid-cols-2">
                    <div>
                      <label className="block text-gray-400 text-xs mb-1">
                        Tekst / Caption (Instagram postituse jaoks)
                      </label>
                      <textarea
                        value={group.caption || ''}
                        onChange={(e) => updateGroupCaption(group.format, e.target.value)}
                        className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-pink-500 focus:outline-none resize-none text-sm"
                        rows={2}
                        placeholder="Lisa postitusele tekst... #vietnamvisa #vietnamtravel"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs mb-1">
                        Link (bio linki voi Story swipe-up)
                      </label>
                      <input
                        type="url"
                        value={group.link || ''}
                        onChange={(e) => updateGroupLink(group.format, e.target.value)}
                        className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-pink-500 focus:outline-none text-sm"
                        placeholder="https://vietnamvisahelp.com/..."
                      />
                    </div>
                  </div>

                  {/* Drag hint */}
                  <p className="text-gray-500 text-xs mb-2">
                    💡 Lohista pilte jarjestuse muutmiseks voi kasuta nooli / Drag images to reorder or use arrows
                  </p>

                  {/* Draggable image grid */}
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {group.images.map((img, idx) => {
                      const isDragging = draggedImage?.groupFormat === group.format && draggedImage?.imageId === img.id;
                      const isDragOver = dragOverImage?.groupFormat === group.format && dragOverImage?.imageId === img.id;

                      return (
                        <div
                          key={img.id}
                          draggable
                          onDragStart={() => handleImageDragStart(group.format, img.id)}
                          onDragOver={(e) => handleImageDragOver(e, group.format, img.id)}
                          onDragLeave={handleImageDragLeave}
                          onDrop={(e) => handleImageDrop(e, group.format, img.id)}
                          onDragEnd={handleImageDragEnd}
                          className={`relative w-24 h-24 flex-shrink-0 bg-gray-700 rounded overflow-hidden cursor-move transition-all group ${
                            isDragging ? 'opacity-50 scale-95' : ''
                          } ${isDragOver ? 'ring-2 ring-pink-500 ring-offset-2 ring-offset-gray-800' : ''}`}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={URL.createObjectURL(img.blob)}
                            alt={img.name}
                            className="w-full h-full object-cover pointer-events-none"
                          />
                          {/* Slide number badge */}
                          <div className="absolute top-1 left-1 bg-pink-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                            {idx + 1}
                          </div>
                          {/* Reorder buttons (shown on hover) */}
                          <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white text-xs p-1 flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={(e) => { e.stopPropagation(); moveImage(group.format, img.id, 'left'); }}
                              disabled={idx === 0}
                              className="px-2 py-0.5 bg-gray-600 hover:bg-gray-500 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                              title="Liiguta vasakule / Move left"
                            >
                              ←
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); moveImage(group.format, img.id, 'right'); }}
                              disabled={idx === group.images.length - 1}
                              className="px-2 py-0.5 bg-gray-600 hover:bg-gray-500 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                              title="Liiguta paremale / Move right"
                            >
                              →
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content based on active tab */}
        {activeTab === 'ai' ? (
          // AI Design Generator Tab
          <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/20 rounded-lg p-6 border border-purple-500/30">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <span className="text-2xl">🤖</span> AI Disaini Generaator
            </h2>

            <div className="grid gap-4 md:grid-cols-3 mb-6">
              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">
                  Teenus / Service
                </label>
                <select
                  value={aiService}
                  onChange={(e) => setAiService(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:outline-none"
                >
                  <option value="LPG Massaaž">LPG Massaaž</option>
                  <option value="Kavitatsioon">Kavitatsioon</option>
                  <option value="Krüolippolüüs">Krüolippolüüs</option>
                  <option value="Cold Lipo Laser">Cold Lipo Laser</option>
                  <option value="RF Lifting">RF Lifting</option>
                  <option value="Infrapunamatt">Infrapunamatt</option>
                  <option value="Kombo-hooldus">Kombo-hooldus</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">
                  Keel / Language
                </label>
                <select
                  value={aiLanguage}
                  onChange={(e) => setAiLanguage(e.target.value as 'et' | 'en' | 'fi')}
                  className="w-full px-4 py-2.5 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:outline-none"
                >
                  <option value="et">Eesti / Estonian</option>
                  <option value="en">English</option>
                  <option value="fi">Suomi / Finnish</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">
                  Slaidide arv / Slides
                </label>
                <select
                  value={aiSlideCount}
                  onChange={(e) => setAiSlideCount(parseInt(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:outline-none"
                >
                  <option value={4}>4 slaidi</option>
                  <option value={6}>6 slaidi</option>
                  <option value={8}>8 slaidi</option>
                  <option value={10}>10 slaidi</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-300 mb-2 text-sm font-medium">
                Kirjelda soovitud reklaami / Describe desired ad
              </label>
              <textarea
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:outline-none resize-none"
                rows={4}
                placeholder="Nt: Loo hariv karussell LPG massaažist, mis selgitab kuidas tselluliidist vabaneda. Lisa sooduspakkumine 5x hooldusele hinnaga 149€ (tavahind 199€)..."
              />
            </div>

            <div className="flex gap-4 mb-6">
              <button
                onClick={handleGenerateDesign}
                disabled={generating || !aiPrompt.trim()}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {generating ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Genereerin...
                  </>
                ) : (
                  <>✨ Genereeri disain</>
                )}
              </button>
            </div>

            {/* Generated Specification Display */}
            {generatedSpec && (
              <div className="mt-6 border-t border-purple-500/30 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-white flex items-center gap-2">
                    <span>📋</span> Genereeritud spetsifikatsioon
                  </h3>
                  <button
                    onClick={copySpecToClipboard}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Kopeeri JSON
                  </button>
                </div>

                <div className="bg-gray-900 rounded-lg p-4 max-h-96 overflow-auto border border-gray-700">
                  <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">
                    {JSON.stringify(generatedSpec, null, 2)}
                  </pre>
                </div>

                <div className="mt-4 p-4 bg-blue-900/30 rounded-lg border border-blue-500/30">
                  <h4 className="text-blue-300 font-medium mb-2">📌 Järgmised sammud:</h4>
                  <ol className="text-gray-300 text-sm space-y-1 list-decimal list-inside">
                    <li>Kopeeri JSON ülal olevast kastist</li>
                    <li>Ava Figma ja käivita Vietnam Visa Ad Generator plugin</li>
                    <li>Kleebi JSON &quot;AI Design Import&quot; väljale</li>
                    <li>Klõpsa &quot;Loo slaidid&quot; nuppu</li>
                  </ol>
                </div>
              </div>
            )}
          </div>
        ) : activeTab === 'images' ? (
          // Images/Carousels Tab
          loading ? (
            <div className="text-center text-gray-400 py-12">
              Laadin karusselle... / Loading carousels...
            </div>
          ) : carousels.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              <p className="mb-4">Uhtegi karusselli pole veel ules laetud.</p>
              <p className="text-sm">No carousels uploaded yet. Use the Figma plugin to export images.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {carousels.map((carousel) => (
                <div
                  key={carousel.timestamp}
                  className="bg-gray-800 rounded-lg p-4 md:p-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        Karussell / Carousel
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {carousel.date.toLocaleDateString('et-EE', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                        {' • '}
                        {carousel.files.length} pilti / images
                      </p>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <button
                        onClick={() => toggleCarouselEdit(carousel.timestamp)}
                        className={`px-4 py-2 rounded text-sm transition-colors ${
                          editingCarousel === carousel.timestamp
                            ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                            : 'bg-gray-600 hover:bg-gray-500 text-white'
                        }`}
                      >
                        {editingCarousel === carousel.timestamp ? '✓ Jarjestus valmis / Done' : '↔ Muuda jarjestust / Reorder'}
                      </button>
                      <button
                        onClick={() => setSelectedCarousel(
                          selectedCarousel === carousel.timestamp ? null : carousel.timestamp
                        )}
                        className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded text-sm transition-colors"
                      >
                        {selectedCarousel === carousel.timestamp ? 'Tuhista / Cancel' : 'Postita Instagrami / Post to Instagram'}
                      </button>
                      <button
                        onClick={() => handleDelete(carousel)}
                        className="bg-red-600/20 hover:bg-red-600/40 text-red-400 px-4 py-2 rounded text-sm transition-colors"
                      >
                        Kustuta / Delete
                      </button>
                    </div>
                  </div>

                  {/* Caption input when selected */}
                  {selectedCarousel === carousel.timestamp && (
                    <div className="mb-4 p-4 bg-gray-700/50 rounded-lg">
                      <label className="block text-gray-300 mb-2 text-sm">
                        Postitus tekst / Caption (valikuline / optional)
                      </label>
                      <textarea
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-pink-500 focus:outline-none resize-none"
                        rows={3}
                        placeholder="Lisa postitusele tekst... / Add caption to your post..."
                      />
                      <button
                        onClick={() => handlePost(carousel)}
                        disabled={posting === carousel.timestamp}
                        className="mt-3 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-semibold transition-colors disabled:opacity-50"
                      >
                        {posting === carousel.timestamp ? 'Postitan... / Posting...' : 'Postita nuud / Post now'}
                      </button>
                    </div>
                  )}

                  {/* Edit mode hint */}
                  {editingCarousel === carousel.timestamp && (
                    <p className="text-yellow-400 text-xs mb-2">
                      💡 Lohista pilte jarjestuse muutmiseks voi kasuta nooli / Drag images to reorder or use arrows
                    </p>
                  )}

                  {/* Image grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                    {carousel.files.map((file, idx) => {
                      const isEditing = editingCarousel === carousel.timestamp;
                      const isDragging = draggedCarouselImage?.timestamp === carousel.timestamp && draggedCarouselImage?.url === file.url;
                      const isDragOver = dragOverCarouselImage?.timestamp === carousel.timestamp && dragOverCarouselImage?.url === file.url;

                      return (
                        <div
                          key={file.url}
                          draggable={isEditing}
                          onDragStart={isEditing ? () => handleCarouselImageDragStart(carousel.timestamp, file.url) : undefined}
                          onDragOver={isEditing ? (e) => handleCarouselImageDragOver(e, carousel.timestamp, file.url) : undefined}
                          onDragLeave={isEditing ? handleCarouselImageDragLeave : undefined}
                          onDrop={isEditing ? (e) => handleCarouselImageDrop(e, carousel.timestamp, file.url) : undefined}
                          onDragEnd={isEditing ? handleCarouselImageDragEnd : undefined}
                          className={`relative aspect-square bg-gray-700 rounded overflow-hidden group transition-all ${
                            isEditing ? 'cursor-move' : ''
                          } ${isDragging ? 'opacity-50 scale-95' : ''} ${
                            isDragOver ? 'ring-2 ring-yellow-500 ring-offset-2 ring-offset-gray-800' : ''
                          }`}
                        >
                          <Image
                            src={file.url}
                            alt={`Slide ${idx + 1}`}
                            fill
                            className={`object-cover ${isEditing ? 'pointer-events-none' : ''}`}
                            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                          />
                          {/* Slide number badge */}
                          <div className={`absolute top-1 left-1 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center ${
                            isEditing ? 'bg-yellow-600' : 'bg-black/60'
                          }`}>
                            {idx + 1}
                          </div>
                          {/* Hover overlay with number (non-edit mode) */}
                          {!isEditing && (
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="text-white font-bold text-lg">
                                {idx + 1}
                              </span>
                            </div>
                          )}
                          {/* Reorder buttons (edit mode only) */}
                          {isEditing && (
                            <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white text-xs p-1 flex justify-center gap-1">
                              <button
                                onClick={(e) => { e.stopPropagation(); moveCarouselImage(carousel.timestamp, file.url, 'left'); }}
                                disabled={idx === 0}
                                className="px-2 py-1 bg-yellow-600 hover:bg-yellow-500 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                                title="Liiguta vasakule / Move left"
                              >
                                ←
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); moveCarouselImage(carousel.timestamp, file.url, 'right'); }}
                                disabled={idx === carousel.files.length - 1}
                                className="px-2 py-1 bg-yellow-600 hover:bg-yellow-500 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                                title="Liiguta paremale / Move right"
                              >
                                →
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )
        ) : activeTab === 'videos' ? (
          // Videos/Reels Tab
          loading ? (
            <div className="text-center text-gray-400 py-12">
              Laadin videoid... / Loading videos...
            </div>
          ) : videos.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              <p className="mb-4">Uhtegi videot pole veel ules laetud.</p>
              <p className="text-sm">No videos uploaded yet. Upload a video to post as a Reel.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {videos.map((video) => {
                const videoDate = getVideoDate(video);
                return (
                  <div
                    key={video.url}
                    className="bg-gray-800 rounded-lg p-4 md:p-6"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          Video / Reel
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {videoDate.toLocaleDateString('et-EE', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedVideo(
                            selectedVideo === video.url ? null : video.url
                          )}
                          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm transition-colors"
                        >
                          {selectedVideo === video.url ? 'Tuhista / Cancel' : 'Postita Reelina / Post as Reel'}
                        </button>
                        <button
                          onClick={() => handleDeleteVideo(video)}
                          className="bg-red-600/20 hover:bg-red-600/40 text-red-400 px-4 py-2 rounded text-sm transition-colors"
                        >
                          Kustuta / Delete
                        </button>
                      </div>
                    </div>

                    {/* Caption input when selected */}
                    {selectedVideo === video.url && (
                      <div className="mb-4 p-4 bg-gray-700/50 rounded-lg">
                        <label className="block text-gray-300 mb-2 text-sm">
                          Reel tekst / Caption (valikuline / optional)
                        </label>
                        <textarea
                          value={caption}
                          onChange={(e) => setCaption(e.target.value)}
                          className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:outline-none resize-none"
                          rows={3}
                          placeholder="Lisa Reelile tekst... / Add caption to your Reel..."
                        />

                        <label className="block text-gray-300 mb-2 mt-4 text-sm">
                          Kaanepilt / Cover Image URL (valikuline / optional)
                        </label>
                        <input
                          type="text"
                          value={coverImageUrl}
                          onChange={(e) => setCoverImageUrl(e.target.value)}
                          className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:outline-none"
                          placeholder="https://... (pildi URL musta thumbnail vältimiseks)"
                        />
                        <p className="text-gray-400 text-xs mt-1">
                          Vihje: Kasuta mone karusselli pildi URL-i kaanepildina / Tip: Use a carousel image URL as cover
                        </p>

                        <p className="text-gray-400 text-xs mt-3 mb-3">
                          NB: Reelid votavad tootlemiseks kuni 10 minutit / Reels can take up to 10 minutes to process
                        </p>
                        <button
                          onClick={() => handlePostReel(video)}
                          disabled={posting === video.url}
                          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-semibold transition-colors disabled:opacity-50"
                        >
                          {posting === video.url ? 'Postitan... / Posting...' : 'Postita nuud / Post now'}
                        </button>
                      </div>
                    )}

                    {/* Video preview */}
                    <div className="relative aspect-video bg-gray-700 rounded overflow-hidden max-w-md">
                      <video
                        src={video.url}
                        controls
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )
        ) : activeTab === 'library' ? (
          // Library Tab
          <div className="space-y-6">
            {/* Upload Zone */}
            <div
              onDrop={handleLibraryDrop}
              onDragOver={(e) => { e.preventDefault(); setLibraryDragOver(true); }}
              onDragLeave={(e) => { e.preventDefault(); setLibraryDragOver(false); }}
              onClick={() => libraryInputRef.current?.click()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                libraryDragOver
                  ? 'border-teal-500 bg-teal-900/20'
                  : 'border-gray-600 hover:border-teal-500 hover:bg-gray-800/50'
              }`}
            >
              <div className="text-gray-400">
                <p className="text-lg mb-2">
                  {uploadingToLibrary ? 'Laadin ules... / Uploading...' : 'Lohista pildid siia voi kliki / Drag images here or click'}
                </p>
                <p className="text-sm">
                  PNG, JPG, WebP • Max 8MB per file
                </p>
              </div>
              <input
                ref={libraryInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleLibraryInputChange}
                className="hidden"
              />
            </div>

            {/* Selected for Carousel */}
            {selectedForCarousel.length > 0 && (
              <div className="bg-teal-900/30 rounded-lg p-4 border border-teal-500/30">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-medium text-white">
                    Valitud karusselliks / Selected for Carousel ({selectedForCarousel.length}/10)
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedForCarousel([])}
                      className="text-gray-400 hover:text-white text-sm"
                    >
                      Tuhista / Clear
                    </button>
                    <button
                      onClick={openDraftPreview}
                      className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                    >
                      Loo mustand / Create Draft
                    </button>
                  </div>
                </div>
                <p className="text-gray-400 text-xs mb-3">
                  💡 Lohista pilte jarjestuse muutmiseks / Drag images to reorder
                </p>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {selectedForCarousel.map((url, idx) => {
                    const isDragging = draggedLibrarySelected === url;
                    const isDragOver = dragOverLibrarySelected === url;

                    return (
                      <div
                        key={url}
                        draggable
                        onDragStart={() => handleSelectedDragStart(url)}
                        onDragOver={(e) => handleSelectedDragOver(e, url)}
                        onDragLeave={() => setDragOverLibrarySelected(null)}
                        onDrop={(e) => handleSelectedDrop(e, url)}
                        onDragEnd={handleSelectedDragEnd}
                        className={`relative w-20 h-20 flex-shrink-0 bg-gray-700 rounded overflow-hidden cursor-move group transition-all ${
                          isDragging ? 'opacity-50 scale-95' : ''
                        } ${isDragOver ? 'ring-2 ring-teal-400' : ''}`}
                      >
                        <Image
                          src={url}
                          alt={`Selected ${idx + 1}`}
                          fill
                          className="object-cover pointer-events-none"
                          sizes="80px"
                        />
                        <div className="absolute top-1 left-1 bg-teal-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                          {idx + 1}
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleImageSelection(url); }}
                          className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                        <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white text-xs p-0.5 flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => { e.stopPropagation(); moveSelectedImage(url, 'left'); }}
                            disabled={idx === 0}
                            className="px-1.5 bg-gray-600 hover:bg-gray-500 rounded disabled:opacity-30"
                          >
                            ←
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); moveSelectedImage(url, 'right'); }}
                            disabled={idx === selectedForCarousel.length - 1}
                            className="px-1.5 bg-gray-600 hover:bg-gray-500 rounded disabled:opacity-30"
                          >
                            →
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Drafts Section */}
            {drafts.length > 0 && (
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-lg font-medium text-white mb-4">
                  Mustandid / Drafts ({drafts.length})
                </h3>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {drafts.map((draft) => (
                    <div
                      key={draft.id}
                      className="bg-gray-700/50 rounded-lg p-3 border border-gray-600"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex gap-1 flex-wrap">
                          <span className={`text-xs px-2 py-0.5 rounded ${
                            draft.status === 'posted' ? 'bg-green-600' :
                            draft.status === 'scheduled' ? 'bg-blue-600' : 'bg-gray-600'
                          } text-white`}>
                            {draft.format.toUpperCase()} • {draft.status}
                          </span>
                          {draft.videoUrl && (
                            <span className="text-xs px-2 py-0.5 rounded bg-purple-600 text-white flex items-center gap-1">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                              </svg>
                              VIDEO
                            </span>
                          )}
                        </div>
                        <span className="text-gray-400 text-xs">
                          {new Date(draft.createdAt).toLocaleDateString('et-EE')}
                        </span>
                      </div>

                      {/* Video preview or image thumbnails */}
                      {draft.videoUrl ? (
                        <div className="relative mb-2 rounded overflow-hidden bg-black aspect-[9/16] max-h-48">
                          <video
                            src={draft.videoUrl}
                            className="w-full h-full object-contain"
                            controls
                            preload="metadata"
                          />
                          <div className="absolute top-2 left-2 bg-purple-600/90 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                            </svg>
                            Reel Video
                          </div>
                        </div>
                      ) : (
                        <div className="flex gap-1 mb-2 overflow-x-auto">
                          {draft.imageUrls.slice(0, 4).map((url, i) => (
                            <div key={url} className="relative w-12 h-12 flex-shrink-0 bg-gray-600 rounded overflow-hidden">
                              <Image src={url} alt={`Draft ${i + 1}`} fill className="object-cover" sizes="48px" />
                            </div>
                          ))}
                          {draft.imageUrls.length > 4 && (
                            <div className="w-12 h-12 flex-shrink-0 bg-gray-600 rounded flex items-center justify-center text-gray-400 text-xs">
                              +{draft.imageUrls.length - 4}
                            </div>
                          )}
                        </div>
                      )}

                      {draft.caption && (
                        <p className="text-gray-300 text-xs line-clamp-2 mb-2">{draft.caption}</p>
                      )}
                      <div className="flex gap-2">
                        {draft.status !== 'posted' && (
                          <button
                            onClick={() => postDraftToInstagram(draft)}
                            disabled={posting === draft.id}
                            className="flex-1 bg-pink-600 hover:bg-pink-700 text-white px-2 py-1 rounded text-xs transition-colors disabled:opacity-50"
                          >
                            {posting === draft.id ? 'Postitan...' : draft.videoUrl ? 'Postita Reel' : 'Postita'}
                          </button>
                        )}
                        <button
                          onClick={() => deleteDraft(draft.id)}
                          className="bg-red-600/20 hover:bg-red-600/40 text-red-400 px-2 py-1 rounded text-xs transition-colors"
                        >
                          Kustuta
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Library Grid */}
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-white">
                  Pildikogu / Library ({libraryImages.length})
                </h3>
                {selectedForCarousel.length > 0 && (
                  <button
                    onClick={() => deleteFromLibrary(selectedForCarousel)}
                    className="bg-red-600/20 hover:bg-red-600/40 text-red-400 px-3 py-1 rounded text-sm transition-colors"
                  >
                    Kustuta valitud / Delete selected ({selectedForCarousel.length})
                  </button>
                )}
              </div>

              {libraryLoading ? (
                <div className="text-center text-gray-400 py-8">
                  Laadin pildikogu... / Loading library...
                </div>
              ) : libraryImages.length === 0 ? (
                <div className="text-center text-gray-400 py-8">
                  <p className="mb-2">Pildikogu on tuhi.</p>
                  <p className="text-sm">Library is empty. Upload images above.</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
                  {libraryImages.map((img) => {
                    const isSelected = selectedForCarousel.includes(img.url);
                    const selectionIndex = selectedForCarousel.indexOf(img.url);

                    return (
                      <div
                        key={img.url}
                        onClick={() => toggleImageSelection(img.url)}
                        className={`relative aspect-square bg-gray-700 rounded overflow-hidden cursor-pointer group transition-all ${
                          isSelected ? 'ring-2 ring-teal-500 ring-offset-2 ring-offset-gray-800' : ''
                        }`}
                      >
                        <Image
                          src={img.url}
                          alt="Library image"
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, (max-width: 1024px) 20vw, 16vw"
                        />
                        {isSelected && (
                          <div className="absolute top-1 left-1 bg-teal-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                            {selectionIndex + 1}
                          </div>
                        )}
                        <div className={`absolute inset-0 transition-colors ${
                          isSelected ? 'bg-teal-500/20' : 'bg-black/0 group-hover:bg-black/30'
                        }`} />
                        <div className="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => { e.stopPropagation(); deleteFromLibrary([img.url]); }}
                            className="bg-red-600 hover:bg-red-700 text-white w-6 h-6 rounded flex items-center justify-center text-xs"
                          >
                            🗑
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ) : null}

        {/* Draft Preview Modal */}
        {showDraftPreview && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center p-4 border-b border-gray-700">
                <h3 className="text-lg font-semibold text-white">Mustand / Draft Preview</h3>
                <button
                  onClick={() => setShowDraftPreview(false)}
                  className="text-gray-400 hover:text-white text-2xl leading-none"
                >
                  ×
                </button>
              </div>

              <div className="p-4 space-y-4">
                {/* Format selector */}
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Formaat / Format</label>
                  <div className="flex gap-2">
                    {(['post', 'story', 'reel'] as const).map((fmt) => (
                      <button
                        key={fmt}
                        onClick={() => setDraftFormat(fmt)}
                        className={`px-4 py-2 rounded transition-colors ${
                          draftFormat === fmt
                            ? 'bg-teal-600 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        {fmt === 'post' ? 'Post' : fmt === 'story' ? 'Story' : 'Reel'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Instagram-style preview */}
                <div className="bg-black rounded-lg overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center gap-3 p-3 border-b border-gray-800">
                    <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full" />
                    <span className="text-white text-sm font-medium">vietnamvisahelp</span>
                  </div>

                  {/* Video or Image preview */}
                  <div className={`relative bg-gray-900 ${
                    draftFormat === 'story' || draftFormat === 'reel' ? 'aspect-[9/16]' : 'aspect-square'
                  }`}>
                    {generatedVideoUrl ? (
                      <>
                        <video
                          src={generatedVideoUrl}
                          className="w-full h-full object-contain"
                          controls
                          autoPlay
                          muted
                          loop
                        />
                        <div className="absolute top-2 left-2 bg-purple-600/90 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                          </svg>
                          VIDEO VALMIS
                        </div>
                      </>
                    ) : selectedForCarousel.length > 0 ? (
                      <Image
                        src={selectedForCarousel[draftPreviewIndex]}
                        alt="Preview"
                        fill
                        className="object-contain"
                        sizes="500px"
                      />
                    ) : null}
                    {/* Video generation overlay */}
                    {generatingVideo && (
                      <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center">
                        <svg className="animate-spin h-12 w-12 text-purple-500 mb-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        <p className="text-white text-sm text-center px-4">{videoProgress || 'Video loomine...'}</p>
                      </div>
                    )}
                    {/* Navigation arrows for images only */}
                    {!generatedVideoUrl && selectedForCarousel.length > 1 && (
                      <>
                        <button
                          onClick={() => setDraftPreviewIndex(i => Math.max(0, i - 1))}
                          disabled={draftPreviewIndex === 0}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black w-8 h-8 rounded-full flex items-center justify-center disabled:opacity-30"
                        >
                          ‹
                        </button>
                        <button
                          onClick={() => setDraftPreviewIndex(i => Math.min(selectedForCarousel.length - 1, i + 1))}
                          disabled={draftPreviewIndex === selectedForCarousel.length - 1}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black w-8 h-8 rounded-full flex items-center justify-center disabled:opacity-30"
                        >
                          ›
                        </button>
                      </>
                    )}
                  </div>

                  {/* Dots indicator */}
                  {selectedForCarousel.length > 1 && (
                    <div className="flex justify-center gap-1 py-2">
                      {selectedForCarousel.map((_, i) => (
                        <div
                          key={i}
                          className={`w-1.5 h-1.5 rounded-full transition-colors ${
                            i === draftPreviewIndex ? 'bg-blue-500' : 'bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Actions row */}
                  <div className="flex gap-4 p-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </div>
                </div>

                {/* Caption input */}
                <div>
                  <label className="block text-gray-300 text-sm mb-2">
                    Tekst / Caption
                  </label>
                  <textarea
                    value={draftCaption}
                    onChange={(e) => setDraftCaption(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-teal-500 focus:outline-none resize-none"
                    rows={4}
                    maxLength={2200}
                    placeholder="Kirjuta oma postitus... #vietnamvisa #vietnamtravel"
                  />
                  <p className="text-gray-400 text-xs mt-1 text-right">
                    {draftCaption.length}/2200
                  </p>
                </div>

                {/* Video Progress */}
                {videoProgress && (
                  <div className="bg-purple-900/30 border border-purple-500/30 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <svg className="animate-spin h-5 w-5 text-purple-400" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span className="text-purple-300 text-sm">{videoProgress}</span>
                    </div>
                  </div>
                )}

                {/* Image Formatting Progress */}
                {formattingImages && (
                  <div className="bg-teal-900/50 border border-teal-500/30 rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-3">
                      <svg className="animate-spin h-5 w-5 text-teal-400" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      <span className="text-teal-300 text-sm">{formatProgress}</span>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 flex-wrap">
                  {/* Format for Reels button - creates blur background + centered image + shadow */}
                  <button
                    onClick={() => formatImagesForReels(selectedForCarousel)}
                    disabled={formattingImages || generatingVideo || selectedForCarousel.length === 0}
                    className="flex-1 min-w-[140px] bg-teal-600 hover:bg-teal-700 text-white px-4 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    title="Loo piltidest Reels formaadis pildid (blur taust + originaal keskele + vari)"
                  >
                    {formattingImages ? (
                      <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Vormistatakse...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Vormista Reelsiks
                      </>
                    )}
                  </button>
                  <button
                    onClick={saveDraft}
                    disabled={savingDraft || generatingVideo || formattingImages}
                    className="flex-1 min-w-[140px] bg-gray-600 hover:bg-gray-500 text-white px-4 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
                  >
                    {savingDraft ? 'Salvestan...' : 'Salvesta mustand'}
                  </button>
                  <button
                    onClick={() => generateVideoFromImages(selectedForCarousel, 3)}
                    disabled={generatingVideo || formattingImages || selectedForCarousel.length < 2}
                    className="flex-1 min-w-[140px] bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {generatingVideo ? (
                      <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Loon videot...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Loo Video / Create Video
                      </>
                    )}
                  </button>
                  <button
                    onClick={async () => {
                      await saveDraft();
                      // Post immediately after saving
                      const latestDrafts = await fetch('/api/ads/drafts').then(r => r.json());
                      const newDraft = latestDrafts.drafts?.[0];
                      if (newDraft) {
                        postDraftToInstagram(newDraft);
                      }
                    }}
                    disabled={savingDraft || generatingVideo || formattingImages || selectedForCarousel.length < 2}
                    className="flex-1 min-w-[140px] bg-pink-600 hover:bg-pink-700 text-white px-4 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
                  >
                    Postita Instagrami
                  </button>
                </div>
                {selectedForCarousel.length < 2 && (
                  <p className="text-yellow-400 text-xs text-center">
                    Video ja karusselli jaoks on vaja vahemalt 2 pilti / Need at least 2 images for video/carousel
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
