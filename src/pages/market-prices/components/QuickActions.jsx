import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  const quickActions = [
    {
      id: 'voice-query',
      label: 'Voice Price Query',
      icon: 'Mic',
      description: 'Ask about current prices',
      action: () => {
        setIsVoiceActive(!isVoiceActive);
        // Voice recognition would be implemented here
        setTimeout(() => setIsVoiceActive(false), 3000);
      }
    },
    {
      id: 'quick-alert',
      label: 'Quick Alert',
      icon: 'Bell',
      description: 'Set price alert for current crop',
      action: () => {
        // Quick alert setup
        console.log('Setting quick alert');
      }
    },
    {
      id: 'market-contact',
      label: 'Market Contacts',
      icon: 'Phone',
      description: 'Call nearby market dealers',
      action: () => {
        // Show market contacts
        console.log('Showing market contacts');
      }
    },
    {
      id: 'price-history',
      label: 'Price History',
      icon: 'History',
      description: 'View 30-day price trends',
      action: () => {
        // Show price history
        console.log('Showing price history');
      }
    }
  ];

  const emergencyContacts = [
    {
      name: 'Green Valley Mandi',
      phone: '+91 98765 43210',
      type: 'Local Market',
      distance: '2 km'
    },
    {
      name: 'Agricultural Officer',
      phone: '+91 98765 43211',
      type: 'Government',
      distance: '5 km'
    },
    {
      name: 'Cooperative Society',
      phone: '+91 98765 43212',
      type: 'Cooperative',
      distance: '3 km'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Zap" size={24} className="text-primary" />
          <div>
            <h2 className="font-heading font-semibold text-xl text-card-foreground">
              Quick Actions
            </h2>
            <p className="text-sm text-muted-foreground">
              Fast access to common market tasks
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quickActions?.map((action) => (
            <Button
              key={action?.id}
              variant="outline"
              className={`h-auto p-4 flex-col items-start text-left ${
                action?.id === 'voice-query' && isVoiceActive ?'border-primary bg-primary/5 animate-pulse' :''
              }`}
              onClick={action?.action}
            >
              <div className="flex items-center space-x-3 mb-2 w-full">
                <Icon 
                  name={action?.icon} 
                  size={20} 
                  className={action?.id === 'voice-query' && isVoiceActive ? 'text-primary' : 'text-muted-foreground'} 
                />
                <span className="font-medium text-card-foreground">{action?.label}</span>
              </div>
              <p className="text-sm text-muted-foreground">{action?.description}</p>
            </Button>
          ))}
        </div>

        {isVoiceActive && (
          <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-medium text-primary">
                Listening... Try saying "What's the price of wheat today?"
              </span>
            </div>
          </div>
        )}
      </div>
      {/* Emergency Contacts */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Phone" size={24} className="text-primary" />
          <div>
            <h2 className="font-heading font-semibold text-xl text-card-foreground">
              Market Contacts
            </h2>
            <p className="text-sm text-muted-foreground">
              Quick access to market dealers and officials
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {emergencyContacts?.map((contact, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex-1">
                <h3 className="font-medium text-card-foreground">{contact?.name}</h3>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>{contact?.type}</span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <Icon name="MapPin" size={12} />
                    <span>{contact?.distance}</span>
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Phone"
                  onClick={() => window.open(`tel:${contact?.phone}`)}
                >
                  Call
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="MessageSquare"
                  onClick={() => window.open(`sms:${contact?.phone}`)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Market Status */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Clock" size={24} className="text-primary" />
          <div>
            <h2 className="font-heading font-semibold text-xl text-card-foreground">
              Market Status
            </h2>
            <p className="text-sm text-muted-foreground">
              Current market operating hours and status
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-success/5 border border-success/20 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-success rounded-full" />
              <div>
                <p className="font-medium text-card-foreground">Green Valley Mandi</p>
                <p className="text-sm text-muted-foreground">Open • Closes at 6:00 PM</p>
              </div>
            </div>
            <span className="text-sm font-medium text-success">Active Trading</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-warning/5 border border-warning/20 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-warning rounded-full" />
              <div>
                <p className="font-medium text-card-foreground">Regional Market</p>
                <p className="text-sm text-muted-foreground">Limited • Holiday hours</p>
              </div>
            </div>
            <span className="text-sm font-medium text-warning">Reduced Hours</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/50 border border-border rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-muted-foreground rounded-full" />
              <div>
                <p className="font-medium text-card-foreground">Wholesale Hub</p>
                <p className="text-sm text-muted-foreground">Closed • Opens tomorrow 6:00 AM</p>
              </div>
            </div>
            <span className="text-sm font-medium text-muted-foreground">Closed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;