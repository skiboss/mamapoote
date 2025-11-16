"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header with back button */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-3xl font-bold text-foreground">Privacy Policy</h1>
          </div>

          {/* Last updated */}
          <div className="text-sm text-muted-foreground">
            Last updated: November 16, 2025
          </div>

          {/* Content sections */}
          <div className="space-y-8 text-foreground">
            {/* Introduction */}
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold">Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                Mamapoote ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our food ordering application and website.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold">Information We Collect</h2>
              <div className="space-y-3 text-muted-foreground">
                <div>
                  <h3 className="font-medium text-foreground mb-1">Personal Information</h3>
                  <p>
                    When you create an account or place an order, we collect information such as your name, email address, phone number, delivery address, and payment information.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">Order Information</h3>
                  <p>
                    We collect details about your orders, including items ordered, delivery preferences, special instructions, and pricing information.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">Device Information</h3>
                  <p>
                    We automatically collect information about your device, including your IP address, browser type, operating system, and usage patterns.
                  </p>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold">How We Use Your Information</h2>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>To process and deliver your food orders</li>
                <li>To communicate with you about your orders and account</li>
                <li>To improve our application and services</li>
                <li>To send promotional content and updates (with your consent)</li>
                <li>To prevent fraud and ensure security</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            {/* Information Sharing */}
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold">Information Sharing</h2>
              <p className="text-muted-foreground leading-relaxed">
                We do not sell your personal information. We may share your information with:
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Our restaurant partners to prepare and deliver your order</li>
                <li>Payment processors to securely handle transactions</li>
                <li>Delivery partners to fulfill your order</li>
                <li>Service providers who assist in operating our platform</li>
                <li>Law enforcement when required by law</li>
              </ul>
            </section>

            {/* Data Security */}
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold">Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement industry-standard security measures to protect your personal information. However, no method of transmission over the internet is completely secure. While we strive to protect your data, we cannot guarantee absolute security.
              </p>
            </section>

            {/* Your Rights */}
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold">Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed">
                You have the right to:
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of promotional communications</li>
                <li>Request information about our data practices</li>
              </ul>
            </section>

            {/* Cookies and Tracking */}
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold">Cookies and Tracking</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our application uses cookies and similar tracking technologies to enhance your experience, remember your preferences, and analyze usage patterns. You can disable cookies through your browser settings, though this may affect functionality.
              </p>
            </section>

            {/* Third-Party Links */}
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold">Third-Party Links</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our platform may contain links to third-party websites. We are not responsible for their privacy practices. We encourage you to review their privacy policies before providing any information.
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold">Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Mamapoote is not intended for children under 13 years of age. We do not knowingly collect information from children. If we learn that we have collected personal information from a child, we will promptly delete it.
              </p>
            </section>

            {/* Changes to This Policy */}
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold">Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time. When we do, we will update the "Last updated" date at the top of this page and notify you through the application.
              </p>
            </section>

            {/* Contact Us */}
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <div className="space-y-1 text-muted-foreground">
                <p>
                  <span className="font-medium text-foreground">Email:</span> privacy@mamapoote.com
                </p>
                <p>
                  <span className="font-medium text-foreground">Address:</span> Mamapoote, Lagos, Nigeria
                </p>
                <p>
                  <span className="font-medium text-foreground">Support:</span>{" "}
                  <Link href="/contact" className="text-accent hover:underline">
                    Contact Us
                  </Link>
                </p>
              </div>
            </section>

            {/* Acknowledgment */}
            <section className="space-y-3 border-t pt-8">
              <p className="text-sm text-muted-foreground italic">
                By using Mamapoote, you acknowledge that you have read and understood this Privacy Policy.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
