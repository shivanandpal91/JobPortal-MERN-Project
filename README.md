
"A comprehensive job portal web application designed to streamline the job search process for both job seekers and employers. Built with MERN Techstack.

#📌 Table of Contents

      Features
      Tech Stack
      Installation & Setup
      Run the Application

#🚀 Features

    🔐 Authentication & Authorization
    
        JWT-based login/signup with secure password hashing.
        Protected routes for logged-in users only.
    
    📄 Job Listings
        View all job postings with real-time filtering by:
          Location
          Job role
          Tech stack
          Salary type
          Work experience
          Employment type
          Date of posting
          Save jobs.
    
    🛠 Job Management
        Post new jobs.
        Edit or delete jobs posted by the logged-in user.
        View all jobs posted by the user.
    
    📑 Job Details
        Detailed job description view.
        Apply for jobs directly.
        Download/save job description as PDF.
        Contact recruiter via Nodemailer.
    
    👤 Profile Management
        View and edit profile details.
        Upload profile picture (Base64 format).

#🛠 Tech Stack

      Frontend:
          React.js
          Tailwind CSS
          React Router DOM
          
      Backend:
          Node.js
          Express.js
          
      Database:
          MongoDB Atlas / Compass
          
      Authentication & Security:
          JWT (JSON Web Token)
          
      Other Tools & Libraries:
          Joi (validation)
          Nodemailer


# ⚙️ Installation & Setup

    1️⃣ Clone the repository
    
        git clone https://github.com/shivanandpal91/JobPortal-MERN-Project.git
        cd JobPortal-MERN-Project
    
    2️⃣ Install dependencies
  
        # Backend
          cd job-portal-server
          npm install
        # Frontend
          cd ../jobportal
          npm install
  
    3️⃣ Set up environment variables
    
      Create a .env file inside server/ and add:
      PORT=8080
      DB_USER=your_user_name
      DB_PASS=your_db_pass
      MONGO_CONN=your_mongodb_connection_string
      JWT_SECRET=your_secret_key
      
      # For Nodemailer
      EMAIL_USER=your_email@gmail.com
      EMAIL_PASS=your_google_application_password
  
  4️⃣ Run the application
  
      # Backend
        cd job-portal-server
        npm start
      
      # Frontend
      cd ../jobportal
      npm run dev

The app will run at:

    Frontend → http://localhost:5173
    Backend → http://localhost:8080
