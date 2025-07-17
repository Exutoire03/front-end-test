# Dashboard Utilisateurs – Projet Front-end

Ce projet est une interface web simple permettant d’afficher, rechercher, paginer et ajouter des utilisateurs grâce à l’API publique GoREST.

## Fonctionnalités principales
- **Affichage d’une liste d’utilisateurs** (avatar, nom, email, genre, statut)
- **Recherche instantanée** sur le nom ou l’email
- **Pagination** (20 utilisateurs par page, navigation Précédent/Suivant)
- **Ajout d’un utilisateur** via une modale (popup)
- **Design moderne et responsive** inspiré d’une maquette Figma

---

## Structure du projet

```
front-end-test/
│
├── index.html        # Structure principale de la page (HTML)
├── style.css         # Styles CSS regroupés par composant
├── users.js          # Toute la logique JavaScript (jQuery)
└── README.md         # Ce fichier d’explication
```

---

## Explication des fichiers

### 1. `index.html`
- Contient la structure de la page : sidebar, menu vertical, tableau des utilisateurs, modale d’ajout.
- Les classes sont explicites.
- Le tableau est vide au chargement : les utilisateurs sont injectés dynamiquement par le JS.
- La modale d’ajout utilisateur s’ouvre en cliquant sur le bouton “Ajouter un utilisateur”.

### 2. `style.css`
- Les styles sont organisés par composant (sidebar, main-content, tableau, modale).
- Les couleurs, espacements, arrondis et ombres sont pensés pour un rendu moderne et lisible.
- Le design est responsive (s’adapte sur mobile/tablette).
- Les badges de statut sont colorés (vert pour "active", rouge pour "inactive").

### 3. `users.js`
- Utilise jQuery pour simplifier la manipulation du DOM et les appels API.
- **Chargement des utilisateurs** : appel à l’API GoREST, génération dynamique des lignes du tableau.
- **Recherche** : filtre instantanément les utilisateurs affichés selon le texte saisi.
- **Pagination** : boutons Précédent/Suivant pour naviguer entre les pages (20 utilisateurs/page).
- **Ajout utilisateur** : ouverture d’une modale, envoi d’une requête POST à l’API, ajout immédiat dans le tableau.
- Les variables et fonctions sont nommées de façon explicite et le code est commenté.

---

## Comment utiliser le projet

1. **Ouvre le dossier dans un éditeur de code** (VSCode, Sublime, etc.)
2. **Ouvre `index.html` dans ton navigateur** pour voir l’interface.
3. **Pour ajouter un utilisateur** : clique sur “Ajouter un utilisateur”, remplis le formulaire, puis valide.
   - ⚠️ Pour que l’ajout fonctionne, tu dois mettre ton token GoREST dans le fichier `users.js` à la ligne :
     ```js
     var token = 'VOTRE_TOKEN_ICI';
     ```
   - Tu peux obtenir un token sur https://gorest.co.in/ (inscription gratuite).
4. **Recherche** : tape dans le champ de recherche pour filtrer les utilisateurs affichés.
5. **Pagination** : utilise les boutons Précédent/Suivant pour naviguer dans la liste.

---

## Pour modifier ou personnaliser
- **Changer le nombre d’utilisateurs par page** : modifie la constante `USERS_PER_PAGE` dans `users.js`.
- **Adapter le design** : modifie les couleurs, espacements, etc. dans `style.css`.
- **Ajouter des colonnes ou des infos** : adapte le HTML généré dans `users.js` et le `<thead>` du tableau dans `index.html`.
- **Traduire ou adapter les textes** : modifie directement dans le HTML ou le JS.

---

## Pour aller plus loin
- Ajouter la suppression ou la modification d’un utilisateur (voir la doc GoREST pour les endpoints DELETE/PATCH)
- Ajouter des notifications de succès/erreur plus visuelles
- Utiliser un framework moderne (React, Vue) pour une version plus avancée

---

## Ressources utiles
- [Documentation API GoREST](https://gorest.co.in/)
- [jQuery Documentation](https://api.jquery.com/)
- [Figma pour l’inspiration UI](https://www.figma.com/)

---

