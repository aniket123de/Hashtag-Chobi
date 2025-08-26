import { useEffect } from "react";
import NewHeader from "@/components/NewHeader";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  return (
    <div className="min-h-screen">
      <NewHeader />
      <section className="py-24 bg-gradient-to-r from-blush-500 via-golden-500 to-blush-600 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full" />
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full" />
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full" />
          <div className="absolute bottom-1/3 left-2/3 w-20 h-20 bg-white rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">
              Privacy Policy
            </h1>
          </div>
        </div>
      </section>

      <section>
        <div className="container mx-auto py-10 px-6 max-w-4xl">
          {/* Title and Intro */}
          <h2 className="text-4xl font-serif text-gray-900 mb-6">
            Privacy Policy
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Last updated: July 5, 2025
          </p>
          <p className="text-lg text-gray-700 mb-8">
            Eventory ("we," "us," or "our") is committed to safeguarding your
            privacy. This Privacy Policy explains how we collect, use, and
            protect your information when you use our services or visit our
            website.
          </p>

          {/* Information Collection */}
          <h3 className="text-3xl font-serif text-gray-900 mt-10 mb-4">
            Information We Collect:
          </h3>
          <p className="text-lg text-gray-700 mb-4">
            We may collect the following types of personal and event-related
            information:
          </p>
          <ul className="list-disc list-inside text-base text-gray-600 space-y-2 mb-8">
            <li>Contact details (name, email, phone number)</li>
            <li>
              Event information (event type, location, guest list, preferences)
            </li>
            <li>Billing and payment details</li>
            <li>Feedback, inquiries, and customer service interactions</li>
            <li>Website usage data via cookies and tracking technologies</li>
          </ul>

          {/* Usage of Information */}
          <h3 className="text-3xl font-serif text-gray-900 mt-10 mb-4">
            Use of Information:
          </h3>
          <p className="text-lg text-gray-700 mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc list-inside text-base text-gray-600 space-y-2 mb-8">
            <li>
              Plan, coordinate, and execute events based on your preferences
            </li>
            <li>Communicate with you about services, updates, and inquiries</li>
            <li>Process transactions and manage billing</li>
            <li>Enhance and personalize your experience</li>
            <li>Improve our website, services, and customer support</li>
            <li>Send promotional and marketing communications (if opted-in)</li>
          </ul>

          {/* Disclosure */}
          <h3 className="text-3xl font-serif text-gray-900 mt-10 mb-4">
            Disclosure of Information:
          </h3>
          <p className="text-lg text-gray-700 mb-4">
            We may share your information in the following situations:
          </p>
          <ul className="list-disc list-inside text-base text-gray-600 space-y-2 mb-8">
            <li>
              With third-party vendors and service providers involved in your
              event
            </li>
            <li>When required by law, regulation, or legal process</li>
            <li>
              In the event of a business transfer, such as a merger or
              acquisition
            </li>
          </ul>

          {/* Security */}
          <h3 className="text-3xl font-serif text-gray-900 mt-10 mb-4">
            Security Measures:
          </h3>
          <p className="text-lg text-gray-700 mb-8">
            We implement appropriate security measures to protect your personal
            data from unauthorized access, loss, or misuse. This includes secure
            data storage, encryption, and staff confidentiality protocols.
          </p>

          {/* Data Retention */}
          <h3 className="text-3xl font-serif text-gray-900 mt-10 mb-4">
            Data Retention:
          </h3>
          <p className="text-lg text-gray-700 mb-8">
            We retain your information only for as long as necessary to provide
            our services and comply with legal obligations. You may request
            deletion of your personal data at any time by contacting us.
          </p>

          {/* Cookies & Tracking */}
          <h3 className="text-3xl font-serif text-gray-900 mt-10 mb-4">
            Cookies & Tracking Technologies:
          </h3>
          <p className="text-lg text-gray-700 mb-8">
            Our website uses cookies and similar technologies to enhance user
            experience, track usage patterns, and personalize content. You can
            control or disable cookies through your browser settings.
          </p>

          {/* Third-Party Links */}
          <h3 className="text-3xl font-serif text-gray-900 mt-10 mb-4">
            Third-Party Services:
          </h3>
          <p className="text-lg text-gray-700 mb-8">
            Our website may contain links to external websites. We are not
            responsible for their privacy practices. Please review their
            policies before sharing your information.
          </p>

          {/* User Rights */}
          <h3 className="text-3xl font-serif text-gray-900 mt-10 mb-4">
            Your Rights:
          </h3>
          <p className="text-lg text-gray-700 mb-8">
            You have the right to access, update, or request deletion of your
            personal information. You can also opt out of marketing
            communications at any time.
          </p>

          {/* Changes */}
          <h3 className="text-3xl font-serif text-gray-900 mt-10 mb-4">
            Policy Updates:
          </h3>
          <p className="text-lg text-gray-700 mb-8">
            We may update this Privacy Policy periodically. Changes will be
            reflected on this page with a new “Last updated” date. Please check
            back regularly to stay informed.
          </p>

          {/* Contact */}
          <h3 className="text-3xl font-serif text-gray-900 mt-10 mb-4">
            Contact Us:
          </h3>
          <p className="text-lg text-gray-700 mb-4">
            If you have questions or concerns regarding this Privacy Policy,
            please reach out to us:
          </p>

          <p className="text-xl font-semibold text-gray-900 mb-2">Eventory</p>
          <address className="mb-4 not-italic text-gray-700 flex items-center space-x-3">
            <i className="uil uil-location-pin-alt text-xl" />
            <span>123 Event Plaza, Suite 456 New York, NY 10001</span>
          </address>
          <address className="mb-4 not-italic text-gray-700 flex items-center space-x-3">
            <i className="uil uil-envelope text-xl" />
            <a
              href="mailto:hello@eventory.com"
              className="text-blush-500 hover:underline"
            >
              hello@eventory.com
            </a>
          </address>
          <address className="mb-8 not-italic text-gray-700 flex items-center space-x-3">
            <i className="uil uil-phone-volume text-xl" />
            <a
              href="tel:+15551234567"
              className="text-blush-500 hover:underline"
            >
              +1 (555) 123-4567
            </a>
          </address>

          {/* Rights Reserved */}
          <h3 className="text-3xl font-serif text-gray-900 mt-10 mb-4">
            All Rights Reserved:
          </h3>
          <p className="text-lg text-gray-700 mb-8">
            All rights to this Privacy Policy and its contents are reserved by
            Eventory.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
