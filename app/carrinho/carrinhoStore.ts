// Define a estrutura do teu produto (ajusta os campos conforme o teu projeto)
interface Produto {
  id: string | number;
  nome: string;
  preco: number;
  imagem?: string;
  [key: string]: any; // Permite outros campos adicionais se necessário
}

export const getCarrinho = (): Produto[] => {
  if (typeof window === 'undefined') return [];
  const carrinho = localStorage.getItem('atelier_carrinho');
  return carrinho ? JSON.parse(carrinho) : [];
};

export const adicionarAoCarrinho = (produto: Produto) => {
  const carrinho = getCarrinho();
  const carrinhoAtualizado = [...carrinho, produto];
  localStorage.setItem('atelier_carrinho', JSON.stringify(carrinhoAtualizado));
  window.dispatchEvent(new Event('carrinhoAtualizado')); // Atualiza o badge/contador no header
};