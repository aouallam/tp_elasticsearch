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

2- Dans le dossier ./backend executez les commandes suivantes : 

** installation des packages  :

### npm install 
ou
### yarn install

** Exécution des scripts : 

### npm start 
ou
### yarn start

** Exécutez la requête suivante pour permettre l'initialisation de la base de données et l'importation des modèles : \
http://localhost:8081/initialisation-bdd 

3- Dans le dossier ./frontend executez les commandes suivantes : 

** installation des packages  :

### npm install 
ou
### yarn install

** Exécution des scripts : 

### npm start 
ou
### yarn start


## Tester en http les différentes routes de l'application :

* API Insta V2 => http://localhost:8081
* API Elasticsearch  => http://localhost:9200
* Dashboard Kibana => http://lacalhost:5201
* Site Insta V2 => http://localhost:3000

## Fonctionnement de l'application :

* Une inscription puis une authentification vous seront demandées à l'exécution du site qui permettra de lier une publication à un utilisateur
* Une fois connecté vous aller arriver sur la page Feed d'Actus vide l'a où vous aurez la possibilité d'alimenté avec des publications en utilisant le formulaire sur la droite.
* La création d'une publication implique la création dans la base de données insta_v2 et au même temps dans elasticsearch: si l'index post existe on crée le document sinon a créé l'index: cette opération est effectuée dans le fichier ./backend/controllers/posts.controllers.js.
* Les recherches se font via l'URL suivante http://localhost:8081/api/instafee/v1/search/posts?tosearch=word, cette URL contient le nom de l'index et la phrase a chercher
* Les informations de recherche sont affichées sur le site via une barre de recherche et de appèles API


## Pour toute question vous pouvez contacter ( Amine OUALLAM ou nedjma LAOUFI)



