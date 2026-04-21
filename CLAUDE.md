# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static portfolio website for Akash Mahant (Finance & Accounting Professional). Three-file codebase: `index.html`, `css/styles.css`, `js/main.js`. No build tools, no dependencies. Serve with any static file server (e.g., `npx serve`) or open `index.html` directly.

## Architecture

- **`index.html`** — Single-page layout with sections: hero, about, experience, skills, projects, education, footer. All content is hardcoded.
- **`css/styles.css`** — All styling with CSS custom properties (teal/dark theme), responsive breakpoints at 768px/480px, reduced motion support.
- **`js/main.js`** — Vanilla JS initialization on DOMContentLoaded: scroll animations (IntersectionObserver), smooth scrolling, navbar effects, active nav highlighting, hero typing animation, skill bar animations, number counters, timeline animations, custom cursor, mobile menu, keyboard navigation.

## Working on this project

- There is no build step or test runner. Preview changes by opening `index.html` in a browser.
- All sections follow the same pattern: section header with badge/number, title, and content grid.
- Scroll-triggered animations use `IntersectionObserver` — add `.fade-in` class for fade-in, `.timeline-item` for timeline entries.
- Mobile-first responsive: desktop is default, mobile overrides in `@media (max-width: 767px)`.
