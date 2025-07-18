import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import './index.css'
import App from './App.jsx'

// Apply dark theme
document.documentElement.classList.add('dark');

// Get your Clerk publishable key from environment variables
const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "pk_test_bGVhcm5pbmctc2NvcnBpb24tOTAuY2xlcmsuYWNjb3VudHMuZGV2JA";

// Debug logging
console.log("Environment check:", {
  hasClerkKey: !!publishableKey,
  keyLength: publishableKey?.length,
  fromEnv: !!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
  allEnvVars: Object.keys(import.meta.env)
});

if (!publishableKey) {
  console.error("Missing Clerk publishable key. Please check Railway environment variables.");
  console.error("Available env vars:", import.meta.env);
  throw new Error("Missing Clerk publishable key");
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={publishableKey}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>,
)


