import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PriceAlerts = () => {
  const [showAddAlert, setShowAddAlert] = useState(false);
  const [newAlert, setNewAlert] = useState({
    crop: '',
    targetPrice: '',
    condition: 'above',
    notifications: ['sms']
  });

  const activeAlerts = [
    {
      id: 1,
      crop: 'Wheat',
      targetPrice: 2300,
      condition: 'above',
      currentPrice: 2260,
      status: 'active',
      notifications: ['sms', 'push'],
      createdAt: '2025-01-08'
    },
    {
      id: 2,
      crop: 'Rice',
      targetPrice: 1800,
      condition: 'below',
      currentPrice: 1850,
      status: 'active',
      notifications: ['push'],
      createdAt: '2025-01-07'
    },
    {
      id: 3,
      crop: 'Corn',
      targetPrice: 1500,
      condition: 'above',
      currentPrice: 1520,
      status: 'triggered',
      notifications: ['sms', 'push'],
      createdAt: '2025-01-06',
      triggeredAt: '2025-01-09'
    }
  ];

  const cropOptions = [
    { value: 'wheat', label: 'Wheat' },
    { value: 'rice', label: 'Rice' },
    { value: 'corn', label: 'Corn' },
    { value: 'sugarcane', label: 'Sugarcane' },
    { value: 'cotton', label: 'Cotton' }
  ];

  const conditionOptions = [
    { value: 'above', label: 'Above' },
    { value: 'below', label: 'Below' }
  ];

  const handleAddAlert = () => {
    if (newAlert?.crop && newAlert?.targetPrice) {
      // Add alert logic would go here
      setShowAddAlert(false);
      setNewAlert({
        crop: '',
        targetPrice: '',
        condition: 'above',
        notifications: ['sms']
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-primary';
      case 'triggered': return 'text-success';
      case 'expired': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return 'Clock';
      case 'triggered': return 'CheckCircle';
      case 'expired': return 'XCircle';
      default: return 'Clock';
    }
  };

  const getProgressPercentage = (current, target, condition) => {
    if (condition === 'above') {
      return Math.min((current / target) * 100, 100);
    } else {
      return Math.min(((target - current) / target) * 100, 100);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Bell" size={24} className="text-primary" />
          <div>
            <h2 className="font-heading font-semibold text-xl text-card-foreground">
              Price Alerts
            </h2>
            <p className="text-sm text-muted-foreground">
              Get notified when prices reach your target
            </p>
          </div>
        </div>
        
        <Button
          variant="default"
          iconName="Plus"
          iconPosition="left"
          onClick={() => setShowAddAlert(true)}
        >
          Add Alert
        </Button>
      </div>
      {showAddAlert && (
        <div className="mb-6 p-4 border border-border rounded-lg bg-muted/50">
          <h3 className="font-heading font-semibold text-lg text-card-foreground mb-4">
            Create New Alert
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Select
              label="Select Crop"
              options={cropOptions}
              value={newAlert?.crop}
              onChange={(value) => setNewAlert({...newAlert, crop: value})}
              placeholder="Choose crop"
            />
            
            <div className="flex space-x-2">
              <Select
                label="Condition"
                options={conditionOptions}
                value={newAlert?.condition}
                onChange={(value) => setNewAlert({...newAlert, condition: value})}
                className="w-24"
              />
              <Input
                label="Target Price (₹)"
                type="number"
                placeholder="2300"
                value={newAlert?.targetPrice}
                onChange={(e) => setNewAlert({...newAlert, targetPrice: e?.target?.value})}
                className="flex-1"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  checked={newAlert?.notifications?.includes('sms')}
                  onChange={(e) => {
                    if (e?.target?.checked) {
                      setNewAlert({...newAlert, notifications: [...newAlert?.notifications, 'sms']});
                    } else {
                      setNewAlert({...newAlert, notifications: newAlert?.notifications?.filter(n => n !== 'sms')});
                    }
                  }}
                  className="rounded"
                />
                <span className="text-sm text-card-foreground">SMS</span>
              </label>
              <label className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  checked={newAlert?.notifications?.includes('push')}
                  onChange={(e) => {
                    if (e?.target?.checked) {
                      setNewAlert({...newAlert, notifications: [...newAlert?.notifications, 'push']});
                    } else {
                      setNewAlert({...newAlert, notifications: newAlert?.notifications?.filter(n => n !== 'push')});
                    }
                  }}
                  className="rounded"
                />
                <span className="text-sm text-card-foreground">Push Notification</span>
              </label>
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowAddAlert(false)}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={handleAddAlert}
              >
                Create Alert
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="space-y-4">
        {activeAlerts?.map((alert) => (
          <div
            key={alert?.id}
            className={`border rounded-lg p-4 ${
              alert?.status === 'triggered' ? 'border-success bg-success/5' : 'border-border'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Icon 
                  name={getStatusIcon(alert?.status)} 
                  size={20} 
                  className={getStatusColor(alert?.status)} 
                />
                <div>
                  <h3 className="font-heading font-semibold text-lg text-card-foreground">
                    {alert?.crop}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Alert when price goes {alert?.condition} ₹{alert?.targetPrice}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  alert?.status === 'active' ? 'bg-primary/10 text-primary' :
                  alert?.status === 'triggered'? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
                }`}>
                  {alert?.status}
                </span>
                <Button variant="ghost" size="icon" iconName="MoreVertical" />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-xs text-muted-foreground">Current Price</p>
                <p className="font-semibold text-card-foreground">₹{alert?.currentPrice}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Target Price</p>
                <p className="font-semibold text-card-foreground">₹{alert?.targetPrice}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Difference</p>
                <p className={`font-semibold ${
                  alert?.condition === 'above' 
                    ? (alert?.currentPrice >= alert?.targetPrice ? 'text-success' : 'text-error')
                    : (alert?.currentPrice <= alert?.targetPrice ? 'text-success' : 'text-error')
                }`}>
                  ₹{Math.abs(alert?.currentPrice - alert?.targetPrice)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Created</p>
                <p className="font-semibold text-card-foreground">
                  {new Date(alert.createdAt)?.toLocaleDateString('en-IN')}
                </p>
              </div>
            </div>

            {alert?.status === 'active' && (
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Progress to target</span>
                  <span className="text-card-foreground">
                    {getProgressPercentage(alert?.currentPrice, alert?.targetPrice, alert?.condition)?.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-smooth" 
                    style={{ 
                      width: `${getProgressPercentage(alert?.currentPrice, alert?.targetPrice, alert?.condition)}%` 
                    }}
                  />
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {alert?.notifications?.map((type) => (
                  <span key={type} className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Icon name={type === 'sms' ? 'MessageSquare' : 'Bell'} size={12} />
                    <span>{type?.toUpperCase()}</span>
                  </span>
                ))}
              </div>
              
              {alert?.status === 'triggered' && alert?.triggeredAt && (
                <span className="text-xs text-success">
                  Triggered on {new Date(alert.triggeredAt)?.toLocaleDateString('en-IN')}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceAlerts;