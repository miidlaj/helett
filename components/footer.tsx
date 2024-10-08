import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Mail } from "lucide-react";

import Logo from "./common/logo";
import { TextHoverEffect } from "./ui/text-hover-effect";

const Footer = () => {
  const links = [
    { name: "Home", href: "/" },
    { name: "About us", href: "/about" },
    { name: "Category", href: "/category" },
    { name: "Store", href: "/store" },
    { name: "Contact us", href: "/contact-us" },
  ];

  const socialIcons = [
    { icon: Mail, href: "mailto:hello@mail.com", label: "send mail" },
    { icon: Facebook, href: "#", label: "facebook" },
    { icon: Instagram, href: "#", label: "instagram" },
  ];

  return (
    <footer className="w-full bg-white dark:bg-black pt-16 py-5 border-t">
      <div className="md:px-12 lg:px-28">
        <div className="container m-auto space-y-6 dark:text-white text-black">
          <div className="w-full flex justify-center">
            <Logo height={120} width={120} />
          </div>

          <ul className="flex flex-col items-center justify-center gap-4 py-4 sm:flex-row sm:gap-8">
            {links.map((link, index) => (
              <li key={index}>
                <Link href={link.href}>{link.name}</Link>
              </li>
            ))}
          </ul>

          <div className="m-auto flex w-max items-center justify-between space-x-4">
            {socialIcons.map((social, index) => {
              const IconComponent = social.icon;

              return (
                <Link
                  key={index}
                  aria-label={social.label}
                  href={social.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <IconComponent size={20} />
                </Link>
              );
            })}
          </div>

          <div className="h-96 flex items-center justify-center">
            <TextHoverEffect className="font-rimouski" text="helett" />
          </div>

          <div className="text-center">
            <span className="text-sm tracking-wide">
              Copyright © helett <span id="year" /> | All rights reserved
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
