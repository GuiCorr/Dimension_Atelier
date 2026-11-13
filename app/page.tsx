import Link from 'next/link';
import { PRODUTOS } from '@/data/produtos';
import { ArrowRight, Sparkles, Printer, ShieldCheck, Zap } from 'lucide-react';
import PassosServico from '@/components/PassosServico';
import Servicos3D from '@/components/Servicos3D';

export default function HomePage() {
  const listaProdutos = Object.values(PRODUTOS);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 selection:bg-lime-400 selection:text-zinc-950">
      
      {/* 1. HERO SECTION DINÂMICO (Apresentação Grande no Topo) */}
      <section className="relative overflow-hidden bg-zinc-950 px-6 py-24 text-white sm:py-32 lg:px-8">
        {/* Luzes de fundo decorativas e modernas */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[800px] rounded-full bg-gradient-to-tr from-lime-500/20 to-indigo-500/20 blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-5xl text-center">
          
          {/* Etiqueta / Selo Dinâmico */}
          <div className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-1.5 text-xs font-bold text-lime-400 border border-zinc-800 shadow-inner animate-pulse">
            <Sparkles className="h-4 w-4" />
            <span>Atelier de Impresão 3D & Design Exclusivo</span>
          </div>

          {/* Título Impactante */}
          <h1 className="mt-8 text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl">
            Damos forma às tuas ideias com <span className="text-lime-400 underline decoration-lime-400/30 underline-offset-8">precisão 3D</span>.
          </h1>

          {/* Subtítulo */}
          <p className="mt-6 text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Explora o nosso catálogo de peças exclusivas em stock ou desafia-nos a criar um projeto totalmente personalizado para ti.
          </p>

          {/* Botões de Ação Duplos */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#produtos"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-lime-400 px-8 py-4 font-bold text-zinc-950 transition hover:bg-lime-300 shadow-lg shadow-lime-400/10"
            >
              Ver Produtos <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/pedir"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-zinc-900 px-8 py-4 font-bold text-white border border-zinc-800 transition hover:bg-zinc-800"
            >
              Pedido Customizado
            </Link>
          </div>

          {/* Pequenos Badges de Confiança */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 border-t border-zinc-900 text-zinc-400 text-xs font-semibold uppercase tracking-wider">
            <div className="flex items-center justify-center gap-2">
              <Printer className="h-4 w-4 text-lime-400" />
              <span>Tecnologia FDM & SLA</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="h-4 w-4 text-lime-400" />
              <span>Materiais Premium</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Zap className="h-4 w-4 text-lime-400" />
              <span>Envio Seguro</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. CATÁLOGO DE PRODUTOS (Aparece logo ao descer) */}
      <main id="produtos" className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-200 pb-6 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              Descoberta
            </span>
            <h2 className="mt-1 text-3xl font-black tracking-tight text-zinc-900">
              Produtos em Destaque
            </h2>
          </div>
          <p className="text-sm text-zinc-500 max-w-md">
            Escolhe os teus artigos favoritos, seleciona a cor perfeita e adiciona diretamente ao carrinho.
          </p>
        </div>

        {/* Grelha */}
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {listaProdutos.map((produto) => (
            <Link
              key={produto.id}
              href={`/produto/${produto.id}`}
              className="group block overflow-hidden rounded-3xl border border-zinc-200 bg-white p-4 transition-all duration-300 hover:border-zinc-400 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="aspect-square w-full overflow-hidden rounded-2xl bg-zinc-100">
                <img
                  src={produto.imagens[0]}
                  alt={produto.nome}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-5 flex items-start justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">{produto.categoria}</p>
                  <h3 className="font-bold text-zinc-900 mt-0.5 text-lg">{produto.nome}</h3>
                </div>
                <span className="font-extrabold text-zinc-900 text-sm bg-zinc-100 px-3 py-1.5 rounded-xl">
                  {produto.preco}
                </span>
              </div>
              <div className="mt-6 w-full text-center rounded-xl bg-zinc-900 py-3 text-xs font-bold text-white transition group-hover:bg-lime-400 group-hover:text-zinc-950">
                Ver Opções & Cores
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Secções Inferiores */}
      <PassosServico />
      <Servicos3D />

    </div>
  );
}