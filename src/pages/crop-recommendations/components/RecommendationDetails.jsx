import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecommendationDetails = ({ 
  recommendation, 
  onClose, 
  onStartPlanning,
  isVisible 
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isVisible || !recommendation) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Eye' },
    { id: 'analysis', label: 'AI Analysis', icon: 'Brain' },
    { id: 'timeline', label: 'Timeline', icon: 'Calendar' },
    { id: 'resources', label: 'Resources', icon: 'Package' }
  ];

  const analysisFactors = [
    {
      category: 'Soil Analysis',
      icon: 'Mountain',
      factors: [
        { name: 'Soil pH Level', value: '6.2-6.8', status: 'optimal', description: 'Perfect pH range for nutrient absorption' },
        { name: 'Organic Matter', value: '3.2%', status: 'good', description: 'Good organic content supports healthy growth' },
        { name: 'Drainage', value: 'Well-drained', status: 'optimal', description: 'Excellent drainage prevents waterlogging' },
        { name: 'Nutrient Level', value: 'Medium-High', status: 'good', description: 'Adequate nutrients available' }
      ]
    },
    {
      category: 'Weather Conditions',
      icon: 'Cloud',
      factors: [
        { name: 'Temperature Range', value: '22-28°C', status: 'optimal', description: 'Ideal temperature for growth phase' },
        { name: 'Rainfall Pattern', value: '600-800mm', status: 'optimal', description: 'Perfect rainfall distribution expected' },
        { name: 'Humidity', value: '65-75%', status: 'good', description: 'Suitable humidity levels' },
        { name: 'Sunlight Hours', value: '6-8 hours', status: 'optimal', description: 'Adequate sunlight exposure' }
      ]
    },
    {
      category: 'Market Analysis',
      icon: 'TrendingUp',
      factors: [
        { name: 'Current Price', value: '₹45/kg', status: 'good', description: 'Above average market price' },
        { name: 'Demand Trend', value: 'Increasing', status: 'optimal', description: 'Growing demand in target markets' },
        { name: 'Supply Gap', value: '15%', status: 'optimal', description: 'Supply shortage creates opportunity' },
        { name: 'Export Potential', value: 'High', status: 'optimal', description: 'Strong export market available' }
      ]
    }
  ];

  const timeline = [
    { phase: 'Land Preparation', duration: '2 weeks', activities: ['Soil testing', 'Plowing', 'Fertilizer application'], month: 'March' },
    { phase: 'Sowing', duration: '1 week', activities: ['Seed treatment', 'Sowing', 'Initial irrigation'], month: 'April' },
    { phase: 'Growth Phase', duration: '8 weeks', activities: ['Regular irrigation', 'Pest monitoring', 'Fertilizer application'], month: 'May-June' },
    { phase: 'Flowering', duration: '3 weeks', activities: ['Pollination support', 'Disease prevention', 'Water management'], month: 'July' },
    { phase: 'Harvest', duration: '2 weeks', activities: ['Harvesting', 'Post-harvest handling', 'Storage'], month: 'August' }
  ];

  const resources = [
    { category: 'Seeds', items: ['High-yield variety seeds - 5kg', 'Seed treatment chemicals'], cost: '₹2,500' },
    { category: 'Fertilizers', items: ['NPK fertilizer - 50kg', 'Organic compost - 100kg', 'Micronutrients'], cost: '₹8,000' },
    { category: 'Pesticides', items: ['Fungicide', 'Insecticide', 'Herbicide'], cost: '₹3,500' },
    { category: 'Equipment', items: ['Irrigation pipes', 'Spraying equipment', 'Harvesting tools'], cost: '₹12,000' },
    { category: 'Labor', items: ['Land preparation', 'Sowing and maintenance', 'Harvesting'], cost: '₹15,000' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'optimal': return 'text-success';
      case 'good': return 'text-warning';
      case 'poor': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'optimal': return 'CheckCircle';
      case 'good': return 'AlertCircle';
      case 'poor': return 'XCircle';
      default: return 'Circle';
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-muted rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-success mb-1">
            {recommendation?.confidence}%
          </div>
          <div className="text-sm text-muted-foreground">AI Confidence</div>
        </div>
        <div className="bg-muted rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-card-foreground mb-1">
            {recommendation?.expectedYield}
          </div>
          <div className="text-sm text-muted-foreground">Expected Yield</div>
        </div>
        <div className="bg-muted rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-primary mb-1">
            {recommendation?.investmentLevel}
          </div>
          <div className="text-sm text-muted-foreground">Investment</div>
        </div>
        <div className="bg-muted rounded-lg p-4 text-center">
          <div className={`text-2xl font-bold mb-1 ${
            recommendation?.riskLevel === 'Low' ? 'text-success' : 
            recommendation?.riskLevel === 'Medium' ? 'text-warning' : 'text-error'
          }`}>
            {recommendation?.riskLevel}
          </div>
          <div className="text-sm text-muted-foreground">Risk Level</div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-muted rounded-lg p-4">
        <h4 className="font-body font-medium text-card-foreground mb-2">
          Why This Crop is Recommended
        </h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Based on comprehensive analysis of your soil conditions, local weather patterns, and current market trends, 
          {recommendation?.cropName} ({recommendation?.variety}) shows excellent potential for your farm. The AI model 
          considers factors including soil pH compatibility, seasonal weather alignment, market demand forecasts, 
          and your specified investment preferences to generate this recommendation with {recommendation?.confidence}% confidence.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Button
          variant="default"
          onClick={onStartPlanning}
          iconName="Calendar"
          iconPosition="left"
          fullWidth
        >
          Start Crop Planning
        </Button>
        <Button
          variant="outline"
          iconName="MessageCircle"
          iconPosition="left"
          fullWidth
        >
          Consult Expert
        </Button>
      </div>
    </div>
  );

  const renderAnalysis = () => (
    <div className="space-y-6">
      {analysisFactors?.map((category) => (
        <div key={category?.category} className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name={category?.icon} size={20} className="text-primary" />
            <h4 className="font-body font-medium text-card-foreground">
              {category?.category}
            </h4>
          </div>
          <div className="space-y-3">
            {category?.factors?.map((factor) => (
              <div key={factor?.name} className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <Icon 
                      name={getStatusIcon(factor?.status)} 
                      size={16} 
                      className={getStatusColor(factor?.status)} 
                    />
                    <span className="font-body text-sm font-medium text-card-foreground">
                      {factor?.name}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground ml-6">
                    {factor?.description}
                  </p>
                </div>
                <span className={`font-data text-sm font-medium ${getStatusColor(factor?.status)}`}>
                  {factor?.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderTimeline = () => (
    <div className="space-y-4">
      {timeline?.map((phase, index) => (
        <div key={phase?.phase} className="flex items-start space-x-4">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-data font-bold text-sm">
              {index + 1}
            </div>
            {index < timeline?.length - 1 && (
              <div className="w-0.5 h-16 bg-border mt-2"></div>
            )}
          </div>
          <div className="flex-1 bg-muted rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-body font-medium text-card-foreground">
                {phase?.phase}
              </h4>
              <div className="text-right">
                <div className="font-data text-sm font-medium text-primary">
                  {phase?.month}
                </div>
                <div className="text-xs text-muted-foreground">
                  {phase?.duration}
                </div>
              </div>
            </div>
            <div className="space-y-1">
              {phase?.activities?.map((activity) => (
                <div key={activity} className="flex items-center space-x-2">
                  <Icon name="CheckCircle" size={14} className="text-success" />
                  <span className="text-sm text-muted-foreground">{activity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderResources = () => (
    <div className="space-y-4">
      {resources?.map((resource) => (
        <div key={resource?.category} className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-body font-medium text-card-foreground">
              {resource?.category}
            </h4>
            <span className="font-data font-bold text-primary">
              {resource?.cost}
            </span>
          </div>
          <div className="space-y-2">
            {resource?.items?.map((item) => (
              <div key={item} className="flex items-center space-x-2">
                <Icon name="Package" size={14} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      <div className="bg-primary/10 border border-primary rounded-lg p-4">
        <div className="flex items-center justify-between">
          <span className="font-body font-medium text-card-foreground">
            Total Estimated Cost
          </span>
          <span className="font-data font-bold text-xl text-primary">
            ₹41,000
          </span>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Estimated return on investment: ₹85,000 - ₹1,20,000
        </p>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'analysis': return renderAnalysis();
      case 'timeline': return renderTimeline();
      case 'resources': return renderResources();
      default: return renderOverview();
    }
  };

  return (
    <div className="fixed inset-0 z-1003 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-strong w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden">
              <img 
                src={recommendation?.image} 
                alt={recommendation?.cropName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/assets/images/no_image.png';
                }}
              />
            </div>
            <div>
              <h2 className="font-heading font-bold text-xl text-card-foreground">
                {recommendation?.cropName}
              </h2>
              <p className="font-body text-muted-foreground">
                {recommendation?.variety}
              </p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
          />
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <div className="flex space-x-1 p-1">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-smooth ${
                  activeTab === tab?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-card-foreground hover:bg-muted'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default RecommendationDetails;