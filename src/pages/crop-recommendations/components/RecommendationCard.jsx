import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecommendationCard = ({ 
  recommendation, 
  onSelect, 
  onCompare, 
  isSelected = false,
  isInComparison = false 
}) => {
  const {
    id,
    cropName,
    variety,
    confidence,
    expectedYield,
    marketPotential,
    seasonalTiming,
    soilCompatibility,
    weatherSuitability,
    marketDemand,
    investmentLevel,
    profitability,
    riskLevel,
    harvestTime,
    image
  } = recommendation;

  const getConfidenceColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Low': return 'text-success';
      case 'Medium': return 'text-warning';
      case 'High': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getProfitabilityIcon = (level) => {
    switch (level) {
      case 'High': return 'TrendingUp';
      case 'Medium': return 'Minus';
      case 'Low': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  return (
    <div className={`bg-card border rounded-lg p-6 transition-smooth hover:shadow-medium ${
      isSelected ? 'border-primary shadow-medium' : 'border-border'
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden">
            <img 
              src={image} 
              alt={cropName}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = '/assets/images/no_image.png';
              }}
            />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg text-card-foreground">
              {cropName}
            </h3>
            <p className="font-body text-sm text-muted-foreground">
              {variety}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className={`text-right ${getConfidenceColor(confidence)}`}>
            <div className="font-data text-lg font-bold">
              {confidence}%
            </div>
            <div className="font-body text-xs">
              Confidence
            </div>
          </div>
        </div>
      </div>
      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-body text-sm text-muted-foreground">Expected Yield</span>
            <span className="font-data text-sm font-medium text-card-foreground">
              {expectedYield}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-body text-sm text-muted-foreground">Market Potential</span>
            <div className="flex items-center space-x-1">
              <Icon 
                name={getProfitabilityIcon(marketPotential)} 
                size={14} 
                className={marketPotential === 'High' ? 'text-success' : marketPotential === 'Medium' ? 'text-warning' : 'text-error'} 
              />
              <span className="font-body text-sm font-medium text-card-foreground">
                {marketPotential}
              </span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-body text-sm text-muted-foreground">Investment</span>
            <span className="font-data text-sm font-medium text-card-foreground">
              {investmentLevel}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-body text-sm text-muted-foreground">Risk Level</span>
            <span className={`font-body text-sm font-medium ${getRiskColor(riskLevel)}`}>
              {riskLevel}
            </span>
          </div>
        </div>
      </div>
      {/* Compatibility Indicators */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Mountain" size={16} className="text-muted-foreground" />
            <span className="font-body text-sm text-muted-foreground">Soil Compatibility</span>
          </div>
          <div className="flex items-center space-x-1">
            {[...Array(5)]?.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i < soilCompatibility ? 'bg-success' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Cloud" size={16} className="text-muted-foreground" />
            <span className="font-body text-sm text-muted-foreground">Weather Suitability</span>
          </div>
          <div className="flex items-center space-x-1">
            {[...Array(5)]?.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i < weatherSuitability ? 'bg-success' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={16} className="text-muted-foreground" />
            <span className="font-body text-sm text-muted-foreground">Market Demand</span>
          </div>
          <div className="flex items-center space-x-1">
            {[...Array(5)]?.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i < marketDemand ? 'bg-success' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Timing Info */}
      <div className="bg-muted rounded-lg p-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={16} className="text-muted-foreground" />
            <span className="font-body text-sm text-muted-foreground">Best Planting</span>
          </div>
          <span className="font-body text-sm font-medium text-card-foreground">
            {seasonalTiming}
          </span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-muted-foreground" />
            <span className="font-body text-sm text-muted-foreground">Harvest Time</span>
          </div>
          <span className="font-body text-sm font-medium text-card-foreground">
            {harvestTime}
          </span>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex space-x-2">
        <Button
          variant={isSelected ? "default" : "outline"}
          size="sm"
          onClick={() => onSelect(recommendation)}
          iconName={isSelected ? "Check" : "Eye"}
          iconPosition="left"
          className="flex-1"
        >
          {isSelected ? 'Selected' : 'View Details'}
        </Button>
        
        <Button
          variant={isInComparison ? "secondary" : "ghost"}
          size="sm"
          onClick={() => onCompare(recommendation)}
          iconName={isInComparison ? "Minus" : "Plus"}
          iconPosition="left"
        >
          {isInComparison ? 'Remove' : 'Compare'}
        </Button>
      </div>
    </div>
  );
};

export default RecommendationCard;