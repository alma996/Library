1. Install node.js (v12.13.0) - https://nodejs.org/en/download/
2. MysqlDB setup
	* Open xampp and start Mysql module
3. Get code from Github - https://github.com/alma996/Library.git
	* git clone https://github.com/alma996/Library.git
4. Open client folder with following this command:
	* cd client
5. Inside the client folder run following commands:
	* npm install
	* npm start
6. Exit the client folder with command:
	* cd ..
7. Open server folder run following command:
	* cd server
8. Inside the server folder run following commands:
	* npm install
	* node server.js
	* npx sequelize db:create - (for create library database)
	* npx sequelize db:migrate - (for create table in library database)