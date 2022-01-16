# statify

To run the frontend and backend, it is necessary to have a mongodb server created.

In the backend folder, create a .env file with DB_URL=\<YOUR DATABASE CONNECTION STRING\>

In the frontend folder, create a .env file with VITE_BACKEND_URL=\<YOUR BACKEND URL (USUALLY http://localhost:3000)>

Finally run ``npm install``, ``npm run build`` and ``npm run start`` inside both frontend and backend.
