"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../ui/navbar-menu";
import { cn } from "@/lib/utils";


export default function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
    return (
        <div
            className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50 ", className)}
        >
            <Menu setActive={setActive}>
                <MenuItem setActive={setActive} active={active} item="Category">
                    <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink href="/">Category 1</HoveredLink>
                        <HoveredLink href="/">Category 2</HoveredLink>
                        <HoveredLink href="/">Category 3</HoveredLink>
                        <HoveredLink href="/">Category 4</HoveredLink>
                    </div>
                </MenuItem>
                <MenuItem setActive={setActive} active={active} item="Products">
                    <div className="  text-sm grid grid-cols-2 gap-10 p-4">
                        <ProductItem
                            title="Barcode Scanner"
                            href="https://www.amazon.in/helett-HT410-Handheld-Indicator-Induction/dp/B0CBC9G7W2/ref=sr_1_6?sr=8-6"
                            src="https://m.media-amazon.com/images/I/61Ij6iC-fhL._SX679_.jpg"
                            description="Helett® HT410 Wired 1D & 2D Barcode Scanner"
                        />
                        <ProductItem
                            title="Label Printer"
                            href="https://www.amazon.in/H65C-Portable-Bluetooth-Printing-Resolution/dp/B0D1P7SC46/ref=sr_1_3?sr=8-3"
                            src="https://m.media-amazon.com/images/I/51pi4DwBZGL._SY450_.jpg"
                            description="Helett H65C Portable Bluetooth Thermal Label Printer"
                        />
                        <ProductItem
                            title="Helmets "
                            href="https://www.amazon.in/Helmets-Hex-2-Helmet-Yellow-Large/dp/B0BDZLB872/ref=sr_1_29?sr=8-29"
                            src="https://m.media-amazon.com/images/I/61RWzFIHe-L._SX569_.jpg"
                            description="Axor Helmets Apex Hex-2 Helmet (Neon Yellow Blue, Large)"
                        />
                        <ProductItem
                            title="Wi-Fi Router"
                            href="https://www.amazon.in/AC1200-High-Gain-Antennas-Repeater-Ethernet/dp/B0DGF32QRT/ref=sr_1_14?sr=8-14"
                            src="https://m.media-amazon.com/images/I/41OV3cPzUhL._SX300_SY300_QL70_FMwebp_.jpg"
                            description="Helett® AC1200 Dual Band (2.4GHz & 5GHz) 1200 Mbps 6 Wi-Fi Router"
                        />
                    </div>
                </MenuItem>
                <MenuItem setActive={setActive} active={active} item="Links">
                    <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink href="/">Link 1</HoveredLink>
                        <HoveredLink href="/">Link 2</HoveredLink>
                        <HoveredLink href="/">Link 3</HoveredLink>
                        <HoveredLink href="/">Link 4</HoveredLink>
                    </div>
                </MenuItem>
            </Menu>
        </div>
    );
}
