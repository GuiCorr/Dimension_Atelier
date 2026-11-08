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

// Chave secreta de administração (deve coincidir com o ADMIN_SECRET da API)
const ADMIN_SECRET = 'atelier2026';

// Função auxiliar para converter ficheiros de imagem para Base64
const toBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export default function GestaoProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [imagensArray, setImagensArray] = useState<string[]>([]);
  const [descricao, setDescricao] = useState('');

  // Estados para gestão de cores visuais (Nome + Código Hexadecimal)
  const [listaCores, setListaCores] = useState<CorProduto[]>([]);
  const [novaCorNome, setNovaCorNome] = useState('');
  const [novaCorHex, setNovaCorHex] = useState('#000000');

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/atelier-gestao/produtos')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setProdutos(data);
      })
      .catch((err) => console.error('Erro ao carregar produtos:', err));
  }, []);

  // Processar ficheiros selecionados ou arrastados
  const processarFicheiros = async (files: FileList | File[]) => {
    const novasImagens: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const base64 = await toBase64(files[i]);
      novasImagens.push(base64);
    }
    setImagensArray((prev) => [...prev, ...novasImagens]);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await processarFicheiros(e.dataTransfer.files);
    }
  };

  const adicionarCor = () => {
    if (!novaCorNome.trim()) return;
    setListaCores((prev) => [
      ...prev,
      { nome: novaCorNome.trim(), codigoHex: novaCorHex },
    ]);
    setNovaCorNome('');
  };

  const removerCor = (index: number) => {
    setListaCores((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/atelier-gestao/produtos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-secret': ADMIN_SECRET, // Cabeçalho de autenticação direto sem cookies
        },
        body: JSON.stringify({
          nome,
          preco: Number(preco),
          imagens: imagensArray,
          descricao,
          cores: listaCores,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setProdutos((prev) => [...prev, data.produto]);
        // Limpar os campos do formulário
        setNome('');
        setPreco('');
        setImagensArray([]);
        setDescricao('');
        setListaCores([]);
      } else {
        alert(data.error || 'Erro ao guardar produto.');
      }
    } catch (error) {
      alert('Erro de rede ao ligar ao servidor.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tens a certeza que queres apagar este produto?')) return;

    try {
      const res = await fetch(`/api/atelier-gestao/produtos?id=${id}`, {
        method: 'DELETE',
        headers: {
          'x-admin-secret': ADMIN_SECRET,
        },
      });

      if (res.ok) {
        setProdutos((prev) => prev.filter((p) => p.id !== id));
      } else {
        const data = await res.json();
        alert(data.error || 'Erro ao apagar o produto.');
      }
    } catch (error) {
      alert('Erro de rede ao tentar apagar o produto.');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-12 text-zinc-900">
      <div className="mx-auto max-w-4xl space-y-10">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between border-b pb-6">
          <div>
            <h1 className="text-3xl font-black">Gestão de Produtos</h1>
            <p className="text-sm text-zinc-500">
              Adiciona ou remove os artigos do catálogo do atelier.
            </p>
          </div>
          <button
            onClick={() => router.push('/catalogo')}
            className="cursor-pointer rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-bold shadow-sm transition hover:bg-zinc-100"
          >
            Ver Catálogo
          </button>
        </div>

        {/* Formulário para Adicionar Produto */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-3xl border bg-white p-8 shadow-sm"
        >
          <h2 className="text-xl font-bold">Adicionar Novo Produto</h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold">
                Nome do Produto *
              </label>
              <input
                type="text"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
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
                onChange={(e) => setPreco(e.target.value)}
                placeholder="Ex: 1.99"
                className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-zinc-900"
              />
            </div>
          </div>

          {/* Área Drag & Drop para Imagens */}
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Imagens do Produto (Arrasta para aqui ou clica)
            </label>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="relative cursor-pointer rounded-2xl border-2 border-dashed border-zinc-300 bg-zinc-50 p-8 text-center transition hover:bg-zinc-100"
            >
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) =>
                  e.target.files && processarFicheiros(e.target.files)
                }
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
              <p className="text-sm font-medium text-zinc-600">
                Arraste as imagens do PC para aqui, ou clique para selecionar
              </p>
              <p className="mt-1 text-xs text-zinc-400">
                Pode selecionar várias ficheiros de uma só vez
              </p>
            </div>

            {/* Pré-visualização das Imagens */}
            {imagensArray.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-3">
                {imagensArray.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative h-20 w-20 overflow-hidden rounded-xl border shadow-sm"
                  >
                    <img
                      src={img}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setImagensArray(imagensArray.filter((_, i) => i !== idx))
                      }
                      className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Seletor Visual de Cores */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold">
              Cores Disponíveis (com seletor visual)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={novaCorHex}
                onChange={(e) => setNovaCorHex(e.target.value)}
                className="h-11 w-14 cursor-pointer rounded-xl border border-zinc-200 bg-white p-1"
                title="Escolher cor visual"
              />
              <input
                type="text"
                value={novaCorNome}
                onChange={(e) => setNovaCorNome(e.target.value)}
                placeholder="Nome da cor (ex: Vermelho, Preto Mate)"
                className="flex-grow rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-zinc-900"
              />
              <button
                type="button"
                onClick={adicionarCor}
                className="rounded-xl bg-zinc-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-zinc-800"
              >
                Adicionar Cor
              </button>
            </div>

            {/* Lista das cores adicionadas */}
            {listaCores.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-3 rounded-2xl border bg-zinc-50 p-4">
                {listaCores.map((cor, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 rounded-xl border bg-white px-3 py-2 shadow-sm"
                  >
                    <span
                      className="h-5 w-5 rounded-full border shadow-inner"
                      style={{ backgroundColor: cor.codigoHex }}
                    />
                    <span className="text-sm font-medium">{cor.nome}</span>
                    <button
                      type="button"
                      onClick={() => removerCor(idx)}
                      className="ml-2 text-xs font-bold text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold">
              Descrição do Produto *
            </label>
            <textarea
              rows={3}
              required
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Detalhes sobre a impressão, materiais, dimensões..."
              className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-zinc-900"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer rounded-xl bg-zinc-900 py-4 font-bold text-white transition hover:bg-zinc-800 disabled:opacity-50"
          >
            {loading ? 'A guardar...' : 'Adicionar Produto ao Catálogo'}
          </button>
        </form>

        {/* Lista de Produtos Atuais */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">
            Produtos Atuais em Stock ({produtos.length})
          </h2>

          <div className="grid grid-cols-1 gap-4">
            {produtos.map((produto) => (
              <div
                key={produto.id}
                className="flex items-center justify-between rounded-2xl border bg-white p-6 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  {produto.imagens?.[0] && (
                    <img
                      src={produto.imagens[0]}
                      alt={produto.nome}
                      className="h-16 w-16 rounded-xl border object-cover"
                    />
                  )}
                  <div>
                    <h3 className="text-lg font-bold">{produto.nome}</h3>
                    <p className="text-sm font-semibold text-zinc-600">
                      {produto.preco} €
                    </p>
                    <div className="mt-1 flex items-center gap-1.5">
                      {produto.cores?.map((c, i) => (
                        <span
                          key={i}
                          className="flex items-center gap-1 rounded-md bg-zinc-100 px-2 py-0.5 text-xs"
                        >
                          <span
                            className="h-2.5 w-2.5 rounded-full border"
                            style={{
                              backgroundColor:
                                typeof c === 'object' ? c.codigoHex : '#000',
                            }}
                          />
                          {typeof c === 'object' ? c.nome : c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(produto.id)}
                  className="cursor-pointer rounded-xl bg-red-50 px-4 py-2 text-sm font-bold text-red-600 transition hover:bg-red-100"
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