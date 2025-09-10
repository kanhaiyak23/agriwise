import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import AlertBanner from '../../components/ui/AlertBanner';
import LocationIndicator from '../../components/ui/LocationIndicator';
import ConnectivityStatus from '../../components/ui/ConnectivityStatus';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

// Import page components
import RecommendationCard from './components/RecommendationCard';
import FilterPanel from './components/FilterPanel';
import ComparisonPanel from './components/ComparisonPanel';
import RecommendationDetails from './components/RecommendationDetails';
import VoiceInput from './components/VoiceInput';

const CropRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [filteredRecommendations, setFilteredRecommendations] = useState([]);
  const [filters, setFilters] = useState({
    cropTypes: [],
    investmentLevel: '',
    harvestTimeline: '',
    minConfidence: 0
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);
  const [comparisonCrops, setComparisonCrops] = useState([]);
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const [sortBy, setSortBy] = useState('confidence');
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  // Mock recommendations data
  const mockRecommendations = [
    {
      id: 1,
      cropName: 'Tomato',
      variety: 'Hybrid Cherry',
      confidence: 92,
      expectedYield: '25-30 tons/hectare',
      marketPotential: 'High',
      seasonalTiming: 'March-April',
      soilCompatibility: 5,
      weatherSuitability: 4,
      marketDemand: 5,
      investmentLevel: 'Medium',
      profitability: 'High',
      riskLevel: 'Low',
      harvestTime: '90-100 days',
      image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg'
    },
    {
      id: 2,
      cropName: 'Wheat',
      variety: 'HD-3086',
      confidence: 88,
      expectedYield: '4.5-5.5 tons/hectare',
      marketPotential: 'High',
      seasonalTiming: 'November-December',
      soilCompatibility: 4,
      weatherSuitability: 5,
      marketDemand: 4,
      investmentLevel: 'Low',
      profitability: 'Medium',
      riskLevel: 'Low',
      harvestTime: '120-130 days',
      image: 'https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg'
    },
    {
      id: 3,
      cropName: 'Cotton',
      variety: 'Bt Cotton',
      confidence: 85,
      expectedYield: '18-22 quintals/hectare',
      marketPotential: 'High',
      seasonalTiming: 'May-June',
      soilCompatibility: 4,
      weatherSuitability: 4,
      marketDemand: 5,
      investmentLevel: 'High',
      profitability: 'High',
      riskLevel: 'Medium',
      harvestTime: '180-200 days',
      image: 'https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg'
    },
    {
      id: 4,
      cropName: 'Rice',
      variety: 'Basmati 1121',
      confidence: 82,
      expectedYield: '6-7 tons/hectare',
      marketPotential: 'High',
      seasonalTiming: 'June-July',
      soilCompatibility: 5,
      weatherSuitability: 4,
      marketDemand: 4,
      investmentLevel: 'Medium',
      profitability: 'High',
      riskLevel: 'Low',
      harvestTime: '120-140 days',
      image: 'https://images.pexels.com/photos/1651794/pexels-photo-1651794.jpeg'
    },
    {
      id: 5,
      cropName: 'Sugarcane',
      variety: 'Co-86032',
      confidence: 78,
      expectedYield: '80-100 tons/hectare',
      marketPotential: 'Medium',
      seasonalTiming: 'February-March',
      soilCompatibility: 4,
      weatherSuitability: 3,
      marketDemand: 3,
      investmentLevel: 'High',
      profitability: 'Medium',
      riskLevel: 'Medium',
      harvestTime: '12-14 months',
      image: 'https://images.pexels.com/photos/8142969/pexels-photo-8142969.jpeg'
    },
    {
      id: 6,
      cropName: 'Onion',
      variety: 'Nashik Red',
      confidence: 89,
      expectedYield: '20-25 tons/hectare',
      marketPotential: 'High',
      seasonalTiming: 'October-November',
      soilCompatibility: 4,
      weatherSuitability: 4,
      marketDemand: 5,
      investmentLevel: 'Low',
      profitability: 'High',
      riskLevel: 'Low',
      harvestTime: '100-120 days',
      image: 'https://images.pexels.com/photos/144248/onions-food-vegetables-healthy-144248.jpeg'
    }
  ];

  useEffect(() => {
    // Initialize recommendations
    setRecommendations(mockRecommendations);
    setFilteredRecommendations(mockRecommendations);
  }, []);

  useEffect(() => {
    // Apply filters and search
    let filtered = recommendations;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered?.filter(rec => 
        rec?.cropName?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        rec?.variety?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    // Apply crop type filter
    if (filters?.cropTypes?.length > 0) {
      filtered = filtered?.filter(rec => {
        const cropType = getCropType(rec?.cropName);
        return filters?.cropTypes?.includes(cropType);
      });
    }

    // Apply investment level filter
    if (filters?.investmentLevel) {
      filtered = filtered?.filter(rec => rec?.investmentLevel === filters?.investmentLevel);
    }

    // Apply harvest timeline filter
    if (filters?.harvestTimeline) {
      filtered = filtered?.filter(rec => {
        const timeline = getHarvestTimeline(rec?.harvestTime);
        return timeline === filters?.harvestTimeline;
      });
    }

    // Apply minimum confidence filter
    if (filters?.minConfidence > 0) {
      filtered = filtered?.filter(rec => rec?.confidence >= filters?.minConfidence);
    }

    // Apply sorting
    filtered = [...filtered]?.sort((a, b) => {
      switch (sortBy) {
        case 'confidence':
          return b?.confidence - a?.confidence;
        case 'profitability':
          return getProfitabilityScore(b?.profitability) - getProfitabilityScore(a?.profitability);
        case 'risk':
          return getRiskScore(a?.riskLevel) - getRiskScore(b?.riskLevel);
        case 'name':
          return a?.cropName?.localeCompare(b?.cropName);
        default:
          return 0;
      }
    });

    setFilteredRecommendations(filtered);
  }, [recommendations, filters, searchQuery, sortBy]);

  const getCropType = (cropName) => {
    const cropTypes = {
      'Wheat': 'cereals',
      'Rice': 'cereals',
      'Tomato': 'vegetables',
      'Onion': 'vegetables',
      'Cotton': 'cash-crops',
      'Sugarcane': 'cash-crops'
    };
    return cropTypes?.[cropName] || 'others';
  };

  const getHarvestTimeline = (harvestTime) => {
    if (harvestTime?.includes('90') || harvestTime?.includes('100') || harvestTime?.includes('120')) {
      return 'Short';
    } else if (harvestTime?.includes('180') || harvestTime?.includes('200')) {
      return 'Medium';
    } else {
      return 'Long';
    }
  };

  const getProfitabilityScore = (profitability) => {
    switch (profitability) {
      case 'High': return 3;
      case 'Medium': return 2;
      case 'Low': return 1;
      default: return 0;
    }
  };

  const getRiskScore = (riskLevel) => {
    switch (riskLevel) {
      case 'Low': return 1;
      case 'Medium': return 2;
      case 'High': return 3;
      default: return 0;
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      cropTypes: [],
      investmentLevel: '',
      harvestTimeline: '',
      minConfidence: 0
    });
    setSearchQuery('');
  };

  const handleSelectRecommendation = (recommendation) => {
    setSelectedRecommendation(recommendation);
    setShowDetails(true);
  };

  const handleCompareToggle = (recommendation) => {
    const isInComparison = comparisonCrops?.some(crop => crop?.id === recommendation?.id);
    
    if (isInComparison) {
      setComparisonCrops(comparisonCrops?.filter(crop => crop?.id !== recommendation?.id));
    } else {
      if (comparisonCrops?.length < 3) {
        setComparisonCrops([...comparisonCrops, recommendation]);
      }
    }
  };

  const handleRemoveFromComparison = (cropId) => {
    setComparisonCrops(comparisonCrops?.filter(crop => crop?.id !== cropId));
  };

  const handleClearComparison = () => {
    setComparisonCrops([]);
  };

  const handleVoiceCommand = (command) => {
    switch (command?.type) {
      case 'filter':
        setFilters(prev => ({ ...prev, ...command }));
        break;
      case 'search':
        setSearchQuery(command?.query);
        break;
      case 'action':
        if (command?.action === 'showComparison') {
          setShowComparison(true);
        } else if (command?.action === 'clearFilters') {
          handleClearFilters();
        }
        break;
      default:
        break;
    }
  };

  const handleStartPlanning = () => {
    // Navigate to irrigation planning or crop management
    console.log('Starting crop planning for:', selectedRecommendation?.cropName);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <AlertBanner
        type="info"
        message="New AI model update: Improved accuracy for seasonal crop recommendations based on climate data."
        actionLabel="Learn More"
        onAction={() => console.log('Learn more clicked')}
        onDismiss={() => console.log('Banner dismissed')}
      />
      <main className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="mb-4 lg:mb-0">
              <div className="flex items-center space-x-2 mb-2">
                <Link 
                  to="/farmer-dashboard" 
                  className="text-muted-foreground hover:text-foreground transition-smooth"
                >
                  <Icon name="ArrowLeft" size={20} />
                </Link>
                <h1 className="font-heading font-bold text-3xl text-foreground">
                  Crop Recommendations
                </h1>
              </div>
              <p className="font-body text-muted-foreground">
                AI-powered crop suggestions based on your soil, weather, and market conditions
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <LocationIndicator onLocationChange={(location) => console.log('Location changed:', location)} />
              <ConnectivityStatus 
                onSync={() => console.log('Syncing data...')}
                onRetry={() => console.log('Retrying connection...')}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Search */}
              <div className="bg-card border border-border rounded-lg p-4">
                <Input
                  type="search"
                  placeholder="Search crops..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="mb-4"
                />
                
                <div className="flex items-center justify-between mb-4">
                  <span className="font-body text-sm text-muted-foreground">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e?.target?.value)}
                    className="bg-background border border-border rounded px-2 py-1 text-sm"
                  >
                    <option value="confidence">Confidence</option>
                    <option value="profitability">Profitability</option>
                    <option value="risk">Risk Level</option>
                    <option value="name">Name</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="icon"
                    onClick={() => setViewMode('grid')}
                    iconName="Grid3X3"
                  />
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="icon"
                    onClick={() => setViewMode('list')}
                    iconName="List"
                  />
                </div>
              </div>

              {/* Filters */}
              <FilterPanel
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                isExpanded={isFilterExpanded}
                onToggleExpanded={() => setIsFilterExpanded(!isFilterExpanded)}
              />

              {/* Voice Input */}
              <VoiceInput
                onVoiceCommand={handleVoiceCommand}
                isListening={isVoiceListening}
                onToggleListening={setIsVoiceListening}
              />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <span className="font-body text-muted-foreground">
                    {filteredRecommendations?.length} recommendations found
                  </span>
                  
                  {comparisonCrops?.length > 0 && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setShowComparison(!showComparison)}
                      iconName="GitCompare"
                      iconPosition="left"
                    >
                      Compare ({comparisonCrops?.length})
                    </Button>
                  )}
                </div>
              </div>

              {/* Comparison Panel */}
              <ComparisonPanel
                comparisonCrops={comparisonCrops}
                onRemoveFromComparison={handleRemoveFromComparison}
                onClearComparison={handleClearComparison}
                isVisible={showComparison}
              />

              {/* Recommendations Grid */}
              <div className={`${
                viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-4'
              } ${showComparison ? 'mt-6' : ''}`}>
                {filteredRecommendations?.map((recommendation) => (
                  <RecommendationCard
                    key={recommendation?.id}
                    recommendation={recommendation}
                    onSelect={handleSelectRecommendation}
                    onCompare={handleCompareToggle}
                    isSelected={selectedRecommendation?.id === recommendation?.id}
                    isInComparison={comparisonCrops?.some(crop => crop?.id === recommendation?.id)}
                  />
                ))}
              </div>

              {/* Empty State */}
              {filteredRecommendations?.length === 0 && (
                <div className="text-center py-12">
                  <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-heading font-semibold text-lg text-card-foreground mb-2">
                    No recommendations found
                  </h3>
                  <p className="font-body text-muted-foreground mb-4">
                    Try adjusting your filters or search terms
                  </p>
                  <Button
                    variant="outline"
                    onClick={handleClearFilters}
                    iconName="RotateCcw"
                    iconPosition="left"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      {/* Recommendation Details Modal */}
      <RecommendationDetails
        recommendation={selectedRecommendation}
        onClose={() => setShowDetails(false)}
        onStartPlanning={handleStartPlanning}
        isVisible={showDetails}
      />
    </div>
  );
};

export default CropRecommendations;