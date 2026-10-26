import { ApiResponse, Book } from '../types/book';

const initialBooks: Book[] = [
  {
    id: 'book-1',
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    author: 'Robert C. Martin',
    category: 'CNTT',
    publishedYear: 2008,
    availableCopies: 3,
    coverImage: '/covers/book-1.jpg',
  },
  {
    id: 'book-2',
    title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
    author: 'Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides',
    category: 'CNTT',
    publishedYear: 1994,
    availableCopies: 2,
    coverImage: '/covers/book-2.jpg',
  },
  {
    id: 'book-3',
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    category: 'CNTT',
    publishedYear: 2017,
    availableCopies: 1,
    coverImage: '/covers/book-3.jpg',
  },
  {
    id: 'book-4',
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein',
    category: 'CNTT',
    publishedYear: 2009,
    availableCopies: 0,
    coverImage: '/covers/book-4.jpg',
  },
  {
    id: 'book-5',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    category: 'Kinh tế',
    publishedYear: 2011,
    availableCopies: 4,
    coverImage: '/covers/book-5.jpg',
  },
  {
    id: 'book-6',
    title: 'Principles: Life and Work',
    author: 'Ray Dalio',
    category: 'Kinh tế',
    publishedYear: 2017,
    availableCopies: 2,
    coverImage: '/covers/book-6.jpg',
  },
  {
    id: 'book-7',
    title: 'Blue Ocean Strategy',
    author: 'W. Chan Kim, Renée Mauborgne',
    category: 'Kinh tế',
    publishedYear: 2015,
    availableCopies: 3,
    coverImage: '/covers/book-7.jpg',
  },
  {
    id: 'book-8',
    title: 'English Grammar in Use',
    author: 'Raymond Murphy',
    category: 'Ngoại ngữ',
    publishedYear: 2019,
    availableCopies: 2,
    coverImage: '/covers/book-8.jpg',
  },
  {
    id: 'book-9',
    title: 'Word Power Made Easy',
    author: 'Norman Lewis',
    category: 'Ngoại ngữ',
    publishedYear: 2014,
    availableCopies: 5,
    coverImage: '/covers/book-9.jpg',
  },
  {
    id: 'book-10',
    title: "Oxford Advanced Learner's Dictionary",
    author: 'A. S. Hornby',
    category: 'Ngoại ngữ',
    publishedYear: 2020,
    availableCopies: 1,
    coverImage: '/covers/book-10.jpg',
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
