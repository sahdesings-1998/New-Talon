# TALON OEM image optimization report

Generated: 2026-05-10T07:45:56.043Z

## Raster sources initially above 500 KB (before optimization)

All talon PNG/JPEG inputs exceeding ~500 KB were converted to WebP and capped by max-width rules below.

| Original file (removed after conversion) | Approx. original size |
| --- | ---: |
| talon-oem-private-label.png | ~2.6 MB |
| talon-oem-sublimation-printing.png | ~2.5 MB |
| talon-service-sublimation-printing.png | ~2.5 MB |
| talon-oem-teamwear-manufacturing.png | ~2.2 MB |
| talon-hd-hang-tags-flatlay.png | ~1.1 MB |
| talon-hd-neck-label-detail.png | ~1.1 MB |
| talon-hd-embroidery-production.png | ~1.0 MB |
| talon-hd-sports-accessories-lifestyle.png | ~978 KB |
| talon-hd-woven-labels-detail.png | ~867 KB |
| talon-hd-performance-zipper-detail.png | ~846 KB |
| talon-hd-premium-custom-packaging.png | ~736 KB |

(Smaller talon sources were also normalized to WebP for consistency and caching.)

| Asset | Original | WebP | Reduction | Output WxH | Max width cap |
| --- | ---: | ---: | ---: | --- | --- |
| talon-detail-accessories.webp | 173.0 KB | 109.3 KB | 36.8% | 1024×819 | 1600px |
| talon-detail-hang-tags.webp | 206.2 KB | 137.1 KB | 33.5% | 1024×819 | 1600px |
| talon-detail-neck-labels.webp | 227.3 KB | 161.8 KB | 28.8% | 1024×819 | 1600px |
| talon-detail-woven-labels.webp | 233.4 KB | 169.5 KB | 27.4% | 1024×819 | 1600px |
| talon-detail-zippers.webp | 222.3 KB | 165.6 KB | 25.5% | 1024×819 | 1600px |
| talon-hd-embroidery-production.webp | 983.3 KB | 260.3 KB | 73.5% | 1535×1024 | 1600px |
| talon-hd-hang-tags-flatlay.webp | 1072.4 KB | 341.9 KB | 68.1% | 1536×1024 | 1600px |
| talon-hd-neck-label-detail.webp | 1057.0 KB | 410.8 KB | 61.1% | 1536×1024 | 1600px |
| talon-hd-performance-zipper-detail.webp | 825.9 KB | 334.6 KB | 59.5% | 1536×1024 | 1600px |
| talon-hd-premium-custom-packaging.webp | 718.6 KB | 193.4 KB | 73.1% | 1536×1024 | 1600px |
| talon-hd-real-custom-packaging.webp | 326.3 KB | 70.0 KB | 78.5% | 1024×682 | 1600px |
| talon-hd-real-dtf-printing-factory.webp | 371.4 KB | 94.6 KB | 74.5% | 1024×682 | 1600px |
| talon-hd-real-heat-transfer-production.webp | 389.5 KB | 127.1 KB | 67.4% | 1024×682 | 1600px |
| talon-hd-real-private-label-branding.webp | 298.0 KB | 102.5 KB | 65.6% | 1024×682 | 1600px |
| talon-hd-sports-accessories-lifestyle.webp | 954.9 KB | 209.2 KB | 78.1% | 1536×1024 | 1600px |
| talon-hd-sublimation-motocross-production.webp | 345.1 KB | 96.7 KB | 72.0% | 1024×682 | 1600px |
| talon-hd-woven-labels-detail.webp | 846.5 KB | 384.5 KB | 54.6% | 1536×1024 | 1600px |
| talon-hd-real-chinese-sportswear-hero.webp | 1024×546 master → upscale | 248.7 KB | — | 2200×1173 | 2200px |
| talon-oem-private-label.webp | 2608.4 KB | 196.9 KB | 92.5% | 1536×1024 | 1600px |
| talon-oem-sublimation-printing.webp | 2545.1 KB | 221.2 KB | 91.3% | 1536×1024 | 1600px |
| talon-oem-teamwear-manufacturing.webp | 2152.8 KB | 123.5 KB | 94.3% | 1536×1024 | 1600px |
| talon-service-custom-packaging.webp | 161.3 KB | 88.9 KB | 44.9% | 1024×819 | 1600px |
| talon-service-dtf-printing.webp | 193.5 KB | 122.3 KB | 36.8% | 1024×682 | 1600px |
| talon-service-embroidery.webp | 193.8 KB | 134.4 KB | 30.6% | 1024×682 | 1600px |
| talon-service-heat-transfer.webp | 159.9 KB | 94.0 KB | 41.2% | 1024×682 | 1600px |
| talon-service-private-label.webp | 193.7 KB | 128.5 KB | 33.7% | 1024×682 | 1600px |
| talon-service-sublimation-printing.webp | 2465.4 KB | 255.0 KB | 89.7% | 1254×1254 | 1600px |
| talon-service-sublimation-process.webp | 175.8 KB | 98.5 KB | 44.0% | 1024×819 | 1600px |
| talon-technique-screen-printing.webp | 180.4 KB | 112.0 KB | 37.9% | 1024×682 | 1600px |
| talon-technique-sublimation-printing.webp | 191.0 KB | 119.7 KB | 37.3% | 1024×682 | 1600px |

**Totals:** 20643.4 KB → 5169.2 KB (**75.0%** smaller).

Settings: WebP quality 86, effort 6, smart subsample; hero assets capped at 2200px wide, all others at 1600px; EXIF orientation normalized.
