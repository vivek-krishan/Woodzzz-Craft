import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.DOMAIN_URL": JSON.stringify(env.DOMAIN_URL),
      "process.env.razorpay_key_id": JSON.stringify(env.razorpay_key_id),
    },
    plugins: [react()],
  };
});
