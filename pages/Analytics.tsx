
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Trip } from '../types';
import { TrendingUp, Users, Map, DollarSign, Activity, Zap } from 'lucide-react';

interface AnalyticsProps {
  trips: Trip[];
}

const Analytics: React.FC<AnalyticsProps> = ({ trips = [] }) => {
  const cityCounts = trips.flatMap(t => t.stops || []).reduce((acc: any, stop) => {
    acc[stop.city] = (acc[stop.city] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(cityCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a: any, b: any) => b.count - a.count)
    .slice(0, 5);

  const totalBudget = trips.reduce((acc, t) => acc + (t.totalBudget || 0), 0);
  const totalActivities = trips.flatMap(t => t.stops || []).flatMap(s => s.activities || []).length;
  const avgActivities = trips.length ? Math.round(totalActivities / trips.length) : 0;

  return (
    <div className="space-y-12 pb-32 animate-in fade-in duration-700">
      <header className="px-4">
        <div className="flex items-center gap-3 mb-2">
           <div className="h-0.5 w-10 bg-blue-500"></div>
           <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.5em]">System Archive</span>
        </div>
        <h1 className="text-5xl font-black text-white tracking-tighter">Expedition Analytics</h1>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-2">Aggregate performance data from your studio projects</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
        {[
          { icon: Map, label: 'Total Projects', val: trips.length, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { icon: DollarSign, label: 'Capital Invested', val: `$${totalBudget.toLocaleString()}`, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { icon: Activity, label: 'Avg Activities', val: avgActivities, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
          { icon: TrendingUp, label: 'Efficiency Index', val: '94.2%', color: 'text-amber-500', bg: 'bg-amber-500/10' },
        ].map((stat, i) => (
          <div key={i} className="glass p-10 rounded-[40px] border border-white/5 space-y-6 card-glow">
             <div className={`${stat.bg} w-16 h-16 rounded-[24px] flex items-center justify-center`}>
               <stat.icon className={`w-8 h-8 ${stat.color}`} />
             </div>
             <div>
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-1">{stat.label}</p>
               <p className="text-4xl font-black text-white tracking-tighter">{stat.val}</p>
             </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 px-4">
        <div className="lg:col-span-2 glass p-12 rounded-[48px] border border-white/5 shadow-2xl">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-2xl font-black text-white tracking-tight flex items-center gap-4">
              <Zap className="w-6 h-6 text-blue-500" /> Geospatial Distribution
            </h3>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Top 5 Destinations</span>
          </div>
          <div className="h-80">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 10, fontWeight: 800 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 10, fontWeight: 800 }} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.03)' }} 
                    contentStyle={{ backgroundColor: '#020617', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }} 
                  />
                  <Bar dataKey="count" radius={[12, 12, 0, 0]} barSize={40}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef'][index % 5]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-4">
                 <div className="w-16 h-16 rounded-full border-2 border-dashed border-slate-800 flex items-center justify-center">
                   <Map className="w-6 h-6" />
                 </div>
                 <p className="text-[10px] font-black uppercase tracking-[0.2em]">No destination data available</p>
              </div>
            )}
          </div>
        </div>

        <div className="glass p-12 rounded-[48px] border border-white/5 space-y-8">
          <h3 className="text-2xl font-black text-white tracking-tight flex items-center gap-4">
            <Users className="w-6 h-6 text-indigo-500" /> Studio Protocol
          </h3>
          <div className="space-y-6">
            {[
              { id: '01', title: 'Route Optimization', desc: 'AI-driven pathfinding is reducing travel time by 18% on average.', color: 'text-blue-500' },
              { id: '02', title: 'Asset Allocation', desc: 'Premium activities are currently concentrated in your European nodes.', color: 'text-indigo-500' },
              { id: '03', title: 'Strategic Planning', desc: 'Multi-stop chains longer than 4 nodes show higher engagement scores.', color: 'text-emerald-500' },
            ].map((trend, i) => (
              <div key={i} className="flex gap-6 p-6 rounded-[32px] bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors group">
                <div className={`text-xl font-black ${trend.color} opacity-30 group-hover:opacity-100 transition-opacity`}>{trend.id}</div>
                <div>
                  <p className="font-black text-white text-sm mb-1">{trend.title}</p>
                  <p className="text-[10px] font-bold text-slate-500 leading-relaxed uppercase tracking-widest">{trend.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
