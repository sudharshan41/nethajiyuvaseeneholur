
"use client";

import Image from 'next/image';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const seasons = [
  {
    year: '2024',
    title: 'HPL Season 3',
    subtitle: 'Champions',
    images: ['1.jpg', '2.jpg', '3.jpg'],
    hint: 'cricket tournament'
  },
  {
    year: '2023',
    title: 'HPL Season 4',
    subtitle: 'Champions',
    images: ['1.jpg', '2.jpg', '3.jpg'],
    hint: 'cricket tournament'
  },
  {
    year: '2022',
    title: 'Nethaji cup S01',
    images: ['1.jpg', '2.jpg'],
    hint: 'cricket tournament'
  },
  {
    year: '2021',
    title: "Junior's Cup",
    images: ['/s02/jr.jpg'], // Simplified to a direct path
    hint: 'cricket team'
  },
];


export default function AboutPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedSeasonImages, setSelectedSeasonImages] = useState<string[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const getFullImagePath = (season: typeof seasons[number], image: string): string => {
    if (image.startsWith('/')) {
      return image; // Already a full path (like for Junior's Cup)
    }
    if (season.title === 'HPL Season 3') {
      return `/s01/${image}`;
    }
    if (season.title === 'HPL Season 4') {
      return `/s02/${image}`;
    }
    if (season.title === 'Nethaji cup S01') {
      return `/nethaji cup/${image}`;
    }
    // Fallback for any other case
    return `https://placehold.co/600x600.png?id=${season.year}-${image}`;
  };

  const openLightbox = (season: typeof seasons[number], index: number) => {
    const images = season.images.map(img => getFullImagePath(season, img));
    setSelectedSeasonImages(images);
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const showNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % selectedSeasonImages.length);
  };

  const showPrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImageIndex((prevIndex) => (prevIndex - 1 + selectedSeasonImages.length) % selectedSeasonImages.length);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold font-headline tracking-tight">
            About NYSH
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Discover our story, our mission, and the values that bring us together.
          </p>
        </div>

        <div className="mb-16">
          <div className="relative aspect-[2/1] w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/grouppic.jpg"
              alt="NYSH Community Group Photo"
              fill
              className="object-cover brightness-110"
              data-ai-hint="community group photo"
            />
          </div>
        </div>

        <div className="mb-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-headline font-semibold mb-4">Our History</h2>
            <p className="text-muted-foreground leading-relaxed">
              Founded in 2018, our journey began as a small group of friends with a shared passion. Over the years, we have grown into a vibrant organization. We cherish our history and the journey that has shaped us into the strong, supportive community we are today.
            </p>
          </div>
        </div>

        <div className="space-y-12">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our mission is to foster a sense of belonging and collaboration among our members. We strive to create a positive and inclusive environment where everyone feels valued, supported, and empowered to contribute their unique talents and ideas.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-16">
          <h2 className="text-3xl font-headline font-semibold mb-8">NYSH Cricket</h2>
          <div className="space-y-16">
            {seasons.map((season) => (
              <div key={season.year}>
                <div className="mb-6">
                  <h3 className="text-2xl font-headline font-semibold">{season.title}</h3>
                  {season.subtitle && (
                    <p className="text-xl font-semibold text-accent">{season.subtitle}</p>
                  )}
                </div>
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  className="w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto"
                >
                  <CarouselContent>
                    {season.images.map((image, index) => {
                      const imageSrc = getFullImagePath(season, image);

                      return (
                        <CarouselItem key={index} className="basis-full" onClick={() => openLightbox(season, index)}>
                          <div className="p-1">
                            <div className="aspect-square relative group overflow-hidden rounded-lg shadow-lg cursor-pointer">
                              <Image
                                src={imageSrc}
                                alt={`Season ${season.year} Image ${index + 1}`}
                                fill
                                className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110 brightness-110"
                                data-ai-hint={season.hint}
                              />
                              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors" />
                            </div>
                          </div>
                        </CarouselItem>
                      );
                    })}
                  </CarouselContent>
                  <CarouselPrevious className="left-4" />
                  <CarouselNext className="right-4" />
                </Carousel>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-screen-xl w-full h-full sm:h-auto max-h-[90vh] bg-transparent border-0 p-0 shadow-none flex items-center justify-center">
            <DialogTitle className="sr-only">Image Lightbox</DialogTitle>
            <div className="relative w-full h-full flex items-center justify-center">
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-4 right-4 z-50 text-white bg-black/50 hover:bg-black/75 hover:text-white"
                    onClick={closeLightbox}
                >
                    <X className="w-6 h-6" />
                </Button>

                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-50 text-white bg-black/50 hover:bg-black/75 hover:text-white h-12 w-12 rounded-full"
                    onClick={showPrevImage}
                >
                    <ChevronLeft className="w-8 h-8" />
                </Button>

                <div className="relative w-full max-w-[80vw] max-h-[90vh] aspect-video">
                  {selectedSeasonImages.length > 0 && (
                    <Image
                        src={selectedSeasonImages[selectedImageIndex]}
                        alt={`Enlarged image ${selectedImageIndex + 1}`}
                        fill
                        className="object-contain brightness-110"
                    />
                  )}
                </div>

                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-50 text-white bg-black/50 hover:bg-black/75 hover:text-white h-12 w-12 rounded-full"
                    onClick={showNextImage}
                >
                    <ChevronRight className="w-8 h-8" />
                </Button>
            </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

    