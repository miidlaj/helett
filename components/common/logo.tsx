import Image from "next/image";
import React from "react";

const Logo = ({ width, height }: { width: number; height: number }) => {
  return (
    <div>
      <div className="block dark:hidden">
        <Image
          alt="logo"
          height={height}
          src="/helett-logo-black.svg"
          width={width}
        />
      </div>
      <div className="hidden dark:block">
        <Image
          alt="logo"
          height={height}
          src="/helett-logo-white.svg"
          width={width}
        />
      </div>
    </div>
  );
};

export default Logo;
