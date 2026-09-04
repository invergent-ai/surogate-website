// Copyright (c) 2026, Invergent SA, developed by Flavius Burca
// SPDX-License-Identifier: AGPL-3.0-only
//
// Render settings for the tutorial catalogue.
//
// The compositions are already 1920×1080 at 30fps, which is what YouTube wants
// for 16:9. What this file adds is the encode: everything below exists because
// these films are flat colour, thin rules and a lot of small type, which is the
// worst case for a video codec.
//
// Written as .mjs, not .ts: a TypeScript Remotion config makes the CLI demand a
// tsconfig.json in the project root, and this project deliberately has only a
// jsconfig.json. Adding one would change how Next builds the site.
import { Config } from "@remotion/cli/config";

// H.264 in an MP4 — the format YouTube ingests without re-wrapping.
Config.setCodec("h264");

// 4:2:0 chroma. Remotion's default (yuv444p) is higher fidelity and is either
// rejected or silently re-encoded by most players and by YouTube's ingest.
Config.setPixelFormat("yuv420p");

// CRF 16 is visually lossless for this material. The default leaves ringing
// around white type on the dark ground, and the files are small either way —
// the ceiling here is upload quality, not disk.
Config.setCrf(16);

// PNG frames. JPEG is faster but adds its own artefacts to hairline borders
// before the video codec ever sees them, and the render is not the slow part.
Config.setVideoImageFormat("png");

// Rec. 709 is set on the command line, not here: `Config.setColorSpace` is
// ignored in 4.0.516 — a render made with it still comes out yuvj420p / full
// range — while `--color-space=bt709` produces yuv420p / tv / bt709 as
// intended. scripts/render-films.sh passes the flag.
