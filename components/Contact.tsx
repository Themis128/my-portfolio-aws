"use client";
import { generateClient } from '@aws-amplify/api';
import { motion } from 'framer-motion';
import { Clock, Github, Linkedin, Mail, MapPin, MessageSquare, Send } from 'lucide-react';
import { useState } from 'react';
import '../lib/amplify-client-config'; // Ensure Amplify is configured
import { PersonalData } from '../lib/personal-data';
import { sendContact } from '../lib/graphql/mutations';
import { Input } from './input';
import { Textarea } from './textarea';
import { Button } from "./ui/button";

interface ContactProps {
  data: PersonalData;
}

export default function Contact({ data }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Use the sendContact mutation with Slack and SES notifications
      const client = generateClient();
      const result = await client.graphql({
        query: sendContact,
        variables: {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
      });

      // Reset form
      setFormData({ name: '', email: '', message: '' });
      setSubmitStatus('success');

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');

      // Reset error message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-32 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-32 w-48 h-48 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <MessageSquare className="w-4 h-4" />
            Get In Touch
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-6">
            Let&apos;s
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Collaborate
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let&apos;s collaborate and create something amazing together
          </p>
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Contact Information */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4 text-foreground">Let&apos;s Connect</h3>
              <p className="text-muted-foreground">
                I&apos;m always interested in new opportunities and exciting projects.
                Let&apos;s discuss how we can work together.
              </p>
            </div>

            <motion.div
              className="group bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg mb-1 text-foreground">Email</h4>
                  <p className="text-primary font-medium mb-2">{data.email}</p>
                  <p className="text-sm text-muted-foreground">I&apos;ll get back to you within 24 hours</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="group bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg mb-1 text-foreground">Location</h4>
                  <p className="text-primary font-medium mb-2">{data.location}</p>
                  <p className="text-sm text-muted-foreground">Available for remote work worldwide</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="group bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg mb-1 text-foreground">Response Time</h4>
                  <p className="text-primary font-medium mb-2">Within 24 hours</p>
                  <p className="text-sm text-muted-foreground">Quick and reliable communication</p>
                </div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="pt-6 border-t border-border/50"
            >
              <h4 className="font-semibold mb-4 text-foreground">Follow Me</h4>
              <div className="flex gap-4">
                {data.github && (
                  <motion.a
                    href={data.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                    whileHover={{ rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github className="w-6 h-6 text-white" />
                  </motion.a>
                )}
                {data.linkedin && (
                  <motion.a
                    href={data.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                    whileHover={{ rotate: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Linkedin className="w-6 h-6 text-white" />
                  </motion.a>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-8 shadow-xl"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2 text-foreground">Send Me a Message</h3>
              <p className="text-muted-foreground">
                Have a project in mind? Let&apos;s discuss the details and see how we can make it happen.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="space-y-2"
                >
                  <label htmlFor="name" className="block text-sm font-medium text-foreground">
                    Your Name
                  </label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 h-11"
                  />
                </motion.div>
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="space-y-2"
                >
                  <label htmlFor="email" className="block text-sm font-medium text-foreground">
                    Your Email
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 h-11"
                  />
                </motion.div>
              </div>

              <motion.div
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="space-y-2"
              >
                <label htmlFor="message" className="block text-sm font-medium text-foreground">
                  Your Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Tell me about your project, goals, and how I can help you achieve them..."
                  className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 resize-none"
                />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl font-semibold disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </motion.div>
            </form>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg"
              >
                <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-medium">Message sent successfully!</span>
                </div>
                <p className="text-sm text-green-600 dark:text-green-500 mt-1">
                  You will receive a confirmation email and we will get back to you within 24 hours.
                </p>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
              >
                <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
                  <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <span className="font-medium">Failed to send message</span>
                </div>
                <p className="text-sm text-red-600 dark:text-red-500 mt-1">
                  Please try again or contact us directly.
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-muted-foreground mb-4">
            Prefer to connect directly? Feel free to reach out through any of the channels above.
          </p>
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-medium">
            <Mail className="w-4 h-4" />
            Always open to new opportunities
          </div>
        </motion.div>
      </div>
    </section>
  );
}
