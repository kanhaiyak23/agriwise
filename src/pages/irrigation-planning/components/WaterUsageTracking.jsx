import React, { useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const WaterUsageTracking = ({ usageData, onExportData, onSetBudget }) => {
  const [timeRange, setTimeRange] = useState('week');
  const [selectedMetric, setSelectedMetric] = useState('consumption');

  const timeRangeOptions = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ];

  const metricOptions = [
    { value: 'consumption', label: 'Water Consumption' },
    { value: 'efficiency', label: 'Efficiency Rating' },
    { value: 'cost', label: 'Cost Analysis' }
  ];

  const COLORS = ['#2D5016', '#4A7C59', '#FF6B35', '#059669', '#D97706'];

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000)?.toFixed(1) + 'K';
    }
    return num?.toString();
  };

  const getEfficiencyColor = (efficiency) => {
    if (efficiency >= 85) return 'text-success';
    if (efficiency >= 70) return 'text-warning';
    return 'text-error';
  };

  const getEfficiencyBg = (efficiency) => {
    if (efficiency >= 85) return 'bg-success';
    if (efficiency >= 70) return 'bg-warning';
    return 'bg-error';
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-medium">
          <p className="font-medium text-popover-foreground">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {entry?.name}: {entry?.value}
              {selectedMetric === 'consumption' && 'L'}
              {selectedMetric === 'efficiency' && '%'}
              {selectedMetric === 'cost' && '₹'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="BarChart3" size={24} className="text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Water Usage Analytics</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Select
            options={timeRangeOptions}
            value={timeRange}
            onChange={setTimeRange}
            className="w-32"
          />
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            onClick={onExportData}
          />
          <Button
            variant="outline"
            size="sm"
            iconName="Target"
            onClick={onSetBudget}
          >
            Set Budget
          </Button>
        </div>
      </div>
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-4 border border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Usage</p>
              <p className="text-2xl font-bold text-foreground">
                {formatNumber(usageData?.summary?.totalUsage)}L
              </p>
              <p className="text-xs text-primary">
                {usageData?.summary?.usageChange > 0 ? '+' : ''}
                {usageData?.summary?.usageChange}% vs last {timeRange}
              </p>
            </div>
            <Icon name="Droplets" size={32} className="text-primary" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-success/10 to-success/5 rounded-lg p-4 border border-success/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Efficiency</p>
              <p className="text-2xl font-bold text-foreground">
                {usageData?.summary?.efficiency}%
              </p>
              <p className="text-xs text-success">
                {usageData?.summary?.efficiencyChange > 0 ? '+' : ''}
                {usageData?.summary?.efficiencyChange}% improvement
              </p>
            </div>
            <Icon name="TrendingUp" size={32} className="text-success" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-warning/10 to-warning/5 rounded-lg p-4 border border-warning/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Cost</p>
              <p className="text-2xl font-bold text-foreground">
                ₹{formatNumber(usageData?.summary?.cost)}
              </p>
              <p className="text-xs text-warning">
                ₹{usageData?.summary?.costPerLiter}/L average
              </p>
            </div>
            <Icon name="IndianRupee" size={32} className="text-warning" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-lg p-4 border border-accent/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Savings</p>
              <p className="text-2xl font-bold text-foreground">
                ₹{formatNumber(usageData?.summary?.savings)}
              </p>
              <p className="text-xs text-accent">
                vs traditional methods
              </p>
            </div>
            <Icon name="PiggyBank" size={32} className="text-accent" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Usage Trend Chart */}
        <div className="bg-muted/20 rounded-lg p-4 border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Usage Trends</h3>
            <Select
              options={metricOptions}
              value={selectedMetric}
              onChange={setSelectedMetric}
              className="w-40"
            />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={usageData?.trends}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="date" 
                  className="text-xs"
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  className="text-xs"
                  tick={{ fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey={selectedMetric}
                  stroke="var(--color-primary)" 
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Zone-wise Distribution */}
        <div className="bg-muted/20 rounded-lg p-4 border border-border">
          <h3 className="font-semibold text-foreground mb-4">Zone-wise Water Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={usageData?.zoneDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="usage"
                >
                  {usageData?.zoneDistribution?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {usageData?.zoneDistribution?.map((zone, index) => (
              <div key={zone?.name} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS?.[index % COLORS?.length] }}
                />
                <span className="text-xs text-foreground">{zone?.name}</span>
                <span className="text-xs text-muted-foreground">
                  {zone?.usage}L ({zone?.percentage}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Efficiency Breakdown */}
      <div className="bg-muted/20 rounded-lg p-4 border border-border mb-6">
        <h3 className="font-semibold text-foreground mb-4">Efficiency Breakdown by Zone</h3>
        <div className="space-y-3">
          {usageData?.efficiencyBreakdown?.map((zone) => (
            <div key={zone?.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="MapPin" size={14} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{zone?.name}</p>
                  <p className="text-xs text-muted-foreground">{zone?.cropType}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{zone?.usage}L</p>
                  <p className="text-xs text-muted-foreground">Used</p>
                </div>
                
                <div className="w-24">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Efficiency</span>
                    <span className={getEfficiencyColor(zone?.efficiency)}>
                      {zone?.efficiency}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${getEfficiencyBg(zone?.efficiency)}`}
                      style={{ width: `${zone?.efficiency}%` }}
                    />
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">₹{zone?.cost}</p>
                  <p className="text-xs text-muted-foreground">Cost</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Conservation Recommendations */}
      <div className="bg-gradient-to-r from-success/5 to-primary/5 rounded-lg p-4 border border-success/20">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Leaf" size={20} className="text-success" />
          <h3 className="font-semibold text-foreground">Water Conservation Recommendations</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {usageData?.recommendations?.map((recommendation, index) => (
            <div key={index} className="bg-card rounded-md p-3 border border-border">
              <div className="flex items-start space-x-2">
                <Icon 
                  name={recommendation?.icon} 
                  size={16} 
                  className="text-success flex-shrink-0 mt-0.5" 
                />
                <div>
                  <h4 className="font-medium text-foreground text-sm">{recommendation?.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {recommendation?.description}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-xs font-medium text-success">
                      Save: {recommendation?.savings}L/day
                    </span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs font-medium text-primary">
                      ₹{recommendation?.costSavings}/month
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WaterUsageTracking;