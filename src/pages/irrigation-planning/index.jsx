import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import AlertBanner from '../../components/ui/AlertBanner';
import LocationIndicator from '../../components/ui/LocationIndicator';
import ConnectivityStatus from '../../components/ui/ConnectivityStatus';
import IrrigationCalendar from './components/IrrigationCalendar';
import SoilMoistureGauges from './components/SoilMoistureGauges';
import WeatherIntegration from './components/WeatherIntegration';
import CropWaterRequirements from './components/CropWaterRequirements';
import ManualOverrideControls from './components/ManualOverrideControls';
import WaterUsageTracking from './components/WaterUsageTracking';
import Icon from '../../components/AppIcon';


const IrrigationPlanning = () => {
  const [activeTab, setActiveTab] = useState('schedule');
  const [showAlert, setShowAlert] = useState(true);
  const [isOnline, setIsOnline] = useState(true);
  const [lastSyncTime, setLastSyncTime] = useState('2 minutes ago');

  // Mock data for irrigation schedules
  const [irrigationSchedules] = useState([
    {
      id: 1,
      date: '2025-01-10',
      time: '06:00',
      zone: 'Zone A',
      duration: 45,
      waterAmount: 850,
      type: 'automatic',
      status: 'scheduled'
    },
    {
      id: 2,
      date: '2025-01-10',
      time: '18:30',
      zone: 'Zone B',
      duration: 30,
      waterAmount: 600,
      type: 'manual',
      status: 'completed'
    },
    {
      id: 3,
      date: '2025-01-11',
      time: '07:00',
      zone: 'Zone C',
      duration: 60,
      waterAmount: 1200,
      type: 'automatic',
      status: 'active'
    },
    {
      id: 4,
      date: '2025-01-11',
      time: '19:00',
      zone: 'Zone A',
      duration: 40,
      waterAmount: 750,
      type: 'automatic',
      status: 'scheduled'
    }
  ]);

  // Mock data for soil moisture sensors
  const [sensorData] = useState([
    {
      id: 'sensor-1',
      zone: 'Zone A - Tomatoes',
      location: 'North Field',
      moistureLevel: 45,
      optimalRange: { min: 60, max: 80 },
      lastReading: '5 min ago',
      depth: 15,
      status: 'online'
    },
    {
      id: 'sensor-2',
      zone: 'Zone B - Wheat',
      location: 'East Field',
      moistureLevel: 75,
      optimalRange: { min: 50, max: 70 },
      lastReading: '3 min ago',
      depth: 20,
      status: 'online'
    },
    {
      id: 'sensor-3',
      zone: 'Zone C - Corn',
      location: 'South Field',
      moistureLevel: 35,
      optimalRange: { min: 55, max: 75 },
      lastReading: '1 min ago',
      depth: 18,
      status: 'online'
    }
  ]);

  // Mock weather data
  const [weatherData] = useState({
    current: {
      temperature: 28,
      feelsLike: 32,
      condition: 'partly-cloudy',
      humidity: 65,
      windSpeed: 12,
      visibility: 10
    },
    forecast: [
      {
        date: '2025-01-10',
        high: 30,
        low: 18,
        condition: 'sunny',
        rainProbability: 10,
        windSpeed: 8
      },
      {
        date: '2025-01-11',
        high: 28,
        low: 16,
        condition: 'cloudy',
        rainProbability: 40,
        windSpeed: 15
      },
      {
        date: '2025-01-12',
        high: 25,
        low: 14,
        condition: 'rainy',
        rainProbability: 85,
        windSpeed: 20
      },
      {
        date: '2025-01-13',
        high: 27,
        low: 17,
        condition: 'partly-cloudy',
        rainProbability: 30,
        windSpeed: 10
      },
      {
        date: '2025-01-14',
        high: 31,
        low: 19,
        condition: 'sunny',
        rainProbability: 5,
        windSpeed: 6
      },
      {
        date: '2025-01-15',
        high: 29,
        low: 18,
        condition: 'cloudy',
        rainProbability: 25,
        windSpeed: 12
      },
      {
        date: '2025-01-16',
        high: 26,
        low: 15,
        condition: 'stormy',
        rainProbability: 90,
        windSpeed: 25
      }
    ],
    alerts: [
      {
        title: 'Heavy Rain Warning',
        description: 'Heavy rainfall expected on January 12th. Consider adjusting irrigation schedules.',
        severity: 'high',
        validUntil: 'Jan 12, 11:59 PM',
        irrigationImpact: 'Reduce by 70%'
      }
    ]
  });

  // Mock crop data
  const [cropData] = useState([
    {
      id: 1,
      name: 'Tomatoes',
      variety: 'Roma',
      area: 2.5,
      growthStage: 'flowering',
      daysFromPlanting: 45,
      currentWater: 120,
      requiredWater: 150,
      nextIrrigation: 'Today 6:00 AM',
      irrigationDuration: 45,
      soilType: 'Loamy',
      phLevel: '6.8',
      plantingDate: 'Nov 25, 2024',
      expectedHarvest: 'Feb 15, 2025',
      stageProgress: 65,
      stageDescription: 'Critical flowering stage requiring consistent moisture levels'
    },
    {
      id: 2,
      name: 'Wheat',
      variety: 'HD-2967',
      area: 5.0,
      growthStage: 'vegetative',
      daysFromPlanting: 30,
      currentWater: 80,
      requiredWater: 100,
      nextIrrigation: 'Tomorrow 7:00 AM',
      irrigationDuration: 60,
      soilType: 'Clay Loam',
      phLevel: '7.2',
      plantingDate: 'Dec 10, 2024',
      expectedHarvest: 'Apr 20, 2025',
      stageProgress: 40,
      stageDescription: 'Active vegetative growth phase with moderate water needs'
    },
    {
      id: 3,
      name: 'Corn',
      variety: 'Sweet Corn',
      area: 3.0,
      growthStage: 'seedling',
      daysFromPlanting: 15,
      currentWater: 40,
      requiredWater: 60,
      nextIrrigation: 'Today 8:00 AM',
      irrigationDuration: 30,
      soilType: 'Sandy Loam',
      phLevel: '6.5',
      plantingDate: 'Dec 25, 2024',
      expectedHarvest: 'May 10, 2025',
      stageProgress: 25,
      stageDescription: 'Early seedling stage requiring gentle, frequent watering'
    }
  ]);

  // Mock zones data
  const [zones] = useState([
    {
      id: 'zone-a',
      name: 'Zone A - North Field',
      cropType: 'Tomatoes',
      area: 2.5,
      status: 'scheduled',
      nextScheduled: 'Today 6:00 AM'
    },
    {
      id: 'zone-b',
      name: 'Zone B - East Field',
      cropType: 'Wheat',
      area: 5.0,
      status: 'idle',
      nextScheduled: 'Tomorrow 7:00 AM'
    },
    {
      id: 'zone-c',
      name: 'Zone C - South Field',
      cropType: 'Corn',
      area: 3.0,
      status: 'active',
      nextScheduled: null
    }
  ]);

  // Mock saved presets
  const [savedPresets] = useState([
    {
      id: '1',
      name: 'Morning Tomato',
      zoneId: 'zone-a',
      duration: 45,
      waterAmount: 850,
      createdAt: '2025-01-05T10:30:00Z'
    },
    {
      id: '2',
      name: 'Evening Wheat',
      zoneId: 'zone-b',
      duration: 60,
      waterAmount: 1200,
      createdAt: '2025-01-03T15:45:00Z'
    }
  ]);

  // Mock usage data
  const [usageData] = useState({
    summary: {
      totalUsage: 15420,
      efficiency: 82,
      cost: 2340,
      savings: 1850,
      usageChange: -8,
      efficiencyChange: 5,
      costPerLiter: 0.15
    },
    trends: [
      { date: 'Jan 4', consumption: 2100, efficiency: 78, cost: 315 },
      { date: 'Jan 5', consumption: 2350, efficiency: 80, cost: 352 },
      { date: 'Jan 6', consumption: 1980, efficiency: 85, cost: 297 },
      { date: 'Jan 7', consumption: 2200, efficiency: 82, cost: 330 },
      { date: 'Jan 8', consumption: 2150, efficiency: 84, cost: 322 },
      { date: 'Jan 9', consumption: 2340, efficiency: 81, cost: 351 },
      { date: 'Jan 10', consumption: 2300, efficiency: 83, cost: 345 }
    ],
    zoneDistribution: [
      { name: 'Zone A', usage: 6200, percentage: 40 },
      { name: 'Zone B', usage: 5580, percentage: 36 },
      { name: 'Zone C', usage: 3640, percentage: 24 }
    ],
    efficiencyBreakdown: [
      { name: 'Zone A - Tomatoes', cropType: 'Tomatoes', usage: 6200, efficiency: 85, cost: 930 },
      { name: 'Zone B - Wheat', cropType: 'Wheat', usage: 5580, efficiency: 78, cost: 837 },
      { name: 'Zone C - Corn', cropType: 'Corn', usage: 3640, efficiency: 82, cost: 546 }
    ],
    recommendations: [
      {
        icon: 'Clock',
        title: 'Optimize Timing',
        description: 'Irrigate during early morning hours to reduce evaporation',
        savings: 150,
        costSavings: 225
      },
      {
        icon: 'Droplets',
        title: 'Drip Irrigation',
        description: 'Switch to drip irrigation for 20% better efficiency',
        savings: 300,
        costSavings: 450
      },
      {
        icon: 'Thermometer',
        title: 'Soil Monitoring',
        description: 'Use soil moisture sensors to prevent over-watering',
        savings: 200,
        costSavings: 300
      }
    ]
  });

  const tabs = [
    { id: 'schedule', label: 'Schedule', icon: 'Calendar' },
    { id: 'monitoring', label: 'Monitoring', icon: 'Gauge' },
    { id: 'weather', label: 'Weather', icon: 'CloudSun' },
    { id: 'crops', label: 'Crop Needs', icon: 'Wheat' },
    { id: 'controls', label: 'Manual Control', icon: 'Settings' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' }
  ];

  const handleScheduleUpdate = (schedule) => {
    console.log('Updating schedule:', schedule);
  };

  const handleAddSchedule = () => {
    console.log('Adding new schedule');
  };

  const handleSensorUpdate = () => {
    console.log('Updating sensor data');
    setLastSyncTime('Just now');
  };

  const handleAutoSchedule = (sensorId) => {
    console.log('Auto-scheduling irrigation for sensor:', sensorId);
  };

  const handleWeatherUpdate = () => {
    console.log('Updating weather data');
  };

  const handleAlertSettings = () => {
    console.log('Opening alert settings');
  };

  const handleUpdateRequirements = (cropId) => {
    console.log('Updating requirements for crop:', cropId);
  };

  const handleViewDetails = (cropId) => {
    console.log('Viewing details for crop:', cropId);
  };

  const handleOverride = (overrideData) => {
    console.log('Manual override:', overrideData);
  };

  const handleSavePreset = (preset) => {
    console.log('Saving preset:', preset);
  };

  const handleExportData = () => {
    console.log('Exporting usage data');
  };

  const handleSetBudget = () => {
    console.log('Setting water budget');
  };

  const handleLocationChange = () => {
    console.log('Changing location');
  };

  const handleSync = () => {
    console.log('Syncing data');
    setLastSyncTime('Just now');
  };

  const handleRetry = () => {
    console.log('Retrying connection');
    setIsOnline(true);
  };

  useEffect(() => {
    document.title = 'Irrigation Planning - AgriWise';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {showAlert && (
        <AlertBanner
          type="warning"
          message="Heavy rain expected tomorrow. Consider adjusting irrigation schedules to prevent over-watering."
          onDismiss={() => setShowAlert(false)}
          actionLabel="View Weather"
          onAction={() => setActiveTab('weather')}
        />
      )}
      <main className={`pt-16 ${showAlert ? 'pt-32' : 'pt-16'}`}>
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div className="flex items-center space-x-4 mb-4 lg:mb-0">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Droplets" size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Irrigation Planning</h1>
                <p className="text-muted-foreground">
                  Smart water management for optimal crop health
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <LocationIndicator
                currentLocation="Green Valley Farm"
                coordinates="28.6139°N, 77.2090°E"
                lastUpdate="2 min ago"
                onLocationChange={handleLocationChange}
                isOnline={isOnline}
              />
              <ConnectivityStatus
                isOnline={isOnline}
                lastSyncTime={lastSyncTime}
                pendingSyncCount={isOnline ? 0 : 3}
                onSync={handleSync}
                onRetry={handleRetry}
              />
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-border mb-6">
            <nav className="flex space-x-8 overflow-x-auto">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                  }`}
                >
                  <Icon name={tab?.icon} size={18} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'schedule' && (
              <IrrigationCalendar
                schedules={irrigationSchedules}
                onScheduleUpdate={handleScheduleUpdate}
                onAddSchedule={handleAddSchedule}
              />
            )}

            {activeTab === 'monitoring' && (
              <SoilMoistureGauges
                sensorData={sensorData}
                onSensorUpdate={handleSensorUpdate}
                onAutoSchedule={handleAutoSchedule}
              />
            )}

            {activeTab === 'weather' && (
              <WeatherIntegration
                weatherData={weatherData}
                onWeatherUpdate={handleWeatherUpdate}
                onAlertSettings={handleAlertSettings}
              />
            )}

            {activeTab === 'crops' && (
              <CropWaterRequirements
                cropData={cropData}
                onUpdateRequirements={handleUpdateRequirements}
                onViewDetails={handleViewDetails}
              />
            )}

            {activeTab === 'controls' && (
              <ManualOverrideControls
                zones={zones}
                onOverride={handleOverride}
                onSavePreset={handleSavePreset}
                savedPresets={savedPresets}
              />
            )}

            {activeTab === 'analytics' && (
              <WaterUsageTracking
                usageData={usageData}
                onExportData={handleExportData}
                onSetBudget={handleSetBudget}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default IrrigationPlanning;