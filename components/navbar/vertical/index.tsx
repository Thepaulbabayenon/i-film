"use client";

import Image from "next/image";
import { ComponentType, Dispatch, ReactNode, SetStateAction, useState } from "react";
import NextLink from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import Logo from "../../../public/logo.svg";
import useActiveSegment from "@/hooks/use-active-segment";
import { motion } from "framer-motion";
import {
  MagnifyingGlassIcon,
  HomeIcon,
  TvIcon,
  FilmIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

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
    href: "/dashboard",
    Icon: UserIcon,
    to: "Dashboard",
  },
  {
    id: 1,
    href: "/usermanagement",
    Icon: MagnifyingGlassIcon,
    to: "User Management",
  },
  {
    id: 2,
    href: "/filmmanagement",
    Icon: HomeIcon,
    to: "Film Management",
  },
  {
    id: 3,
    href: "/content",
    Icon: TvIcon,
    to: "Content Moderation",
  },
  {
    id: 4,
    href: "/recommendation",
    Icon: FilmIcon,
    to: "Recommendation",
  },
];

const LinkComponent = ({ id, href, to, Icon, isOnHovered, setIsOnHovered }: Props) => {
  const isActive = useActiveSegment(href);

  const handleCollapseSidebar = () => {
    setTimeout(() => {
      setIsOnHovered(false);
    }, 100);
  };

  return (
    <motion.li
      onClick={handleCollapseSidebar}
      whileHover={{ scale: 1.1, x: "5px" }}
      whileTap={{ scale: 0.95 }}
    >
      <NextLink
        href={href}
        className={`
          ${isActive ? "opacity-100" : "opacity-fade"}
          ${href === "#" ? "cursor-not-allowed" : ""} 
         group relative flex p-4 hover:opacity-100`}
      >
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
           transition-smooth absolute z-10 grid h-full w-full text-lg group-hover:text-white`}
        >
          {to}
        </span>
      </NextLink>
    </motion.li>
  );
};

const Links = ({ children, setIsOnHovered }: iProps) => {
  return (
    <div className="mb-36 grid flex-1 items-center">
      <ul
        onMouseEnter={() => setIsOnHovered(true)}
        onMouseLeave={() => setIsOnHovered(false)}
      >
        {children}
      </ul>
    </div>
  );
};

export default function Vertical() {
  const [isOnHovered, setIsOnHovered] = useState(false);
  const segment = useSelectedLayoutSegment();
  const isHiddenLogo = segment === "profile";

  return (
    <>
      <div
        className={`${
          isOnHovered ? "opacity-100" : "opacity-0"
        } transition-smooth pointer-events-none fixed z-40 h-screen w-screen bg-gradient-to-r from-background-dark to-transparent`}
      />
      <nav className="sticky top-0 z-50 flex left-0 h-screen flex-col">
        <NextLink
          href="https://github.com/ntabucejo/disney-plus"
          className="py-12 px-6"
        >
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
            <LinkComponent
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
}
