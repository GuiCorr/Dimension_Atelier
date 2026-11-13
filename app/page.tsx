import Header from '@/components/Header';
import PassosServico from '@/components/PassosServico';
import Servicos3D from '@/components/Servicos3D';
import Link from 'next/link';
import { PRODUTOS } from '@/data/produtos';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HomePage() {
  const listaProdutos = Object.values(PRODUTOS);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <Header />
      
      <main className="mx-auto max-w-7xl px-6 py-10">
        
        {/* Cabeçalho / Apresentação Simples e Elegante */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-200 pb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              Dimension Atelier
            </span>
            <h1 className="mt-1 text-3xl font-black tracking-tight sm:text-4xl">
              Catálogo de Produtos 3D
            </h1>
          </div>
          <p className="text-sm text-zinc-500 max-w-md">
            Peças exclusivas impressas em 3D com alta precisão e acabamentos personalizados ao teu gosto.
          </p>
        </div>

        {/* Grelha de Produtos em Destaque */}
        <section className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight text-zinc-900">Em Destaque</h2>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {listaProdutos.map((produto) => (
              <Link
                key={produto.id}
                href={`/produto/${produto.id}`}
                className="group block overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-4 transition-all hover:border-zinc-400 hover:shadow-md"
              >
                <div className="aspect-square w-full overflow-hidden rounded-xl bg-zinc-100">
                  <img
                    src={produto.imagens[0]}
                    alt={produto.nome}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4 flex items-start justify-between">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">{produto.categoria}</p>
                    <h3 className="font-bold text-zinc-900 mt-0.5">{produto.nome}</h3>
                  </div>
                  <span className="font-extrabold text-zinc-900 text-sm bg-zinc-100 px-2.5 py-1 rounded-lg">
                    {produto.preco}
                  </span>
                </div>
                <div className="mt-4 w-full text-center rounded-xl bg-zinc-50 py-2.5 text-xs font-bold text-zinc-700 transition group-hover:bg-zinc-900 group-hover:text-white">
                  Ver Detalhes & Cores
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Banner Discreto para Pedido Customizado (Movido para baixo) */}
        <section className="mt-20">
          <div className="relative overflow-hidden rounded-3xl bg-zinc-900 p-8 sm:p-12 text-white flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-lime-400/10 px-3 py-1 text-xs font-bold text-lime-400 border border-lime-400/20">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Serviço sob medida</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                Não encontras o que procuras?
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Se tens um projeto em mente, um modelo específico ou pretendes um artigo totalmente personalizado, nós criamos e encomendamos por ti.
              </p>
            </div>
            <div>
              <Link
                href="/pedir"
                className="inline-flex items-center gap-2 rounded-2xl bg-lime-400 px-6 py-4 text-sm font-bold text-zinc-900 transition hover:bg-lime-300 shrink-0"
              >
                Fazer Pedido Customizado <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* Secções Informativas Inferiores */}
      <PassosServico />
      <Servicos3D />
    </div>
  );
}