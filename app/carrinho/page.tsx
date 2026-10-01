'use client';

import Header from '@/components/Header';
import { useCart } from '@/components/CartContent';
import Link from 'next/link';
import { Trash2, ArrowLeft } from 'lucide-react';

export default function CarrinhoPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <Header />

      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black tracking-tight">O teu Carrinho</h1>
            <p className="text-sm text-zinc-500">Gere os teus pedidos antes de finalizar</p>
          </div>

          <Link
            href="/pedir"
            className="inline-flex items-center gap-2 text-sm font-bold text-zinc-600 hover:text-zinc-900 transition"
          >
            <ArrowLeft className="h-4 w-4" /> Adicionar outro pedido
          </Link>
        </div>

        {cart.length === 0 ? (
          <div className="rounded-3xl border bg-white p-12 text-center shadow-sm">
            <p className="text-lg font-semibold text-zinc-600">O teu carrinho está vazio.</p>
            <p className="mt-1 text-sm text-zinc-400">Ainda não adicionaste nenhum pedido de produto.</p>
            <Link
              href="/pedir"
              className="mt-6 inline-block rounded-xl bg-zinc-900 px-6 py-3 font-bold text-white transition hover:bg-zinc-800"
            >
              Fazer Pedido
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between rounded-2xl border bg-white p-6 shadow-sm gap-4"
                >
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-zinc-900">{item.nomeProduto}</h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-500">
                      <p><strong>Qtd:</strong> {item.quantidade}</p>
                      {item.orcamento && <p><strong>Orçamento:</strong> {item.orcamento} €</p>}
                      <p><strong>Cliente:</strong> {item.nomeCliente} ({item.emailCliente})</p>
                    </div>
                    {item.descricao && (
                      <p className="mt-2 text-xs italic text-zinc-600 bg-zinc-50 p-2.5 rounded-lg border border-zinc-100">
                        "{item.descricao}"
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="self-start sm:self-center p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition border border-red-100"
                    title="Remover pedido"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-zinc-200">
              <button
                onClick={clearCart}
                className="text-sm font-semibold text-zinc-500 hover:text-red-600 transition"
              >
                Esvaziar Carrinho
              </button>

              <button
                onClick={() => alert('Pedido enviado com sucesso!')}
                className="rounded-xl bg-lime-400 px-8 py-4 font-extrabold text-zinc-900 transition hover:bg-lime-300 shadow-md"
              >
                Finalizar e Enviar Pedidos
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}