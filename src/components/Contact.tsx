import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FadeInText } from "@/components/ui/fade-in-section";
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
    fullName: "",
    phone: "",
    eventType: "",
    eventDate: "",
    location: "",
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
    const { fullName, phone, eventType, eventDate, location, message } = formData;
    const phoneRegex =
      /^\+?\d{1,3}[\s-]?\(?\d{1,4}?\)?[\s-]?\d{1,4}[\s-]?\d{1,4}$/;

    if (!fullName.trim()) {
      toast({
        title: "Missing Full Name",
        description: "Please enter your full name.",
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

    if (!eventDate.trim()) {
      toast({
        title: "Event Date Required",
        description: "Please select your event date.",
        variant: "destructive",
      });
      return false;
    }

    if (!location.trim()) {
      toast({
        title: "Location Required",
        description: "Please enter your event location.",
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

  // Handle form submission - redirect to WhatsApp
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Create WhatsApp message with better formatting
    const { fullName, phone, eventType, eventDate, location, message } = formData;
    const whatsappMessage = `*New Customer Enquiry*

*Name:* ${fullName}
*Phone:* ${phone}
*Service:* ${eventType}
*Date:* ${eventDate}
*Location:* ${location}

*Message:* ${message}`;
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // WhatsApp API URL with the specified phone number
    const whatsappUrl = `https://wa.me/917003216321?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');

    setIsSubmitting(false);

    // Reset form after successful submission
    setFormData({
      fullName: "",
      phone: "",
      eventType: "",
      eventDate: "",
      location: "",
      message: "",
    });

    // Show success toast
    toast({
      title: "Redirecting to WhatsApp 📱",
      description: "You're being redirected to WhatsApp to send your message.",
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
        <div className="text-center mb-16">
          <FadeInText 
            as="span" 
            className="text-sm font-medium text-black tracking-wide uppercase font-sans"
            delay={0.1}
          >
            Contact Us
          </FadeInText>
          <FadeInText 
            as="h2" 
            className="text-4xl md:text-5xl font-serif text-gray-800 mt-2 mb-6"
            delay={0.3}
          >
            Let's Capture Your
            <span className="text-golden-600 italic block">
              Love Story
            </span>
          </FadeInText>
          <FadeInText 
            as="p" 
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-sans"
            delay={0.5}
          >
            Ready to preserve your special moments? Get in touch with us today
            and let's create timeless memories together.
          </FadeInText>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="animate-fade-in-up">
            <div className="bg-white rounded-lg p-8 shadow-lg border border-gray-100">
              <FadeInText 
                as="h3" 
                className="text-2xl font-serif font-semibold text-gray-800 mb-6 tracking-wide"
                delay={0.2}
              >
                Send Us a Message
              </FadeInText>

              <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                {/* Full Name Field */}
                <div>
                  <Label htmlFor="fullName" className="text-gray-700 font-medium font-sans">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="mt-2 border-gray-200 focus:border-blush-400 focus:ring-blush-400 font-['EB_Garamond']"
                    required
                  />
                </div>

                {/* Phone Number */}
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
                    placeholder="+91 70032 16321"
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

                {/* Event Date */}
                <div>
                  <Label htmlFor="eventDate" className="text-gray-700 font-medium font-sans">
                    Event Date
                  </Label>
                  <Input
                    id="eventDate"
                    name="eventDate"
                    type="date"
                    value={formData.eventDate}
                    onChange={handleChange}
                    className="mt-2 border-gray-200 focus:border-blush-400 focus:ring-blush-400"
                    required
                  />
                </div>

                {/* Location */}
                <div>
                  <Label htmlFor="location" className="text-gray-700 font-medium font-sans">
                    Event Location
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter your event location (e.g., Hotel Name, Venue Name)"
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
                    placeholder="Share your vision, style preferences, and any special requirements..."
                    rows={4}
                    className="mt-2 border-gray-200 focus:border-blush-400 focus:ring-blush-400"
                    required
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-golden-500 hover:bg-golden-600 text-black py-3 text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-sans"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? "Redirecting..." : "Send Message via WhatsApp"}
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
                    <Link to="tel:+917003216321" className="hover:text-blush-400">
                      +91 70032 16321
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
                    <Link to="mailto:Hashtagchobi@gmail.com" className="hover:text-blush-400">
                    hashtagchobi@gmail.com
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
                      103/1A Raja Dinendra Street
                      <br />
                      Kolkata - 700006
                    </address>
                  </div>
                </div>
              </div>

              {/* Free Consultation CTA */}
              <div className="bg-gradient-to-br from-blush-500 to-golden-500 rounded-lg p-8 text-black text-center">
                <h3 className="text-2xl font-serif font-semibold mb-4 tracking-wide">Free Consultation</h3>
                <p className="mb-6 opacity-90">
                  Schedule a complimentary 30-minute consultation to discuss your
                  event vision and how we can bring it to life.
                </p>
                <Link to="tel:+917003216321" aria-label="Call Us Now">
                  <Button
                    size="lg"
                    className="bg-golden-500 hover:bg-golden-600 text-black px-6 py-2 rounded-full font-medium font-sans"
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
