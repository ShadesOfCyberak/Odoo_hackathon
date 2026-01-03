
import React, { useState, useEffect } from 'react';
import { MemoryRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import MyTrips from './pages/MyTrips';
import TripBuilder from './pages/TripBuilder';
import ItineraryView from './pages/ItineraryView';
import Auth from './pages/Auth';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import SharedView from './pages/SharedView';
import Explore from './pages/Explore';
import Community from './pages/Community';
import CalendarView from './pages/CalendarView';
import { Trip, User } from './types';

const safeStorage = {
  getItem: (key: string) => {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.warn('localStorage.getItem access denied', e);
      return null;
    }
  },
  setItem: (key: string, value: string) => {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.warn('localStorage.setItem access denied', e);
    }
  },
  removeItem: (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn('localStorage.removeItem access denied', e);
    }
  }
};

const App: React.FC = () => {
  const initialPath = (typeof window !== 'undefined' && window.location.hash) 
    ? window.location.hash.slice(1) 
    : '/';

  const [user, setUser] = useState<User | null>(() => {
    const saved = safeStorage.getItem('gt_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return {
      id: 'dev-123',
      name: 'Studio Developer',
      email: 'dev@globetrotter.studio',
      preferences: { language: 'en', currency: 'USD' }
    };
  });

  const [trips, setTrips] = useState<Trip[]>(() => {
    const saved = safeStorage.getItem('gt_trips');
    if (!saved) return [];
    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  });

  useEffect(() => {
    safeStorage.setItem('gt_trips', JSON.stringify(trips));
  }, [trips]);

  useEffect(() => {
    if (user) {
      safeStorage.setItem('gt_user', JSON.stringify(user));
    } else {
      safeStorage.removeItem('gt_user');
    }
  }, [user]);

  const addTrip = (trip: Trip) => setTrips([...trips, trip]);
  const updateTrip = (updatedTrip: Trip) => {
    setTrips(trips.map(t => t.id === updatedTrip.id ? updatedTrip : t));
  };
  const deleteTrip = (id: string) => setTrips(trips.filter(t => t.id !== id));

  const handleLogin = (u: User) => setUser(u);
  const handleLogout = () => setUser(null);

  return (
    <Router initialEntries={[initialPath]}>
      <div className="min-h-screen bg-[#020617] flex flex-col text-slate-200">
        {user && <Navbar user={user} onLogout={handleLogout} />}
        <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
          <Routes>
            <Route path="/" element={user ? <Dashboard trips={trips} user={user} /> : <Auth onLogin={handleLogin} />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/community" element={<Community trips={trips} user={user} onClone={addTrip} />} />
            <Route path="/calendar" element={<CalendarView trips={trips} />} />
            <Route path="/my-trips" element={<MyTrips trips={trips} onDelete={deleteTrip} />} />
            <Route path="/create" element={user ? <TripBuilder user={user} onSave={addTrip} /> : <Navigate to="/" />} />
            <Route path="/edit/:id" element={user ? <TripBuilder user={user} trips={trips} onSave={updateTrip} /> : <Navigate to="/" />} />
            <Route path="/view/:id" element={<ItineraryView trips={trips} />} />
            <Route path="/shared/:id" element={<SharedView trips={trips} />} />
            <Route path="/analytics" element={<Analytics trips={trips} />} />
            <Route path="/profile" element={user ? <Profile user={user} setUser={setUser} /> : <Navigate to="/" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <footer className="bg-slate-950/50 border-t border-slate-800/50 py-8 text-center text-slate-500 text-xs font-medium uppercase tracking-[0.2em]">
          © {new Date().getFullYear()} GlobeTrotter Studio. Engineering the perfect journey.
        </footer>
      </div>
    </Router>
  );
};

export default App;
