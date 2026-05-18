import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Placeholder for future API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Generalsoft API is running" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        host: '0.0.0.0',
        port: 3000,
        hmr: false // HMR disabled for agent stability
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`\x1b[32mâœ“ Server running on http://localhost:${PORT}\x1b[0m`);
    console.log(`\x1b[34mâ„¹ Environment: ${process.env.NODE_ENV || 'development'}\x1b[0m`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
