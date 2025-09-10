import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WeatherIntegration = ({ weatherData, onWeatherUpdate, onAlertSettings }) => {
  const [selectedDay, setSelectedDay] = useState(0);

  const getWeatherIcon = (condition) => {
    const iconMap = {
      'sunny': 'Sun',
      'cloudy': 'Cloud',
      'rainy': 'CloudRain',
      'stormy': 'CloudLightning',
      'partly-cloudy': 'CloudSun',
      'windy': 'Wind'
    };
    return iconMap?.[condition] || 'Cloud';
  };

  const getTemperatureColor = (temp) => {
    if (temp >= 35) return 'text-error';
    if (temp >= 25) return 'text-warning';
    return 'text-primary';
  };

  const getRainProbabilityColor = (prob) => {
    if (prob >= 70) return 'text-primary';
    if (prob >= 40) return 'text-warning';
    return 'text-muted-foreground';
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date?.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="CloudSun" size={24} className="text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Weather Forecast</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Settings"
            onClick={onAlertSettings}
          />
          <Button
            variant="outline"
            size="sm"
            iconName="RefreshCw"
            iconPosition="left"
            onClick={onWeatherUpdate}
          >
            Update
          </Button>
        </div>
      </div>
      {/* Current Weather */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Icon 
              name={getWeatherIcon(weatherData?.current?.condition)} 
              size={48} 
              className="text-primary" 
            />
            <div>
              <h3 className="text-2xl font-bold text-foreground">
                {weatherData?.current?.temperature}°C
              </h3>
              <p className="text-muted-foreground capitalize">
                {weatherData?.current?.condition?.replace('-', ' ')}
              </p>
              <p className="text-sm text-muted-foreground">
                Feels like {weatherData?.current?.feelsLike}°C
              </p>
            </div>
          </div>
          
          <div className="text-right space-y-2">
            <div className="flex items-center space-x-2">
              <Icon name="Droplets" size={16} className="text-primary" />
              <span className="text-sm text-foreground">
                Humidity: {weatherData?.current?.humidity}%
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Wind" size={16} className="text-primary" />
              <span className="text-sm text-foreground">
                Wind: {weatherData?.current?.windSpeed} km/h
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Eye" size={16} className="text-primary" />
              <span className="text-sm text-foreground">
                Visibility: {weatherData?.current?.visibility} km
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* 7-Day Forecast */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">7-Day Forecast</h3>
        <div className="grid grid-cols-7 gap-2">
          {weatherData?.forecast?.map((day, index) => (
            <button
              key={index}
              onClick={() => setSelectedDay(index)}
              className={`p-3 rounded-lg border transition-colors ${
                selectedDay === index
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-muted/30 hover:bg-muted border-border'
              }`}
            >
              <div className="text-xs font-medium mb-2">
                {index === 0 ? 'Today' : formatDate(day?.date)?.split(',')?.[0]}
              </div>
              <Icon 
                name={getWeatherIcon(day?.condition)} 
                size={24} 
                className="mx-auto mb-2" 
              />
              <div className="text-xs space-y-1">
                <div className={getTemperatureColor(day?.high)}>
                  {day?.high}°
                </div>
                <div className="text-muted-foreground">
                  {day?.low}°
                </div>
                <div className={getRainProbabilityColor(day?.rainProbability)}>
                  {day?.rainProbability}%
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Detailed Day View */}
      {weatherData?.forecast?.[selectedDay] && (
        <div className="bg-muted/20 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-foreground mb-3">
            {selectedDay === 0 ? 'Today' : formatDate(weatherData?.forecast?.[selectedDay]?.date)} Details
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <Icon name="Thermometer" size={20} className="text-warning mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">High</p>
              <p className="font-semibold text-foreground">
                {weatherData?.forecast?.[selectedDay]?.high}°C
              </p>
            </div>
            <div className="text-center">
              <Icon name="Snowflake" size={20} className="text-primary mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">Low</p>
              <p className="font-semibold text-foreground">
                {weatherData?.forecast?.[selectedDay]?.low}°C
              </p>
            </div>
            <div className="text-center">
              <Icon name="CloudRain" size={20} className="text-primary mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">Rain</p>
              <p className="font-semibold text-foreground">
                {weatherData?.forecast?.[selectedDay]?.rainProbability}%
              </p>
            </div>
            <div className="text-center">
              <Icon name="Wind" size={20} className="text-secondary mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">Wind</p>
              <p className="font-semibold text-foreground">
                {weatherData?.forecast?.[selectedDay]?.windSpeed} km/h
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Weather Alerts */}
      {weatherData?.alerts && weatherData?.alerts?.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">Weather Alerts</h3>
          {weatherData?.alerts?.map((alert, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                alert?.severity === 'high' ?'bg-error/10 border-error/20'
                  : alert?.severity === 'medium' ?'bg-warning/10 border-warning/20' :'bg-primary/10 border-primary/20'
              }`}
            >
              <div className="flex items-start space-x-3">
                <Icon 
                  name={alert?.severity === 'high' ? 'AlertTriangle' : 'Info'} 
                  size={20} 
                  className={
                    alert?.severity === 'high' ?'text-error'
                      : alert?.severity === 'medium' ?'text-warning' :'text-primary'
                  }
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">{alert?.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{alert?.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Valid until: {alert?.validUntil}
                    </span>
                    {alert?.irrigationImpact && (
                      <span className="text-xs font-medium text-primary">
                        Irrigation Impact: {alert?.irrigationImpact}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherIntegration;