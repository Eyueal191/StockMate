import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import StockProvider from "./stockContext/StockContext.jsx";

// ✅ Redux imports
import { Provider } from "react-redux";
import store from "./redux/store.js";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// ✅ Create a query client instance
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Redux Provider wraps the entire app */}
    <Provider store={store}>
      {/* React Query Provider */}
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          {/* Custom context */}
          <StockProvider>
            <App />
          </StockProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
