/**
 * 병점복합타운 랜딩페이지 - 구글 시트 연동 Apps Script
 *
 * ============================================
 * 설정 방법 (따라하세요!)
 * ============================================
 *
 * 1. 구글 시트 열기:
 *    https://docs.google.com/spreadsheets/d/1Xr9b6mZT0fWVCZjlR_kMrgFi5lWBLRL37Rk3O2y3FDQ/edit
 *
 * 2. 상단 메뉴에서 [확장 프로그램] > [Apps Script] 클릭
 *
 * 3. 기존 코드를 모두 삭제하고, 아래 코드를 복사하여 붙여넣기
 *
 * 4. 저장 (Ctrl + S)
 *
 * 5. 배포하기:
 *    - 오른쪽 상단 [배포] 버튼 클릭
 *    - [새 배포] 선택
 *    - 유형 선택: ⚙️ 톱니바퀴 > [웹 앱] 선택
 *    - 설정:
 *      - 설명: "병점복합타운 폼 연동"
 *      - 실행 주체: "나"
 *      - 액세스 권한: "모든 사용자"
 *    - [배포] 클릭
 *
 * 6. 권한 승인:
 *    - "액세스 승인" 클릭
 *    - 구글 계정 선택
 *    - "고급" 클릭 > "프로젝트명(안전하지 않음)으로 이동" 클릭
 *    - "허용" 클릭
 *
 * 7. 생성된 웹 앱 URL 복사 (https://script.google.com/macros/s/xxxxx/exec 형태)
 *
 * 8. 프로젝트 폴더에 .env.local 파일 생성 후 아래 내용 추가:
 *    NEXT_PUBLIC_GOOGLE_SCRIPT_URL=복사한_URL
 *
 * 9. 개발 서버 재시작 (npm run dev)
 *
 * ============================================
 */

// 스프레드시트 ID (이미 설정됨)
const SPREADSHEET_ID = '1Xr9b6mZT0fWVCZjlR_kMrgFi5lWBLRL37Rk3O2y3FDQ';
const SHEET_NAME = '상담신청';

/**
 * POST 요청 처리 - 폼 데이터 저장
 */
function doPost(e) {
  try {
    // CORS 헤더 설정
    const output = ContentService.createTextOutput();

    // 데이터 파싱
    const data = JSON.parse(e.postData.contents);

    // 스프레드시트 열기
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);

    // 시트가 없으면 생성
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);

      // 헤더 추가
      const headers = ['접수일시', '이름', '연락처', '이메일', '관심분야', '문의내용', '상태', '메모'];
      sheet.appendRow(headers);

      // 헤더 스타일링
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#6B46C1');
      headerRange.setFontColor('#FFFFFF');
      headerRange.setFontWeight('bold');
      headerRange.setHorizontalAlignment('center');

      // 열 너비 조정
      sheet.setColumnWidth(1, 150);  // 접수일시
      sheet.setColumnWidth(2, 80);   // 이름
      sheet.setColumnWidth(3, 120);  // 연락처
      sheet.setColumnWidth(4, 180);  // 이메일
      sheet.setColumnWidth(5, 80);   // 관심분야
      sheet.setColumnWidth(6, 300);  // 문의내용
      sheet.setColumnWidth(7, 80);   // 상태
      sheet.setColumnWidth(8, 200);  // 메모

      // 첫 행 고정
      sheet.setFrozenRows(1);
    }

    // 한국 시간으로 변환
    const now = new Date();
    const koreaTime = Utilities.formatDate(now, 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss');

    // 데이터 추가
    sheet.appendRow([
      koreaTime,
      data.name || '',
      data.phone || '',
      data.email || '',
      data.interest || '',
      data.message || '',
      '신규',
      ''
    ]);

    // 새로 추가된 행에 스타일 적용
    const lastRow = sheet.getLastRow();
    const statusCell = sheet.getRange(lastRow, 7);
    statusCell.setBackground('#E8F5E9');  // 연한 초록색
    statusCell.setFontWeight('bold');

    // 성공 응답
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: '상담 신청이 접수되었습니다.',
        row: lastRow
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // 에러 로깅
    console.error('Error:', error);

    // 에러 응답
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: '오류가 발생했습니다: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * GET 요청 처리 - API 상태 확인용
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      success: true,
      message: '병점복합타운 API가 정상 작동 중입니다.',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * 테스트 함수 - Apps Script 에디터에서 실행하여 테스트
 */
function testDoPost() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        name: '홍길동',
        phone: '010-1234-5678',
        email: 'test@example.com',
        interest: '창업',
        message: '카페 창업에 관심이 있습니다. 상담 부탁드립니다.',
        timestamp: new Date().toISOString()
      })
    }
  };

  const result = doPost(testData);
  Logger.log(result.getContent());
}

/**
 * 시트 초기화 함수 - 필요시 실행
 */
function initializeSheet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (sheet) {
    ss.deleteSheet(sheet);
  }

  // 새 시트 생성
  sheet = ss.insertSheet(SHEET_NAME);

  // 헤더 추가
  const headers = ['접수일시', '이름', '연락처', '이메일', '관심분야', '문의내용', '상태', '메모'];
  sheet.appendRow(headers);

  // 헤더 스타일링
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground('#6B46C1');
  headerRange.setFontColor('#FFFFFF');
  headerRange.setFontWeight('bold');
  headerRange.setHorizontalAlignment('center');

  // 열 너비 조정
  sheet.setColumnWidth(1, 150);
  sheet.setColumnWidth(2, 80);
  sheet.setColumnWidth(3, 120);
  sheet.setColumnWidth(4, 180);
  sheet.setColumnWidth(5, 80);
  sheet.setColumnWidth(6, 300);
  sheet.setColumnWidth(7, 80);
  sheet.setColumnWidth(8, 200);

  sheet.setFrozenRows(1);

  Logger.log('시트가 초기화되었습니다.');
}
