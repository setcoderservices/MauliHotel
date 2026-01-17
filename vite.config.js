import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    watch: {
      // 👇 HUGE performance boost
      ignored: [
        "**/frames/**",   // image sequence
        "**/*.mp4",
        "**/*.mov",
      ],
    },
  },
  optimizeDeps: {
    exclude: ["gsap"], // prevents heavy re-optimization
  },
});
