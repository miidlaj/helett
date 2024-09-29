import React from 'react';
import { Facebook, Instagram, Mail, } from 'lucide-react';
import Logo from './common/logo';
import Link from 'next/link';

const Footer = () => {
    const links = [
        { name: 'Home', href: '/' },
        { name: 'About us', href: '/about' },
        { name: 'Category', href: '/category' },
        { name: 'Store', href: '/store' },
        { name: 'Contact us', href: '/contact' },
    ];

    const socialIcons = [
        { icon: Mail, href: 'mailto:hello@mail.com', label: 'send mail' },
        { icon: Facebook, href: '#', label: 'facebook' },
        { icon: Instagram, href: '#', label: 'instagram' },
    ];

    return (
        <footer className="w-full bg-white dark:bg-black py-16">
            <div className="md:px-12 lg:px-28">
                <div className="container m-auto space-y-6 dark:text-white text-black">
                    <Logo width={120} height={120} className="dark:fill-white fill-black mx-auto" />

                    <ul
                        role="list"
                        className="flex flex-col items-center justify-center gap-4 py-4 sm:flex-row sm:gap-8"
                    >
                        {links.map((link, index) => (
                            <li role="listitem" key={index}>
                                <Link href={link.href}>
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="m-auto flex w-max items-center justify-between space-x-4">
                        {socialIcons.map((social, index) => {
                            const IconComponent = social.icon;
                            return (
                                <Link
                                    key={index}
                                    href={social.href}
                                    aria-label={social.label}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <IconComponent size={20} /> 
                                </Link>
                            );
                        })}
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
