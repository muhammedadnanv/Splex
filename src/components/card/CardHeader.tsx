import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { Nfc, BadgeCheck } from "lucide-react";
import { CardData } from "@/types/qrTypes";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface CardHeaderProps {
  cardData: CardData;
  profileImage: string | null;
  foregroundColor: string;
}

export const CardHeader = ({ cardData, profileImage, foregroundColor }: CardHeaderProps) => {
  const isVerified = cardData.name?.charAt(0).toUpperCase() === 'A' || 
                     cardData.name?.charAt(0).toUpperCase() === 'S';

  return (
    <div className="flex items-center justify-between">
      {cardData.name && (
        <motion.div 
          className="flex items-center gap-2"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Avatar className="w-12 h-12 sm:w-16 sm:h-16 ring-2 ring-white/20 hover:scale-105 transition-transform">
            <AvatarImage src={profileImage || ""} alt={`${cardData.name}'s profile`} />
            <AvatarFallback className="text-sm sm:text-base bg-gradient-to-br from-primary/20 to-primary/10">
              {cardData.name ? cardData.name.charAt(0).toUpperCase() : "U"}
            </AvatarFallback>
          </Avatar>
          <div className="text-left">
            <div className="flex items-center gap-1">
              <h4 className="font-semibold text-sm sm:text-base">{cardData.name}</h4>
              {isVerified && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, delay: 0.2 }}
                      >
                        <BadgeCheck 
                          className="h-4 w-4 text-blue-500" 
                          style={{ filter: 'drop-shadow(0 0 2px rgba(59, 130, 246, 0.5))' }}
                        />
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Verified User</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            {cardData.title && (
              <p className="text-xs sm:text-sm opacity-80">{cardData.title}</p>
            )}
            {cardData.company && (
              <p className="text-xs sm:text-sm opacity-80">{cardData.company}</p>
            )}
          </div>
        </motion.div>
      )}
      <motion.div
        initial={{ rotate: -180, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.1, rotate: 10 }}
      >
        <Nfc className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: foregroundColor }} />
      </motion.div>
    </div>
  );
};