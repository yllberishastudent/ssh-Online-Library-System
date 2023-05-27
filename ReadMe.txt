Aplikacioni Online Library

Aplikacioni i Katalogut të Librave Online është një aplikacion web që lejon përdoruesit të lexojnë libra online.

Veçoritë
Regjistrimi dhe autentikimi i përdoruesit
Shfletimi i librave sipas kategorive ose kërkimi i librave të veçantë.
Shfaqja e detajeve të librit, përfshirë autorin, vitin e botimit dhe përshkrimin.
Menaxhimi i profilit të përdoruesit dhe shikimi i historikut të librave të marrë.
...

Teknologjitë e Përdorura
Node.js
Express
React.js
MySQL
Sequelize (ORM)

Kërkesat Paraprake
Para se të ekzekutoni këtë projekt, sigurohuni që të keni të instaluar:

Node.js: Mund ta shkarkoni nga faqja zyrtare e Node.js: https://nodejs.org
MySQL: Sigurohuni që ta keni të instaluar dhe që ta keni duke e ekzekutuar MySQL.

Instalimi

Klononi repositorin:

git clone https://github.com/yllberisha/ssh-Online-Library-System.git
Navigoni në direktorinë e projektit:

cd ssh-Online-Library-System

Instaloni paketat e serverit:

cd server
npm install

Instaloni paketat e klientit (frontend):

cd ../client
npm install
Konfiguroni lidhjen me bazën e të dhënave:

Hapni server/config/config.js.
Krijoni një database me emrin "OnlineLibrary"
Përditësoni fushat host, port, username, password, dhe database me të dhënat e lidhjes suaj MySQL.

Inicializoni bazën e të dhënave:

cd ../server
node synchronise.js


Startoni serverin dhe serverin e zhvillimit të klientit (frontend):

Në direktorinë server, ekzekutoni: npm start
Në direktorinë client, ekzekutoni: npm start

Hapni shfletuesin tuaj web dhe vizitoni http://localhost:3000 për të hyrë në Aplikacionin e Katalogut të Librave Online.

Kontributi
Kontributet janë të mirëpritura! Nëse zbuloni ndonjë problem ose keni sugjerime për përmirësim, ju lutemi krijoni një problem të ri ose paraqisni një kërkesë për të nxjerrë ndryshime (pull request).
