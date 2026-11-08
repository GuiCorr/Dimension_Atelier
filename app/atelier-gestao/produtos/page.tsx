'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Produto {
  id: string;
  nome: string;
  preco: number;
  imagens: string[];
  descricao: string;
  cores: string[];
}

export default function GestaoProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [imagensInput, setImagensInput] = useState('');
  const [descricao, setDescricao] = useState('');
  const [cores, setCores] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Carregar produtos ao iniciar
  useEffect(() => {
    fetch('/api/atelier-gestao/produtos')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setProdutos(data);
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Converte as imagens separadas por vírgula ou quebra de linha num array
    const imagensArray = imagensInput.split(/[\n,]+/).map(img => img.trim()).filter(Boolean);
    
    // Converte as cores inseridas numa string para um array limpo (ex: "Preto, Branco" -> ["Preto", "Branco"])
    const coresArray = cores.split(',').map(c => c.trim()).filter(Boolean);

    const res = await fetch('/api/atelier-gestao/produtos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome,
        preco: Number(preco),
        imagens: imagensArray,
        descricao,
        cores: coresArray, // Enviado corretamente como array
      }),
    });

    if (res.ok) {
      const data = await res.json();
      setProdutos([...produtos, data.produto]);
      // Limpar formulário
      setNome('');
      setPreco('');
      setImagensInput('');
      setDescricao('');
      setCores('');
    } else {
      alert('Erro ao criar o produto. Verifica se tens sessão iniciada.');
      router.push('/atelier-gestao/acesso');
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tens a certeza que queres apagar este produto?')) return;

    const res = await fetch(`/api/atelier-gestao/produtos?id=${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setProdutos(produtos.filter(p => p.id !== id));
    } else {
      alert('Erro ao apagar o produto. Verifica a tua autenticação.');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-12 text-zinc-900">
      <div className="mx-auto max-w-4xl space-y-10">
        
        {/* Cabeçalho */}
        <div className="flex items-center justify-between border-b pb-6">
          <div>
            <h1 className="text-3xl font-black">Gestão de Produtos</h1>
            <p className="text-sm text-zinc-500">Adiciona ou remove os artigos do catálogo do atelier.</p>
          </div>
          <button
            onClick={() => router.push('/')}
            className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-bold shadow-sm transition hover:bg-zinc-100 cursor-pointer"
          >
            Ver Site
          </button>
        </div>

        {/* Formulário para Adicionar */}
        <form onSubmit={handleSubmit} className="rounded-3xl border bg-white p-8 shadow-sm space-y-6">
          <h2 className="text-xl font-bold">Adicionar Novo Produto</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold">Nome do Produto *</label>
              <input
                type="text"
                required
                value={nome}
                onChange={e => setNome(e.target.value)}
                placeholder="Ex: Vaso Geométrico"
                className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-zinc-900"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold">Preço (€) *</label>
              <input
                type="number"
                step="0.01"
                required
                value={preco}
                onChange={e => setPreco(e.target.value)}
                placeholder="Ex: 14.99"
                className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-zinc-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold">Links das Imagens (separados por vírgula ou linha)</label>
            <textarea
              rows={2}
              value={imagensInput}
              onChange={e => setImagensInput(e.target.value)}
              placeholder="/images/peca1.jpg, /images/peca2.jpg"
              className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-zinc-900"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold">Cores Disponíveis (separadas por vírgula)</label>
            <input
              type="text"
              value={cores}
              onChange={e => setCores(e.target.value)}
              placeholder="Preto Mate, Branco Pérola, Azul"
              className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-zinc-900"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold">Descrição do Produto *</label>
            <textarea
              rows={3}
              required
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
              placeholder="Detalhes sobre a impressão, materiais, dimensões..."
              className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-zinc-900"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-zinc-900 py-4 font-bold text-white transition hover:bg-zinc-800 disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'A guardar...' : 'Adicionar Produto ao Catálogo'}
          </button>
        </form>

        {/* Lista de Produtos Atuais */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Produtos Atuais em Stock ({produtos.length})</h2>

          <div className="grid grid-cols-1 gap-4">
            {produtos.map(produto => (
              <div key={produto.id} className="flex items-center justify-between rounded-2xl border bg-white p-6 shadow-sm">
                <div>
                  <h3 className="font-bold text-lg">{produto.nome}</h3>
                  <p className="text-sm font-semibold text-zinc-600">{produto.preco} €</p>
                  <p className="text-xs text-zinc-400 mt-1">Cores: {produto.cores?.join(', ') || 'Nenhuma'}</p>
                </div>
                <button
                  onClick={() => handleDelete(produto.id)}
                  className="rounded-xl bg-red-50 px-4 py-2 text-sm font-bold text-red-600 transition hover:bg-red-100 cursor-pointer"
                >
                  Apagar
                </button>
              </div>
            ))}
            {produtos.length === 0 && (
              <p className="text-sm text-zinc-500 text-center py-6">Ainda não existem produtos adicionados.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}