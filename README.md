# 🍽️ Krantic – Application web de gestion de restaurant

Projet de fin d'études (PFE) – Développement digital, option Web Full Stack (OFPPT, 2025).

Application web full stack permettant à un restaurant de digitaliser la réservation de tables, la consultation du menu et la prise de commande en ligne.

## 📸 Aperçu

![Krantic – menu et commande](https://chaimaeoutaleb.github.io/portfolio/images/krantic.jpg)

## ✨ Fonctionnalités

- **Menu dynamique** : liste des plats et page de détail produit
- **Panier et commande** : ajout au panier, validation de commande, suivi du statut
- **Paiement** : intégration PayPal (mode sandbox)
- **Réservation de tables** avec formulaire dédié
- **Authentification** des utilisateurs (Clerk)
- **Formulaire de contact** et messagerie client
- Interface **responsive** (Tailwind CSS, Material UI)

## 🛠️ Stack technique

| Couche | Technologies |
|---|---|
| Front-end | React 19, Vite, React Router, Tailwind CSS, Material UI, Axios |
| Back-end | Laravel 12 (PHP 8.2), API REST |
| Base de données | MySQL |
| Paiement / Auth | PayPal JS SDK, Clerk |

## 📁 Structure

```
krantic-restaurant/
├── backend/    # API Laravel (routes/api.php, contrôleurs, migrations)
└── frontend/   # Application React (Vite)
```

## 🔌 Endpoints principaux (API)

| Méthode | Route | Description |
|---|---|---|
| GET | `/api/menu` | Liste des plats |
| GET | `/api/menu/{id}` | Détail d'un plat |
| POST | `/api/orders` | Créer une commande |
| GET | `/api/orders/{order}` | Détail d'une commande |
| PATCH | `/api/orders/{order}/payment` | Mettre à jour le statut de paiement |
| POST | `/api/reservations` | Réserver une table |
| POST | `/api/contact` | Envoyer un message |

## 🚀 Installation en local

**Prérequis** : PHP 8.2+, Composer, Node.js 18+, MySQL

### Back-end
```bash
cd backend
composer install
cp .env.example .env      # renseigner la connexion MySQL
php artisan key:generate
php artisan migrate
# optionnel : importer le menu de démo database/krantic_products.sql dans MySQL
php artisan serve
```

### Front-end
```bash
cd frontend
npm install
cp .env.example .env      # renseigner les clés Clerk et PayPal (sandbox)
npm run dev
```

## 👩‍💻 Auteure

**Chaimae Outaleb** – Développeuse Web Full Stack Junior
[Portfolio](https://chaimaeoutaleb.github.io/portfolio/) · [LinkedIn](https://www.linkedin.com/in/chaimae-outaleb-dev/) · [GitHub](https://github.com/chaimaeoutaleb)
