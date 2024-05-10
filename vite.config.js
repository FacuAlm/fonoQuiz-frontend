import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: "FonoQuiz",
        description: "FonoQuiz - Fonoaudiología",
        short_name: "FonoQuiz es una plataforma de juegos terapéuticos de fonoaudiología para niños y niñas con trastornos del habla y lenguaje.",
        theme_color: "#f9f6fe",
        background_color: "#f9f6fe",
        display: "standalone",
        display_override: ["window-controls-overlay"],
        scope: "/",

        start_url: "/",
        icons: [
          {
            src: "/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
