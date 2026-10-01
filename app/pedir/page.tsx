'use client';

import { Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { useCart } from '@/components/CartContent';

function FormularioPedidoContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const produtoUrl = searchParams.get('produto') || '';
  const corUrl = searchParams.get('cor') || '';

  const [nomeProduto, setNomeProduto] = useState(produtoUrl);
  const [linkProduto, setLinkProduto] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [orcamento, setOrcamento] = useState('');
  const [descricao, setDescricao] = useState(corUrl ? `Cor pretendida: ${corUrl}` : '');
  const [nomeCliente, setNomeCliente] = useState('');
  const [emailCliente, setEmailCliente] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addToCart({
      nomeProduto,
      linkProduto,
      quantidade,
      orcamento,
      descricao,
      nomeCliente,
      emailCliente,
    });

    router.push('/carrinho');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div>
        <label className="block text-sm font-semibold">Nome do Produto *</label>
        <input
          type="text"
          required
          value={nomeProduto}
          onChange={(e) => setNomeProduto(e.target.value)}
          placeholder="Ex: Ténis Nike Dunk Low Panda Size 42"
          className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-zinc-900"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold">Link do Produto ou Referência (Opcional)</label>
        <input
          type="url"
          value={linkProduto}
          onChange={(e) => setLinkProduto(e.target.value)}
          placeholder="https://..."
          className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-zinc-900"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold">Quantidade</label>
          <input
            type="number"
            value={quantidade}
            min={1}
            onChange={(e) => setQuantidade(Number(e.target.value))}
            className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-zinc-900"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">Orçamento Máximo (€)</label>
          <input
            type="number"
            value={orcamento}
            onChange={(e) => setOrcamento(e.target.value)}
            placeholder="Ex: 150"
            className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-zinc-900"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold">Descrição / Detalhes Adicionais</label>
        <textarea
          rows={4}
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Indica a cor, tamanho, estado do produto ou outra informação relevante."
          className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-zinc-900"
        />
      </div>

      <div className="border-t pt-6">
        <h3 className="font-bold text-zinc-900 mb-4">Os teus Dados de Contacto</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold">Nome Completo *</label>
            <input
              type="text"
              required
              value={nomeCliente}
              onChange={(e) => setNomeCliente(e.target.value)}
              placeholder="O teu nome"
              className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-zinc-900"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold">Email *</label>
            <input
              type="email"
              required
              value={emailCliente}
              onChange={(e) => setEmailCliente(e.target.value)}
              placeholder="teuemail@exemplo.com"
              className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-zinc-900"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-zinc-900 py-4 font-bold text-white transition hover:bg-zinc-800"
      >
        Adicionar ao Carrinho
      </button>
    </form>
  );
}

export default function PedirPage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <Header />

      <main className="mx-auto max-w-2xl px-6 py-12">
        <div className="rounded-3xl border bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-black tracking-tight">Pedir um Produto</h1>
          <p className="mt-2 text-sm text-zinc-500">
            Preenche os dados do artigo que procuras. Responderemos com uma proposta e orçamento.
          </p>

          <Suspense fallback={<div className="py-8 text-center text-sm text-zinc-400">A carregar formulário...</div>}>
            <FormularioPedidoContent />
          </Suspense>
        </div>
      </main>
    </div>
  );
}