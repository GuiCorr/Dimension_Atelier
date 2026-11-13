'use client';

import { useState } from 'react';
import { useCart } from '@/components/CartContent';
import { Trash2, ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function CarrinhoPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const [nomeCliente, setNomeCliente] = useState('');
  const [emailCliente, setEmailCliente] = useState('');
  const [telemovelCliente, setTelemovelCliente] = useState('');
  const [notasAdicionais, setNotasAdicionais] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [encomendaEnviada, setEncomendaEnviada] = useState(false);

  const handleFinalizarEncomenda = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsSubmitting(true);

    // Formata todos os itens do carrinho numa lista legível para o email
    const resumoItens = cart
      .map(
        (item, idx) =>
          `${idx + 1}. ${item.nomeProduto} — Quantidade: ${item.quantidade} (${item.descricao || ''})`
      )
      .join('\n');

    const totalUnidades = cart.reduce((acc, item) => acc + item.quantidade, 0);

    // Prepara os dados no exato formato que a tua rota /api/mail_sender já espera
    const dadosEmail = {
      nomeProduto: `Encomenda do Carrinho (${cart.length} ${cart.length === 1 ? 'artigo' : 'artigos'})`,
      linkProduto: '',
      quantidade: totalUnidades,
      orcamento: '',
      descricao: `ITENS ENCOMENDADOS:\n${resumoItens}\n\nNOTAS / MORADA DO CLIENTE:\n${notasAdicionais || 'Nenhuma nota adicional.'}`,
      nomeCliente,
      emailCliente,
      telemovelCliente,
    };

    try {
      const response = await fetch('/api/mail_sender', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosEmail),
      });

      if (!response.ok) {
        throw new Error('Falha ao enviar o pedido.');
      }

      clearCart();
      setEncomendaEnviada(true);
    } catch (error) {
      alert('Ocorreu um erro ao finalizar a encomenda. Por favor, tenta novamente.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Ecrã de confirmação após envio
  if (encomendaEnviada) {
    return (
      <div className="min-h-screen bg-zinc-50 text-zinc-900">
        <main className="mx-auto max-w-2xl px-6 py-20">
          <div className="rounded-3xl border bg-white p-10 text-center shadow-sm space-y-5">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
              <CheckCircle2 className="h-9 w-9" />
            </div>
            <h1 className="text-3xl font-black tracking-tight">Encomenda Recebida!</h1>
            <p className="text-zinc-600 text-sm max-w-md mx-auto leading-relaxed">
              Obrigado, <span className="font-bold text-zinc-900">{nomeCliente}</span>. Recebemos a lista dos artigos que escolheste e entraremos em contacto brevemente por email ou telemóvel para confirmar os detalhes e o envio.
            </p>
            <div className="pt-4">
              <Link
                href="/"
                className="inline-block rounded-2xl bg-zinc-900 px-8 py-4 text-sm font-bold text-white transition hover:bg-zinc-800"
              >
                Voltar à Loja
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">

      <main className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-3xl font-black tracking-tight">O teu Carrinho</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Revê os artigos selecionados e preenche os teus dados para submeter o pedido.
        </p>

        {cart.length === 0 ? (
          <div className="mt-10 rounded-3xl border bg-white p-16 text-center shadow-sm">
            <ShoppingBag className="mx-auto h-12 w-12 text-zinc-300" />
            <h2 className="mt-4 text-xl font-bold text-zinc-900">O teu carrinho está vazio</h2>
            <p className="mt-2 text-sm text-zinc-500">
              Ainda não adicionaste nenhum artigo do catálogo.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-zinc-900 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-zinc-800"
            >
              Explorar Produtos <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
            
            {/* Coluna Esquerda: Lista de Produtos no Carrinho */}
            <div className="lg:col-span-7 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-2xl border bg-white p-5 shadow-sm"
                >
                  <div className="space-y-1 pr-4">
                    <h3 className="font-bold text-zinc-900">{item.nomeProduto}</h3>
                    {item.descricao && (
                      <p className="text-xs text-zinc-500">{item.descricao}</p>
                    )}
                    <p className="text-xs font-semibold text-zinc-700 pt-1">
                      Quantidade: <span className="rounded-md bg-zinc-100 px-2 py-0.5 font-bold">{item.quantidade}</span>
                    </p>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    title="Remover artigo"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-zinc-400 transition hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}

              <div className="flex justify-between items-center pt-2 px-2">
                <Link href="/" className="text-sm font-semibold text-zinc-600 hover:text-zinc-900">
                  ← Continuar a ver produtos
                </Link>
                <button
                  onClick={clearCart}
                  className="text-xs font-semibold text-red-500 hover:underline"
                >
                  Esvaziar carrinho
                </button>
              </div>
            </div>

            {/* Coluna Direita: Formulário de Submissão */}
            <form
              onSubmit={handleFinalizarEncomenda}
              className="lg:col-span-5 rounded-3xl border bg-white p-6 sm:p-8 shadow-sm space-y-5"
            >
              <h2 className="text-xl font-bold text-zinc-900">Dados para Encomenda</h2>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-500">Nome Completo *</label>
                <input
                  type="text"
                  required
                  value={nomeCliente}
                  onChange={(e) => setNomeCliente(e.target.value)}
                  placeholder="O teu nome"
                  className="mt-1.5 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-zinc-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-500">Email *</label>
                <input
                  type="email"
                  required
                  value={emailCliente}
                  onChange={(e) => setEmailCliente(e.target.value)}
                  placeholder="teuemail@exemplo.com"
                  className="mt-1.5 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-zinc-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-500">Telemóvel *</label>
                <input
                  type="tel"
                  required
                  value={telemovelCliente}
                  onChange={(e) => setTelemovelCliente(e.target.value)}
                  placeholder="912 345 678"
                  className="mt-1.5 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-zinc-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-500">
                  Morada de Envio / Notas (Opcional)
                </label>
                <textarea
                  rows={3}
                  value={notasAdicionais}
                  onChange={(e) => setNotasAdicionais(e.target.value)}
                  placeholder="Indica a morada de entrega ou alguma observação sobre as cores/peças."
                  className="mt-1.5 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-zinc-900"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-2xl bg-zinc-900 py-4 font-bold text-white transition hover:bg-zinc-800 disabled:opacity-50"
              >
                {isSubmitting ? 'A enviar encomenda...' : 'Confirmar Pedido por Email'}
              </button>
            </form>

          </div>
        )}
      </main>
    </div>
  );
}