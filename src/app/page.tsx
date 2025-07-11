import { CoinLogo } from '@/components/coin-logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16 sm:py-24 lg:py-32">
      <div className="flex flex-col items-center text-center">
        <CoinLogo />
        <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold mt-8 tracking-tight">
          Welcome to ನೇತಾಜಿ ಯುವ ಸೇನೆ, ಹೋಳೂರು
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Connecting our community, one event at a time. Explore what makes us special and get involved today.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/about">Learn More</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/gallery">Gallery</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
