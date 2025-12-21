// Firebase 데이터 동기화 API
import { NextResponse } from 'next/server';
import { syncAllDataToFirebase } from '@/lib/firebaseSync';

export async function POST() {
  try {
    console.log('Firebase 데이터 동기화 시작...');
    const result = await syncAllDataToFirebase();

    console.log('동기화 결과:', result);

    return NextResponse.json({
      success: true,
      message: '데이터 동기화가 완료되었습니다.',
      result,
    });
  } catch (error) {
    console.error('동기화 API 오류:', error);
    return NextResponse.json(
      {
        success: false,
        message: '데이터 동기화 중 오류가 발생했습니다.',
        error: error instanceof Error ? error.message : '알 수 없는 오류',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'POST 요청을 사용하여 데이터를 동기화하세요.',
  });
}
