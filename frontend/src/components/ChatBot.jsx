import React, { useState, useEffect, useRef } from 'react';
import API_BASE_URL from "../config/apiConfig";

const ChatBot = () => {
 const [isOpen, setIsOpen] = useState(false);
 const [messages, setMessages] = useState([]);
 const [inputValue, setInputValue] = useState("");
 const [isTyping, setIsTyping] = useState(false);
 const [currentStep, setCurrentStep] = useState(0);
 const [leadData, setLeadData] = useState({
 firstName: "",
 email: "",
 contact: "",
 service: "",
 serviceDescription: "",
 budget: ""
 });
 const [isLeadCollected, setIsLeadCollected] = useState(false);
 const [showCallOptions, setShowCallOptions] = useState(false);
 const messagesEndRef = useRef(null);

 // Phone number for callback
 const CALL_NUMBER = "8610404930";

 // Lead collection flow configuration
 const leadFlow = [
 {
 step: 0,
 botMessage: "Hello! 👋 I'm your SwordNex assistant. Before we begin, may I know your name?",
 field: "firstName",
 placeholder: "Enter your name...",
 validate: (value) => value.trim().length >= 2,
 error: "Please enter a valid name (at least 2 characters).",
 inputType: "text"
 },
 {
 step: 1,
 botMessage: (data) => `Nice to meet you, ${data.firstName}! 😊 What's your email address?`,
 field: "email",
 placeholder: "Enter your email...",
 validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
 error: "Please enter a valid email address.",
 inputType: "email"
 },
 {
 step: 2,
 botMessage: "Great! What's your contact number?",
 field: "contact",
 placeholder: "Enter your phone number...",
 validate: (value) => /^[\d\s\-+()]{10,}$/.test(value.replace(/\s/g, '')),
 error: "Please enter a valid phone number (at least 10 digits).",
 inputType: "tel"
 },
 {
 step: 3,
 botMessage: `Perfect! 🎯 Which service are you interested in?\n\n1️⃣ Application Solutions\n2️⃣ Digital Media\n3️⃣ Professional Development\n4️⃣ Brand & Experience Strategy\n5️⃣ IT Infrastructure\n6️⃣ HR Consulting Services\n7️⃣ SaaS Customization\n8️⃣ SwordNex Billing\n9️⃣ SwordNex Payroll\n🔟 SwordNex HTM\n\nType the number or service name.`,
 field: "service",
 placeholder: "Select service (1-10)...",
 validate: (value) => value.trim().length >= 1,
 error: "Please select a service.",
 inputType: "text"
 },
 {
 step: 4,
 botMessage: (data) => `Great choice! 📝 Please describe your requirements for ${data.service}.\n\nTell us about:\n• What you're looking to achieve\n• Any specific features needed\n• Timeline expectations`,
 field: "serviceDescription",
 placeholder: "Describe your project requirements...",
 validate: (value) => value.trim().length >= 10,
 error: "Please provide more details (at least 10 characters).",
 inputType: "textarea"
 },
 {
 step: 5,
 botMessage: "Almost done! 💰 What's your estimated budget for this project?\n\n(Please enter the amount in INR, e.g., '50000' or '1 lakh')",
 field: "budget",
 placeholder: "Enter your budget (e.g., 50000)...",
 validate: (value) => value.trim().length >= 1,
 error: "Please provide your budget estimate.",
 inputType: "text"
 }
 ];

 // Service mapping
 const serviceMap = {
 "1": "Application Solutions",
 "2": "Digital Media",
 "3": "Professional Development",
 "4": "Brand & Experience Strategy",
 "5": "IT Infrastructure",
 "6": "HR Consulting Services",
 "7": "SaaS Customization",
 "8": "SwordNex Billing",
 "9": "SwordNex Payroll",
 "10": "SwordNex HTM"
 };

 // Initialize chat when opened
 useEffect(() => {
 if (isOpen && messages.length === 0) {
 addBotMessage(leadFlow[0].botMessage, 500);
 }
 }, [isOpen]);

 // Auto-scroll to bottom when messages change
 useEffect(() => {
 messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
 }, [messages]);

 const addBotMessage = (text, delay = 1200) => {
 setIsTyping(true);
 setTimeout(() => {
 const botMessage = {
 text: typeof text === 'function' ? text(leadData) : text,
 sender: "bot",
 timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
 };
 setMessages(prev => [...prev, botMessage]);
 setIsTyping(false);
 }, delay);
 };

 const addUserMessage = (text) => {
 const userMessage = {
 text,
 sender: "user",
 timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
 };
 setMessages(prev => [...prev, userMessage]);
 };

 const handleSend = () => {
 if (inputValue.trim() === "" || isTyping) return;

 const userInput = inputValue.trim();
 addUserMessage(userInput);
 setInputValue("");

 if (!isLeadCollected) {
 processLeadCollection(userInput);
 } else {
 processGeneralQuery(userInput);
 }
 };

 const processLeadCollection = (input) => {
 const currentFlowStep = leadFlow[currentStep];

 // Validate input
 if (!currentFlowStep.validate(input)) {
 addBotMessage(currentFlowStep.error);
 return;
 }

 // Process and map values
 let processedValue = input;
 if (currentStep === 3) {
 processedValue = serviceMap[input] || input;
 }

 // Update lead data
 const updatedLeadData = {
 ...leadData,
 [currentFlowStep.field]: processedValue
 };
 setLeadData(updatedLeadData);

 // Move to next step or complete
 const nextStep = currentStep + 1;

 if (nextStep < leadFlow.length) {
 setCurrentStep(nextStep);
 const nextMessage = leadFlow[nextStep].botMessage;
 addBotMessage(typeof nextMessage === 'function' ? nextMessage(updatedLeadData) : nextMessage);
 } else {
 // Lead collection complete
 completeLeadCollection(updatedLeadData);
 }
 };

 const completeLeadCollection = (finalData) => {
 setIsLeadCollected(true);
 setCurrentStep(-1);

 const summaryMessage = `🎉 Thank you so much, ${finalData.firstName}!

Here's a summary of your inquiry:

👤 Name: ${finalData.firstName}
📧 Email: ${finalData.email}
📱 Contact: ${finalData.contact}
🎯 Service: ${finalData.service}
📝 Requirements: ${finalData.serviceDescription}
💰 Budget: ₹${finalData.budget}

We've received your information and our team is excited to work with you!

Would you like to connect with us right now? 📞`;

 addBotMessage(summaryMessage);

 // Show call options after summary
 setTimeout(() => {
 setShowCallOptions(true);
 }, 1500);

 // Submit lead data to backend
 submitLeadToBackend(finalData);
 };

 const submitLeadToBackend = async (data) => {
 try {
 const response = await fetch(`${API_BASE_URL}/api/chatbot-leads`, {
 method: "POST",
 headers: {
 "Content-Type": "application/json"
 },
 body: JSON.stringify({
 ...data,
 status: 'New',
 date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
 })
 });

 if (!response.ok) {
 throw new Error('Failed to save lead to database');
 }


 } catch (error) {
 console.error('Error saving chatbot lead:', error.message);
 }
 };

 const handleCallOption = (option) => {
 setShowCallOptions(false);

 if (option === 'now') {
 addUserMessage("Yes, call me now! 📞");

 setTimeout(() => {
 addBotMessage(`Great! 🎉 Connecting you to our team now...\n\nDialing: +91 ${CALL_NUMBER}\n\nIf the call doesn't start automatically, please tap the number above or dial manually.`);

 // Initiate phone call
 setTimeout(() => {
 window.location.href = `tel:+91${CALL_NUMBER}`;
 }, 1500);
 }, 800);

 } else if (option === 'later') {
 addUserMessage("I'll connect later");

 setTimeout(() => {
 addBotMessage(`No problem, ${leadData.firstName}! 😊\n\nOur team will reach out to you within 24 hours at ${leadData.contact}.\n\nIn the meantime, feel free to:\n• Browse our website\n• Ask me any questions\n• Call us anytime at +91 ${CALL_NUMBER}\n\nIs there anything else I can help you with?`);
 }, 800);
 }
 };

 const processGeneralQuery = (input) => {
 const responses = {
 "hello": "Hi there! How can we assist you with our services today?",
 "hi": "Hello! Welcome to SwordNex. How can I help you?",
 "services": "We offer several services:\n1. Application Solutions\n2. Digital Media\n3. Professional Development\n4. Brand & Experience Strategy\n5. IT Infrastructure\n6. HR Consulting Services\nWhich one interests you?",
 "products": "We have three main products:\n1. SwordNex Billing - GST-ready billing & inventory\n2. SwordNex Payroll - Automated payroll & compliance\n3. SwordNex HTM - Talent acquisition & workforce management\nWould you like more details about any?",
 "billing": "SwordNex Billing is our GST-ready solution for retail and distribution. It includes:\n- POS & invoicing\n- Multi-branch stock management\n- Real-time reports\nWould you like to see a demo?",
 "payroll": "SwordNex Payroll automates:\n- Salary processing\n- PF/ESI compliance\n- Employee self-service\n- Monthly summaries\nIt's perfect for growing teams.",
 "contact": `You can:\n1. Call us at +91 ${CALL_NUMBER}\n2. Visit our contact page\n3. Email us at contact@swordnex.com\nWe typically respond within one business day!`,
 "pricing": "Our pricing varies based on project scope. Let's discuss your needs in a free consultation to provide an accurate quote. Would you like to schedule one?",
 "demo": "We'd be happy to arrange a demo! Please book a free consultation and mention you'd like a product demo in the form.",
 "support": `For support, you can:\n1. Visit our support page\n2. Email support@swordnex.com\n3. Call us at +91 ${CALL_NUMBER}\nOur team is available 24/7.`,
 "saas": "Our SaaS Customization service includes:\n- Custom feature development\n- API integrations\n- White-label solutions\n- Scalable architecture\nWould you like to discuss your requirements?",
 "call": `Sure! You can reach us at:\n📞 +91 ${CALL_NUMBER}\n\nOr would you like us to call you?`,
 "default": "Thanks for your message! Here are some things I can help with:\n- Our services and products\n- Pricing information\n- Booking a consultation\n- Support options\nWhat would you like to know more about?"
 };

 const inputLower = input.toLowerCase();
 let botResponse = responses.default;

 if (inputLower.includes("hello") || inputLower.includes("hi") || inputLower.includes("hey")) {
 botResponse = responses.hello;
 } else if (inputLower.includes("service") || inputLower.includes("offer")) {
 botResponse = responses.services;
 } else if (inputLower.includes("product") || inputLower.includes("solution")) {
 botResponse = responses.products;
 } else if (inputLower.includes("bill") || inputLower.includes("inventory")) {
 botResponse = responses.billing;
 } else if (inputLower.includes("payroll") || inputLower.includes("salary")) {
 botResponse = responses.payroll;
 } else if (inputLower.includes("contact") || inputLower.includes("reach") || inputLower.includes("email")) {
 botResponse = responses.contact;
 } else if (inputLower.includes("price") || inputLower.includes("cost") || inputLower.includes("quote")) {
 botResponse = responses.pricing;
 } else if (inputLower.includes("demo") || inputLower.includes("trial")) {
 botResponse = responses.demo;
 } else if (inputLower.includes("support") || inputLower.includes("help")) {
 botResponse = responses.support;
 } else if (inputLower.includes("saas") || inputLower.includes("custom")) {
 botResponse = responses.saas;
 } else if (inputLower.includes("call") || inputLower.includes("phone")) {
 botResponse = responses.call;
 // Show call options again
 setTimeout(() => setShowCallOptions(true), 1500);
 } else if (inputLower.includes("thank")) {
 botResponse = `You're welcome, ${leadData.firstName}! 😊 Is there anything else I can help you with?`;
 }

 addBotMessage(botResponse);
 };

 const handleKeyPress = (e) => {
 if (e.key === "Enter" && !e.shiftKey) {
 e.preventDefault();
 handleSend();
 }
 };

 const resetChat = () => {
 setMessages([]);
 setCurrentStep(0);
 setLeadData({
 firstName: "",
 email: "",
 contact: "",
 service: "",
 serviceDescription: "",
 budget: ""
 });
 setIsLeadCollected(false);
 setShowCallOptions(false);
 setTimeout(() => {
 addBotMessage(leadFlow[0].botMessage, 500);
 }, 100);
 };

 // Get current placeholder
 const getPlaceholder = () => {
 if (isLeadCollected) return "Type your message...";
 return leadFlow[currentStep]?.placeholder || "Type your message...";
 };

 // Get input type
 const getInputType = () => {
 if (isLeadCollected) return "text";
 return leadFlow[currentStep]?.inputType || "text";
 };

 // Progress percentage
 const progressPercent = isLeadCollected ? 100 : (currentStep / leadFlow.length) * 100;

 return (
 <div className="fixed bottom-6 right-6 z-50">
 {/* Chat Button */}
 <button
 onClick={() => setIsOpen(!isOpen)}
 className="w-16 h-16 rounded-full bg-primary shadow-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center text-white relative group"
 aria-label="Chat with us"
 >
 {isOpen ? (
 <span className="material-icons-round text-3xl">close</span>
 ) : (
 <>
 <span className="material-icons-round text-3xl">chat</span>
 <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
 1
 </span>
 {/* Tooltip */}
 <span className="absolute right-full mr-3 px-3 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
 Chat with us! 💬
 </span>
 </>
 )}
 </button>

 {/* Chat Window */}
 {isOpen && (
 <div className="absolute bottom-20 right-0 w-96 bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden flex flex-col border border-gray-200 dark:border-gray-700">
 {/* Header */}
 <div className="bg-primary text-white p-4 flex items-center justify-between">
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
 <span className="material-icons-round">support_agent</span>
 </div>
 <div>
 <h3 className="font-bold text-sm">SwordNex Assistant</h3>
 <div className="flex items-center gap-1">
 <span className={`w-2 h-2 rounded-full ${isTyping ? 'bg-yellow-400' : 'bg-green-400'}`}></span>
 <p className="text-xs opacity-80">{isTyping ? "Typing..." : "Online"}</p>
 </div>
 </div>
 </div>
 <div className="flex items-center gap-2">
 {/* Call Button in Header */}
 <a
 href={`tel:+91${CALL_NUMBER}`}
 className="text-white/70 hover:text-white transition-colors"
 aria-label="Call us"
 title="Call us now"
 >
 <span className="material-icons-round text-xl">phone</span>
 </a>
 <button
 onClick={resetChat}
 className="text-white/70 hover:text-white transition-colors"
 aria-label="Reset chat"
 title="Start new conversation"
 >
 <span className="material-icons-round text-xl">refresh</span>
 </button>
 <button
 onClick={() => setIsOpen(false)}
 className="text-white/70 hover:text-white transition-colors"
 aria-label="Close chat"
 >
 <span className="material-icons-round">close</span>
 </button>
 </div>
 </div>

 {/* Progress Bar */}
 {!isLeadCollected && (
 <div className="px-4 py-2 bg-gray-100 dark:bg-gray-700">
 <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
 <span>Step {currentStep + 1} of {leadFlow.length}</span>
 <span>{Math.round(progressPercent)}%</span>
 </div>
 <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
 <div
 className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
 style={{ width: `${progressPercent}%` }}
 />
 </div>
 </div>
 )}

 {/* Lead Collected Badge */}
 {isLeadCollected && (
 <div className="px-4 py-2 bg-green-50 dark:bg-green-900/30 border-b border-green-100 dark:border-green-800">
 <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
 <span className="material-icons-round text-sm">check_circle</span>
 <span className="text-xs font-medium">Information submitted successfully!</span>
 </div>
 </div>
 )}

 {/* Messages */}
 <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-700" style={{ maxHeight: '350px' }}>
 {messages.map((message, index) => (
 <div
 key={index}
 className={`mb-4 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
 >
 <div
 className={`max-w-[80%] px-4 py-2 rounded-lg ${message.sender === "user"
 ? "bg-primary text-white rounded-br-none"
 : "bg-white dark:bg-gray-600 text-gray-800 dark:text-white rounded-bl-none shadow-sm"
 }`}
 >
 <p className="text-sm whitespace-pre-line">{message.text}</p>
 <p className={`text-xs mt-1 ${message.sender === "user" ? "text-blue-100" : "text-gray-500 dark:text-gray-300"}`}>
 {message.timestamp}
 </p>
 </div>
 </div>
 ))}

 {/* Typing Indicator */}
 {isTyping && (
 <div className="mb-4 flex justify-start">
 <div className="bg-white dark:bg-gray-600 text-gray-800 dark:text-white px-4 py-2 rounded-lg rounded-bl-none max-w-[80%] shadow-sm">
 <div className="flex space-x-1">
 <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
 <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
 <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
 </div>
 </div>
 </div>
 )}

 {/* Call Options */}
 {showCallOptions && !isTyping && (
 <div className="mb-4 flex justify-start">
 <div className="bg-white dark:bg-gray-600 px-4 py-3 rounded-lg rounded-bl-none shadow-sm max-w-[85%]">
 <p className="text-sm text-gray-800 dark:text-white mb-3">
 📞 Would you like to connect with our team?
 </p>
 <div className="flex flex-col gap-2">
 <button
 onClick={() => handleCallOption('now')}
 className="flex items-center justify-center gap-2 py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm transition-colors"
 >
 <span className="material-icons-round text-sm">phone</span>
 Yes, call me now
 </button>
 <button
 onClick={() => handleCallOption('later')}
 className="flex items-center justify-center gap-2 py-2 px-4 bg-gray-200 dark:bg-gray-500 hover:bg-gray-300 dark:hover:bg-gray-400 text-gray-700 dark:text-white rounded-lg text-sm transition-colors"
 >
 <span className="material-icons-round text-sm">schedule</span>
 I'll connect later
 </button>
 </div>
 </div>
 </div>
 )}

 <div ref={messagesEndRef} />
 </div>

 {/* Input Area */}
 <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
 <div className="flex items-center gap-2">
 <input
 type={getInputType()}
 value={inputValue}
 onChange={(e) => setInputValue(e.target.value)}
 onKeyDown={handleKeyPress}
 placeholder={getPlaceholder()}
 className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 border-none rounded-full focus:ring-2 focus:ring-primary focus:outline-none dark:text-white transition-all"
 disabled={isTyping}
 />
 <button
 onClick={handleSend}
 disabled={inputValue.trim() === "" || isTyping}
 className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${inputValue.trim() === "" || isTyping
 ? "bg-gray-200 dark:bg-gray-700 text-gray-400"
 : "bg-primary text-white hover:bg-blue-700 shadow-md transform hover:scale-105"
 }`}
 aria-label="Send message"
 >
 <span className="material-icons-round">send</span>
 </button>
 </div>
 </div>
 </div>
 )}
 </div>
 );
};

export default ChatBot;
