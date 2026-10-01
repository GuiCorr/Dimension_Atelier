'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Printer, Box, Layers, Sparkles, CheckCircle2 } from 'lucide-react';

const servicos = [
  {
    id: '1',
    titulo: 'Impressão 3D FDM & SLA de Alta Precisão',
    icone: Printer,
    resumo: 'Prototipagem rápida e produção de peças finais com acabamento impecável e alta resistência mecânica.',
    detalhes: [
      'Resolução de camada ultra-precisa (até 0.05mm)',
      'Materiais variados: PLA, PETG, ABS, TPU (flexível) e Resina',
      'Ideal para protótipos, peças funcionais e colecionáveis'
    ]
  },
  {
    id: '2',
    titulo: 'Modelação e Modificação CAD 3D',
    icone: Box,
    resumo: 'Transformamos a tua ideia ou esboço num ficheiro 3D pronto para impressão ou ajustamos modelos existentes.',
    detalhes: [
      'Criação de ficheiros STL/OBJ a partir do zero',
      'Ajustes de escala, encaixes e espessura de parede',
      'Otimização de peças para reduzir tempo e custo de impressão'
    ]
  },
  {
    id: '3',
    titulo: 'Pós-Processamento e Acabamento Exclusivo',
    icone: Sparkles,
    resumo: 'Damos vida às peças impressas com técnicas de lixamento, primer, pintura personalizada e montagem.',
    detalhes: [
      'Remoção profissional de suportes e marcas de camada',
      'Tratamento de superfície para acabamento liso e brilhante',
      'Pintura manual ou aerógrafo com cores personalizadas'
    ]
  },
  {
    id: '4',
    titulo: 'Produção em Série e Brindes Corporativos',
    icone: Layers,
    resumo: 'Capacidade de produção para pequenas e médias séries com controlo de qualidade rigoroso.',
    detalhes: [
      'Descontos progressivos por quantidade de peças',
      'Personalização com logótipos e nomes gravados',
      'Prazos de entrega rápidos e embalamento seguro'
    ]
  }
];

export default function Servicos3D() {
  const [abertoId, setAbertoId] = useState<string>('1');

  const toggleAccordion = (id: string) => {
    setAbertoId(abertoId === id ? '' : id);
  };

  return (
    <section className="bg-zinc-900 py-24 text-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="rounded-full bg-lime-400/10 px-4 py-1.5 text-xs font-bold text-lime-400 uppercase tracking-widest border border-lime-400/20">
            Tecnologia de Fabrico Aditivo
          </span>
          <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
            Impressão 3D de alta precisão com <span className="text-lime-400">entrega rápida</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-base sm:text-lg">
            Somos especialistas em transformar conceitos digitais em objetos físicos de alta qualidade. Descobre o que o nosso serviço pode fazer por ti.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Lado Esquerdo: Cartão de Destaque Técnico */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl bg-gradient-to-b from-zinc-800 to-zinc-800/50 p-8 border border-zinc-700/60 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-400 text-zinc-950">
                  <Printer className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">Dimension Lab 3D</h3>
                  <p className="text-xs text-zinc-400">Garantia de Qualidade & Precisão</p>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div className="rounded-2xl bg-zinc-900/80 p-4 border border-zinc-800">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="text-zinc-400">Precisão Dimensional</span>
                    <span className="text-lime-400">± 0.1 mm</span>
                  </div>
                </div>

                <div className="rounded-2xl bg-zinc-900/80 p-4 border border-zinc-800">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="text-zinc-400">Materiais Suportados</span>
                    <span className="text-white">PLA, PETG, ABS, Resina</span>
                  </div>
                </div>

                <div className="rounded-2xl bg-zinc-900/80 p-4 border border-zinc-800">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="text-zinc-400">Volume Máx. Único</span>
                    <span className="text-white">300 x 300 x 400 mm</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-zinc-700/50 pt-6">
                <div>
                  <p className="text-2xl font-black text-white">100%</p>
                  <p className="text-xs text-zinc-400">Personalizável</p>
                </div>
                <div className="h-8 w-[1px] bg-zinc-700/50" />
                <div>
                  <p className="text-2xl font-black text-lime-400">&lt; 24h</p>
                  <p className="text-xs text-zinc-400">Orçamento Rápido</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Lado Direito: Acordeão Interativo */}
          <div className="lg:col-span-7 space-y-4">
            {servicos.map((servico) => {
              const Icone = servico.icone;
              const estaAberto = abertoId === servico.id;

              return (
                <motion.div
                  key={servico.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-800/40 transition-colors hover:border-zinc-700"
                >
                  <button
                    onClick={() => toggleAccordion(servico.id)}
                    className="flex w-full items-center justify-between p-6 text-left transition"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${
                        estaAberto ? 'bg-lime-400 text-zinc-950' : 'bg-zinc-800 text-zinc-400'
                      }`}>
                        <Icone className="h-5 w-5" />
                      </div>
                      <span className="font-bold text-lg text-white">{servico.titulo}</span>
                    </div>

                    <div className={`flex h-8 w-8 items-center justify-center rounded-full border transition ${
                      estaAberto ? 'border-lime-400 text-lime-400 bg-lime-400/10' : 'border-zinc-700 text-zinc-400'
                    }`}>
                      {estaAberto ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {estaAberto && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 pt-2 text-zinc-400 text-sm border-t border-zinc-800/50">
                          <p className="leading-relaxed text-zinc-300">{servico.resumo}</p>
                          
                          <ul className="mt-4 space-y-2">
                            {servico.detalhes.map((item, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-xs text-zinc-400">
                                <CheckCircle2 className="h-4 w-4 text-lime-400 shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}