/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, Component } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from 'motion/react';
import { Shield, Scale, Briefcase, FileText, CircleCheck as CheckCircle2, Users, Calendar, ArrowRight, Phone, Mail, MapPin, Menu, X, Star, TrendingUp, Clock, Facebook, Twitter, Linkedin, Instagram, ChevronRight, MessageSquare, Award, ExternalLink } from 'lucide-react';
import { cn } from './lib/utils';
import { Lead, Article, ComplianceDeadline, Testimonial, Stat } from './types';

// --- Error Handling ---

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: any;
}

class ErrorBoundary extends (React.Component as any)<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  public static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  public render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
          <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-slate-100 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 mx-auto mb-6">
              <Shield className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Something went wrong</h2>
            <p className="text-slate-600 mb-8">
              We encountered an unexpected error. Please try refreshing the page or contact support if the issue persists.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Compliance', href: '#compliance' },
    { name: 'Insights', href: '#insights' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-300",
      isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-6"
    )}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Shield className="text-white w-6 h-6" />
          </div>
          <span className={cn(
            "text-xl font-bold tracking-tight",
            isScrolled ? "text-slate-900" : "text-white"
          )}>
            Elite CA <span className="text-blue-600">& Associates</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-medium hover:text-blue-600 transition-colors",
                isScrolled ? "text-slate-600" : "text-white/90"
              )}
            >
              {link.name}
            </a>
          ))}
          <button className="bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
            Book Consultation
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-slate-900"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className={isScrolled ? "text-slate-900" : "text-white"} /> : <Menu className={isScrolled ? "text-slate-900" : "text-white"} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl border-t md:hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-slate-600 font-medium hover:text-blue-600"
                >
                  {link.name}
                </a>
              ))}
              <button className="bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold w-full">
                Book Consultation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.2),transparent_50%)]" />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-400/10 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-600/20 px-4 py-2 rounded-full text-blue-400 text-sm font-medium mb-6">
              <Award className="w-4 h-4" />
              <span>Ranked #1 CA Firm for Modern Businesses</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-6">
              Trusted Chartered Accountants for <span className="text-blue-500">Modern Businesses</span>
            </h1>
            <p className="text-lg text-slate-400 mb-8 max-w-xl leading-relaxed">
              Expert taxation, audit, and corporate advisory services designed to help you navigate complex financial landscapes with confidence and precision.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-all flex items-center gap-2 group shadow-xl shadow-blue-600/20">
                Book Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all">
                Get Free Advice
              </button>
            </div>

            <div className="mt-12 flex items-center gap-8 border-t border-white/10 pt-8">
              <div>
                <div className="text-2xl font-bold text-white">15+</div>
                <div className="text-sm text-slate-500 uppercase tracking-wider">Years Exp.</div>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-sm text-slate-500 uppercase tracking-wider">Clients Served</div>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <div className="text-2xl font-bold text-white">ICAI</div>
                <div className="text-sm text-slate-500 uppercase tracking-wider">Certified</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800" 
                alt="Professional CA" 
                className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
            </div>
            
            {/* Floating Stats Card */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-2xl z-20"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="text-green-600 w-6 h-6" />
                </div>
                <div>
                  <div className="text-slate-500 text-xs font-bold uppercase tracking-wider">Success Rate</div>
                  <div className="text-2xl font-bold text-slate-900">99.8%</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <img
                src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Kumar Mangalam Birla"
                className="rounded-3xl shadow-2xl w-full object-cover aspect-[4/5]"
              />
            </motion.div>
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-50 rounded-full -z-10" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-slate-100 rounded-full -z-10" />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">About the Firm</h2>
            <h3 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">
              A Legacy of Trust and Financial Excellence Since 2008
            </h3>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Founded by CA Kumar Mangalam Birla, Elite CA & Associates has grown from a small consultancy to one of the region's most respected firms. We combine traditional values with modern technology to provide unparalleled financial guidance.
            </p>

            <div className="space-y-6 mb-10">
              {[
                { title: "Our Mission", desc: "To empower businesses with transparent and strategic financial solutions." },
                { title: "Our Vision", desc: "To be the global benchmark for excellence in professional accounting services." },
                { title: "Our Values", desc: "Integrity, Precision, and Client-Centric Innovation." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                    <CheckCircle2 className="text-blue-600 w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{item.title}</h4>
                    <p className="text-slate-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md">
                <img
                  src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Kumar Mangalam Birla"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-lg">Kumar Mangalam Birla</div>
                <div className="text-slate-500 text-sm">Founder & Managing Partner</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      icon: <Scale className="w-8 h-8" />,
      title: "Taxation",
      desc: "Comprehensive Income Tax and GST planning, filing, and representation services.",
      items: ["Income Tax Returns", "GST Compliance", "Tax Audit", "International Tax"]
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Audit & Assurance",
      desc: "Independent auditing services to ensure transparency and regulatory compliance.",
      items: ["Statutory Audit", "Internal Audit", "Stock Audit", "Due Diligence"]
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Corporate Advisory",
      desc: "Strategic financial advice for business growth, mergers, and acquisitions.",
      items: ["Business Valuation", "Project Financing", "M&A Advisory", "Startup Setup"]
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Compliance",
      desc: "End-to-end secretarial and regulatory compliance management.",
      items: ["ROC Filings", "FEMA Compliance", "LLP Registration", "Annual Returns"]
    }
  ];

  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">Our Expertise</h2>
          <h3 className="text-4xl font-bold text-slate-900 mb-6">Comprehensive Financial Solutions</h3>
          <p className="text-slate-600">
            We provide a wide range of professional services tailored to meet the unique needs of individuals, startups, and established corporations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-3xl border border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all group"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                {service.icon}
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h4>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                {service.desc}
              </p>
              <ul className="space-y-2 mb-8">
                {service.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-2 text-xs font-medium text-slate-600">
                    <div className="w-1 h-1 bg-blue-600 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
              <button className="text-blue-600 font-bold text-sm flex items-center gap-2 group/btn">
                Learn More
                <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Stats = () => {
  const stats: Stat[] = [
    { label: "Clients Served", value: 500, suffix: "+" },
    { label: "Years Experience", value: 15, suffix: "+" },
    { label: "Successful Filings", value: 10, suffix: "k+" },
    { label: "Satisfaction Rate", value: 99, suffix: "%" }
  ];

  return (
    <section className="py-20 bg-blue-600">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-blue-100 text-sm font-medium uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ComplianceCalendar = () => {
  const [filter, setFilter] = useState<'All' | 'GST' | 'Income Tax' | 'ROC'>('All');
  const [deadlines, setDeadlines] = useState<ComplianceDeadline[]>([
    { title: "GSTR-1 Filing", date: "2026-04-11", category: "GST", description: "Monthly return for outward supplies." },
    { title: "TDS Payment", date: "2026-04-07", category: "Income Tax", description: "Payment for tax deducted in March." },
    { title: "GSTR-3B Filing", date: "2026-04-20", category: "GST", description: "Summary return for GST payment." },
    { title: "ROC Form MGT-7", date: "2026-04-30", category: "ROC", description: "Annual return for companies." },
    { title: "Advance Tax Installment", date: "2026-06-15", category: "Income Tax", description: "First installment for FY 2026-27." }
  ]);

  const filteredDeadlines = filter === 'All' ? deadlines : deadlines.filter(d => d.category === filter);

  return (
    <section id="compliance" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">Stay Compliant</h2>
            <h3 className="text-4xl font-bold text-slate-900 mb-4">Compliance Calendar</h3>
            <p className="text-slate-600">Never miss a deadline. Track upcoming tax and regulatory filings with our interactive calendar.</p>
          </div>
          <div className="flex gap-2 bg-slate-100 p-1.5 rounded-xl overflow-x-auto">
            {['All', 'GST', 'Income Tax', 'ROC'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat as any)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap",
                  filter === cat ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <AnimatePresence mode="popLayout">
            {filteredDeadlines.map((deadline, i) => (
              <motion.div
                key={deadline.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: i * 0.05 }}
                className="group flex flex-col md:flex-row items-start md:items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-white transition-all"
              >
                <div className="flex items-center gap-6 mb-4 md:mb-0">
                  <div className="flex flex-col items-center justify-center w-16 h-16 bg-white rounded-xl border border-slate-200 shadow-sm">
                    <span className="text-xs font-bold text-slate-400 uppercase">{new Date(deadline.date).toLocaleString('default', { month: 'short' })}</span>
                    <span className="text-xl font-bold text-slate-900">{new Date(deadline.date).getDate()}</span>
                  </div>
                  <div>
                    <div className={cn(
                      "inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-1",
                      deadline.category === 'GST' ? "bg-green-100 text-green-700" :
                      deadline.category === 'Income Tax' ? "bg-orange-100 text-orange-700" : "bg-purple-100 text-purple-700"
                    )}>
                      {deadline.category}
                    </div>
                    <h4 className="text-lg font-bold text-slate-900">{deadline.title}</h4>
                    <p className="text-slate-500 text-sm">{deadline.description}</p>
                  </div>
                </div>
                <button className="flex items-center gap-2 text-blue-600 font-bold text-sm bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-all">
                  <Calendar className="w-4 h-4" />
                  Add to Calendar
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials: Testimonial[] = [
    {
      id: "1",
      name: "Amit Sharma",
      profession: "CEO, TechFlow Solutions",
      content: "Elite CA has been instrumental in our growth. Their strategic tax planning saved us millions in the first year alone. Highly professional and responsive.",
      rating: 5
    },
    {
      id: "2",
      name: "Priya Patel",
      profession: "Founder, GreenEarth Retail",
      content: "As a startup, we were lost in GST compliance. Kumar Mangalam Birla and his team simplified everything for us. They are not just accountants, but true business partners.",
      rating: 5
    },
    {
      id: "3",
      name: "Vikram Singh",
      profession: "Director, Global Logistics",
      content: "The audit process was seamless and insightful. Their attention to detail and transparency is what sets them apart from other firms I've worked with.",
      rating: 5
    }
  ];

  return (
    <section className="py-24 bg-slate-900 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-blue-400 uppercase tracking-[0.2em] mb-4">Client Success</h2>
          <h3 className="text-4xl font-bold text-white mb-6">What Our Clients Say</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 p-8 rounded-3xl relative"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="text-slate-300 italic mb-8 leading-relaxed">"{t.content}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-white">{t.name}</div>
                  <div className="text-slate-500 text-xs uppercase tracking-wider">{t.profession}</div>
                </div>
              </div>
              <MessageSquare className="absolute top-8 right-8 w-12 h-12 text-white/5" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Insights = () => {
  const articles: Article[] = [
    {
      title: "New GST Changes for 2026: What You Need to Know",
      excerpt: "The latest council meeting has proposed significant changes to GST rates and compliance procedures...",
      category: "GST Updates",
      author: "CA Kumar Mangalam Birla",
      publishedAt: "2026-03-20",
      imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800",
      content: ""
    },
    {
      title: "Tax Planning Strategies for High Net Worth Individuals",
      excerpt: "Discover how to optimize your global tax liability while remaining fully compliant with local regulations...",
      category: "Tax Planning",
      author: "CA Sneha Gupta",
      publishedAt: "2026-03-15",
      imageUrl: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&q=80&w=800",
      content: ""
    },
    {
      title: "The Future of Digital Auditing and AI in Accounting",
      excerpt: "How artificial intelligence is transforming the way we conduct statutory audits and financial analysis...",
      category: "Insights",
      author: "CA Kumar Mangalam Birla",
      publishedAt: "2026-03-10",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
      content: ""
    }
  ];

  return (
    <section id="insights" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div className="max-w-xl">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">Knowledge Center</h2>
            <h3 className="text-4xl font-bold text-slate-900 mb-4">Latest Insights & Articles</h3>
          </div>
          <button className="hidden md:flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all">
            View All Articles
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative rounded-3xl overflow-hidden mb-6 aspect-[16/10]">
                <img 
                  src={article.imageUrl} 
                  alt={article.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-blue-600">
                  {article.category}
                </div>
              </div>
              <div className="flex items-center gap-4 text-slate-400 text-xs mb-3">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(article.publishedAt).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {article.author}
                </div>
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                {article.title}
              </h4>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">
                {article.excerpt}
              </p>
              <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
                Read More
                <ChevronRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: 'Taxation',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', phone: '', serviceType: 'Taxation', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-100">
          <div className="grid lg:grid-cols-2">
            <div className="p-12 lg:p-20 bg-slate-900 text-white">
              <h2 className="text-sm font-bold text-blue-400 uppercase tracking-[0.2em] mb-4">Contact Us</h2>
              <h3 className="text-4xl font-bold mb-8">Let's Talk to a CA Today</h3>
              <p className="text-slate-400 mb-12">
                Have questions about your taxes or business compliance? Our experts are ready to help you navigate your financial journey.
              </p>

              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-blue-400">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-slate-500 text-xs font-bold uppercase tracking-wider">Call Us</div>
                    <div className="text-lg font-bold">+91 98765 43210</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-blue-400">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-slate-500 text-xs font-bold uppercase tracking-wider">Email Us</div>
                    <div className="text-lg font-bold">contact@eliteca.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-blue-400">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-slate-500 text-xs font-bold uppercase tracking-wider">Visit Us</div>
                    <div className="text-lg font-bold">123 Business Hub, MG Road, Mumbai</div>
                  </div>
                </div>
              </div>

              <div className="mt-16 pt-16 border-t border-white/10">
                <div className="flex gap-4">
                  {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                    <a key={i} href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all">
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-12 lg:p-20">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Full Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Phone Number</label>
                    <input 
                      required
                      type="tel" 
                      placeholder="+91 00000 00000"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Email Address</label>
                  <input 
                    required
                    type="email" 
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Service Required</label>
                  <select 
                    value={formData.serviceType}
                    onChange={(e) => setFormData({...formData, serviceType: e.target.value as any})}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all appearance-none"
                  >
                    <option>Taxation</option>
                    <option>Audit</option>
                    <option>Corporate Advisory</option>
                    <option>Compliance</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Message</label>
                  <textarea 
                    rows={4} 
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all resize-none"
                  />
                </div>
                <button 
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <ArrowRight className="w-5 h-5" />
                </button>
                {isSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-50 text-green-700 rounded-xl text-center font-medium border border-green-100"
                  >
                    Thank you! We'll get back to you shortly.
                  </motion.div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white pt-24 pb-12 border-t border-slate-100">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                <Shield className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-slate-900">Elite CA</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Providing premium financial advisory and compliance services to help businesses thrive in a complex world.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="text-slate-400 hover:text-blue-600 transition-colors">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'About Us', 'Services', 'Compliance', 'Insights', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-500 hover:text-blue-600 text-sm transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">Services</h4>
            <ul className="space-y-4">
              {['Income Tax', 'GST Filing', 'Statutory Audit', 'Company Setup', 'FEMA Advisory'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-500 hover:text-blue-600 text-sm transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">Newsletter</h4>
            <p className="text-slate-500 text-sm mb-4">Get the latest tax updates and financial insights.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Email address"
                className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-600 transition-all text-sm"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700 transition-all">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-slate-400 text-sm">
            © 2026 Elite CA & Associates. All rights reserved.
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-slate-400 hover:text-slate-600 text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-400 hover:text-slate-600 text-sm transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const WhatsAppButton = () => (
  <a 
    href="https://wa.me/919876543210" 
    target="_blank" 
    rel="noopener noreferrer"
    className="fixed bottom-8 right-8 w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-40"
  >
    <MessageSquare className="w-8 h-8" />
    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full animate-bounce">
      Online
    </span>
  </a>
);

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-50 selection:bg-blue-600 selection:text-white font-sans">
        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-blue-600 z-[60] origin-left"
          style={{ scaleX }}
        />

        <Navbar />
        <Hero />
        <About />
        <Services />
        <Stats />
        <ComplianceCalendar />
        <Testimonials />
        <Insights />
        <Contact />
        <Footer />
        <WhatsAppButton />
      </div>
    </ErrorBoundary>
  );
}
