import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { placeId, apiKey } = await req.json();
    
    if (!placeId || !apiKey) {
      return NextResponse.json({ success: false, message: 'Google Place ID dan API Key diperlukan.' }, { status: 400 });
    }

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,reviews,url&key=${apiKey}&language=id`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status === 'OK') {
      return NextResponse.json({ success: true, data: data.result });
    } else {
      return NextResponse.json({ success: false, message: data.error_message || data.status }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
