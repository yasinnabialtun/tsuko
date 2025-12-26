export interface Product {
  id: string;
  name: string;
  price: string;
  category: 'Vaso' | 'Lighting' | 'Sculpture';
  image: string;
  shopierUrl: string;
  description: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Tondo Vazo',
    price: '750 ₺',
    category: 'Vaso',
    image: '/images/tondo.png',
    shopierUrl: 'https://www.shopier.com/example-tondo',
    description: 'Minimalist küresel form, mimari sırtlar ile yeniden yorumlandı. Adaçayı yeşili ile huzuru evinize taşır.'
  },
  {
    id: '2',
    name: 'Aura Aydınlatma',
    price: '1.250 ₺',
    category: 'Lighting',
    image: '/images/aura.png',
    shopierUrl: 'https://www.shopier.com/example-aura',
    description: 'Katmanlı dokusu sayesinde ışığı yumuşatarak dağıtır. Kil turuncusu ile sıcak bir atmosfer yaratır.'
  },
  {
    id: '3',
    name: 'Kora Heykel',
    price: '950 ₺',
    category: 'Sculpture',
    image: '/images/kora.png',
    shopierUrl: 'https://www.shopier.com/example-kora',
    description: 'Akışkan formlar ve keskin köşelerin harmonisi. Kirli gül tonuyla dijital sanatın fiziksel hali.'
  },
  {
    id: '4',
    name: 'Brute Vazo',
    price: '820 ₺',
    category: 'Vaso',
    image: '/images/hero.png', // Using hero image as another product for variety
    shopierUrl: 'https://www.shopier.com/example-brute',
    description: 'Brütalist mimariden ilham alan, katman dokusunun en belirgin olduğu imza eserimiz.'
  }
];
