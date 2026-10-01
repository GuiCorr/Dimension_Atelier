import Header from '@/components/Header';
import PassosServico from '@/components/PassosServico';
import Servicos3D from '@/components/Servicos3D';
import Link from 'next/link';

const PRODUTOS_EXEMPLO = [
  { 
    id: '1', 
    nome: 'Polvo 3D Pernas Articuladas', 
    preco: '1,99 €', 
    categoria: 'Brinquedos', 
    imagem: 'images/polvo2.jpeg' 
  },
  {                               
    id: '2', 
    nome: 'Vaso Decorativo Geométrico', 
    preco: '89,90 €', 
    categoria: 'Decoração', 
    imagem: 'images/vaso3.jpeg' 
  },
  { 
    id: '3', 
    nome: 'Coruja Decorativo Minimalista', 
    preco: '69,99 €', 
    categoria: 'Decoração', 
    imagem: 'images/Coruja3.jpeg' 
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <Header />
      
      <main className="mx-auto max-w-7xl px-6 py-12">
        {/* Banner Hero */}
        <div className="relative overflow-hidden rounded-3xl bg-zinc-900 p-8 text-white md:p-12">
          <div className="max-w-xl">
            <span className="rounded-full bg-lime-400 px-3 py-1 text-xs font-bold text-zinc-900 uppercase">
              Serviço Exclusivo
            </span>
            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Não encontras o que procuras?
            </h1>
            <p className="mt-4 text-zinc-400">
              Nós procuramos e encomendamos qualquer artigo por ti. Envia-nos os detalhes do produto que queres.
            </p>
            <div className="mt-6">
              <Link
                href="/pedir"
                className="inline-block rounded-xl bg-lime-400 px-6 py-3 font-bold text-zinc-900 transition hover:bg-lime-300"
              >
                Fazer Pedido Customizado
              </Link>
            </div>
          </div>
        </div>

        {/* Grelha de Produtos */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight">Produtos em Destaque</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUTOS_EXEMPLO.map((produto) => (
              <Link
                key={produto.id}
                href={`/produto/${produto.id}`}
                className="group block overflow-hidden rounded-2xl border bg-white p-4 transition hover:shadow-lg"
              >
                <div className="aspect-square w-full overflow-hidden rounded-xl bg-zinc-100">
                  <img
                    src={produto.imagem}
                    alt={produto.nome}
                    className="h-full w-full object-cover transition group-hover:scale-105"
                  />
                </div>
                <div className="mt-4 flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold text-zinc-400 uppercase">{produto.categoria}</p>
                    <h3 className="font-bold text-zinc-900">{produto.nome}</h3>
                  </div>
                  <span className="font-extrabold text-zinc-900">{produto.preco}</span>
                </div>
                <div className="mt-4 w-full text-center rounded-xl bg-zinc-100 py-2.5 text-sm font-bold text-zinc-900 transition group-hover:bg-zinc-900 group-hover:text-white">
                  Ver Detalhes
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Secção de Como Funciona */}
      <PassosServico />

      {/* Secção do Acordeão de Impressão 3D */}
      <Servicos3D />
    </div>
  );
}