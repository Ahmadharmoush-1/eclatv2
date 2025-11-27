import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Are these authentic perfumes?",
      answer: "Our perfumes are high-quality inspired alternatives to designer fragrances. They capture the essence of the original scents at a fraction of the price, offering excellent longevity and projection."
    },
    {
      question: "How long do the perfumes last?",
      answer: "Our perfumes typically last 6-12 hours depending on the fragrance concentration and your skin type. EDT formulations last 6-8 hours, while EDP formulations can last 10-12 hours."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day satisfaction guarantee. If you're not completely satisfied with your purchase, you can return it for a full refund within 30 days of delivery."
    },
    {
      question: "Do you offer free shipping?",
      answer: "Yes! We offer free standard shipping on all orders over $30. Express shipping options are also available at checkout."
    },
    {
      question: "How do I choose the right size?",
      answer: "We offer 30ml, 50ml, and 100ml sizes. If you're trying a new scent, we recommend starting with 30ml. For your favorite fragrances, the 100ml offers the best value."
    },
    {
      question: "Can I track my order?",
      answer: "Absolutely! Once your order ships, you'll receive a tracking number via email. You can use this to monitor your delivery status in real-time."
    },
    {
      question: "Are your perfumes suitable for sensitive skin?",
      answer: "Our perfumes are formulated to be skin-safe, but we always recommend doing a patch test if you have sensitive skin. Apply a small amount to your wrist and wait 24 hours to check for any reactions."
    },
    {
      question: "What's the difference between men's and women's perfumes?",
      answer: "While we categorize perfumes by traditional gender associations, fragrance is personal! Many of our scents are unisex, and we encourage you to choose based on what appeals to you, regardless of the category."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-muted-foreground text-lg">
            Find answers to common questions about our perfumes and services
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-border rounded-lg px-6 bg-card"
            >
              <AccordionTrigger className="text-left font-semibold hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 p-8 bg-accent/10 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-muted-foreground mb-6">
            Can't find what you're looking for? Our customer service team is here to help.
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-8 py-3 font-semibold hover:bg-primary/90 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
