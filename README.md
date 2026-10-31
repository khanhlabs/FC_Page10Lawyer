# Fastcoding VN - Coding Test

## 1. Project Overview

This repository contains a landing page for Fastcoding VN: a static real estate landing page implemented from the provided Figma design using pure HTML and CSS. The goal is to reproduce the design accurately and make the page responsive on PC and smartphone screens.

## 2. Requirements

- Use pure HTML and CSS without supporting frameworks.
- Support responsive layouts on PC and smartphone.
- Use relative paths in the source code.
- Keep the code clean and minimize bugs.
- Submit a test-server URL and data server information.

## 3. Project Structure

```text
Page10Lawyer/
├── assets
|   ├── icons
|   ├── images
|   ├── logos
|
├── css/
│   ├── style.css
|
|
└── README.md
```

## 4. Structure Decisions

### CSS structure

CSS is separated by page section to keep styles easy to locate and maintain as the page grows. `style.css` contains theme variables, resets, and shared styles. Section stylesheets follow it, while `responsive.css` loads last to apply breakpoint overrides.

### Why HTML is not split into multiple files

The page intentionally remains in a single `index.html`. This static HTML/CSS test uses no component framework or server-side template engine, and plain HTML has no native component/include mechanism. Splitting sections into separate HTML files would add unnecessary complexity. Semantic sections and comments keep the document readable and appropriate for the scope of the test.

### Assets

The `images/` directory separates logo and SVG assets from the HTML and CSS. Local stylesheet and image references use relative paths to satisfy the test requirements and keep the project portable.
