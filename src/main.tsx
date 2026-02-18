import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { AuthProvider } from './context/AuthContext.tsx'
import { DataProvider } from './context/DataContext.tsx'
import { migrateLegacyData } from './utils/legacyMigration.ts'

if (import.meta.env.DEV || import.meta.env.VITE_ENABLE_MIGRATION === 'true') {
  (window as any).migrateLegacyData = migrateLegacyData;
  console.log('🛠 Migration Tool Available: Run window.migrateLegacyData() to import localStorage data to backend.');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </AuthProvider>
  </StrictMode>,
)
