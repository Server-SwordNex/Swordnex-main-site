import {
 Code,
 Smartphone,
 BookOpen,
 Server,
 Briefcase,
 Layers,
 ShoppingBag,
 PenTool,
 Rocket,
 Search,
 Megaphone,
 Mail,
 Shield,
 Network,
 Database,
 HardDrive,
 Headphones,
 Cloud,
 Cpu,
 GraduationCap,
 Users,
 BarChart,
 Lightbulb,
 Globe,
 Zap,
 Target,
 TrendingUp,
 Award,
 Monitor,
 Palette,
 Camera,
 Settings,
 Lock,
 Wifi,
 MessageSquare,
 Video,
 UserCheck,
 Building,
 Brain,
 BarChart2,
 Laptop,
 FileText,
 Star,
} from "lucide-react";
import { appdev, hr2, paid, hardware } from "../assets";

export const servicesData = [
 {
 id: 1,
 slug: "application-solutions",
 icon: Code,
 title: "Application Solutions",
 shortDescription:
 "Smart Digital Solutions That Power Your Business Forward.",
 rating: "4.9",
 category: "development",
 hero: {
 title: "Application Solutions",
 subtitle: "Smart Digital Solutions That Power Your Business Forward.",
 image: appdev,
 },
 overview: {
 title: "Application Solutions",
 description: "Smart Digital Solutions That Power Your Business Forward.",
 },
 subServices: [
 {
 icon: Globe,
 title: "Web Development",
 description:
 "Build fast, responsive websites that drive engagement. From sleek designs to SEO-ready builds, we create websites that perform on all devices.",
 },
 {
 icon: Smartphone,
 title: "App Development",
 description:
 "Scalable mobile apps with seamless user experiences. Whether iOS or Android, we deliver cross-platform apps that users love to use.",
 },
 {
 icon: ShoppingBag,
 title: "E-Commerce Development",
 description:
 "Launch your online store with secure, smart features. Robust e-commerce platforms with payment gateways, inventory systems, and more.",
 },
 {
 icon: Settings,
 title: "Software Development",
 description:
 "Tailor-made software for growth and efficiency. From startups to enterprises, we create reliable software to streamline your operations.",
 },
 ],
 features: [
 "UI/UX Design & Prototyping",
 "Agile Development & DevOps",
 "Cloud-Native Architecture",
 "API Development & Integration",
 "Quality Assurance & Testing",
 "24/7 Maintenance & Support",
 "PWA Development",
 "Security Implementation & Compliance",
 ],
 cta: {
 title: "Ready to build your next breakthrough application?",
 subtitle:
 "Let's discuss your vision and requirements. Our expert team will guide you through every step of the development process to create something extraordinary.",
 buttonText: "Start Your Project Today",
 },
 },
 {
 id: 2,
 slug: "digital-media",
 icon: Megaphone,
 title: "Digital Media & Marketing",
 shortDescription:
 "Amplify your brand with data-driven digital strategies. We don't just post - we perform, influence, and convert with campaigns that boost visibility, engage audiences, and drive measurable results across all channels.",
 rating: "4.8",
 category: "marketing",
 hero: {
 title: "Digital Media",
 subtitle:
 "At SwordNex Software Solution, We Don't Just Post We Perform, Influence, and Convert.",
 image: paid,
 },
 overview: {
 title: "Digital Media",
 description:
 "At SwordNex Software Solution, We Don't Just Post We Perform, Influence, and Convert. Our digital media services enhance your online visibility and generate high-quality leads through advanced SEO, social media management, content creation, paid advertising, and marketing automation, delivering a cohesive and results-driven brand strategy.",
 },
 subServices: [
 {
 icon: Search,
 title: "Search Engine Optimization (SEO)",
 description:
 "Let them find you first organically. With SwordNex's SEO expertise, climb search rankings and stay there. We boost your organic search rankings with technical SEO, keyword optimization, and high-quality content.",
 },
 {
 icon: TrendingUp,
 title: "Social Media Marketing",
 description:
 "Build real communities, not just followers. SwordNex drives your brand's story across Instagram, LinkedIn, Facebook & more with creative content, influencer partnerships, and community management strategies.",
 },
 {
 icon: Target,
 title: "Paid Advertising",
 description:
 "Fuel your growth with smarter ad spends. We run high ROI ad campaigns across Google, Meta, and more with SwordNex precision, using advanced audience targeting for maximum results.",
 },
 {
 icon: Zap,
 title: "Digital Marketing",
 description:
 "Full-spectrum strategies by SwordNex to dominate digital space. We align your brand's voice with the right audience from awareness to conversion, building thought leadership and brand authority.",
 },
 {
 icon: PenTool,
 title: "Content Marketing",
 description:
 "Strategic storytelling powered by SwordNex. From blogs to videos, we create content that educates, engages, and earns trust.",
 },
 {
 icon: Palette,
 title: "Graphics Designing",
 description:
 "Designs that don't just look good, they sell. Visual assets crafted by SwordNex to elevate your brand and communication.",
 },
 {
 icon: Mail,
 title: "Email & SMS",
 description:
 "Right words. Right time. Real results. SwordNex creates high conversion email and SMS campaigns that customers actually open.",
 },
 {
 icon: Video,
 title: "VFX (Visual Effects)",
 description:
 "Unleash cinematic visuals for your brand. SwordNex adds motion and magic to your content with professional grade VFX services.",
 },
 ],
 features: [
 "Marketing Strategy & Competitor Analysis",
 "Audience Research & Journey Mapping",
 "A/B Testing & Optimization",
 "Conversion Rate Optimization & Landing Page Design",
 "Real-time Analytics & Reporting",
 "Brand Identity & Visual Assets",
 "Marketing Automation & Lead Nurturing",
 "Influencer Marketing & Partnerships",
 ],
 cta: {
 title: "Ready to dominate your market digitally?",
 subtitle:
 "Let's create a comprehensive digital strategy that drives real business growth and positions your brand as an industry leader.",
 buttonText: "Launch Your Campaign",
 },
 },
 {
 id: 3,
 slug: "it-infrastructure",
 icon: Server,
 title: "IT Infrastructure",
 shortDescription:
 "SwordNex Builds Your Digital Backbone ! Secure, Scalable, and Always-On",
 rating: "4.7",
 category: "infrastructure",
 hero: {
 title: "IT Infrastructure",
 subtitle:
 "SwordNex Builds Your Digital Backbone! Secure, Scalable, and Always-On",
 image: hardware,
 },
 overview: {
 title: "Managed IT Services for Modern Enterprises",
 description:
 "From network architecture and cloud migration to cybersecurity and data center management, our IT infrastructure services provide the rock-solid foundation your business needs to thrive in today's digital landscape. We offer proactive monitoring, 24/7 expert support, and strategic technology guidance to optimize your IT environment for peak performance, security, and cost-efficiency.",
 },
 subServices: [
 {
 icon: Shield,
 title: "Security Services",
 description:
 "Protect what powers your business. SwordNex delivers end-to-end cybersecurity from threat detection to data protection.",
 },
 {
 icon: Wifi,
 title: "Network Services",
 description:
 "Connect with confidence, anywhere. We design and manage high-speed, secure, and scalable networks tailored to your operations.",
 },
 {
 icon: Database,
 title: "Server & Data Center Management",
 description:
 "Maximize uptime. Minimize risk. SwordNex ensures your servers and data centers run smoothly with round-the-clock monitoring and optimization.",
 },
 {
 icon: HardDrive,
 title: "Hardware & Software Solutions",
 description:
 "The right tools. The right tech. From enterprise hardware to licensed software, SwordNex delivers reliable IT procurement and integration.",
 },
 {
 icon: Headphones,
 title: "IT Support & Managed Services",
 description:
 "Your IT, managed the smart way. Outsource the stress. SwordNex provides expert level support, system updates, and performance management.",
 },
 ],
 features: [
 "Cloud Migration & Management",
 "Cybersecurity Audits & Testing",
 "Disaster Recovery & Continuity",
 "Unified Communications Solutions",
 "System Monitoring & Analytics",
 "IT Consulting & Roadmapping",
 "Compliance Management",
 "Data Recovery Solutions",
 ],
 cta: {
 title: "Need a bulletproof IT foundation?",
 subtitle:
 "Let's assess your current infrastructure and design a comprehensive solution that supports your business growth and protects your valuable data.",
 buttonText: "Get Your IT Assessment",
 },
 },
 {
 id: 4,
 slug: "professional-development",
 icon: BookOpen,
 title: "Professional Development Programs",
 shortDescription:
 "Empowering Tomorrow’s Talent One Skill at a Time with SwordNex.",
 rating: "4.9",
 category: "training",
 hero: {
 title: "Professional Development Programs",
 subtitle:
 "Empowering Tomorrow’s Talent One Skill at a Time with SwordNex.",
 image: appdev,
 },
 overview: {
 title: "Professional Development Programs",
 description:
 "Empowering Tomorrow’s Talent One Skill at a Time with SwordNex.",
 },
 subServices: [
 {
 icon: Code,
 title: "Full-Stack Development (MERN, MEAN, LAMP)",
 description:
 "Master frontend to backend with real-world stacks. SwordNex equips you with complete full-stack expertise using industry standard frameworks.",
 },
 {
 icon: Laptop,
 title: "Web Development",
 description:
 "Build modern, responsive websites from scratch. Hands-on training in HTML, CSS, JavaScript, and popular libraries led by SwordNex experts.",
 },
 {
 icon: Smartphone,
 title: "Mobile App Development",
 description:
 "Create dynamic apps for Android & iOS. Learn cross-platform and native development using tools like Flutter, React Native & more.",
 },
 {
 icon: Cloud,
 title: "AWS, Microsoft Azure, Google Cloud Training",
 description:
 "Get certified by cloud leaders. SwordNex offers hands-on training and certification prep for major cloud platforms.",
 },
 {
 icon: Brain,
 title: "AI & Machine Learning",
 description:
 "Step into the future of intelligent systems. Learn predictive modeling, neural networks, and real AI project implementation.",
 },
 {
 icon: BarChart2,
 title: "Data Analytics (Power BI)",
 description:
 "Turn data into decisions. Master Power BI dashboards, reports, and data visualization to drive business insights.",
 },
 {
 icon: Database,
 title: "Data Science",
 description:
 "End-to-end data mastery for smarter careers. From Python to predictive modeling build your foundation with SwordNex’s expert-led program.",
 },
 {
 icon: Megaphone,
 title: "Digital Marketing",
 description:
 "Marketing in the age of metrics. Learn SEO, SEM, analytics, content, and campaign execution the smart way.",
 },
 {
 icon: FileText,
 title: "Audit, Accounting and Tax",
 description:
 "Professional finance skills for modern businesses. Comprehensive training on audits, taxation, GST, and accounting tools.",
 },
 {
 icon: Users,
 title: "Human Resource Management (HRM)",
 description:
 "Master the people side of business. Training in recruitment, payroll, compliance, and HR software tools.",
 },
 {
 icon: Star,
 title: "Personality Development",
 description:
 "Boost confidence. Sharpen communication. SwordNex empowers you with soft skills for career readiness and personal growth.",
 },
 ],
 features: [
 "Live Interactive Online & In-Person Classes",
 "Project-Based Learning with Real Industry Cases",
 "Comprehensive Career Services & Job Placement Assistance",
 "Corporate Training Packages & Team Development",
 "Direct Access to Industry Mentors & Experts",
 "Flexible Learning Schedules & Self-Paced Options",
 "Industry-Recognized Certifications & Credentials",
 "Alumni Network & Ongoing Professional Support",
 ],
 cta: {
 title: "Ready to advance your career to the next level?",
 subtitle:
 "Explore our comprehensive course catalog and find the perfect program to achieve your professional goals and increase your earning potential.",
 buttonText: "Explore All Programs",
 },
 development: [
 {
 title: "Full-Stack Mastery (MERN/MEAN)",
 desc: "Architect end-to-end modern web applications.",
 rating: 4.9,
 },
 {
 title: "Advanced Frontend Engineering",
 desc: "Craft exceptional user interfaces with React/Vue.",
 rating: 4.8,
 },
 {
 title: "Backend Systems Design (Node/Python)",
 desc: "Build scalable, robust server-side logic.",
 rating: 4.7,
 },
 ],
 mobile: [
 {
 title: "Native iOS Development (Swift)",
 desc: "Create polished applications for the Apple ecosystem.",
 rating: 4.9,
 },
 {
 title: "Native Android Development (Kotlin)",
 desc: "Build performant apps for the Android universe.",
 rating: 4.8,
 },
 {
 title: "Cross-Platform Dev (React Native)",
 desc: "Efficiently develop for both iOS and Android.",
 rating: 4.7,
 },
 ],
 cloud: [
 {
 title: "AWS Solutions Architect Pro",
 desc: "Design and deploy scalable systems on AWS.",
 rating: 4.9,
 },
 {
 title: "Azure Administrator Expert",
 desc: "Master Microsoft Azure infrastructure management.",
 rating: 4.8,
 },
 {
 title: "Google Cloud Professional Architect",
 desc: "Achieve top-tier GCP certification.",
 rating: 4.7,
 },
 ],
 ai: [
 {
 title: "Machine Learning Engineering",
 desc: "Implement production-ready ML models.",
 rating: 4.9,
 },
 {
 title: "Data Science & Analytics (Power BI)",
 desc: "Extract insights and drive decisions with data.",
 rating: 4.8,
 },
 {
 title: "Deep Learning Specialization",
 desc: "Explore neural networks and advanced AI techniques.",
 rating: 4.7,
 },
 ],
 careerStats: [
 { label: "Expert Instructors", value: "Industry Veterans" },
 { label: "Placement Rate", value: "92% Success" },
 { label: "Hiring Partners", value: "150+ Companies" },
 { label: "Avg. Salary Hike", value: "45% Post-Program" },
 ],
 },

 {
 id: 5,
 slug: "hr-consulting",
 icon: Briefcase,
 title: "HR Consulting Services",
 shortDescription:
 "People. Process. Performance Powered by SwordNex HR Consulting.",
 rating: "4.6",
 category: "consulting",
 hero: {
 title: "HR Consulting Services",
 subtitle:
 "People. Process. Performance Powered by SwordNex HR Consulting.",
 image: hr2,
 },
 overview: {
 title: "Modern HR Solutions for Dynamic Organizations",
 description:
 "Our HR consulting services are strategically designed to address the complex challenges of today's evolving workplace.",
 },
 subServices: [
 {
 icon: UserCheck,
 title: "Talent Acquisition & Recruitment",
 description:
 "Find. Evaluate. Hire Smarter. SwordNex connects you with top talent through targeted sourcing, screening, and onboarding strategies.",
 },
 {
 icon: GraduationCap,
 title: "Training & Development",
 description:
 "Grow skills. Grow leaders. SwordNex designs custom training programs to upskill teams and build future-ready professionals.",
 },
 {
 icon: Award,
 title: "Payroll & Compensation Management",
 description:
 "Accurate pay. Hassle-free compliance. We handle end-to-end payroll, benefits, and compensation planning so you can focus on your people.",
 },
 {
 icon: Building,
 title: "Organizational Design & Career Development",
 description:
 "Structure for success. Growth by design. We help define org structures, roles, and career paths that align with business goals and employee aspirations.",
 },
 {
 icon: Users,
 title: "Out Placements",
 description:
 "Support beyond employment. SwordNex provides structured outplacement programs to help exiting employees transition with dignity and direction.",
 },
 {
 icon: Rocket,
 title: "Campus to Corporate Programs",
 description:
 "Bridge the gap from classroom to boardroom. Our curated programs prepare fresh graduates for real-world corporate environments with soft skills and domain training.",
 },
 ],
 features: [
 "Comprehensive HR Audits & Compliance Assessment",
 "Competitive Compensation & Benefits Analysis",
 "Employee Engagement Surveys & Action Planning",
 "Leadership Development & Succession Planning",
 "Change Management & Organizational Transformation",
 "HR Technology Implementation & Optimization",
 "Diversity, Equity & Inclusion Program Development",
 "Remote Work & Hybrid Workplace Strategy",
 ],
 cta: {
 title: "Ready to transform your organization's potential?",
 subtitle:
 "Let's collaborate to build a thriving, productive workforce that drives your business forward.",
 buttonText: "Schedule HR Consultation",
 },
 },
];
