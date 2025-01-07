# EpiRooms 🏫

EpiRooms est une application web moderne qui permet de visualiser en temps réel l'occupation des salles de l'école. Elle affiche les sessions en cours et à venir pour chaque salle, avec des mises à jour automatiques des statuts et des progressions.

## ✨ Fonctionnalités

- 🔄 Actualisation en temps réel des statuts des salles
- 📊 Barre de progression pour les sessions en cours
- 🌓 Mode sombre/clair
- 📱 Interface responsive
- 🔄 Rechargement automatique lors du changement de jour
- 🏷️ Badges de statut dynamiques (En cours, Bientôt terminé)
- 👥 Affichage du nombre de places par salle

## 🛠️ Technologies Utilisées

- [Next.js 14](https://nextjs.org/) - Framework React avec App Router
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitaire
- [shadcn/ui](https://ui.shadcn.com/) - Composants UI réutilisables
- [TypeScript](https://www.typescriptlang.org/) - Typage statique
- [Lucide Icons](https://lucide.dev/) - Icônes modernes

## 🚀 Installation

1. Clonez le dépôt :
```bash
git clone https://github.com/Victorbriez/EpiRooms.git
cd epirooms
```

2. Installez les dépendances :
```bash
pnpm install
```

3. Lancez le serveur de développement :
```bash
pnpm run dev
```

4. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🏗️ Structure du Projet

```
epirooms/
├── app/
│   ├── actions/
│   │   └── getPlanningAction.ts
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── activity-card.tsx
│   ├── Room.tsx
│   └── ui/
├── hooks/
│   └── usePlanning.ts
├── models/
│   └── Activity.ts
├── types/
│   ├── ActivityInterface.ts
│   └── LocationInterface.ts
└── utils/
    └── activity-status.ts
```

## 🔄 Mises à jour automatiques

L'application met à jour automatiquement :
- Le statut et la progression des sessions toutes les secondes
- La liste des activités toutes les minutes
- Les données de l'API lors du changement de jour

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request
