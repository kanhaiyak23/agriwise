import React from 'react';
import Icon from '../../../components/AppIcon';

const SoilMoistureCard = ({ soilData }) => {
  const { moistureLevel, status, lastUpdated, sensorLocations } = soilData;

  const getMoistureColor = (level) => {
    if (level >= 70) return 'text-success';
    if (level >= 40) return 'text-warning';
    return 'text-error';
  };

  const getMoistureIcon = (level) => {
    if (level >= 70) return 'Droplets';
    if (level >= 40) return 'CloudDrizzle';
    return 'AlertTriangle';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-lg text-card-foreground">
          Soil Moisture
        </h3>
        <Icon name={getMoistureIcon(moistureLevel)} size={24} className={getMoistureColor(moistureLevel)} />
      </div>
      <div className="space-y-4">
        <div className="text-center">
          <p className={`text-3xl font-bold ${getMoistureColor(moistureLevel)}`}>
            {moistureLevel}%
          </p>
          <p className="text-sm text-muted-foreground capitalize">{status}</p>
        </div>

        <div className="w-full bg-muted rounded-full h-3">
          <div 
            className={`h-3 rounded-full transition-all duration-300 ${
              moistureLevel >= 70 ? 'bg-success' : 
              moistureLevel >= 40 ? 'bg-warning' : 'bg-error'
            }`}
            style={{ width: `${moistureLevel}%` }}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Last Updated:</span>
            <span className="text-card-foreground font-medium">{lastUpdated}</span>
          </div>
          
          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">Active Sensors</p>
            <div className="grid grid-cols-2 gap-2">
              {sensorLocations?.map((location, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span className="text-xs text-card-foreground">{location}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoilMoistureCard;