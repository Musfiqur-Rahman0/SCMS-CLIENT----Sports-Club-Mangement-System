import React from "react";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Mail,
  Phone,
  MessageSquare,
  HelpCircle,
  MapPin,
  Clock,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import Swal from "sweetalert2";

const FAQS = [
  {
    q: "How do I book a court?",
    a: "Go to Courts → pick a date & slot → confirm payment. You’ll get an email & dashboard confirmation.",
    tag: "Booking",
  },
  {
    q: "Can I reschedule or cancel a booking?",
    a: "Yes. From My Bookings you can reschedule within policy (typically 12–24 hours before the slot).",
    tag: "Booking",
  },
  {
    q: "What membership plans are available?",
    a: "Monthly, Quarterly, and Yearly plans with student & family discounts. See Membership page for details.",
    tag: "Membership",
  },
  {
    q: "How do I renew my membership?",
    a: "From your dashboard → Membership → Renew. You can also enable auto‑renew.",
    tag: "Membership",
  },
  {
    q: "Which payment methods do you accept?",
    a: "We accept cards, mobile wallets, and bank transfers (via our secure gateway).",
    tag: "Payments",
  },
  {
    q: "How can I contact a coach?",
    a: "Open Coaches page → select a coach → request a session or send a message from their profile.",
    tag: "Coaching",
  },
];

const Support = () => {
  const [query, setQuery] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const filteredFaqs = useMemo(() => {
    if (!query.trim()) return FAQS;
    const q = query.toLowerCase();
    return FAQS.filter(
      ({ q: Q, a }) =>
        Q.toLowerCase().includes(q) || a.toLowerCase().includes(q)
    );
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      Swal.fire({
        title: "Missing fields",
        description: "Please fill name, email and message.",
        icon: "error",
      });
      return;
    }
    // Simulate success (hook up to your API here)
    Swal.fire({
      title: "Message sent ✅",
      description: "We’ll get back to you shortly.",
      icon: "success",
    });
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  // Motion helpers
  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.5 },
  };

  const supports = [
    {
      icon: MessageSquare,
      title: "FAQs",
      desc: "Browse common questions by topic.",
      action: () => {
        const el = document.getElementById("faq");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      icon: Mail,
      title: "Email Us",
      desc: "Use the form below to reach our team.",
      action: () => {
        const el = document.getElementById("contact");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      icon: Phone,
      title: "Call Support",
      desc: "+880 1234‑567890 (10am–6pm)",
      action: () => window.open("tel:+8801794213788"),
    },
  ];

  return (
    <div className="min-h-[90vh] bg-gradient-to-b space-y-12 ">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <motion.div
          {...fadeUp}
          className="mx-auto max-w-6xl px-6 pt-16 pb-10 text-center"
        >
          {/* <Badge className="mb-3">Support</Badge> */}
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Need Help? We’re Here for You
          </h1>
          <p className="mt-3  md:text-lg">
            Find quick answers, search our FAQs, or send us a message. Our team
            typically responds within business hours.
          </p>

          {/* Search */}
          <div className="mt-6 flex w-full justify-center">
            <div className="relative w-full max-w-2xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 " />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search FAQs, e.g. ‘booking’, ‘renew’…"
                className="pl-10  border-slate-700 "
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Quick options */}
      <section className="mx-auto max-w-6xl px-6 grid gap-6 md:grid-cols-3">
        {supports.map((item, i) => (
          <motion.div
            key={i}
            {...fadeUp}
            transition={{ delay: 0.05 * i, duration: 0.5 }}
          >
            <Card className="group h-full   backdrop-blur py-5 flex flex-col justify-between">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5 opacity-80" />
                  <CardTitle>{item.title}</CardTitle>
                </div>
                <CardDescription className="text-gray-500">
                  {item.desc}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={item.action}
                  className="w-full rounded-full transition-transform group-hover:scale-[1.02]"
                >
                  Open
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-6 mt-12">
        <motion.div {...fadeUp}>
          <h2 className="text-2xl md:text-3xl font-bold">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 mt-1">
            Click a question to view the answer.
          </p>
        </motion.div>

        <motion.div {...fadeUp} className="mt-4">
          <Accordion type="single" collapsible className=" rounded-xl border ">
            {filteredFaqs.map((item, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger className="px-4 hover:no-underline">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 opacity-70" />
                    <span className="text-left">{item.q}</span>
                    <Badge
                      variant="secondary"
                      className="ml-2 hidden md:inline-block"
                    >
                      {item.tag}
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="mx-auto max-w-6xl px-6 mt-12 pb-16 grid gap-8 md:grid-cols-[1.2fr_0.8fr]"
      >
        <motion.div {...fadeUp}>
          <Card className="  backdrop-blur py-5">
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
              <CardDescription>
                Fill out the form and we’ll reply by email.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid gap-2 md:grid-cols-2">
                  <Input
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="   "
                  />
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className=""
                  />
                </div>
                <Input
                  placeholder="Subject (optional)"
                  value={form.subject}
                  onChange={(e) =>
                    setForm({ ...form, subject: e.target.value })
                  }
                  className=""
                />
                <Textarea
                  placeholder="Write your message..."
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className="min-h-[130px] "
                />
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs text-slate-400">
                    By submitting, you agree to our terms and privacy policy.
                  </p>
                  <Button type="submit">Send message</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div {...fadeUp}>
          <Card className="h-full  backdrop-blur py-5">
            <CardHeader>
              <CardTitle>Support hours & location</CardTitle>
              <CardDescription>Reach us during working hours.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 ">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 mt-0.5" />
                <div>
                  <p className="font-medium ">Hours</p>
                  <p>Sat–Thu: 10:00 AM – 6:00 PM</p>
                  <p>Friday: Closed</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5" />
                <div>
                  <p className="font-medium ">Club Address</p>
                  <p>123 Sports Avenue, Rangpur, Bangladesh</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 mt-0.5" />
                <div>
                  <p className="font-medium ">Phone</p>
                  <p>+880 1234‑567890</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 mt-0.5" />
                <div>
                  <p className="font-medium ">Email</p>
                  <p>support@sportsclub.example</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  );
};

export default Support;
