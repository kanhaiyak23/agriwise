import React from 'react';
import Icon from '../../../components/AppIcon';

const WeatherCard = ({ weatherData }) => {
  const { temperature, condition, humidity, windSpeed, forecast } = weatherData;

  const getWeatherIcon = (condition) => {
    switch (condition?.toLowerCase()) {
      case 'sunny': case'clear':
        return 'Sun';
      case 'cloudy': case'overcast':
        return 'Cloud';
      case 'rainy': case'rain':
        return 'CloudRain';
      case 'stormy':
        return 'CloudLightning';
      default:
        return 'Sun';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-lg text-card-foreground">
          Current Weather
        </h3>
        <Icon name={getWeatherIcon(condition)} size={24} className="text-primary" />
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold text-card-foreground">{temperature}°C</p>
            <p className="text-sm text-muted-foreground capitalize">{condition}</p>
          </div>
          <div className="text-right space-y-1">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Droplets" size={16} />
              <span>{humidity}%</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Wind" size={16} />
              <span>{windSpeed} km/h</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-card-foreground mb-2">3-Day Forecast</h4>
          <div className="grid grid-cols-3 gap-2">
            {forecast?.map((day, index) => (
              <div key={index} className="text-center">
                <p className="text-xs text-muted-foreground">{day?.day}</p>
                <Icon name={getWeatherIcon(day?.condition)} size={16} className="mx-auto my-1 text-primary" />
                <p className="text-xs font-medium text-card-foreground">{day?.temp}°</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;