# GymKhana
A Website managing Student Gymkhana Activities.

## Features
- Allows Students to Digitally do Club Participation, Budget Submission and Structures the Approval Process.
- Uses MongoDB for Backend to store, retrieve, and manipulate data

## Instructions to run app

1. **Install all the dependencies**

```bash
npm i
```

2. **Upload the json objects to the MongoDB Database**

Navigate to the seeds folder and run the following commands
```bash
cd seeds
node seed_clubs.js
node seed_images.js
node seed_request.js
node seed_users.js
```

3. **Hosting the Website:** Navigate back to the parent folder and run the app.js file:
```bash 
nodemon app.js
```

3. **Accessing the Website:** Open a browser and paste the following link:
```bash 
http://localhost:4040/
```
