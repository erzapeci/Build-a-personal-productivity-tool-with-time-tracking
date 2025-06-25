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

| Shërbimi       | Porti | Përgjegjës për                    ![Screenshot (594)](https://github.com/user-attachments/assets/7123d2d4-cd4e-43af-a77e-814ba7f04a92)
    |
|----------------|--------|--------------------------------------|
| Auth Service   | 5000   | Regjistrim, login, JWT               |
| Task Service   | 5001   | CRUD për detyra                      |
| TimeLog Service| 5002   | Regjistrim & menaxhim i kohës        |
| Project Service| 5003   | Menaxhimi i projekteve               |
| Frontend       | 3000   | Dashboard për përdoruesin            |

---
![Screenshot (574)](https://github.com/user-attachments/assets/5fa719b7-a537-4bc5-b282-5bfd8de074e0)

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
![Screenshot (576)](https://github.com/user-attachments/assets/72ddfca5-e77c-442e-bd24-7d5a900c4ee0)
![Screenshot (577)](https://github.com/user-attachments/assets/ddc6413b-2189-4258-8d86-ee0cec35433f)
![Screenshot (574)](https://github.com/user-attachments/assets/31ee8e68-b367-469b-8d7e-27cac834260a)
![Screenshot (599)](https://github.com/user-attachments/assets/e47ff991-6fda-456d-9dba-130181ae8265)
![Screenshot (598)](https://github.com/user-attachments/assets/b2cc97bf-04fd-4fe5-9f25-d26f55151f65)
![Screens![Scre![Screenshot (595)](https://github.com/user-attachments/assets/045cddee-6fba-48cf-99ec-ed910e253d34)
enshot (596)](https://github.com/user-attachments/assets/84e88c44-26e3-4ed9-beae-39e6ed330dda)
hot (597)](https://github.com/user-attachments/assets/1cf1e024-bb35-432b-9549-4b1d1d34b5f1)
![Screenshot (593)](https://github.com/user-attachments/assets/eac7ca31-a151-4d95-be21-c4b44b1492d9)
![Screenshot (592)](https://github.com/user-attachments/assets/229bcba5-1a9b-4657-8456-5187413315dd)![Screenshot (591)](https://github.com/user-attachments/assets/aa3735b3-ff3b-4f99-adf4-28acddf2b659)

![Screenshot (590)](https://github.com/user-attachments/assets/e7ceb772-9125-4b46-8cf1-e6ca3f926293)
![Screenshot (589)](https://github.com/user-attachments/assets/cae4607e-d8aa-4f31-8812-dfcf5!![Screenshot (585)](https://github.com/user-attachments/assets/e65a432b-c986-485a-9c09-1fbae7a4b47e)
[Screenshot (586)](https://github.com/user-attachments/assets/f6fe9e7e-a918-4ab9-a256-4e8c79a5d94f)
cedf9a2![Screenshot (587)](https://github.com/user-attachments/assets/99255994-141a-4e3b-a57e-f927443fbb8b)
)
![Screenshot (588)](https://github.com/user-attachments/assets/d64cd482-6b37-4e93-a5a9-6f5edad9cd5e)
