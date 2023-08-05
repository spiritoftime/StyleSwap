import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const FAQ = () => {
  return (
    <div className="container py-8 space-y-6 js-show-on-scroll bg-[#f9f9f9] dark:bg-transparent md:py-12 lg:py-24">
      <p className="text-base font-semibold text-center uppercase text-gradient">
        Support
      </p>
      <h2 className="font-heading text-3xl leading-[1.1] font-bold text-center  sm:text-3xl md:text-6xl">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            I'm not comfortable with uploading my images.
          </AccordionTrigger>
          <AccordionContent className="text-sm leading-relaxed tracking-wide text-gray-700">
            Not to worry! By default, StyleSwap stores your images so that you
            can always refer back to them at view pictures. After you are done,
            you can simply click delete pictures to erase all database records
            for your uploaded and transformed images!
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            Why are my transformed images so goofy?
          </AccordionTrigger>
          <AccordionContent className="text-sm leading-relaxed tracking-wide text-gray-700">
            At present, AI is not very good with processing body parts, such as
            hands or even exposed skin. Try wearing more covered clothing and
            reduce the number of distractions in your uploaded images for better
            results!
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FAQ;
