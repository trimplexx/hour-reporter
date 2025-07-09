The **Hour Reporter** application is an advanced tool for monitoring professional and academic activities. Built with the **Flask** framework in Python and modern frontend technologies, it offers an intuitive interface for recording and analyzing time spent on work and study. The project was designed with ease of use and automation of reporting processes in mind.


The application provides a set of features that facilitate time management in both professional and educational contexts. A detailed description of its capabilities is presented below.

### Core Features

#### For the User

* **Registration and Authentication**: Secure account creation and login using **bcrypt** for password hashing. The system validates data correctness, such as email format and password complexity.
* **Work Time Logging**:
    * **Real-Time Timer**: The ability to start and stop work with a single click, which automatically records the current time.
    * **Manual Hour Entry**: An option to manually add work entries for a specific day and time range, with validation to prevent overlapping entries.
* **Study Schedule Management**:
    * **Interactive Calendar**: All entries (work, classes, holidays) are visualized on a calendar (**FullCalendar**) with week and day views.
    * **Adding Classes**: The ability to add classes for single days or entire date ranges (e.g., "every Monday from-to").
    * **Detailed Fields**: The user can add optional information, such as instructor's name, room number, week type (even/odd), or class type (lecture, lab).
* **Work Summary**:
    * **Monthly Report**: Access to a detailed work summary for a selected month and year.
    * **Highlighting Days Off**: Weekends and Polish public holidays are automatically marked in the report.
    * **Earnings Calculation**: The ability to enter an hourly rate to dynamically calculate earnings for individual days and the entire month.
    * **Data Export**: A feature to export the generated summary to **PDF** and **Excel** files, preserving formatting and calculations.
* **Editing and Deleting Entries**: Every calendar entry (both work and study) can be edited or deleted directly from the user interface.

### Technical Aspects

* **Backend**: Built on the lightweight **Flask** framework. Business logic is separated into dedicated modules (e.g., `auth.py`, `summary.py`, `routes.py`).
* **Frontend**: The user interface uses **HTML5**, **Bootstrap 5** for styling, and **Sass** for creating custom color palettes. Dynamic features like the calendar, forms, and modals are implemented in **vanilla JavaScript (ESM)**.
* **Database**: The system uses a relational database (likely **MariaDB**, according to `README.md`) managed by the **SQLAlchemy ORM**. Database schema migrations are handled by the **Flask-Migrate** (Alembic) tool.
* **Authentication**: User sessions are managed by **Flask-Login**. Passwords are securely stored using the **bcrypt** library.
* **Automation and Deployment**: The deployment process is automated with **GitHub Actions**, which updates the application on the server and restarts the associated `systemd` service after every change in the `master` branch.
