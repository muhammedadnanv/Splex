import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Lock, Palette, Clock } from "lucide-react";

interface PremiumFeaturesProps {
  onUnlock: () => void;
}

const PremiumFeatures = ({ onUnlock }: PremiumFeaturesProps) => {
  const { toast } = useToast();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handlePayment = () => {
    toast({
      title: "Payment Details",
      description: "UPI: adnanmuhammad4393@okicici - Please pay ₹699 to unlock premium features",
      duration: 10000,
    });
    setIsPending(true);
    toast({
      title: "Payment Under Review",
      description: "Your payment is being verified by admin. Features will be unlocked once approved.",
      duration: 5000,
    });
  };

  // This would typically be called by an admin through a separate interface
  const handleAdminApproval = () => {
    setIsPending(false);
    setIsUnlocked(true);
    onUnlock();
    toast({
      title: "Features Unlocked!",
      description: "Custom branding features are now available.",
      duration: 5000,
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Lock className="h-4 w-4" />
        Premium Features
      </h3>
      
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full gap-2 h-auto py-4 flex-col items-start text-left"
            disabled={isUnlocked}
          >
            <div className="flex items-center gap-2 w-full">
              {isPending ? (
                <Clock className="h-4 w-4 shrink-0 animate-pulse" />
              ) : (
                <Palette className="h-4 w-4 shrink-0" />
              )}
              <span className="font-medium">
                {isPending ? "Approval Pending" : "Custom Branding"}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {isPending 
                ? "Your payment is being verified by admin"
                : "Add your logo and brand colors"
              }
            </p>
          </Button>
        </AlertDialogTrigger>
        {!isUnlocked && !isPending && (
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Unlock Premium Features</AlertDialogTitle>
              <AlertDialogDescription>
                Get access to custom branding features for ₹699. 
                This is a one-time payment. Please use UPI ID: adnanmuhammad4393@okicici
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handlePayment}>Make Payment</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        )}
      </AlertDialog>

      <div className="pt-4 border-t">
        <p className="text-sm text-muted-foreground">
          Upgrade to Pro to unlock custom branding features including logo customization 
          and brand color schemes.
        </p>
      </div>

      {/* This button is temporary for demo purposes - would be in admin panel */}
      {isPending && (
        <Button 
          variant="outline" 
          className="w-full mt-4"
          onClick={handleAdminApproval}
        >
          (Demo) Admin Approve Payment
        </Button>
      )}
    </div>
  );
};

export default PremiumFeatures;