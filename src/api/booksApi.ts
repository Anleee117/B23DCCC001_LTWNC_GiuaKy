import { ApiResponse, Book } from '../types/book';

const initialBooks: Book[] = [
  {
    id: 'book-1',
    title: 'Cấu trúc dữ liệu và giải thuật',
    author: 'Nguyễn Văn A',
    category: 'CNTT',
    publishedYear: 2021,
    availableCopies: 3,
  },
  {
    id: 'book-2',
    title: 'Lập trình Web nâng cao',
    author: 'Trần Thị B',
    category: 'CNTT',
    publishedYear: 2023,
    availableCopies: 2,
  },
  {
    id: 'book-3',
    title: 'Thiết kế hệ thống phân tán',
    author: 'Lê Văn C',
    category: 'CNTT',
    publishedYear: 2022,
    availableCopies: 1,
  },
  {
    id: 'book-4',
    title: 'Trí tuệ nhân tạo căn bản',
    author: 'Phạm Đình D',
    category: 'CNTT',
    publishedYear: 2024,
    availableCopies: 0,
  },
  {
    id: 'book-5',
    title: 'Kinh tế vi mô ứng dụng',
    author: 'Hoàng Thị E',
    category: 'Kinh tế',
    publishedYear: 2020,
    availableCopies: 4,
  },
  {
    id: 'book-6',
    title: 'Quản trị tài chính doanh nghiệp',
    author: 'Đỗ Văn F',
    category: 'Kinh tế',
    publishedYear: 2022,
    availableCopies: 2,
  },
  {
    id: 'book-7',
    title: 'Marketing kỹ thuật số',
    author: 'Vũ Thị G',
    category: 'Kinh tế',
    publishedYear: 2023,
    availableCopies: 3,
  },
  {
    id: 'book-8',
    title: 'Tiếng Anh chuyên ngành CNTT',
    author: 'David Miller',
    category: 'Ngoại ngữ',
    publishedYear: 2021,
    availableCopies: 2,
  },
  {
    id: 'book-9',
    title: 'Ngữ pháp tiếng Anh nâng cao',
    author: 'Sarah Johnson',
    category: 'Ngoại ngữ',
    publishedYear: 2020,
    availableCopies: 5,
  },
  {
    id: 'book-10',
    title: 'Kỹ năng giao tiếp thương mại',
    author: 'Michael Brown',
    category: 'Ngoại ngữ',
    publishedYear: 2022,
    availableCopies: 1,
  },
];

export function fetchBooksApi(shouldFail = false): Promise<ApiResponse<Book[]>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (shouldFail) {
        resolve({
          ok: false,
          error: 'Không thể kết nối đến máy chủ thư viện. Vui lòng thử lại sau.',
        });
        return;
      }

      resolve({
        ok: true,
        data: initialBooks.map((book) => ({ ...book })),
      });
    }, 500);
  });
}
