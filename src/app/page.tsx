import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { APP_NAME, APP_TAGLINE } from "@/lib/constants";

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl p-8">
      <Card>
        <Badge>New</Badge>
        <h1 className="mt-4 text-3xl font-bold">{APP_NAME}</h1>
        <p className="mt-2 text-muted">{APP_TAGLINE}</p>
        <div className="mt-6 flex gap-3">
          <Button>Get started</Button>
          <Button variant="secondary">Learn more</Button>
        </div>
      </Card>
    </main>
  );
}