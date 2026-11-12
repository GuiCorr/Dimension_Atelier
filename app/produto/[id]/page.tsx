'use client';

import { useState, use } from 'react';
import Header from '@/components/Header';
import Link from 'next/link';
import { PRODUTOS } from '@/data/produtos';

export default function ProdutoDetailPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  const resolvedParams = params instanceof Promise ? use(params) : params;
  const produto = PRODUTOS[resolvedParams.id] || PRODUTOS['1'];

  const [imagemSelecionada, setImagemSelecionada] = useState(produto.imagens[0]);
  const [corSelecionada, setCorSelecionada] = useState(produto.cores[0].nome);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          
          {/* Galeria de Fotos */}
          <div className="space-y-4">
            <div className="aspect-square w-full overflow-hidden rounded-3xl border bg-white shadow-sm">
              <img
                src={imagemSelecionada}
                alt={produto.nome}
                className="h-full w-full object-cover transition-all duration-300"
              />
            </div>
            
            <div className="flex gap-4">
              {produto.imagens.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setImagemSelecionada(img)}
                  className={`h-24 w-24 overflow-hidden rounded-2xl border-2 bg-white transition ${
                    imagemSelecionada === img ? 'border-zinc-900 scale-95' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Detalhes */}
          <div className="flex flex-col justify-between rounded-3xl border bg-white p-8 shadow-sm">
            <div>
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                {produto.categoria}
              </span>
              <h1 className="mt-2 text-3xl font-black tracking-tight">{produto.nome}</h1>
              <p className="mt-4 text-3xl font-extrabold text-zinc-900">{produto.preco}</p>
              
              <p className="mt-6 text-zinc-600 leading-relaxed">
                {produto.descricao}
              </p>

              <div className="mt-8">
                <label className="block text-sm font-bold text-zinc-900">
                  Cor Selecionada: <span className="font-semibold text-zinc-500">{corSelecionada}</span>
                </label>
                <div className="mt-3 flex gap-3">
                  {produto.cores.map((cor) => (
                    <button
                      key={cor.nome}
                      onClick={() => setCorSelecionada(cor.nome)}
                      style={{ backgroundColor: cor.hex }}
                      title={cor.nome}
                      className={`h-10 w-10 rounded-full border-2 transition-transform ${
                        corSelecionada === cor.nome ? 'border-zinc-900 scale-110 shadow-md' : 'border-zinc-200 hover:scale-105'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10 border-t pt-6 space-y-3">
              <Link
                href={`/pedir?produto=${encodeURIComponent(produto.nome)}&cor=${encodeURIComponent(corSelecionada)}`}
                className="block w-full text-center rounded-2xl bg-zinc-900 py-4 font-bold text-white transition hover:bg-zinc-800"
              >
                Fazer Pedido ({corSelecionada})
              </Link>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}