export interface Category {
  id: string;
  name: string;
  image: string;
  link: string;
}

export const categories: Category[] = [
  {
    id: 'women',
    name: 'Women',
    image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=600&auto=format&fit=crop&q=80',
    link: '#women'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=80',
    link: '#accessories'
  },
  {
    id: 'men',
    name: 'Men',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&auto=format&fit=crop&q=80',
    link: '#men'
  }
];
