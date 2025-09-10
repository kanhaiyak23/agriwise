import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertsCard = ({ alerts, onViewAll, onDismiss }) => {
  const getAlertIcon = (type) => {
    switch (type) {
      case 'weather':
        return 'CloudRain';
      case 'pest':
        return 'Bug';
      case 'disease':
        return 'AlertTriangle';
      case 'irrigation':
        return 'Droplets';
      case 'harvest':
        return 'Calendar';
      default:
        return 'Bell';
    }
  };

  const getAlertColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-primary';
      default:
        return 'text-muted-foreground';
    }
  };

  const getPriorityBg = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-error/10 border-error/20';
      case 'medium':
        return 'bg-warning/10 border-warning/20';
      case 'low':
        return 'bg-primary/10 border-primary/20';
      default:
        return 'bg-muted border-border';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-lg text-card-foreground">
          Active Alerts
        </h3>
        <div className="flex items-center space-x-2">
          <span className="bg-error text-error-foreground text-xs px-2 py-1 rounded-full font-medium">
            {alerts?.length}
          </span>
          <Button variant="ghost" size="sm" onClick={onViewAll}>
            View All
          </Button>
        </div>
      </div>
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {alerts?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="CheckCircle" size={32} className="text-success mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No active alerts</p>
          </div>
        ) : (
          alerts?.map((alert) => (
            <div 
              key={alert?.id} 
              className={`p-3 rounded-lg border ${getPriorityBg(alert?.priority)}`}
            >
              <div className="flex items-start space-x-3">
                <Icon 
                  name={getAlertIcon(alert?.type)} 
                  size={18} 
                  className={`${getAlertColor(alert?.priority)} flex-shrink-0 mt-0.5`} 
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-card-foreground capitalize">
                      {alert?.type} Alert
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {alert?.time}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {alert?.message}
                  </p>
                  {alert?.action && (
                    <Button 
                      variant="outline" 
                      size="xs"
                      onClick={() => alert?.action?.handler()}
                      className="mr-2"
                    >
                      {alert?.action?.label}
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="xs"
                    onClick={() => onDismiss(alert?.id)}
                    className="text-muted-foreground"
                  >
                    Dismiss
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AlertsCard;