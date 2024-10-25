import { QRCodeSVG } from "qrcode.react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CardData } from "@/hooks/useCardData";
import { WalletActions } from "./WalletActions";
import { CTAButtons } from "./CTAButtons";
import { Linkedin, Instagram, Facebook } from "lucide-react";

interface CardPreviewProps {
  cardData: CardData;
  profileImage: string | null;
  vCardData: string;
  qrStyle: {
    background: string;
    foreground: string;
  };
}

export const CardPreview = ({ cardData, profileImage, vCardData, qrStyle }: CardPreviewProps) => {
  return (
    <div className="space-y-4">
      <div 
        className="aspect-[3/4] rounded-lg flex flex-col items-center justify-between p-4 sm:p-8 border shadow-lg mx-auto max-w-sm dark:bg-gray-800 dark:border-gray-700"
        style={{ 
          background: qrStyle.background,
          color: qrStyle.foreground 
        }}
      >
        <div className="text-center space-y-4 w-full">
          {cardData.name && (
            <div className="space-y-2">
              <Avatar className="w-24 h-24 mx-auto">
                <AvatarImage src={profileImage || ""} alt={`${cardData.name}'s profile`} />
                <AvatarFallback className="text-xl dark:bg-gray-700 dark:text-gray-200">
                  {cardData.name ? cardData.name.charAt(0).toUpperCase() : "U"}
                </AvatarFallback>
              </Avatar>
              <h4 className="font-semibold text-lg dark:text-gray-100">{cardData.name}</h4>
              {cardData.title && (
                <p className="text-sm opacity-80 dark:text-gray-300">{cardData.title}</p>
              )}
              {cardData.company && (
                <p className="text-sm opacity-80 dark:text-gray-300">{cardData.company}</p>
              )}
            </div>
          )}
          
          <CTAButtons cardData={cardData} textColor={qrStyle.foreground} />

          <div className="flex justify-center gap-4">
            {cardData.linkedin && (
              <a href={cardData.linkedin} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 dark:text-gray-200">
                <Linkedin className="h-5 w-5" style={{ color: qrStyle.foreground }} />
              </a>
            )}
            {cardData.instagram && (
              <a href={cardData.instagram} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 dark:text-gray-200">
                <Instagram className="h-5 w-5" style={{ color: qrStyle.foreground }} />
              </a>
            )}
            {cardData.facebook && (
              <a href={cardData.facebook} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 dark:text-gray-200">
                <Facebook className="h-5 w-5" style={{ color: qrStyle.foreground }} />
              </a>
            )}
          </div>

          <div className="flex-1 flex items-center justify-center py-4">
            <QRCodeSVG
              value={vCardData}
              size={Math.min(200, window.innerWidth * 0.4)}
              bgColor={qrStyle.background}
              fgColor={qrStyle.foreground}
              level="M"
              includeMargin={false}
            />
          </div>
          <p className="text-sm dark:text-gray-300">Scan to Connect</p>
        </div>
      </div>
      
      <WalletActions 
        cardData={cardData}
        qrCodeUrl={vCardData}
      />
    </div>
  );
};