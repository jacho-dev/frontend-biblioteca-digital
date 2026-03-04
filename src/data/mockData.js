export const mockBooks = [
  {
    id: 1,
    title: "Cien años de soledad",
    author: "Gabriel García Márquez",
    year: 1967,
    isbn10: "0307474720",
    isbn13: "978-0307474728",
    cover: "https://static.arteporexcelencias.com/cdn/ff/XxUqz_LDRQx5fN0xx7rXDcgHuQ8x-s3OayaRxVtxIs0/1733879263/public/2024-12/cien%20a%C3%B1os%20de%20soledad.jpg",
    synopsis: "La historia de la familia Buendía a lo largo de siete generaciones en el pueblo ficticio de Macondo.",
    category: "Realismo mágico",
    language: "Español",
    rating: 4.5,
    reviews: [
      { user: "Juan Pérez", comment: "Una obra maestra de la literatura latinoamericana.", rating: 5 },
      { user: "María García", comment: "Fascinante y complejo, vale la pena leerlo varias veces.", rating: 4 }
    ]
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    year: 1949,
    isbn10: "0451524934",
    isbn13: "978-0451524935",
    cover: "https://images.ctfassets.net/qpn1gztbusu2/5KRz6yExBPorPyihWOpRF0/9fca1a021715d4704d5ed3086b406922/1982_Audible.webp?fm=avif&w=1920&q=70",
    synopsis: "Una novela distópica que explora los peligros del totalitarismo y la vigilancia masiva.",
    category: "Ciencia ficción",
    language: "Inglés",
    rating: 4.7,
    reviews: [
      { user: "Carlos Rodríguez", comment: "Aterradoramente relevante en la actualidad.", rating: 5 },
      { user: "Ana Martínez", comment: "Una lectura obligatoria para entender el mundo moderno.", rating: 5 }
    ]
  },
  {
    id: 3,
    title: "El principito",
    author: "Antoine de Saint-Exupéry",
    year: 1943,
    isbn10: "0156012197",
    isbn13: "978-0156012195",
    cover: "https://images3.penguinrandomhouse.com/cover/9788418637728",
    synopsis: "Un cuento filosófico sobre un pequeño príncipe que viaja por diferentes planetas.",
    category: "Fábula",
    language: "Francés",
    rating: 4.8,
    reviews: [
      { user: "Lucía Fernández", comment: "Un libro que todos deberían leer, sin importar la edad.", rating: 5 },
      { user: "Pedro López", comment: "Simple en apariencia pero profundo en su mensaje.", rating: 4 }
    ]
  },
  {
    id: 4,
    title: "Don Quijote de la Mancha",
    author: "Miguel de Cervantes",
    year: 1605,
    isbn10: "8423764495",
    isbn13: "978-8423764492",
    cover: "https://wallpaperaccess.com/full/4704699.jpg",
    synopsis: "Las aventuras de un hidalgo manchego que enloquece leyendo libros de caballerías.",
    category: "Novela",
    language: "Español",
    rating: 4.6,
    reviews: [
      { user: "Roberto Sánchez", comment: "La obra cumbre de la literatura española.", rating: 5 },
      { user: "Elena Díaz", comment: "Divertido y profundo, una joya de la literatura universal.", rating: 4 }
    ]
  },
  {
    id: 5,
    title: "Orgullo y prejuicio",
    author: "Jane Austen",
    year: 1813,
    isbn10: "0141439518",
    isbn13: "978-0141439518",
    cover: "https://imgs.search.brave.com/UVGmTAoZbLcM6vtEi9bWJailsvb1Br9jD9XHgRSBsxw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NTFqeTI3U0tkakwu/anBn",
    synopsis: "La historia de Elizabeth Bennet y su relación con el Sr. Darcy en la Inglaterra del siglo XIX.",
    category: "Romance",
    language: "Inglés",
    rating: 4.4,
    reviews: [
      { user: "Isabel Torres", comment: "Una historia de amor atemporal y personajes memorables.", rating: 5 },
      { user: "Miguel Ángel", comment: "Inteligente y satírico, mucho más que una simple novela romántica.", rating: 4 }
    ]
  }
];

export const mockUsers = [
  {
    id: 1,
    username: "admin",
    password: "admin123",
    role: "admin",
    name: "Administrador",
    email: "admin@biblioteca.com"
  },
  {
    id: 2,
    username: "usuario",
    password: "usuario123",
    role: "user",
    name: "Usuario Normal",
    email: "usuario@biblioteca.com"
  }
];

export const mockRentals = [
  {
    id: 1,
    userId: 2,
    bookId: 1,
    bookTitle: "Cien años de soledad",
    rentalDate: "2024-01-15",
    dueDate: "2024-02-15",
    returnDate: null,
    status: "active",
    extended: false
  },
  {
    id: 2,
    userId: 2,
    bookId: 2,
    bookTitle: "1984",
    rentalDate: "2024-01-20",
    dueDate: "2024-02-20",
    returnDate: "2024-02-18",
    status: "returned",
    extended: false
  }
];
