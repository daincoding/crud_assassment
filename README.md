# CRUD Assessment

CRUD Assessment Project

## Used Tech

- React + Vite (JS)
- Tailwind ( npm install tailwindcss @tailwindcss/vite )
- React-Router ( npm install react-router-dom )
- React Icons ( npm install react-icons )
- Framer Motion ( npm install framer-motion )

## If loading of public test Data doesnt work...

1. Open Console 
2. Enter the following for Testdata:

`
localStorage.setItem("recipes", JSON.stringify([
  {
    id: 1,
    title: "Spaghetti Bolognese",
    category: "Hauptgericht",
    ingredients: [
      "200g Spaghetti",
      "100g Hackfleisch",
      "1 Zwiebel",
      "1 Dose Tomaten",
      "Gewürze"
    ],
    description: "Ein klassisches italienisches Gericht.",
    preparation: "Zwiebel anbraten, Hack dazu, Tomaten rein, köcheln lassen. Nudeln kochen, alles mischen."
  },
  {
    id: 2,
    title: "Käsekuchen",
    category: "Dessert",
    ingredients: [
      "500g Quark",
      "200g Zucker",
      "3 Eier",
      "1 Päckchen Vanillezucker",
      "Mürbeteigboden"
    ],
    description: "Ein cremiger Klassiker unter den Kuchen.",
    preparation: "Alle Zutaten vermengen, auf Mürbeteigboden geben, bei 180°C ca. 50 Minuten backen."
  },
  {
    id: 3,
    title: "Caesar Salad",
    category: "Vorspeise",
    ingredients: [
      "Römersalat",
      "Parmesan",
      "Croutons",
      "Caesar-Dressing",
      "Hähnchenbrust"
    ],
    description: "Ein frischer Salat mit würzigem Dressing.",
    preparation: "Hähnchen anbraten, Salat anrichten, Dressing und Toppings hinzufügen."
  },
  {
    id: 4,
    title: "Gemüsesuppe",
    category: "Suppe",
    ingredients: [
      "Karotten",
      "Lauch",
      "Kartoffeln",
      "Sellerie",
      "Brühe"
    ],
    description: "Wärmende Suppe für kalte Tage.",
    preparation: "Gemüse schneiden, in Brühe ca. 30 Minuten kochen lassen."
  },
  {
    id: 5,
    title: "Pfannkuchen",
    category: "Frühstück",
    ingredients: [
      "250ml Milch",
      "2 Eier",
      "150g Mehl",
      "Prise Salz",
      "Butter zum Braten"
    ],
    description: "Schnell gemacht und vielseitig belegbar.",
    preparation: "Alles verrühren, in Pfanne ausbacken, nach Wunsch füllen."
  },
  {
    id: 6,
    title: "Linsencurry",
    category: "Vegetarisch",
    ingredients: [
      "200g rote Linsen",
      "1 Dose Kokosmilch",
      "Currygewürz",
      "Zwiebel",
      "Knoblauch"
    ],
    description: "Herzhaftes veganes Gericht mit indischem Touch.",
    preparation: "Zwiebel & Knoblauch anbraten, Linsen & Kokosmilch dazu, würzen & köcheln."
  }
]));
`

## Safety Push - Main User Storys

Commit: c5f4287 ( Commit Nr. 5 )

## Optional Bonus

- Favorite Makierung mit React Icons
- Avatar 
- Showcase in HomeScreen
- Reset Button im Homescreen
- Animationen mit Framer Motion