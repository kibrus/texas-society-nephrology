interface SponsorLogoProps {
  name: string;
  slug: string;
  url?: string;
  ext?: string;
  imgClassName?: string;
}

export function SponsorLogo({ name, slug, url, ext = "png", imgClassName = "h-10" }: SponsorLogoProps) {
  const src = `/images/partners/${slug}.${ext}`;

  // eslint-disable-next-line @next/next/no-img-element
  const img = <img src={src} alt={name} className={`${imgClassName} w-auto object-contain`} loading="lazy" />;

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" aria-label={name} className="flex-shrink-0">
        {img}
      </a>
    );
  }
  return <span className="flex-shrink-0">{img}</span>;
}
