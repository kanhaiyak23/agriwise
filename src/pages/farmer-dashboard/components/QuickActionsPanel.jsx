import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsPanel = ({ onVoiceInput }) => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 'pest-id',
      title: 'Pest Identification',
      description: 'Upload photo to identify pests',
      icon: 'Bug',
      color: 'text-error',
      bgColor: 'bg-error/10',
      action: () => console.log('Opening pest identification')
    },
    {
      id: 'disease-diagnosis',
      title: 'Disease Diagnosis',
      description: 'Analyze crop health issues',
      icon: 'Stethoscope',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      action: () => console.log('Opening disease diagnosis')
    },
    {
      id: 'irrigation',
      title: 'Irrigation Planning',
      description: 'Optimize water usage',
      icon: 'Droplets',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      action: () => navigate('/irrigation-planning')
    },
    {
      id: 'recommendations',
      title: 'AI Recommendations',
      description: 'Get personalized advice',
      icon: 'Lightbulb',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      action: () => navigate('/crop-recommendations')
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading font-semibold text-lg text-card-foreground">
          Quick Actions
        </h3>
        <Button
          variant="outline"
          size="sm"
          iconName="Mic"
          iconPosition="left"
          onClick={onVoiceInput}
          className="animate-pulse"
        >
          Voice
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quickActions?.map((action) => (
          <div
            key={action?.id}
            onClick={action?.action}
            className="p-4 rounded-lg border border-border hover:border-primary/30 cursor-pointer transition-all duration-200 hover:shadow-medium group"
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className={`p-2 rounded-lg ${action?.bgColor}`}>
                <Icon name={action?.icon} size={20} className={action?.color} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm text-card-foreground group-hover:text-primary transition-colors">
                  {action?.title}
                </h4>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              {action?.description}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            size="sm"
            iconName="Camera"
            iconPosition="left"
            onClick={() => console.log('Opening camera')}
          >
            Take Photo
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Upload"
            iconPosition="left"
            onClick={() => console.log('Opening file upload')}
          >
            Upload Image
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsPanel;