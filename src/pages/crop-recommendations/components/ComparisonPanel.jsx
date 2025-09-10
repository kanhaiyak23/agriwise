import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ComparisonPanel = ({ 
  comparisonCrops, 
  onRemoveFromComparison, 
  onClearComparison, 
  isVisible 
}) => {
  if (!isVisible || comparisonCrops?.length === 0) return null;

  const comparisonMetrics = [
    { key: 'confidence', label: 'AI Confidence', icon: 'Brain', format: (val) => `${val}%` },
    { key: 'expectedYield', label: 'Expected Yield', icon: 'TrendingUp', format: (val) => val },
    { key: 'investmentLevel', label: 'Investment', icon: 'DollarSign', format: (val) => val },
    { key: 'riskLevel', label: 'Risk Level', icon: 'AlertTriangle', format: (val) => val },
    { key: 'harvestTime', label: 'Harvest Time', icon: 'Clock', format: (val) => val },
    { key: 'profitability', label: 'Profitability', icon: 'TrendingUp', format: (val) => val }
  ];

  const getMetricColor = (metric, value, crops) => {
    if (metric === 'confidence') {
      const maxConfidence = Math.max(...crops?.map(c => c?.confidence));
      return value === maxConfidence ? 'text-success' : 'text-muted-foreground';
    }
    if (metric === 'riskLevel') {
      return value === 'Low' ? 'text-success' : value === 'Medium' ? 'text-warning' : 'text-error';
    }
    if (metric === 'profitability') {
      return value === 'High' ? 'text-success' : value === 'Medium' ? 'text-warning' : 'text-error';
    }
    return 'text-card-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Comparison Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="GitCompare" size={20} className="text-muted-foreground" />
          <h3 className="font-heading font-semibold text-lg text-card-foreground">
            Crop Comparison
          </h3>
          <span className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full font-data">
            {comparisonCrops?.length} crops
          </span>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearComparison}
          iconName="X"
          iconPosition="left"
        >
          Clear All
        </Button>
      </div>
      {/* Comparison Table */}
      <div className="p-4">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 pr-4 font-body font-medium text-sm text-muted-foreground">
                  Metric
                </th>
                {comparisonCrops?.map((crop) => (
                  <th key={crop?.id} className="text-center py-3 px-2 min-w-32">
                    <div className="space-y-2">
                      <div className="w-10 h-10 bg-muted rounded-lg overflow-hidden mx-auto">
                        <img 
                          src={crop?.image} 
                          alt={crop?.cropName}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = '/assets/images/no_image.png';
                          }}
                        />
                      </div>
                      <div>
                        <div className="font-body font-medium text-sm text-card-foreground">
                          {crop?.cropName}
                        </div>
                        <div className="font-body text-xs text-muted-foreground">
                          {crop?.variety}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onRemoveFromComparison(crop?.id)}
                        iconName="X"
                        className="w-6 h-6 mx-auto"
                      />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonMetrics?.map((metric) => (
                <tr key={metric?.key} className="border-b border-border last:border-b-0">
                  <td className="py-3 pr-4">
                    <div className="flex items-center space-x-2">
                      <Icon name={metric?.icon} size={16} className="text-muted-foreground" />
                      <span className="font-body text-sm text-muted-foreground">
                        {metric?.label}
                      </span>
                    </div>
                  </td>
                  {comparisonCrops?.map((crop) => (
                    <td key={crop?.id} className="text-center py-3 px-2">
                      <span className={`font-data text-sm font-medium ${
                        getMetricColor(metric?.key, crop?.[metric?.key], comparisonCrops)
                      }`}>
                        {metric?.format(crop?.[metric?.key])}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Comparison Summary */}
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h4 className="font-body font-medium text-sm text-card-foreground mb-3">
            Quick Comparison Summary
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Highest Confidence:</span>
              <span className="font-medium text-success">
                {comparisonCrops?.reduce((max, crop) => 
                  crop?.confidence > max?.confidence ? crop : max
                )?.cropName}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Lowest Risk:</span>
              <span className="font-medium text-success">
                {comparisonCrops?.find(crop => crop?.riskLevel === 'Low')?.cropName || 'None'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Best Profitability:</span>
              <span className="font-medium text-success">
                {comparisonCrops?.find(crop => crop?.profitability === 'High')?.cropName || 'None'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonPanel;