**Simple Symfony Api**

Installation process

1. Download or Clone Project
2. Run composer install
3. Add database configuration .env file
4. Run php bin/console doctrine:database:create to create the database
5. Run php bin/console doctrine:migrations:migrate to execute the migration
6. Run  symfony server:start to run server

Project has no authentication, user and ...

Post data:
https://127.0.0.1:8000/phone_book

{
"name": "test",
"phoneNumber": "0634017959",
"decsription" : "Skrepr"
}


Get data

https://127.0.0.1:8000/phone_book/{id}
