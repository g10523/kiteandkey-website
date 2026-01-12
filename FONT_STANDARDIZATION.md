# Font Standardization Guide

This document outlines the font system used across the Kite & Key Academy website.

## Primary Fonts

The website uses two primary fonts:

1.  **Julius Sans One** (`font-julius`)
    *   **Usage:** All Headings (H1–H6), Feature Titles, Pricing Numbers, Stats.
    *   **Characteristics:** Elegant, geometric, modern, distinct.
    *   **Weights:** Regular (400) only. Avoid applying multiple weights like `font-bold` or `font-light` as they may not render correctly or are unnecessary.

2.  **Inter** (`font-inter`)
    *   **Usage:** Body text, buttons, labels, navigation, small UI elements.
    *   **Characteristics:** Clean, legible, versatile sans-serif.
    *   **Weights:**
        *   `font-light` (300): Subtle text, captions.
        *   `font-normal` (400): Default body text.
        *   `font-medium` (500): Labels, subheadings, navigation.
        *   `font-semibold` (600): Buttons, strong emphasis.
        *   `font-bold` (700): UI alerts, critical actions.

## Usage Guidelines

### Headings
*   **H1 (Page Title):** `font-julius text-5xl md:text-6xl text-[#3F3A52]`
*   **H2 (Section Heading):** `font-julius text-3xl md:text-4xl text-[#3F3A52]`
*   **H3 (Card Title):** `font-julius text-xl text-[#3F3A52]`

### Body Text
*   **Paragraph:** `text-base text-[#6B647F] leading-relaxed` (Inter is default)
*   **Large Intro:** `text-lg md:text-xl text-[#5E5574]`

### Buttons
*   **Primary:** `bg-[#5E5574] text-white font-semibold rounded-xl`

## Implementation Status
All core pages have been updated to use **Julius Sans One** for headings.

*   ✅ `app/page.tsx`
*   ✅ `app/meet-the-team/page.tsx`
*   ✅ `app/pricing/page.tsx`
*   ✅ `app/mindprint/page.tsx`
*   ✅ `app/courses/page.tsx`
*   ✅ `app/courses/year-10/maths/page.tsx`
*   ✅ `app/lift-initiative/page.tsx`
*   ✅ `app/consultation/ConsultationForm.tsx`
*   ✅ `app/enrol/page.tsx`
*   ✅ `app/kite-and-key-in-the-community/page.tsx`

## Color Palette (Keep Consistent)
*   Primary text: `text-[#3F3A52]`
*   Secondary text: `text-[#6B647F]`
*   Accent: `text-[#5E5574]`
*   Muted: `text-[#8C84A8]`
