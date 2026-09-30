import { useState, useEffect } from "react";
import styles from "./PricingSection.module.css";

export default function PricingSection() {
 const [plans, setPlans] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState("");

 useEffect(() => {
 const fetchPlans = async () => {
 try {
 setLoading(true);
 setError("");

 const response = await fetch(
 "https://invoiceapi-q27upobcwq-uc.a.run.app/getallplans"
 );

 const data = await response.json();

 console.log("API Response:", data);

 if (!response.ok) {
 throw new Error(data.message || "Failed to fetch plans");
 }

 // Handle both possible response formats
 if (Array.isArray(data)) {
 setPlans(data);
 } else if (Array.isArray(data.data)) {
 setPlans(data.data);
 } else {
 setPlans([]);
 }
 } catch (err) {
 console.error("Error fetching plans:", err);
 setError(err.message || "Something went wrong");
 } finally {
 setLoading(false);
 }
 };

 fetchPlans();
 }, []);

 if (loading) {
 return (
 <div className={styles.container}>
 <p className={styles.loading}>Loading pricing plans...</p>
 </div>
 );
 }

 if (error) {
 return (
 <div className={styles.container}>
 <p className={styles.error}>{error}</p>
 </div>
 );
 }

 return (
 <section className={styles.container}>
 <h1 className={styles.heading}>Pricing Plans</h1>

 {plans.length === 0 ? (
 <p className={styles.empty}>No plans available.</p>
 ) : (
 <div className={styles.grid}>
 {plans.map((plan) => (
 <div
 key={plan.id}
 className={`${styles.card} ${
 plan.popular ? styles.popular : ""
 }`}
 >
 {plan.popular && (
 <span className={styles.badge}>Popular</span>
 )}

 <h2 className={styles.name}>{plan.name}</h2>

 <p className={styles.billing}>
 {plan.billingType?.toUpperCase()}
 </p>

 <p className={styles.price}>
 ₹{Number(plan.price || 0).toLocaleString("en-IN")}
 </p>

 {plan.tagLine && (
 <p className={styles.tagline}>{plan.tagLine}</p>
 )}

 <div className={styles.limits}>
 <p>
 <strong>Staff Limit:</strong> {plan.staffLimit}
 </p>

 <p>
 <strong>Sub User Limit:</strong> {plan.subuserLimit}
 </p>

 <p>
 <strong>Job Sheet Limit:</strong> {plan.jobSheetLimit}
 </p>
 </div>

 {plan.features?.length > 0 && (
 <ul className={styles.features}>
 {plan.features.map((feature, index) => (
 <li key={index}>{feature}</li>
 ))}
 </ul>
 )}
 </div>
 ))}
 </div>
 )}
 </section>
 );
}