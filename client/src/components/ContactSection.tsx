import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { apiRequest } from '../lib/queryClient';
import { useToast } from '../hooks/use-toast';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../components/ui/form';
import type { ContactFormData } from '../types';

const contactSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters').max(50, 'First name is too long'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters').max(50, 'Last name is too long'),
  email: z.string().email('Please enter a valid email address').max(100, 'Email is too long'),
  phone: z.string().min(10, 'Please enter a valid phone number').regex(/^[\+\-\s\(\)\d]+$/, 'Please enter a valid phone number'),
  service: z.string().min(1, 'Please select a service'),
  eventDate: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(500, 'Message is too long'),
});

const ContactSection = () => {
  const { ref, isIntersecting } = useIntersectionObserver();
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      service: '',
      eventDate: '',
      message: '',
    },
  });

  const submitContactForm = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest('POST', '/api/contact', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: 'Message Sent Successfully!',
        description: 'Thank you for your inquiry. We will get back to you within 24 hours.',
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: 'Error Sending Message',
        description: 'Please try again or contact us directly.',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    submitContactForm.mutate(data);
  };

  const socialLinks = [
    { icon: 'fab fa-instagram', href: '#', label: 'Instagram', disabled: true },
    { icon: 'fab fa-facebook', href: '#', label: 'Facebook', disabled: true },
    { icon: 'fab fa-pinterest', href: '#', label: 'Pinterest', disabled: true },
    { icon: 'fab fa-linkedin', href: '#', label: 'LinkedIn', disabled: true },
  ];

  return (
    <section id="contact" className="py-20 bg-ocean-blue dark:bg-gray-900 relative overflow-hidden" ref={ref}>
      {/* Background Image */}
      <div
        className="absolute inset-0 opacity-10 dark:opacity-5"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white dark:text-gray-100 mb-4">
            Let's Create <span className="gradient-text">Magic Together</span>
          </h2>
          <p className="text-xl font-inter text-gray-300 dark:text-gray-300 max-w-3xl mx-auto">
            Ready to capture your story in paradise? Get in touch to discuss your photography needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isIntersecting ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="glass-effect rounded-2xl p-8"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-inter font-medium">
                          First Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="John"
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-300"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-inter font-medium">
                          Last Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Doe"
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-300"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-inter font-medium">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="john@example.com"
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-300"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-inter font-medium">
                        Phone
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="tel"
                          placeholder="(808) 123-4567"
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-300"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-inter font-medium">
                        Service Interest
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white/10 border-white/20 text-white">
                            <SelectValue placeholder="Select a service..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="wedding">Wedding Photography</SelectItem>
                          <SelectItem value="real-estate">Real Estate Photography</SelectItem>
                          <SelectItem value="family">Family Portraits</SelectItem>
                          <SelectItem value="commercial">Commercial Photography</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="eventDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-inter font-medium">
                        Event Date (if applicable)
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="date"
                          className="bg-white/10 border-white/20 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-inter font-medium">
                        Message
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          rows={4}
                          placeholder="Tell us about your photography needs..."
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-300"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={submitContactForm.isPending}
                  className="w-full bg-luxury-gold text-ocean-blue hover:bg-sunset-orange font-inter font-semibold py-4 rounded-full transition-colors duration-300"
                >
                  {submitContactForm.isPending ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </Form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isIntersecting ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="glass-effect rounded-2xl p-8">
              <h3 className="text-2xl font-playfair font-bold text-white mb-6">
                Get In Touch
              </h3>

              <div className="space-y-4">
                <div className="flex items-center">
                  <i className="fas fa-map-marker-alt text-luxury-gold text-xl w-6"></i>
                  <span className="text-white font-inter ml-4">
                    Honolulu, Hawaii
                  </span>
                </div>

                <div className="flex items-center">
                  <i className="fas fa-phone text-luxury-gold text-xl w-6"></i>
                  <span className="text-white font-inter ml-4">
                    (808) 555-0123
                  </span>
                </div>

                <div className="flex items-center">
                  <i className="fas fa-envelope text-luxury-gold text-xl w-6"></i>
                  <span className="text-white font-inter ml-4">
                    hello@arcadiaphotography.com
                  </span>
                </div>

                <div className="flex items-center">
                  <i className="fas fa-clock text-luxury-gold text-xl w-6"></i>
                  <span className="text-white font-inter ml-4">
                    Mon-Sat: 9AM-6PM HST
                  </span>
                </div>
              </div>
            </div>

            <div className="glass-effect rounded-2xl p-8">
              <h3 className="text-2xl font-playfair font-bold text-white mb-6">
                Follow Our Journey
              </h3>

              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-12 h-12 bg-luxury-gold rounded-full flex items-center justify-center text-ocean-blue text-xl hover:bg-sunset-orange transition-colors duration-300"
                    onClick={(e) => social.disabled && e.preventDefault()}
                  >
                    <i className={social.icon}></i>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
