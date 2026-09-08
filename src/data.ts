export type Page = { name: "home" | "veiculos" | "anuncio" | "favoritos" | "checkout" | "login" | "cadastro"; id?: number };

export type Listing = {
  id: number;
  title: string;
  price: string;
  priceNum: number;
  img: string;
  photos?: string[];
  tag?: string;
  tagColor?: string;
  location: string;
  time: string;
  year?: number;
  km?: string;
  fuel?: string;
  transmission?: string;
  color?: string;
  description?: string;
  seller?: string;
  sellerRating?: number;
  brand: string;
  category: string;
};

export const FEATURED: Listing[] = [
  {
    id: 1,
    title: "Honda Civic Touring 2022",
    price: "R$ 149.900",
    priceNum: 149900,
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/63/Honda_Civic_Hybrid_%282022%2C_Europe%29_IAA_2023_1X7A0545_%282%29.jpg/960px-Honda_Civic_Hybrid_%282022%2C_Europe%29_IAA_2023_1X7A0545_%282%29.jpg",
    tag: "Destaque",
    tagColor: "bg-orange-600",
    location: "São Paulo, SP",
    time: "Há 2 horas",
    year: 2022,
    km: "25.000 km",
    fuel: "Gasolina",
    brand: "Honda",
    category: "Carros"
  },
  {
    id: 2,
    title: "Apartamento 2 Quartos com Varanda",
    price: "R$ 380.000",
    priceNum: 380000,
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/36/Living_room_in_apartment_of_Condom%C3%ADnio_do_Edif%C3%ADcio_Zaher%2C_Le_Blond%2C_Rio_de_Janeiro%2C_Brazil.jpg/960px-Living_room_in_apartment_of_Condom%C3%ADnio_do_Edif%C3%ADcio_Zaher%2C_Le_Blond%2C_Rio_de_Janeiro%2C_Brazil.jpg",
    tag: "Oportunidade",
    tagColor: "bg-green-500",
    location: "Rio de Janeiro, RJ",
    time: "Há 5 horas",
    brand: "Imobiliária",
    category: "Imóveis"
  },
  {
    id: 3,
    title: "iPhone 13 Pro Max 256GB",
    price: "R$ 4.500",
    priceNum: 4500,
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b5/Apple_iPhone_13_Pro_and_13_Pro_Max.jpg/960px-Apple_iPhone_13_Pro_and_13_Pro_Max.jpg",
    tag: "Semi-novo",
    tagColor: "bg-blue-500",
    location: "Belo Horizonte, MG",
    time: "Há 1 dia",
    brand: "Apple",
    category: "Eletrônicos"
  },
  {
    id: 4,
    title: "Honda CG 160 Fan 2022",
    price: "R$ 15.900",
    priceNum: 15900,
    img: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=800",
    location: "Curitiba, PR",
    time: "Há 3 dias",
    year: 2022,
    km: "12.000 km",
    fuel: "Gasolina",
    brand: "Honda",
    category: "Motos"
  },
  {
    id: 5,
    title: "Sofá Retrátil 3 Lugares",
    price: "R$ 1.200",
    priceNum: 1200,
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/98/Sof%C3%A1_2.jpg/960px-Sof%C3%A1_2.jpg",
    tag: "Econômico",
    tagColor: "bg-green-500",
    location: "Porto Alegre, RS",
    time: "Há 4 dias",
    brand: "Casa",
    category: "Móveis"
  },
  {
    id: 10,
    title: "PlayStation 5 com controle DualSense",
    price: "R$ 3.499",
    priceNum: 3499,
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/00/PlayStation_5_and_DualSense.jpg/960px-PlayStation_5_and_DualSense.jpg",
    tag: "Novo",
    tagColor: "bg-blue-500",
    location: "São Paulo, SP",
    time: "Há 1 hora",
    brand: "Sony",
    category: "Games"
  }
];

export const VEHICLES: Listing[] = [
  ...FEATURED.filter((item) => item.category === "Carros" || item.category === "Motos"),
  {
    id: 6,
    title: "Jeep Compass Limited 2021",
    price: "R$ 129.900",
    priceNum: 129900,
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/05/2021_Jeep_Compass_Nighteagle_Multiair_4x2.jpg/960px-2021_Jeep_Compass_Nighteagle_Multiair_4x2.jpg",
    location: "Campinas, SP",
    time: "Há 5 dias",
    year: 2021,
    km: "45.000 km",
    fuel: "Diesel",
    brand: "Jeep",
    category: "Carros"
  }
];

export const RECENT: Listing[] = [
  {
    id: 7,
    title: "Yamaha Fazer 250 2021",
    price: "R$ 18.500",
    priceNum: 18500,
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/01/Yamaha_Ys_250_Fazer_Cinza.jpg/960px-Yamaha_Ys_250_Fazer_Cinza.jpg",
    tag: "Novo",
    tagColor: "bg-blue-500",
    location: "São Paulo, SP",
    time: "Há 2 horas",
    year: 2021,
    km: "18.000 km",
    fuel: "Gasolina",
    brand: "Yamaha",
    category: "Motos"
  },
  {
    id: 8,
    title: "Samsung Galaxy S23 Ultra",
    price: "R$ 5.200",
    priceNum: 5200,
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7a/Samsung_S23_Ultra.jpg/960px-Samsung_S23_Ultra.jpg",
    location: "Curitiba, PR",
    time: "Há 5 horas",
    brand: "Samsung",
    category: "Eletrônicos"
  },
  {
    id: 9,
    title: "Monitor AOC 24G4 24\" 180Hz",
    price: "R$ 1.099",
    priceNum: 1099,
    img: "https://cdn.sanity.io/images/hf5b3axp/production/20a4a6e6cd8b1c6989189fe41db3bcf18d8fc511-2000x1500.png?w=1200&fit=max&auto=format",
    tag: "Destaque",
    tagColor: "bg-orange-600",
    location: "Fortaleza, CE",
    time: "Há 1 dia",
    brand: "AOC",
    category: "Informática"
  },
  {
    id: 11,
    title: "Chevrolet Celta 1.4 LS 2012",
    price: "R$ 29.900",
    priceNum: 29900,
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c4/Chevrolet_Celta_1.4_LS_2012_3_puertas.jpg/960px-Chevrolet_Celta_1.4_LS_2012_3_puertas.jpg",
    location: "Fortaleza, CE",
    time: "Há 2 dias",
    year: 2012,
    km: "98.000 km",
    fuel: "Flex",
    brand: "Chevrolet",
    category: "Carros"
  },
  {
    id: 12,
    title: "MacBook Air 13 polegadas",
    price: "R$ 4.299",
    priceNum: 4299,
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c9/Macbook_Air.jpg/960px-Macbook_Air.jpg",
    tag: "Oportunidade",
    tagColor: "bg-green-500",
    location: "São Paulo, SP",
    time: "Há 3 dias",
    brand: "Apple",
    category: "Informática"
  },
  {
    id: 13,
    title: "Air Fryer Mondial 4L",
    price: "R$ 299",
    priceNum: 299,
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d3/Airfryer_Convert.jpg/960px-Airfryer_Convert.jpg",
    location: "Rio de Janeiro, RJ",
    time: "Há 3 dias",
    brand: "Mondial",
    category: "Eletrodomésticos"
  }
];