'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  UserRound,
  ShoppingBag,
} from "lucide-react";
import { useCart } from "./CartContent";

export default function Header() {
  const { cart } = useCart();
  const pathname = usePathname();

  // Função auxiliar para verificar se a rota está ativa
  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-[1400px] items-center px-8">

        {/* LOGO */}
        <Link href="/" className="flex shrink-0 items-center transition-transform duration-300 hover:scale-105">
          <div className="relative h-10 w-10">
            <img
              src="/logo.png"
              alt="Dimension Atelier"
              className="h-full w-full object-contain"
            />
          </div>
        </Link>

        {/* NAVEGAÇÃO CENTRAL */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 text-sm md:flex">
          
          {/* Link: Início */}
          <Link
            href="/"
            className={`relative py-1 transition-all duration-300 ease-in-out ${
              isActive('/') 
                ? 'font-bold text-base text-zinc-900 scale-105' 
                : 'font-medium text-zinc-500 hover:text-zinc-900'
            }`}
          >
            Início
            <span
              className={`absolute bottom-0 left-0 h-[2px] w-full bg-zinc-900 transition-all duration-300 ease-in-out ${
                isActive('/') ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
              }`}
            />
          </Link>

          {/* Link: Produtos */}
          <Link
            href="/#produtos"
            className="relative py-1 font-medium text-zinc-500 transition-all duration-300 ease-in-out hover:text-zinc-900"
          >
            Produtos
          </Link>

          {/* Link: Serviços */}
          <Link
            href="/#servicos"
            className="relative py-1 font-medium text-zinc-500 transition-all duration-300 ease-in-out hover:text-zinc-900"
          >
            Serviços
          </Link>

          {/* Link: Pedir Produto */}
          <Link
            href="/pedir"
            className={`relative py-1 transition-all duration-300 ease-in-out ${
              isActive('/pedir') 
                ? 'font-bold text-base text-zinc-900 scale-105' 
                : 'font-medium text-zinc-500 hover:text-zinc-900'
            }`}
          >
            Pedir Produto
            <span
              className={`absolute bottom-0 left-0 h-[2px] w-full bg-zinc-900 transition-all duration-300 ease-in-out ${
                isActive('/pedir') ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
              }`}
            />
          </Link>

          {/* Link: Portfólio */}
          <Link
            href="/#portifolio"
            className="relative py-1 font-medium text-zinc-500 transition-all duration-300 ease-in-out hover:text-zinc-900"
          >
            Portfólio
          </Link>

        </nav>

        {/* ÍCONES À DIREITA */}
        <div className="ml-auto flex items-center gap-5">

          {/* Pesquisa */}
          <button
            aria-label="Pesquisar"
            className="transition-transform duration-200 hover:scale-110 hover:opacity-80 active:scale-95"
          >
            <Search size={20} strokeWidth={1.5} />
          </button>

          {/* Conta */}
          <button
            aria-label="Conta"
            className="transition-transform duration-200 hover:scale-110 hover:opacity-80 active:scale-95"
          >
            <UserRound size={20} strokeWidth={1.5} />
          </button>

          {/* Carrinho */}
          <Link
            href="/carrinho"
            aria-label="Carrinho"
            className={`relative transition-all duration-300 hover:scale-110 active:scale-95 ${
              isActive('/carrinho') ? 'text-zinc-900' : 'text-zinc-600'
            }`}
          >
            <ShoppingBag size={20} strokeWidth={isActive('/carrinho') ? 2.5 : 1.5} />
            {cart.length > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-lime-400 text-[10px] font-black text-zinc-900 transition-all duration-300 animate-in zoom-in">
                {cart.length}
              </span>
            )}
          </Link>

        </div>
      </div>
    </header>
  );
}