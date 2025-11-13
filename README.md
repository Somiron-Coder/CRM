# CRM System for Your Agency

A production-level Customer Relationship Management (CRM) system built with **Next.js**, **TypeScript**, **MongoDB**, and **Tailwind CSS**. Manage clients, employees, and revenue tracking with an intuitive admin dashboard.

## Tech Stack

- **Frontend**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Styling**: Tailwind CSS
- **Authentication**: JWT + bcryptjs
- **API**: Next.js API Routes (RESTful)
- **Linting**: ESLint

## Features

✅ Client Management (Create, Read, Update, Delete)
✅ Employee Management with roles and departments
✅ Revenue Tracking with invoices
✅ User Authentication (Admin, Manager, Employee roles)
✅ RESTful API endpoints
✅ MongoDB integration
✅ Responsive UI with Tailwind CSS

## Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas account (or local MongoDB)
- Git

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure MongoDB

1. Create a MongoDB Atlas account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string (mongodb+srv://...)
4. Add your IP address to the network access list

### 3. Environment Variables

Update `.env.local` with your MongoDB connection string:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/crm_db?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

## API Endpoints

### Clients
- `GET /api/clients` - List all clients
- `POST /api/clients` - Create new client
- `GET /api/clients/[id]` - Get client details
- `PUT /api/clients/[id]` - Update client
- `DELETE /api/clients/[id]` - Delete client

### Employees
- `GET /api/employees` - List all employees
- `POST /api/employees` - Create new employee
- `GET /api/employees/[id]` - Get employee details
- `PUT /api/employees/[id]` - Update employee
- `DELETE /api/employees/[id]` - Delete employee

### Revenue
- `GET /api/revenue` - List all revenue records
- `POST /api/revenue` - Create new revenue record
- `GET /api/revenue/[id]` - Get revenue details
- `PUT /api/revenue/[id]` - Update revenue
- `DELETE /api/revenue/[id]` - Delete revenue record

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── clients/
│   │   ├── employees/
│   │   └── revenue/
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   └── db.ts (MongoDB connection)
├── models/
│   ├── Client.ts
│   ├── Employee.ts
│   ├── Revenue.ts
│   └── User.ts
└── components/ (to be created)
```

## Database Models

### Client Model
- name, email, phone, company
- address, city, state, zipCode, country
- notes, status (active/inactive/prospect)

### Employee Model
- firstName, lastName, email, phone
- position, department, salary, joinDate
- status (active/inactive/on-leave)
- address details

### Revenue Model
- clientId (reference), amount, currency
- description, date, status (pending/completed/cancelled)
- paymentMethod, invoiceNumber, dueDate

### User Model
- name, email, password (hashed)
- role (admin/manager/employee)

## Build for Production

```bash
npm run build
npm start
```

## Next Steps

1. ✅ Set up MongoDB connection with your credentials
2. ⬜ Create React components for dashboard
3. ⬜ Implement authentication system
4. ⬜ Build admin dashboard UI
5. ⬜ Add data visualization charts
6. ⬜ Deploy to production (Vercel, AWS, etc.)

## License

MIT
