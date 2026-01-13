# 🌍 GlobeTrotter Studio

## Visual Travel Architecture Platform

GlobeTrotter Studio is a graph-based travel planning platform that enables users to visually design, analyze, and organize multi-city journeys inside a professional workspace.

Unlike traditional itinerary tools that rely on lists and step-by-step forms, GlobeTrotter Studio models travel as a node-based geospatial graph, allowing users to reason about routes, destinations, and budgets visually.

Built to explore graph-based UX, AI-assisted planning, and modern frontend architecture.

---

## 🔗 Live Application

**Public URL:** [https://globetrotter-umber.vercel.app/](https://globetrotter-umber.vercel.app/)

---

## 🚀 Key Innovation — The Geospatial Architect

At the core of the platform is the **Draft Builder**, powered by **React Flow**.

Each destination is represented as a **Mission Node** on a dynamic canvas, enabling structured and scalable journey design.

---

## 🧩 Core Capabilities

### 🧭 Visual Pathfinding

* Cities are connected visually to represent travel flow
* Helps identify inefficient routing
* Designed for complex multi-city and multi-country journeys

### 🧠 AI Intel Engine

Using **Google Gemini 2.0 Flash Lite**, each Mission Node can fetch:

* Localized activity suggestions
* Cultural highlights
* Approximate cost estimates

### 💰 Fiscal Intelligence

* Destination-level costs are aggregated automatically
* Budgets are normalized to **INR (₹)**
* Produces a single **Fiscal Index** for the entire journey

---

## ✨ Features

* 🔍 **Discovery Studio** – Search destinations and initialize journeys with AI-curated data
* 🗺️ **Draft Builder** – Node-based visual planning canvas
* 🧠 **AI-assisted insights** per destination
* 💰 **Real-time budget aggregation**
* ☁️ **Cloud persistence** using Supabase
* 📡 **Sharing & PDF export** with custom print CSS
* 📊 **Budget analytics** using charts

---

## 🛠️ Tech Stack

| Layer     | Technology                       |
| --------- | -------------------------------- |
| Frontend  | React 19, Vite 6                 |
| Canvas UI | React Flow                       |
| Styling   | Tailwind CSS (Studio Dark Theme) |
| AI        | Google Gemini 2.0 SDK            |
| Backend   | Supabase (PostgreSQL + Auth)     |
| Charts    | Recharts                         |
| Icons     | Lucide React                     |

---

## 📁 Project Structure

```text
Odoo_hackathon-main/
├── App.tsx            # Root application component
├── index.html         # HTML entry point
├── index.tsx          # React application bootstrap
├── components/        # Reusable UI components
├── pages/             # Route-level pages and views
├── services/          # API integrations (AI, Supabase, utilities)
├── lib/               # Shared libraries and helper modules
├── package.json       # Project metadata and dependencies
├── tsconfig.json      # TypeScript configuration
├── vite.config.ts     # Vite build configuration
├── README.md          # Project documentation
```

---

## 📦 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/Odoo_hackathon.git
cd Odoo_hackathon
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Environment Variables

Create a `.env.local` file in the root directory:

```env
VITE_GEMINI_API_KEY=your_gemini_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4️⃣ Supabase Database Setup

Run the following SQL in the **Supabase SQL Editor**:

```sql
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
```

### 5️⃣ Run Locally

```bash
npm run dev
```

---

## 🎨 Design Philosophy

GlobeTrotter Studio follows a **Command Center UI** approach, optimized for focus and clarity.

**Design Principles:**

* Glassmorphism for spatial depth
* High-contrast typography (Inter & Plus Jakarta Sans)
* Minimal UI clutter
* Workspace-first experience over booking-style flows

---

## 👥 Contributors

* @sharan12007
* @Raihaan29
* @ShadesOfCyberak
* @praanesh06

---

## 📜 License

This project is licensed under the **MIT License**.

See the LICENSE file for more information.

---

## 🏆 Hackathon Context

Developed as part of the **2026 AI Studio Hackathon**, focusing on:

* Graph-based user interfaces
* AI-assisted planning systems
* Visual alternatives to traditional travel planners

---

## ⭐ Support

If you find this project useful:

* ⭐ Star the repository
* 🐛 Open issues or discussions
* 🤝 Contribute improvements
