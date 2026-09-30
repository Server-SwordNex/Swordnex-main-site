import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

import {
 Dialog,
 Disclosure,
 Popover,
 PopoverButton,
 PopoverPanel,
} from "@headlessui/react";

import {
 Bars3Icon,
 LifebuoyIcon,
 QuestionMarkCircleIcon,
 VideoCameraIcon,
 XMarkIcon,
} from "@heroicons/react/24/outline";

import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { MdOutlineHandshake } from "react-icons/md";

import Logo from "./Logo.png";

const resources = [
 {
 name: "Help",
 description: "Get assistance with your questions",
 href: "/products/hms/help",
 icon: LifebuoyIcon,
 },
 {
 name: "FAQ",
 description: "Find answers to frequently asked questions",
 href: "/products/hms/faq",
 icon: QuestionMarkCircleIcon,
 },
 {
 name: "Webinars",
 description: "Watch our expert-led webinars",
 href: "/products/hms/webinars",
 icon: VideoCameraIcon,
 },
 // {
 // name: "Affiliate Program",
 // description: "Earn rewards for customer referrals",
 // href: "/billing/affiliate",
 // icon: MdOutlineHandshake,
 // },
];

export default function Navbar() {
 const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

 return (
 <header className={styles.navbar}>
 <nav className={styles.container}>

 {/* Logo */}
 <Link to="/" className={styles.logo}>
 <img src={Logo} alt="SwordNex" />
 </Link>

 {/* Mobile Menu Button */}
 <button
 className={styles.mobileButton}
 onClick={() => setMobileMenuOpen(true)}
 >
 <Bars3Icon className={styles.menuIcon} />
 </button>

 {/* Desktop Navigation */}
 <div className={styles.desktopNav}>
 <Link to="/products/hms/features" className={styles.navLink}>
 Features
 </Link>

 <Link to="/products/hms/pricing" className={styles.navLink}>
 Pricing
 </Link>

 <Popover className={styles.popover}>
 {({ close }) => (
 <>
 <PopoverButton className={styles.navLink}>
 Resources
 <ChevronDownIcon className={styles.chevron} />
 </PopoverButton>

 <PopoverPanel className={styles.dropdown}>
 {resources.map((item) => (
 <Link
 key={item.name}
 to={item.href}
 className={styles.dropdownItem}
 onClick={() => close()}
 >
 <div className={styles.iconBox}>
 <item.icon className={styles.dropdownIcon} />
 </div>

 <div>
 <h4>{item.name}</h4>
 <p>{item.description}</p>
 </div>
 </Link>
 ))}
 </PopoverPanel>
 </>
 )}
 </Popover>

 <Link to="/products/hms/support" className={styles.navLink}>
 Support
 </Link>
 </div>

 {/* Desktop Actions */}
 <div className={styles.actions}>
 <a
 href="https://www.hms.swordnex.com/login"
 target="_blank"
 rel="noreferrer"
 className={styles.signIn}
 >
 Sign In
 </a>

 <a
 href="https://www.hms.swordnex.com/signup"
 target="_blank"
 rel="noreferrer"
 className={styles.signUp}
 >
 SIGN UP NOW
 </a>
 </div>
 </nav>

 {/* Mobile Drawer */}
 <Dialog
 open={mobileMenuOpen}
 onClose={setMobileMenuOpen}
 className={styles.mobileDialog}
 >
 <div className={styles.mobileOverlay} />

 <Dialog.Panel className={styles.mobilePanel}>
 <div className={styles.mobileHeader}>
 <img src={Logo} alt="SwordNex" />

 <button onClick={() => setMobileMenuOpen(false)}>
 <XMarkIcon className={styles.closeIcon} />
 </button>
 </div>

 <div className={styles.mobileLinks}>
 <Link to="/products/hms/features">Features</Link>
 <Link to="/products/hms/pricing">Pricing</Link>

 <Disclosure>
 {({ open }) => (
 <div>
 <Disclosure.Button className={styles.disclosureBtn}>
 Resources
 <ChevronDownIcon
 className={`${styles.chevron} ${open ? styles.rotate : ""
 }`}
 />
 </Disclosure.Button>

 <Disclosure.Panel className={styles.disclosurePanel}>
 {resources.map((item) => (
 <Link key={item.name} to={item.href}>
 {item.name}
 </Link>
 ))}
 </Disclosure.Panel>
 </div>
 )}
 </Disclosure>

 <Link to="/products/hms/support">Support</Link>
 </div>

 <div className={styles.mobileActions}>
 <a
 href="https://www.hms.swordnex.com/login"
 target="_blank"
 rel="noreferrer"
 style={{ color: "#b8860b" }}
 >
 Sign In
 </a>

 <a
 href="https://www.hms.swordnex.com/signup"
 target="_blank"
 rel="noreferrer"
 className={styles.mobileSignup}
 >
 SIGN UP NOW
 </a>
 </div>
 </Dialog.Panel>
 </Dialog>
 </header>
 );
}