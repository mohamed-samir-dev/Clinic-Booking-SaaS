import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const specialty = searchParams.get('specialty');
    const limit = searchParams.get('limit') || '4';

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/doctors/top?specialty=${encodeURIComponent(specialty || '')}&limit=${limit}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      return NextResponse.json([], { status: 200 });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error fetching top doctors:', error);
    return NextResponse.json([], { status: 200 });
  }
}
