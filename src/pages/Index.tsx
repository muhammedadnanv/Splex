import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CardEditor from "@/components/CardEditor";
import { Menu, Save, Share2, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useRef } from "react";
import html2canvas from "html2canvas";

const Index = () => {
  const { toast } = useToast();
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const [cardData, setCardData] = useState({
    name: "",
    title: "",
    phone: "",
    email: "",
    website: "",
    linkedin: "",
    instagram: "",
    facebook: "",
  });

  const handleSave = () => {
    // Generate vCard data
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${cardData?.name || ''}
TITLE:${cardData?.title || ''}
TEL:${cardData?.phone || ''}
EMAIL:${cardData?.email || ''}
URL:${cardData?.website || ''}
END:VCARD`;

    // Create and download vCard file
    const vCardBlob = new Blob([vCardData], { type: 'text/vcard' });
    const vCardUrl = window.URL.createObjectURL(vCardBlob);
    const vCardLink = document.createElement('a');
    vCardLink.href = vCardUrl;
    vCardLink.download = `${cardData?.name || 'contact'}.vcf`;
    vCardLink.click();
    window.URL.revokeObjectURL(vCardUrl);

    // Also trigger the QR code download from CardEditor
    if (qrCodeRef.current) {
      html2canvas(qrCodeRef.current).then((canvas) => {
        const url = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.download = `${cardData?.name || 'qr-code'}-card.png`;
        link.href = url;
        link.click();
      });
    }

    toast({
      title: "Success!",
      description: "Your digital card and QR code have been saved.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm dark:bg-gray-950/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">Splex</h1>
            
            {/* Mobile menu */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <div className="flex flex-col gap-4 mt-8">
                    <Button variant="outline" className="w-full gap-2">
                      <User className="h-4 w-4" />
                      Sign In
                    </Button>
                    <Button onClick={handleSave} className="w-full gap-2">
                      <Save className="h-4 w-4" />
                      Save
                    </Button>
                    <Button variant="outline" className="w-full gap-2">
                      <Share2 className="h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Desktop buttons */}
            <div className="hidden md:flex gap-2">
              <Button variant="outline" className="gap-2">
                <User className="h-4 w-4" />
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold">Create Your Digital Card</h2>
            <div className="hidden md:flex gap-2 self-end sm:self-auto">
              <Button onClick={handleSave} className="gap-2">
                <Save className="h-4 w-4" />
                Save
              </Button>
              <Button variant="outline" className="gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>

          <CardEditor onSave={handleSave} />
        </div>
      </main>
    </div>
  );
};

export default Index;
