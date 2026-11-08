import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function PainelAdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get('atelier_session');

  // Proteção: se não houver cookie válido, manda para a página de login
  if (!session || session.value !== 'true') {
    redirect('/atelier-gestao/acesso');
  }

  return (
    <div style={{ padding: '40px' }}>
      <h1>Painel de Gestão do Atelier</h1>
      <p>Bem-vindo à área restrita de administração. Aqui podes gerir os produtos e conteúdos do site.</p>
      {/* Podes colocar aqui os formulários de adicionar/apagar produtos que estavas a construir */}
    </div>
  );
}