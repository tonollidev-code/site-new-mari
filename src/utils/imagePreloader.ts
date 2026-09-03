// Global cache for images that have already been loaded/decoded in the browser session
export const loadedImagesSet = new Set<string>();

/**
 * Preloads a single image and caches it in memory and browser HTTP cache.
 */
export function preloadImage(src: string): Promise<void> {
  if (!src || loadedImagesSet.has(src)) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.decoding = 'async';
    img.referrerPolicy = 'no-referrer';

    img.onload = () => {
      loadedImagesSet.add(src);
      resolve();
    };

    img.onerror = () => {
      // Resolve anyway so it doesn't block queues
      resolve();
    };

    img.src = src;
  });
}

/**
 * Sequentially / batched preloading of images during idle times
 * so that all cards and galleries load instantly when scrolled to.
 */
export function preloadImagesInBatches(urls: string[], batchSize = 3, delayMs = 120): void {
  if (typeof window === 'undefined') return;

  const validUrls = urls.filter((url) => url && !loadedImagesSet.has(url));
  if (validUrls.length === 0) return;

  let index = 0;

  function loadNextBatch() {
    if (index >= validUrls.length) return;

    const batch = validUrls.slice(index, index + batchSize);
    index += batchSize;

    Promise.all(batch.map((url) => preloadImage(url))).finally(() => {
      if (index < validUrls.length) {
        if ('requestIdleCallback' in window) {
          (window as unknown as { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => void })
            .requestIdleCallback(() => setTimeout(loadNextBatch, delayMs), { timeout: 1500 });
        } else {
          setTimeout(loadNextBatch, delayMs);
        }
      }
    });
  }

  // Kick off after the initial render cycle
  if ('requestIdleCallback' in window) {
    (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(() => {
      loadNextBatch();
    });
  } else {
    setTimeout(loadNextBatch, 100);
  }
}
