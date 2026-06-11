import { Component, computed, input, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { inject } from '@angular/core';

/**
 * Click-to-load YouTube embed. Shows the video thumbnail first (no tracking,
 * no bandwidth) and swaps to the player on tap. Always offers a YouTube
 * search link as a fallback in case the embedded video is unavailable.
 */
@Component({
  selector: 'app-video-embed',
  template: `
    <div class="video-box">
      @if (videoId()) {
        @if (loaded()) {
          <iframe
            class="video-frame"
            [src]="embedUrl()"
            title="Technique video"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        } @else {
          <button class="video-thumb" (click)="loaded.set(true)" aria-label="Play technique video">
            <img [src]="thumbUrl()" alt="Video thumbnail" loading="lazy" />
            <span class="play-btn">▶</span>
          </button>
        }
      }
      <a class="yt-search" [href]="searchUrl()" target="_blank" rel="noopener">
        🔎 Find technique videos on YouTube
      </a>
    </div>
  `,
  styles: `
    .video-box { display: flex; flex-direction: column; gap: 8px; }
    .video-thumb {
      position: relative; padding: 0; border: none; cursor: pointer;
      border-radius: 12px; overflow: hidden; background: #000;
      aspect-ratio: 16 / 9; width: 100%;
    }
    .video-thumb img { width: 100%; height: 100%; object-fit: cover; opacity: 0.85; }
    .play-btn {
      position: absolute; inset: 0; display: grid; place-items: center;
      font-size: 2.2rem; color: #fff;
      text-shadow: 0 2px 12px rgba(0,0,0,0.8);
    }
    .video-frame { width: 100%; aspect-ratio: 16 / 9; border-radius: 12px; }
    .yt-search {
      font-size: 0.85rem; color: var(--accent); text-decoration: none;
      align-self: flex-start;
    }
    .yt-search:hover { text-decoration: underline; }
  `,
})
export class VideoEmbedComponent {
  videoId = input<string>();
  searchQuery = input.required<string>();

  readonly loaded = signal(false);
  private readonly sanitizer = inject(DomSanitizer);

  readonly thumbUrl = computed(() => `https://i.ytimg.com/vi/${this.videoId()}/hqdefault.jpg`);

  readonly searchUrl = computed(
    () => `https://www.youtube.com/results?search_query=${encodeURIComponent(this.searchQuery())}`
  );

  readonly embedUrl = computed<SafeResourceUrl>(() =>
    this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube-nocookie.com/embed/${this.videoId()}?autoplay=1&rel=0`
    )
  );
}
