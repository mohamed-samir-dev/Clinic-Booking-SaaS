<div align="center">

# 🏥 Clinic Booking SaaS — Frontend

**Modern, multi-tenant clinic booking platform built for scale**

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.11-764ABC?logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.8-010101?logo=socket.io)](https://socket.io/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[Features](#-features) · [Tech Stack](#-tech-stack) · [Architecture](#-architecture) · [Getting Started](#-getting-started) · [Pages & Routes](#-pages--routes) · [Contributing](#-contributing)

</div>

---

## 📋 Overview

A production-ready, responsive frontend for a **multi-tenant clinic booking SaaS platform**. The application serves four distinct user roles — **Owner**, **Manager**, **Doctor**, and **Patient** — each with a dedicated dashboard and tailored experience.

### Highlights

- 🌐 **Bilingual UI** — Full English & Arabic support with RTL layout via `next-intl`
- 🌙 **Dark / Light Mode** — Theme toggle with persistent user preference
- 🔐 **Google OAuth 2.0** — One-click patient authentication
- ⚡ **Real-time Updates** — Live appointment & notification updates via Socket.IO
- 📊 **Analytics Dashboards** — Interactive charts powered by Recharts
- 📱 **Mobile-first** — Fully responsive design across all breakpoints
- 🎨 **Smooth Animations** — Page transitions & micro-interactions with Framer Motion

---

## 🛠 Tech Stack

| Category | Technology | Version |
|----------|------------|---------|
| **Framework** | Next.js (App Router) | 16.1.6 |
| **Language** | TypeScript | 5.x |
| **UI Library** | React | 19.2.3 |
| **Styling** | Tailwind CSS | 4.x |
| **State Management** | Redux Toolkit + React Redux | 2.11 / 9.2 |
| **Forms & Validation** | React Hook Form + Zod | 7.71 / 4.3 |
| **Animations** | Framer Motion | 12.34 |
| **Charts** | Recharts | 3.7 |
| **Internationalization** | next-intl (AR / EN) | 4.8 |
| **Authentication** | @react-oauth/google + JWT | 0.13 |
| **Real-time** | Socket.IO Client | 4.8 |
| **Icons** | Lucide React, React Icons | — |
| **Carousel** | Swiper | 12.1 |
| **Date Utilities** | date-fns | 4.1 |
| **Notifications** | React Hot Toast | 2.6 |

---

---

## 📄 Pages & Routes

### 🌍 Public Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Landing | Hero section, Medical Services, Top Doctors, Featured Clinics, Patient Reviews |
| `/pages/doctors` | Doctors | Browse all doctors with specialty, location & availability filters |
| `/pages/doctors/[id]` | Doctor Profile | Full profile, ratings, reviews, schedule & availability calendar |
| `/pages/clinics/[id]` | Clinic Details | Clinic info, working hours, reviews & ratings |
| `/pages/services` | Services | All medical services with categories |
| `/pages/services/[slug]` | Service Details | Individual service information |
| `/pages/booking` | Booking | Appointment booking flow (guest & registered patients) |
| `/pages/about` | About | About the platform |
| `/pages/contact` | Contact | Contact form with validation |
| `/pages/login` | Login | Multi-role login (Owner / Manager / Doctor / Patient) |
| `/pages/register` | Register | Patient registration with Google OAuth option |

### 👑 Owner Dashboard — `/pages/owner/*`

| Route | Page | Description |
|-------|------|-------------|
| `/` | Dashboard | Business overview, revenue analytics, appointment stats |
| `/clinics` | Clinics | Create & manage clinics and branches |
| `/doctors` | Doctors | Add, edit, remove doctors across all branches |
| `/managers` | Managers | Assign & manage branch managers with permissions |
| `/reports` | Reports | Detailed reports, charts & exportable statistics |
| `/settings` | Settings | Business settings, main clinic config, branding |
| `/dashboard` | Analytics | Deep-dive analytics with Recharts visualizations |

### 🏢 Manager Dashboard — `/pages/manager/*`

| Route | Page | Description |
|-------|------|-------------|
| `/` | Dashboard | Branch overview & daily summary |
| `/appointments` | Appointments | View, confirm, cancel, reschedule & mark no-show |
| `/doctors` | Doctors | Branch doctor management & assignment |
| `/patients` | Patients | Patient list & medical info access |
| `/reviews` | Reviews | Moderate & manage patient reviews |
| `/schedule` | Schedule | Doctor schedules, blocked slots & availability |
| `/settings` | Settings | Branch-level settings & working hours |
| `/transfer-requests` | Transfers | Doctor transfer requests between branches |
| `/dashboard` | Analytics | Branch performance metrics |

### 🩺 Doctor Dashboard — `/pages/doctor/*`

| Route | Page | Description |
|-------|------|-------------|
| `/` | Dashboard | Today's appointments, pending requests, stats |
| `/profile` | Profile | Edit professional info, bio, specialties & photo |
| `/schedule` | Schedule | Manage availability & view weekly schedule |
| `/requests` | Requests | Incoming appointment requests with accept/reject |
| `/transfer-requests` | Transfers | Transfer requests with messaging to managers |

### 🧑‍⚕️ Patient — `/pages/patient/*`

| Route | Page | Description |
|-------|------|-------------|
| `/` | Dashboard | Overview of upcoming appointments |
| `/profile` | Profile | Personal info, medical info, password change |

---

## ✨ Features

### Multi-Tenancy & Roles
- **Tenant Isolation** — Each business operates with fully isolated data, branding & configuration
- **Role-Based Dashboards** — 4 distinct dashboards (Owner, Manager, Doctor, Patient) with role-specific navigation, permissions & UI components
- **Branch System** — Main clinic + unlimited branches with inherited or overridden settings

### Authentication & Security
- **Multi-Role Auth** — Separate login flows for Owner, Manager, Doctor & Patient
- **Google OAuth 2.0** — One-click patient registration & login via `@react-oauth/google`
- **JWT Tokens** — Secure session management with Redux-persisted auth state
- **Guest Booking** — Patients can book appointments without creating an account

### Internationalization & Theming
- **Bilingual (AR / EN)** — Complete Arabic & English translations with full RTL support
- **next-intl Integration** — Server & client-side translations with `messages/ar.json` & `messages/en.json`
- **Dark / Light Mode** — Theme toggle with context-based persistence across sessions

### Booking & Appointments
- **Real-time Slot Availability** — Live updates via Socket.IO when slots are booked/cancelled
- **Multi-step Booking Flow** — Doctor selection → Date → Time → Confirmation
- **Appointment Management** — Cancel, reschedule & review with modal-based UX
- **Blocked Slots** — Respect doctor blocked time slots (surgery, meetings, etc.)

### Doctor & Clinic Profiles
- **Doctor Profiles** — Ratings, reviews, specialties, schedule & availability calendar
- **Clinic Profiles** — Details, working hours, location, reviews & ratings
- **Favorites System** — Save favorite doctors & clinics with custom hooks

### Reviews & Ratings
- **Doctor Reviews** — Rate & review after appointments with modal UI
- **Clinic Reviews** — Rate clinics with auto-calculated averages
- **Review Moderation** — Managers can moderate & delete inappropriate reviews

### Analytics & Reporting
- **Interactive Charts** — Recharts-powered dashboards with bar, line, pie & area charts
- **Owner Analytics** — Revenue, appointments, doctor performance & patient growth
- **Manager Metrics** — Branch-level appointment stats & schedule utilization

### Real-time & UX
- **Socket.IO** — Live appointment updates, notifications & status changes
- **Framer Motion** — Smooth page transitions, modal animations & micro-interactions
- **Swiper Carousel** — Touch-friendly carousels for doctors, clinics & reviews
- **Toast Notifications** — Non-intrusive feedback via React Hot Toast
- **Responsive Design** — Mobile-first approach with Tailwind CSS breakpoints

### Doctor Transfers
- **Transfer Requests** — Managers can request doctor transfers between branches
- **Doctor Approval** — Doctors can accept/reject transfers with messaging
- **Transfer History** — Full audit trail of transfer requests & responses

---


## 🔗 Backend Integration

This frontend connects to the **Clinic Booking SaaS Backend** — a Node.js/Express/MongoDB API with:

- **RESTful API** — 50+ endpoints across 9 route groups
- **Multi-tenant Architecture** — Business-level data isolation
- **4 Auth Models** — Separate models for Owner, Manager, Doctor & Patient
- **Real-time** — Socket.IO server for live updates
- **Security** — bcrypt, JWT, rate limiting, helmet, CORS & account lockout


---

## 📁 Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | 16.1.6 | React framework with App Router & SSR |
| `react` / `react-dom` | 19.2.3 | UI library |
| `typescript` | 5.x | Type safety |
| `tailwindcss` | 4.x | Utility-first CSS framework |
| `@reduxjs/toolkit` | 2.11.2 | Predictable state management |
| `react-redux` | 9.2.0 | React bindings for Redux |
| `react-hook-form` | 7.71.1 | Performant form handling |
| `@hookform/resolvers` | 5.2.2 | Zod resolver for React Hook Form |
| `zod` | 4.3.6 | Schema-based form validation |
| `framer-motion` | 12.34.3 | Animation library |
| `recharts` | 3.7.0 | Composable chart components |
| `next-intl` | 4.8.3 | i18n with server component support |
| `@react-oauth/google` | 0.13.4 | Google OAuth integration |
| `socket.io-client` | 4.8.3 | Real-time WebSocket client |
| `lucide-react` | 0.564.0 | Modern icon set |
| `react-icons` | 5.5.0 | Popular icon packs |
| `swiper` | 12.1.1 | Touch slider / carousel |
| `date-fns` | 4.1.0 | Lightweight date utilities |
| `react-hot-toast` | 2.6.0 | Toast notifications |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---



<div align="center">

Built with ❤️ using **Next.js 16** · **React 19** · **TypeScript** · **Tailwind CSS 4**

</div>
