"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";

import React, { useRef, useState } from "react";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  visible?: boolean;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      // IMPORTANT: Change this to class of `fixed` if you want the navbar to be fixed
      className={cn("fixed inset-x-0 top-0 z-40 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible }
            )
          : child
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backgroundColor: visible ? "#111827" : "rgba(0, 0, 0, 0)",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "65%" : "100%",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-[1600px] flex-row items-center justify-between self-start rounded-full px-4 py-2 lg:flex",
        className
      )}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible }
            )
          : child
      )}
    </motion.div>
  );
};

export const NavItems = ({
  items,
  className,
  onItemClick,
  visible,
}: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  const textColor = visible ? "text-white" : "text-white";

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "flex flex-1 flex-row items-center justify-center space-x-2 text-sm font-bold transition duration-200 lg:flex lg:space-x-2 font-poppins",
        textColor,
        className
      )}
    >
      {items.map((item, idx) => (
        <a
          onMouseEnter={() => setHovered(idx)}
          onClick={(e) => onItemClick?.(e)}
          className="relative px-4 py-2"
          key={`link-${idx}`}
          href={item.link}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full bg-white/20"
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backgroundColor: visible ? "#111827" : "rgba(0, 0, 0, 0)",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: "100%",
        paddingRight: "16px",
        paddingLeft: "16px",
        borderRadius: "0px",
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-50 flex w-full flex-col items-center justify-between px-4 py-2 lg:hidden",
        className
      )}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible }
            )
          : child
      )}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
  visible,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className
      )}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible: visible ? true : undefined }
            )
          : child
      )}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          
          {/* Menu container */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className={cn(
              "absolute inset-x-4 top-20 z-50 mx-auto max-w-sm rounded-2xl bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden",
              "dark:bg-gray-900/95 dark:border-gray-700/30",
              className
            )}
          >
            {/* Gradient header */}
            <div className="bg-gradient-to-r from-blush-500/10 via-golden-500/10 to-blush-600/10 px-6 py-4 border-b border-gray-100/50 dark:border-gray-700/50">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-serif">
                  Menu
                </h3>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Close menu"
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Menu content */}
            <div className="px-6 py-6 space-y-1">
              {React.Children.map(children, (child, index) => {
                if (React.isValidElement(child)) {
                  // If it's a navigation link
                  if (child.type === 'a') {
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group"
                      >
                        <div className="relative overflow-hidden rounded-xl">
                          {React.cloneElement(child as React.ReactElement, {
                            className: cn(
                              "flex items-center px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-200 rounded-xl transition-all duration-200",
                              "hover:bg-gradient-to-r hover:from-blush-500/10 hover:to-golden-500/10 hover:text-gray-900 dark:hover:text-white",
                              "group-hover:translate-x-1 group-hover:shadow-sm",
                              child.props.className
                            )
                          })}
                        </div>
                      </motion.div>
                    );
                  }
                  // If it's a button
                  else {
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: (index + 1) * 0.1 }}
                        className="pt-4 border-t border-gray-100/50 dark:border-gray-700/50"
                      >
                        {React.cloneElement(child as React.ReactElement, {
                          className: cn(
                            "w-full bg-gradient-to-r from-blush-500 to-golden-500 text-black font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200",
                            child.props.className
                          )
                        })}
                      </motion.div>
                    );
                  }
                }
                return child;
              })}
            </div>

            {/* Decorative bottom gradient */}
            <div className="h-1 bg-gradient-to-r from-blush-500 via-golden-500 to-blush-600" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
  visible = false,
}: {
  isOpen: boolean;
  onClick: () => void;
  visible?: boolean;
}) => {
  const iconClass = visible ? "text-white" : "text-white";

  return (
    <motion.button
      onClick={onClick}
      className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/20"
      whileTap={{ scale: 0.95 }}
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {isOpen ? (
          <IconX className={cn(iconClass, "w-6 h-6")} />
        ) : (
          <IconMenu2 className={cn(iconClass, "w-6 h-6")} />
        )}
      </motion.div>
    </motion.button>
  );
};

export const NavbarLogo = () => {
  return (
    <a
      href="#"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black font-sans"
    >
      <img
        src="https://assets.aceternity.com/logo-dark.png"
        alt="logo"
        width={30}
        height={30}
      />
      <span className="font-medium text-black dark:text-white font-serif">
        Startup
      </span>
    </a>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  visible, // Extract visible prop to prevent it from being passed to DOM
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
  visible?: boolean;
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  // Dynamic button styling based on navbar visibility state
  const getButtonStyles = () => {
    if (visible) {
      // When navbar is scrolled (dark background)
      return "bg-white/90 hover:bg-white text-black border border-white/20 hover:border-white";
    } else {
      // When navbar is transparent
      return "bg-white/80 hover:bg-white/90 text-black border border-white/30 hover:border-white/50 backdrop-blur-sm";
    }
  };

  const baseStyles =
    "px-4 py-2 rounded-full text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition-all duration-300 inline-block text-center font-poppins shadow-lg hover:shadow-xl";

  const variantStyles = {
    primary: getButtonStyles(),
    secondary:
      "bg-transparent shadow-none text-white border border-white/30 hover:border-white/50",
    dark: "bg-gray-900 text-white border border-gray-700 hover:border-gray-600",
    gradient:
      "bg-gradient-to-r from-blush-500 to-golden-500 text-white border-0",
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};
