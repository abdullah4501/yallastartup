import Image from "next/image";

type BrandLogoProps = {
  priority?: boolean;
};

export default function BrandLogo({ priority = false }: BrandLogoProps) {
  return (
    <>
      <span className="brand-logo-mark" aria-hidden="true">
        <Image
          className="brand-logo-image"
          src="/logo.png"
          alt=""
          width={640}
          height={606}
          priority={priority}
          sizes="(max-width: 680px) 42px, 48px"
          unoptimized
        />
      </span>
      <span className="brand-name">
        YALLA Startup
      </span>
    </>
  );
}
