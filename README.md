
# 🌍 GlobeTrotter Studio

**GlobeTrotter Studio** is a **premium, end-to-end travel architecture platform**.
Unlike traditional linear trip planners, GlobeTrotter Studio uses a **node-based graph system** that allows travelers to **dream, design, and organize multi-city expeditions** inside a professional visual workspace.

---

## 🚀 Key Innovation: The Geospatial Architect

At the heart of the platform is the **Draft Builder**, powered by **React Flow**.

Every destination is treated as a **Mission Node** on a dynamic canvas, enabling:

### 🧭 Visual Pathfinding

Automatically link cities to visualize the logical flow of your journey.

### 🧠 AI Intel Engine

Powered by **Gemini 2.0 Flash Lite**, each node can instantly fetch:

* Localized activity suggestions
* Cultural highlights
* Cost estimates

### 💰 Fiscal Intelligence

Real-time **budget aggregation localized in INR (₹)**, producing a total **Fiscal Index** for the entire expedition blueprint.

---

## ✨ Premium Features

### 🔍 Discovery Studio

Search the global destination archive.
**One-click “Launch Expedition”** initializes your workspace with AI-curated data.

### 🗺️ Mission Manifests

High-contrast timeline views and detailed activity lists that feel like professional mission briefings.

### ☁️ Cloud Persistence

Seamless integration with **Supabase Auth & Database**.
Your blueprints sync in real time and remain accessible from any device.

### 📡 Transmission Hub

* Share plans directly via **WhatsApp**
* Export **high-resolution PDF Mission Briefs** using a custom print-engine CSS

### 📊 Expedition Analytics

Visual breakdown of travel investments using **Recharts**.

---

## 🛠️ Technical Stack

| Layer               | Technology                              |
| ------------------- | --------------------------------------- |
| **Runtime**         | React 19 + Vite 6 (Ultra-fast HMR)      |
| **Canvas UI**       | React Flow (Node-based architecture)    |
| **AI Intelligence** | Google Gemini 2.0 SDK                   |
| **Backend**         | Supabase (PostgreSQL + GoTrue Auth)     |
| **Styling**         | Tailwind CSS (Custom Studio Dark Theme) |
| **Icons**           | Lucide React                            |
| **Charts**          | Recharts                                |

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

### 3️⃣ Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
VITE_GEMINI_API_KEY=your_gemini_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4️⃣ Initialize Database (Supabase)

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

### 5️⃣ Launch the Studio

```bash
npm run dev
```

---

## 🎨 Design Philosophy

GlobeTrotter Studio follows a **“Command Center” aesthetic**, optimized for focus and clarity.

### Design Principles

* **Glassmorphism**: Semi-transparent layers for spatial depth
* **High-Contrast Typography**: Inter & Plus Jakarta Sans for a technical, modern feel
* **Contextual Imagery**: Smart landmark-based image fetching using professional photography databases

---

## ⚖️ License

Distributed under the **MIT License**.
See `LICENSE` for more information.

---

## 🏆 Hackathon Note

Developed for the **2026 AI Studio Hackathon**.

> **Engineering the perfect journey.**

---

