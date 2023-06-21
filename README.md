# Mise en place

Une fois le repo cloné avec `git clone https://github.com/CelienFiorelli/GameSocket.git`
Faire un `npm i` pour récuperer toute les dépendances du projets

## Variable

L'ip de l'API est à mettre dans :
- `src/utils/api.ts` ligne 6, (port 5000 actuellement)
- `backend/index.js` ligne 12, indiquer l'ip de l'API mongo
- `src/components/SocketProvider.js` ligne 16, (avec le port 5000 actuellement)

Créer le fichier `backend/config.json` et mettre dedans la connectionString de mongodb exemple:
```
{
    "connectString": ""             
}
```

##  Information

Pour aller sur le site mettre l'ip et le port react (3000 actuellement) au lieu de localhost

## Lancement du projet

Pour le lancer utiliser `npm start`
