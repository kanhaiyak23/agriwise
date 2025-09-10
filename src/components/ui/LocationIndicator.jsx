import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const LocationIndicator = ({ 
  currentLocation = 'Green Valley Farm',
  coordinates = '40.7128°N, 74.0060°W',
  lastUpdate = '2 min ago',
  onLocationChange,
  isOnline = true
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLocationChange = () => {
    if (onLocationChange) {
      onLocationChange();
    }
    setIsExpanded(false);
  };

  return (
    <div className="relative">
      {/* Main Location Display */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleExpanded}
        className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
      >
        <Icon 
          name="MapPin" 
          size={16} 
          className={isOnline ? 'text-success' : 'text-warning'} 
        />
        <span className="font-body text-sm font-medium hidden sm:inline">
          {currentLocation}
        </span>
        <Icon name="ChevronDown" size={14} />
      </Button>

      {/* Expanded Location Details */}
      {isExpanded && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-popover border border-border rounded-lg shadow-medium z-1001">
          <div className="p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="font-body font-semibold text-sm text-popover-foreground">
                  Current Location
                </h3>
                <p className="font-body text-sm text-muted-foreground mt-1">
                  {currentLocation}
                </p>
                <p className="font-data text-xs text-muted-foreground mt-1">
                  {coordinates}
                </p>
              </div>
              <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-success' : 'bg-warning'} flex-shrink-0 mt-1`} />
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Last updated: {lastUpdate}</span>
              <div className="flex items-center space-x-1">
                <Icon name="Wifi" size={12} className={isOnline ? 'text-success' : 'text-warning'} />
                <span>{isOnline ? 'Online' : 'Offline'}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                fullWidth
                iconName="Navigation"
                iconPosition="left"
                onClick={handleLocationChange}
              >
                Change Location
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationIndicator;