"use client";
import { useState } from 'react';
import { PersonalData } from '../lib/personal-data';
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Get In Touch
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Ready to bring your ideas to life? Let&apos;s collaborate and create something amazing together
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Let&apos;s Connect
              </h3>

              <div className="space-y-8">
                <div className="group bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-white/20 dark:border-gray-700">
                  <div className="flex items-center mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-6 shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Email</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">{data.email}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">I&apos;ll get back to you within 24 hours</p>
                </div>

                <div className="group bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-white/20 dark:border-gray-700">
                  <div className="flex items-center mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-6 shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Location</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">{data.location}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Available for remote work</p>
                </div>

                <div className="group bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-white/20 dark:border-gray-700">
                  <div className="flex items-center mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-6 shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Response Time</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">Within 24 hours</p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Quick and reliable communication</p>
                </div>
              </div>
            </div>

            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Send Me a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
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
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
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
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
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
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 rounded-xl"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
