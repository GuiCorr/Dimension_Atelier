'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const passos = [
  {
    titulo: 'Crie o Design',
    descricao: 'Envie-nos o seu design ou logótipo',
  },
  {
    titulo: 'Escolha os produtos',
    descricao: 'Escolha os Brindes que pretende e peça o seu orçamento',
  },
  {
    titulo: 'Receba em Casa',
    descricao: 'Receba os Brindes que encomendou em sua casa ou empresa',
  },
];

export default function PassosServico() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-20">
      {/* Linhas curvas decorativas de fundo */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[600px] w-[1200px] rounded-[100%] border border-slate-200/60" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Título da Secção */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
            Serviço Personalizado
          </span>
          <h2 className="mt-2 text-3xl font-black text-slate-900 sm:text-4xl">
            Produtos <span className="text-indigo-600">100% personalizáveis</span>
          </h2>
        </motion.div>

        {/* Cards dos Passos */}
        <div className="mt-16 flex flex-col items-center justify-center gap-8 md:flex-row md:gap-4">
          {passos.map((passo, index) => (
            <div key={index} className="flex flex-col items-center md:flex-row">
              {/* Card */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="flex h-56 w-72 flex-col items-center justify-center rounded-3xl bg-white p-6 text-center shadow-xl shadow-slate-200/50 transition-shadow hover:shadow-2xl hover:shadow-indigo-500/10"
              >
                <h3 className="text-xl font-bold text-slate-900">{passo.titulo}</h3>
                <p className="mt-3 text-sm text-slate-500 leading-relaxed">
                  {passo.descricao}
                </p>
              </motion.div>

              {/* Seta animada entre cards (não aparece no último) */}
              {index < passos.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
                  className="my-4 flex items-center justify-center text-indigo-500 md:mx-4 md:my-0"
                >
                  <div className="flex items-center gap-0.5 rounded-full bg-indigo-50 p-2 text-indigo-600">
                    <ChevronRight className="h-5 w-5 stroke-[3]" />
                    <ChevronRight className="-ml-3 h-5 w-5 stroke-[3] opacity-60" />
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}