# EduFeedback Pro | Student Evaluation System

**EduFeedback Pro** is a modern, premium web application designed for educational institutions to collect, analyze, and manage student feedback effectively. Built with a stunning glassmorphic UI, it provides tailored experiences for Students, Instructors, and Administrators.

![Project Landing Page](C:\Users\janga\.gemini\antigravity\brain\8a66a5e5-fdc3-4d0d-803c-6d8207130903\app_running_1771942326846.png)

## 🚀 Key Features

### 👤 Role-Based Access
- **Administrators**: Create and distribute feedback forms, analyze global performance metrics, and manage institutional quality.
- **Instructors**: Access personalized dashboards for their specific courses, tracking student satisfaction and comparative analytics.
- **Students**: Securely provide feedback on courses and view aggregated, anonymous peer results to inform their learning journey.

### 📊 Advanced Analytics
- Real-time charting powered by **Recharts**.
- Sentiment tracking and average satisfaction scoring.
- Participation rate monitoring.

### 🎨 Premium UI/UX
- **Glassmorphic Design**: A modern "frosted glass" aesthetic with vibrant gradients.
- **Micro-animations**: Smooth transitions and hover effects using **Framer Motion**.
- **Responsive Layout**: Optimized for desktop, tablet, and mobile screens.

### 🛠 Tech Stack
- **Frontend**: React 19 (Vite)
- **Styling**: Vanilla CSS with custom design tokens
- **Visuals**: Lucide React (Icons), Recharts (Data Viz)
- **Persistence**: LocalStorage (Session & Data management)

## 🏁 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   ```
2. Navigate to the project folder:
   ```bash
   cd Feedback
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### 🔑 Demo Credentials
The system automatically seeds demo data on the first load. Use these credentials to explore (all passwords are `password123`):
- **Admin**: `admin`
- **Instructor**: `instructor1` (Dr. Sarah Smith)
- **Student**: `student1` (John Doe)

## 📁 File Structure
```text
src/
├── components/
│   ├── Auth/        # Login & Register views
│   ├── Admin/       # Dashboard & Form Builder
│   ├── Instructor/  # Performance Analytics
│   └── Student/     # Feedback Form & Peer Results
├── utils/           # seedData utility
├── styles/          # Theme & Global variables
└── App.jsx          # Routing & Session logic
```

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.
