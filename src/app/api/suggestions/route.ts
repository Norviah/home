import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json([]);
  }

  const res = await fetch(`https://duckduckgo.com/ac/?q=${encodeURI(query)}`, {
    method: 'GET',

    mode: 'cors',
  });

  return NextResponse.json((await res.json()) as { phrase: string }[]);
}
