
"use client";

import Image from 'next/image';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X, PlayCircle } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const galleryData = {
   '2024': ['1.1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'],

  '2023': ['1.jpg', '2.1.jpg', '3.jpg'],
  '2022': ['1.jpg', '2.jpg', '3.1.jpg', '4.jpg'],
  'Previous Year': ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg'],
  'Videos': [
    {
      thumbnail: '/logo.png',
      videoUrl: '/videos/2.mp4',
      type: 'local',
      hint: 'community event video'
    },
    {
      thumbnail: '/logo.png',
      videoUrl: '/videos/3.mp4',
      type: 'local',
      hint: 'community event video'
    },
    {
      thumbnail: '/logo.png',
      videoUrl: '/videos/4.mp4',
      type: 'local',
      hint: 'community event video'
    }
  ],
};

const years = ['2024', '2023', '2022', 'Previous Year', 'Videos'];

type VideoItem = {
  thumbnail: string;
  videoUrl: string;
  type: 'local' | 'youtube';
  hint: string;
};


export default function GalleryPage() {
  const [selectedYear, setSelectedYear] = useState(years[0]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState<string | VideoItem | null>(null);

  const isVideoSection = selectedYear === 'Videos';
  const currentItems = galleryData[selectedYear as keyof typeof galleryData];

  const openLightbox = (index: number) => {
    if (isVideoSection) {
      const item = currentItems[index] as VideoItem;
      setSelectedItem(item);
    } else {
      setSelectedImageIndex(index);
      setSelectedItem(currentItems[index] as string);
    }
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedItem(null);
  };

  const showNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isVideoSection) {
      setSelectedImageIndex((prevIndex) => (prevIndex + 1) % currentItems.length);
    }
  };

  const showPrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isVideoSection) {
      setSelectedImageIndex((prevIndex) => (prevIndex - 1 + currentItems.length) % currentItems.length);
    }
  };

  const getImageUrl = (year: string, image: string | number, index: number) => {
    if (typeof image === 'string' && image.includes('.')) {
      if (year === 'Previous Year') {
        return `/previousYear/${image}`;
      }
      return `/${year}/${image}`;
    }
    return `https://placehold.co/400x400.png?id=${year}-${index}`;
  };

  const renderContent = () => {
    if (isVideoSection) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {(currentItems as VideoItem[]).map((item, index) => (
            <div 
              key={`${selectedYear}-${index}`} 
              className="group relative aspect-square overflow-hidden rounded-lg shadow-lg cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <Image
                src={item.thumbnail}
                alt={`Video thumbnail ${index + 1}`}
                fill
                className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110 brightness-110"
                data-ai-hint={item.hint}
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                <PlayCircle className="w-16 h-16 text-white/80 transform transition-transform group-hover:scale-110" />
              </div>
            </div>
          ))}
        </div>
      );
    }
    
    return (
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-4xl mx-auto"
      >
        <CarouselContent>
          {(currentItems as string[]).map((item, index) => {
            const imageSrc = getImageUrl(selectedYear, item, index);
            return (
              <CarouselItem key={`${selectedYear}-${index}`} className="md:basis-1/2 lg:basis-1/3" onClick={() => openLightbox(index)}>
                <div className="p-1">
                  <div className="group relative aspect-square overflow-hidden rounded-lg shadow-lg cursor-pointer">
                    <Image
                      src={imageSrc}
                      alt={`Gallery image ${index + 1} from ${selectedYear}`}
                      fill
                      className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110 brightness-110"
                      data-ai-hint="community event"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    );
  };
  
  const isVideoItem = (item: any): item is VideoItem => {
    return item && typeof item === 'object' && 'videoUrl' in item;
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold font-headline tracking-tight">
          Our Gallery
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          A collection of moments and memories from our community events throughout the years.
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {renderContent()}

      <Dialog open={lightboxOpen} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-screen-xl w-full h-full sm:h-auto max-h-[90vh] bg-transparent border-0 p-0 shadow-none flex items-center justify-center">
            <DialogTitle className="sr-only">Image and Video Lightbox</DialogTitle>
            <div className="relative w-full h-full flex items-center justify-center">
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-4 right-4 z-50 text-white bg-black/50 hover:bg-black/75 hover:text-white"
                    onClick={closeLightbox}
                >
                    <X className="w-6 h-6" />
                </Button>

                {!isVideoItem(selectedItem) && (
                  <>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-50 text-white bg-black/50 hover:bg-black/75 hover:text-white h-12 w-12 rounded-full"
                        onClick={showPrevImage}
                    >
                        <ChevronLeft className="w-8 h-8" />
                    </Button>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-50 text-white bg-black/50 hover:bg-black/75 hover:text-white h-12 w-12 rounded-full"
                        onClick={showNextImage}
                    >
                        <ChevronRight className="w-8 h-8" />
                    </Button>
                  </>
                )}

                <div className="relative w-full max-w-[80vw] max-h-[90vh] aspect-video">
                    {isVideoItem(selectedItem) ? (
                      selectedItem.type === 'youtube' ? (
                        <iframe 
                          src={selectedItem.videoUrl}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          className="w-full h-full"
                        />
                      ) : (
                        <video src={selectedItem.videoUrl} controls autoPlay className="w-full h-full" />
                      )
                    ) : (
                      <Image
                          src={getImageUrl(selectedYear, currentItems[selectedImageIndex], selectedImageIndex)}
                          alt={`Gallery image ${selectedImageIndex + 1} from ${selectedYear}`}
                          fill
                          className="object-contain brightness-110"
                      />
                    )}
                </div>
            </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
