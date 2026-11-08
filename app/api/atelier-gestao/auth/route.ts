import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const senhaValida = process.env.ADMIN_PASSWORD || '123456'; // Podes alterar a senha aqui

    if (password === senhaValida) {
      const cookieStore = await cookies();
      cookieStore.set('atelier_session', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 7 dias de sessão válida
        path: '/',
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro no servidor' }, { status: 500 });
  }
}