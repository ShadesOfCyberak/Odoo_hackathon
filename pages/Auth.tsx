
import React, { useState } from 'react';
import { Compass, Mail, Lock, User as UserIcon, ArrowRight } from 'lucide-react';
import { User } from '../types';

interface AuthProps {
  onLogin: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth
    onLogin({
      id: '1',
      name: name || 'Explorer',
      email,
      preferences: { language: 'en', currency: 'USD' }
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex bg-blue-600 p-4 rounded-3xl mb-4 shadow-xl shadow-blue-200 animate-bounce">
            <Compass className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">GlobeTrotter</h1>
          <p className="text-gray-500 font-medium">Your world, intelligently planned.</p>
        </div>

        <div className="bg-slate-50 p-1.5 rounded-2xl flex mb-8">
          <button onClick={() => setIsLogin(true)} className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${isLogin ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>Login</button>
          <button onClick={() => setIsLogin(false)} className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${!isLogin ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>Sign Up</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Full Name</label>
              <div className="relative">
                <input required type="text" value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" className="w-full pl-11 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                <UserIcon className="absolute left-4 top-4.5 w-5 h-5 text-gray-400" />
              </div>
            </div>
          )}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Email Address</label>
            <div className="relative">
              <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="hello@example.com" className="w-full pl-11 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
              <Mail className="absolute left-4 top-4.5 w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Password</label>
            <div className="relative">
              <input required type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full pl-11 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
              <Lock className="absolute left-4 top-4.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-100 transition-all flex items-center justify-center gap-2 group">
            {isLogin ? 'Welcome Back' : 'Create Account'} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="text-center pt-8">
           <p className="text-sm text-gray-400 font-medium italic">"The world is a book and those who do not travel read only one page."</p>
           <p className="text-xs text-gray-300 mt-2 font-bold uppercase tracking-widest">— Saint Augustine</p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
