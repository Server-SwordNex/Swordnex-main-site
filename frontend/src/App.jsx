import React, { lazy, Suspense, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { getPageMeta } from './config/pageMeta';
import { Routes, Route, Navigate, useLocation, ScrollRestoration, createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Products = lazy(() => import('./pages/Products'));
const Testimonials = lazy(() => import('./pages/Testimonials'));
const Career = lazy(() => import('./pages/Career'));
const Carrer1 = lazy(() => import('./pages/career1'));
const Contact = lazy(() => import('./pages/Contact'));
const Carrer2 = lazy(() => import('./pages/career2'));
const Carrer3 = lazy(() => import('./pages/career3'));
const Carrer4 = lazy(() => import('./pages/career4'));
const Carrer5 = lazy(() => import('./pages/career5'));
const Carrer6 = lazy(() => import('./pages/career6'));
const ApplicationDevelopment = lazy(() => import('./pages/ApplicationDevelopmentService'));
const DigitalMedia = lazy(() => import('./pages/DigitalMediaService'));
const ItTraining = lazy(() => import('./pages/ItTrainingAndSkillDevelopmentService'));
const Service4 = lazy(() => import('./pages/Service4'));
const ITInfrastructure = lazy(() => import('./pages/ITInfrastructureService'));
const HRConsulting = lazy(() => import('./pages/HRConsultingService'));
const Job = lazy(() => import('./pages/Job'));
const JobDetails = lazy(() => import('./pages/JobDetails'));
const CourseEnquiryPage = lazy(() => import('./components/CourseEnquiryForm').then((m) => ({ default: m.CourseEnquiryPage })));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'));
const GDPRCompliance = lazy(() => import('./pages/GDPRCompliance'));
const TrademarkPolicy = lazy(() => import('./pages/TM-policy'));
const Terms = lazy(() => import('./pages/Terms'));
const IPRComplaints = lazy(() => import('./pages/IPR-Complaints'));
const Security = lazy(() => import('./pages/Security'));
const CareerMain = lazy(() => import('./pages/CareerMain'));
const Application = lazy(() => import('./pages/Application'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const SupportPage = lazy(() => import('./pages/SupportPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const Workplace = lazy(() => import('./pages/Workplace'));
const Admin = lazy(() => import('./pages/Admin'));
const Events = lazy(() => import('./pages/Events'));
const SignIn = lazy(() => import('./components/Auth/SignIn'));
const Vcbewcebwciubekcakbcnhe8fhawh = lazy(() => import('./pages/Vcbewcebwciubekcakbcnhe8fhawh'));
const EventDetailPage = lazy(() => import('./pages/EventDetailPage'));
const EventRegisterPage = lazy(() => import('./pages/EventRegisterPage'));

// import SpecialEvents from './pages/SpecialEvents';
import ChatBot from './components/ChatBot';
// import Ourevent from './pages/Ourevent';
const Workshop = lazy(() => import('./pages/Workshop'));
const WorkshopList = lazy(() => import('./pages/WorkshopsList'));
const WorkshopRegisterPage = lazy(() => import('./pages/WorkshopRegisterPage'));
const HrDashboard = lazy(() => import('./components/HR/HrDashboard'));
const SupportDashboard = lazy(() => import('./components/Support/SupportDashboard'));
const MarketingDashboard = lazy(() => import('./pages/MarketingDashboard'));
const FinanceDashboard = lazy(() => import('./pages/FinanceDashboard'));
import ProtectedRoute from './components/Auth/ProtectedRoute';
// // import EventDetailPage from './pages/EventDetail';
import { AuthProvider } from './context/AuthContext';
import NotFound from './pages/NotFound';

const UIUXDesignCourseDetail = lazy(() => import('./pages/CourseDetail/UIUXDesignCourseDetail'));
const DataScienceCourseDetail = lazy(() => import('./pages/CourseDetail/DataScienceCourseDetail'));
const AppDevelopmentCourseDetail = lazy(() => import('./pages/CourseDetail/AppDevelopmentCourseDetail'));
const DigitalMarketingCourseDetail = lazy(() => import('./pages/CourseDetail/DigitalMarketingCourseDetail'));
const DataAnalyticsCourseDetail = lazy(() => import('./pages/CourseDetail/DataAnalyticsCourseDetail'));
const FullstackdevopmentCourseDetail = lazy(() => import('./pages/CourseDetail/FullstackdevopmentCourseDetail'));
const AIMLCourseDetail = lazy(() => import('./pages/CourseDetail/AIMLCourseDetail'));
const InternshipProgramDetail = lazy(() => import('./pages/CourseDetail/InternshipProgramDetail'));

const AffiliateLanding = lazy(() => import('./pages/affiliate/AffiliateLanding'));
const AffiliateSignup = lazy(() => import('./pages/affiliate/AffiliateSignup'));
const AffiliateLogin = lazy(() => import('./pages/affiliate/AffiliateLogin'));
const AffiliateDashboard = lazy(() => import('./pages/affiliate/AffiliateDashboard'));
const AffiliateLinks = lazy(() => import('./pages/affiliate/AffiliateLinks'));
const AffiliateCommissions = lazy(() => import('./pages/affiliate/AffiliateCommissions'));
const AffiliatePayouts = lazy(() => import('./pages/affiliate/AffiliatePayouts'));
const AffiliateSettings = lazy(() => import('./pages/affiliate/AffiliateSettings'));
import AffiliateRoute from './components/Affiliate/AffiliateRoute';


// Billing Imports
const BillingLayout = lazy(() => import('./pages/BillingPages/BillingLayout'));
const B_Home = lazy(() => import('./pages/BillingPages/HomePage/HomePage'));
const B_Software = lazy(() => import('./pages/BillingPages/B_Software/B_Software'));
const B_Small_B = lazy(() => import('./pages/BillingPages/B_Small_B/B_Small_B'));
const Free_B = lazy(() => import('./pages/BillingPages/Free_B/Free_B'));
const B_Security = lazy(() => import('./pages/BillingPages/B_Security/B_Security'));
const FullFeature = lazy(() => import('./pages/BillingPages/Components/FullFeature/FullFeature'));
const FeaturesPage = lazy(() => import('./pages/BillingPages/FeaturesPage/FeaturesPage'));
const Support = lazy(() => import('./pages/BillingPages/Support/Support'));
const Help = lazy(() => import('./pages/BillingPages/Help/Help'));
const WebinarForm = lazy(() => import('./pages/BillingPages/WebinarForm/WebinarForm'));
const Faq = lazy(() => import('./pages/BillingPages/Faq/Faq'));
import { BillingFaqData } from "./pages/BillingPages/Faq/BillingFaqData";


// HMS Imports
const HmsLayout = lazy(() => import('./pages/HMS/HmsLayout'));
const HmsHome = lazy(() => import('./pages/HMS/HomePage/HomePage'));
const HmsFeatures = lazy(() => import('./pages/HMS/Features/Features'));
const HmsHelp = lazy(() => import('./pages/HMS/Help/Help'));
const HmsSupport = lazy(() => import('./pages/HMS/Support/Support'));
const HmsFaq = lazy(() => import('./pages/HMS/Faq/Faq'));
const HmsWebinarForm = lazy(() => import('./pages/HMS/WebinarForm/WebinarForm'));
import { HmsFaqData } from "./pages/HMS/Faq/HmsFaqData";
const HmsSoftware = lazy(() => import('./pages/HMS/HmsSoftware/HmsSoftware'));
const ReservationMgmt = lazy(() => import('./pages/HMS/ReservationMgmt/ReservationMgmt'));
const CheckIn = lazy(() => import('./pages/HMS/CheckIn/CheckIn'));
const RoomsTrack = lazy(() => import('./pages/HMS/RoomsTrack/RoomsTrack'));
const HmsPricing = lazy(() => import('./pages/HMS/PricingPage/PricingPage.jsx'));


// Payroll Imports
const PayrollLayout = lazy(() => import('./pages/Payroll/PayrollLayout'));
const PRSoftware = lazy(() => import('./pages/Payroll/PRSoftware/PRSoftware'));
const HRSoftware = lazy(() => import('./pages/Payroll/HRSoftware/HRSoftware'));
const PRDescription = lazy(() => import('./pages/Payroll/PRDescription/PRDescription'));
const PaySlip = lazy(() => import('./pages/Payroll/PaySlip/PaySlip'));
const SmallBsns = lazy(() => import('./pages/Payroll/SmallBsns/SmallBsns'));
const FreePR = lazy(() => import('./pages/Payroll/FreePR/FreePR'));
const P_Home = lazy(() => import('./pages/Payroll/HomePage/Home'));
const P_Features = lazy(() => import('./pages/Payroll/Features/Features'));
const P_Contact = lazy(() => import('./pages/Payroll/Contact/Contact'));
const P_Help = lazy(() => import('./pages/Payroll/Help/Help'));
const P_WebinarForm = lazy(() => import('./pages/Payroll/WebinarForm/WebinarForm'));
const P_Faq = lazy(() => import('./pages/Payroll/Faq/Faq'));
import { PRFaqData } from './pages/Payroll/Faq/PRFaqData';
const PR_Pricing = lazy(() => import('./pages/Payroll/PricingPage/PricingPage.jsx'));
const PricingPage = lazy(() => import('./pages/BillingPages/PricingPage/PricingPage'));
const PricingSection = lazy(() => import('./pages/Jobsheet/PricingSection/PricingSection.jsx'));


// Invoice Imports
const InvoiceLayout = lazy(() => import('./pages/Invoice/InvoiceLayout'));
const I_Home = lazy(() => import('./pages/Invoice/LandingPage/MainPage/MainPage'));
const Create_Inv = lazy(() => import('./pages/Invoice/Create_Inv/Create_Inv'));
const Free_Inv = lazy(() => import('./pages/Invoice/Free_Inv/Free_Inv'));
const Inv_Reports = lazy(() => import('./pages/Invoice/Inv_Reports/Inv_Reports'));
const WhatIsInv = lazy(() => import('./pages/Invoice/Invoice/Invoice'));
const I_Support = lazy(() => import('./pages/Invoice/Support/Support'));
const I_Help = lazy(() => import('./pages/Invoice/Help/Help'));
const I_Faq = lazy(() => import('./pages/Invoice/Faq/Faq'));
import { InvFaqData } from './pages/Invoice/Faq/InvFaqData';


// Jobsheet Imports
const JobsheetLayout = lazy(() => import('./pages/Jobsheet/LandingLayout.jsx'));
const J_Home = lazy(() => import('./pages/Jobsheet/HomePage/HomePage.jsx'));
const J_FeaturesPage = lazy(() => import('./pages/Jobsheet/FeaturesPage/FeaturesPage.jsx'));
const J_Faq = lazy(() => import('./pages/Jobsheet/Faq/Faq.jsx'));
import { JSFaqData } from './pages/Jobsheet/Faq/JSFaqData.jsx'
const J_Help = lazy(() => import('./pages/Jobsheet/Help/Help.jsx'));
const J_Support = lazy(() => import('./pages/Jobsheet/Support/Support.jsx'));
const J_WebinarForm = lazy(() => import('./pages/Jobsheet/WebinarForm/WebinarForm.jsx'));
const JobsheetSoftware = lazy(() => import('./pages/Jobsheet/JobsheetSoftware/JobsheetSoftware.jsx'));
const JobsheetSecurity = lazy(() => import('./pages/Jobsheet/JobsheetSecurity/JobsheetSecurity.jsx'));
const JobsheetSmallBusiness = lazy(() => import('./pages/Jobsheet/JobsheetSmallBusiness/JobsheetSmallBusiness.jsx'));
const JobsheetAnalytics = lazy(() => import('./pages/Jobsheet/JobsheetAnalytics/JobsheetAnalytics.jsx'));
const JobsheetStatusTracking = lazy(() => import('./pages/Jobsheet/JobsheetStatusTracking/JobsheetStatusTracking.jsx'));


const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="w-10 h-10 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
  </div>
);

// Keep the static tags in index.html (read by link-preview scrapers) in sync with the route.
const setStaticTag = (selector, attr, value) => {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
};

const AppContent = () => {
  const location = useLocation();
  const meta = getPageMeta(location.pathname);

  useEffect(() => {
    const url = `https://swordnex.com${location.pathname === '/' ? '/' : location.pathname.replace(/\/+$/, '')}`;
    setStaticTag('meta[name="description"]:not([data-rh])', 'content', meta.description);
    setStaticTag('link[rel="canonical"]', 'href', url);
    setStaticTag('meta[property="og:url"]', 'content', url);
  }, [location.pathname, meta.description]);

  // Routes where specific navigation components should be hidden
  const hideNavbarRoutes = ['/hr-dashboard', '/admin', '/vcbewcebwciubekcakbcnhe8fhawh', '/support-dashboard', '/marketing-dashboard', '/finance-dashboard', '/affiliate', '/products/billing', '/products/hms', '/products/payroll', '/products/invoice', '/products/jobsheet'];
  const hideFooterChatBotRoutes = ['/signin', '/signup', '/hr-dashboard', '/admin', '/vcbewcebwciubekcakbcnhe8fhawh', '/support-dashboard', '/marketing-dashboard', '/finance-dashboard', '/affiliate', '/products/billing', '/products/hms', '/products/payroll', '/products/invoice', '/products/jobsheet'];

  const shouldHideNavbar = hideNavbarRoutes.some(route => location.pathname.startsWith(route));
  const shouldHideFooterChatBot = hideFooterChatBotRoutes.some(route => location.pathname.startsWith(route));

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet><title>{meta.title}</title></Helmet>
      {!shouldHideNavbar && <Navbar />}
      <main className="flex-grow">
        <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* ... standard routes ... */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/products" element={<Products />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/career" element={<Career />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/career1" element={<Carrer1 />} />
          <Route path="/career2" element={<Carrer2 />} />
          <Route path="/career3" element={<Carrer3 />} />
          <Route path="/career4" element={<Carrer4 />} />
          <Route path="/career5" element={<Carrer5 />} />
          <Route path="/career6" element={<Carrer6 />} />
          <Route path="services/application-development" element={<ApplicationDevelopment />} />
          <Route path="services/digital-media" element={<DigitalMedia />} />
          <Route path="services/it-training-skill-development" element={<ItTraining />} />
          <Route path="services/it-infrastructure" element={<ITInfrastructure />} />
          <Route path="services/hr-consulting" element={<HRConsulting />} />
          <Route path="services/job" element={<Job />} />
          <Route path="/career/job/:id" element={<JobDetails />} />
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/CookiePolicy" element={<CookiePolicy />} />
          <Route path="/GDPRCompliance" element={<GDPRCompliance />} />
          <Route path="/TM-Policy" element={<TrademarkPolicy />} />
          <Route path="/Terms" element={<Terms />} />
          <Route path="/IPR-Complaints" element={<IPRComplaints />} />
          <Route path="/security" element={<Security />} />
          <Route path="/career-main" element={<CareerMain />} />
          <Route path="/application" element={<Application />} />
          <Route path="/blogpage" element={<BlogPage />} />
          <Route path="/blogpage/:slug" element={<BlogPostPage />} />
          <Route path="/SupportPage" element={<SupportPage />} />
          <Route path="/FAQPage" element={<FAQPage />} />
          <Route path="/Workplace" element={<Workplace />} />
          <Route path='/sitemap' element={<Navigate to="/sitemap.xml" replace />} />
          <Route path='/robots' element={<Navigate to="/robots.txt" replace />} />
          {/* <Route path="/admin-event-registrations/:type?" element={<AdminEventRegistrations />} /> */}

          <Route path="/events" element={<Events />} />
          {/* <Route path="/events" element={<EventDetailPage />} /> */}
          {/* <Route path="/adminjobfair" element={<Adminjobfair />} /> */}
          <Route path="/vcbewcebwciubekcakbcnhe8fhawh" element={<ProtectedRoute allowedRoles={['HR', 'Admin']}><Vcbewcebwciubekcakbcnhe8fhawh /></ProtectedRoute>} />
          <Route path="/events/:id" element={<EventDetailPage />} />
          <Route path="/events/register/:id" element={<EventRegisterPage />} />
          {/* <Route path="/Ourevent" element={<Ourevent />} /> */}
          <Route path="/workshops/:id" element={<Workshop />} />
          <Route path="/Workshopslist" element={<WorkshopList />} />
          <Route path="/workshops/register/:id" element={<WorkshopRegisterPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<Navigate to="/signin" replace />} />
          <Route path="/affiliate" element={<AffiliateLanding />} />
          <Route path="/affiliate/signup" element={<AffiliateSignup />} />
          <Route path="/affiliate/login" element={<AffiliateLogin />} />
          <Route path="/affiliate/dashboard" element={<AffiliateRoute><AffiliateDashboard /></AffiliateRoute>} />
          <Route path="/affiliate/links" element={<AffiliateRoute><AffiliateLinks /></AffiliateRoute>} />
          <Route path="/affiliate/commissions" element={<AffiliateRoute><AffiliateCommissions /></AffiliateRoute>} />
          <Route path="/affiliate/payouts" element={<AffiliateRoute><AffiliatePayouts /></AffiliateRoute>} />
          <Route path="/affiliate/settings" element={<AffiliateRoute><AffiliateSettings /></AffiliateRoute>} />
          <Route path="/admin/:tab?" element={<ProtectedRoute allowedRoles={['Admin']}><Admin /></ProtectedRoute>} />
          <Route path="/hr-dashboard/:tab?" element={<ProtectedRoute allowedRoles={['HR', 'Admin']}><HrDashboard /></ProtectedRoute>} />
          <Route path="/support-dashboard/:tab?" element={<ProtectedRoute allowedRoles={['Support', 'Admin']}><SupportDashboard /></ProtectedRoute>} />
          <Route path="/marketing-dashboard/:tab?" element={<ProtectedRoute allowedRoles={['Marketing', 'Admin']}><MarketingDashboard /></ProtectedRoute>} />
          <Route path="/finance-dashboard/:tab?" element={<ProtectedRoute allowedRoles={['Finance', 'Admin']}><FinanceDashboard /></ProtectedRoute>} />

          <Route path="/course/uiux-design" element={<UIUXDesignCourseDetail />} />
          <Route path="/course/data-science" element={<DataScienceCourseDetail />} />
          <Route path="/course/app-development" element={<AppDevelopmentCourseDetail />} />
          <Route path="/course/digital-marketing" element={<DigitalMarketingCourseDetail />} />
          <Route path="/course/data-analytics" element={<DataAnalyticsCourseDetail />} />
          <Route path="/course/fullstack-development" element={<FullstackdevopmentCourseDetail />} />
          <Route path="/course/ai-ml" element={<AIMLCourseDetail />} />
          <Route path="/course/internship" element={<InternshipProgramDetail />} />
          <Route path="/course/enquiry" element={<CourseEnquiryPage />} />

          {/* Billing Routes */}
          <Route path="/products/billing" element={<BillingLayout />}>
            <Route index element={<B_Home />} />
            <Route path="software" element={<B_Software />} />
            <Route path="small-business" element={<B_Small_B />} />
            <Route path="free-software" element={<Free_B />} />
            <Route path="security" element={<B_Security />} />
            <Route path="features" element={<FeaturesPage />} />
            <Route path="support" element={<Support bgClr="#FFF7C5" />} />
            <Route path="help" element={<Help />} />
            <Route path="webinars" element={<WebinarForm />} />
            <Route path="pricing" element={<PricingPage />} />

            {/* Faq Datas */}
            <Route path='faq' element={<Faq
              title="SwordNex Billing FAQ"
              subtitle="From quick invoice generation to smooth payment tracking, SwordNex Billing simplifies every step of financial management."
              faqs={BillingFaqData}
            />} />
          </Route>

          {/* HMS Routes */}
          <Route path="/products/hms" element={<HmsLayout />}>
            <Route index element={<HmsHome />} />

            <Route path="what-is-hms" element={<HmsSoftware />} />
            <Route path="reservation-management" element={<ReservationMgmt />} />
            <Route path="guest-check-in-sw" element={<CheckIn />} />
            <Route path="rooms-tracking" element={<RoomsTrack />} />

            <Route path="features" element={<HmsFeatures />} />
            <Route path="pricing" element={<HmsPricing />} />
            <Route path="help" element={<HmsHelp />} />
            <Route path="support" element={<HmsSupport bgClr="#F6FFDC" />} />
            <Route path="webinars" element={<HmsWebinarForm />} />
            <Route path="faq" element={<HmsFaq
              title="SwordNex HMS FAQ"
              subtitle="From front desk check-ins to smooth housekeeping workflows, SwordNex HMS simplifies every step of property and guest management."
              faqs={HmsFaqData}
            />} />
          </Route>

          {/* Payroll Routes */}
          <Route path="/products/payroll" element={<PayrollLayout />}>
            <Route index element={<P_Home />} />

            <Route path="payroll-software" element={<PRSoftware />} />
            <Route path="hr-payroll-software" element={<HRSoftware />} />
            <Route path="what-is-payroll" element={<PRDescription />} />
            <Route path="payslip-templates" element={<PaySlip />} />
            <Route path="payroll-for-small-business" element={<SmallBsns />} />
            <Route path="free-payroll-software" element={<FreePR />} />

            <Route path="features" element={<P_Features />} />
            <Route path="pricing" element={<PR_Pricing />} />
            <Route path="support" element={<P_Contact bgClr="#ffefef" />} />
            <Route path="help" element={<P_Help />} />
            <Route path="webinar" element={<P_WebinarForm />} />

            <Route
              path="faq"
              element={
                <P_Faq
                  title="SwordNex Payroll FAQ"
                  subtitle="From automated salary processing to compliant tax filings, SwordNex Payroll simplifies every step of workforce compensation."
                  faqs={PRFaqData}
                />
              }
            />
          </Route>

          {/* Invoice Routes */}
          <Route path="/products/invoice" element={<InvoiceLayout />}>
            <Route index element={<I_Home />} />

            <Route path="what-is-an-inv" element={<WhatIsInv />} />
            <Route path="how-to-create" element={<Create_Inv />} />
            <Route path="reports-and-anlaytics" element={<Inv_Reports />} />
            <Route path="free-services" element={<Free_Inv />} />

            {/* <Route path="features" element={<P_Features />} /> */}
            <Route path="support" element={<I_Support bgClr="#ffefef" />} />
            <Route path="help" element={<I_Help />} />
            {/* <Route path="webinar" element={<P_WebinarForm />} /> */}

            <Route
              path="faq"
              element={
                <I_Faq
                  title="SwordNex Invoice FAQ"
                  subtitle="Learn everything about invoice creation, GST billing, payment tracking, customer management, inventory control, and business reporting with SwordNex Invoice."
                  faqs={InvFaqData}
                />
              }
            />
          </Route>

          {/* Jobsheet Routes */}
          <Route path="/products/jobsheet" element={<JobsheetLayout />}>
            <Route index element={<J_Home />} />
            <Route path="features" element={<J_FeaturesPage />} />
            <Route path="faq" element={<J_Faq title="SwordNex Jobsheet FAQ" subtitle="Find answers to common questions about SwordNex Jobsheet." faqs={JSFaqData} />} />
            <Route path="help" element={<J_Help />} />
            <Route path="pricing" element={<PricingSection />} />
            <Route path="support" element={<J_Support />} />
            <Route path="webinar" element={<J_WebinarForm />} />
            <Route path="software" element={<JobsheetSoftware />} />
            <Route path="security" element={<JobsheetSecurity />} />
            <Route path="small-business" element={<JobsheetSmallBusiness />} />
            <Route path="analytics-and-reports" element={<JobsheetAnalytics />} />
            <Route path="js-status-tracking" element={<JobsheetStatusTracking />} />
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </main>
      {!shouldHideFooterChatBot && <Footer />}
      {!shouldHideFooterChatBot && <ChatBot />}
    </div>
  );
};


const RootLayout = () => {
  return (
    <AuthProvider>
      <ScrollRestoration />
      <AppContent />
    </AuthProvider>
  );
};

// 2. Define the router configuration
const router = createBrowserRouter([
  {
    path: "/*",
    element: <RootLayout />,
  }
]);

const App = () => (
  <RouterProvider router={router} />
);

export default App;
