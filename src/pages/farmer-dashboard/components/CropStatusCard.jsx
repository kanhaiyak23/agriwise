import React from 'react';
import Icon from '../../../components/AppIcon';

const CropStatusCard = ({ cropData }) => {
  const { cropName, growthStage, healthScore, daysToHarvest, area, issues } = cropData;

  const getHealthColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getStageIcon = (stage) => {
    switch (stage?.toLowerCase()) {
      case 'seedling':
        return 'Sprout';
      case 'vegetative':
        return 'Leaf';
      case 'flowering':
        return 'Flower';
      case 'fruiting':
        return 'Apple';
      case 'harvest ready':
        return 'Wheat';
      default:
        return 'Sprout';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-lg text-card-foreground">
          Crop Status
        </h3>
        <Icon name={getStageIcon(growthStage)} size={24} className="text-primary" />
      </div>
      <div className="space-y-4">
        <div>
          <p className="text-xl font-bold text-card-foreground">{cropName}</p>
          <p className="text-sm text-muted-foreground">{area} acres • {growthStage}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-muted rounded-lg">
            <p className={`text-2xl font-bold ${getHealthColor(healthScore)}`}>
              {healthScore}%
            </p>
            <p className="text-xs text-muted-foreground">Health Score</p>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <p className="text-2xl font-bold text-card-foreground">
              {daysToHarvest}
            </p>
            <p className="text-xs text-muted-foreground">Days to Harvest</p>
          </div>
        </div>

        {issues?.length > 0 && (
          <div className="pt-4 border-t border-border">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="AlertCircle" size={16} className="text-warning" />
              <p className="text-sm font-medium text-card-foreground">Active Issues</p>
            </div>
            <div className="space-y-1">
              {issues?.map((issue, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-warning rounded-full" />
                  <p className="text-xs text-muted-foreground">{issue}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropStatusCard;