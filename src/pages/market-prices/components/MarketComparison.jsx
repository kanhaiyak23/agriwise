import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MarketComparison = ({ selectedCrop = 'Wheat' }) => {
  const [selectedMarket, setSelectedMarket] = useState('local');

  const marketData = [
    {
      id: 'local',
      name: 'Local Mandi',
      location: 'Green Valley',
      distance: '2 km',
      price: 2260,
      transportCost: 50,
      netPrice: 2210,
      quality: 'Grade A',
      paymentTerms: 'Immediate',
      commission: 2.5
    },
    {
      id: 'regional',
      name: 'Regional Market',
      location: 'Rajpur',
      distance: '25 km',
      price: 2320,
      transportCost: 180,
      netPrice: 2140,
      quality: 'Grade A+',
      paymentTerms: '7 days',
      commission: 3.0
    },
    {
      id: 'wholesale',
      name: 'Wholesale Hub',
      location: 'Delhi',
      distance: '120 km',
      price: 2450,
      transportCost: 400,
      netPrice: 2050,
      quality: 'Export Grade',
      paymentTerms: '15 days',
      commission: 4.0
    }
  ];

  const getBestPriceMarket = () => {
    return marketData?.reduce((best, current) => 
      current?.netPrice > best?.netPrice ? current : best
    );
  };

  const bestMarket = getBestPriceMarket();

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="MapPin" size={24} className="text-primary" />
          <div>
            <h2 className="font-heading font-semibold text-xl text-card-foreground">
              Market Comparison
            </h2>
            <p className="text-sm text-muted-foreground">
              Compare prices across different markets for {selectedCrop}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 bg-success/10 px-3 py-2 rounded-lg">
          <Icon name="Award" size={16} className="text-success" />
          <span className="text-sm font-medium text-success">
            Best: {bestMarket?.name}
          </span>
        </div>
      </div>
      <div className="grid gap-4">
        {marketData?.map((market) => (
          <div
            key={market?.id}
            className={`border rounded-lg p-4 cursor-pointer transition-smooth ${
              selectedMarket === market?.id 
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            } ${market?.id === bestMarket?.id ? 'ring-2 ring-success/20' : ''}`}
            onClick={() => setSelectedMarket(market?.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-heading font-semibold text-lg text-card-foreground">
                    {market?.name}
                  </h3>
                  {market?.id === bestMarket?.id && (
                    <Icon name="Crown" size={16} className="text-success" />
                  )}
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span className="flex items-center space-x-1">
                    <Icon name="MapPin" size={14} />
                    <span>{market?.location}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Navigation" size={14} />
                    <span>{market?.distance}</span>
                  </span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-bold text-card-foreground">
                  ₹{market?.netPrice?.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">net price</div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-3 border-t border-border">
              <div>
                <p className="text-xs text-muted-foreground">Market Price</p>
                <p className="font-semibold text-card-foreground">₹{market?.price}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Transport</p>
                <p className="font-semibold text-error">-₹{market?.transportCost}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Quality</p>
                <p className="font-semibold text-card-foreground">{market?.quality}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Payment</p>
                <p className="font-semibold text-card-foreground">{market?.paymentTerms}</p>
              </div>
            </div>

            {selectedMarket === market?.id && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-card-foreground">Price Breakdown</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Base Price:</span>
                    <span className="text-card-foreground">₹{market?.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Transport Cost:</span>
                    <span className="text-error">-₹{market?.transportCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Commission ({market?.commission}%):</span>
                    <span className="text-error">-₹{Math.round(market?.price * market?.commission / 100)}</span>
                  </div>
                  <div className="flex justify-between font-semibold pt-2 border-t border-border">
                    <span className="text-card-foreground">Net Earnings:</span>
                    <span className="text-success">₹{market?.netPrice}</span>
                  </div>
                </div>
                
                <div className="mt-4 flex space-x-2">
                  <Button variant="outline" size="sm" iconName="Phone" iconPosition="left">
                    Contact
                  </Button>
                  <Button variant="outline" size="sm" iconName="Navigation" iconPosition="left">
                    Directions
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketComparison;