🌐 GlobeTrotter Studio v2.5
Engineering the Perfect Journey with Geospatial Intelligence
![alt text](https://img.shields.io/badge/React-19-blue.svg)

![alt text](https://img.shields.io/badge/Vite-6-646CFF.svg)

![alt text](https://img.shields.io/badge/AI-Gemini_2.0_Flash-orange.svg)

![alt text](https://img.shields.io/badge/Backend-Supabase-green.svg)
GlobeTrotter Studio is a premium, end-to-end travel architecture platform. Unlike traditional linear planners, GlobeTrotter utilizes a node-based graph system to allow travelers to dream, design, and organize multi-city expeditions within a professional visual workspace.
🚀 Key Innovation: The Geospatial Architect
The core of the platform is the Draft Builder, powered by React Flow. We treat every destination as a "Mission Node" on a dynamic canvas. This allows for:
Visual Pathfinding: Automatically link cities to visualize the logical flow of your journey.
AI Intel Engine: Powered by Gemini 2.0 Flash Lite, each node can instantly fetch localized activity suggestions, cultural highlights, and cost estimates.
Fiscal Intelligence: Real-time budget aggregation localized in INR (₹), providing a total "Fiscal Index" for the entire blueprint.
✨ Premium Features
Discovery Studio: Search the global archive for destinations. One-click "Launch Expedition" instantly initializes your workspace with AI-curated data.
Mission Manifests: High-contrast timeline views and detailed activity lists that feel like a professional briefing.
Cloud Persistence: Full integration with Supabase Auth & Database. Your blueprints are synced in real-time and accessible from any device.
Transmission Hub: Share your plans via WhatsApp or export high-resolution PDF Mission Briefs using custom print-engine CSS.
Expedition Analytics: Visual data distribution of your travel investments using Recharts.
🛠️ Technical Stack
Runtime: React 19 + Vite 6 (ultra-fast HMR)
Canvas: React Flow (node-based UI)
Intelligence: Google Gemini 2.0 SDK
Backend: Supabase (PostgreSQL + GoTrue Auth)
Styling: Tailwind CSS (Custom Studio Dark Theme)
Icons: Lucide React
📦 Installation & Setup
Clone the repository:
code
Bash
git clone https://github.com/your-username/globetrotter-studio.git
cd globetrotter-studio
Install Dependencies:
code
Bash
npm install
Configure Environment Variables:
Create a .env.local file in the root directory:
code
Env
VITE_GEMINI_API_KEY=your_gemini_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
Initialize Database:
Run the following SQL in your Supabase SQL Editor:
code
SQL
create table trips (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users not null,
  name text not null,
  stops jsonb default '[]'::jsonb,
  total_budget numeric,
  start_date date,
  end_date date,
  is_public boolean default false
);
Launch Studio:
code
Bash
npm run dev
🎨 Design Philosophy
GlobeTrotter Studio adheres to a "Command Center" aesthetic. We use:
Glassmorphism: Semi-transparent layers for depth.
High-Contrast Typography: Inter and Plus Jakarta Sans for a technical feel.
Contextual Imagery: Smart image fetching that matches landmarks to specific cities using professional photography databases.
⚖️ License
Distributed under the MIT License. See LICENSE for more information.
Developed for the 2026 AI Studio Hackathon.
Engineering the perfect journey.
