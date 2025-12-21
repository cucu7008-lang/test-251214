// Firebase 데이터 동기화 유틸리티
import { collection, addDoc, setDoc, doc, getDocs, query, where, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject, listAll } from 'firebase/storage';
import { db, storage } from './firebase';

// 리뷰 데이터 타입
interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userEmail: string;
  rating: number;
  comment: string;
  images?: string[]; // 리뷰 이미지 URL 배열 (선택사항)
  createdAt: string;
}

// 상품 데이터 타입
interface Product {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  price: string;
  area: string;
  floor: string;
  deposit: string;
  features: string[];
  amenities: string[];
  images: string[]; // 이미지 URL 배열
  location: {
    address: string;
    distance: string;
  };
}

// 사용자 데이터 타입
interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  lastLoginAt?: string;
}

// 주문 데이터 타입
interface Order {
  id: string;
  userId: string;
  productId: string;
  productTitle: string;
  amount: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  date: string;
  customerName: string;
  customerEmail: string;
}

// 상품 데이터 Firebase에 동기화
export async function syncProductsToFirebase() {
  console.log('📦 상품 데이터 동기화 시작...');

  const products: Product[] = [
    {
      id: 'product-1',
      title: '병점복합타운 프리미엄 상가',
      description: '병점역 도보 5분 거리의 최고 입지! 높은 유동인구와 편리한 접근성으로 사업 성공을 보장합니다.',
      fullDescription: `병점역에서 도보 5분 거리에 위치한 프리미엄 1층 상가입니다.

주변에 아파트 단지와 오피스텔이 밀집되어 있어 안정적인 유동인구가 보장됩니다. 카페, 음식점, 편의점, 소매점 등 다양한 업종에 적합하며, 넓은 전면 유리창으로 시인성이 뛰어납니다.

최근 리모델링을 완료하여 깨끗한 상태이며, 바로 영업이 가능합니다. 주차 공간도 충분하여 고객 편의성이 우수합니다.`,
      price: '월 250만원',
      area: '50평 (165㎡)',
      floor: '1층',
      deposit: '5,000만원',
      features: ['역세권', '주차 가능', '1층 상가', '화장실 별도', '전면 유리창', '리모델링 완료'],
      amenities: ['냉난방', '주차 5대', '화장실 2개', '탈의실', '창고', 'WiFi'],
      images: [
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
        'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800',
      ],
      location: {
        address: '경기도 화성시 병점동 123-45 병점복합타운 1층',
        distance: '병점역 도보 5분',
      },
    },
    {
      id: 'product-2',
      title: '병점복합타운 고급 사무실',
      description: '쾌적한 업무 환경과 현대적인 인테리어로 고급스러운 사무 공간을 제공합니다.',
      fullDescription: `병점복합타운의 7층에 위치한 고급 사무실입니다. 남향으로 배치되어 하루 종일 자연 채광이 풍부하며, 탁 트인 전망으로 쾌적한 업무 환경을 제공합니다.

현대적인 인테리어와 함께 회의실, 휴게실이 별도로 구성되어 있어 직원 복지와 업무 효율을 모두 고려한 공간입니다. IT 스타트업, 컨설팅 회사, 디자인 스튜디오 등에 최적화되어 있습니다.

전용 주차 공간 2대가 제공되며, 24시간 출입이 가능한 보안 시스템이 갖춰져 있습니다.`,
      price: '월 180만원',
      area: '35평 (115㎡)',
      floor: '7층',
      deposit: '3,000만원',
      features: ['채광 우수', '주차 2대', '회의실 포함', '냉난방 완비', '남향', '24시간 출입'],
      amenities: ['회의실', '휴게실', '개별 냉난방', '주차 2대', '보안 시스템', '엘리베이터'],
      images: [
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800',
        'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800',
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800',
      ],
      location: {
        address: '경기도 화성시 병점동 123-45 병점복합타운 7층',
        distance: '병점역 도보 5분',
      },
    },
    {
      id: 'product-3',
      title: '병점복합타운 코너 상가',
      description: '양면 개방형 코너 상가로 최대 노출도! 카페, 음식점, 소매점에 최적화된 공간입니다.',
      fullDescription: `교차로 코너에 위치한 프리미엄 양면 개방형 상가입니다. 양쪽에서 모두 접근이 가능하여 시인성과 접근성이 매우 우수합니다.

넓은 65평 공간으로 카페, 레스토랑, 브랜드 매장 등 다양한 업종에 활용 가능합니다. 천고가 높아 개방감이 뛰어나며, 전면 통유리로 내부가 잘 보여 고객 유입에 유리합니다.

1층과 지하층을 연결하는 덤웨이터(소형 화물 엘리베이터)가 설치되어 있어 물류 이동이 편리하며, 넓은 주차장이 인접해 있어 고객 편의성이 뛰어납니다.`,
      price: '월 320만원',
      area: '65평 (214㎡)',
      floor: '1층 + 지하',
      deposit: '7,000만원',
      features: ['코너 상가', '양면 출입', '넓은 주차장', '덤웨이터', '높은 천고', '통유리'],
      amenities: ['덤웨이터', '주차 10대', '냉난방', '화장실 3개', '창고', '야외 테라스'],
      images: [
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
        'https://images.unsplash.com/photo-1445991842772-097fea258e7b?w=800',
        'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?w=800',
      ],
      location: {
        address: '경기도 화성시 병점동 123-45 병점복합타운 1층',
        distance: '병점역 도보 3분',
      },
    },
  ];

  try {
    for (const product of products) {
      await setDoc(doc(db, 'products', product.id), product);
      console.log(`✅ 상품 ${product.id} 동기화 완료`);
    }
    console.log(`✅ 총 ${products.length}개 상품 동기화 완료`);
    return { success: true, message: `총 ${products.length}개 상품이 Firebase에 동기화되었습니다.`, count: products.length };
  } catch (error) {
    console.error('❌ 상품 동기화 오류:', error);
    return { success: false, error: error instanceof Error ? error.message : '알 수 없는 오류' };
  }
}

// 샘플 사용자 데이터 동기화
export async function syncUsersToFirebase() {
  console.log('👥 사용자 데이터 동기화 시작...');

  const users: User[] = [
    { id: '1', name: '김철수', email: 'kim@example.com', role: 'user', status: 'active', createdAt: '2025-01-15', lastLoginAt: '2025-01-20' },
    { id: '2', name: '이영희', email: 'lee@example.com', role: 'admin', status: 'active', createdAt: '2025-01-10', lastLoginAt: '2025-01-20' },
    { id: '3', name: '박민수', email: 'park@example.com', role: 'user', status: 'inactive', createdAt: '2025-01-05', lastLoginAt: '2025-01-18' },
  ];

  try {
    for (const user of users) {
      await setDoc(doc(db, 'users', user.id), user);
      console.log(`✅ 사용자 ${user.id} (${user.name}) 동기화 완료`);
    }
    console.log(`✅ 총 ${users.length}명 사용자 동기화 완료`);
    return { success: true, message: `총 ${users.length}명 사용자가 Firebase에 동기화되었습니다.`, count: users.length };
  } catch (error) {
    console.error('❌ 사용자 동기화 오류:', error);
    return { success: false, error: error instanceof Error ? error.message : '알 수 없는 오류' };
  }
}

// 샘플 주문 데이터 동기화
export async function syncOrdersToFirebase() {
  console.log('📋 주문 데이터 동기화 시작...');

  const orders: Order[] = [
    {
      id: 'ORD-2025-001',
      userId: '1',
      productId: 'product-1',
      productTitle: '병점복합타운 프리미엄 상가',
      amount: '월 250만원',
      status: 'in-progress',
      date: '2025-01-15',
      customerName: '김철수',
      customerEmail: 'kim@example.com',
    },
    {
      id: 'ORD-2025-002',
      userId: '3',
      productId: 'product-2',
      productTitle: '병점복합타운 고급 사무실',
      amount: '월 180만원',
      status: 'completed',
      date: '2025-01-10',
      customerName: '박민수',
      customerEmail: 'park@example.com',
    },
  ];

  try {
    for (const order of orders) {
      await setDoc(doc(db, 'orders', order.id), order);
      console.log(`✅ 주문 ${order.id} 동기화 완료`);
    }
    console.log(`✅ 총 ${orders.length}건 주문 동기화 완료`);
    return { success: true, message: `총 ${orders.length}건 주문이 Firebase에 동기화되었습니다.`, count: orders.length };
  } catch (error) {
    console.error('❌ 주문 동기화 오류:', error);
    return { success: false, error: error instanceof Error ? error.message : '알 수 없는 오류' };
  }
}

// 모든 데이터 동기화
export async function syncAllDataToFirebase() {
  console.log('🔄 Firebase 전체 데이터 동기화 시작...');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  const productResult = await syncProductsToFirebase();
  const userResult = await syncUsersToFirebase();
  const orderResult = await syncOrdersToFirebase();
  const reviewResult = await syncReviewsToFirebase();

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ Firebase 전체 데이터 동기화 완료!');
  console.log(`📦 상품: ${productResult.count || 0}개`);
  console.log(`👥 사용자: ${userResult.count || 0}명`);
  console.log(`📋 주문: ${orderResult.count || 0}건`);
  console.log(`⭐ 리뷰: ${reviewResult.count || 0}개`);

  return {
    products: productResult,
    users: userResult,
    orders: orderResult,
    reviews: reviewResult,
  };
}

// Firebase에서 상품 데이터 가져오기
export async function getProductsFromFirebase() {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const products: Product[] = [];
    querySnapshot.forEach((doc) => {
      products.push(doc.data() as Product);
    });
    return products;
  } catch (error) {
    console.error('상품 데이터 가져오기 오류:', error);
    return [];
  }
}

// Firebase에서 사용자 데이터 가져오기
export async function getUsersFromFirebase() {
  try {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const users: User[] = [];
    querySnapshot.forEach((doc) => {
      users.push(doc.data() as User);
    });
    return users;
  } catch (error) {
    console.error('사용자 데이터 가져오기 오류:', error);
    return [];
  }
}

// Firebase에서 주문 데이터 가져오기
export async function getOrdersFromFirebase() {
  try {
    const querySnapshot = await getDocs(collection(db, 'orders'));
    const orders: Order[] = [];
    querySnapshot.forEach((doc) => {
      orders.push(doc.data() as Order);
    });
    return orders;
  } catch (error) {
    console.error('주문 데이터 가져오기 오류:', error);
    return [];
  }
}

// 샘플 리뷰 데이터 동기화
export async function syncReviewsToFirebase() {
  console.log('⭐ 리뷰 데이터 동기화 시작...');

  const reviews: Review[] = [
    {
      id: 'review-1',
      productId: 'product-1',
      userId: '1',
      userName: '김철수',
      userEmail: 'kim@example.com',
      rating: 5,
      comment: '위치가 정말 좋고 시설도 깨끗합니다. 카페 운영하기 딱 좋은 공간이에요!',
      createdAt: '2025-01-18',
    },
    {
      id: 'review-2',
      productId: 'product-1',
      userId: '3',
      userName: '박민수',
      userEmail: 'park@example.com',
      rating: 4,
      comment: '전반적으로 만족스럽습니다. 주차 공간이 넉넉해서 좋아요.',
      createdAt: '2025-01-19',
    },
    {
      id: 'review-3',
      productId: 'product-2',
      userId: '2',
      userName: '이영희',
      userEmail: 'lee@example.com',
      rating: 5,
      comment: '사무실 환경이 매우 쾌적하고 직원들이 정말 좋아합니다. 강력 추천!',
      createdAt: '2025-01-17',
    },
    {
      id: 'review-4',
      productId: 'product-3',
      userId: '1',
      userName: '김철수',
      userEmail: 'kim@example.com',
      rating: 5,
      comment: '코너 상가라 시인성이 정말 좋습니다. 매출이 많이 올랐어요!',
      createdAt: '2025-01-20',
    },
  ];

  try {
    for (const review of reviews) {
      await setDoc(doc(db, 'reviews', review.id), review);
      console.log(`✅ 리뷰 ${review.id} 동기화 완료`);
    }
    console.log(`✅ 총 ${reviews.length}개 리뷰 동기화 완료`);
    return { success: true, message: `총 ${reviews.length}개 리뷰가 Firebase에 동기화되었습니다.`, count: reviews.length };
  } catch (error) {
    console.error('❌ 리뷰 동기화 오류:', error);
    return { success: false, error: error instanceof Error ? error.message : '알 수 없는 오류' };
  }
}

// Firebase에서 특정 상품의 리뷰 가져오기
export async function getReviewsByProductId(productId: string) {
  try {
    const q = query(collection(db, 'reviews'), where('productId', '==', productId));
    const querySnapshot = await getDocs(q);
    const reviews: Review[] = [];
    querySnapshot.forEach((doc) => {
      reviews.push(doc.data() as Review);
    });
    return reviews;
  } catch (error) {
    console.error('리뷰 데이터 가져오기 오류:', error);
    return [];
  }
}

// Firebase에서 모든 리뷰 가져오기
export async function getAllReviewsFromFirebase() {
  try {
    const querySnapshot = await getDocs(collection(db, 'reviews'));
    const reviews: Review[] = [];
    querySnapshot.forEach((doc) => {
      reviews.push(doc.data() as Review);
    });
    return reviews;
  } catch (error) {
    console.error('리뷰 데이터 가져오기 오류:', error);
    return [];
  }
}

// Firebase Storage에 이미지 업로드
export async function uploadReviewImages(files: File[], reviewId: string): Promise<string[]> {
  try {
    const uploadPromises = files.map(async (file, index) => {
      const timestamp = Date.now();
      const fileName = `${reviewId}_${timestamp}_${index}.${file.name.split('.').pop()}`;
      const storageRef = ref(storage, `reviews/${reviewId}/${fileName}`);

      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      console.log(`✅ 이미지 업로드 완료: ${fileName}`);
      return downloadURL;
    });

    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls;
  } catch (error) {
    console.error('❌ 이미지 업로드 오류:', error);
    throw error;
  }
}

// 리뷰 추가
export async function addReviewToFirebase(review: Omit<Review, 'id' | 'createdAt'>) {
  try {
    const newReview: Review = {
      ...review,
      id: `review-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    await setDoc(doc(db, 'reviews', newReview.id), newReview);
    console.log(`✅ 리뷰 ${newReview.id} 추가 완료`);
    return { success: true, review: newReview };
  } catch (error) {
    console.error('❌ 리뷰 추가 오류:', error);
    return { success: false, error: error instanceof Error ? error.message : '알 수 없는 오류' };
  }
}

// 리뷰 삭제 (Firestore + Storage 이미지)
export async function deleteReviewFromFirebase(reviewId: string) {
  try {
    // 1. Storage에서 리뷰 이미지 폴더 삭제
    try {
      const reviewFolderRef = ref(storage, `reviews/${reviewId}`);
      const fileList = await listAll(reviewFolderRef);

      // 모든 이미지 파일 삭제
      const deletePromises = fileList.items.map((item) => deleteObject(item));
      await Promise.all(deletePromises);

      console.log(`✅ 리뷰 ${reviewId}의 이미지 ${fileList.items.length}개 삭제 완료`);
    } catch (storageError) {
      console.log('⚠️ Storage 이미지 삭제 중 오류 (이미지가 없을 수 있음):', storageError);
    }

    // 2. Firestore에서 리뷰 문서 삭제
    await deleteDoc(doc(db, 'reviews', reviewId));
    console.log(`✅ 리뷰 ${reviewId} Firestore 문서 삭제 완료`);

    return { success: true, message: '리뷰가 성공적으로 삭제되었습니다.' };
  } catch (error) {
    console.error('❌ 리뷰 삭제 오류:', error);
    return { success: false, error: error instanceof Error ? error.message : '알 수 없는 오류' };
  }
}
