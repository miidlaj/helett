import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

const Logo = ({ width, height, className }: { width: number, height: number, className?: string }) => {

    return <Image src="/helett logo-02.svg" width={width} className={cn("fill-white",className)} height={height} alt="logo" />

}


export default Logo;