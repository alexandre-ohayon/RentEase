# 🏠 RentEase

A simple SaaS application for property rental management built with React, Nest.js, MongoDB, and Kafka.

---

## 📦 Project structure

```
RentEase 
├── rentease-backend (Nest.js backend) 
└── rentease-frontend (React + TypeScript frontend)
```

---

## 🚀 Stack

- **Frontend**: React, TypeScript, Zustand, React Hook Form, Axios, Vite, Shadcn/UI
- **Backend**: Nest.js, MongoDB, Mongoose, Kafka
- **DevOps**: Docker, Kubernetes, GitHub Actions

---

## ▶️ Run Locally

### Backend

1. Install dependencies:
   ```bash
   cd rentease-backend
   pnpm install
   ```

2. Configure your environment:
   ```bash
   cp .env.example .env
   ```

3. Start MongoDB & Kafka using Docker Compose (soon):
   ```bash
   docker-compose up -d
   ```

4. Run the Nest.js backend:
   ```bash
   pnpm run start:dev
   ```

### Frontend

1. Install dependencies:
   ```bash
   cd rentease-frontend
   pnpm install
   ```

2. Run the React frontend:
   ```bash
   pnpm run dev
   ```

---

## 📌 Roadmap

- [x] Initialize project & basic setup
- [ ] CRUD endpoints for properties
- [ ] Tenants management
- [ ] Lease contracts generation
- [ ] Automatic PDF receipts via Kafka
- [ ] CI/CD pipeline setup (GitHub Actions)
- [ ] Docker & Kubernetes deployment

---

## 🔑 Contributing

Pull requests are welcome! Please open an issue first to discuss any major changes.