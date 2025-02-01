"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  IconBrandWindows,
  IconBrandApple,
  IconBrandUbuntu,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export type OSType = "Windows" | "macOS" | "Linux" | "Unknown";

interface OSDetectorProps {
  onOSChange: (os: OSType) => void;
}

const OSDetector: React.FC<OSDetectorProps> = ({ onOSChange }) => {
  const [detectedOS, setDetectedOS] = useState<OSType>("Unknown");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();

    if (userAgent.indexOf("win") > -1) setDetectedOS("Windows");
    else if (userAgent.indexOf("mac") > -1) setDetectedOS("macOS");
    else if (userAgent.indexOf("linux") > -1) setDetectedOS("Linux");
    else setDetectedOS("Unknown");
  }, []);

  useEffect(() => {
    onOSChange(detectedOS);
  }, [detectedOS, onOSChange]);

  const getOSIcon = (os: OSType) => {
    switch (os) {
      case "Windows":
        return <IconBrandWindows className="w-4 h-4" />;
      case "macOS":
        return <IconBrandApple className="w-4 h-4" />;
      case "Linux":
        return <IconBrandUbuntu className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const handleOSChange = (os: OSType) => {
    setDetectedOS(os);
    setIsOpen(false);
  };

  return (
    <div className="flex items-center gap-2">
      <span>Detected operating system:</span>
      {getOSIcon(detectedOS)}
      <span>{detectedOS}</span>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="text-blue-600 hover:underline ml-2" variant="link">
            Choose a different OS
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Choose Operating System</DialogTitle>
          </DialogHeader>
          <RadioGroup defaultValue={detectedOS} onValueChange={handleOSChange}>
            {["Windows", "macOS", "Linux"].map((os) => (
              <div key={os} className="flex items-center space-x-2">
                <RadioGroupItem id={os} value={os} />
                <Label htmlFor={os}>{os}</Label>
              </div>
            ))}
          </RadioGroup>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OSDetector;
