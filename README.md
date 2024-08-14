# Getting Started

First things first, Welcome Onboard 👋, in this project we are trying to make you familiar with the main technologies that we use and main parts of our solution, please don't hesitate to reach out to any team member if you face any issues, have any questions or want to improve this repo.

## 📚 Stack

- [Next Js](https://www.nextjs.org/) - The React Framework for the Web.
- [Django](https://www.djangoproject.com/) - Django makes it easier to build better web apps more quickly and with less code.
- [Typescript](https://www.typescriptlang.org/) - JavaScript with syntax for types.
- [Docker](https://www.docker.com/) - Docker is a platform designed to help developers build, share, and run modern applications. We handle the tedious setup, so you can focus on the code.

  ## 📸 Screenshots:

- Frontend:

- Backend:

## ✅ System Requirements

- [ ] Docker: [Install Docker](https://docs.docker.com/get-docker/)
- [ ] Node.js: [Install Node.js](https://nodejs.org/en/download/)
- [ ] Python: [Install Python](https://www.python.org/downloads/)
- [ ] Typescript: [Install Typescript](https://www.typescriptlang.org/download)
- [ ] Git: [Install Git](https://git-scm.com/downloads)
- [ ] VS Code: [Install VS Code](https://code.visualstudio.com/download)
- [ ] Gitlab Account: [Create Gitlab Account](https://git.ajjir.co/users/sign_in)

### Backend Requirements

- [ ] Customer Model: A model to represent customers (e.g., name, nationality, mobile).
- [ ] Room Model: A model to represent room details within a hotel (e.g., room type, price).
- [ ] Reservation Model: A model to manage reservations (e.g., customer details, booking dates, payment status).
- [ ] API Endpoints: RESTful API endpoints for CRUD operations on the models using Django REST framework.

### Frontend Requirements

- [ ] Customers List Page: A page to display a list of customers
- [ ] Customer Form: a form to add a new customer
- [ ] Reservations List: A page to display a list of hotel reservations
- [ ] Reservation Form: A form to book a room, selecting customer, room and reservation details.
- [ ] API Integration: Integrate frontend components with backend API endpoints.

## 📁 Project structure

```
$PROJECT_ROOT
│
├── server  # Django Backend
│
├── client  # Nextjs App
```

---

### 🏆 Getting Started:

- Clone Repo

```bash
git clone https://git.ajjir.co/ajjir/getting-started.git
```

- Using Docker

```docker
docker-compose up --build
```

_Open [Django Server](http://0.0.0.0:8000) in : [http://0.0.0.0:8000](http://0.0.0.0:8000)_ <br/>

_Open [Django Admin](http://0.0.0.0:8000/admin) in : [http://0.0.0.0:8000/admin](http://0.0.0.0:8000/admin)_ <br/>

_Open [Nextjs Server](http://0.0.0.0) in : [http://0.0.0.0](http://0.0.0.0)_ <br/>

## Manual Way:

#### For Django:

- Create Virtual Environment for Python

```bash
cd server
pip install virtualenv
python -m venv .
```

- Activate Virtual Environment

```bash
source Scripts/activate
```

**Window Users use: `.\Scripts\activate`**

- Install Dependencies

```bash
pip install -r server/requirements.txt
```

- Make Migrations

```bash
python manage.py server/makemigrations
python manage.py server/migrate
```

#### For Frontend

- Install Dependencies

```bash
cd client
npm install
```

- Run Dev Server

```bash
npm run dev
```
