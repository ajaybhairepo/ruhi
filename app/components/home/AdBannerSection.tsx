type AdBannerProps = {
  image?: string;
  alt?: string;
};

export function AdBanner({
  image = "/banner.png",
  alt = "Advertising banner",
}: AdBannerProps) {
  return (
    <section className="w-full px-[2%] py-6 md:py-10 lg:py-14">
      <div className="relative w-full overflow-hidden">
        {/* Banner Image */}
        <img
          src={image}
          alt={alt}
          className="w-full h-auto object-fill"
          style={{
            maxHeight: "900px",
            minHeight: "250px",
            width: "100%",
          }}
        />
      </div>
    </section>
  );
}
