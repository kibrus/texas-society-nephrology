import { PageHeader, Button } from "@/components/ui";

export default function NotFound() {
  return (
    <PageHeader
      eyebrow="Error 404"
      title="Page not found"
      intro="The page you're looking for doesn't exist or has moved."
      image="/images/site/events/hero.webp"
      tall
      actions={
        <>
          <Button href="/" variant="white" arrow>
            Back home
          </Button>
          <Button href="/events" variant="glass">
            See upcoming events
          </Button>
        </>
      }
    />
  );
}
