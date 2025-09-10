import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PriceChart = ({ cropName = 'Wheat', data = [] }) => {
  const [timeRange, setTimeRange] = useState('7d');

  const mockData = [
    { date: '2025-01-03', price: 2150, volume: 450 },
    { date: '2025-01-04', price: 2180, volume: 520 },
    { date: '2025-01-05', price: 2165, volume: 380 },
    { date: '2025-01-06', price: 2200, volume: 610 },
    { date: '2025-01-07', price: 2220, volume: 490 },
    { date: '2025-01-08', price: 2195, volume: 430 },
    { date: '2025-01-09', price: 2240, volume: 580 },
    { date: '2025-01-10', price: 2260, volume: 650 }
  ];

  const chartData = data?.length > 0 ? data : mockData;

  const timeRanges = [
    { key: '7d', label: '7 Days' },
    { key: '1m', label: '1 Month' },
    { key: '3m', label: '3 Months' },
    { key: '1y', label: '1 Year' }
  ];

  const formatTooltipValue = (value, name) => {
    if (name === 'price') {
      return [`₹${value?.toLocaleString()}`, 'Price'];
    }
    return [value, name];
  };

  const formatXAxisLabel = (tickItem) => {
    const date = new Date(tickItem);
    return date?.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="TrendingUp" size={24} className="text-primary" />
          <div>
            <h2 className="font-heading font-semibold text-xl text-card-foreground">
              {cropName} Price Trend
            </h2>
            <p className="text-sm text-muted-foreground">Historical price movement</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {timeRanges?.map((range) => (
            <Button
              key={range?.key}
              variant={timeRange === range?.key ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange(range?.key)}
            >
              {range?.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatXAxisLabel}
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              tickFormatter={(value) => `₹${value}`}
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip 
              formatter={formatTooltipValue}
              labelFormatter={(label) => `Date: ${new Date(label)?.toLocaleDateString('en-IN')}`}
              contentStyle={{
                backgroundColor: 'var(--color-popover)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                color: 'var(--color-popover-foreground)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="var(--color-primary)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Current</p>
          <p className="font-semibold text-card-foreground">₹2,260</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">High</p>
          <p className="font-semibold text-success">₹2,280</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Low</p>
          <p className="font-semibold text-error">₹2,140</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Avg Volume</p>
          <p className="font-semibold text-card-foreground">520 Qt</p>
        </div>
      </div>
    </div>
  );
};

export default PriceChart;