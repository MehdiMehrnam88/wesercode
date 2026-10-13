# WeserCode background videos

Place the two background videos in this folder with these exact names:

- `light-background.mp4` — light theme
- `dark-background.mp4` — dark theme

The shared `SiteVideoBackground` component selects the correct file automatically when the theme changes. The background layer is mounted by the shared site shell, so it appears across all pages.

For the dark source, the supplied URL is an HLS `.m3u8` stream. Convert it to MP4 for reliable local hosting, for example with FFmpeg:

```bash
ffmpeg -i "https://stream.mux.com/Jwr2RhmsNrd6GEspBNgm02vJsRZAGlaoQIh4AucGdASw.m3u8" -c:v libx264 -preset medium -crf 24 -an -movflags +faststart dark-background.mp4
```

For the light source, save the supplied MP4 as `light-background.mp4`.

The app keeps the configured remote sources as technical fallbacks when local files are missing, but local hosting is preferred for performance, predictability and privacy.
