"use client";

import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  return (
    <div className="w-full">
      {/* HERO / HEADER */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="main-container">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Privacy Policy
          </motion.h1>
          <p className="text-lg opacity-90 max-w-2xl">
            Last Updated: December 23, 2025. Your privacy is important to SPX. 
            This policy explains how we handle your information.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="section-py">
        <div className="main-container">
          <div className="max-w-4xl mx-auto space-y-12">
            
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold">1. Introduction</h2>
              <div className="text-justify-custom text-muted-foreground">
                <p>
                  SPX ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy 
                  explains how we collect, use, disclose, and safeguard your information when you visit 
                  our website and engage with our services, including our research, strategy, and 
                  implementation programs across Africa.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-2xl font-semibold">2. Information We Collect</h2>
              <div className="text-justify-custom text-muted-foreground">
                <p>
                  We may collect information in several ways:
                </p>
              </div>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  <strong>Personal Data:</strong> Name, email address, and contact details you provide 
                  when contacting us, signing up for insights, or registering as a vendor or consultant.
                </li>
                <li>
                  <strong>Research Data:</strong> Information collected during our research studies, 
                  field assessments, and evaluations, handled in accordance with ethical standards 
                  and specific project consent forms.
                </li>
                <li>
                  <strong>Usage Data:</strong> Information about how you use our website, including 
                  IP address, browser type, and pages visited.
                </li>
              </ul>
            </div>

            <div className="space-y-8">
              <h2 className="text-2xl font-semibold">3. How We Use Your Information</h2>
              <div className="text-justify-custom text-muted-foreground">
                <p>
                  We use the information we collect to:
                </p>
              </div>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Provide and improve our advisory, research, and implementation services.</li>
                <li>Communicate with you about our projects, insights, and opportunities.</li>
                <li>Analyze website usage to enhance user experience.</li>
                <li>Comply with legal obligations and ethical research standards.</li>
                <li>Process applications for careers, consultancies, or partnerships.</li>
              </ul>
            </div>

            <div className="space-y-8">
              <h2 className="text-2xl font-semibold">4. Data Sharing and Disclosure</h2>
              <div className="text-justify-custom text-muted-foreground">
                <p>
                  We do not sell your personal data. We may share information with:
                </p>
              </div>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Service providers who assist in our operations (e.g., IT support).</li>
                <li>Partners and funders, typically in an aggregated and anonymized format for research reporting.</li>
                <li>Legal authorities if required by law.</li>
              </ul>
            </div>

            <div className="space-y-8">
              <h2 className="text-2xl font-semibold">5. Data Security</h2>
              <div className="text-justify-custom text-muted-foreground">
                <p>
                  We implement appropriate technical and organizational measures to protect your 
                  information. However, no method of transmission over the Internet or electronic 
                  storage is 100% secure.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-2xl font-semibold">6. Your Rights</h2>
              <div className="text-justify-custom text-muted-foreground">
                <p>
                  Depending on your location, you may have rights regarding your personal data, 
                  including the right to access, correct, or delete your information. To exercise 
                  these rights, please contact us.
                </p>
              </div>
            </div>

            <div className="space-y-8 border-t pt-8">
              <h2 className="text-2xl font-semibold">7. Contact Us</h2>
              <div className="text-justify-custom text-muted-foreground">
                <p>
                  If you have questions about this Privacy Policy, please contact us at:
                </p>
              </div>
              <div className="bg-muted p-6 rounded-xl mt-4">
                <p className="font-medium text-foreground">SPX Headquarters</p>
                <p className="text-muted-foreground">Addis Ababa, Ethiopia</p>
                <p className="text-muted-foreground mt-2">Email: privacy@spx.africa</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

