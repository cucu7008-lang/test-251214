'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Star, Send, CheckCircle, Image as ImageIcon, X, ZoomIn, Trash2 } from 'lucide-react';
import { addReviewToFirebase, getProductsFromFirebase, getAllReviewsFromFirebase, uploadReviewImages, deleteReviewFromFirebase } from '@/lib/firebaseSync';

interface Product {
  id: string;
  title: string;
}

interface ReviewWithImages {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userEmail: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: string;
}

export default function ReviewTestPage() {
  const { data: session } = useSession();
  const [products, setProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<ReviewWithImages[]>([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [selectedReview, setSelectedReview] = useState<ReviewWithImages | null>(null);
  const [deleting, setDeleting] = useState(false);

  // 관리자 권한 확인
  const isAdmin = () => {
    const adminEmails = ['admin@sangadaiji.com', 'test@admin.com', 'cucu7008@gmail.com'];
    return session?.user?.email && adminEmails.includes(session.user.email);
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const productsData = await getProductsFromFirebase();
    setProducts(productsData);
    if (productsData.length > 0) {
      setSelectedProductId(productsData[0].id);
    }

    const reviewsData = await getAllReviewsFromFirebase();
    setReviews(reviewsData);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    // 최대 5개까지만 허용
    if (imageFiles.length + files.length > 5) {
      alert('이미지는 최대 5개까지만 첨부할 수 있습니다.');
      return;
    }

    setImageFiles(prev => [...prev, ...files]);

    // 미리보기 생성
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!comment.trim()) {
      alert('리뷰 내용을 입력해주세요.');
      return;
    }

    setSubmitting(true);
    setSubmitted(false);

    try {
      // 1. 먼저 리뷰 ID 생성
      const reviewId = `review-${Date.now()}`;

      // 2. 이미지가 있으면 Firebase Storage에 업로드
      let imageUrls: string[] = [];
      if (imageFiles.length > 0) {
        console.log('📤 이미지 업로드 중...');
        imageUrls = await uploadReviewImages(imageFiles, reviewId);
        console.log('✅ 이미지 업로드 완료:', imageUrls);
      }

      // 3. 리뷰 데이터를 Firestore에 저장
      const result = await addReviewToFirebase({
        productId: selectedProductId,
        userId: session?.user?.email || 'guest',
        userName: session?.user?.name || '게스트',
        userEmail: session?.user?.email || 'guest@test.com',
        rating: rating,
        comment: comment.trim(),
        images: imageUrls,
      });

      if (result.success) {
        setSubmitted(true);
        setComment('');
        setRating(5);
        setImageFiles([]);
        setImagePreviews([]);

        // 리뷰 목록 새로고침
        await loadData();

        setTimeout(() => setSubmitted(false), 3000);
      } else {
        alert('리뷰 작성 실패: ' + result.error);
      }
    } catch (error) {
      console.error('리뷰 작성 오류:', error);
      alert('리뷰 작성 중 오류가 발생했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!isAdmin()) {
      alert('관리자만 리뷰를 삭제할 수 있습니다.');
      return;
    }

    const confirmDelete = window.confirm('정말 이 리뷰를 삭제하시겠습니까?\n\n삭제된 리뷰와 첨부된 이미지는 복구할 수 없습니다.');

    if (!confirmDelete) {
      return;
    }

    setDeleting(true);

    try {
      const result = await deleteReviewFromFirebase(reviewId);

      if (result.success) {
        alert('리뷰가 성공적으로 삭제되었습니다.');
        setSelectedReview(null); // 모달 닫기
        await loadData(); // 리뷰 목록 새로고침
      } else {
        alert('리뷰 삭제 실패: ' + result.error);
      }
    } catch (error) {
      console.error('리뷰 삭제 오류:', error);
      alert('리뷰 삭제 중 오류가 발생했습니다.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* 페이지 헤더 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">리뷰 작성 테스트</h1>
          <p className="text-gray-700">
            상품 리뷰를 작성하고 Firebase에 실시간으로 저장됩니다.
          </p>
          {session && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                <strong className="text-green-900">{session.user?.name}</strong>님으로 로그인됨
              </p>
            </div>
          )}
          {!session && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                로그인하지 않아도 게스트로 리뷰를 작성할 수 있습니다.
              </p>
            </div>
          )}
        </div>

        {/* 리뷰 작성 폼 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">새 리뷰 작성</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 상품 선택 */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                상품 선택
              </label>
              <select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                required
              >
                {products.map((product) => (
                  <option key={product.id} value={product.id} className="text-gray-900">
                    {product.title}
                  </option>
                ))}
              </select>
            </div>

            {/* 별점 선택 */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                별점 ({rating}점)
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`h-10 w-10 ${
                        star <= (hoveredRating || rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* 리뷰 내용 */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                리뷰 내용
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="이 상품에 대한 솔직한 리뷰를 작성해주세요..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white text-gray-900 placeholder-gray-400"
                required
              />
              <p className="text-xs text-gray-600 mt-1">
                최소 10자 이상 작성해주세요.
              </p>
            </div>

            {/* 이미지 첨부 */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                이미지 첨부 (최대 5개)
              </label>

              {/* 이미지 미리보기 */}
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-5 gap-2 mb-3">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`미리보기 ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* 이미지 업로드 버튼 */}
              {imageFiles.length < 5 && (
                <label className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer">
                  <ImageIcon className="h-5 w-5 text-gray-600" />
                  <span className="text-sm text-gray-700 font-medium">
                    이미지 선택 ({imageFiles.length}/5)
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* 제출 버튼 */}
            <button
              type="submit"
              disabled={submitting || comment.length < 10}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  작성 중...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  리뷰 작성하기
                </>
              )}
            </button>
          </form>

          {/* 성공 메시지 */}
          {submitted && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg animate-fade-in">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-green-800 font-medium">
                  리뷰가 성공적으로 작성되었습니다!
                </span>
              </div>
            </div>
          )}
        </div>

        {/* 작성된 리뷰 목록 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            작성된 리뷰 ({reviews.length}개)
          </h2>

          {reviews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">아직 작성된 리뷰가 없습니다.</p>
              <p className="text-sm text-gray-500 mt-2">
                Firebase 동기화를 먼저 실행하거나 위에서 리뷰를 작성해보세요.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((review) => (
                  <div
                    key={review.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors bg-white cursor-pointer"
                    onClick={() => setSelectedReview(review)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-gray-900">{review.userName}</p>
                        <p className="text-xs text-gray-600">{review.userEmail}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-800 mb-2">{review.comment}</p>

                    {/* 리뷰 이미지 썸네일 표시 */}
                    {review.images && review.images.length > 0 && (
                      <div className="flex gap-2 mb-2 overflow-x-auto">
                        {review.images.slice(0, 4).map((img: string, idx: number) => (
                          <div key={idx} className="relative flex-shrink-0">
                            <img
                              src={img}
                              alt={`리뷰 이미지 ${idx + 1}`}
                              className="w-16 h-16 object-cover rounded border border-gray-200"
                            />
                            {idx === 3 && review.images && review.images.length > 4 && (
                              <div className="absolute inset-0 bg-black bg-opacity-50 rounded flex items-center justify-center">
                                <span className="text-white text-xs font-bold">
                                  +{review.images.length - 4}
                                </span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <span>상품 ID: {review.productId}</span>
                      <span>작성일: {review.createdAt}</span>
                      {review.images && review.images.length > 0 && (
                        <span className="flex items-center gap-1">
                          <ImageIcon className="h-3 w-3" />
                          {review.images.length}개
                        </span>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* 홈으로 돌아가기 */}
        <div className="text-center">
          <a
            href="/"
            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            ← 홈으로 돌아가기
          </a>
        </div>
      </div>

      {/* 리뷰 상세보기 모달 */}
      {selectedReview && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedReview(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 모달 헤더 */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">리뷰 상세보기</h3>
              <div className="flex items-center gap-2">
                {/* 관리자일 경우 삭제 버튼 표시 */}
                {isAdmin() && (
                  <button
                    onClick={() => handleDeleteReview(selectedReview.id)}
                    disabled={deleting}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                    title="리뷰 삭제"
                  >
                    {deleting ? (
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-600"></div>
                    ) : (
                      <Trash2 className="h-6 w-6 text-red-600 group-hover:text-red-700" />
                    )}
                  </button>
                )}
                <button
                  onClick={() => setSelectedReview(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-6 w-6 text-gray-600" />
                </button>
              </div>
            </div>

            {/* 모달 내용 */}
            <div className="p-6 space-y-4">
              {/* 작성자 정보 */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-bold text-lg text-gray-900">{selectedReview.userName}</p>
                  <p className="text-sm text-gray-600">{selectedReview.userEmail}</p>
                  <p className="text-xs text-gray-500 mt-1">{selectedReview.createdAt}</p>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < selectedReview.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* 리뷰 내용 */}
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-800 leading-relaxed">{selectedReview.comment}</p>
              </div>

              {/* 이미지 갤러리 */}
              {selectedReview.images && selectedReview.images.length > 0 && (
                <div className="space-y-2">
                  <p className="font-medium text-gray-900">첨부된 이미지 ({selectedReview.images.length}개)</p>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedReview.images.map((img: string, idx: number) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`리뷰 이미지 ${idx + 1}`}
                        className="w-full h-48 object-cover rounded-lg border border-gray-200 hover:opacity-90 transition-opacity cursor-pointer"
                        onClick={() => window.open(img, '_blank')}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* 상품 정보 */}
              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">상품 ID:</span> {selectedReview.productId}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
