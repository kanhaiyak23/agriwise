import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/farmer-dashboard',
      icon: 'LayoutDashboard',
      tooltip: 'Farm overview and alerts',
      voiceCommand: 'show dashboard'
    },
    {
      label: 'Recommendations',
      path: '/crop-recommendations',
      icon: 'Lightbulb',
      tooltip: 'AI-powered crop guidance',
      voiceCommand: 'show recommendations'
    },
    {
      label: 'Irrigation',
      path: '/irrigation-planning',
      icon: 'Droplets',
      tooltip: 'Water management planning',
      voiceCommand: 'show irrigation'
    },
    {
      label: 'Market',
      path: '/market-prices',
      icon: 'TrendingUp',
      tooltip: 'Real-time pricing intelligence',
      voiceCommand: 'show market prices'
    }
  ];

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-1000 bg-card border-b border-border shadow-soft">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <Link to="/farmer-dashboard" className="flex items-center space-x-2 flex-shrink-0">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="Wheat" size={20} color="white" />
          </div>
          <span className="font-heading font-bold text-xl text-foreground">
            AgriWise
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-body font-medium transition-smooth ${
                isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              title={item?.tooltip}
            >
              <Icon name={item?.icon} size={18} />
              <span>{item?.label}</span>
            </Link>
          ))}
        </nav>

        {/* Voice Input Button - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            iconName="Mic"
            iconPosition="left"
            className="animate-pulse-soft"
            onClick={() => {
              // Voice input functionality would be implemented here
              console.log('Voice input activated');
            }}
          >
            Voice
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleMobileMenu}
          iconName={isMobileMenuOpen ? "X" : "Menu"}
        />
      </div>
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-1002 bg-background">
          <div className="flex flex-col p-4 space-y-2">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={closeMobileMenu}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-body font-medium transition-smooth ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={20} />
                <span>{item?.label}</span>
              </Link>
            ))}
            
            {/* Mobile Voice Input */}
            <div className="pt-4 border-t border-border">
              <Button
                variant="outline"
                fullWidth
                iconName="Mic"
                iconPosition="left"
                className="animate-pulse-soft"
                onClick={() => {
                  closeMobileMenu();
                  console.log('Voice input activated');
                }}
              >
                Voice Command
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;