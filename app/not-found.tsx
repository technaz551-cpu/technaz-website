import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex flex-1 items-center bg-white py-24">
      <Container className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-green">
          404
        </p>
        <h1 className="mt-3 text-3xl font-bold text-brand-dark sm:text-4xl">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-brand-muted">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8">
          <Button href="/">Back to Home</Button>
        </div>
      </Container>
    </section>
  );
}
