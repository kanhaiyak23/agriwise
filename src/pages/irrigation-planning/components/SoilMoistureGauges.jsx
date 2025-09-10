import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SoilMoistureGauges = ({ sensorData, onSensorUpdate, onAutoSchedule }) => {
  const getMoistureColor = (level) => {
    if (level >= 70) return 'text-success';
    if (level >= 40) return 'text-warning';
    return 'text-error';
  };

  const getMoistureBgColor = (level) => {
    if (level >= 70) return 'bg-success';
    if (level >= 40) return 'bg-warning';
    return 'bg-error';
  };

  const getStatusIcon = (level) => {
    if (level >= 70) return 'CheckCircle';
    if (level >= 40) return 'AlertTriangle';
    return 'AlertCircle';
  };

  const CircularGauge = ({ value, max = 100, size = 120, strokeWidth = 8 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (value / max) * circumference;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-muted"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className={getMoistureColor(value)}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-2xl font-bold ${getMoistureColor(value)}`}>
            {value}%
          </span>
          <span className="text-xs text-muted-foreground">Moisture</span>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Gauge" size={24} className="text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Soil Moisture Monitoring</h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="RefreshCw"
          iconPosition="left"
          onClick={onSensorUpdate}
        >
          Refresh Data
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sensorData?.map((sensor) => (
          <div key={sensor?.id} className="bg-muted/30 rounded-lg p-4 border border-border">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-foreground">{sensor?.zone}</h3>
                <p className="text-sm text-muted-foreground">{sensor?.location}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Icon 
                  name={getStatusIcon(sensor?.moistureLevel)} 
                  size={16} 
                  className={getMoistureColor(sensor?.moistureLevel)} 
                />
                <span className={`text-xs font-medium ${
                  sensor?.status === 'online' ? 'text-success' : 'text-error'
                }`}>
                  {sensor?.status}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center mb-4">
              <CircularGauge value={sensor?.moistureLevel} />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Optimal Range:</span>
                <span className="font-medium text-foreground">
                  {sensor?.optimalRange?.min}% - {sensor?.optimalRange?.max}%
                </span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Last Reading:</span>
                <span className="font-medium text-foreground">{sensor?.lastReading}</span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Depth:</span>
                <span className="font-medium text-foreground">{sensor?.depth}cm</span>
              </div>

              {sensor?.moistureLevel < sensor?.optimalRange?.min && (
                <div className="bg-error/10 border border-error/20 rounded-md p-3">
                  <div className="flex items-start space-x-2">
                    <Icon name="AlertTriangle" size={16} className="text-error flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-error">Low Moisture Alert</p>
                      <p className="text-xs text-error/80 mt-1">
                        Irrigation recommended within 2 hours
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 w-full border-error text-error hover:bg-error hover:text-error-foreground"
                    iconName="Droplets"
                    iconPosition="left"
                    onClick={() => onAutoSchedule(sensor?.id)}
                  >
                    Schedule Irrigation
                  </Button>
                </div>
              )}

              {sensor?.moistureLevel > sensor?.optimalRange?.max && (
                <div className="bg-warning/10 border border-warning/20 rounded-md p-3">
                  <div className="flex items-start space-x-2">
                    <Icon name="Info" size={16} className="text-warning flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-warning">High Moisture</p>
                      <p className="text-xs text-warning/80 mt-1">
                        Consider reducing irrigation frequency
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {sensor?.moistureLevel >= sensor?.optimalRange?.min && 
               sensor?.moistureLevel <= sensor?.optimalRange?.max && (
                <div className="bg-success/10 border border-success/20 rounded-md p-3">
                  <div className="flex items-center space-x-2">
                    <Icon name="CheckCircle" size={16} className="text-success" />
                    <p className="text-sm font-medium text-success">Optimal Moisture Level</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-muted/20 rounded-lg border border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Zap" size={20} className="text-primary" />
            <div>
              <h3 className="font-semibold text-foreground">Smart Irrigation</h3>
              <p className="text-sm text-muted-foreground">
                AI-powered scheduling based on sensor data and weather forecasts
              </p>
            </div>
          </div>
          <Button
            variant="default"
            iconName="Play"
            iconPosition="left"
            onClick={() => onAutoSchedule('all')}
          >
            Enable Auto-Schedule
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SoilMoistureGauges;