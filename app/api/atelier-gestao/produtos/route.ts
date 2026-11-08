import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabase } from '@/lib/supabase';

// GET: Lista todos os produtos do Supabase (Público)
export async function GET() {
  try {
    const { data, error } = await supabase.from('produtos').select('*');

    if (error) {
      console.error('Erro ao buscar produtos no Supabase:', error);
      return NextResponse.json({ error: 'Erro ao buscar produtos' }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Erro interno na rota GET:', error);
    return NextResponse.json({ error: 'Erro interno no servidor' }, { status: 500 });
  }
}

// POST: Adiciona um novo produto (Protegido por cookie de administrador)
export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('atelier_session');

    // Validação de sessão do administrador
    if (!session || session.value !== 'true') {
      return NextResponse.json({ error: 'Não autorizado. Sessão inválida ou expirada.' }, { status: 401 });
    }

    const body = await request.json();

    // Validação básica dos campos obrigatórios
    if (!body.nome || !body.preco) {
      return NextResponse.json({ error: 'Nome e preço são obrigatórios' }, { status: 400 });
    }

    const novoProduto = {
      id: Date.now().toString(),
      nome: body.nome,
      preco: Number(body.preco),
      imagens: body.imagens || [],
      descricao: body.descricao || '',
      cores: body.cores || [], // Suporta o modelo estruturado de cores (nome e código hex)
    };

    const { data, error } = await supabase
      .from('produtos')
      .insert([novoProduto])
      .select()
      .single();

    if (error) {
      console.error('Erro ao inserir no Supabase:', error);
      return NextResponse.json({ error: 'Erro ao guardar na base de dados: ' + error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, produto: data });
  } catch (error: any) {
    console.error('Erro interno na rota POST:', error);
    return NextResponse.json({ error: 'Erro interno ao processar pedido: ' + error.message }, { status: 500 });
  }
}

// DELETE: Apaga um produto por ID (Protegido por cookie de administrador)
export async function DELETE(request: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('atelier_session');

    // Validação de sessão do administrador
    if (!session || session.value !== 'true') {
      return NextResponse.json({ error: 'Não autorizado. Sessão inválida ou expirada.' }, { status: 401 });
    }

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
      console.error('Erro ao apagar no Supabase:', error);
      return NextResponse.json({ error: 'Erro ao apagar no Supabase' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro interno na rota DELETE:', error);
    return NextResponse.json({ error: 'Erro ao apagar produto' }, { status: 500 });
  }
}