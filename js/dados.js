const CATEGORIAS = [
  ['c', 'Compactação'],
  ['e', 'Energia e ar'],
  ['b', 'Concretagem'],
  ['m', 'Marteletes e demolidores'],
  ['f', 'Ferramentas elétricas'],
  ['s', 'Corte e serras'],
  ['j', 'Jardim, solo e bombas'],
  ['a', 'Andaimes e escadas'],
  ['k', 'Containers']
];

const WHATSAPP = '5535998219921';

const EQUIPAMENTOS = [
  {
    "c": "c",
    "n": "Compactador de solo",
    "d": "Husqvarna LT6005",
    "i": "assets/equipamentos/equipamento-01.webp"
  },
  {
    "c": "c",
    "n": "Compactador de solo",
    "d": "Weber SRV620",
    "i": "assets/equipamentos/equipamento-02.webp"
  },
  {
    "c": "c",
    "n": "Placa vibratória",
    "d": "CSM PV90",
    "i": "assets/equipamentos/equipamento-03.webp"
  },
  {
    "c": "c",
    "n": "Placa vibratória",
    "d": "Vibromak VK-85",
    "i": "assets/equipamentos/equipamento-04.webp"
  },
  {
    "c": "s",
    "n": "Cortadora de piso (asfalto e concreto)",
    "d": "CSM SP 125",
    "i": "assets/equipamentos/equipamento-05.webp"
  },
  {
    "c": "s",
    "n": "Cortadora de piso (asfalto e concreto)",
    "d": "Buffalo BFG500",
    "i": "assets/equipamentos/equipamento-06.webp"
  },
  {
    "c": "e",
    "n": "Gerador a gasolina",
    "d": "Briggs & Stratton Elite 8000, 10,5 kVA",
    "i": "assets/equipamentos/equipamento-07.webp"
  },
  {
    "c": "e",
    "n": "Gerador",
    "d": "Toyama TG3100CXR, 3,1 kVA bivolt",
    "i": "assets/equipamentos/equipamento-08.webp"
  },
  {
    "c": "e",
    "n": "Gerador",
    "d": "Toyama TG8000CXER, 7,2 kVA bivolt",
    "i": "assets/equipamentos/equipamento-09.webp"
  },
  {
    "c": "e",
    "n": "Gerador",
    "d": "CSM GT8000, 8,5 kVA bivolt",
    "i": "assets/equipamentos/equipamento-10.webp"
  },
  {
    "c": "e",
    "n": "Gerador",
    "d": "Toyama TG2800CX, 2,5 kVA bivolt",
    "i": "assets/equipamentos/equipamento-11.webp"
  },
  {
    "c": "j",
    "n": "Perfurador de solo",
    "d": "Kawashima profissional, 61,5cc",
    "i": "assets/equipamentos/equipamento-12.webp"
  },
  {
    "c": "j",
    "n": "Perfurador de solo",
    "d": "Vulcan profissional, 61,5cc",
    "i": "assets/equipamentos/equipamento-13.webp"
  },
  {
    "c": "j",
    "n": "Roçadeira",
    "d": "Buffalo BFG 43SB",
    "i": "assets/equipamentos/equipamento-14.webp"
  },
  {
    "c": "j",
    "n": "Roçadeira",
    "d": "Stihl FS55",
    "i": "assets/equipamentos/equipamento-15.webp"
  },
  {
    "c": "j",
    "n": "Soprador costal",
    "d": "Stihl BR420",
    "i": "assets/equipamentos/equipamento-16.webp"
  },
  {
    "c": "b",
    "n": "Motovibrador",
    "d": "Toyama TPU65-XP, 6,5 HP",
    "i": "assets/equipamentos/equipamento-17.webp"
  },
  {
    "c": "b",
    "n": "Motovibrador",
    "d": "Buffalo BFG, 6,5 HP",
    "i": "assets/equipamentos/equipamento-18.webp"
  },
  {
    "c": "j",
    "n": "Bomba submersível de mangote",
    "d": "CSM, 3 pol, 6 metros",
    "i": "assets/equipamentos/equipamento-19.webp"
  },
  {
    "c": "j",
    "n": "Bomba submersível de mangote",
    "d": "Toyama, 3 pol, 6 metros",
    "i": "assets/equipamentos/equipamento-20.webp"
  },
  {
    "c": "s",
    "n": "Riscadeira de piso e porcelanato",
    "d": "Cortag, 90 cm",
    "i": "assets/equipamentos/equipamento-21.webp"
  },
  {
    "c": "j",
    "n": "Bomba costal manual",
    "d": "Nove 54, 20 litros",
    "i": "assets/equipamentos/equipamento-22.webp"
  },
  {
    "c": "m",
    "n": "Martelete combinado rotativo",
    "d": "DeWalt D25133B2, 800W, SDS Plus",
    "i": "assets/equipamentos/equipamento-23.webp"
  },
  {
    "c": "m",
    "n": "Martelete combinado rotativo",
    "d": "Makita HR2470, 800W, SDS Plus",
    "i": "assets/equipamentos/equipamento-24.webp"
  },
  {
    "c": "m",
    "n": "Martelete combinado rotativo",
    "d": "Bosch GBH 2-24, 800W, SDS Plus",
    "i": "assets/equipamentos/equipamento-25.webp"
  },
  {
    "c": "m",
    "n": "Martelete rotativo",
    "d": "Makita HR32FCT, 850W, 6 kg, SDS Plus",
    "i": "assets/equipamentos/equipamento-26.webp"
  },
  {
    "c": "m",
    "n": "Martelete rotativo",
    "d": "Einhell TE-RH 38E, 1050W, 6 kg, SDS Max",
    "i": "assets/equipamentos/equipamento-27.webp"
  },
  {
    "c": "m",
    "n": "Martelo demolidor",
    "d": "Einhell TE-DH1027, 1500W, 10 kg, SDS Max",
    "i": "assets/equipamentos/equipamento-28.webp"
  },
  {
    "c": "m",
    "n": "Martelo rompedor",
    "d": "Super Bull R10, 1500W, 10 kg, SDS Max",
    "i": "assets/equipamentos/equipamento-29.webp"
  },
  {
    "c": "m",
    "n": "Martelo demolidor",
    "d": "Einhell TE-DH50, 1700W, 18 kg, hexagonal",
    "i": "assets/equipamentos/equipamento-30.webp"
  },
  {
    "c": "m",
    "n": "Martelo demolidor",
    "d": "Super Bull R16, 1750W, sextavado",
    "i": "assets/equipamentos/equipamento-31.webp"
  },
  {
    "c": "m",
    "n": "Martelo demolidor",
    "d": "Bosch GSH 16-28, 1700W, sextavado",
    "i": "assets/equipamentos/equipamento-32.webp"
  },
  {
    "c": "m",
    "n": "Martelo demolidor",
    "d": "Bosch GSH 27 VC, 2000W, 29,5 kg",
    "i": "assets/equipamentos/equipamento-33.webp"
  },
  {
    "c": "b",
    "n": "Vibrador de concreto",
    "d": "Nagano, 1500W, mangote de 1,5 m",
    "i": "assets/equipamentos/equipamento-34.webp"
  },
  {
    "c": "b",
    "n": "Vibrador de concreto",
    "d": "Bosch GVC 22EX, 2200W, mangote de 3,5 m",
    "i": "assets/equipamentos/equipamento-35.webp"
  },
  {
    "c": "b",
    "n": "Vibrador de concreto",
    "d": "Vonder VCV1600, 1600W",
    "i": "assets/equipamentos/equipamento-36.webp"
  },
  {
    "c": "e",
    "n": "Máquina de solda inversora",
    "d": "WAP MMA-250, 120A",
    "i": "assets/equipamentos/equipamento-37.webp"
  },
  {
    "c": "s",
    "n": "Serra circular",
    "d": "Makita 5902B, 235 mm, 1650W",
    "i": "assets/equipamentos/equipamento-38.webp"
  },
  {
    "c": "s",
    "n": "Serra circular",
    "d": "Bosch GKS 150, 184 mm, 1500W",
    "i": "assets/equipamentos/equipamento-39.webp"
  },
  {
    "c": "s",
    "n": "Serra mármore",
    "d": "Bosch GDC 14-40, 1450W",
    "i": "assets/equipamentos/equipamento-40.webp"
  },
  {
    "c": "s",
    "n": "Serra mármore",
    "d": "Makita 4100NH3ZX2, 1300W",
    "i": "assets/equipamentos/equipamento-41.webp"
  },
  {
    "c": "s",
    "n": "Serra mármore",
    "d": "DeWalt DW862, 125 mm",
    "i": "assets/equipamentos/equipamento-42.webp"
  },
  {
    "c": "s",
    "n": "Esmerilhadeira angular",
    "d": "Bosch GWS 25-230, 9 pol, 2500W",
    "i": "assets/equipamentos/equipamento-43.webp"
  },
  {
    "c": "s",
    "n": "Esmerilhadeira angular",
    "d": "DeWalt DWE491, 7 pol, 2200W",
    "i": "assets/equipamentos/equipamento-44.webp"
  },
  {
    "c": "s",
    "n": "Esmerilhadeira angular",
    "d": "Makita M9510B, 4 1/2 pol, 850W",
    "i": "assets/equipamentos/equipamento-45.webp"
  },
  {
    "c": "f",
    "n": "Lixadeira orbital",
    "d": "Makita BO4557, 180W",
    "i": "assets/equipamentos/equipamento-46.webp"
  },
  {
    "c": "f",
    "n": "Plaina",
    "d": "Makita KP0800, 82 mm",
    "i": "assets/equipamentos/equipamento-47.webp"
  },
  {
    "c": "e",
    "n": "Compressor de ar",
    "d": "Einhell Airtech Euro 210/24, 2 HP",
    "i": "assets/equipamentos/equipamento-48.webp"
  },
  {
    "c": "e",
    "n": "Compressor de ar",
    "d": "Chiaperini MC 7.6/21, 2 HP",
    "i": "assets/equipamentos/equipamento-49.webp"
  },
  {
    "c": "e",
    "n": "Compressor de ar",
    "d": "Motomil CMI 8,7/24, 2 HP, 24 litros",
    "i": "assets/equipamentos/equipamento-50.webp"
  },
  {
    "c": "f",
    "n": "Politriz",
    "d": "DeWalt DWP849X, 9 pol, 1250W",
    "i": "assets/equipamentos/equipamento-51.webp"
  },
  {
    "c": "f",
    "n": "Furadeira de velocidade variável",
    "d": "Makita FS4000, 570W, reversível",
    "i": "assets/equipamentos/equipamento-52.webp"
  },
  {
    "c": "f",
    "n": "Furadeira de impacto",
    "d": "Bosch GSB 550 RE, 550W",
    "i": "assets/equipamentos/equipamento-53.webp"
  },
  {
    "c": "f",
    "n": "Furadeira de impacto",
    "d": "Makita HP1640, 760W",
    "i": "assets/equipamentos/equipamento-54.webp"
  },
  {
    "c": "j",
    "n": "Cortador de grama elétrico",
    "d": "Trapp SI-350, 1300W",
    "i": "assets/equipamentos/equipamento-55.webp"
  },
  {
    "c": "f",
    "n": "Pintura airless",
    "d": "Menegotti MMA900, 900W",
    "i": "assets/equipamentos/equipamento-56.webp"
  },
  {
    "c": "f",
    "n": "Parafusadeira a bateria",
    "d": "DeWalt DCD700LC1, 12V",
    "i": "assets/equipamentos/equipamento-57.webp"
  },
  {
    "c": "f",
    "n": "Parafusadeira a bateria",
    "d": "Makita DHP482, 18V",
    "i": "assets/equipamentos/equipamento-58.webp"
  },
  {
    "c": "a",
    "n": "Escada extensiva de fibra",
    "d": "12 degraus, 6 metros",
    "i": "assets/equipamentos/equipamento-59.webp"
  },
  {
    "c": "a",
    "n": "Escada extensiva de alumínio",
    "d": "8 degraus, 4 metros",
    "i": "assets/equipamentos/equipamento-60.webp"
  },
  {
    "c": "a",
    "n": "Escada extensiva de alumínio",
    "d": "13 degraus, 9 metros",
    "i": "assets/equipamentos/equipamento-61.webp"
  },
  {
    "c": "b",
    "n": "Betoneira profissional",
    "d": "Sorrag, 400 litros",
    "i": "assets/equipamentos/equipamento-62.webp"
  },
  {
    "c": "b",
    "n": "Betoneira profissional",
    "d": "Menegotti, 400 litros",
    "i": "assets/equipamentos/equipamento-63.webp"
  },
  {
    "c": "a",
    "n": "Talha manual",
    "d": "Vonder, 500 kg",
    "i": "assets/equipamentos/equipamento-64.webp"
  },
  {
    "c": "e",
    "n": "Transformador 110/220V",
    "d": "4000 VA",
    "i": "assets/equipamentos/equipamento-65.webp"
  },
  {
    "c": "a",
    "n": "Plataforma para andaime tubular",
    "d": "0,33 x 1,00 m",
    "i": "assets/equipamentos/equipamento-66.webp"
  },
  {
    "c": "a",
    "n": "Plataforma para andaime tubular",
    "d": "0,33 x 1,50 m",
    "i": "assets/equipamentos/equipamento-67.webp"
  },
  {
    "c": "a",
    "n": "Andaime tubular",
    "d": "1,5 x 1,0 m",
    "i": "assets/equipamentos/equipamento-68.webp"
  },
  {
    "c": "a",
    "n": "Andaime tubular",
    "d": "1,0 x 1,0 m",
    "i": "assets/equipamentos/equipamento-69.webp"
  },
  {
    "c": "a",
    "n": "Trava diagonal",
    "d": "Para andaimes de 1,00 x 1,00",
    "i": "assets/equipamentos/equipamento-70.webp"
  },
  {
    "c": "a",
    "n": "Sapata regulável",
    "d": "Para andaimes",
    "i": "assets/equipamentos/equipamento-71.webp"
  },
  {
    "c": "a",
    "n": "Trava diagonal",
    "d": "Para andaimes de 1,50 x 1,00",
    "i": "assets/equipamentos/equipamento-72.webp"
  },
  {
    "c": "a",
    "n": "Rodízio para andaime",
    "d": "",
    "i": "assets/equipamentos/equipamento-73.webp"
  },
  {
    "c": "k",
    "n": "Banheiro container para obra",
    "d": "",
    "i": "assets/equipamentos/equipamento-74.webp"
  },
  {
    "c": "k",
    "n": "Container para obra",
    "d": "2,0 x 3,0 x 2,0 m",
    "i": "assets/equipamentos/equipamento-75.webp"
  }
];
