"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, Phone, Send, User } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;

    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.firstname ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      toast.error("Please fill in all required fields");

      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Message sent successfully!");
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        throw new Error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to send message"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-primary/5 rounded-t-lg space-y-1 pb-8">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mx-auto mb-4">
              <Mail className="h-6 w-6" />
            </div>
            <CardTitle className="text-center text-2xl md:text-3xl font-bold">
              Contact Us
            </CardTitle>
            <CardDescription className="text-center text-base">
              We&apos;d love to hear from you. Fill out the form below and
              we&apos;ll get back to you as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 md:px-12 pt-8 pb-8">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium" htmlFor="firstname">
                    First name <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      required
                      className="pl-10"
                      id="firstname"
                      placeholder="John"
                      type="text"
                      value={formData.firstname}
                      onChange={handleChange}
                    />
                    <User className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium" htmlFor="lastname">
                    Last name
                  </Label>
                  <div className="relative">
                    <Input
                      className="pl-10"
                      id="lastname"
                      placeholder="Doe"
                      type="text"
                      value={formData.lastname}
                      onChange={handleChange}
                    />
                    <User className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium" htmlFor="email">
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      required
                      className="pl-10"
                      id="email"
                      placeholder="example@gmail.com"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <Mail className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium" htmlFor="phone">
                    Phone
                  </Label>
                  <div className="relative">
                    <Input
                      className="pl-10"
                      id="phone"
                      placeholder="+91xxxxxxxxxx"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    <Phone className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <Label className="text-sm font-medium" htmlFor="subject">
                  Subject <span className="text-red-500">*</span>
                </Label>
                <Input
                  required
                  id="subject"
                  placeholder="How can we help you?"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2 mb-8">
                <Label className="text-sm font-medium" htmlFor="message">
                  Message <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  required
                  className="min-h-32 resize-y"
                  id="message"
                  placeholder="Your message here..."
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <div className="flex justify-end">
                <Button
                  className="px-8 py-2 h-auto"
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Submit <Send className="h-4 w-4" />
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-10 text-center text-sm text-muted-foreground">
          <p>
            Need immediate assistance? Call us at{" "}
            <a className="font-medium" href="tel:9513784194">
              +91 9513784194
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
