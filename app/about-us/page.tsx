import React from "react";
import Image from "next/image";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Tentang Kami | Kita-Sehat.id",
  description: "Kenali lebih dekat pendiri dan visi misi KITA-SEHAT.id dalam mengedukasi masyarakat Indonesia tentang gaya hidup sehat.",
};

async function getAboutSettings() {
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4003";
    const res = await fetch(`${API_BASE_URL}/api/settings`, { 
      cache: "no-store" // Ensure we get fresh data
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error("Error fetching about settings:", error);
    return null;
  }
}

const FounderCard = ({ name, title, bio, image, isFirst }: { name: string, title: string, bio: React.ReactNode, image: string, isFirst?: boolean }) => (
  <div className="relative bg-white rounded-3xl shadow-lg overflow-hidden md:flex items-stretch border border-slate-100 transition-all hover:shadow-xl group mb-12 min-h-[350px] md:min-h-[450px]">
    {/* FOUNDER Label */}
    <div className="absolute top-6 right-0 z-10">
      <div className="bg-[#103174] text-white py-2 px-8 rounded-l-xl font-black tracking-widest text-xs md:text-sm uppercase shadow-md">
        FOUNDER
      </div>
    </div>

    {/* Image Section - Left (Fit to card height) */}
    <div className="md:w-[30%] min-h-[350px] md:min-h-0 relative overflow-hidden bg-slate-100 shrink-0">
      <Image
        src={image || "/placeholder-founder.png"}
        alt={name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        priority={isFirst}
        unoptimized={image.startsWith("data:")} // Allow base64 images
      />
    </div>

    {/* Vertical Line Separator (Desktop Only) */}
    <div className="hidden md:block w-[1px] bg-gradient-to-b from-transparent via-[#103174]/10 to-transparent my-10"></div>

    {/* Content Section - Right */}
    <div className="md:w-[70%] p-8 md:p-16 flex flex-col justify-start bg-gradient-to-br from-white to-slate-50/50">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-[#103174] leading-none tracking-tight">
            {name}
          </h2>
          <div className="flex items-center gap-3 mt-4">
            <div className="h-[4px] w-8 bg-[#0098b0] rounded-full"></div>
            <p className="text-sm md:text-lg font-bold text-[#0098b0] italic uppercase tracking-widest">
              {title}
            </p>
          </div>
        </div>

        <div className="space-y-5 text-slate-600 text-base md:text-lg leading-relaxed font-medium whitespace-pre-line">
          {bio}
        </div>
      </div>
    </div>
  </div>
);

export default async function AboutUsPage() {
  const settings = await getAboutSettings();

  const founder1 = {
    name: settings?.about_founder1_name || "Nanang Ahmad Suryana",
    role: settings?.about_founder1_role || "Direktur Utama KITA-SEHAT.id",
    bio: settings?.about_founder1_bio || "Nanang Ahmad Suryana adalah seorang Creative Consultant dengan pengalaman lebih dari 10 tahun di industri media dan pengembangan brand. Memiliki keahlian dalam digital asset management, creative branding, serta pengembangan identitas visual perusahaan, ia telah berkontribusi dalam membangun dan memperkuat berbagai brand nasional.\n\nDi bidang media kreatif, Nanang dikenal memiliki kemampuan art direction yang kuat. Salah satu pencapaian terbaiknya adalah meraih penghargaan The Best Cover Magazine of The Year pada tahun 2016. Ia juga pernah dipercaya sebagai Art Director di beberapa grup media besar seperti Gramedia dan MPG Group.",
    image: settings?.about_founder1_image || "/founder-nanang.png"
  };

  const founder2 = {
    name: settings?.about_founder2_name || "Emmy R. Sidabutar",
    role: settings?.about_founder2_role || "Creative Consultant",
    bio: settings?.about_founder2_bio || "Emmy R. Sidabutar adalah seorang Creative Consultant dengan pengalaman lebih dari 15 tahun di industri media, marketing, dan agency periklanan. Memiliki kompetensi kuat dalam strategi komunikasi brand, media marketing, serta brand activation, ia telah berpengalaman menangani berbagai kampanye kreatif untuk sejumlah brand ternama.\n\nDengan pemahaman mendalam terhadap perilaku pasar dan komunikasi visual, Emmy dikenal mampu menghadirkan konsep pemasaran yang inovatif, efektif, dan relevan dengan perkembangan industri modern. Pengalamannya menjadikannya sosok profesional yang adaptif dalam membangun engagement serta meningkatkan brand awareness.",
    image: settings?.about_founder2_image || "/founder-emmy.png"
  };

  return (
    <div className="bg-[#f4f7f9] min-h-screen py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-black text-[#103174] uppercase tracking-tighter">Tentang Kami</h1>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-1.5 w-16 bg-[#0098b0] rounded-full"></div>
            <div className="h-1.5 w-6 bg-[#103174] rounded-full"></div>
          </div>
        </div>

        {/* First Founder: Nanang Ahmad Suryana */}
        <FounderCard
          isFirst
          name={founder1.name}
          title={founder1.role}
          image={founder1.image}
          bio={founder1.bio}
        />

        {/* Second Founder: Emmy R. Sidabutar */}
        <FounderCard
          name={founder2.name}
          title={founder2.role}
          image={founder2.image}
          bio={founder2.bio}
        />
      </div>
    </div>
  );
}
