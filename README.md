# Hour Reporter
### Demo: https://hour-reporter.lkrawczyk.pl/
**Hour Reporter** is a web application for tracking work hours. Users can log their check-in and check-out times, track breaks, and review their work hours history. The project is built using Flask, Bootstrap, and MariaDB.

## Features

- User registration and login
- Recording work hours (check-in, check-out, breaks)
- Viewing work hours history

## Technologies

- Backend: Python, Flask
- Frontend: HTML, CSS (Bootstrap)
- Database: MariaDB

## Getting Started

### Prerequisites

- Python 3.8+
- Pip (Python package manager)

### Installation

1. **Clone the Repository**

    ```bash
    git clone https://github.com/yourusername/hour-reporter.git
    cd hour-reporter
    ```

2. **Create a Virtual Environment**

    ```bash
    python -m venv venv
    source venv/bin/activate  # Linux/Mac
    venv\Scripts\activate     # Windows
    ```

3. **Install Dependencies**

    Make sure to include `PyMySQL` in your `requirements.txt`. If it’s not there, you can manually add it or install it with:

    ```bash
    pip install PyMySQL
    pip install -r requirements.txt
    ```

4. **Configure Environment Variables**

    Create a `.env` file in the project root directory:

    ```plaintext
    SECRET_KEY=your_secret_key
    DATABASE_URI=mysql+pymysql://user:your_password_here@localhost/hour_reporter
    ```

    Replace `your_secret_key` and `your_password_here` with your own secure values.

5. **Set Up the Database**

    Run the following commands to initialize and migrate the database:

    ```bash
    flask db init
    flask db migrate -m "Initial migration"
    flask db upgrade
    ```

6. **Run the Application**

    ```bash
    python run.py
    ```

    Access the application at `http://127.0.0.1:5000`.

### Development Mode

For automatic reloading during development, set the `FLASK_ENV` environment variable:

```bash
export FLASK_ENV=development  # Linux/Mac
set FLASK_ENV=development     # Windows
python run.py
```

## Set up colors palette

```bash
npm install sass --save-dev
npm run sass
```