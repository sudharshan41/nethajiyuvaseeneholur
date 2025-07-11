
import { Phone, Instagram, Mail } from 'lucide-react';
import Image from 'next/image';
import { ContactForm } from '@/components/contact-form';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold font-headline tracking-tight">
          Get In Touch
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          We'd love to hear from you! Send us a message or connect with us on social media.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-headline font-semibold mb-4">Send us a Message</h2>
            <ContactForm />
          </div>
          <div>
            <h2 className="text-2xl font-headline font-semibold mb-4">Connect with Us</h2>
            <div className="flex items-center gap-4">
              <Button asChild variant="outline" size="icon" className="w-12 h-12 rounded-full">
                <a href="tel:+919611886554" aria-label="Call us">
                  <Phone className="w-6 h-6 text-accent" />
                </a>
              </Button>
              <Button asChild variant="outline" size="icon" className="w-12 h-12 rounded-full">
                <a href="https://www.instagram.com/nysh__official/" target="_blank" rel="noopener noreferrer" aria-label="Visit our Instagram">
                  <Instagram className="w-6 h-6 text-accent" />
                </a>
              </Button>
              <Button asChild variant="outline" size="icon" className="w-12 h-12 rounded-full">
                <a href="mailto:nethajiyuvasene@gmail.com" aria-label="Email us">
                  <Mail className="w-6 h-6 text-accent" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-headline font-semibold mb-4">Our Location</h2>
            <p className="text-muted-foreground mb-4">
              Netaji Yuva Sene, Main Road, Holur, Kolar - 563126
            </p>
            <a href="https://maps.app.goo.gl/8gdHnjcVd9BtypUj9" target="_blank" rel="noopener noreferrer" className="group block">
                <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-lg transition-shadow group-hover:shadow-xl">
                    <Image
                    src="/map (1).png"
                    alt="Map showing office location in Holur"
                    width={800}
                    height={450}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 brightness-110"
                    data-ai-hint="map location"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                        <p className="text-white text-lg font-medium px-4 text-center">Click here to view in maps</p>
                    </div>
                </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

    