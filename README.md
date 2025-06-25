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
![Uploading ![Screenshot (579)](https://github.com/user-attachments/assets![![Screenshot (584)](https://github.com/user-attachments/assets/f78edafd-1d88-4f48-abb1-df18270f80e7)

Screenshot (583)](https://github.com/user-attachments/assets/756f6836-7022-4699-ad99-f8de840755bc)

/5f16c47![Screenshot (581)](https://github.com/user-attachments/assets/a4a79dc0-4476-40fa-aedb-61e73759f111)

d-1803-4077-ac79-6bdfb5fc9846)![Screenshot (582)](https://github.com/user-attachments/assets/3f2483c1-4008-44c1-8547-55f5eff7ac4a)

Screenshot (584).png…]()![Screenshot (580)](https://github.com/user-attachments/assets/e1bb70cf-5953-44aa-9377-9e55fd3b24a0)

![Screenshot (579)](https://github.com/user-attachments/assets/ca9aa9a8-48f3-423c-a139-5b752b2c2f4f)
