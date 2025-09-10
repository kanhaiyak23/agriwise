import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import AlertBanner from '../../components/ui/AlertBanner';
import LocationIndicator from '../../components/ui/LocationIndicator';
import ConnectivityStatus from '../../components/ui/ConnectivityStatus';
import WeatherCard from './components/WeatherCard';
import SoilMoistureCard from './components/SoilMoistureCard';
import CropStatusCard from './components/CropStatusCard';
import AlertsCard from './components/AlertsCard';
import QuickActionsPanel from './components/QuickActionsPanel';
import MarketPricesWidget from './components/MarketPricesWidget';
import FarmingCalendar from './components/FarmingCalendar';
import MetricsOverview from './components/MetricsOverview';

const FarmerDashboard = () => {
  const [showAlertBanner, setShowAlertBanner] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Mock data for weather
  const weatherData = {
    temperature: 28,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 12,
    forecast: [
      { day: "Today", condition: "cloudy", temp: "28" },
      { day: "Tomorrow", condition: "rainy", temp: "25" },
      { day: "Thu", condition: "sunny", temp: "30" }
    ]
  };

  // Mock data for soil moisture
  const soilData = {
    moistureLevel: 72,
    status: "Optimal",
    lastUpdated: "5 min ago",
    sensorLocations: ["Field A", "Field B", "Greenhouse", "Orchard"]
  };

  // Mock data for crop status
  const cropData = {
    cropName: "Wheat",
    growthStage: "Flowering",
    healthScore: 85,
    daysToHarvest: 45,
    area: 12.5,
    issues: ["Minor pest activity in sector 3", "Irrigation needed in field B"]
  };

  // Mock data for alerts
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: "weather",
      priority: "high",
      message: "Heavy rain expected in 2 hours. Secure equipment and check drainage systems.",
      time: "10 min ago",
      action: {
        label: "View Details",
        handler: () => console.log("Weather alert action")
      }
    },
    {
      id: 2,
      type: "pest",
      priority: "medium",
      message: "Aphid activity detected in wheat field. Consider treatment options.",
      time: "1 hour ago",
      action: {
        label: "Get Treatment",
        handler: () => console.log("Pest treatment action")
      }
    },
    {
      id: 3,
      type: "irrigation",
      priority: "low",
      message: "Scheduled irrigation for field A in 30 minutes.",
      time: "2 hours ago"
    }
  ]);

  // Mock data for market prices
  const marketData = [
    {
      id: 1,
      crop: "Wheat",
      market: "Local Mandi",
      price: 2150,
      unit: "quintal",
      trend: "up",
      change: "+₹50 (2.4%)"
    },
    {
      id: 2,
      crop: "Rice",
      market: "Regional Market",
      price: 1850,
      unit: "quintal",
      trend: "down",
      change: "-₹25 (1.3%)"
    },
    {
      id: 3,
      crop: "Maize",
      market: "Wholesale Market",
      price: 1650,
      unit: "quintal",
      trend: "stable",
      change: "No change"
    }
  ];

  // Mock data for farming calendar
  const calendarData = [
    {
      id: 1,
      title: "Apply Fertilizer",
      description: "NPK fertilizer application for wheat crop in field A",
      type: "fertilizer",
      priority: "high",
      date: "Today",
      completed: false,
      progress: 0
    },
    {
      id: 2,
      title: "Irrigation Schedule",
      description: "Drip irrigation for tomato plants in greenhouse",
      type: "irrigation",
      priority: "medium",
      date: "Tomorrow",
      completed: false,
      progress: 25
    },
    {
      id: 3,
      title: "Pest Treatment",
      description: "Organic pesticide spray for aphid control",
      type: "treatment",
      priority: "high",
      date: "Sep 12",
      completed: true,
      progress: 100
    },
    {
      id: 4,
      title: "Harvest Planning",
      description: "Prepare equipment for wheat harvest",
      type: "harvest",
      priority: "low",
      date: "Sep 15",
      completed: false,
      progress: 10
    }
  ];

  // Mock data for metrics
  const metricsData = {
    yieldPrediction: {
      amount: 45.2,
      unit: "quintals/acre",
      trend: 8.5
    },
    financialSummary: {
      revenue: 125000,
      profitMargin: 32,
      trend: 12.3
    },
    efficiencyScore: {
      overall: 78,
      breakdown: {
        water: 85,
        fertilizer: 72,
        pest: 80,
        timing: 75
      }
    },
    historicalComparison: [
      { period: "2023", yield: "42.1", change: 8.5 },
      { period: "2022", yield: "38.8", change: -2.1 },
      { period: "2021", yield: "39.6", change: 5.2 }
    ]
  };

  const handleDismissAlert = (alertId) => {
    setAlerts(alerts?.filter(alert => alert?.id !== alertId));
  };

  const handleViewAllAlerts = () => {
    console.log("Opening all alerts view");
  };

  const handleVoiceInput = () => {
    console.log("Voice input activated");
  };

  const handleLocationChange = () => {
    console.log("Location change requested");
  };

  const handleSync = () => {
    console.log("Manual sync triggered");
  };

  const handleRetry = () => {
    console.log("Connection retry triggered");
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Farmer Dashboard - AgriWise</title>
        <meta name="description" content="Comprehensive farming dashboard with real-time insights, weather updates, crop monitoring, and AI-powered recommendations for smart agriculture." />
      </Helmet>

      <Header />
      
      {showAlertBanner && (
        <AlertBanner
          type="warning"
          message="Weather alert: Heavy rain expected in your area within 2 hours. Secure equipment and check drainage."
          isVisible={showAlertBanner}
          onDismiss={() => setShowAlertBanner(false)}
          actionLabel="View Details"
          onAction={() => console.log("Weather alert action")}
        />
      )}

      <main className={`pt-16 ${showAlertBanner ? 'pt-28' : 'pt-16'} transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-2">
                Welcome back, Rajesh Kumar
              </h1>
              <p className="text-muted-foreground">
                Here's what's happening on your farm today
              </p>
            </div>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <LocationIndicator
                currentLocation="Green Valley Farm"
                coordinates="28.6139°N, 77.2090°E"
                lastUpdate="2 min ago"
                isOnline={isOnline}
                onLocationChange={handleLocationChange}
              />
              <ConnectivityStatus
                isOnline={isOnline}
                lastSyncTime="2 minutes ago"
                pendingSyncCount={isOnline ? 0 : 3}
                onSync={handleSync}
                onRetry={handleRetry}
              />
            </div>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column - Primary Cards */}
            <div className="lg:col-span-8 space-y-6">
              {/* Top Row - Weather, Soil, Crop Status */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <WeatherCard weatherData={weatherData} />
                <SoilMoistureCard soilData={soilData} />
                <CropStatusCard cropData={cropData} />
              </div>

              {/* Metrics Overview */}
              <MetricsOverview metricsData={metricsData} />

              {/* Farming Calendar */}
              <FarmingCalendar calendarData={calendarData} />
            </div>

            {/* Right Column - Actions and Alerts */}
            <div className="lg:col-span-4 space-y-6">
              <QuickActionsPanel onVoiceInput={handleVoiceInput} />
              <AlertsCard 
                alerts={alerts}
                onViewAll={handleViewAllAlerts}
                onDismiss={handleDismissAlert}
              />
              <MarketPricesWidget marketData={marketData} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FarmerDashboard;