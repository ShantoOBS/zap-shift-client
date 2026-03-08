# ZapShift — Parcel & Delivery Dashboard

A modern web application for parcel delivery and logistics. Customers can send parcels, track shipments, and view coverage; riders can manage deliveries; and admins can approve riders, assign deliveries, and manage users.

---

## Project overview

**ZapShift** is a full-featured delivery dashboard built with React. It includes:

- **Public:** Home, Services, Coverage map, About, Pricing Calculator, Send Parcel, Be a Rider
- **Auth:** Login, Register, Forgot/Reset Password (Firebase Authentication)
- **Dashboard:** Overview (metrics, shipment statistics, shipping reports, late invoices, shipment alerts), My Parcels, Payment History, Profile, Settings, Help
- **Admin:** Approve Riders, Assign Riders, Users Management
- **Rider:** Assigned Deliveries, Completed Deliveries
- **Parcel tracking** by tracking ID

The UI is responsive, with a collapsible sidebar, role-based routes, and secure API calls using JWT.

---

## Technologies used

### Core

| Technology | Purpose |
|------------|--------|
| **React 19** | UI library |
| **Vite** (rolldown-vite) | Build tool and dev server |
| **React Router 7** | Client-side routing |

### Styling & UI

| Technology | Purpose |
|------------|--------|
| **Tailwind CSS 4** | Utility-first CSS |
| **DaisyUI** | Component themes and utilities |
| **Lucide React** | Icons |
| **React Icons** | Additional icons |
| **Framer Motion** / **Motion** | Animations and transitions |
| **@material-tailwind/react** | Extra UI components |
| **tailwind-merge** / **clsx** | Class name utilities |

### Data & API

| Technology | Purpose |
|------------|--------|
| **TanStack React Query** | Server state, caching, and API fetching |
| **Axios** | HTTP client and secure API (JWT) |
| **Firebase** | Authentication (email/password, Google, etc.) |

### Forms & feedback

| Technology | Purpose |
|------------|--------|
| **React Hook Form** | Form state and validation |
| **SweetAlert2** | Alerts and confirmations |
| **React Hot Toast** | Toast notifications |

### Charts & maps

| Technology | Purpose |
|------------|--------|
| **Recharts** | Charts (e.g. shipment statistics area chart) |
| **Leaflet** | Maps |
| **React Leaflet** | React bindings for Leaflet (coverage map) |

### Carousels & motion

| Technology | Purpose |
|------------|--------|
| **Swiper** | Carousels and sliders |
| **Embla Carousel React** | Carousel components |
| **React Responsive Carousel** | Responsive carousels |
| **React Fast Marquee** | Marquee text/banners |
| **React Lottie** | Lottie animations |

### Tooling & quality

| Technology | Purpose |
|------------|--------|
| **ESLint** | Linting |
| **@vitejs/plugin-react** | React support in Vite |

---

## Getting started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Install and run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Other scripts

```bash
npm run build   # Production build
npm run preview # Preview production build
npm run lint    # Run ESLint
```

### Environment

Configure your backend API base URL and Firebase config (e.g. in env or app config). The app uses a secure Axios instance that sends the Firebase JWT for authenticated API requests.

---

## Test accounts

Use these credentials to sign in and test role-based features (ensure these users exist in Firebase and your backend with the correct roles):

| Role   | Email            | Password |
|--------|------------------|----------|
| Admin  | admin@gmail.com  | 123456   |
| User   | user@gmail.com   | 123456   |
| Rider  | rider@gmail.com  | 123456   |

- **Admin:** Approve Riders, Assign Riders, Users Management.
- **User:** Send parcels, My Parcels, Payment History, dashboard overview.
- **Rider:** Assigned Deliveries, Completed Deliveries.

---

## Test payment card (testing only)

For testing payment flows (e.g. Stripe or similar), you can use this test Visa card:

| Field           | Value                |
|----------------|----------------------|
| Card number    | 4242 4242 4242 4242  |
| Expiry date    | 02 / 28               |
| CVC            | 123                   |
| Cardholder name| Shanta Shil           |

**Use only in test environments.** Do not use real card details in development.

---

## Project structure

```
zap-shift-client/
├── public/                    # Static assets
├── src/
│   ├── main.jsx              # App entry, React root, initial loader wrapper
│   ├── App.jsx
│   ├── index.css              # Global styles, Tailwind, CSS variables
│   │
│   ├── page/                  # Page-level components
│   │   ├── Home/
│   │   │   ├── Home.jsx
│   │   │   └── HomeComponents/    # HomeBanner, OurServices, FQA, Tracking, etc.
│   │   ├── Auth/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── ForgetPassword.jsx
│   │   │   ├── EnterCode.jsx
│   │   │   └── ResetPassword.jsx
│   │   ├── About/
│   │   │   └── About.jsx
│   │   ├── Coverage/
│   │   │   └── Coverage.jsx       # Coverage map (Leaflet)
│   │   ├── Rider/
│   │   │   └── Rider.jsx          # Be a Rider application
│   │   ├── SendParcel/
│   │   │   └── SendParcel.jsx
│   │   ├── ParcelTrack/
│   │   │   └── ParcelTrack.jsx    # Track by ID
│   │   ├── PricingCalculator/
│   │   │   └── PricingCalculator.jsx
│   │   ├── Shared/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Profile.tsx
│   │   │   ├── Loading.jsx
│   │   │   ├── InitialLoader.jsx  # First-load splash with logo
│   │   │   └── Forbidden.jsx
│   │   └── Dashboard/
│   │       ├── DashboardOverView/
│   │       │   ├── DashboardOverView.jsx
│   │       │   └── Components/    # OverViewHeader, OverviewCards, ShipmentStatistics,
│   │       │                       # ShippingReports, LateInvoices, ShipmentAlerts
│   │       ├── MyParcel/
│   │       │   ├── MyParcel.jsx
│   │       │   └── Components/     # EditParcelModal, ParcelDetailsModal
│   │       ├── PaymentHistory/
│   │       │   ├── PaymentHistory.jsx
│   │       │   └── Components/     # PaymentDetailsModal, PaymentCancel
│   │       ├── ProfileDetails/
│   │       │   └── ProfileDetails.jsx
│   │       ├── Settings/
│   │       │   └── Settings.jsx
│   │       ├── Help/
│   │       │   └── Help.jsx
│   │       ├── ApproveRiders/
│   │       │   └── ApproveRiders.jsx
│   │       ├── AssignRiders/
│   │       │   └── AssignRiders.jsx
│   │       ├── UsersManagement/
│   │       │   └── UsersManagement.jsx
│   │       ├── AssignedDeliveries/
│   │       │   └── AssignedDeliveries.tsx
│   │       ├── CompletedDeliveries/
│   │       │   └── CompletedDeliveries.tsx
│   │       └── PaymentCancel.jsx
│   │
│   ├── layout/
│   │   ├── RootLayout.jsx         # Navbar + Outlet + Footer
│   │   ├── AuthLayout.jsx        # Auth pages wrapper
│   │   └── DashBoardLayout.jsx   # Sidebar + header + Outlet
│   │
│   ├── routes/
│   │   ├── routes.jsx             # createBrowserRouter, all routes
│   │   ├── PrivateRoutes.jsx     # Require auth
│   │   ├── AdminRoute.jsx        # Require admin role
│   │   └── RiderRoute.jsx        # Require rider role
│   │
│   ├── Hooks/
│   │   ├── useAuth.jsx
│   │   ├── useAxiosSecure.jsx    # Axios + JWT interceptor
│   │   ├── useRole.jsx
│   │   └── useAxios.jsx
│   │
│   ├── Context/
│   │   └── AuthContext/
│   │       ├── AuthContext.jsx
│   │       └── AuthProvider.jsx
│   │
│   ├── Compontens/               # Shared UI (note: typo in folder name)
│   │   ├── Logo.jsx
│   │   ├── Social.jsx
│   │   └── CircleButton.jsx
│   │
│   └── firebase/
│       └── firebase.init.js
│
├── vite.config.js
├── package.json
└── README.md
```

---

## License

Private. All rights reserved.
