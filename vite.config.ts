import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 3000
    },
    plugins: [
        react(),
        checker({
            typescript: true,
            eslint: {
                lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx,json}"'
            }
        }),
        tsconfigPaths()
    ],
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
                modifyVars: {
                    '@primary-color': '#1C9292',
                    '@secondary-color': '#DF7D34',
                    '@screen-xs': '480px',
                    '@screen-sm': '576px',
                    '@screen-md-inner': '767px',
                    '@screen-md': '768px',
                    '@screen-lg': '992px',
                    '@screen-xl': '1200px',
                    '@screen-xxl': '1600px'
                }
            }
        }
    }
});
