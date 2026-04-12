# 🛠️ PixelCrop

<p align="center">
  <img src="https://raw.githubusercontent.com/rifatcholakov/Pixel-Crop/main/public/favicon.png" width="128" alt="PixelCrop Logo" style="border-radius: 20%; box-shadow: 0 10px 30px rgba(0,0,0,0.15);" />
</p>

<p align="center">
  <strong>The Professional-Grade Creative Engine for Precision Image Cropping.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.2-blue?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-8.0-indigo?logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/Tests-89%2B%20Passed-emerald?logo=vitest" alt="Tests" />
  <img src="https://img.shields.io/badge/License-MIT-gray" alt="License" />
</p>

---

## 🌟 Overview

**PixelCrop** is a high-fidelity image cropping workbench designed for developers, designers, and creators who demand precision. Built from the ground up with a focus on core engineering principles, it transforms a simple UI task into a robust, laboratory-grade creative experience.

Whether you're prepping assets for a high-end design project or needing a reliable tool for your professional workflow, PixelCrop provides the accuracy of a desktop application with the accessibility of a modern web app.

## ✨ High-End Features

### 🎯 Pixel-Perfect Precision
Go beyond dragging handles. Our **Precision Inspector** allows you to manipulate Width, Height, X, and Y coordinates directly using the source image's native resolution. Every pixel counts.

### 🖥️ Real-Time Symmetrical Preview
See exactly what you'll get. The **Split Preview** workspace renders your crop in real-time on a separate high-performance canvas, ensuring zero surprises during export.

### 📱 Adaptive Responsive Architecture
PixelCrop isn't just "mobile-friendly"—it's mobile-first. 
- **Vertical Command Stack**: On ultra-mobile devices (<480px), controls shift to a 100% visible, one-per-row vertical layout.
- **Tablet Hybrid Mode**: A specialized Row-Wrap architecture for 768px–1180px viewports that balances density and ergonomics.
- **Extreme 300px Support**: Fully optimized for ultra-narrow devices like the iPhone SE, with zero-clipping guarantees.

### 🛡️ Privacy by Design
Your images never leave your machine. PixelCrop is a **100% client-side tool**. Image processing happens strictly in the browser memory, providing institutional-grade privacy and security.

---

## 🏗️ Architecture & Engineering

PixelCrop adheres to the **Single Responsibility Principle (SRP)** and a strictly decoupled, hook-based architecture.

### Data Flow Diagram
```mermaid
graph TD
    A[App Shell] --> B[Home Page]
    B --> C{State: Image Selected?}
    C -- No --> D[ImageUploader]
    C -- Yes --> E[ImageCropper]
    
    subgraph "UI Decomposition"
        E --> F[CropperTopBar]
        E --> G[Visual Workspace]
        E --> H[CropperDashboard]
    end
    
    subgraph "Logic Engines (Hooks)"
        E -.-> I[useCropMath]
        E -.-> J[useImageDownload]
        A -.-> K[useTheme]
        A -.-> L[useCookieConsent]
    end
    
    subgraph "Core Utilities"
        I --> M[canvasPreview]
        J --> N[cropImage Utils]
    end
```

### Technical Design Patterns
- **React 19 Composition**: Utilizing the latest React features for efficient rendering and state management.
- **Hook-Based Extraction**: All business logic (Math, Downloads, Privacy) is promoted to unit-testable custom hooks.
- **CSS Modules**: Scoped, maintainable styling that remains clean even as the layout scales.
- **Hardware Acceleration**: Leveraging the HTML5 Canvas API for high-resolution image transformations.

---

## 📂 Project Anatomy

| Path | Description |
|---|---|
| `src/components/` | Modular UI components (TopBar, Dashboard, Inspector). |
| `src/hooks/` | The "Brains" — mathematical and side-effect logic hooks. |
| `src/utils/` | Stateless, pure functions for image processing. |
| `src/pages/` | Routing endpoints and major application layouts. |
| `src/types/` | Global TypeScript definitions for robust type-safety. |

---

## 🧰 The Developer's API (Core Hooks)

### `useCropMath(imgRef)`
The geometric engine. It maps percentage-based UI inputs to the absolute physical pixel space of the uploaded asset.

### `useImageDownload({ imageSrc, file, onError })`
Handles the asynchronous render-to-export pipeline, including blob generation and hardware triggering.

### `useCookieConsent()`
A global privacy manager ensuring that user preferences for analytics and functionality are respected across sessions.

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: 18.x or higher
- **Package Manager**: npm or yarn

### 2. Setup & Installation
```bash
# Clone the repository
git clone https://github.com/rifatcholakov/Pixel-Crop.git

# Install dependencies
npm install
```

### 3. Development Scripts
| Command | Description |
|---|---|
| `npm run dev` | Launch the Vite development server with HMR. |
| `npm run test` | Execute the full **89+ Vitest suite**. |
| `npm run build` | Compile TypeScript and generate production bundle. |
| `npm run lint` | Perform a static analysis check with ESLint. |
| `npm run preview` | Locally preview the production build. |

---

## 🧪 Testing Philosophy

Quality is not an afterthought. PixelCrop is covered by a comprehensive test suite that ensures stability across every coordinate and callback.

- **Unit Testing**: 100% coverage on core math and logic hooks.
- **Integration Testing**: Verifying the synergy between `ImageCropper` and its sub-components.
- **Edge Case Validation**: Robust testing for zero-pixel crops, large file handling, and browser-resize events.

---

## 🔒 Institutional Privacy Commitment

Unlike traditional image editing tools, PixelCrop is built on a **Zero-Server Architecture**. 

- **Local Processing**: All canvas operations and image transformations are performed within your browser's V8 engine.
- **No Data Persistence**: Images are stored in volatile memory (RAM) and are cleared the moment the browser tab is closed or a reset is triggered.
- **Analytics Transparency**: Standard technical telemetry (if enabled in Cookie Settings) never includes image data or personal identifiers.

## 🌐 Browser Support

PixelCrop utilizes modern web standards including the **HTML5 Canvas API**, **CSS Variables**, and **ES Modules**.

| Browser | Supported Version |
|---|---|
| Chrome/Edge | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Mobile Browsers | iOS 14.5+ / Android Chrome 90+ (Optimized down to 300px) |

## 🛠️ Troubleshooting

### Image Load Failures
- Ensure the image is a valid format (JPEG, PNG, WebP).
- Check browser console for CORS errors if using remote URLs (PixelCrop is optimized for local file uploads).

### Performance Lag
- For images above 8K resolution, performance may vary based on your system's GPU acceleration. 
- Ensure "Hardware Acceleration" is enabled in your browser settings.

## 🤝 Contributing & Support

We welcome contributions from the community! Whether you're fixing a bug or suggesting a feature:

1. **Fork** the repository.
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`).
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`).
4. **Push** to the branch (`git push origin feature/AmazingFeature`).
5. **Open** a Pull Request.

### Contact
Built with ❤️ by **Rifat Cholakov**.

---

## 📜 License

This project is licensed under the MIT License. 
© 2026 PixelCrop. All rights reserved.
