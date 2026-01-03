
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Users, 
  Filter, 
  LayoutGrid, 
  ChevronDown, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  Copy, 
  Eye, 
  Info,
  Sparkles,
  Map as MapIcon,
  CheckCircle2
} from 'lucide-react';
import { Trip, User } from '../types';

interface CommunityProps {
  trips: Trip[];
  user: User;
  onClone: (trip: Trip) => void;
}

const Community: React.FC<CommunityProps> = ({ trips, user, onClone }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [cloningId, setCloningId] = useState<string | null>(null);

  const mockCommunityTrips: Trip[] = [
    {
      id: 'mock-1',
      userId: 'system-intel',
      name: 'Neo-Tokyo Circuit',
      description: 'A futuristic dive into the neon-lit districts and tech hubs of Japan.',
      startDate: '2024-10-12',
      endDate: '2024-10-22',
      totalBudget: 4200,
      status: 'completed',
      isPublic: true,
      stops: [
        // Added missing 'description' property to TripStop
        { id: 'ms1', city: 'Tokyo', country: 'Japan', description: 'Metropolitan hub and tech center.', activities: [], budget: 1500, startDate: '2024-10-12', endDate: '2024-10-15' },
        // Added missing 'description' property to TripStop
        { id: 'ms2', city: 'Osaka', country: 'Japan', description: 'The culinary capital of the country.', activities: [], budget: 1200, startDate: '2024-10-16', endDate: '2024-10-20' }
      ]
    },
    {
      id: 'mock-2',
      userId: 'system-intel',
      name: 'European Art Corridor',
      description: 'Connecting the most influential galleries and architecture of the EU.',
      startDate: '2025-05-15',
      endDate: '2025-06-05',
      totalBudget: 8500,
      status: 'planning',
      isPublic: true,
      stops: [
        // Added missing 'description' property to TripStop
        { id: 'ms3', city: 'Paris', country: 'France', description: 'Artistic immersion in the city center.', activities: [], budget: 2500, startDate: '2025-05-15', endDate: '2025-05-20' },
        // Added missing 'description' property to TripStop
        { id: 'ms4', city: 'Berlin', country: 'Germany', description: 'Modern and historical architecture tour.', activities: [], budget: 1800, startDate: '2025-05-21', endDate: '2025-05-25' }
      ]
    }
  ];

  const displayedTrips = useMemo(() => {
    // Show user-published trips + system mock trips
    const publicUserTrips = trips.filter(t => t.isPublic);
    const combined = [...publicUserTrips, ...mockCommunityTrips];
    
    if (!searchQuery) return combined;
    return combined.filter(t => 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.stops.some(s => s.city.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [trips, searchQuery]);

  const handleClone = (trip: Trip) => {
    setCloningId(trip.id);
    
    // Create a unique copy for the user's workspace
    const clonedTrip: Trip = {
      ...JSON.parse(JSON.stringify(trip)), // Deep copy
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      isPublic: false,
      status: 'planning',
      name: `${trip.name} (Imported)`,
      stops: trip.stops.map(stop => ({
        ...stop,
        id: Math.random().toString(36).substr(2, 9)
      }))
    };

    setTimeout(() => {
      onClone(clonedTrip);
      setCloningId(null);
      navigate('/my-trips');
    }, 800);
  };

  const handleInspect = (trip: Trip) => {
    // If it's a mock or public trip from local state, we can use shared view
    navigate(`/shared/${trip.id}`);
  };

  return (
    <div className="space-y-12 pb-32 animate-in fade-in duration-700">
      
      <header className="px-4 space-y-10">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
             <div className="h-0.5 w-8 bg-blue-600"></div>
             <span className="text-blue-500 text-[11px] font-black uppercase tracking-[0.5em]">Network Hub</span>
          </div>
          <h1 className="text-8xl font-black text-white tracking-tighter leading-none">Community Tab</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 items-stretch">
          <div className="relative flex-grow group">
            <div className={`flex items-center bg-[#0f172a]/40 backdrop-blur-3xl border border-white/5 rounded-[32px] px-8 py-5 transition-all focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 shadow-2xl`}>
              <Search className="w-5 h-5 mr-6 text-slate-600" />
              <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Find a geospatial architect's blueprint..." 
                className="bg-transparent border-none focus:ring-0 text-lg font-bold text-white placeholder:text-slate-800 w-full"
              />
            </div>
          </div>

          <div className="flex items-stretch gap-3">
             <button onClick={() => navigate('/create')} className="flex items-center gap-3 px-8 py-5 bg-blue-600 hover:bg-blue-500 border border-transparent rounded-[20px] text-[10px] font-black uppercase tracking-widest text-white transition-all shadow-xl">
               <Sparkles className="w-4 h-4" /> Publish Mine
             </button>
             <button className="flex items-center gap-3 px-8 py-5 bg-[#0f172a]/60 border border-white/5 rounded-[20px] text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all">
               <Filter className="w-4 h-4" /> Filters
             </button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 px-4">
        <div className="xl:col-span-8 space-y-6">
          {displayedTrips.length > 0 ? displayedTrips.map((trip, idx) => (
            <div 
              key={trip.id} 
              className="group glass hover:bg-white/[0.03] rounded-[48px] border border-white/5 hover:border-blue-500/30 transition-all duration-500 overflow-hidden flex flex-col md:flex-row card-glow animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="p-8 flex items-start justify-center md:border-r border-white/5 bg-slate-900/20">
                <div className="w-16 h-16 rounded-full border-2 border-white/10 p-1 group-hover:border-blue-500/50 transition-colors bg-slate-950">
                  <img 
                    src={`https://ui-avatars.com/api/?name=${trip.name}&background=020617&color=3b82f6`} 
                    alt="Author" 
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>

              <div className="p-10 flex-grow space-y-8">
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <h2 className="text-4xl font-black text-white tracking-tighter group-hover:text-blue-400 transition-colors uppercase leading-none">
                      {trip.name}
                    </h2>
                    <div className={`px-3 py-1 rounded-full border text-[8px] font-black uppercase tracking-[0.2em] ${trip.userId === 'system-intel' ? 'bg-blue-600/10 text-blue-400 border-blue-500/20' : 'bg-emerald-600/10 text-emerald-400 border-emerald-500/20'}`}>
                      {trip.userId === 'system-intel' ? 'System Intel' : 'User Shared'}
                    </div>
                  </div>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-2xl line-clamp-2 italic">
                    {trip.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-10">
                  <div className="space-y-1">
                    <p className="text-[8px] font-black text-slate-700 uppercase tracking-widest">Nodes</p>
                    <div className="flex items-center gap-2">
                      <MapIcon className="w-4 h-4 text-blue-500" />
                      <span className="text-lg font-black text-white">{trip.stops.length} Locations</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[8px] font-black text-slate-700 uppercase tracking-widest">Financial Arch</p>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-black text-emerald-400">${trip.totalBudget.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/60 backdrop-blur-md md:w-28 flex md:flex-col items-center justify-center gap-6 p-8 border-t md:border-t-0 md:border-l border-white/5 opacity-0 group-hover:opacity-100 transition-all">
                <button 
                  onClick={() => handleInspect(trip)}
                  className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 text-slate-400 hover:text-white transition-all group/btn"
                  title="Inspect Architecture"
                >
                  <Eye className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => handleClone(trip)}
                  disabled={cloningId === trip.id}
                  className={`p-4 rounded-2xl shadow-2xl transition-all scale-110 active:scale-95 ${cloningId === trip.id ? 'bg-emerald-500 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}
                  title="Clone to Workspace"
                >
                  {cloningId === trip.id ? <CheckCircle2 className="w-6 h-6 animate-pulse" /> : <Copy className="w-6 h-6" />}
                </button>
              </div>
            </div>
          )) : (
            <div className="glass p-20 rounded-[48px] text-center border border-dashed border-slate-800">
              <Users className="w-16 h-16 text-slate-700 mx-auto mb-6 opacity-20" />
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600">No blueprints found in current sector</p>
            </div>
          )}
        </div>

        <aside className="xl:col-span-4 space-y-8">
          <div className="bg-slate-900/40 backdrop-blur-3xl rounded-[48px] border border-white/5 p-12 space-y-10 sticky top-32">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-600/10 rounded-2xl border border-blue-500/20">
                  <Info className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-black text-white tracking-tight uppercase">Community Protocol</h3>
              </div>
              <p className="text-slate-400 text-sm font-medium leading-relaxed italic">
                The Community Tab is a shared archive of travel architectures. You can inspect any project to see its logistical flow, or clone it directly to your own studio workspace for modification.
              </p>
            </div>

            <div className="space-y-6">
              <div className="p-8 bg-blue-600/5 rounded-[32px] border border-blue-500/10 space-y-4">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Sync Alert</span>
                </div>
                <p className="text-xs font-bold text-slate-500 leading-relaxed uppercase tracking-widest">
                  Cloning a project creates a private, editable instance in your 'Expeditions' archive. Original authors retain credit for the architecture.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Community;
