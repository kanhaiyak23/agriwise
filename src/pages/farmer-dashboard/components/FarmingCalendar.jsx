import React from 'react';
import Icon from '../../../components/AppIcon';

const FarmingCalendar = ({ calendarData }) => {
  const getTaskIcon = (type) => {
    switch (type) {
      case 'planting':
        return 'Sprout';
      case 'irrigation':
        return 'Droplets';
      case 'fertilizer':
        return 'Beaker';
      case 'harvest':
        return 'Wheat';
      case 'treatment':
        return 'Shield';
      default:
        return 'Calendar';
    }
  };

  const getTaskColor = (priority) => {
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
        return 'bg-error/10 border-l-error';
      case 'medium':
        return 'bg-warning/10 border-l-warning';
      case 'low':
        return 'bg-primary/10 border-l-primary';
      default:
        return 'bg-muted border-l-border';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-lg text-card-foreground">
          Farming Calendar
        </h3>
        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={20} className="text-primary" />
          <span className="text-sm text-muted-foreground">This Week</span>
        </div>
      </div>
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {calendarData?.map((task) => (
          <div 
            key={task?.id} 
            className={`p-3 rounded-lg border-l-4 ${getPriorityBg(task?.priority)}`}
          >
            <div className="flex items-start space-x-3">
              <Icon 
                name={getTaskIcon(task?.type)} 
                size={18} 
                className={`${getTaskColor(task?.priority)} flex-shrink-0 mt-0.5`} 
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-card-foreground">
                    {task?.title}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {task?.date}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  {task?.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    task?.completed 
                      ? 'bg-success/10 text-success' :'bg-muted text-muted-foreground'
                  }`}>
                    {task?.completed ? 'Completed' : 'Pending'}
                  </span>
                  {task?.progress !== undefined && (
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all duration-300"
                          style={{ width: `${task?.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {task?.progress}%
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FarmingCalendar;