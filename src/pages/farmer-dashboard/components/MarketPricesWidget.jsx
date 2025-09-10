import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MarketPricesWidget = ({ marketData }) => {
  const navigate = useNavigate();

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return 'TrendingUp';
      case 'down':
        return 'TrendingDown';
      default:
        return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up':
        return 'text-success';
      case 'down':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-lg text-card-foreground">
          Market Prices
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/market-prices')}
          iconName="ExternalLink"
          iconPosition="right"
        >
          View All
        </Button>
      </div>
      <div className="space-y-3">
        {marketData?.map((item) => (
          <div key={item?.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Wheat" size={18} className="text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm text-card-foreground">{item?.crop}</p>
                <p className="text-xs text-muted-foreground">{item?.market}</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="flex items-center space-x-2">
                <p className="font-bold text-sm text-card-foreground">
                  ₹{item?.price}/{item?.unit}
                </p>
                <Icon 
                  name={getTrendIcon(item?.trend)} 
                  size={16} 
                  className={getTrendColor(item?.trend)} 
                />
              </div>
              <p className={`text-xs ${getTrendColor(item?.trend)}`}>
                {item?.change}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Last updated:</span>
          <span className="text-card-foreground font-medium">2 min ago</span>
        </div>
      </div>
    </div>
  );
};

export default MarketPricesWidget;