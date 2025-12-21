'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Camera, Save, Plus, Trash2, MapPin } from 'lucide-react';

interface Address {
  id: string;
  name: string;
  address: string;
  detailAddress: string;
  zipCode: string;
  isDefault: boolean;
}

export default function ProfilePage() {
  const { data: session } = useSession();

  // 임시 사용자 프로필 데이터
  const [profile, setProfile] = useState({
    name: session?.user?.name || '',
    phone: '010-1234-5678',
    birthDate: '1990-01-01',
    profileImage: session?.user?.image || '',
  });

  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      name: '집',
      address: '경기도 화성시 병점동 123-45',
      detailAddress: '병점복합타운 101동 102호',
      zipCode: '18000',
      isDefault: true,
    },
    {
      id: '2',
      name: '회사',
      address: '서울시 강남구 테헤란로 123',
      detailAddress: '강남빌딩 5층',
      zipCode: '06234',
      isDefault: false,
    },
  ]);

  const [isEditing, setIsEditing] = useState(false);

  const handleSaveProfile = () => {
    // API 호출하여 프로필 업데이트
    console.log('프로필 업데이트:', profile);
    setIsEditing(false);
    alert('프로필이 업데이트되었습니다.');
  };

  const handleAddAddress = () => {
    const newAddress: Address = {
      id: Date.now().toString(),
      name: '새 주소',
      address: '',
      detailAddress: '',
      zipCode: '',
      isDefault: false,
    };
    setAddresses([...addresses, newAddress]);
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  const handleSetDefaultAddress = (id: string) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">내 정보</h1>
        <p className="text-gray-600">프로필 정보와 배송지를 관리할 수 있습니다.</p>
      </div>

      {/* 기본 정보 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">기본 정보</h2>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              수정하기
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
              >
                취소
              </button>
              <button
                onClick={handleSaveProfile}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                저장
              </button>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {/* 프로필 이미지 */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-3xl overflow-hidden">
                {profile.profileImage ? (
                  <img
                    src={profile.profileImage}
                    alt="프로필"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  session?.user?.name?.[0] || 'U'
                )}
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                  <Camera className="h-4 w-4" />
                </button>
              )}
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">
                {profile.name}
              </h3>
              <p className="text-sm text-gray-600">{session?.user?.email}</p>
            </div>
          </div>

          {/* 입력 필드 */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                이름
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                전화번호
              </label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) =>
                  setProfile({ ...profile, phone: e.target.value })
                }
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                생년월일
              </label>
              <input
                type="date"
                value={profile.birthDate}
                onChange={(e) =>
                  setProfile({ ...profile, birthDate: e.target.value })
                }
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                이메일 (변경 불가)
              </label>
              <input
                type="email"
                value={session?.user?.email || ''}
                disabled
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 주소 관리 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">배송지 관리</h2>
          <button
            onClick={handleAddAddress}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            새 주소 추가
          </button>
        </div>

        <div className="space-y-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              className={`p-5 rounded-xl border-2 transition-all ${
                address.isDefault
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <h3 className="font-bold text-gray-900">{address.name}</h3>
                  {address.isDefault && (
                    <span className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                      기본 배송지
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleDeleteAddress(address.id)}
                  className="text-red-600 hover:text-red-700 p-1"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-1 text-sm text-gray-700 mb-3">
                <p>
                  [{address.zipCode}] {address.address}
                </p>
                <p>{address.detailAddress}</p>
              </div>

              {!address.isDefault && (
                <button
                  onClick={() => handleSetDefaultAddress(address.id)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  기본 배송지로 설정
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 계정 정보 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-6">계정 정보</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-900 mb-1">비밀번호</h3>
              <p className="text-sm text-gray-600">
                마지막 변경: 2024년 12월 15일
              </p>
            </div>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium">
              변경하기
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-900 mb-1">회원 탈퇴</h3>
              <p className="text-sm text-gray-600">
                계정을 영구적으로 삭제합니다.
              </p>
            </div>
            <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium">
              탈퇴하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
