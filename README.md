## Project Setup Documentation

This guide will walk you through setting up and running the project. The project consists of a **FastAPI backend** and a **React frontend**. The FastAPI backend stores tutor information, and the frontend allows students to input their details to find a matching tutor.

### Prerequisites

Ensure you have the following installed:

1. **Python 3.8+**: Required to run the FastAPI backend.
   - [Download Python](https://www.python.org/downloads/)
2. **Node.js and npm**: Required to run the React frontend.
   - [Download Node.js](https://nodejs.org/en/download/)
3. **Git**: Optional, but useful for cloning the project repository.
   - [Download Git](https://git-scm.com/downloads)

---

### Step 1: Download/Clone the Project

If you received the project folder, unzip it or clone the repository from GitHub (if applicable).

To clone from GitHub, run:

```bash
git clone <repository_url>
cd <project_directory>
```

---

### Step 2: Backend Setup (FastAPI)

1. **Create a virtual environment**:
   This is optional but recommended to avoid package conflicts.

   On macOS/Linux:

   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

   On Windows:

   ```bash
   python -m venv venv
   venv\Scripts\activate
   ```

2. **Install backend dependencies**:

   Run the following command to install the necessary Python packages:

   ```bash
   pip install -r backend/requirements.txt
   ```

3. **Run the FastAPI server**:

   Navigate to the backend directory and run the FastAPI server:

   ```bash
   cd backend
   watchmedo auto-restart --pattern "*.py" --recursive --signal SIGTERM python main.py
   ```

   This will start the FastAPI backend on `http://127.0.0.1:8100`.

   You can test that the backend is running by visiting the FastAPI documentation in your browser:

   ```
   http://127.0.0.1:8100/docs
   ```

---

### Step 3: Frontend Setup (React)

1. **Install frontend dependencies**:

   Navigate to the `frontend` directory and install the necessary JavaScript packages:

   ```bash
   cd frontend
   npm install
   ```

   This command installs all the required React packages specified in `package.json`.

2. **Run the React frontend**:

   Once the packages are installed, start the React development server by running:

   ```bash
   npm start
   ```

   This will open the React frontend in your default browser at `http://localhost:3000`.

---

### Step 4: Using the Application

1. **Fill out the form**:

   Once the React frontend is running, you will see a form where you can enter:
   - First Name
   - Last Name
   - Level (100, 200, 300, etc.)
   - Subject (Math, Physics, etc.)

   After filling out the form, click the **Find Tutor** button.

2. **Backend Matching**:

   The frontend will send the student’s details to the FastAPI backend, which will return a randomly selected tutor that matches the level and subject. The matched tutor’s details will then be displayed on the screen.

---

### Step 5: Troubleshooting

- If the React frontend fails to connect to the backend, ensure both are running on the correct ports:
  - **Backend**: `http://127.0.0.1:8100`
  - **Frontend**: `http://localhost:3000`

- If there are any missing dependencies, use the following commands to manually install them:
  - Backend: `pip install <package_name>`
  - Frontend: `npm install <package_name>`

---

### Step 6: Stopping the Servers

- To stop the backend server, press `Ctrl + C` in the terminal running the FastAPI server.
- To stop the React frontend, press `Ctrl + C` in the terminal running the React development server.

---

### Summary of Commands

1. **Clone and setup**:
   ```bash
   git clone <repository_url>
   cd <project_directory>
   ```

2. **Backend setup**:
   ```bash
   cd backend
   python3 -m venv venv
   source venv/bin/activate  # or venv\Scripts\activate on Windows
   pip install -r requirements.txt
   uvicorn main:app --reload --port 8100
   ```

3. **Frontend setup**:
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Access the application**:
   - Frontend: `http://localhost:3000`
   - Backend docs: `http://127.0.0.1:8100/docs`
