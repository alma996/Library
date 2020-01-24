Libray Project
1. Install node.js (v12.13.0) - https://nodejs.org/en/download/
2. MysqlDB setup
	* Open xampp and start MySQL
3. Open command prompt on Windows or terminal on Linux
4. Get code from Github - https://github.com/alma996/Library.git
	* git clone https://github.com/alma996/Library.git
5. Go to client folder with following this command:
	* cd client
6. Inside the client folder run following commands:
	* npm install (install all necessary dependencies)
	* npm start (run the app in the development mode)
7. Open another tab of  command prompt/terminal
6. Exit the client folder
7. Go to server folder with following command:
	* cd server
8. Inside the server folder run following commands:
	* npm install (install all necessary dependencies)
	* npx sequelize db:create - (create library database)
	* npx sequelize db:migrate - (create all necessary tables in library database)
	* node server.js - (run the server app on port 3000)
9. Open http://localhost:4200 to view it in the browser
10. Login example:
	* Email: alma96@gmail.com
	* Password: alma