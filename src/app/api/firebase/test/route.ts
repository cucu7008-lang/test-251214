// Firebase 연결 테스트 API
import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export async function GET() {
  try {
    console.log('Firebase 연결 테스트 시작...');

    // Firestore 연결 테스트 - 컬렉션 목록 확인
    const collections = ['products', 'users', 'orders'];
    const results: any = {};

    for (const collectionName of collections) {
      try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        results[collectionName] = {
          exists: true,
          count: querySnapshot.size,
          docs: querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        };
        console.log(`✅ ${collectionName}: ${querySnapshot.size}개 문서 발견`);
      } catch (error) {
        results[collectionName] = {
          exists: false,
          error: error instanceof Error ? error.message : '알 수 없는 오류'
        };
        console.error(`❌ ${collectionName} 오류:`, error);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Firebase 연결 테스트 완료',
      timestamp: new Date().toISOString(),
      collections: results,
    });
  } catch (error) {
    console.error('Firebase 테스트 오류:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Firebase 연결 테스트 실패',
        error: error instanceof Error ? error.message : '알 수 없는 오류',
      },
      { status: 500 }
    );
  }
}
