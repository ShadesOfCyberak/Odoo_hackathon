
import React, { useState, useMemo } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Filter, 
  ArrowRight,
  Calendar as CalendarIcon,
  Clock,
  MapPin
} from 'lucide-react';
import { Trip } from '../types';

interface CalendarViewProps {
  trips: Trip[];
}

const CalendarView: React.FC<CalendarViewProps> = ({ trips }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  /**
   * Helper to parse 'YYYY-MM-DD' safely into local date objects
   * This prevents UTC timezone shifts that make trips "disappear" or shift days.
   */
  const parseLocalDate = (dateStr: string) => {
    if (!dateStr) return null;
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  const isSameDay = (d1: Date, d2: Date) => {
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
  };

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const totalDays = daysInMonth(year, month);
    const startDay = firstDayOfMonth(year, month);
    
    const days = [];
    for (let i = 0; i < startDay; i++) {
      days.push({ day: null, date: null });
    }
    for (let i = 1; i <= totalDays; i++) {
      days.push({ day: i, date: new Date(year, month, i) });
    }
    return days;
  }, [currentDate]);

  const filteredTrips = useMemo(() => {
    return trips.filter(t => 
      t.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [trips, searchQuery]);

  const getTripsForDate = (date: Date) => {
    if (!date) return [];
    return filteredTrips.filter(trip => {
      const start = parseLocalDate(trip.startDate);
      const end = parseLocalDate(trip.endDate);
      if (!start || !end) return false;

      // Normalize check date
      const check = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      return check >= start && check <= end;
    });
  };

  const getTripColor = (id: string) => {
    const colors = [
      'bg-blue-600/20 border-blue-500/30 text-blue-400',
      'bg-emerald-600/20 border-emerald-500/30 text-emerald-400',
      'bg-indigo-600/20 border-indigo-500/30 text-indigo-400',
      'bg-rose-600/20 border-rose-500/30 text-rose-400',
      'bg-amber-600/20 border-amber-500/30 text-amber-400'
    ];
    let hash = 0;
    for (let i = 0; i < id.length; i++) hash = id.charCodeAt(i) + ((hash << 5) - hash);
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div className="space-y-10 pb-20 animate-in fade-in duration-700">
      <header className="px-4 space-y-8">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch">
          <div className="relative flex-grow group">
            <div className="flex items-center bg-[#0f172a]/40 backdrop-blur-3xl border border-white/5 rounded-[24px] px-6 py-4 transition-all focus-within:border-blue-500 shadow-2xl">
              <Search className="w-5 h-5 mr-4 text-slate-600" />
              <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search expeditions..." 
                className="bg-transparent border-none focus:ring-0 text-sm font-bold text-white placeholder:text-slate-800 w-full"
              />
            </div>
          </div>

          <div className="flex items-stretch gap-2">
            <button className="flex items-center gap-2 px-6 py-4 bg-[#0f172a]/60 border border-white/5 rounded-[18px] text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all">
               Group by
            </button>
            <button className="flex items-center gap-2 px-6 py-4 bg-[#0f172a]/60 border border-white/5 rounded-[18px] text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all">
               Filter
            </button>
          </div>
        </div>
      </header>

      <div className="px-4">
        <div className="glass rounded-[48px] border border-white/5 overflow-hidden shadow-2xl flex flex-col min-h-[750px] relative">
          
          <div className="p-10 flex items-center justify-between border-b border-white/5 bg-slate-950/20">
            <button onClick={prevMonth} className="p-4 hover:bg-white/5 rounded-full text-slate-500 transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="text-center">
              <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] mt-2">Active Geospatial Manifest</p>
            </div>
            <button onClick={nextMonth} className="p-4 hover:bg-white/5 rounded-full text-slate-500 transition-colors">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-7 border-b border-white/5 bg-slate-950/40">
            {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day, i) => (
              <div key={i} className="py-5 text-center text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 flex-grow divide-x divide-y divide-white/[0.03]">
            {calendarDays.map((item, idx) => {
              const activeTrips = item.date ? getTripsForDate(item.date) : [];
              return (
                <div 
                  key={idx} 
                  className={`min-h-[160px] p-4 flex flex-col gap-2 transition-colors relative ${item.day ? 'bg-transparent' : 'bg-slate-950/40 opacity-30'}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-sm font-black ${item.day ? 'text-slate-400' : 'text-slate-800'}`}>
                      {item.day || ''}
                    </span>
                  </div>

                  <div className="space-y-2 overflow-y-auto custom-scrollbar max-h-24">
                    {activeTrips.map((trip) => {
                      const startDate = parseLocalDate(trip.startDate);
                      const endDate = parseLocalDate(trip.endDate);
                      const isStart = item.date && startDate && isSameDay(item.date, startDate);
                      const isEnd = item.date && endDate && isSameDay(item.date, endDate);
                      
                      return (
                        <div 
                          key={trip.id} 
                          className={`group/trip relative px-3 py-2 rounded-xl border text-[9px] font-black uppercase tracking-tight transition-all hover:scale-105 hover:z-10 cursor-default ${getTripColor(trip.id)}`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="truncate">{trip.name}</span>
                            {isStart && <span className="bg-white/10 px-1.5 py-0.5 rounded text-[7px] border border-white/5 shrink-0">START</span>}
                            {isEnd && <span className="bg-white/10 px-1.5 py-0.5 rounded text-[7px] border border-white/5 shrink-0">END</span>}
                          </div>
                          
                          {/* Span details tooltips on hover */}
                          <div className="absolute left-0 bottom-full mb-2 opacity-0 group-hover/trip:opacity-100 transition-opacity pointer-events-none z-50 min-w-[200px]">
                            <div className="bg-slate-950 border border-white/10 rounded-2xl p-4 shadow-2xl space-y-2">
                               <p className="text-white text-[10px] font-black">{trip.name}</p>
                               <div className="flex items-center gap-2 text-slate-500 text-[8px] font-bold">
                                  <Clock className="w-3 h-3" /> {trip.startDate} <ArrowRight className="w-2 h-2" /> {trip.endDate}
                               </div>
                               <div className="flex items-center gap-2 text-slate-500 text-[8px] font-bold">
                                  <MapPin className="w-3 h-3" /> {trip.stops.length} Nodes
                               </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
