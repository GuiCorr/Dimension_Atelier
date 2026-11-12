

export interface Product {
  id: string;
  nome: string;
  preco: string;
  categoria: string;
  descricao: string;
  cores: { nome: string; hex: string }[];
  imagens: string[];
}

export const PRODUTOS: Record<string, Product> = {
  '1': {
    id: '1',
    nome: 'Polvo 3D Pernas Articuladas',
    preco: '1,99 €',
    categoria: 'Brinquedos',
    descricao: 'Polvo 3D com pernas articuladas para brincar e explorar.',
    cores: [
      { nome: 'Vermelho', hex: '#ef4444' },
      { nome: 'Preto', hex: '#18181b' },
      { nome: 'Branco', hex: '#f4f4f5' },
      { nome: 'Cinzento', hex: '#71717a' },
      { nome: 'Verde', hex: '#10b981' },
      { nome: 'Azul', hex: '#2563eb' },
      { nome: 'Amarelo', hex: '#f59e0b' },
    ],
    imagens: [
      '/images/polvo1.jpeg',
      '/images/polvo2.jpeg',
      '/images/polvo3.jpeg',
    ],
  },
  '2': {
    id: '2',
    nome: 'Vaso Decorativo Geométrico',
    preco: '89,90 €',
    categoria: 'Decoração',
    descricao: 'Vaso decorativo com design geométrico, perfeito para adicionar um toque moderno ao teu espaço.',
    cores: [
      { nome: 'Vermelho', hex: '#ef4444' },
      { nome: 'Preto', hex: '#18181b' },
      { nome: 'Branco', hex: '#f4f4f5' },
      { nome: 'Cinzento', hex: '#71717a' },
      { nome: 'Verde', hex: '#10b981' },
      { nome: 'Azul', hex: '#2563eb' },
      { nome: 'Amarelo', hex: '#f59e0b' },
    ],
    imagens: [
      '/images/vaso1.jpeg',
      '/images/vaso2.jpeg',
      '/images/vaso3.jpeg',
    ],
  },
  '3': {
    id: '3',
    nome: 'Coruja Decorativo Minimalista',
    preco: '69,99 €',
    categoria: 'Decoração',
    descricao: 'Coruja decorativa com design minimalista, perfeita para adicionar um toque moderno ao teu espaço.',
    cores: [
      { nome: 'Vermelho', hex: '#ef4444' },
      { nome: 'Preto', hex: '#18181b' },
      { nome: 'Branco', hex: '#f4f4f5' },
      { nome: 'Cinzento', hex: '#71717a' },
      { nome: 'Verde', hex: '#10b981' },
      { nome: 'Azul', hex: '#2563eb' },
      { nome: 'Amarelo', hex: '#f59e0b' },
    ],
    imagens: [
      '/images/Coruja1.jpeg',
      '/images/Coruja2.jpeg',
      '/images/Coruja3.jpeg',
      '/images/Coruja4.jpeg',
    ],
  },
};