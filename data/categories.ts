export type Category = {
  name: string;
  slug: string;
  description: string;
  color: string;
};

export const categories: Category[] = [
  {
    name: "Umum",
    slug: "umum",
    description: "Informasi kesehatan umum untuk semua kalangan — tips hidup sehat, pencegahan penyakit, dan kebiasaan sehat sehari-hari.",
    color: "#0098b0",
  },
  {
    name: "Nutrisi",
    slug: "nutrisi",
    description: "Panduan nutrisi dan gizi seimbang untuk membantu Anda memilih makanan terbaik demi kesehatan optimal.",
    color: "#2596be",
  },
  {
    name: "Keluarga",
    slug: "keluarga",
    description: "Tips kesehatan untuk seluruh anggota keluarga — dari bayi, anak-anak, remaja, hingga lansia.",
    color: "#0d9488",
  },
  {
    name: "Pria & Wanita",
    slug: "pria-wanita",
    description: "Informasi kesehatan spesifik untuk pria dan wanita, mencakup kesehatan reproduksi, hormonal, dan kebugaran.",
    color: "#7c3aed",
  },
  {
    name: "Jiwa",
    slug: "jiwa",
    description: "Panduan kesehatan mental dan emosional — dari mengelola stres, anxiety, hingga menemukan keseimbangan hidup.",
    color: "#db2777",
  },
  {
    name: "Kesehatan & Karir",
    slug: "kesehatan-karir",
    description: "Tips menjaga kesehatan di tengah kesibukan kerja — ergonomi, work-life balance, dan produktivitas sehat.",
    color: "#d97706",
  },
];

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find((cat) => cat.slug === slug);
};
