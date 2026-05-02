# MMC Go Drivers — Site vitrine

Site web officiel de **MMC Go Drivers**, l'application mobile dédiée aux professionnels du transport routier : chauffeurs poids lourds, conducteurs de bus, taxis et gestionnaires de flotte.

## À propos du projet

MMC Go Drivers est une application mobile (Flutter) conçue pour répondre aux besoins quotidiens des professionnels de la route. Ce dépôt contient le **site vitrine** développé avec Next.js, qui présente l'application, ses fonctionnalités et ses tarifs.

### Pourquoi cette application ?

Les professionnels du transport font face à des contraintes spécifiques qu'aucun outil grand public ne couvre pleinement : navigation adaptée aux gabarits des véhicules lourds, conformité à la Réglementation Sociale Européenne (RSE), gestion de planning de missions et administration de flotte. MMC Go Drivers centralise tous ces besoins dans une seule application.

---

## Fonctionnalités présentées

| Fonctionnalité | Description |
|---|---|
| **Navigation Intelligente** | Calcul d'itinéraires tenant compte du gabarit du véhicule (hauteur, PTAC) — adapté aux poids lourds, bus et taxis |
| **Planning & Missions** | Visualisation des missions quotidiennes et alertes RSE en temps réel |
| **Gestion de Flotte** | Console d'administration pour gérer véhicules, chauffeurs et générer des feuilles de route PDF |
| **Portefeuille de Documents** | Accès rapide aux permis, attestations et documents véhicules ; export KML/GPX des trajets |
| **Conformité RSE** | Moteur de calcul respectant la Réglementation Sociale Européenne — alertes sur l'amplitude, la conduite continue et le temps journalier |
| **Gestion d'Équipe** | Comptes chauffeurs sécurisés et tableau de bord interactif jour/semaine pour toute la flotte |

---

## Pages du site

- `/` — Page d'accueil (hero, présentation des fonctionnalités, aperçu des tarifs, téléchargement)
- `/tarifs` — Grille tarifaire détaillée
- `/politique-de-confidentialite` — Politique de confidentialité
- `/conditions-generales` — Conditions Générales d'Utilisation

---

## Offres tarifaires

| Plan | Prix | Cible |
|---|---|---|
| **Gratuit** | 0 € / mois | Découverte sans engagement |
| **Expert** | 2,99 € / mois | Conducteur indépendant |
| **Professionnel** | 15,99 € / mois | Conducteur gérant sa propre activité |
| **Diamant** | 399 € / mois | Entreprises de transport et gestionnaires de flotte |

---

## Stack technique

- **Site vitrine** : [Next.js](https://nextjs.org) (App Router), TypeScript, Tailwind CSS
- **Application mobile** : Flutter, OpenStreetMap

---

## Lancer le projet en local

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans le navigateur.

## Build de production

```bash
npm run build
npm run start
```
