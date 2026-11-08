'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function GestaoLoginPage() {
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(false);

    const res = await fetch('/api/atelier-gestao/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push('/atelier-gestao/produtos');
    } else {
      setErro(true);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-6">
      <div className="w-full max-w-md rounded-3xl border bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-black text-zinc-900">Gestão Dimension</h1>
        <p className="mt-2 text-sm text-zinc-500">Introduz a palavra-passe de acesso.</p>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-zinc-700">Palavra-passe</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-zinc-900"
            />
          </div>

          {erro && <p className="text-sm font-semibold text-red-500">Acesso negado.</p>}

          <button
            type="submit"
            className="w-full rounded-xl bg-zinc-900 py-3.5 text-sm font-bold text-white transition hover:bg-zinc-800"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}