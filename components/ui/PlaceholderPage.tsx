import { Container } from "@/components/ui/Container";

type PageProps = {
  title: string;
  description: string;
};

export function PlaceholderPage({ title, description }: PageProps) {
  return (
    <section className="bg-white py-24">
      <Container className="max-w-2xl">
        <h1 className="text-4xl font-bold text-brand-dark">{title}</h1>
        <p className="mt-4 text-lg text-brand-muted">{description}</p>
      </Container>
    </section>
  );
}
