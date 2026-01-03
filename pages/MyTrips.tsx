
import React from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Eye, Calendar, MapPin, Share2 } from 'lucide-react';
import { Trip } from '../types';

interface MyTripsProps {
  trips: Trip[];
  onDelete: (id: string) => void;
}

const MyTrips: React.FC<MyTripsProps> = ({ trips, onDelete }) => {
  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Expeditions</h1>
          <p className="text-gray-500">Manage and revisit your travel plans</p>
        </div>
      </header>

      {trips.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-sm">
          <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <Calendar className="w-12 h-12 text-gray-300" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No journeys found</h2>
          <p className="text-gray-500 max-w-sm mx-auto mb-8">You haven't planned any trips yet. Start dreaming of your next destination!</p>
          <Link to="/create" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-200">
            Plan a New Trip
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map(trip => (
            <div key={trip.id} className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img src={trip.coverImage || `https://picsum.photos/seed/${trip.id}/800/600`} alt={trip.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-900 uppercase tracking-widest">
                  {trip.status}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white text-xl font-bold truncate">{trip.name}</h3>
                  <div className="flex items-center gap-4 text-white/80 text-sm mt-1">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {trip.stops.length} cities</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {new Date(trip.startDate).getFullYear()}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 flex-grow">
                <p className="text-gray-500 text-sm line-clamp-2 min-h-[2.5rem] mb-4">{trip.description || 'Exploring the world one city at a time.'}</p>
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-50">
                   <div className="flex -space-x-2">
                    {trip.stops.slice(0, 3).map((stop, i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-600" title={stop.city}>
                        {stop.city[0]}
                      </div>
                    ))}
                    {trip.stops.length > 3 && <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">+{trip.stops.length - 3}</div>}
                   </div>
                   <div className="text-right">
                    <p className="text-[10px] uppercase font-bold text-gray-400">Budget</p>
                    <p className="text-sm font-bold text-green-600">${trip.totalBudget.toLocaleString()}</p>
                   </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-0 grid grid-cols-2 gap-3 mt-auto">
                <Link to={`/view/${trip.id}`} className="flex items-center justify-center gap-2 bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-600 px-4 py-2.5 rounded-xl text-sm font-bold transition-all">
                  <Eye className="w-4 h-4" /> View
                </Link>
                <Link to={`/edit/${trip.id}`} className="flex items-center justify-center gap-2 bg-gray-50 hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 px-4 py-2.5 rounded-xl text-sm font-bold transition-all">
                  <Edit className="w-4 h-4" /> Edit
                </Link>
                <button onClick={() => { if(confirm('Delete this trip?')) onDelete(trip.id) }} className="flex items-center justify-center gap-2 bg-gray-50 hover:bg-red-50 text-gray-700 hover:text-red-500 px-4 py-2.5 rounded-xl text-sm font-bold transition-all">
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
                <button onClick={() => {
                  const url = `${window.location.origin}/#/shared/${trip.id}`;
                  navigator.clipboard.writeText(url);
                  alert('Shareable link copied!');
                }} className="flex items-center justify-center gap-2 bg-gray-50 hover:bg-green-50 text-gray-700 hover:text-green-600 px-4 py-2.5 rounded-xl text-sm font-bold transition-all">
                  <Share2 className="w-4 h-4" /> Share
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTrips;
