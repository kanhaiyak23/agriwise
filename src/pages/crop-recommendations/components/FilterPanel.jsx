import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterPanel = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  isExpanded, 
  onToggleExpanded 
}) => {
  const cropTypes = [
    { id: 'cereals', label: 'Cereals', icon: 'Wheat' },
    { id: 'vegetables', label: 'Vegetables', icon: 'Carrot' },
    { id: 'fruits', label: 'Fruits', icon: 'Apple' },
    { id: 'pulses', label: 'Pulses', icon: 'Bean' },
    { id: 'oilseeds', label: 'Oilseeds', icon: 'Droplets' },
    { id: 'cash-crops', label: 'Cash Crops', icon: 'DollarSign' }
  ];

  const investmentLevels = [
    { id: 'low', label: 'Low (₹10K-50K)', value: 'Low' },
    { id: 'medium', label: 'Medium (₹50K-2L)', value: 'Medium' },
    { id: 'high', label: 'High (₹2L+)', value: 'High' }
  ];

  const harvestTimelines = [
    { id: 'short', label: '2-4 months', value: 'Short' },
    { id: 'medium', label: '4-8 months', value: 'Medium' },
    { id: 'long', label: '8+ months', value: 'Long' }
  ];

  const handleCropTypeToggle = (cropType) => {
    const currentTypes = filters?.cropTypes || [];
    const updatedTypes = currentTypes?.includes(cropType)
      ? currentTypes?.filter(type => type !== cropType)
      : [...currentTypes, cropType];
    
    onFilterChange({ ...filters, cropTypes: updatedTypes });
  };

  const handleInvestmentChange = (level) => {
    onFilterChange({ ...filters, investmentLevel: level });
  };

  const handleTimelineChange = (timeline) => {
    onFilterChange({ ...filters, harvestTimeline: timeline });
  };

  const handleMinConfidenceChange = (e) => {
    onFilterChange({ ...filters, minConfidence: parseInt(e?.target?.value) || 0 });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters?.cropTypes?.length > 0) count++;
    if (filters?.investmentLevel) count++;
    if (filters?.harvestTimeline) count++;
    if (filters?.minConfidence > 0) count++;
    return count;
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-muted-foreground" />
          <h3 className="font-heading font-semibold text-lg text-card-foreground">
            Filters
          </h3>
          {getActiveFiltersCount() > 0 && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-data">
              {getActiveFiltersCount()}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
            disabled={getActiveFiltersCount() === 0}
          >
            Clear
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleExpanded}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          />
        </div>
      </div>
      {/* Filter Content */}
      {isExpanded && (
        <div className="p-4 space-y-6">
          {/* Crop Types */}
          <div>
            <h4 className="font-body font-medium text-sm text-card-foreground mb-3">
              Crop Types
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {cropTypes?.map((type) => (
                <button
                  key={type?.id}
                  onClick={() => handleCropTypeToggle(type?.id)}
                  className={`flex items-center space-x-2 p-3 rounded-lg border transition-smooth ${
                    filters?.cropTypes?.includes(type?.id)
                      ? 'border-primary bg-primary/10 text-primary' :'border-border bg-background text-muted-foreground hover:text-card-foreground hover:border-muted-foreground'
                  }`}
                >
                  <Icon name={type?.icon} size={16} />
                  <span className="font-body text-sm">{type?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Investment Level */}
          <div>
            <h4 className="font-body font-medium text-sm text-card-foreground mb-3">
              Investment Level
            </h4>
            <div className="space-y-2">
              {investmentLevels?.map((level) => (
                <button
                  key={level?.id}
                  onClick={() => handleInvestmentChange(level?.value)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border transition-smooth ${
                    filters?.investmentLevel === level?.value
                      ? 'border-primary bg-primary/10 text-primary' :'border-border bg-background text-muted-foreground hover:text-card-foreground hover:border-muted-foreground'
                  }`}
                >
                  <span className="font-body text-sm">{level?.label}</span>
                  {filters?.investmentLevel === level?.value && (
                    <Icon name="Check" size={16} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Harvest Timeline */}
          <div>
            <h4 className="font-body font-medium text-sm text-card-foreground mb-3">
              Harvest Timeline
            </h4>
            <div className="space-y-2">
              {harvestTimelines?.map((timeline) => (
                <button
                  key={timeline?.id}
                  onClick={() => handleTimelineChange(timeline?.value)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border transition-smooth ${
                    filters?.harvestTimeline === timeline?.value
                      ? 'border-primary bg-primary/10 text-primary' :'border-border bg-background text-muted-foreground hover:text-card-foreground hover:border-muted-foreground'
                  }`}
                >
                  <span className="font-body text-sm">{timeline?.label}</span>
                  {filters?.harvestTimeline === timeline?.value && (
                    <Icon name="Check" size={16} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Minimum Confidence */}
          <div>
            <h4 className="font-body font-medium text-sm text-card-foreground mb-3">
              Minimum Confidence Score
            </h4>
            <div className="space-y-3">
              <Input
                type="range"
                min="0"
                max="100"
                step="10"
                value={filters?.minConfidence || 0}
                onChange={handleMinConfidenceChange}
                className="w-full"
              />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">0%</span>
                <span className="font-data font-medium text-card-foreground">
                  {filters?.minConfidence || 0}%
                </span>
                <span className="text-muted-foreground">100%</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;