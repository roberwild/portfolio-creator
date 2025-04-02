import Link from "next/link";
import { Button } from "./ui/button";

export default function PublicHeader() {
  return (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/crear-portfolio">Crear Portfolio</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/portfolios">Ver Portfolios</Link>
      </Button>
    </div>
  );
}
