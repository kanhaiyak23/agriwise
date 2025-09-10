import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsOverview = ({ metricsData }) => {
  const { yieldPrediction, financialSummary, efficiencyScore, historicalComparison } = metricsData;

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-success/10';
    if (score >= 60) return 'bg-warning/10';
    return 'bg-error/10';
  };

  const getTrendIcon = (trend) => {
    return trend > 0 ? 'TrendingUp' : trend < 0 ? 'TrendingDown' : 'Minus';
  };

  const getTrendColor = (trend) => {
    return trend > 0 ? 'text-success' : trend < 0 ? 'text-error' : 'text-muted-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading font-semibold text-lg text-card-foreground">
          Farm Metrics
        </h3>
        <Icon name="BarChart3" size={20} className="text-primary" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* Yield Prediction */}
        <div className="p-4 bg-muted rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} className="text-primary" />
            <p className="text-sm font-medium text-card-foreground">Yield Prediction</p>
          </div>
          <p className="text-2xl font-bold text-card-foreground">
            {yieldPrediction?.amount} {yieldPrediction?.unit}
          </p>
          <div className="flex items-center space-x-1 mt-1">
            <Icon 
              name={getTrendIcon(yieldPrediction?.trend)} 
              size={12} 
              className={getTrendColor(yieldPrediction?.trend)} 
            />
            <p className={`text-xs ${getTrendColor(yieldPrediction?.trend)}`}>
              {yieldPrediction?.trend > 0 ? '+' : ''}{yieldPrediction?.trend}% vs last season
            </p>
          </div>
        </div>

        {/* Financial Summary */}
        <div className="p-4 bg-muted rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="DollarSign" size={16} className="text-success" />
            <p className="text-sm font-medium text-card-foreground">Expected Revenue</p>
          </div>
          <p className="text-2xl font-bold text-card-foreground">
            ₹{financialSummary?.revenue?.toLocaleString()}
          </p>
          <div className="flex items-center space-x-1 mt-1">
            <Icon 
              name={getTrendIcon(financialSummary?.trend)} 
              size={12} 
              className={getTrendColor(financialSummary?.trend)} 
            />
            <p className={`text-xs ${getTrendColor(financialSummary?.trend)}`}>
              Profit margin: {financialSummary?.profitMargin}%
            </p>
          </div>
        </div>

        {/* Efficiency Score */}
        <div className="p-4 bg-muted rounded-lg md:col-span-2 lg:col-span-1">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Target" size={16} className={getScoreColor(efficiencyScore?.overall)} />
            <p className="text-sm font-medium text-card-foreground">Efficiency Score</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-full ${getScoreBg(efficiencyScore?.overall)} flex items-center justify-center`}>
              <p className={`text-lg font-bold ${getScoreColor(efficiencyScore?.overall)}`}>
                {efficiencyScore?.overall}
              </p>
            </div>
            <div className="flex-1">
              <div className="space-y-1">
                {Object.entries(efficiencyScore?.breakdown)?.map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground capitalize">{key}:</span>
                    <span className={getScoreColor(value)}>{value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Historical Comparison */}
      <div className="pt-4 border-t border-border">
        <h4 className="text-sm font-medium text-card-foreground mb-3">Historical Comparison</h4>
        <div className="grid grid-cols-3 gap-4">
          {historicalComparison?.map((period) => (
            <div key={period?.period} className="text-center">
              <p className="text-xs text-muted-foreground mb-1">{period?.period}</p>
              <p className="text-sm font-bold text-card-foreground">{period?.yield}</p>
              <div className="flex items-center justify-center space-x-1 mt-1">
                <Icon 
                  name={getTrendIcon(period?.change)} 
                  size={10} 
                  className={getTrendColor(period?.change)} 
                />
                <p className={`text-xs ${getTrendColor(period?.change)}`}>
                  {period?.change > 0 ? '+' : ''}{period?.change}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MetricsOverview;