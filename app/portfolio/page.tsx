import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';

// Podes alterar esta lista com os teus produtos reais impressos em 3D
const projetos = [
  {
    id: 1,
    titulo: 'Suporte para Comando e Headset',
    categoria: 'Gaming / Organização',
    imagem: '/images/Coruja1.jpeg',
    descricao: 'Impresso em PLA Preto fosco, alta resistência e design ergonómico.',
  },
  {
    id: 2,
    titulo: 'Vaso Geométrico Decorativo',
    categoria: 'Decoração',
    imagem: '/images/polvo2.jpeg',
    descricao: 'Impresso em modo vase-mode com transição de cor silk.',
  },
  {
    id: 3,
    titulo: 'Miniatura de Personagem Articulada',
    categoria: 'Colecionáveis',
    imagem: '/images/vaso3.jpeg',
    descricao: 'Impressão de alta precisão em resina / PLA detalhado.',
  },
];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <Header />

      <main className="mx-auto max-w-6xl px-6 py-12">
        {/* Cabeçalho da Página */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h1 className="text-4xl font-black tracking-tight">Portfólio de Impressão 3D</h1>
          <p className="text-zinc-500 text-sm">
            Explora alguns dos projetos e peças personalizadas que já criámos no atelier. Viste algo de que gostaste? Podes pedir um igual ou personalizado à tua medida.
          </p>
        </div>

        {/* Grelha de Projetos */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projetos.map((projeto) => (
            <div 
              key={projeto.id} 
              className="bg-white rounded-3xl border border-zinc-200 overflow-hidden shadow-sm transition hover:shadow-md flex flex-col"
            >
              {/* Espaço para a Imagem */}
              <div className="relative h-64 w-full bg-zinc-100 flex items-center justify-center text-zinc-400">
                {/* Se já tiveres as imagens na pasta public, podes usar o componente <Image /> do Next.js */}
                <span className="text-xs font-medium">Foto: {projeto.titulo}</span>
              </div>

              {/* Conteúdo do Card */}
              <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                <div className="space-y-2">
                  <span className="inline-block rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600">
                    {projeto.categoria}
                  </span>
                  <h3 className="text-xl font-bold text-zinc-900">{projeto.titulo}</h3>
                  <p className="text-sm text-zinc-500">{projeto.descricao}</p>
                </div>

                {/* Botão que envia o nome do produto para a página /pedir */}
                <Link
                  href={`/pedir?produto=${encodeURIComponent(projeto.titulo)}`}
                  className="w-full text-center rounded-xl bg-zinc-900 py-3 text-sm font-bold text-white transition hover:bg-zinc-800"
                >
                  Pedir Peça Semelhante
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}