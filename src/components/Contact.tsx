import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Contact = () => {
  const { toast } = useToast();

  // Smooth scroll to target section by ID
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Form state containing all input fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    eventType: "",
    message: "",
  });

  // Loading state for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form input changes for controlled components
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Basic validation with user-friendly toast error messages
  const validateForm = () => {
    const { firstName, lastName, email, phone, eventType, message } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex =
      /^\+?\d{1,3}[\s-]?\(?\d{1,4}?\)?[\s-]?\d{1,4}[\s-]?\d{1,4}$/;

    if (!firstName.trim()) {
      toast({
        title: "Missing First Name",
        description: "Please enter your first name.",
        variant: "destructive",
      });
      return false;
    }

    if (!lastName.trim()) {
      toast({
        title: "Missing Last Name",
        description: "Please enter your last name.",
        variant: "destructive",
      });
      return false;
    }

    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return false;
    }

    if (!phoneRegex.test(phone)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number.",
        variant: "destructive",
      });
      return false;
    }

    if (!eventType.trim()) {
      toast({
        title: "Photography Service Required",
        description: "Please specify the type of photography service you need.",
        variant: "destructive",
      });
      return false;
    }

    if (!message.trim() || message.length < 10) {
      toast({
        title: "Incomplete Message",
        description: "Your message should be at least 10 characters long.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call or backend integration delay
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setIsSubmitting(false);

    // Reset form after successful submission
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      eventType: "",
      message: "",
    });

    // Show success toast
    toast({
      title: "Message Sent ✉️",
      description: "Thank you! We’ll get back to you within 24 hours.",
    });

    // Scroll to hero section after 2 seconds
    setTimeout(() => {
      scrollToSection("hero");
    }, 2000);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-cream-50 to-blush-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <span className="text-sm font-medium text-blush-500 tracking-wide uppercase font-sans">
            Contact Us
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mt-2 mb-6">
            Let's Capture Your
            <span className="text-golden-600 italic block">
              Love Story
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-sans">
            Ready to preserve your special moments? Get in touch with us today
            and let's create timeless memories together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="animate-fade-in-up">
            <div className="bg-white rounded-lg p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-6 tracking-wide">
                Send us a message
              </h3>

              <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                {/* Name Fields */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName" className="text-gray-700 font-medium font-sans">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Your first name"
                      className="mt-2 border-gray-200 focus:border-blush-400 focus:ring-blush-400 font-['EB_Garamond']"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-gray-700 font-medium font-sans">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Your last name"
                      className="mt-2 border-gray-200 focus:border-blush-400 focus:ring-blush-400 font-['EB_Garamond']"
                      required
                    />
                  </div>
                </div>

                {/* Contact Info */}
                <div>
                  <Label htmlFor="email" className="text-gray-700 font-medium font-sans">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="mt-2 border-gray-200 focus:border-blush-400 focus:ring-blush-400 font-['EB_Garamond']"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-gray-700 font-medium font-sans">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                    className="mt-2 border-gray-200 focus:border-blush-400 focus:ring-blush-400"
                    required
                  />
                </div>

                {/* Event Type */}
                <div>
                  <Label htmlFor="eventType" className="text-gray-700 font-medium font-sans">
                    Photography Service
                  </Label>
                  <Input
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    placeholder="Wedding Photography, Engagement Session, Portrait Session, etc."
                    className="mt-2 border-gray-200 focus:border-blush-400 focus:ring-blush-400"
                    required
                  />
                </div>

                {/* Message */}
                <div>
                  <Label htmlFor="message" className="text-gray-700 font-medium font-sans">
                    Tell us about your special day
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Share your vision, wedding date, venue, style preferences, and any special requirements..."
                    rows={4}
                    className="mt-2 border-gray-200 focus:border-blush-400 focus:ring-blush-400"
                    required
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-blush-500 hover:bg-blush-600 text-white py-3 text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-sans"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <div className="space-y-8">
              {/* Phone Info */}
              <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blush-100 rounded-full flex items-center justify-center mr-4">
                    <Phone className="w-6 h-6 text-blush-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 font-sans">Phone</h4>
                    <Link to="tel:+15551234567" className="hover:text-blush-400">
                      +1 (555) 123-4567
                    </Link>
                  </div>
                </div>
              </div>

              {/* Email Info */}
              <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-golden-100 rounded-full flex items-center justify-center mr-4">
                    <Mail className="w-6 h-6 text-golden-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 font-sans">Email</h4>
                    <Link to="mailto:hello@eventory.com" className="hover:text-blush-400">
                      hello@eventory.com
                    </Link>
                  </div>
                </div>
              </div>

              {/* Location Info */}
              <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-cream-200 rounded-full flex items-center justify-center mr-4">
                    <MapPin className="w-6 h-6 text-cream-700" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 font-sans">Location</h4>
                    <address className="not-italic text-gray-600">
                      123 Event Plaza, Suite 456
                      <br />
                      New York, NY 10001
                    </address>
                  </div>
                </div>
              </div>

              {/* Free Consultation CTA */}
              <div className="bg-gradient-to-br from-blush-500 to-golden-500 rounded-lg p-8 text-white text-center">
                <h3 className="text-2xl font-serif font-semibold mb-4 tracking-wide">Free Consultation</h3>
                <p className="mb-6 opacity-90">
                  Schedule a complimentary 30-minute consultation to discuss your
                  event vision and how we can bring it to life.
                </p>
                <Link to="tel:+15551234567" aria-label="Call Us Now">
                  <Button
                    size="lg"
                    className="bg-white text-blush-600 hover:bg-gray-50 px-6 py-2 rounded-full font-medium font-sans"
                  >
                    Call Us Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
