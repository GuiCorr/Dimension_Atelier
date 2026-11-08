import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Palavra-passe de admin definida nas variáveis de ambiente da Vercel (ou fallback para teste)
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'atelier2026';

// GET: Lista todos os produtos (Público)
export async function GET() {
  try {
    const { data, error } = await supabase.from('produtos').select('*');

    if (error) {
      console.error('Erro ao buscar produtos:', error);
      return NextResponse.json({ error: 'Erro ao buscar produtos' }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (error) {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}

// POST: Adiciona um novo produto
export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('x-admin-secret');

    // Validação simples por palavra-passe/token no cabeçalho
    if (authHeader !== ADMIN_SECRET) {
      return NextResponse.json({ error: 'Não autorizado. Chave de admin inválida.' }, { status: 401 });
    }

    const body = await request.json();

    if (!body.nome || !body.preco) {
      return NextResponse.json({ error: 'Nome e preço são obrigatórios' }, { status: 400 });
    }

    const novoProduto = {
      id: Date.now().toString(),
      nome: body.nome,
      preco: Number(body.preco),
      imagens: body.imagens || [],
      descricao: body.descricao || '',
      cores: body.cores || [],
    };

    const { data, error } = await supabase
      .from('produtos')
      .insert([novoProduto])
      .select()
      .single();

    if (error) {
      console.error('Erro no Supabase:', error);
      return NextResponse.json({ error: 'Erro ao guardar na base de dados: ' + error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, produto: data });
  } catch (error: any) {
    return NextResponse.json({ error: 'Erro interno ao processar pedido' }, { status: 500 });
  }
}

// DELETE: Apaga um produto por ID
export async function DELETE(request: Request) {
  try {
    const authHeader = request.headers.get('x-admin-secret');

    if (authHeader !== ADMIN_SECRET) {
      return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
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
      return NextResponse.json({ error: 'Erro ao apagar no Supabase' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao apagar produto' }, { status: 500 });
  }
}