import React from 'react';
import Icon from '../../../components/AppIcon';

const PriceCard = ({ 
  crop, 
  currentPrice, 
  change, 
  changePercent, 
  trend, 
  unit = 'per quintal',
  isSelected = false,
  onClick 
}) => {
  const getTrendIcon = () => {
    if (trend === 'up') return 'TrendingUp';
    if (trend === 'down') return 'TrendingDown';
    return 'Minus';
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-success';
    if (trend === 'down') return 'text-error';
    return 'text-muted-foreground';
  };

  const getChangeColor = () => {
    if (change > 0) return 'text-success';
    if (change < 0) return 'text-error';
    return 'text-muted-foreground';
  };

  return (
    <div 
      className={`bg-card border rounded-lg p-4 cursor-pointer transition-smooth hover:shadow-medium ${
        isSelected ? 'border-primary ring-2 ring-primary/20' : 'border-border'
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-heading font-semibold text-lg text-card-foreground">
            {crop}
          </h3>
          <p className="text-sm text-muted-foreground">{unit}</p>
        </div>
        <Icon 
          name={getTrendIcon()} 
          size={20} 
          className={getTrendColor()} 
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-bold text-card-foreground">
            ₹{currentPrice?.toLocaleString()}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className={`text-sm font-medium ${getChangeColor()}`}>
            {change > 0 ? '+' : ''}₹{change}
          </span>
          <span className={`text-sm ${getChangeColor()}`}>
            ({changePercent > 0 ? '+' : ''}{changePercent}%)
          </span>
        </div>
      </div>
    </div>
  );
};

export default PriceCard;