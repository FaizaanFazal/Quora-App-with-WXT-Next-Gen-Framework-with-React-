import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    host_permissions: ['https://www.quora.com/*'],
    permissions: ['tabs', 'activeTab', 'scripting'],
    // Ensure popup is available (WXT sets this by default if using popup entrypoint)
    
  },
});
