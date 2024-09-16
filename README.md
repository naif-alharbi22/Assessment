# JARAS Assessment

Welcome aboard, fellow developer! 🌟

We're thrilled to have you join our team and can't wait to see the incredible
things you'll achieve with us. This is the start of an exciting journey where
you'll learn, grow, and make a real impact.

Remember, we're all here to support you every step of the way. Don’t hesitate
to ask questions, share ideas, and dive into new challenges.

## 📚 Stack

- [Next Js](https://www.nextjs.org/) - The React Framework for the Web.
- [Django](https://www.djangoproject.com/) - Django makes it easier to build better web apps more quickly and with less code.
- [Typescript](https://www.typescriptlang.org/) - JavaScript with syntax for types.
- [Docker](https://www.docker.com/) - Docker is a platform designed to help developers build, share, and run modern applications. We handle the tedious setup, so you can focus on the code.

## ✅ System Requirements

- [x] Docker: [Install Docker](https://docs.docker.com/get-docker/)
- [x] Node.js: [Install Node.js](https://nodejs.org/en/download/)
- [x] Python: [Install Python](https://www.python.org/downloads/)
- [x] Typescript: [Install Typescript](https://www.typescriptlang.org/download)
- [x] Git: [Install Git](https://git-scm.com/downloads)
- [x] VS Code: [Install VS Code](https://code.visualstudio.com/download)
- [x] Gitlab Account: [Create Gitlab Account](https://git.ajjir.co/users/sign_in)

### Backend Requirements


- [x] after cloning the project create a python virtual environment and install requirements.txt.
- [x] search the entire project for 'TODO: ` and follow them in order.
- [x] after each finished todo try to run the tests with pytest like:`$ pytest`or if you are using vscode just head to the testing tab and run them from there.


### Frontend Requirements

- [x] Customers List Page: A page to display a list of customers
- [x] Customer Form: a form to add a new customer
- [x] Reservations List: A page to display a list of hotel reservations
- [x] Reservation Form: A form to book a room, selecting customer, room and reservation details.
- [x] API Integration: Integrate frontend components with backend API endpoints.

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

- Fork Repo
- Clone Your Forked Repo Locally
- Run Project Using Docker

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