# Ce projet est une Todo Web application React simple qui utilise json-server pour simuler une API RESTful et axios pour les requêtes HTTP.
## Prérequis
### Assurez-vous d'avoir les logiciels suivants installés sur votre machine :

Node.js (version 14.x ou plus)
npm ou yarn pour la gestion des packages
Installation
## Clonez le dépôt :

bash
Copier le code
git clone https://github.com/votre-utilisateur/votre-repo.git
cd votre-repo

## Installez les dépendances :
1. Si vous utilisez pnpm :

bash
Copier le code
pnpm install

2. Lancer json-server :

bash
Copier le code
npx json-server server/db.json --port 3000
Cela démarre un serveur JSON sur http://localhost:3000, où db.json est le fichier contenant vos données.

3. Lancer l'application React

## Démarrez l'application React :

- Si vous utilisez pnpm :

bash
Copier le code
pnpm dev


## Configuration
db.json : Ce fichier contient les données simulées pour l'API.
src/ : Contient le code source de l'application React.

## Fonctionnalités
- Ajouter, mettre à jour, et supprimer des todos en utilisant une interface React.
- Utilisation de axios pour gérer les requêtes HTTP.
- Validation des formulaires avec react-hook-form et zod.


## Contributions
Les contributions sont les bienvenues ! Veuillez ouvrir une pull request ou soumettre des issues si vous avez des suggestions ou trouvez des bugs.