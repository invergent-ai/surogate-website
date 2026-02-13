"use client";

import { FileText, BookOpenText, X } from 'lucide-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import SyntaxHighlightedContent from './SyntaxHighlightedContent';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useState, useEffect } from 'react';

const tabImages = [
  '/acuracy.png',
  '/CustomEvalExactMatchResults.png',
  '/security.png',
  '/studio.png',
];

const deploymentImages = [
  '/Deployment-Inference-config_deployment.png',
  '/Deployment-Inference-deploy_from_lakefs.png',
  '/Deployment-Inference-serving_metrics.png',
];

const evaluationImages = [
  '/Evaluation-acuracy.png',
  '/Evaluation-customEvalExactMatchResults.png',
  '/Evaluation-security.png',
];

const trainingImages = [
  '/Training-recipe-1.png',
  '/Training-metrics.png',
  '/Training-recipe.png',
];

export default function Studio() {
  const [activeTab, setActiveTab] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);

  // Reset slider when tab changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [activeTab]);

  // Handle ESC key to close lightbox
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && lightboxOpen) {
        setLightboxOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [lightboxOpen]);

  const imagesForTab =
    activeTab === 0
      ? ['/studio.png']
      : activeTab === 1
        ? trainingImages
        : activeTab === 2
          ? evaluationImages
          : activeTab === 3
            ? deploymentImages
            : activeTab === 4
              ? ['/Data-hub.png']
              : [tabImages[activeTab % tabImages.length]];

  return (
    <section id="studio" className="scroll-mt-24 border-t border-zinc-200 dark:border-white/10 bg-white/95 dark:bg-zinc-950/70">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-14">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white">Surogate Studio</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            The open-source, enterprise-grade LLMOps platform built to accelerate the development and deployment of generative AI applications. Read more on the <a href="https://github.com/invergent-ai/surogate-studio" className="underline">Github page</a>
          </p>
        </div>

        <div className="mt-10 grid gap-y-10 gap-x-4 lg:grid-cols-2 lg:gap-y-4 items-stretch">
          {/* Studio Image */}
          <div className="h-full flex flex-col justify-between order-2 lg:order-2">
            <div className="flex items-start justify-center">
              <img
                src={imagesForTab[currentSlide % imagesForTab.length]}
                alt="Surogate Studio"
                className="w-full max-h-full object-contain z-10 cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => {
                  setLightboxImageIndex(currentSlide);
                  setLightboxOpen(true);
                }}
                title="Click to view full size"
              />
            </div>
            {imagesForTab.length > 1 && (
              <div className="flex items-center justify-center gap-3 bg-[var(--accent-purple)] dark:bg-transparent rounded-xl px-5 py-3">
                <button
                  type="button"
                  onClick={() =>
                    setCurrentSlide(
                      (prev) =>
                        (prev - 1 + imagesForTab.length) % imagesForTab.length,
                    )
                  }
                  className="rounded-full bg-white/10 px-3 py-1 text-xs text-white hover:bg-white/20 transition"
                >
                  Prev
                </button>
                <div className="flex gap-1">
                  {imagesForTab.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentSlide(idx)}
                      className={
                        idx === currentSlide
                          ? 'h-2 w-2 rounded-full bg-[var(--accent-orange)]'
                          : 'h-2 w-2 rounded-full bg-white/30'
                      }
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setCurrentSlide((prev) => (prev + 1) % imagesForTab.length)
                  }
                  className="rounded-full bg-white/10 px-3 py-1 text-xs text-white hover:bg-white/20 transition"
                >
                  Next
                </button>
              </div>
            )}
          </div>

          {/* Studio Features */}
          <div className="relative rounded-3xl border border-transparent text-white order-1 lg:order-1">
            <div className="grid gap-3">
              <div
                onClick={() => setActiveTab(0)}
                className={`flex items-center gap-3 rounded-[10px] bg-[var(--accent-purple)] p-4 cursor-pointer transition-opacity ${activeTab === 0 ? 'opacity-100' : 'opacity-70 hover:opacity-90'}`}
              >
                <span className="h-10 w-10 flex-shrink-0 tab-icon tab-icon-dashboard" />
                <div>
                  <p className="text-sm font-semibold">Cloud & On-Prem Infrastructure</p>
                  <p className="mt-1 text-xs">Run tasks on cloud or your on-prem GPU infrastructure</p>
                </div>
              </div>
              <div
                onClick={() => setActiveTab(1)}
                className={`flex items-center gap-3 rounded-[10px] bg-[var(--accent-purple)] p-4 cursor-pointer transition-opacity ${activeTab === 1 ? 'opacity-100' : 'opacity-70 hover:opacity-90'}`}
              >
                <span className="h-10 w-10 flex-shrink-0 tab-icon tab-icon-optimized" />
                <div>
                  <p className="text-sm font-semibold">Training, Fine-Tuning and Alignment</p>
                  <p className="mt-1 text-xs">Train, fine-tune, and align LLMs</p>
                </div>
              </div>
              <div
                onClick={() => setActiveTab(2)}
                className={`flex items-center gap-3 rounded-[10px] bg-[var(--accent-purple)] p-4 cursor-pointer transition-opacity ${activeTab === 2 ? 'opacity-100' : 'opacity-70 hover:opacity-90'}`}
              >
                <span className="h-10 w-10 flex-shrink-0 tab-icon tab-icon-native" />
                <div>
                  <p className="text-sm font-semibold">Evaluation</p>
                  <p className="mt-1 text-xs">Run comprehensive evaluations of LLMs for performance, accuracy, security and alignment</p>
                </div>
              </div>
              <div
                onClick={() => setActiveTab(3)}
                className={`flex items-center gap-3 rounded-[10px] bg-[var(--accent-purple)] p-4 cursor-pointer transition-opacity ${activeTab === 3 ? 'opacity-100' : 'opacity-70 hover:opacity-90'}`}
              >
                <span className="h-10 w-10 flex-shrink-0 tab-icon tab-icon-experimentation" />
                <div>
                  <p className="text-sm font-semibold">Deployment & Inference</p>
                  <p className="mt-1 text-xs">Deploy and run LLMs on multiple GPUs using KV-aware routing, GPU sharding, replicas, and disaggregated serving for production-grade performance</p>
                </div>
              </div>
              <div
                onClick={() => setActiveTab(4)}
                className={`flex items-center gap-3 rounded-[10px] bg-[var(--accent-purple)] p-4 cursor-pointer transition-opacity ${activeTab === 4 ? 'opacity-100' : 'opacity-70 hover:opacity-90'}`}
              >
                <span className="h-10 w-10 flex-shrink-0 tab-icon tab-icon-recipes-3" />
                <div>
                  <p className="text-sm font-semibold">Data Hub</p>
                  <p className="mt-1 text-xs">Your own, personal HuggingFace Hub for managing and sharing datasets and models</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            aria-label="Close lightbox"
          >
            <X className="h-8 w-8" />
          </button>

          {imagesForTab.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const newIndex =
                    (lightboxImageIndex - 1 + imagesForTab.length) %
                    imagesForTab.length;
                  setLightboxImageIndex(newIndex);
                  setCurrentSlide(newIndex);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full p-2"
                aria-label="Previous image"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const newIndex = (lightboxImageIndex + 1) % imagesForTab.length;
                  setLightboxImageIndex(newIndex);
                  setCurrentSlide(newIndex);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full p-2"
                aria-label="Next image"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}

          <div
            className="max-w-7xl max-h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={imagesForTab[lightboxImageIndex % imagesForTab.length]}
              alt={`Image ${lightboxImageIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>

          {imagesForTab.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {imagesForTab.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxImageIndex(idx);
                    setCurrentSlide(idx);
                  }}
                  className={`h-2 w-2 rounded-full transition-colors ${idx === lightboxImageIndex
                    ? 'bg-white'
                    : 'bg-white/30 hover:bg-white/50'
                    }`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
