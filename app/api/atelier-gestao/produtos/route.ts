import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabase } from '@/lib/supabase';

// GET: Lista todos os produtos do Supabase
export async function GET() {
  const { data, error } = await supabase.from('produtos').select('*');

  if (error) {
    return NextResponse.json({ error: 'Erro ao buscar produtos' }, { status: 500 });
  }

  return NextResponse.json(data);
}

// POST: Adiciona um novo produto (Protegido por cookie)
export async function POST(request: Request) {
  const cookieStore = await cookies();
  const session = cookieStore.get('atelier_session');

  if (!session || session.value !== 'true') {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  try {
    const body = await request.json();

    const novoProduto = {
      id: Date.now().toString(),
      nome: body.nome,
      preco: Number(body.preco),
      imagens: body.imagens || [],
      descricao: body.descricao,
      cores: body.cores || [],
    };

    const { data, error } = await supabase
      .from('produtos')
      .insert([novoProduto])
      .select()
      .single();

    if (error) {
      console.error(error);
      return NextResponse.json({ error: 'Erro ao guardar no Supabase' }, { status: 500 });
    }

    return NextResponse.json({ success: true, produto: data });
  } catch (error) {
    return NextResponse.json({ error: 'Erro interno ao processar pedido' }, { status: 500 });
  }
}

// DELETE: Apaga um produto por ID (Protegido por cookie)
export async function DELETE(request: Request) {
  const cookieStore = await cookies();
  const session = cookieStore.get('atelier_session');

  if (!session || session.value !== 'true') {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID em falta' }, { status: 400 });
    }

    const { error } = await supabase
      .from('produtos')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: 'Erro ao apagar no Supabase' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao apagar produto' }, { status: 500 });
  }
}