'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface CorProduto {
  nome: string;
  codigoHex: string;
}

interface Produto {
  id: string;
  nome: string;
  preco: number;
  imagens: string[];
  descricao: string;
  cores: CorProduto[];
}

// Função auxiliar para converter ficheiro em Base64
const toBase64 = (file: File) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

export default function GestaoProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [imagensArray, setImagensArray] = useState<string[]>([]);
  const [descricao, setDescricao] = useState('');
  
  // Estado para gerir cores: lista de cores criadas (ex: { nome: "Vermelho", codigoHex: "#ef4444" })
  const [listaCores, setListaCores] = useState<CorProduto[]>([]);
  const [novaCorNome, setNovaCorNome] = useState('');
  const [novaCorHex, setNovaCorHex] = useState('#000000');

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/atelier-gestao/produtos')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setProdutos(data);
      })
      .catch(() => {});
  }, []);

  // Upload por seleção de ficheiro ou Drag & Drop
  const processarFicheiros = async (files: FileList | File[]) => {
    const novasImagens: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const base64 = await toBase64(files[i]);
      novasImagens.push(base64 as string);
    }
    setImagensArray(prev => [...prev, ...novasImagens]);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await processarFicheiros(e.dataTransfer.files);
    }
  };

  const adicionarCor = () => {
    if (!novaCorNome.trim()) return;
    setListaCores(prev => [...prev, { nome: novaCorNome.trim(), codigoHex: novaCorHex }]);
    setNovaCorNome('');
  };

  const removerCor = (index: number) => {
    setListaCores(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/atelier-gestao/produtos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome,
        preco: Number(preco),
        imagens: imagensArray,
        descricao,
        cores: listaCores, // Envia a lista estruturada de cores com nome e código visual
      }),
    });

    if (res.ok) {
      const data = await res.json();
      setProdutos([...produtos, data.produto]);
      // Limpar formulário
      setNome('');
      setPreco('');
      setImagensArray([]);
      setDescricao('');
      setListaCores([]);
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
      alert('Erro ao apagar o produto.');
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
            onClick={() => router.push('/catalogo')}
            className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-bold shadow-sm transition hover:bg-zinc-100 cursor-pointer"
          >
            Ver Catálogo
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
                placeholder="Ex: Polvo 3D Pernas Articuladas"
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
                placeholder="Ex: 1.99"
                className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-zinc-900"
              />
            </div>
          </div>

          {/* 1. Drag & Drop de Imagens */}
          <div>
            <label className="block text-sm font-semibold mb-2">Imagens do Produto (Arrasta para aqui ou clica)</label>
            <div 
              onDragOver={e => e.preventDefault()}
              onDrop={handleDrop}
              className="border-2 border-dashed border-zinc-300 rounded-2xl p-8 text-center bg-zinc-50 hover:bg-zinc-100 transition cursor-pointer relative"
            >
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={e => e.target.files && processarFicheiros(e.target.files)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <p className="text-sm font-medium text-zinc-600">Arraste as imagens do PC para aqui, ou clique para selecionar</p>
              <p className="text-xs text-zinc-400 mt-1">Pode selecionar várias de uma vez</p>
            </div>

            {/* Pré-visualização das imagens carregadas */}
            {imagensArray.length > 0 && (
              <div className="flex gap-3 mt-4 flex-wrap">
                {imagensArray.map((img, idx) => (
                  <div key={idx} className="relative h-20 w-20 rounded-xl border overflow-hidden shadow-sm">
                    <img src={img} alt="Preview" className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setImagensArray(imagensArray.filter((_, i) => i !== idx))}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full h-5 w-5 text-xs font-bold flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 2. Gestão de Cores Visuais (Exatamente como na foto de referência) */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold">Cores Disponíveis (com seletor visual)</label>
            <div className="flex gap-3 items-center">
              <input
                type="color"
                value={novaCorHex}
                onChange={e => setNovaCorHex(e.target.value)}
                className="h-11 w-14 rounded-xl border border-zinc-200 cursor-pointer p-1 bg-white"
                title="Escolher cor visual"
              />
              <input
                type="text"
                value={novaCorNome}
                onChange={e => setNovaCorNome(e.target.value)}
                placeholder="Nome da cor (ex: Vermelho, Preto Mate)"
                className="flex-grow rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-zinc-900"
              />
              <button
                type="button"
                onClick={adicionarCor}
                className="rounded-xl bg-zinc-900 px-6 py-3 text-sm font-bold text-white hover:bg-zinc-800 transition"
              >
                Adicionar Cor
              </button>
            </div>

            {/* Lista visual das cores adicionadas */}
            {listaCores.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-3 p-4 rounded-2xl border bg-zinc-50">
                {listaCores.map((cor, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border shadow-sm">
                    <span 
                      className="h-5 w-5 rounded-full border shadow-inner" 
                      style={{ backgroundColor: cor.codigoHex }} 
                    />
                    <span className="text-sm font-medium">{cor.nome}</span>
                    <button
                      type="button"
                      onClick={() => removerCor(idx)}
                      className="text-red-500 font-bold ml-2 text-xs hover:text-red-700"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
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
                <div className="flex items-center gap-4">
                  {produto.imagens?.[0] && (
                    <img src={produto.imagens[0]} alt={produto.nome} className="h-16 w-16 object-cover rounded-xl border" />
                  )}
                  <div>
                    <h3 className="font-bold text-lg">{produto.nome}</h3>
                    <p className="text-sm font-semibold text-zinc-600">{produto.preco} €</p>
                    <div className="flex gap-1.5 mt-1 items-center">
                      {produto.cores?.map((c, i) => (
                        <span key={i} className="flex items-center gap-1 text-xs bg-zinc-100 px-2 py-0.5 rounded-md">
                          <span className="h-2.5 w-2.5 rounded-full border" style={{ backgroundColor: typeof c === 'object' ? c.codigoHex : '#000' }} />
                          {typeof c === 'object' ? c.nome : c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(produto.id)}
                  className="rounded-xl bg-red-50 px-4 py-2 text-sm font-bold text-red-600 transition hover:bg-red-100 cursor-pointer"
                >
                  Apagar
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}