import React from 'react';
import Icon from '../../../components/AppIcon';

const DemandIndicators = () => {
  const demandData = [
    {
      crop: 'Wheat',
      demand: 'High',
      supply: 'Medium',
      balance: 'favorable',
      seasonalTrend: 'increasing',
      festivalImpact: 'Diwali demand surge expected',
      recommendation: 'Hold for 2-3 weeks for better prices'
    },
    {
      crop: 'Rice',
      demand: 'Medium',
      supply: 'High',
      balance: 'oversupply',
      seasonalTrend: 'stable',
      festivalImpact: 'Wedding season boost in 1 month',
      recommendation: 'Sell immediately or wait for wedding season'
    },
    {
      crop: 'Corn',
      demand: 'High',
      supply: 'Low',
      balance: 'shortage',
      seasonalTrend: 'increasing',
      festivalImpact: 'Poultry feed demand rising',
      recommendation: 'Excellent selling opportunity - prices may rise further'
    }
  ];

  const getDemandColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'high': return 'text-success';
      case 'medium': return 'text-warning';
      case 'low': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getBalanceColor = (balance) => {
    switch (balance) {
      case 'favorable': return 'text-success';
      case 'shortage': return 'text-success';
      case 'oversupply': return 'text-error';
      case 'balanced': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const getBalanceIcon = (balance) => {
    switch (balance) {
      case 'favorable': return 'TrendingUp';
      case 'shortage': return 'AlertTriangle';
      case 'oversupply': return 'TrendingDown';
      case 'balanced': return 'Minus';
      default: return 'Minus';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'increasing': return 'ArrowUp';
      case 'decreasing': return 'ArrowDown';
      case 'stable': return 'Minus';
      default: return 'Minus';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="BarChart3" size={24} className="text-primary" />
        <div>
          <h2 className="font-heading font-semibold text-xl text-card-foreground">
            Market Demand Indicators
          </h2>
          <p className="text-sm text-muted-foreground">
            Supply-demand analysis and seasonal trends
          </p>
        </div>
      </div>
      <div className="space-y-6">
        {demandData?.map((item, index) => (
          <div key={index} className="border border-border rounded-lg p-4">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-heading font-semibold text-lg text-card-foreground mb-1">
                  {item?.crop}
                </h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="Users" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Demand:</span>
                    <span className={`text-sm font-medium ${getDemandColor(item?.demand)}`}>
                      {item?.demand}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Package" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Supply:</span>
                    <span className={`text-sm font-medium ${getDemandColor(item?.supply)}`}>
                      {item?.supply}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Icon 
                  name={getBalanceIcon(item?.balance)} 
                  size={20} 
                  className={getBalanceColor(item?.balance)} 
                />
                <span className={`text-sm font-medium capitalize ${getBalanceColor(item?.balance)}`}>
                  {item?.balance}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Icon name={getTrendIcon(item?.seasonalTrend)} size={16} className="text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-card-foreground">Seasonal Trend</p>
                    <p className="text-sm text-muted-foreground capitalize">{item?.seasonalTrend}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Icon name="Calendar" size={16} className="text-warning mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-card-foreground">Festival Impact</p>
                    <p className="text-sm text-muted-foreground">{item?.festivalImpact}</p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-3">
                <div className="flex items-start space-x-3">
                  <Icon name="Lightbulb" size={16} className="text-accent mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-card-foreground mb-1">Recommendation</p>
                    <p className="text-sm text-muted-foreground">{item?.recommendation}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <span>Updated 1 hour ago</span>
                <span>•</span>
                <span>Next update in 2 hours</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Icon name="Info" size={14} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Based on regional market data</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="TrendingUp" size={20} className="text-primary mt-0.5" />
          <div>
            <h3 className="font-heading font-semibold text-card-foreground mb-2">
              Market Outlook
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Overall market conditions are favorable for wheat and corn, with strong demand expected 
              through the festival season. Rice markets show oversupply, suggesting immediate selling 
              or strategic holding until wedding season demand increases.
            </p>
            <div className="flex items-center space-x-4 text-xs">
              <span className="flex items-center space-x-1 text-success">
                <Icon name="ArrowUp" size={12} />
                <span>Wheat +5%</span>
              </span>
              <span className="flex items-center space-x-1 text-success">
                <Icon name="ArrowUp" size={12} />
                <span>Corn +8%</span>
              </span>
              <span className="flex items-center space-x-1 text-error">
                <Icon name="ArrowDown" size={12} />
                <span>Rice -3%</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemandIndicators;