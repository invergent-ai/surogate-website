'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sun, Moon, Menu, X, BookOpen, Globe, Github, BookOpenText } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);

    if (newTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }

    localStorage.setItem('theme', newTheme);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', href);
      setIsMenuOpen(false);
    }
  };

  const logoSrc = mounted && theme === 'light' ? '/surogateBlack.svg' : '/surogateWhite.svg';

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur dark:border-white/10 dark:bg-zinc-950/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="#" className="flex min-w-0 items-center">
          <span className="flex h-10 items-center">
            <img
              src={logoSrc}
              width={632}
              height={205}
              className="h-full w-auto object-contain"
              alt="Surogate"
              suppressHydrationWarning
            />
          </span>
        </a>

        <nav className="hidden items-center gap-6 text-sm text-zinc-700 dark:text-zinc-300 md:flex">
          <a className="hover:font-semibold" href="#features" onClick={(e) => handleNavClick(e, '#features')}>Features</a>
          <a className="hover:font-semibold" href="#recipes" onClick={(e) => handleNavClick(e, '#recipes')}>Recipes</a>
          <a className="hover:font-semibold" href="#quickstart" onClick={(e) => handleNavClick(e, '#quickstart')}>Quickstart</a>
          <a className="hover:font-semibold" href="#hardware" onClick={(e) => handleNavClick(e, '#hardware')}>Hardware</a>
          <Link className="hover:font-semibold" href="/pricing">Pricing</Link>
          <Link className="hover:font-semibold" href="/about">About</Link>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="inline-flex items-center justify-center rounded-xl bg-zinc-100 p-2 text-zinc-900 ring-1 ring-zinc-200 hover:bg-zinc-200 dark:bg-white/5 dark:text-zinc-100 dark:ring-white/10 dark:hover:bg-white/10"
          >
            {theme === 'dark' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </button>
          <button
            onClick={toggleMenu}
            aria-controls="mobileMenu"
            aria-expanded={isMenuOpen}
            className="inline-flex items-center justify-center rounded-xl bg-zinc-100 p-2 text-zinc-900 ring-1 ring-zinc-200 hover:bg-zinc-200 dark:bg-white/5 dark:text-zinc-100 dark:ring-white/10 dark:hover:bg-white/10 md:hidden"
          >
            <span className="sr-only">Open menu</span>
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
          <a
            href="https://docs.surogate.ai"
            target="_blank"
            rel="noreferrer"
            className="hidden items-center rounded-xl bg-zinc-100 px-3 py-2 text-sm font-medium text-zinc-900 ring-1 ring-zinc-200 hover:bg-zinc-200 dark:bg-white/5 dark:text-zinc-100 dark:ring-white/10 dark:hover:bg-white/10 sm:inline-flex"
          >
            <BookOpenText className="mr-2 h-4 w-4" />
            Read Docs
          </a>
          {mounted && (
            <div className="hidden items-center rounded-xl bg-zinc-100 px-3 py-2 text-sm font-medium text-zinc-900 ring-1 ring-zinc-200 hover:bg-zinc-200 dark:bg-white/5 dark:text-zinc-100 dark:ring-white/10 dark:hover:bg-white/10 sm:inline-flex">
              <Github className="mr-2 h-4 w-4" />
              <iframe 
                src="https://ghbtns.com/github-btn.html?user=invergent-ai&repo=surogate&type=star&count=true" 
                frameBorder="0" 
                scrolling="0" 
                width="90" 
                height="20" 
                title="GitHub"
              ></iframe>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div id="mobileMenu" className="border-t border-zinc-200 bg-white/95 backdrop-blur dark:border-white/10 dark:bg-zinc-950/80 md:hidden">
          <div className="mx-auto max-w-6xl px-4 py-3">
            <nav className="grid gap-1 text-sm text-zinc-700 dark:text-zinc-200">
              <a className="rounded-xl px-3 py-2 hover:bg-zinc-100 dark:hover:bg-white/5" href="#features" onClick={(e) => handleNavClick(e, '#features')}>Features</a>
              <a className="rounded-xl px-3 py-2 hover:bg-zinc-100 dark:hover:bg-white/5" href="#recipes" onClick={(e) => handleNavClick(e, '#recipes')}>Recipes</a>
              <a className="rounded-xl px-3 py-2 hover:bg-zinc-100 dark:hover:bg-white/5" href="#quickstart" onClick={(e) => handleNavClick(e, '#quickstart')}>Quickstart</a>
              <a className="rounded-xl px-3 py-2 hover:bg-zinc-100 dark:hover:bg-white/5" href="#hardware" onClick={(e) => handleNavClick(e, '#hardware')}>Hardware</a>
              <Link className="rounded-xl px-3 py-2 hover:bg-zinc-100 dark:hover:bg-white/5" href="/pricing">Pricing</Link>
              <Link className="rounded-xl px-3 py-2 hover:bg-zinc-100 dark:hover:bg-white/5" href="/about">About</Link>
            </nav>
            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href="https://docs.surogate.ai"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-xl bg-zinc-100 px-3 py-2 text-sm font-medium text-zinc-900 ring-1 ring-zinc-200 hover:bg-zinc-200 dark:bg-white/5 dark:text-zinc-100 dark:ring-white/10 dark:hover:bg-white/10"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Docs
              </a>
              <a
                href="https://surogate.ai"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-xl bg-sky-50 px-3 py-2 text-sm font-medium text-sky-700 ring-1 ring-sky-200 hover:bg-sky-100 dark:bg-sky-400/10 dark:text-sky-200 dark:ring-sky-400/25 dark:hover:bg-sky-400/15"
              >
                <Globe className="mr-2 h-4 w-4" />
                Website
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
