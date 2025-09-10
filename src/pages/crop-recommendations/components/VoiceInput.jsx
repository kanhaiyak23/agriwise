import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VoiceInput = ({ onVoiceCommand, isListening, onToggleListening }) => {
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if speech recognition is supported
    setIsSupported('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
  }, []);

  const voiceCommands = [
    { command: 'show cereals', description: 'Filter by cereal crops' },
    { command: 'high investment', description: 'Show high investment crops' },
    { command: 'low risk crops', description: 'Filter by low risk level' },
    { command: 'compare crops', description: 'Open comparison view' },
    { command: 'clear filters', description: 'Reset all filters' },
    { command: 'show details', description: 'View crop details' }
  ];

  const handleVoiceCommand = (command) => {
    const normalizedCommand = command?.toLowerCase()?.trim();
    
    // Process voice commands
    if (normalizedCommand?.includes('cereal') || normalizedCommand?.includes('wheat') || normalizedCommand?.includes('rice')) {
      onVoiceCommand({ type: 'filter', cropTypes: ['cereals'] });
    } else if (normalizedCommand?.includes('vegetable')) {
      onVoiceCommand({ type: 'filter', cropTypes: ['vegetables'] });
    } else if (normalizedCommand?.includes('fruit')) {
      onVoiceCommand({ type: 'filter', cropTypes: ['fruits'] });
    } else if (normalizedCommand?.includes('high investment')) {
      onVoiceCommand({ type: 'filter', investmentLevel: 'High' });
    } else if (normalizedCommand?.includes('low investment')) {
      onVoiceCommand({ type: 'filter', investmentLevel: 'Low' });
    } else if (normalizedCommand?.includes('low risk')) {
      onVoiceCommand({ type: 'filter', riskLevel: 'Low' });
    } else if (normalizedCommand?.includes('compare')) {
      onVoiceCommand({ type: 'action', action: 'showComparison' });
    } else if (normalizedCommand?.includes('clear')) {
      onVoiceCommand({ type: 'action', action: 'clearFilters' });
    } else {
      onVoiceCommand({ type: 'search', query: command });
    }
  };

  const startListening = () => {
    if (!isSupported) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US'; // Can be made dynamic based on user preference

    recognition.onstart = () => {
      onToggleListening(true);
      setTranscript('Listening...');
    };

    recognition.onresult = (event) => {
      const command = event?.results?.[0]?.[0]?.transcript;
      setTranscript(command);
      handleVoiceCommand(command);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event?.error);
      setTranscript('Error occurred. Please try again.');
      onToggleListening(false);
    };

    recognition.onend = () => {
      onToggleListening(false);
      setTimeout(() => setTranscript(''), 3000);
    };

    recognition?.start();
  };

  if (!isSupported) {
    return (
      <div className="bg-muted rounded-lg p-4 text-center">
        <Icon name="MicOff" size={24} className="text-muted-foreground mx-auto mb-2" />
        <p className="text-sm text-muted-foreground">
          Voice input not supported in this browser
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Mic" size={20} className="text-muted-foreground" />
          <h3 className="font-heading font-semibold text-lg text-card-foreground">
            Voice Commands
          </h3>
        </div>
        
        <Button
          variant={isListening ? "destructive" : "default"}
          size="sm"
          onClick={isListening ? () => onToggleListening(false) : startListening}
          iconName={isListening ? "MicOff" : "Mic"}
          iconPosition="left"
          className={isListening ? "animate-pulse" : ""}
        >
          {isListening ? 'Stop' : 'Start'}
        </Button>
      </div>
      {/* Voice Status */}
      {(isListening || transcript) && (
        <div className="bg-muted rounded-lg p-3 mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-error animate-pulse' : 'bg-success'}`} />
            <span className="font-body text-sm font-medium text-card-foreground">
              {isListening ? 'Listening...' : 'Command Received'}
            </span>
          </div>
          {transcript && (
            <p className="font-body text-sm text-muted-foreground italic">
              "{transcript}"
            </p>
          )}
        </div>
      )}
      {/* Voice Commands Help */}
      <div>
        <h4 className="font-body font-medium text-sm text-card-foreground mb-3">
          Try these commands:
        </h4>
        <div className="space-y-2">
          {voiceCommands?.map((cmd) => (
            <div key={cmd?.command} className="flex items-center justify-between">
              <span className="font-data text-sm text-primary">
                "{cmd?.command}"
              </span>
              <span className="font-body text-xs text-muted-foreground">
                {cmd?.description}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Language Selection */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="font-body text-sm text-muted-foreground">
            Voice Language:
          </span>
          <select className="bg-background border border-border rounded px-2 py-1 text-sm">
            <option value="en-US">English</option>
            <option value="hi-IN">हिंदी</option>
            <option value="te-IN">తెలుగు</option>
            <option value="ta-IN">தமிழ்</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default VoiceInput;