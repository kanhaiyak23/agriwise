import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const IrrigationCalendar = ({ schedules, onScheduleUpdate, onAddSchedule }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('week'); // 'week' or 'month'

  const getDaysInWeek = (date) => {
    const startOfWeek = new Date(date);
    startOfWeek?.setDate(date?.getDate() - date?.getDay());
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day?.setDate(startOfWeek?.getDate() + i);
      days?.push(day);
    }
    return days;
  };

  const getSchedulesForDate = (date) => {
    const dateStr = date?.toISOString()?.split('T')?.[0];
    return schedules?.filter(schedule => schedule?.date === dateStr);
  };

  const formatTime = (time) => {
    return new Date(`2000-01-01T${time}`)?.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const weekDays = getDaysInWeek(selectedDate);

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-foreground">Irrigation Schedule</h2>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'week' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('week')}
            >
              Week
            </Button>
            <Button
              variant={viewMode === 'month' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('month')}
            >
              Month
            </Button>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="ChevronLeft"
            onClick={() => {
              const newDate = new Date(selectedDate);
              newDate?.setDate(selectedDate?.getDate() - 7);
              setSelectedDate(newDate);
            }}
          />
          <span className="text-sm font-medium text-foreground px-4">
            {selectedDate?.toLocaleDateString('en-US', { 
              month: 'long', 
              year: 'numeric' 
            })}
          </span>
          <Button
            variant="outline"
            size="sm"
            iconName="ChevronRight"
            onClick={() => {
              const newDate = new Date(selectedDate);
              newDate?.setDate(selectedDate?.getDate() + 7);
              setSelectedDate(newDate);
            }}
          />
          <Button
            variant="default"
            size="sm"
            iconName="Plus"
            iconPosition="left"
            onClick={onAddSchedule}
          >
            Add Schedule
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']?.map((day) => (
          <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
            {day}
          </div>
        ))}
        
        {weekDays?.map((date, index) => {
          const daySchedules = getSchedulesForDate(date);
          const isToday = date?.toDateString() === new Date()?.toDateString();
          
          return (
            <div
              key={index}
              className={`min-h-32 p-3 rounded-lg border ${
                isToday 
                  ? 'bg-primary/5 border-primary' :'bg-muted/30 border-border'
              }`}
            >
              <div className={`text-sm font-medium mb-2 ${
                isToday ? 'text-primary' : 'text-foreground'
              }`}>
                {date?.getDate()}
              </div>
              <div className="space-y-1">
                {daySchedules?.map((schedule) => (
                  <div
                    key={schedule?.id}
                    className={`text-xs p-2 rounded cursor-pointer transition-colors ${
                      schedule?.status === 'completed' 
                        ? 'bg-success/10 text-success border border-success/20'
                        : schedule?.status === 'active' ?'bg-warning/10 text-warning border border-warning/20' :'bg-primary/10 text-primary border border-primary/20'
                    }`}
                    onClick={() => onScheduleUpdate(schedule)}
                  >
                    <div className="flex items-center space-x-1">
                      <Icon 
                        name={schedule?.type === 'automatic' ? 'Zap' : 'User'} 
                        size={10} 
                      />
                      <span className="font-medium">{formatTime(schedule?.time)}</span>
                    </div>
                    <div className="mt-1">
                      {schedule?.zone} • {schedule?.duration}min
                    </div>
                    <div className="text-xs opacity-75">
                      {schedule?.waterAmount}L
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded bg-success/20 border border-success/40"></div>
            <span>Completed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded bg-warning/20 border border-warning/40"></div>
            <span>Active</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded bg-primary/20 border border-primary/40"></div>
            <span>Scheduled</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Icon name="Droplets" size={16} className="text-primary" />
          <span>Total today: 2,450L</span>
        </div>
      </div>
    </div>
  );
};

export default IrrigationCalendar;