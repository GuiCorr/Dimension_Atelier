'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';

function FormularioPedidoContent() {
  const searchParams = useSearchParams();

  const produtoUrl = searchParams.get('produto') || '';
  const corUrl = searchParams.get('cor') || '';

  const [nomeProduto, setNomeProduto] = useState(produtoUrl);
  const [linkProduto, setLinkProduto] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [orcamento, setOrcamento] = useState('');
  const [descricao, setDescricao] = useState(corUrl ? `Cor pretendida: ${corUrl}` : '');
  const [nomeCliente, setNomeCliente] = useState('');
  const [emailCliente, setEmailCliente] = useState('');
  const [telemovelCliente, setTelemovelCliente] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [enviadoComSucesso, setEnviadoComSucesso] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const dadosPedido = {
      nomeProduto,
      linkProduto,
      quantidade,
      orcamento,
      descricao,
      nomeCliente,
      emailCliente,
      telemovelCliente,
    };

    try {
      const response = await fetch('/api/mail_sender', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosPedido),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar o email.');
      }

      setEnviadoComSucesso(true);
    } catch (error) {
      alert('Ocorreu um erro ao submeter o pedido. Por favor, tenta novamente.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (enviadoComSucesso) {
    return (
      <div className="py-12 text-center space-y-4">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 text-2xl font-bold">
          ✓
        </div>
        <h2 className="text-2xl font-bold text-zinc-900">Pedido Enviado com Sucesso!</h2>
        <p className="text-sm text-zinc-600 max-w-md mx-auto">
          Obrigado, <span className="font-semibold">{nomeCliente}</span>. Recebemos o teu pedido customizado e o atelier entrará em contacto contigo em breve através do email fornecido.
        </p>
        <button
          onClick={() => {
            setEnviadoComSucesso(false);
            setNomeProduto('');
            setLinkProduto('');
            setQuantidade(1);
            setOrcamento('');
            setDescricao('');
            setNomeCliente('');
            setEmailCliente('');
            setTelemovelCliente('');
          }}
          className="mt-6 inline-block rounded-xl bg-zinc-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-zinc-800"
        >
          Fazer Novo Pedido
        </button>
      </div>
    );
  }

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
          <div>
            <label className="block text-sm font-semibold">Número de Telemóvel *</label>
            <input
              type="tel"
              required
              value={telemovelCliente}
              onChange={(e) => setTelemovelCliente(e.target.value)}
              placeholder="912 345 678"
              className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-zinc-900"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-zinc-900 py-4 font-bold text-white transition hover:bg-zinc-800 disabled:opacity-50"
      >
        {isSubmitting ? 'A enviar pedido...' : 'Enviar Pedido ao Atelier'}
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
          <h1 className="text-3xl font-black tracking-tight">Pedir um Produto Personalizado</h1>
          <p className="mt-2 text-sm text-zinc-500">
            Preenche os dados do artigo que procuras. O atelier responderá por email com uma proposta e orçamento.
          </p>

          <Suspense fallback={<div className="py-8 text-center text-sm text-zinc-400">A carregar formulário...</div>}>
            <FormularioPedidoContent />
          </Suspense>
        </div>
      </main>
    </div>
  );
}