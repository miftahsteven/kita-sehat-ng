export type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  categorySlug: string;
  image: string;
  author: string;
  authorAvatar?: string;
  publishedAt: string;
  readingTime: string;
  isFeatured?: boolean;
  isPopular?: boolean;
  isEditorsPick?: boolean;
  isHighlight?: boolean;
  views?: number;
  tags?: string[];
};

export const dummyArticles: Article[] = [
  // === FEATURED / HERO ===
  {
    id: "1",
    slug: "panduan-menjaga-imunitas-keluarga",
    title: "Panduan Lengkap Menjaga Imunitas Keluarga di Musim Pancaroba",
    excerpt:
      "Perubahan cuaca yang ekstrem dapat menurunkan daya tahan tubuh anggota keluarga. Simak langkah-langkah praktis yang bisa dilakukan setiap hari untuk menjaga imunitas tetap optimal.",
    content: `
<p>Musim pancaroba adalah periode peralihan musim yang ditandai dengan perubahan cuaca tak menentu — hujan deras bisa tiba-tiba berganti panas terik. Kondisi ini membuat tubuh harus bekerja lebih keras untuk beradaptasi, sehingga sistem imun bisa melemah jika tidak dijaga dengan baik.</p>

<h2>Mengapa Imunitas Rentan di Musim Pancaroba?</h2>
<p>Perubahan suhu yang mendadak memaksa tubuh terus menyesuaikan diri. Sel-sel imun membutuhkan energi ekstra dalam proses adaptasi ini, sementara virus dan bakteri justru berkembang subur di kondisi lembab dan tidak stabil.</p>

<h2>Langkah Praktis Menjaga Imunitas Keluarga</h2>
<ul>
<li>Konsumsi vitamin C secara rutin dari buah segar seperti jeruk, guava, dan stroberi</li>
<li>Pastikan tidur cukup minimal 7-8 jam per malam untuk orang dewasa</li>
<li>Perbanyak konsumsi sayuran hijau yang kaya antioksidan</li>
<li>Jaga hidrasi dengan minum minimal 8 gelas air per hari</li>
<li>Rutin berolahraga minimal 30 menit setiap hari</li>
</ul>

<h2>Suplemen yang Dianjurkan</h2>
<p>Selain dari makanan, suplemen seperti zinc, vitamin D, dan probiotik bisa membantu memperkuat sistem imun. Namun pastikan untuk berkonsultasi dengan dokter sebelum mengonsumsi suplemen, terutama untuk anak-anak.</p>

<blockquote>Imunitas yang kuat bukan dibangun dalam semalam. Ini adalah hasil dari kebiasaan hidup sehat yang konsisten setiap hari.</blockquote>

<h2>Pola Makan Anti-Inflamasi</h2>
<p>Makanan dengan kandungan anti-inflamasi tinggi seperti kunyit, jahe, bawang putih, dan ikan berlemak omega-3 dapat membantu tubuh melawan infeksi lebih efektif. Tambahkan rempah-rempah lokal ke dalam masakan sehari-hari sebagai langkah sederhana namun berdampak besar.</p>
    `,
    category: "Keluarga",
    categorySlug: "keluarga",
    image: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&q=80",
    author: "dr. Rina Kusuma",
    publishedAt: "2026-05-03",
    readingTime: "5 menit",
    isFeatured: true,
    isPopular: true,
    views: 1240,
    tags: ["imunitas", "keluarga", "musim pancaroba", "kesehatan"],
  },
  {
    id: "2",
    slug: "sarapan-sehat-untuk-anak",
    title: "Sarapan Sehat untuk Anak: Apa yang Perlu Disiapkan Orang Tua?",
    excerpt:
      "Sarapan bukan sekadar mengisi perut. Bagi anak-anak, sarapan yang tepat adalah fondasi untuk konsentrasi belajar dan pertumbuhan optimal sepanjang hari.",
    content: `
<p>Tahukah Anda bahwa anak yang rutin sarapan memiliki kemampuan konsentrasi 20% lebih baik dibandingkan yang tidak sarapan? Kebiasaan sederhana ini ternyata membawa dampak besar pada performa akademis dan perkembangan fisik anak.</p>

<h2>Nutrisi Penting dalam Sarapan Anak</h2>
<p>Sarapan ideal untuk anak harus mengandung karbohidrat kompleks untuk energi tahan lama, protein untuk pertumbuhan, dan lemak sehat untuk fungsi otak yang optimal.</p>

<h2>Ide Menu Sarapan Bergizi</h2>
<ul>
<li>Telur orak-arik dengan roti gandum dan buah segar</li>
<li>Oatmeal dengan pisang dan madu</li>
<li>Nasi goreng sayuran dengan telur mata sapi</li>
<li>Sandwich isi ayam dan sayuran</li>
<li>Smoothie bowl dengan granola dan buah-buahan</li>
</ul>

<blockquote>Anak yang sarapan bergizi memiliki energi dan mood yang lebih baik untuk menjalani hari.</blockquote>

<h2>Tips agar Anak Mau Sarapan</h2>
<p>Seringkali tantangan terbesar bukan menu apa yang disiapkan, melainkan membuat anak mau makan di pagi hari. Kuncinya adalah konsistensi waktu, tampilan makanan yang menarik, dan melibatkan anak dalam memilih menu.</p>
    `,
    category: "Nutrisi",
    categorySlug: "nutrisi",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
    author: "Nurul Hidayah, S.Gz",
    publishedAt: "2026-05-02",
    readingTime: "4 menit",
    isFeatured: true,
    isEditorsPick: true,
    tags: ["sarapan", "anak", "nutrisi", "gizi"],
  },
  {
    id: "3",
    slug: "mengelola-stres-kerja",
    title: "Mengelola Stres Kerja agar Tetap Produktif dan Sehat",
    excerpt:
      "Tekanan pekerjaan yang terus-menerus bisa berdampak buruk pada kesehatan fisik dan mental. Pelajari cara efektif mengelola stres kerja tanpa mengorbankan produktivitas.",
    content: `
<p>Di era modern yang serba cepat, stres kerja telah menjadi salah satu masalah kesehatan paling umum. WHO bahkan menyebutnya sebagai "epidemi abad ke-21". Namun stres kerja bukanlah sesuatu yang harus dihindari sepenuhnya — melainkan sesuatu yang perlu dikelola dengan cerdas.</p>

<h2>Tanda-Tanda Stres Kerja yang Perlu Diwaspadai</h2>
<ul>
<li>Sulit tidur atau tidur terlalu banyak</li>
<li>Mudah marah dan kehilangan kesabaran</li>
<li>Penurunan produktivitas secara signifikan</li>
<li>Sering sakit kepala atau gangguan pencernaan</li>
<li>Kehilangan motivasi kerja</li>
</ul>

<h2>Strategi Efektif Mengelola Stres</h2>
<p>Ada beberapa pendekatan yang terbukti efektif secara ilmiah untuk mengelola stres kerja: teknik pernapasan, mindfulness, olahraga rutin, dan batasan kerja yang jelas (work-life balance).</p>

<blockquote>Istirahat bukan tanda kelemahan. Istirahat adalah investasi untuk performa jangka panjang.</blockquote>
    `,
    category: "Kesehatan & Karir",
    categorySlug: "kesehatan-karir",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80",
    author: "Psikolog Arief Wibowo",
    publishedAt: "2026-05-01",
    readingTime: "6 menit",
    isFeatured: true,
    isPopular: true,
    views: 850,
    tags: ["stres", "karir", "produktivitas", "mental health"],
  },
  {
    id: "4",
    slug: "nutrisi-seimbang-pria-wanita-aktif",
    title: "Nutrisi Seimbang untuk Pria dan Wanita Aktif",
    excerpt:
      "Kebutuhan nutrisi pria dan wanita berbeda secara signifikan. Pahami perbedaan ini untuk memaksimalkan performa, pemulihan, dan kesehatan jangka panjang.",
    content: `
<p>Tubuh pria dan wanita memiliki kebutuhan nutrisi yang berbeda, terutama bagi mereka yang aktif berolahraga atau menjalani gaya hidup dinamis. Memahami perbedaan ini adalah kunci untuk merancang pola makan yang optimal.</p>

<h2>Kebutuhan Nutrisi Pria Aktif</h2>
<p>Pria aktif membutuhkan lebih banyak protein untuk mendukung massa otot, serta kalori lebih tinggi untuk memenuhi kebutuhan energi. Zinc dan magnesium juga penting untuk fungsi hormonal yang optimal.</p>

<h2>Kebutuhan Nutrisi Wanita Aktif</h2>
<p>Wanita aktif perlu memperhatikan asupan zat besi (terutama saat menstruasi), kalsium untuk kesehatan tulang, dan asam folat. Keseimbangan hormon juga sangat dipengaruhi oleh pola makan.</p>
    `,
    category: "Pria & Wanita",
    categorySlug: "pria-wanita",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    author: "dr. Sari Putri, SpGK",
    publishedAt: "2026-04-30",
    readingTime: "5 menit",
    isFeatured: true,
    isEditorsPick: true,
    tags: ["nutrisi", "pria", "wanita", "olahraga"],
  },
  {
    id: "5",
    slug: "kesehatan-jiwa-komunikasi-keluarga",
    title: "Kesehatan Jiwa Keluarga Dimulai dari Komunikasi yang Baik",
    excerpt:
      "Komunikasi yang sehat dalam keluarga bukan hanya membuat hubungan lebih harmonis, tetapi juga menjadi fondasi kesehatan mental seluruh anggota keluarga.",
    content: `
<p>Keluarga adalah unit sosial terkecil namun paling berpengaruh dalam kehidupan seseorang. Kualitas komunikasi dalam keluarga memiliki dampak langsung pada kesehatan mental dan emosional setiap anggotanya.</p>

<h2>Mengapa Komunikasi Keluarga Itu Penting?</h2>
<p>Anak-anak yang tumbuh dalam keluarga dengan komunikasi terbuka cenderung memiliki kepercayaan diri lebih tinggi, kemampuan problem-solving lebih baik, dan risiko gangguan kesehatan mental yang lebih rendah.</p>
    `,
    category: "Jiwa",
    categorySlug: "jiwa",
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&q=80",
    author: "dr. Maya Sari, SpKJ",
    publishedAt: "2026-04-29",
    readingTime: "5 menit",
    isFeatured: true,
    isEditorsPick: true,
    tags: ["jiwa", "keluarga", "komunikasi", "mental health"],
  },

  // === HIGHLIGHTS ===
  {
    id: "h1",
    slug: "pentingnya-pemeriksaan-mata-anak",
    title: "Kapan Waktu Terbaik Membawa Anak Periksa Mata Pertama Kali?",
    excerpt:
      "Banyak masalah penglihatan anak yang tidak disadari orang tua. Ketahui tanda-tanda anak membutuhkan kacamata sejak dini.",
    category: "Keluarga",
    categorySlug: "keluarga",
    image: "https://images.unsplash.com/photo-1588534510807-86dfb5ed5d5b?w=800&q=80",
    author: "dr. Andita, SpM",
    publishedAt: "2026-05-04",
    readingTime: "3 menit",
    isHighlight: true,
    views: 142,
  },
  {
    id: "h2",
    slug: "mitos-fakta-kopi-kesehatan",
    title: "Mitos dan Fakta: Seberapa Aman Minum Kopi Setiap Hari?",
    excerpt:
      "Apakah kopi benar-benar buruk bagi lambung? Mari bedah pandangan medis tentang kebiasaan ngopi harian.",
    category: "Umum",
    categorySlug: "umum",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80",
    author: "dr. Sari Putri, SpGK",
    publishedAt: "2026-05-03",
    readingTime: "4 menit",
    isHighlight: true,
    views: 89,
  },
  {
    id: "h3",
    slug: "olahraga-ringan-di-meja-kerja",
    title: "5 Gerakan Peregangan di Meja Kerja untuk Mencegah Sakit Leher",
    excerpt:
      "Duduk seharian di depan laptop bisa merusak postur. Lakukan gerakan 5 menit ini untuk meredakan ketegangan otot leher.",
    category: "Kesehatan & Karir",
    categorySlug: "kesehatan-karir",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
    author: "dr. Budi Santoso, SpKFR",
    publishedAt: "2026-05-02",
    readingTime: "3 menit",
    isHighlight: true,
    views: 215,
  },
  {
    id: "h4",
    slug: "superfood-lokal-indonesia",
    title: "Tak Perlu Mahal, Ini 4 'Superfood' Lokal yang Ada di Pasar Tradisional",
    excerpt:
      "Dari tempe hingga daun kelor, kenali makanan super asli Indonesia yang nutrisinya tak kalah dari produk impor.",
    category: "Nutrisi",
    categorySlug: "nutrisi",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
    author: "Nurul Hidayah, S.Gz",
    publishedAt: "2026-05-01",
    readingTime: "5 menit",
    isHighlight: true,
    views: 310,
  },

  // === NUTRISI ===
  {
    id: "6",
    slug: "manfaat-sayuran-hijau-setiap-hari",
    title: "7 Manfaat Luar Biasa Konsumsi Sayuran Hijau Setiap Hari",
    excerpt:
      "Sayuran hijau bukan sekadar pelengkap piring. Di balik warnanya yang segar, tersimpan nutrisi yang dapat melindungi jantung, meningkatkan otak, dan memperpanjang usia.",
    category: "Nutrisi",
    categorySlug: "nutrisi",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80",
    author: "Nurul Hidayah, S.Gz",
    publishedAt: "2026-04-28",
    readingTime: "4 menit",
    isPopular: true,
    tags: ["sayuran", "nutrisi", "antioksidan"],
  },
  {
    id: "7",
    slug: "diet-mediterania-untuk-kesehatan-jantung",
    title: "Diet Mediterania: Solusi Ilmiah untuk Kesehatan Jantung",
    excerpt:
      "Diet mediterania telah terbukti secara klinis mengurangi risiko penyakit jantung hingga 30%. Temukan prinsip-prinsip utamanya dan cara menerapkannya di Indonesia.",
    category: "Nutrisi",
    categorySlug: "nutrisi",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80",
    author: "dr. Sari Putri, SpGK",
    publishedAt: "2026-04-26",
    readingTime: "6 menit",
    tags: ["diet", "jantung", "mediterania"],
  },
  {
    id: "8",
    slug: "bahaya-minuman-manis-berlebihan",
    title: "Bahaya Tersembunyi di Balik Minuman Manis yang Sering Kita Konsumsi",
    excerpt:
      "Satu kaleng minuman bersoda mengandung 10 sendok teh gula. Ketahui dampak jangka panjangnya dan temukan alternatif minuman sehat yang tetap menyegarkan.",
    category: "Nutrisi",
    categorySlug: "nutrisi",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
    author: "Nurul Hidayah, S.Gz",
    publishedAt: "2026-04-24",
    readingTime: "4 menit",
    isPopular: true,
    tags: ["gula", "minuman manis", "diabetes"],
  },

  // === KELUARGA ===
  {
    id: "9",
    slug: "pertumbuhan-anak-usia-balita",
    title: "Memantau Pertumbuhan Anak Usia Balita: Panduan Lengkap untuk Orang Tua",
    excerpt:
      "Masa balita adalah periode emas pertumbuhan anak. Ketahui indikator pertumbuhan normal, tanda-tanda yang perlu diwaspadai, dan cara mendukung tumbuh kembang optimal.",
    category: "Keluarga",
    categorySlug: "keluarga",
    image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&q=80",
    author: "dr. Rina Kusuma",
    publishedAt: "2026-04-25",
    readingTime: "7 menit",
    isEditorsPick: true,
    tags: ["balita", "pertumbuhan", "orang tua"],
  },
  {
    id: "10",
    slug: "vaksinasi-anak-jadwal-lengkap",
    title: "Jadwal Vaksinasi Anak Lengkap: Panduan dari Lahir hingga 12 Tahun",
    excerpt:
      "Vaksinasi adalah perlindungan terpenting yang bisa Anda berikan kepada anak. Simak jadwal lengkap, jenis vaksin yang direkomendasikan, dan cara mengatasinya jika anak demam pasca vaksin.",
    category: "Keluarga",
    categorySlug: "keluarga",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80",
    author: "dr. Rina Kusuma",
    publishedAt: "2026-04-22",
    readingTime: "8 menit",
    isPopular: true,
    tags: ["vaksin", "anak", "imunisasi"],
  },
  {
    id: "11",
    slug: "tips-merawat-orang-tua-lansia",
    title: "Tips Merawat Orang Tua Lansia dengan Penuh Kasih dan Cerdas",
    excerpt:
      "Merawat orang tua yang sudah lanjut usia adalah tanggung jawab sekaligus anugerah. Pelajari cara praktis untuk memastikan kesehatan, kebahagiaan, dan kualitas hidup mereka.",
    category: "Keluarga",
    categorySlug: "keluarga",
    image: "https://images.unsplash.com/photo-1576765974256-22f0344bed29?w=800&q=80",
    author: "Redaksi Kita Sehat",
    publishedAt: "2026-04-20",
    readingTime: "5 menit",
    tags: ["lansia", "keluarga", "perawatan"],
  },

  // === PRIA & WANITA ===
  {
    id: "12",
    slug: "kesehatan-reproduksi-wanita",
    title: "Memahami Siklus Kesehatan Reproduksi Wanita: Panduan Komprehensif",
    excerpt:
      "Kesehatan reproduksi wanita mencakup banyak aspek yang saling terhubung. Dari siklus menstruasi hingga menopause, pahami perubahan yang normal dan kapan harus ke dokter.",
    category: "Pria & Wanita",
    categorySlug: "pria-wanita",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
    author: "dr. Sari Putri, SpGK",
    publishedAt: "2026-04-27",
    readingTime: "8 menit",
    isEditorsPick: true,
    tags: ["reproduksi", "wanita", "kesehatan"],
  },
  {
    id: "13",
    slug: "olahraga-terbaik-pria-usia-30an",
    title: "5 Olahraga Terbaik untuk Pria di Atas 30 Tahun",
    excerpt:
      "Memasuki usia 30-an, metabolisme mulai melambat dan risiko penyakit meningkat. Namun dengan pilihan olahraga yang tepat, Anda bisa tetap bugar dan energik.",
    category: "Pria & Wanita",
    categorySlug: "pria-wanita",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    author: "Fitri Andiani, S.Or",
    publishedAt: "2026-04-23",
    readingTime: "5 menit",
    isPopular: true,
    tags: ["olahraga", "pria", "kebugaran"],
  },

  // === JIWA ===
  {
    id: "14",
    slug: "cara-atasi-anxiety-sehari-hari",
    title: "Cara Efektif Mengatasi Anxiety dalam Keseharian",
    excerpt:
      "Rasa cemas berlebihan kini menjadi gangguan mental paling umum di dunia. Pelajari teknik-teknik berbasis bukti yang bisa dipraktikkan sendiri di rumah untuk mengelola anxiety.",
    category: "Jiwa",
    categorySlug: "jiwa",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
    author: "dr. Maya Sari, SpKJ",
    publishedAt: "2026-04-28",
    readingTime: "6 menit",
    isPopular: true,
    views: 740,
    tags: ["anxiety", "mental health", "stres"],
  },
  {
    id: "15",
    slug: "mindfulness-untuk-pemula",
    title: "Mindfulness untuk Pemula: Mulai dari 5 Menit Sehari",
    excerpt:
      "Mindfulness bukan hanya untuk meditator kawakan. Bahkan 5 menit sehari dapat mengubah cara otak Anda merespons stres. Panduan praktis untuk yang baru memulai.",
    category: "Jiwa",
    categorySlug: "jiwa",
    image: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&q=80",
    author: "Psikolog Arief Wibowo",
    publishedAt: "2026-04-21",
    readingTime: "4 menit",
    isEditorsPick: true,
    tags: ["mindfulness", "meditasi", "jiwa"],
  },
  {
    id: "16",
    slug: "tanda-burnout-dan-cara-mengatasinya",
    title: "Tanda-Tanda Burnout dan Cara Keluar dari Kondisi Ini",
    excerpt:
      "Burnout berbeda dengan kelelahan biasa. Kondisi ini bisa berlangsung berbulan-bulan dan merusak kesehatan secara serius. Kenali tanda-tandanya sebelum terlambat.",
    category: "Jiwa",
    categorySlug: "jiwa",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&q=80",
    author: "dr. Maya Sari, SpKJ",
    publishedAt: "2026-04-19",
    readingTime: "5 menit",
    tags: ["burnout", "mental health", "kerja"],
  },

  // === KESEHATAN & KARIR ===
  {
    id: "17",
    slug: "ergonomi-kerja-dari-rumah",
    title: "Ergonomi Kerja dari Rumah: Jaga Kesehatan Tulang Belakang Anda",
    excerpt:
      "Bekerja dari rumah dengan posisi yang salah bisa menyebabkan nyeri punggung kronis dalam waktu singkat. Atur workspace Anda dengan prinsip ergonomi yang benar.",
    category: "Kesehatan & Karir",
    categorySlug: "kesehatan-karir",
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80",
    author: "dr. Budi Santoso, SpKFR",
    publishedAt: "2026-04-26",
    readingTime: "5 menit",
    isPopular: true,
    tags: ["ergonomi", "WFH", "punggung"],
  },
  {
    id: "18",
    slug: "makan-siang-sehat-di-kantor",
    title: "Strategi Makan Siang Sehat di Kantor Tanpa Ribet",
    excerpt:
      "Pilihan makan siang yang salah bisa membuat Anda mengantuk dan tidak produktif di sore hari. Temukan strategi mudah untuk makan siang sehat meski di tengah kesibukan kerja.",
    category: "Kesehatan & Karir",
    categorySlug: "kesehatan-karir",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
    author: "Nurul Hidayah, S.Gz",
    publishedAt: "2026-04-24",
    readingTime: "4 menit",
    tags: ["makan siang", "kantor", "produktivitas"],
  },

  // === UMUM ===
  {
    id: "19",
    slug: "manfaat-tidur-cukup-untuk-kesehatan",
    title: "Rahasia Hidup Sehat yang Sering Diabaikan: Tidur yang Cukup",
    excerpt:
      "Tidur bukan sekadar istirahat. Saat tidur, tubuh melakukan perbaikan sel, konsolidasi memori, dan pembuangan racun otak. Inilah mengapa tidur 7-8 jam sangat vital.",
    category: "Umum",
    categorySlug: "umum",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&q=80",
    author: "dr. Rina Kusuma",
    publishedAt: "2026-04-22",
    readingTime: "5 menit",
    isPopular: true,
    tags: ["tidur", "kesehatan", "otak"],
  },
  {
    id: "20",
    slug: "hidrasi-penting-minum-air-putih",
    title: "Kenapa 8 Gelas Air Sehari Itu Penting? Ini Penjelasan Ilmiahnya",
    excerpt:
      "Tubuh manusia terdiri dari 60% air. Bahkan dehidrasi ringan 1-2% saja sudah bisa menurunkan konsentrasi dan suasana hati secara signifikan. Yuk kenali pentingnya hidrasi.",
    category: "Umum",
    categorySlug: "umum",
    image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&q=80",
    author: "Redaksi Kita Sehat",
    publishedAt: "2026-04-18",
    readingTime: "3 menit",
    isPopular: true,
    tags: ["air", "hidrasi", "kesehatan"],
  },
  {
    id: "21",
    slug: "olahraga-30-menit-sehari",
    title: "Cukup 30 Menit Sehari: Olahraga Ringan yang Berdampak Besar",
    excerpt:
      "WHO merekomendasikan minimal 150 menit olahraga per minggu. Tapi banyak orang merasa tidak punya waktu. Simak cara praktis menyisipkan olahraga ke dalam rutinitas harian.",
    category: "Umum",
    categorySlug: "umum",
    image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80",
    author: "Fitri Andiani, S.Or",
    publishedAt: "2026-04-16",
    readingTime: "4 menit",
    tags: ["olahraga", "aktivitas fisik", "gaya hidup sehat"],
  },
];
