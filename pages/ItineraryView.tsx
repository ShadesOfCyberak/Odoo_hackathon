
import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactFlow, { Background, Controls, MarkerType, Node, Edge, ReactFlowProvider, BackgroundVariant } from 'reactflow';
import { Calendar, MapPin, DollarSign, Clock, ChevronLeft, Layout, List, PieChart as PieIcon, Wallet, Sparkles, Map as MapIcon, ArrowRight } from 'lucide-react';
import { Trip, ActivityType } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { CityNode } from '../components/FlowNodes';

const nodeTypes = { cityNode: CityNode };

interface ItineraryViewProps {
  trips: Trip[];
}

const ItineraryViewContent: React.FC<ItineraryViewProps> = ({ trips }) => {
  const { id } = useParams();
  const trip = trips.find(t => t.id === id);
  const [viewMode, setViewMode] = useState<'timeline' | 'map' | 'budget'>('timeline');

  if (!trip) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Trip not found</h2>
        <Link to="/my-trips" className="text-blue-600 mt-4 block hover:underline">Back to My Trips</Link>
      </div>
    );
  }

  // React Flow logic
  const { nodes, edges } = useMemo(() => {
    const nds: Node[] = trip.stops.map((stop, i) => ({
      id: stop.id,
      type: 'cityNode',
      position: stop.position || { x: i * 400, y: 100 },
      data: { ...stop, isViewOnly: true },
      draggable: false
    }));

    const eds: Edge[] = [];
    for (let i = 0; i < trip.stops.length - 1; i++) {
      eds.push({
        id: `e${trip.stops[i].id}-${trip.stops[i+1].id}`,
        source: trip.stops[i].id,
        target: trip.stops[i+1].id,
        animated: true,
        markerEnd: { type: MarkerType.ArrowClosed, color: '#3b82f6' }
      });
    }

    return { nodes: nds, edges: eds };
  }, [trip]);

  const activityTypeSummary = trip.stops.flatMap(s => s.activities).reduce((acc: any, act) => {
    acc[act.type] = (acc[act.type] || 0) + act.cost;
    return acc;
  }, {});

  const budgetChartData = Object.entries(activityTypeSummary).map(([name, value]) => ({ name, value }));
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#6366f1'];

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto h-[calc(100vh-140px)] flex flex-col overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4 shrink-0">
        <div className="space-y-2">
          <Link to="/my-trips" className="flex items-center gap-2 text-xs font-black text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-[0.2em]">
            <ChevronLeft className="w-3.5 h-3.5" /> Back to My Trips
          </Link>
          <h1 className="text-5xl font-black text-slate-900 dark:text-white leading-none tracking-tight">{trip.name}</h1>
          <div className="flex flex-wrap items-center gap-6 text-slate-500 font-medium">
            <span className="flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-xl text-xs text-slate-300"><Calendar className="w-3.5 h-3.5 text-blue-500" /> Expedition: {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</span>
            <span className="flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-xl text-xs text-slate-300"><MapPin className="w-3.5 h-3.5 text-indigo-500" /> {trip.stops.length} Locations</span>
            <span className="flex items-center gap-2 bg-green-900/20 text-green-400 border border-green-500/20 px-3 py-1.5 rounded-xl text-xs font-bold tracking-tight"><DollarSign className="w-3.5 h-3.5" /> ${trip.totalBudget.toLocaleString()}</span>
          </div>
        </div>
        <div className="flex glass p-2 rounded-2xl h-fit border border-white/5">
          <button onClick={() => setViewMode('timeline')} className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${viewMode === 'timeline' ? 'bg-white text-slate-950 shadow-xl' : 'text-slate-500 hover:bg-white/5'}`}>
            <Layout className="w-3.5 h-3.5" /> List View
          </button>
          <button onClick={() => setViewMode('map')} className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${viewMode === 'map' ? 'bg-white text-slate-950 shadow-xl' : 'text-slate-500 hover:bg-white/5'}`}>
            <MapIcon className="w-3.5 h-3.5" /> Studio Map
          </button>
          <button onClick={() => setViewMode('budget')} className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${viewMode === 'budget' ? 'bg-white text-slate-950 shadow-xl' : 'text-slate-500 hover:bg-white/5'}`}>
            <PieIcon className="w-3.5 h-3.5" /> Insights
          </button>
        </div>
      </div>

      <div className="flex-grow px-4 overflow-y-auto min-h-0 custom-scrollbar">
        {viewMode === 'map' ? (
          <div className="bg-slate-950 rounded-[40px] border border-white/5 shadow-2xl h-full overflow-hidden relative min-h-[500px] studio-canvas">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              fitView
              zoomOnDoubleClick={false}
              zoomOnPinch={true}
              zoomOnScroll={true}
              panOnScroll={false}
              panOnDrag={true}
            >
              <Background variant={BackgroundVariant.Dots} color="#1e293b" gap={32} size={1} />
              <Controls className="!bg-[#0f172a] !border-slate-800" />
            </ReactFlow>
          </div>
        ) : viewMode === 'timeline' ? (
          <div className="space-y-12 animate-in fade-in duration-700 pb-20">
             {trip.stops.map((stop, stopIdx) => (
              <div key={stop.id} className="bg-slate-900 rounded-[48px] shadow-2xl border border-white/5 overflow-hidden max-w-4xl mx-auto">
                <div className="relative h-64 overflow-hidden">
                  <img src={`https://picsum.photos/seed/${stop.id}/1200/500`} alt={stop.city} className="w-full h-full object-cover opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-12 flex flex-col justify-end">
                    <div className="flex items-center gap-4 mb-3">
                      <p className="text-white/40 text-[10px] font-black tracking-[0.4em] uppercase">Destination {stopIdx + 1}</p>
                      <div className="flex items-center gap-2 bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20 text-[9px] font-black uppercase tracking-widest">
                        <Calendar className="w-3 h-3" /> {stop.startDate || '?'} <ArrowRight className="w-2 h-2" /> {stop.endDate || '?'}
                      </div>
                    </div>
                    <h2 className="text-5xl font-black text-white uppercase tracking-tighter leading-none">{stop.city}, {stop.country}</h2>
                  </div>
                </div>
                <div className="p-12 space-y-6">
                  {stop.activities.length > 0 ? stop.activities.map((act) => (
                    <div key={act.id} className="flex items-center justify-between p-6 bg-white/5 rounded-3xl hover:bg-white/[0.08] transition-all border border-transparent hover:border-white/10">
                      <div className="flex items-center gap-6">
                        <div className="bg-slate-800 p-3 rounded-2xl shadow-sm border border-white/5"><Clock className="w-6 h-6 text-blue-500" /></div>
                        <div>
                          <p className="font-black text-slate-100 text-lg tracking-tight">{act.name}</p>
                          <p className="text-sm text-slate-500 font-medium">{act.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-black text-white text-xl">${act.cost}</span>
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">{act.type}</p>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-12 text-slate-600 font-black italic border-2 border-dashed border-white/5 rounded-3xl uppercase tracking-widest text-xs">No specific activities listed</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-in slide-in-from-bottom-8 duration-700 pb-20">
            <div className="bg-slate-900 p-10 rounded-[48px] shadow-2xl border border-white/5 h-fit">
              <h3 className="text-2xl font-black text-white mb-10 flex items-center gap-4">
                <div className="bg-blue-600 p-2 rounded-xl"><PieIcon className="w-5 h-5 text-white" /></div> 
                Spending Mix
              </h3>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={budgetChartData} cx="50%" cy="50%" innerRadius={100} outerRadius={150} paddingAngle={8} dataKey="value" stroke="none">
                      {budgetChartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <RechartsTooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', color: '#fff' }} />
                    <Legend iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-slate-900 text-white p-12 rounded-[48px] shadow-2xl h-fit relative overflow-hidden border border-white/5">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[120px] rounded-full"></div>
              <h3 className="text-sm font-black text-white/40 mb-2 uppercase tracking-[0.3em]">Estimated Total</h3>
              <p className="text-7xl font-black text-white tracking-tighter leading-none mb-12">${trip.totalBudget.toLocaleString()}</p>
              
              <div className="space-y-6">
                <div className="p-8 bg-white/5 rounded-[32px] border border-white/10 backdrop-blur-md">
                  <h4 className="font-black mb-4 flex items-center gap-3 text-blue-400 tracking-widest uppercase text-xs">
                    <Sparkles className="w-4 h-4" /> Studio Analytics
                  </h4>
                  <p className="text-base font-medium leading-relaxed text-slate-300 italic">
                    "This itinerary exhibits a high-value distribution across {trip.stops.length} distinct project nodes. Your strategy optimizes for premium experiences in each regional sector."
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ItineraryView: React.FC<ItineraryViewProps> = (props) => (
  <ReactFlowProvider>
    <ItineraryViewContent {...props} />
  </ReactFlowProvider>
);

export default ItineraryView;
