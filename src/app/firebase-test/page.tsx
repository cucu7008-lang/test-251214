'use client';

import React, { useState } from 'react';
import { Database, CheckCircle, XCircle, Upload, Download } from 'lucide-react';
import { syncAllDataToFirebase, getProductsFromFirebase, getUsersFromFirebase, getOrdersFromFirebase } from '@/lib/firebaseSync';
import Link from 'next/link';

interface SyncResult {
  products?: { success: boolean; message?: string; count?: number; error?: string };
  users?: { success: boolean; message?: string; count?: number; error?: string };
  orders?: { success: boolean; message?: string; count?: number; error?: string };
  reviews?: { success: boolean; message?: string; count?: number; error?: string };
  error?: string;
}

interface FetchedData {
  products: unknown[];
  users: unknown[];
  orders: unknown[];
}

export default function FirebaseTestPage() {
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<SyncResult | null>(null);
  const [fetchedData, setFetchedData] = useState<FetchedData | null>(null);

  const handleSyncData = async () => {
    setSyncing(true);
    setSyncResult(null);

    try {
      console.log('Firebase 동기화 요청 시작...');

      // 직접 함수 호출
      const result = await syncAllDataToFirebase();
      console.log('동기화 결과:', result);

      setSyncResult(result);

      // 성공 메시지
      if (result.products?.success && result.users?.success && result.orders?.success) {
        alert('✅ 모든 데이터가 Firebase에 성공적으로 동기화되었습니다!');
      } else {
        alert('⚠️ 일부 데이터 동기화에 실패했습니다. 결과를 확인해주세요.');
      }
    } catch (error) {
      console.error('동기화 오류:', error);
      const errorMessage = error instanceof Error ? error.message : '동기화 중 오류가 발생했습니다.';
      setSyncResult({ error: errorMessage });
      alert(`❌ 동기화 실패: ${errorMessage}`);
    } finally {
      setSyncing(false);
    }
  };

  const handleFetchData = async () => {
    try {
      const products = await getProductsFromFirebase();
      const users = await getUsersFromFirebase();
      const orders = await getOrdersFromFirebase();

      setFetchedData({
        products,
        users,
        orders,
      });
    } catch (error) {
      console.error('데이터 가져오기 오류:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* 페이지 헤더 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Firebase 데이터 동기화 테스트</h1>
          <p className="text-gray-600">
            로그인 없이 Firebase 데이터를 동기화하고 조회할 수 있습니다.
          </p>
        </div>

        {/* Firebase 연결 정보 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center">
              <Database className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Firebase 연결 상태</h2>
              <p className="text-sm text-gray-600">프로젝트: daizzi-20251221</p>
            </div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-green-800 font-medium">Firebase 연결됨</span>
            </div>
          </div>
        </div>

        {/* 동기화 액션 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">데이터 동기화</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <button
              onClick={handleSyncData}
              disabled={syncing}
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Upload className="h-5 w-5" />
              {syncing ? '동기화 중...' : 'Firebase로 데이터 업로드'}
            </button>
            <button
              onClick={handleFetchData}
              className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              <Download className="h-5 w-5" />
              Firebase 데이터 조회
            </button>
          </div>

          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2">동기화될 컬렉션:</h3>
            <ul className="space-y-1 text-sm text-blue-800">
              <li>• <strong>products</strong> - 상품 데이터 (3개)</li>
              <li>• <strong>users</strong> - 사용자 데이터 (3명)</li>
              <li>• <strong>orders</strong> - 주문 데이터 (2건)</li>
            </ul>
            <div className="mt-3 pt-3 border-t border-blue-200">
              <p className="text-xs text-blue-700">
                ℹ️ Firestore 컬렉션이 자동으로 생성되며, 기존 데이터는 덮어쓰기됩니다.
              </p>
            </div>
          </div>
        </div>

        {/* 동기화 결과 */}
        {syncResult && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">동기화 결과</h2>
            <div className="space-y-3">
              {/* 상품 */}
              <div className={`p-4 rounded-lg border-2 ${syncResult.products?.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <div className="flex items-center gap-2 mb-2">
                  {syncResult.products?.success ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                  <span className={`font-medium ${syncResult.products?.success ? 'text-green-900' : 'text-red-900'}`}>
                    상품 데이터
                  </span>
                </div>
                <p className={`text-sm ${syncResult.products?.success ? 'text-green-800' : 'text-red-800'}`}>
                  {syncResult.products?.message || '오류 발생'}
                </p>
              </div>

              {/* 사용자 */}
              <div className={`p-4 rounded-lg border-2 ${syncResult.users?.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <div className="flex items-center gap-2 mb-2">
                  {syncResult.users?.success ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                  <span className={`font-medium ${syncResult.users?.success ? 'text-green-900' : 'text-red-900'}`}>
                    사용자 데이터
                  </span>
                </div>
                <p className={`text-sm ${syncResult.users?.success ? 'text-green-800' : 'text-red-800'}`}>
                  {syncResult.users?.message || '오류 발생'}
                </p>
              </div>

              {/* 주문 */}
              <div className={`p-4 rounded-lg border-2 ${syncResult.orders?.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <div className="flex items-center gap-2 mb-2">
                  {syncResult.orders?.success ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                  <span className={`font-medium ${syncResult.orders?.success ? 'text-green-900' : 'text-red-900'}`}>
                    주문 데이터
                  </span>
                </div>
                <p className={`text-sm ${syncResult.orders?.success ? 'text-green-800' : 'text-red-800'}`}>
                  {syncResult.orders?.message || '오류 발생'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 조회된 데이터 */}
        {fetchedData && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Firebase 데이터</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">상품 ({fetchedData.products.length}개)</h3>
                <div className="bg-gray-50 rounded-lg p-4 max-h-60 overflow-y-auto">
                  <pre className="text-xs text-gray-700">
                    {JSON.stringify(fetchedData.products, null, 2)}
                  </pre>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">사용자 ({fetchedData.users.length}명)</h3>
                <div className="bg-gray-50 rounded-lg p-4 max-h-60 overflow-y-auto">
                  <pre className="text-xs text-gray-700">
                    {JSON.stringify(fetchedData.users, null, 2)}
                  </pre>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">주문 ({fetchedData.orders.length}건)</h3>
                <div className="bg-gray-50 rounded-lg p-4 max-h-60 overflow-y-auto">
                  <pre className="text-xs text-gray-700">
                    {JSON.stringify(fetchedData.orders, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 홈으로 돌아가기 */}
        <div className="text-center">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            ← 홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
