import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const senhaValida = process.env.ADMIN_PASSWORD || 'Rucos2026!';

    if (password === senhaValida) {
      // Cookie discreto
      const cookieStore = await cookies();
      cookieStore.set('atelier_session', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });

      return NextResponse.json({ success: true });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Erro no servidor' }, { status: 500 });
  }
}