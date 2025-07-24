import type { Express } from "express";
import { db } from "../server/db";
import { contactSubmissions, bookings, users } from "@shared/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

export function registerRoutes(app: Express) {
  // Performance analytics endpoint
  app.post('/api/analytics/performance', async (req, res) => {
    try {
      const metricsSchema = z.object({
        loadTime: z.number(),
        firstContentfulPaint: z.number(),
        largestContentfulPaint: z.number(),
        cumulativeLayoutShift: z.number(),
        firstInputDelay: z.number(),
        timeToInteractive: z.number(),
        resourceLoadTime: z.number(),
        domContentLoaded: z.number(),
        timestamp: z.string(),
        userAgent: z.string(),
        connection: z.string(),
        environment: z.string()
      });

      const metrics = metricsSchema.parse(req.body);
      
      // In production, you would store this in a dedicated analytics table
      console.log('📊 Performance Analytics Received:', {
        lcp: metrics.largestContentfulPaint,
        fid: metrics.firstInputDelay,
        cls: metrics.cumulativeLayoutShift,
        fcp: metrics.firstContentfulPaint,
        environment: metrics.environment,
        connection: metrics.connection
      });

      // Could implement database storage for analytics:
      // await db.insert(performanceMetrics).values(metrics);

      res.json({ success: true, message: 'Metrics received' });
    } catch (error) {
      console.error('Analytics error:', error);
      res.status(400).json({ error: 'Invalid metrics data' });
    }
  });

  // Contact form submission
  app.post('/api/contact', async (req, res) => {
    try {
      const contactSchema = z.object({
        name: z.string().min(1, 'Name is required'),
        email: z.string().email('Valid email is required'),
        phone: z.string().optional(),
        service: z.string().min(1, 'Service type is required'),
        message: z.string().min(1, 'Message is required'),
        preferredContact: z.string().optional(),
        eventDate: z.string().optional(),
        budget: z.string().optional()
      });

      const data = contactSchema.parse(req.body);
      
      const [submission] = await db.insert(contactSubmissions).values({
        firstName: data.name.split(' ')[0] || data.name,
        lastName: data.name.split(' ').slice(1).join(' ') || '',
        email: data.email,
        phone: data.phone || '',
        service: data.service,
        message: data.message,
        eventDate: data.eventDate,
        status: 'pending'
      }).returning();

      res.json({ 
        success: true, 
        message: 'Thank you! We\'ll be in touch within 24 hours.',
        submissionId: submission.id 
      });
    } catch (error) {
      console.error('Contact form error:', error);
      res.status(400).json({ 
        error: error instanceof z.ZodError ? error.errors : 'Submission failed' 
      });
    }
  });

  // Get all contact submissions (admin)
  app.get('/api/contact/submissions', async (req, res) => {
    try {
      const submissions = await db.select().from(contactSubmissions).orderBy(contactSubmissions.submittedAt);
      res.json(submissions);
    } catch (error) {
      console.error('Failed to fetch submissions:', error);
      res.status(500).json({ error: 'Failed to fetch submissions' });
    }
  });

  // Create booking with payment
  app.post('/api/bookings', async (req, res) => {
    try {
      const bookingSchema = z.object({
        customerName: z.string().min(1),
        customerEmail: z.string().email(),
        customerPhone: z.string().optional(),
        serviceType: z.string().min(1),
        packageType: z.string().min(1),
        eventDate: z.string(),
        location: z.string().optional(),
        specialRequests: z.string().optional(),
        totalAmount: z.number().positive(),
        paymentIntentId: z.string().optional()
      });

      const data = bookingSchema.parse(req.body);
      
      const [booking] = await db.insert(bookings).values({
        firstName: data.customerName.split(' ')[0] || data.customerName,
        lastName: data.customerName.split(' ').slice(1).join(' ') || '',
        email: data.customerEmail,
        phone: data.customerPhone || '',
        service: data.serviceType,
        packageType: data.packageType,
        eventDate: data.eventDate,
        message: data.specialRequests,
        amount: data.totalAmount.toString(),
        stripePaymentIntentId: data.paymentIntentId
      }).returning();

      res.json({ 
        success: true, 
        booking,
        message: 'Booking created successfully' 
      });
    } catch (error) {
      console.error('Booking creation error:', error);
      res.status(400).json({ 
        error: error instanceof z.ZodError ? error.errors : 'Booking failed' 
      });
    }
  });

  // Get all bookings (admin)
  app.get('/api/bookings', async (req, res) => {
    try {
      const allBookings = await db.select().from(bookings).orderBy(bookings.createdAt);
      res.json(allBookings);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
      res.status(500).json({ error: 'Failed to fetch bookings' });
    }
  });

  // Update booking status
  app.patch('/api/bookings/:id/status', async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
      }

      const [updatedBooking] = await db
        .update(bookings)
        .set({ bookingStatus: status, updatedAt: new Date() })
        .where(eq(bookings.id, parseInt(id)))
        .returning();

      if (!updatedBooking) {
        return res.status(404).json({ error: 'Booking not found' });
      }

      res.json({ 
        success: true, 
        booking: updatedBooking,
        message: `Booking status updated to ${status}` 
      });
    } catch (error) {
      console.error('Status update error:', error);
      res.status(500).json({ error: 'Failed to update booking status' });
    }
  });

  // Stripe payment intent creation
  app.post('/api/create-payment-intent', async (req, res) => {
    try {
      const { amount, currency = 'usd', metadata = {} } = req.body;

      if (!amount || amount <= 0) {
        return res.status(400).json({ error: 'Valid amount is required' });
      }

      // In production, you would use Stripe here:
      // const paymentIntent = await stripe.paymentIntents.create({
      //   amount: Math.round(amount * 100), // Convert to cents
      //   currency,
      //   metadata,
      //   automatic_payment_methods: { enabled: true }
      // });

      // Mock response for development
      const mockPaymentIntent = {
        id: `pi_${Date.now()}`,
        client_secret: `pi_${Date.now()}_secret_${Math.random().toString(36).substr(2, 9)}`,
        amount: Math.round(amount * 100),
        currency,
        status: 'requires_payment_method'
      };

      res.json({
        success: true,
        paymentIntent: mockPaymentIntent,
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_mock'
      });
    } catch (error) {
      console.error('Payment intent creation error:', error);
      res.status(500).json({ error: 'Failed to create payment intent' });
    }
  });

  // Stripe webhook handler
  app.post('/api/webhooks/stripe', async (req, res) => {
    try {
      // In production, verify the webhook signature:
      // const sig = req.headers['stripe-signature'];
      // const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);

      const event = req.body;

      switch (event.type) {
        case 'payment_intent.succeeded':
          const paymentIntent = event.data.object;
          
          // Update booking status to confirmed
          if (paymentIntent.metadata?.bookingId) {
            await db
              .update(bookings)
              .set({ 
                bookingStatus: 'confirmed',
                paymentStatus: 'paid',
                updatedAt: new Date()
              })
              .where(eq(bookings.id, parseInt(paymentIntent.metadata.bookingId)));
          }
          
          console.log('Payment succeeded:', paymentIntent.id);
          break;

        case 'payment_intent.payment_failed':
          console.log('Payment failed:', event.data.object.id);
          break;

        default:
          console.log(`Unhandled event type: ${event.type}`);
      }

      res.json({ received: true });
    } catch (error) {
      console.error('Webhook error:', error);
      res.status(400).json({ error: 'Webhook failed' });
    }
  });

  return app;
}