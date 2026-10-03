import React, { useState, useEffect } from "react";
import { X, ZoomIn, Scissors, Image as ImageIcon } from "lucide-react";
import { Lang, CONTENT } from "../content";

interface GalleryProps {
  currentLang: Lang;
}

interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  caption: string;
  aspect: string;
  isArch?: boolean;
}

export const Gallery: React.FC<GalleryProps> = ({ currentLang }) => {
  const t = CONTENT[currentLang].gallery;
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  /**
   * NOTE FOR SHOP OWNER / DEVELOPER:
   * Replace with real photos provided by the owner. Never hotlink Google Maps images.
   * Place the files in /public/images/shop-1.jpg ... /public/images/shop-6.jpg.
   */
  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      src: "/src/assets/images/medina_barber_arch_1791031475949.jpg",
      alt: "Hair Style By Oussama Medina Entrance and Vintage Chair",
      caption: "Medina Portal & Craftsman Chair",
      aspect: "aspect-[3/4]",
      isArch: true, // Medina arch doorway mask
    },
    {
      id: 2,
      src: "/src/assets/images/fade_haircut_craft_1791031488027.jpg",
      alt: "Precision skin fade haircut in action",
      caption: "Sharp Fade & Patient Taper",
      aspect: "aspect-[4/3]",
    },
    {
      id: 3,
      src: "/src/assets/images/straight_razor_shave_1791031500137.jpg",
      alt: "Traditional hot lather and straight razor shave",
      caption: "Smooth Razor Beard Sculpting",
      aspect: "aspect-[1/1]",
    },
    {
      id: 4,
      src: "/src/assets/images/artisan_barber_tools_1791031510569.jpg",
      alt: "Handcrafted stainless steel shears and brass clips",
      caption: "Artisan Scissors & Grooming Tools",
      aspect: "aspect-[1/1]",
    },
    {
      id: 5,
      src: "/src/assets/images/sousse_medina_street_1791031522506.jpg",
      alt: "4 Rue de l'Église cobblestone street in Sousse medina",
      caption: "Rue de l'Église, Sousse Old Town",
      aspect: "aspect-[4/3]",
    },
    {
      id: 6,
      src: "/src/assets/images/medina_barber_arch_1791031475949.jpg",
      alt: "Warm amber lamps and vintage barber chair",
      caption: "Warm Medina Lighting & Salon Interior",
      aspect: "aspect-[3/4]",
    },
  ];

  return (
    <section id="gallery" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#0E1013]">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14 sm:mb-20">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-6 h-[1px] bg-[#1F5FA8]" />
              <span className="text-xs uppercase font-mono tracking-widest text-[#1F5FA8]">
                05 · {t.tag}
              </span>
            </div>
            <h2 className="font-fraunces section-h2 font-bold text-[#F4EFE6] tracking-tight">
              {t.title}
            </h2>
            <p className="text-base text-[#8E96A3] mt-2">
              {t.subtitle}
            </p>
          </div>

          <div className="text-xs font-mono text-[#8E96A3]/70 hidden sm:block">
            Medina of Sousse · 4 Rue de l'Église
          </div>
        </div>

        {/* Asymmetric Gallery Grid with Arch Mask Feature */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className={`group relative overflow-hidden bg-[#181B20] border border-[#8E96A3]/20 cursor-pointer transition-all duration-500 hover:border-[#1F5FA8] hover:shadow-2xl hover:shadow-[#1F5FA8]/10 ${
                item.isArch ? "medina-arch" : "rounded-[8px]"
              } ${item.aspect}`}
            >
              {/* Gradient fallback backdrop with medina star */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#181B20] via-[#20252C] to-[#0E1013] flex flex-col items-center justify-center p-6 text-center">
                {/* Subtle ornamental icon */}
                <div className="w-12 h-12 rounded-full bg-[#1F5FA8]/15 border border-[#1F5FA8]/30 flex items-center justify-center text-[#1F5FA8] mb-3 group-hover:scale-110 group-hover:border-[#C65D3B] group-hover:text-[#C65D3B] transition-all duration-300">
                  <Scissors className="w-5 h-5" />
                </div>
                <span className="font-fraunces text-base font-semibold text-[#F4EFE6] mb-1">
                  {item.caption}
                </span>
                <span className="text-[11px] font-mono text-[#8E96A3] uppercase tracking-wider">
                  {t.photoPlaceholder}
                </span>
              </div>

              {/* Real Image Tag */}
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 mix-blend-luminosity hover:mix-blend-normal"
                onError={(e) => {
                  // Fallback: hide broken image element so elegant gradient card displays
                  (e.target as HTMLElement).style.display = "none";
                }}
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E1013] via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-6">
                <div>
                  <span className="text-xs uppercase font-mono tracking-wider text-[#C9A24B]">
                    Hair Style By Oussama
                  </span>
                  <p className="font-fraunces text-base text-[#F4EFE6] font-semibold mt-0.5">
                    {item.caption}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#F4EFE6]/10 backdrop-blur-md flex items-center justify-center text-[#F4EFE6]">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-[#181B20] text-[#F4EFE6] hover:bg-[#C65D3B] transition-colors border border-[#8E96A3]/30 z-10"
            aria-label={t.closeLightbox}
          >
            <X className="w-5 h-5" />
          </button>

          <div
            className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`w-full max-h-[70vh] relative overflow-hidden bg-[#181B20] border border-[#8E96A3]/30 flex items-center justify-center ${
                selectedImage.isArch ? "medina-arch max-w-lg aspect-[4/5]" : "rounded-[8px] aspect-[16/10]"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#181B20] via-[#20252C] to-[#0E1013] flex flex-col items-center justify-center p-8 text-center">
                <Scissors className="w-12 h-12 text-[#1F5FA8] mb-4" />
                <h4 className="font-fraunces text-2xl text-[#F4EFE6] font-bold mb-2">
                  {selectedImage.caption}
                </h4>
                <p className="text-sm text-[#8E96A3] font-mono">
                  Hair Style By Oussama · 4 Rue de l'Église, Sousse Medina
                </p>
                <span className="text-xs text-[#C9A24B] mt-4 uppercase tracking-widest font-mono">
                  {t.photoPlaceholder}
                </span>
              </div>

              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain relative z-10"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            </div>

            <div className="mt-4 text-center">
              <p className="text-sm sm:text-base font-medium text-[#F4EFE6]">
                {selectedImage.caption}
              </p>
              <p className="text-xs text-[#8E96A3] mt-1 font-mono">
                Press ESC or tap background to close
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
