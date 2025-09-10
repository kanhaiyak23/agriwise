import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CropWaterRequirements = ({ cropData, onUpdateRequirements, onViewDetails }) => {
  const [selectedCrop, setSelectedCrop] = useState(null);

  const getGrowthStageColor = (stage) => {
    const stageColors = {
      'seedling': 'text-success',
      'vegetative': 'text-primary',
      'flowering': 'text-warning',
      'fruiting': 'text-accent',
      'maturity': 'text-secondary'
    };
    return stageColors?.[stage] || 'text-muted-foreground';
  };

  const getGrowthStageIcon = (stage) => {
    const stageIcons = {
      'seedling': 'Sprout',
      'vegetative': 'Leaf',
      'flowering': 'Flower',
      'fruiting': 'Apple',
      'maturity': 'Wheat'
    };
    return stageIcons?.[stage] || 'Circle';
  };

  const getWaterNeedLevel = (current, required) => {
    const percentage = (current / required) * 100;
    if (percentage >= 90) return { level: 'optimal', color: 'text-success', bg: 'bg-success' };
    if (percentage >= 70) return { level: 'adequate', color: 'text-warning', bg: 'bg-warning' };
    return { level: 'insufficient', color: 'text-error', bg: 'bg-error' };
  };

  const WaterProgressBar = ({ current, required, className = "" }) => {
    const percentage = Math.min((current / required) * 100, 100);
    const needLevel = getWaterNeedLevel(current, required);

    return (
      <div className={`w-full ${className}`}>
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>Current: {current}L/day</span>
          <span>Required: {required}L/day</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${needLevel?.bg}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="flex justify-between items-center mt-1">
          <span className={`text-xs font-medium ${needLevel?.color}`}>
            {needLevel?.level?.charAt(0)?.toUpperCase() + needLevel?.level?.slice(1)}
          </span>
          <span className="text-xs text-muted-foreground">
            {percentage?.toFixed(0)}%
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Droplets" size={24} className="text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Crop Water Requirements</h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="Settings"
          iconPosition="left"
          onClick={onUpdateRequirements}
        >
          Update Settings
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {cropData?.map((crop) => {
          const waterNeed = getWaterNeedLevel(crop?.currentWater, crop?.requiredWater);
          
          return (
            <div
              key={crop?.id}
              className={`bg-muted/30 rounded-lg p-5 border transition-all cursor-pointer ${
                selectedCrop === crop?.id
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}
              onClick={() => setSelectedCrop(selectedCrop === crop?.id ? null : crop?.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Wheat" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{crop?.name}</h3>
                    <p className="text-sm text-muted-foreground">{crop?.variety}</p>
                    <p className="text-xs text-muted-foreground">Area: {crop?.area} hectares</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`flex items-center space-x-1 ${getGrowthStageColor(crop?.growthStage)}`}>
                    <Icon name={getGrowthStageIcon(crop?.growthStage)} size={16} />
                    <span className="text-sm font-medium capitalize">
                      {crop?.growthStage}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Day {crop?.daysFromPlanting}
                  </p>
                </div>
              </div>
              <WaterProgressBar
                current={crop?.currentWater}
                required={crop?.requiredWater}
                className="mb-4"
              />
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-card rounded-md border border-border">
                  <Icon name="Calendar" size={16} className="text-primary mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">Next Irrigation</p>
                  <p className="font-semibold text-foreground text-sm">
                    {crop?.nextIrrigation}
                  </p>
                </div>
                <div className="text-center p-3 bg-card rounded-md border border-border">
                  <Icon name="Clock" size={16} className="text-primary mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">Duration</p>
                  <p className="font-semibold text-foreground text-sm">
                    {crop?.irrigationDuration} min
                  </p>
                </div>
              </div>
              {selectedCrop === crop?.id && (
                <div className="space-y-4 pt-4 border-t border-border">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Soil Type</p>
                      <p className="text-sm font-medium text-foreground">{crop?.soilType}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">pH Level</p>
                      <p className="text-sm font-medium text-foreground">{crop?.phLevel}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Planting Date</p>
                      <p className="text-sm font-medium text-foreground">{crop?.plantingDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Expected Harvest</p>
                      <p className="text-sm font-medium text-foreground">{crop?.expectedHarvest}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Growth Stage Requirements</p>
                    <div className="bg-card rounded-md p-3 border border-border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">
                          Current Stage: {crop?.growthStage?.charAt(0)?.toUpperCase() + crop?.growthStage?.slice(1)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {crop?.stageProgress}% complete
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div
                          className="h-1.5 bg-primary rounded-full transition-all duration-300"
                          style={{ width: `${crop?.stageProgress}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        {crop?.stageDescription}
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Eye"
                      iconPosition="left"
                      onClick={() => onViewDetails(crop?.id)}
                      className="flex-1"
                    >
                      View Details
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      iconName="Droplets"
                      iconPosition="left"
                      onClick={() => onUpdateRequirements(crop?.id)}
                      className="flex-1"
                    >
                      Adjust Water
                    </Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Brain" size={20} className="text-primary" />
            <div>
              <h3 className="font-semibold text-foreground">AI Recommendations</h3>
              <p className="text-sm text-muted-foreground">
                Based on weather forecast and crop growth analysis
              </p>
            </div>
          </div>
          <Button
            variant="default"
            size="sm"
            iconName="Sparkles"
            iconPosition="left"
          >
            Get AI Insights
          </Button>
        </div>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card rounded-md p-3 border border-border">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="TrendingDown" size={16} className="text-success" />
              <span className="text-sm font-medium text-success">Reduce Irrigation</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Rain expected tomorrow. Reduce tomato irrigation by 30%.
            </p>
          </div>
          
          <div className="bg-card rounded-md p-3 border border-border">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="TrendingUp" size={16} className="text-warning" />
              <span className="text-sm font-medium text-warning">Increase Frequency</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Wheat entering flowering stage. Increase irrigation frequency.
            </p>
          </div>
          
          <div className="bg-card rounded-md p-3 border border-border">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Clock" size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">Optimal Timing</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Best irrigation time: 6:00 AM - 8:00 AM for maximum efficiency.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropWaterRequirements;