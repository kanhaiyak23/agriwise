import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ManualOverrideControls = ({ zones, onOverride, onSavePreset, savedPresets }) => {
  const [selectedZone, setSelectedZone] = useState('');
  const [duration, setDuration] = useState('');
  const [waterAmount, setWaterAmount] = useState('');
  const [startTime, setStartTime] = useState('');
  const [isImmediate, setIsImmediate] = useState(true);
  const [presetName, setPresetName] = useState('');
  const [showPresetForm, setShowPresetForm] = useState(false);

  const zoneOptions = zones?.map(zone => ({
    value: zone?.id,
    label: `${zone?.name} (${zone?.area} hectares)`,
    description: zone?.cropType
  }));

  const presetOptions = savedPresets?.map(preset => ({
    value: preset?.id,
    label: preset?.name,
    description: `${preset?.duration}min • ${preset?.waterAmount}L`
  }));

  const handleImmediateOverride = () => {
    if (!selectedZone || !duration || !waterAmount) {
      alert('Please fill in all required fields');
      return;
    }

    const overrideData = {
      zoneId: selectedZone,
      duration: parseInt(duration),
      waterAmount: parseInt(waterAmount),
      startTime: isImmediate ? 'immediate' : startTime,
      type: 'manual',
      timestamp: new Date()?.toISOString()
    };

    onOverride(overrideData);
    
    // Reset form
    setSelectedZone('');
    setDuration('');
    setWaterAmount('');
    setStartTime('');
  };

  const handleSavePreset = () => {
    if (!presetName || !selectedZone || !duration || !waterAmount) {
      alert('Please fill in all fields to save preset');
      return;
    }

    const preset = {
      id: Date.now()?.toString(),
      name: presetName,
      zoneId: selectedZone,
      duration: parseInt(duration),
      waterAmount: parseInt(waterAmount),
      createdAt: new Date()?.toISOString()
    };

    onSavePreset(preset);
    setPresetName('');
    setShowPresetForm(false);
  };

  const handleLoadPreset = (presetId) => {
    const preset = savedPresets?.find(p => p?.id === presetId);
    if (preset) {
      setSelectedZone(preset?.zoneId);
      setDuration(preset?.duration?.toString());
      setWaterAmount(preset?.waterAmount?.toString());
    }
  };

  const getZoneStatus = (zoneId) => {
    const zone = zones?.find(z => z?.id === zoneId);
    return zone?.status || 'idle';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success';
      case 'scheduled': return 'text-warning';
      case 'error': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return 'Play';
      case 'scheduled': return 'Clock';
      case 'error': return 'AlertTriangle';
      default: return 'Pause';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Settings" size={24} className="text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Manual Override Controls</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Save"
            onClick={() => setShowPresetForm(!showPresetForm)}
          >
            {showPresetForm ? 'Cancel' : 'Save Preset'}
          </Button>
        </div>
      </div>
      {/* Quick Presets */}
      {savedPresets?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-foreground mb-3">Quick Presets</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {savedPresets?.map((preset) => (
              <button
                key={preset?.id}
                onClick={() => handleLoadPreset(preset?.id)}
                className="p-3 bg-muted/30 hover:bg-muted border border-border rounded-lg text-left transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-foreground">{preset?.name}</span>
                  <Icon name="Clock" size={14} className="text-muted-foreground" />
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div>Duration: {preset?.duration} minutes</div>
                  <div>Water: {preset?.waterAmount} liters</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Manual Override Form */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Manual Irrigation</h3>
          
          <Select
            label="Select Zone"
            placeholder="Choose irrigation zone"
            options={zoneOptions}
            value={selectedZone}
            onChange={setSelectedZone}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Duration (minutes)"
              type="number"
              placeholder="30"
              value={duration}
              onChange={(e) => setDuration(e?.target?.value)}
              min="1"
              max="180"
              required
            />
            
            <Input
              label="Water Amount (liters)"
              type="number"
              placeholder="500"
              value={waterAmount}
              onChange={(e) => setWaterAmount(e?.target?.value)}
              min="1"
              required
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                id="immediate"
                name="timing"
                checked={isImmediate}
                onChange={() => setIsImmediate(true)}
                className="w-4 h-4 text-primary"
              />
              <label htmlFor="immediate" className="text-sm font-medium text-foreground">
                Start Immediately
              </label>
            </div>
            
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                id="scheduled"
                name="timing"
                checked={!isImmediate}
                onChange={() => setIsImmediate(false)}
                className="w-4 h-4 text-primary"
              />
              <label htmlFor="scheduled" className="text-sm font-medium text-foreground">
                Schedule for Later
              </label>
            </div>
            
            {!isImmediate && (
              <Input
                label="Start Time"
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e?.target?.value)}
                className="ml-7"
                required
              />
            )}
          </div>

          {showPresetForm && (
            <div className="p-4 bg-muted/20 rounded-lg border border-border">
              <Input
                label="Preset Name"
                placeholder="e.g., Morning Tomato Watering"
                value={presetName}
                onChange={(e) => setPresetName(e?.target?.value)}
                required
              />
              <div className="flex space-x-2 mt-3">
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleSavePreset}
                  className="flex-1"
                >
                  Save Preset
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPresetForm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          <Button
            variant="default"
            fullWidth
            iconName="Play"
            iconPosition="left"
            onClick={handleImmediateOverride}
            disabled={!selectedZone || !duration || !waterAmount}
          >
            {isImmediate ? 'Start Irrigation Now' : 'Schedule Irrigation'}
          </Button>
        </div>

        {/* Zone Status Overview */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Zone Status</h3>
          
          <div className="space-y-3">
            {zones?.map((zone) => (
              <div
                key={zone?.id}
                className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="MapPin" size={16} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{zone?.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {zone?.cropType} • {zone?.area} hectares
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className={`flex items-center space-x-1 ${getStatusColor(zone?.status)}`}>
                      <Icon name={getStatusIcon(zone?.status)} size={14} />
                      <span className="text-sm font-medium capitalize">{zone?.status}</span>
                    </div>
                    {zone?.nextScheduled && (
                      <p className="text-xs text-muted-foreground">
                        Next: {zone?.nextScheduled}
                      </p>
                    )}
                  </div>
                  
                  {zone?.status === 'active' && (
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Square"
                      onClick={() => onOverride({ zoneId: zone?.id, action: 'stop' })}
                    >
                      Stop
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-start space-x-2">
              <Icon name="AlertTriangle" size={16} className="text-warning flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-warning">Override Notice</h4>
                <p className="text-sm text-warning/80 mt-1">
                  Manual overrides will temporarily disable automatic scheduling. 
                  The system will resume normal operation after completion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManualOverrideControls;