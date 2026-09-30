import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Products from "./pages/Products";
import Testimonials from "./pages/Testimonials";
import Career from "./pages/Career";
import Carrer1 from './pages/career1';
import Contact from "./pages/Contact";
import Carrer2 from './pages/career2';
import Carrer3 from './pages/career3';
import Carrer4 from './pages/career4';
import Carrer5 from './pages/career5';
import Carrer6 from './pages/career6';
import ApplicationDevelopment from './pages/ApplicationDevelopmentService';
import DigitalMedia from './pages/DigitalMediaService';
import ItTraining from './pages/ItTrainingAndSkillDevelopmentService';
import Service4 from './pages/Service4';
import ITInfrastructure from './pages/ITInfrastructureService';
import HRConsulting from './pages/HRConsultingService';
import Job from './pages/Job';
import JobDetails from './pages/JobDetails';
import CourseEnquiryForm, { CourseEnquiryPage } from './components/CourseEnquiryForm';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CookiePolicy from './pages/CookiePolicy';
import GDPRCompliance from './pages/GDPRCompliance';
import TrademarkPolicy from './pages/TM-policy';
import Terms from './pages/Terms';
import IPRComplaints from './pages/IPR-Complaints';
import Security from './pages/Security';
import CareerMain from './pages/CareerMain';
import Application from './pages/Application';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import SupportPage from './pages/SupportPage';
import FAQPage from './pages/FAQPage';
import Workplace from './pages/Workplace';
import Admin from './pages/Admin';
import Events from './pages/Events';
import Adminjobfair from './pages/Adminjobfair';
import SignUp from './components/Auth/SignUp';
import SignIn from './components/Auth/SignIn';
import Vcbewcebwciubekcakbcnhe8fhawh from './pages/Vcbewcebwciubekcakbcnhe8fhawh';
import EventDetailPage from './pages/EventDetailPage';
import EventRegisterPage from './pages/EventRegisterPage';

// import SpecialEvents from './pages/SpecialEvents';
import ChatBot from './components/ChatBot';
// import Ourevent from './pages/Ourevent';
import Workshop from './pages/Workshop';
import WorkshopList from './pages/WorkshopsList';
import WorkshopRegisterPage from './pages/WorkshopRegisterPage';
import HrDashboard from './components/HR/HrDashboard';
import SupportDashboard from './components/Support/SupportDashboard';
import MarketingDashboard from './pages/MarketingDashboard';
import FinanceDashboard from './pages/FinanceDashboard';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
// import AdminEventRegistrations from './pages/AdminEventRegistrations';
// import EventDetailPage from './pages/EventDetail';
import { AuthProvider } from './context/AuthContext';

import UIUXDesignCourseDetail from './pages/CourseDetail/UIUXDesignCourseDetail';
import DataScienceCourseDetail from './pages/CourseDetail/DataScienceCourseDetail';
import AppDevelopmentCourseDetail from './pages/CourseDetail/AppDevelopmentCourseDetail';
import DigitalMarketingCourseDetail from './pages/CourseDetail/DigitalMarketingCourseDetail';
import DataAnalyticsCourseDetail from './pages/CourseDetail/DataAnalyticsCourseDetail';
import FullstackdevopmentCourseDetail from './pages/CourseDetail/FullstackdevopmentCourseDetail';
import AIMLCourseDetail from './pages/CourseDetail/AIMLCourseDetail';
import InternshipProgramDetail from './pages/CourseDetail/InternshipProgramDetail';

import AffiliateLanding from './pages/affiliate/AffiliateLanding';
import AffiliateSignup from './pages/affiliate/AffiliateSignup';
import AffiliateLogin from './pages/affiliate/AffiliateLogin';
import AffiliateDashboard from './pages/affiliate/AffiliateDashboard';
import AffiliateLinks from './pages/affiliate/AffiliateLinks';
import AffiliateCommissions from './pages/affiliate/AffiliateCommissions';
import AffiliatePayouts from './pages/affiliate/AffiliatePayouts';
import AffiliateSettings from './pages/affiliate/AffiliateSettings';
import AffiliateRoute from './components/Affiliate/AffiliateRoute';


// Billing Imports
import BillingLayout from './pages/BillingPages/BillingLayout';
import B_Home from './pages/BillingPages/HomePage/HomePage';
import B_Software from './pages/BillingPages/B_Software/B_Software';
import B_Small_B from './pages/BillingPages/B_Small_B/B_Small_B';
import Free_B from './pages/BillingPages/Free_B/Free_B';
import B_Security from './pages/BillingPages/B_Security/B_Security';
import FullFeature from "./pages/BillingPages/Components/FullFeature/FullFeature";
import FeaturesPage from "./pages/BillingPages/FeaturesPage/FeaturesPage";
import Support from "./pages/BillingPages/Support/Support";
import Help from "./pages/BillingPages/Help/Help";
import WebinarForm from "./pages/BillingPages/WebinarForm/WebinarForm";
import Faq from "./pages/BillingPages/Faq/Faq";
import { BillingFaqData } from "./pages/BillingPages/Faq/BillingFaqData";


// HMS Imports
import HmsLayout from './pages/HMS/HmsLayout';
import HmsHome from "./pages/HMS/HomePage/HomePage";
import HmsFeatures from "./pages/HMS/Features/Features";
import HmsHelp from "./pages/HMS/Help/Help";
import HmsSupport from "./pages/HMS/Support/Support";
import HmsFaq from "./pages/HMS/Faq/Faq";
import HmsWebinarForm from "./pages/HMS/WebinarForm/WebinarForm";
import { HmsFaqData } from "./pages/HMS/Faq/HmsFaqData";
import HmsSoftware from "./pages/HMS/HmsSoftware/HmsSoftware";
import ReservationMgmt from "./pages/HMS/ReservationMgmt/ReservationMgmt";
import CheckIn from "./pages/HMS/CheckIn/CheckIn";
import RoomsTrack from "./pages/HMS/RoomsTrack/RoomsTrack";
import HmsPricing from "./pages/HMS/PricingPage/PricingPage.jsx";


// Payroll Imports
import PayrollLayout from './pages/Payroll/PayrollLayout';
import PRSoftware from './pages/Payroll/PRSoftware/PRSoftware';
import HRSoftware from './pages/Payroll/HRSoftware/HRSoftware';
import PRDescription from './pages/Payroll/PRDescription/PRDescription';
import PaySlip from './pages/Payroll/PaySlip/PaySlip';
import SmallBsns from './pages/Payroll/SmallBsns/SmallBsns';
import FreePR from './pages/Payroll/FreePR/FreePR';
import P_Home from './pages/Payroll/HomePage/Home';
import P_Features from './pages/Payroll/Features/Features';
import P_Contact from './pages/Payroll/Contact/Contact';
import P_Help from './pages/Payroll/Help/Help';
import P_WebinarForm from './pages/Payroll/WebinarForm/WebinarForm';
import P_Faq from './pages/Payroll/Faq/Faq';
import { PRFaqData } from './pages/Payroll/Faq/PRFaqData';
import PR_Pricing from './pages/Payroll/PricingPage/PricingPage.jsx';


// Invoice Imports
import InvoiceLayout from './pages/Invoice/InvoiceLayout';
import I_Home from "./pages/Invoice/LandingPage/MainPage/MainPage";
import Create_Inv from "./pages/Invoice/Create_Inv/Create_Inv";
import Free_Inv from "./pages/Invoice/Free_Inv/Free_Inv";
import Inv_Reports from "./pages/Invoice/Inv_Reports/Inv_Reports";
import WhatIsInv from "./pages/Invoice/Invoice/Invoice";
import I_Support from "./pages/Invoice/Support/Support";
import I_Help from "./pages/Invoice/Help/Help";
import I_Faq from './pages/Invoice/Faq/Faq';
import { InvFaqData } from './pages/Invoice/Faq/InvFaqData';


// Jobsheet Imports
import JobsheetLayout from './pages/Jobsheet/LandingLayout.jsx'
import J_Home from './pages/Jobsheet/HomePage/HomePage.jsx'
import J_FeaturesPage from './pages/Jobsheet/FeaturesPage/FeaturesPage.jsx'
import J_Faq from './pages/Jobsheet/Faq/Faq.jsx'
import { JSFaqData } from './pages/Jobsheet/Faq/JSFaqData.jsx'
import J_Help from './pages/Jobsheet/Help/Help.jsx'
import J_Support from './pages/Jobsheet/Support/Support.jsx'
import J_WebinarForm from './pages/Jobsheet/WebinarForm/WebinarForm.jsx'
import JobsheetSoftware from './pages/Jobsheet/JobsheetSoftware/JobsheetSoftware.jsx'
import JobsheetSecurity from './pages/Jobsheet/JobsheetSecurity/JobsheetSecurity.jsx'
import JobsheetSmallBusiness from './pages/Jobsheet/JobsheetSmallBusiness/JobsheetSmallBusiness.jsx'
import JobsheetAnalytics from './pages/Jobsheet/JobsheetAnalytics/JobsheetAnalytics.jsx'
import JobsheetStatusTracking from './pages/Jobsheet/JobsheetStatusTracking/JobsheetStatusTracking.jsx'


const AppContent = () => {
  const location = useLocation();

  // Routes where specific navigation components should be hidden
  const hideNavbarRoutes = ['/hr-dashboard', '/admin', '/vcbewcebwciubekcakbcnhe8fhawh', '/support-dashboard', '/marketing-dashboard', '/finance-dashboard', '/affiliate', '/products/billing', '/products/hms', '/products/payroll', '/products/invoice', '/products/jobsheet'];
  const hideFooterChatBotRoutes = ['/signin', '/signup', '/hr-dashboard', '/admin', '/vcbewcebwciubekcakbcnhe8fhawh', '/support-dashboard', '/marketing-dashboard', '/finance-dashboard', '/affiliate', '/products/billing', '/products/hms', '/products/payroll', '/products/invoice', '/products/jobsheet'];

  const shouldHideNavbar = hideNavbarRoutes.some(route => location.pathname.startsWith(route));
  const shouldHideFooterChatBot = hideFooterChatBotRoutes.some(route => location.pathname.startsWith(route));

  return (
    <div className="flex flex-col min-h-screen">
      {!shouldHideNavbar && <Navbar />}
      <main className="flex-grow">
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
          <Route path="/vcbewcebwciubekcakbcnhe8fhawh" element={<Vcbewcebwciubekcakbcnhe8fhawh />} />
          <Route path="/events/:id" element={<EventDetailPage />} />
          <Route path="/events/register/:id" element={<EventRegisterPage />} />
          {/* <Route path="/Ourevent" element={<Ourevent />} /> */}
          <Route path="/workshops/:id" element={<Workshop />} />
          <Route path="/Workshopslist" element={<WorkshopList />} />
          <Route path="/workshops/register/:id" element={<WorkshopRegisterPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!shouldHideFooterChatBot && <Footer />}
      {!shouldHideFooterChatBot && <ChatBot />}
    </div>
  );
};

// 1. Create a root route wrapper to hold AuthProvider and ScrollRestoration
import { Outlet, ScrollRestoration, createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminEventRegistrations from './pages/AdminEventRegistrations';
import PricingPage from './pages/BillingPages/PricingPage/PricingPage';
import PricingSection from './pages/Jobsheet/PricingSection/PricingSection.jsx';

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
