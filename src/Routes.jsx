import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import MarketPrices from './pages/market-prices';
import IrrigationPlanning from './pages/irrigation-planning';
import FarmerDashboard from './pages/farmer-dashboard';
import CropRecommendations from './pages/crop-recommendations';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<FarmerDashboard />} />
        <Route path="/market-prices" element={<MarketPrices />} />
        <Route path="/irrigation-planning" element={<IrrigationPlanning />} />
        <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
       
        <Route path="/crop-recommendations" element={<CropRecommendations />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
