import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ShopContextProvider from "./context/ShopContext.jsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store/store.js";

// Import React Query's QueryClient and QueryClientProvider
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a new React Query client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ShopContextProvider>
          {/* Wrap your app with QueryClientProvider */}
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </ShopContextProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
);

