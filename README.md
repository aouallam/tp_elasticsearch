# TP Elasticsearch ecole isitech 2021

## Près requis
Pour ce projet vous aurez besoin de : \
    1- Docker \
    2- Node.js \
    3- MySql 

## Récupération du projet

#### git clone https://github.com/aouallam/tp_elasticsearch.git

Une fois l'importation terminée il est necssaire de remplir les bonnes informations de connexion a la base de données (host, user, password) dans le dossier ./backend/config/configs.js

## Mise en place du projet (via invite de commande)

1- Dans le dossier racine executez la commande suivante : 

### docker-compose up

2- Dans le dossier ./backend executez les commandes suivantes : \

** installation des packages  :

### npm install 
ou
### yarn install

** Exécution des scripts : 

### npm start 
ou
### yarn start

** Exécutez la requête suivante pour permettre l'initialisation de la base de données et l'importation des modèles : \
http://localhost:8081/initialisation-bdd \

3- Dans le dossier ./frontend executez les commandes suivantes : \

** installation des packages  :

### npm install 
ou
### yarn install

** Exécution des scripts : 

### npm start 
ou
### yarn start



