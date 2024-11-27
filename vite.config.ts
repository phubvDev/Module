import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://13.124.14.236:8386', // URL của backend API
        changeOrigin: true, // Đảm bảo Origin của request chính xác
        rewrite: (path) => path.replace(/^\/api/, ''), // Loại bỏ phần prefix /api khi gửi yêu cầu
      },
    },
  },
})
