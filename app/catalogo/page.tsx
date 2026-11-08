'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Produto {
  id: string;
  nome: string;
  preco: number;
  imagens: string[];
  descricao: string;
  cores: string[];
}

export default function ProdutosPublicosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);

  // Buscar os produtos da API (que lê o ficheiro produtos.json) assim que a página abre
  useEffect(() => {
    fetch('/api/atelier-gestao/produtos')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProdutos(data);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-white px-8 py-16 text-zinc-900">
      <div className="mx-auto max-w-[1400px] space-y-12">
        
        {/* Cabeçalho da Página */}
        <div className="border-b pb-6">
          <h1 className="text-4xl font-black tracking-tight">Catálogo de Produtos</h1>
          <p className="text-zinc-500 mt-2">Descobre as peças exclusivas criadas no nosso atelier.</p>
        </div>

        {/* Estado de Carregamento */}
        {loading && (
          <p className="text-center text-zinc-400 py-12">A carregar produtos...</p>
        )}

        {/* Grelha de Produtos */}
        {!loading && produtos.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {produtos.map(produto => (
              <div key={produto.id} className="group flex flex-col rounded-2xl border border-zinc-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition">
                
                {/* Imagem do Produto */}
                <div className="relative h-64 w-full bg-zinc-100 overflow-hidden">
                  {produto.imagens?.[0] ? (
                    <img 
                      src={produto.imagens[0]} 
                      alt={produto.nome} 
                      className="h-full w-full object-cover object-center group-hover:scale-105 transition duration-500" 
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-zinc-400">
                      Sem imagem
                    </div>
                  )}
                </div>

                {/* Detalhes do Produto */}
                <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                  <div>
                    <h3 className="font-bold text-lg text-zinc-900">{produto.nome}</h3>
                    <p className="text-sm font-semibold text-zinc-700 mt-1">{produto.preco.toFixed(2)} €</p>
                    <p className="text-xs text-zinc-500 line-clamp-2 mt-2">{produto.descricao}</p>
                    
                    {/* Cores disponíveis */}
                    {produto.cores && produto.cores.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {produto.cores.map((cor, idx) => (
                          <span key={idx} className="text-[10px] bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded-md font-medium">
                            {cor}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Botão de Ação / Detalhes */}
                  <Link
                    href={`/produtos/${produto.id}`} // Podes ajustar para a rota de detalhe ou adicionar diretamente ao carrinho
                    className="w-full text-center rounded-xl bg-zinc-900 py-3 text-xs font-bold text-white transition hover:bg-zinc-800"
                  >
                    Ver Detalhes
                  </Link>

                </div>
              </div>
            ))}
          </div>
        )}

        {/* Caso não existam produtos */}
        {!loading && produtos.length === 0 && (
          <div className="text-center py-20 space-y-3">
            <p className="text-lg font-semibold text-zinc-700">Ainda não existem produtos disponíveis.</p>
            <p className="text-sm text-zinc-400">Volta mais tarde ou adiciona novos artigos através da área de gestão.</p>
          </div>
        )}

      </div>
    </div>
  );
}