'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/atelier-gestao/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push('/'); // Vai para a página exclusiva de gestão
      router.refresh();
    } else {
      setErro('Palavra-passe incorreta. Tente novamente.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '320px', padding: '30px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>Painel de Administração</h2>
        <input
          type="password"
          placeholder="Insira a palavra-passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '10px', fontSize: '16px' }}
        />
        {erro && <p style={{ color: 'red', fontSize: '14px' }}>{erro}</p>}
        <button type="submit" style={{ padding: '10px', backgroundColor: '#000', color: '#fff', cursor: 'pointer', border: 'none', borderRadius: '4px' }}>
          Entrar
        </button>
      </form>
    </div>
  );
}