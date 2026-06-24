# Enikkom Construction Limited - Official Website

This is the repository for the **Enikkom Construction Limited** official website.
It is a **fully static** marketing site built with React, Vite, and Tailwind CSS.
There is no backend — all content is served from the code and bundled assets.

## 🏗️ Project Overview

Enikkom Construction Limited is a leading Nigerian contractor specializing in Horizontal Directional Drilling (HDD), pipeline construction, dredging, and marine civil works.

### Key Features
- **Static site:** All page content ships with the build — no database or API required.
- **Responsive Design:** Optimized for all devices (Mobile, Tablet, Desktop).
- **Performance:** Built with Vite for fast loading and optimized, responsive images.

## 🚀 Getting Started

To run this project locally:

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd enikkom-main
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

4.  **Build for production**
    ```bash
    npm run build
    ```

## 🛠️ Tech Stack

-   **Frontend Framework:** React (Vite)
-   **Styling:** Tailwind CSS, Shadcn UI
-   **State Management:** React Context + Hooks
-   **Icons:** Lucide React

## 📂 Project Structure

-   `/src/components`: Reusable UI components.
-   `/src/pages`: Public route components.
-   `/src/content`: Static content (company profile, equipment specs, image selections).
-   `/src/hooks`: Custom React hooks (e.g., `useSiteSettings`).
-   `/src/assets`: Images and video imported by the build.
-   `/public`: Files served at the site root (downloads/PDFs, brand logos, client logos).
-   `/resources`: Local-only source/reference archives (not in git — see `resources/README.md`).

## 📨 Contact / RFQ form

The site is static, so the Request-for-Quote form does not submit to a server.
On submit it directs visitors to email **info@enikkom.com** directly.

## 📄 License

Proprietary software for Enikkom Construction Limited. All rights reserved.
