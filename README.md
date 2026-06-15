🚀 AI-Powered Trading Journal
An intelligent trading journal platform that helps traders track trades, maintain structured journals, analyze performance metrics, and receive AI-generated trading insights. The application combines trade management, analytics, journaling, and artificial intelligence to improve trading discipline and decision-making.

📌 Overview
AI-Powered Trading Journal is designed for traders who want to:
Track and manage trades
Maintain detailed trading journals
Analyze performance metrics
Upload trade screenshots
Generate AI-powered trade reviews
Receive weekly trading insights
Improve trading habits through data-driven feedback
The platform acts as a personal trading coach by combining analytics and artificial intelligence.

✨ Features

🔐 Authentication
User Signup
User Login
Secure Logout
Protected Dashboard Routes

📊 Dashboard
Total Trades
Winning Trades
Losing Trades
Net Profit/Loss
Win Rate
Equity Curve Visualization

💹 Trade Management
Add Trades
Edit Trades
Delete Trades
View Trade History

📂 CSV Import
Upload Trade History
Bulk Import Trades
PapaParse Integration
MT4/MT5 Compatible CSV Processing

🔎 Search & Filters
Search by Symbol
Winning Trades Filter
Losing Trades Filter
All Trades View

📓 Trading Journal

For every trade:

Pre-Trade Analysis
Post-Trade Analysis
Emotions Tracking
Lessons Learned
Tags
Ratings
Screenshot Attachments
🖼 Screenshot Upload
Upload Trade Screenshots
Supabase Storage Integration
Screenshot Preview

🤖 AI Trade Review

AI-powered analysis generates:

Trade Score
Strengths
Weaknesses
Recommendations
📅 AI Weekly Review

Weekly performance analysis:

Performance Summary
Most Common Emotion
Biggest Mistake
Best Habit
Trading Recommendations
📈 Analytics Dashboard
Win Rate Analysis
Average Win
Average Loss
Symbol Performance
Emotion Analysis
Trading Metrics

🧠 AI Analytics Report

Comprehensive AI-generated report including:

Performance Summary
Best Symbol
Worst Symbol
Emotional Patterns
Risk Management Feedback
Personalized Recommendations

🛠 Tech Stack
Frontend
Next.js 15
React
TypeScript
Tailwind CSS
ShadCN UI
Recharts
Backend
Next.js API Routes
Database
Supabase PostgreSQL
Authentication
Supabase Authentication
AI Integration
OpenAI API
File Storage
Supabase Storage
Deployment
Vercel

Database Schema

Trades
id
symbol
trade_type
pnl
created_at

Trade Journals
id
trade_id
pre_trade_analysis
post_trade_analysis
emotions
lessons
tags
rating
screenshot_url
created_at

Trade Screenshots
id
trade_id
image_url
screenshot_type

AI Analysis
id
trade_id
analysis
score

CSV Imports
id
file_name
total_rows
imported_rows

MT5 Accounts
id
account_number
broker_name
server_name
last_synced_at

⚙️ Installation

Clone the repository:

git clone https://github.com/Khushi29G/ai_trading_journal.git

Navigate to the project:

cd ai_trading_journal

Install dependencies:

npm install

Create a .env.local file:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
OPENAI_API_KEY=your_openai_api_key

Run development server:

npm run dev

Open:

http://localhost:3000

🚀 Deployment

The application is deployed on Vercel.

Build locally:

npm run build

Deploy:

vercel

🎯 Project Goals

The objective of this project is to help traders:

Maintain trading discipline
Review trade performance effectively
Understand emotional trading patterns
Identify recurring mistakes
Improve consistency
Receive AI-driven coaching and feedback

<img width="1918" height="857" alt="Screenshot 2026-06-15 194216" src="https://github.com/user-attachments/assets/26d40129-b35f-4ddb-bfd2-5cdcb79adc9c" />

<img width="746" height="752" alt="Screenshot 2026-06-15 194243" src="https://github.com/user-attachments/assets/b6438fe0-b65b-4410-b244-fe2feedf6c63" />

<img width="1918" height="862" alt="Screenshot 2026-06-15 194319" src="https://github.com/user-attachments/assets/e04d8f16-5481-4a40-851c-6af5464207e5" />

<img width="1566" height="857" alt="Screenshot 2026-06-15 194330" src="https://github.com/user-attachments/assets/e3c7ae65-1257-43c4-93dd-c51bd0adc78b" />

<img width="1918" height="872" alt="Screenshot 2026-06-15 194343" src="https://github.com/user-attachments/assets/a944ccc9-d012-4865-9953-c9cccf7fbf59" />

<img width="1572" height="871" alt="Screenshot 2026-06-15 194358" src="https://github.com/user-attachments/assets/26e23a61-1810-4a8c-be72-6828484f6bd1" />

<img width="1918" height="840" alt="Screenshot 2026-06-15 194414" src="https://github.com/user-attachments/assets/26e00f84-3617-44d5-9ff7-35903d589fcb" />

<img width="1918" height="852" alt="Screenshot 2026-06-15 194439" src="https://github.com/user-attachments/assets/107af6c9-3d73-4f4d-8346-fd6ea608728f" />

<img width="1547" height="757" alt="Screenshot 2026-06-15 194514" src="https://github.com/user-attachments/assets/ecc63f8c-462f-4b39-84d0-afd7a0b45f62" />

<img width="1560" height="755" alt="Screenshot 2026-06-15 194524" src="https://github.com/user-attachments/assets/39922b44-453a-49ad-957f-f9c9c81f1ab6" />

<img width="1917" height="867" alt="Screenshot 2026-06-15 194610" src="https://github.com/user-attachments/assets/8aa1b160-2636-4ca4-a304-be674c8c6f16" />







