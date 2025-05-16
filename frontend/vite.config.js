import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'react': path.resolve(__dirname, 'src/react-shim.js'),
      'react-dom': path.resolve(__dirname, 'src/react-dom-shim.js')
    },
    dedupe: ['vue']
  },
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    minify: 'terser',
    sourcemap: false,
    // 禁用依赖警告
    commonjsOptions: {
      ignoreDynamicRequires: true
    },
    // 兼容性设置
    target: 'es2015',
    // 依赖优化
    rollupOptions: {
      onwarn(warning, warn) {
        // 忽略循环依赖警告
        if (warning.code === 'CIRCULAR_DEPENDENCY') return
        // 忽略"无法评估表达式"警告 
        if (warning.code === 'EVAL') return
        warn(warning)
      },
      external: ['react', 'react-dom'],
      output: {
        manualChunks: {
          vendor: ['vue'],
          solana: ['@solana/wallet-adapter-base', '@solana/wallet-adapter-phantom', '@solana/wallet-adapter-vue', '@solana/wallet-adapter-wallets'],
          particles: ['tsparticles-engine', 'vue3-particles'],
          utils: ['gsap', 'howler']
        }
      }
    }
  },
  optimizeDeps: {
    // 禁用对等依赖检查
    include: ['vue'],
    exclude: [],
    force: true,
    esbuildOptions: {
      target: 'es2015'
    }
  }
}) 