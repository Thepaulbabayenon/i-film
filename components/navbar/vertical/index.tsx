"use client";

import Image from "next/image";
import { ComponentType, Dispatch, ReactNode, SetStateAction, useState } from "react";
import Link from "./link";
import Links from "./links";
import {
  MagnifyingGlassIcon,
  HomeIcon,
  TvIcon,
  FilmIcon,
  SparklesIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import NextLink from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import Logo from "../../../public/logo.svg"
import useActiveSegment from "@/hooks/use-active-segment";
import { motion } from "framer-motion";

type iProps = {
  children: ReactNode;
  setIsOnHovered: Dispatch<SetStateAction<boolean>>;
};

type Props = {
  id: number;
  href: string;
  to: string;
  Icon: ComponentType<React.SVGProps<SVGSVGElement>>;
  isOnHovered: boolean;
  setIsOnHovered: Dispatch<SetStateAction<boolean>>;
};

const list = [
  {
    id: 0,
    href: "/profile",
    Icon: UserIcon,
    to: "Profile",
  },
  {
    id: 1,
    href: "/search",
    Icon: MagnifyingGlassIcon,
    to: "Search",
  },
  {
    id: 2,
    href: "/",
    Icon: HomeIcon,
    to: "Home",
  },
  {
    id: 3,
    href: "/series",
    Icon: TvIcon,
    to: "Series",
  },
  {
    id: 4,
    href: "/movies",
    Icon: FilmIcon,
    to: "Movies",
  },
  {
    id: 5,
    href: "/originals",
    Icon: SparklesIcon,
    to: "Originals",
  },
];

export default function Vertical  () {
  const [isOnHovered, setIsOnHovered] = useState(false);
  const segment = useSelectedLayoutSegment();
  const isHiddenLogo = segment === "profile";

  const Linkk = ({ id, href, to, Icon, isOnHovered, setIsOnHovered }: Props) => {
    const isActive = useActiveSegment(href);
  
    const handleCollapseSidebar = () => {
      setTimeout(() => {
        setIsOnHovered(false);
      }, 100);
    };
  

  const Links = ({ setIsOnHovered }: iProps) => {
    return (
      <div className="mb-36 grid flex-1 items-center">
        <ul
          onMouseEnter={() => setIsOnHovered(true)}
          onMouseLeave={() => setIsOnHovered(false)}>
        </ul>
      </div>
    );
  };

  return (
    <>
     <motion.li
      onClick={handleCollapseSidebar}
      whileHover={{ scale: 1.1, x: "5px" }}
      whileTap={{ scale: 0.95 }}>
      <NextLink
        href={href}
        className={`
          ${isActive ? "opacity-100" : "opacity-fade"}
          ${href === "#" ? "cursor-not-allowed" : ""} 
         group relative flex items-center p-4 hover:opacity-100`}>
        <Icon
          className={`${
            isActive ? "fill-white" : ""
          } z-30 mx-auto h-6 w-6 group-hover:fill-white group-hover:text-white`}
        />
        <div className="absolute inset-y-0 left-0 z-20 w-2/3 bg-background-dark" />
        <span
          style={{
            transitionDuration: `${(id + 1) * 50}ms`,
          }}
          className={`
          ${isActive ? "text-white" : ""} 
          ${isOnHovered ? "ml-16 opacity-100" : "left-0 opacity-0"}
           transition-smooth absolute z-10 grid h-full w-full items-center text-lg group-hover:text-white`}>
          {to}
        </span>
      </NextLink>
    </motion.li>
      <div
        className={`${
          isOnHovered ? "opacity-100" : "opacity-0"
        } transition-smooth pointer-events-none fixed  z-40 h-screen w-screen bg-gradient-to-r from-background-dark to-transparent`}
      />
      <nav className="sticky top-0 z-50 flex left-0 h-screen flex-col">
        <NextLink
          href="https://github.com/ntabucejo/disney-plus"
          className="py-12 px-6">
          <Image
            alt="Logo"
            src={Logo}
            priority
            width={68}
            height={48}
            sizes="100px"
            className={`${
              isHiddenLogo ? "opacity-0" : "opacity-100"
            } transition-smooth h-[48px] w-[68px] object-contain`}
          />
        </NextLink>
        <Links setIsOnHovered={setIsOnHovered}>
          {list.map(({ id, href, to, Icon }) => (
            <Link
              key={id}
              id={id}
              href={href}
              to={to}
              Icon={Icon}
              isOnHovered={isOnHovered}
              setIsOnHovered={setIsOnHovered}
            />
          ))}
        </Links>
      </nav>
    </>
  );
};

}


