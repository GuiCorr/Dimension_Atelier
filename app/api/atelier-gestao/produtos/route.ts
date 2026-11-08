import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'produtos.json');

// Função auxiliar para ler produtos
function getProdutos() {
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const fileData = fs.readFileSync(filePath, 'utf-8');
  try {
    return JSON.parse(fileData);
  } catch {
    return [];
  }
}

// GET: Lista todos os produtos
export async function GET() {
  const produtos = getProdutos();
  return NextResponse.json(produtos);
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
    const produtos = getProdutos();

    const novoProduto = {
      id: Date.now().toString(),
      nome: body.nome,
      preco: Number(body.preco),
      imagens: body.imagens ? body.imagens.filter((img: string) => img.trim() !== '') : [],
      descricao: body.descricao,
      cores: body.cores ? body.cores.split(',').map((c: string) => c.trim()).filter(Boolean) : [],
    };

    produtos.push(novoProduto);
    fs.writeFileSync(filePath, JSON.stringify(produtos, null, 2));

    return NextResponse.json({ success: true, produto: novoProduto });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao guardar produto' }, { status: 500 });
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

    let produtos = getProdutos();
    produtos = produtos.filter((p: any) => p.id !== id);

    fs.writeFileSync(filePath, JSON.stringify(produtos, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao apagar produto' }, { status: 500 });
  }
}