import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import AlertBanner from '../../components/ui/AlertBanner';
import LocationIndicator from '../../components/ui/LocationIndicator';
import ConnectivityStatus from '../../components/ui/ConnectivityStatus';
import PriceCard from './components/PriceCard';
import PriceChart from './components/PriceChart';
import MarketComparison from './components/MarketComparison';
import PriceAlerts from './components/PriceAlerts';
import DemandIndicators from './components/DemandIndicators';
import QuickActions from './components/QuickActions';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';

const MarketPrices = () => {
  const [selectedCrop, setSelectedCrop] = useState('wheat');
  const [viewMode, setViewMode] = useState('overview');
  const [showAlert, setShowAlert] = useState(true);
  const [isOnline, setIsOnline] = useState(true);
  const [lastSyncTime, setLastSyncTime] = useState('2 minutes ago');

  // Mock crop price data
  const cropPrices = [
    {
      id: 'wheat',
      name: 'Wheat',
      currentPrice: 2260,
      change: 40,
      changePercent: 1.8,
      trend: 'up',
      unit: 'per quintal'
    },
    {
      id: 'rice',
      name: 'Rice',
      currentPrice: 1850,
      change: -25,
      changePercent: -1.3,
      trend: 'down',
      unit: 'per quintal'
    },
    {
      id: 'corn',
      name: 'Corn',
      currentPrice: 1520,
      change: 15,
      changePercent: 1.0,
      trend: 'up',
      unit: 'per quintal'
    },
    {
      id: 'sugarcane',
      name: 'Sugarcane',
      currentPrice: 350,
      change: 5,
      changePercent: 1.4,
      trend: 'up',
      unit: 'per ton'
    },
    {
      id: 'cotton',
      name: 'Cotton',
      currentPrice: 6200,
      change: -80,
      changePercent: -1.3,
      trend: 'down',
      unit: 'per quintal'
    },
    {
      id: 'soybean',
      name: 'Soybean',
      currentPrice: 4150,
      change: 25,
      changePercent: 0.6,
      trend: 'up',
      unit: 'per quintal'
    }
  ];

  const cropOptions = cropPrices?.map(crop => ({
    value: crop?.id,
    label: crop?.name
  }));

  const viewModeOptions = [
    { value: 'overview', label: 'Overview' },
    { value: 'charts', label: 'Price Charts' },
    { value: 'comparison', label: 'Market Comparison' },
    { value: 'alerts', label: 'Price Alerts' },
    { value: 'demand', label: 'Demand Analysis' }
  ];

  useEffect(() => {
    // Simulate real-time price updates
    const interval = setInterval(() => {
      setLastSyncTime('Just now');
      setTimeout(() => setLastSyncTime('1 minute ago'), 60000);
    }, 300000); // Update every 5 minutes

    return () => clearInterval(interval);
  }, []);

  const handleCropSelect = (cropId) => {
    setSelectedCrop(cropId);
  };

  const handleSync = () => {
    setLastSyncTime('Syncing...');
    setTimeout(() => {
      setLastSyncTime('Just now');
    }, 2000);
  };

  const selectedCropData = cropPrices?.find(crop => crop?.id === selectedCrop);

  const renderContent = () => {
    switch (viewMode) {
      case 'charts':
        return (
          <div className="space-y-6">
            <PriceChart cropName={selectedCropData?.name} />
            <QuickActions />
          </div>
        );
      case 'comparison':
        return (
          <div className="space-y-6">
            <MarketComparison selectedCrop={selectedCropData?.name} />
            <QuickActions />
          </div>
        );
      case 'alerts':
        return (
          <div className="space-y-6">
            <PriceAlerts />
            <QuickActions />
          </div>
        );
      case 'demand':
        return (
          <div className="space-y-6">
            <DemandIndicators />
            <QuickActions />
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            {/* Price Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cropPrices?.map((crop) => (
                <PriceCard
                  key={crop?.id}
                  crop={crop?.name}
                  currentPrice={crop?.currentPrice}
                  change={crop?.change}
                  changePercent={crop?.changePercent}
                  trend={crop?.trend}
                  unit={crop?.unit}
                  isSelected={selectedCrop === crop?.id}
                  onClick={() => handleCropSelect(crop?.id)}
                />
              ))}
            </div>
            {/* Selected Crop Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PriceChart cropName={selectedCropData?.name} />
              <QuickActions />
            </div>
            {/* Market Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MarketComparison selectedCrop={selectedCropData?.name} />
              <PriceAlerts />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {showAlert && (
        <AlertBanner
          type="info"
          message="Market prices updated 2 minutes ago. Wheat prices showing upward trend with 1.8% increase."
          onDismiss={() => setShowAlert(false)}
          actionLabel="View Details"
          onAction={() => setViewMode('charts')}
        />
      )}
      <main className={`pt-16 ${showAlert ? 'pt-32' : 'pt-16'}`}>
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div className="flex items-center space-x-4 mb-4 lg:mb-0">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="TrendingUp" size={24} color="white" />
              </div>
              <div>
                <h1 className="font-heading font-bold text-3xl text-foreground">
                  Market Prices
                </h1>
                <p className="text-muted-foreground">
                  Real-time agricultural commodity pricing and market intelligence
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <LocationIndicator
                currentLocation="Green Valley Farm"
                coordinates="28.6139°N, 77.2090°E"
                lastUpdate="2 min ago"
                isOnline={isOnline}
                onLocationChange={() => {}} // Add missing required prop
              />
              <ConnectivityStatus
                isOnline={isOnline}
                lastSyncTime={lastSyncTime}
                pendingSyncCount={0}
                onSync={handleSync}
                onRetry={handleSync} // Add missing required prop
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center space-x-4">
              <Select
                options={cropOptions}
                value={selectedCrop}
                onChange={setSelectedCrop}
                placeholder="Select crop"
                className="w-48"
              />
              <Button
                variant="outline"
                iconName="RefreshCw"
                iconPosition="left"
                onClick={handleSync}
                disabled={lastSyncTime === 'Syncing...'}
              >
                {lastSyncTime === 'Syncing...' ? 'Syncing...' : 'Refresh'}
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              {viewModeOptions?.map((option) => (
                <Button
                  key={option?.value}
                  variant={viewMode === option?.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode(option?.value)}
                  className="hidden sm:inline-flex"
                >
                  {option?.label}
                </Button>
              ))}
              
              {/* Mobile View Mode Selector */}
              <div className="sm:hidden">
                <Select
                  options={viewModeOptions}
                  value={viewMode}
                  onChange={setViewMode}
                  placeholder="Select view"
                />
              </div>
            </div>
          </div>

          {/* Market Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="TrendingUp" size={16} className="text-success" />
                <span className="text-sm text-muted-foreground">Trending Up</span>
              </div>
              <p className="text-2xl font-bold text-card-foreground">4</p>
              <p className="text-xs text-muted-foreground">commodities</p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="TrendingDown" size={16} className="text-error" />
                <span className="text-sm text-muted-foreground">Trending Down</span>
              </div>
              <p className="text-2xl font-bold text-card-foreground">2</p>
              <p className="text-xs text-muted-foreground">commodities</p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Bell" size={16} className="text-warning" />
                <span className="text-sm text-muted-foreground">Active Alerts</span>
              </div>
              <p className="text-2xl font-bold text-card-foreground">3</p>
              <p className="text-xs text-muted-foreground">price alerts</p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="MapPin" size={16} className="text-primary" />
                <span className="text-sm text-muted-foreground">Markets</span>
              </div>
              <p className="text-2xl font-bold text-card-foreground">5</p>
              <p className="text-xs text-muted-foreground">nearby</p>
            </div>
          </div>

          {/* Main Content */}
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default MarketPrices;