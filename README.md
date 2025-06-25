# Build-a-personal-productivity-tool-with-time-tracking
# 🗂️ Task Management System

Sistem modern për menaxhimin e detyrave dhe kohës, ndërtuar mbi arkitekturë mikroshërbimesh. Përdoruesit mund të krijojnë dhe menaxhojnë detyra, projekte, të regjistrojnë kohë pune dhe të analizojnë produktivitetin përmes një dashboard-i dinamik.

---

## ⚙️ Teknologjitë Kryesore

- **Frontend**: React.js (dashboard interaktiv)
- **Backend**: Node.js + Express (mikroshërbime)
- **Database**: MongoDB (për çdo shërbim veçmas)
- **Autentifikim**: JWT Tokens
- **Containerizim**: Docker & Docker Compose
- **Testim API**: Postman

---

## 📁 Struktura e Mikroshërbimeve

| Shërbimi       | Porti | Përgjegjës për                        |
|----------------|--------|--------------------------------------|
| Auth Service   | 5000   | Regjistrim, login, JWT               |
| Task Service   | 5001   | CRUD për detyra                      |
| TimeLog Service| 5002   | Regjistrim & menaxhim i kohës        |
| Project Service| 5003   | Menaxhimi i projekteve               |
| Frontend       | 3000   | Dashboard për përdoruesin            |

---

## ▶️ Nisja Lokale me Docker

### 🔹 Kërkesat paraprake

- Docker & Docker Compose të instaluara  
- Opsionalisht: Node.js & MongoDB për testim lokal

### 🔹 Hapat

```bash
git clone https://github.com/your-repo/task-management-system.git
cd task-management-system
cp .env.example .env  # ose krijo .env për secilin shërbim
docker-compose up --build
```

### 🔹 Aksesimi

- Frontend: [http://localhost:3000](http://localhost:3000)
- Auth Service: [http://localhost:5000](http://localhost:5000/api/auth)
- Task Service: [http://localhost:5001](http://localhost:5001/api/tasks)
- TimeLog Service: [http://localhost:5002](http://localhost:5002/api/timelogs)
- Project Service: [http://localhost:5003](http://localhost:5003/api/projects)

---

## 📌 API Endpoint-e Kryesore

### 🔐 Auth Service (`/api/auth`)

| Method | URL               | Përshkrimi         |
|--------|-------------------|--------------------|
| POST   | /register         | Regjistrim         |
| POST   | /login            | Hyrje              |

### ✅ Task Service (`/api/tasks`)

| Method | URL                   | Përshkrimi          |
|--------|-----------------------|---------------------|
| GET    | `?userEmail=...`      | Merr detyrat        |
| POST   | `/`                   | Krijo detyrë        |
| PUT    | `/:id`                | Përditëso detyrë    |
| DELETE | `/:id`                | Fshi detyrë         |

### ⏱️ TimeLog Service (`/api/timelogs`)

| Method | URL                   | Përshkrimi              |
|--------|-----------------------|-------------------------|
| GET    | `?userEmail=...`      | Merr regjistrimet       |
| POST   | `/`                   | Shto kohë pune          |
| PUT    | `/:id`                | Përditëso regjistrim    |
| DELETE | `/:id`                | Fshi regjistrim         |

### 📂 Project Service (`/api/projects`)

| Method | URL                   | Përshkrimi              |
|--------|-----------------------|-------------------------|
| GET    | `?userEmail=...`      | Merr projektet          |
| POST   | `/`                   | Krijo projekt           |
| PUT    | `/:id`                | Përditëso projekt       |
| DELETE | `/:id`                | Fshi projekt            |

---

## 🧪 Testimi me Postman

1. Regjistrohu / Logohu te `/api/auth`
2. Merr JWT token nga përgjigjja
3. Përdore token-in në **Authorization → Bearer Token**
4. Testo endpoint-et e tjera me emailin që përdore për login

---

## 🧰 Zgjidhja e Problemeve

- `Cannot POST /...` → Kontrollo që URL është pa `\n` apo hapësira.
- `Cast to ObjectId failed` → ID është e gabuar ose ka `\n` në fund.
- MongoDB nuk lidhet → Kontrollo `MONGO_URL` në `.env`.
- Docker nuk nis → Shiko `docker-compose logs` për error.

---

## 📌 Kontribut

👉 Pull request-et dhe sugjerimet janë të mirëseardhura!  
Kontakto: [`erza.peci@umib.net`](mailto:erza.peci@umib.net)
         [`agnesa.baliu@umib.net`](mailto:agnesa.baliu@umib.net)

---

## ✅ Shembull `.env` për një mikroshërbim

```
PORT=5001
MONGO_URL=mongodb://127.0.0.1:27017/productivityDB
JWT_SECRET=sekretishumefshehur
```

---

## 🧭 Screenshots dhe Demo

![Screenshot (579)](https://github.com/user-attachments/assets/f5f025d5-ac3c-47cd-8bdc-df2a9e3de4c2)
![Screenshot (580)](https://github.com/user-attachments/assets/e8457fce-7de6-445d-bd25-49681fb3746b)
![Screenshot (581)](https://github.com/user-attachments/assets/04e94083-07a0-4e3a-bb81-160251ef77de)
![Screenshot (582)](https://github.com/user-attachments/assets/dc05d016-e7f0-4c0c-86e1-06235182ebcc)
![Screenshot (583)](https://github.com/user-attachments/assets/49996cef-a7c3-42af-b26e-7378e866c5ee)
![Screenshot (584)](https://github.com/user-attachments/assets/11f42a19-b026-4cf4-b756-ac369433db49)
![Screenshot (575)](https://github.com/user-attachments/assets/c0eddae9-7e08-47d0-9b06-916a9cc4dbc1)
