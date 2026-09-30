import React from "react";
import styles from "./FullFeature.module.css";

export default function FullFeature() {
 return (
 <section className={styles.featuresPage}>
 <div className={styles.container}>
 
 {/* Sidebar */}
 <aside className={styles.sidebar}>
 <h2>All Features</h2>

 <nav>
 <a href="#product-catalog">Product Catalog</a>
 <a href="#billing">Billing</a>
 <a href="#customer-lifecycle">Lifecycle Management</a>
 <a href="#collections">Collections</a>
 <a href="#customer-portal">Customer Portal</a>
 <a href="#analytics">Reporting Analytics</a>
 <a href="#automation">Automation</a>
 <a href="#integrations">Integrations</a>
 <a href="#security">Security</a>
 </nav>
 </aside>

 {/* Content */}
 <div className={styles.content}>

 {/* Hero */}
 <section className={styles.hero}>
 <div>
 <h1>
 Features that make your
 <span> billing seamless</span>
 </h1>

 <div className={styles.heroButtons}>
 <button>Start Free Trial</button>
 <button className={styles.secondary}>
 Request Demo
 </button>
 </div>
 </div>

 <img
 src="/images/billing-features-hero.png"
 alt="Billing Features"
 />
 </section>

 {/* Feature Section */}
 <section
 id="product-catalog"
 className={styles.featureCard}
 >
 <div className={styles.featureHeader}>
 <div>
 <span className={styles.tag}>
 Product Catalog
 </span>

 <h2>Perfect your product catalog</h2>
 </div>

 <p>
 Get a clean and scalable product catalog
 that enables rapid market expansion.
 </p>
 </div>

 <img
 src="/images/product-catalog.png"
 alt=""
 className={styles.featureImage}
 />

 <div className={styles.featureGrid}>
 <div>
 <h3>
 Streamline diverse product offerings
 </h3>

 <p>
 Create, update and manage multiple
 products under one roof.
 </p>
 </div>

 <div>
 <h3>
 Unlock new revenue possibilities
 </h3>

 <p>
 Support flat, volume and tiered
 pricing models.
 </p>
 </div>

 <div>
 <h3>
 Change prices without losing demand
 </h3>

 <p>
 Use price lists to customize rates
 for specific customers.
 </p>
 </div>

 <div>
 <h3>Manage discounts</h3>

 <p>
 Create coupons and promotional
 discounts with full control.
 </p>
 </div>
 </div>
 </section>

 {/* Repeat same component */}
 <section
 id="billing"
 className={styles.featureCard}
 >
 <div className={styles.featureHeader}>
 <div>
 <span className={styles.tag}>
 Billing
 </span>

 <h2>
 Enhance your billing experience
 </h2>
 </div>

 <p>
 Invoicing, recurring billing,
 expenses and projects in one place.
 </p>
 </div>
 </section>

 </div>
 </div>
 </section>
 );
}