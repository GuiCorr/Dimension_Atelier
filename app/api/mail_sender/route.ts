import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Inicializa o Resend com a chave que vais obter no site deles
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nomeProduto, linkProduto, quantidade, orcamento, descricao, nomeCliente, emailCliente, telemovelCliente } = body;

    // Envia o email para o produtor (podes substituir pelo teu email real)
    const data = await resend.emails.send({
      from: 'Dimension Atelier <onboarding@resend.dev>',
      to: ['dimensionatelier@outlook.com'], // <-- O teu email onde queres receber os pedidos
      subject: `Novo Pedido Personalizado: ${nomeProduto}`,
      html: `
        <h2>Novo Pedido de Impressão 3D</h2>
        <p><strong>Cliente:</strong> ${nomeCliente} (${emailCliente})</p>
        <p><strong>Telemóvel:</strong> ${telemovelCliente}</p>
        <hr />
        <p><strong>Produto:</strong> ${nomeProduto}</p>
        <p><strong>Quantidade:</strong> ${quantidade}</p>
        <p><strong>Orçamento Máximo:</strong> ${orcamento ? orcamento + '€' : 'Não especificado'}</p>
        <p><strong>Link de referência:</strong> ${linkProduto || 'Nenhum'}</p>
        <p><strong>Descrição / Detalhes:</strong></p>
        <p>${descricao}</p>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}