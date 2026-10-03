import Image from "next/image";
import { Star } from "lucide-react";
import { ArrowBtn, OutlineBtn } from "../ui/Button";

const metrics = [
  { text: "Learners supported", amount: "10,000+" },
  { text: "Conversations powered by AI", amount: "15,000+" },
  { text: "Educator satisfaction", amount: "98%" },
];

const features = [
  {
    title: "Organized Channels",
    description: "Every topic gets its own space, so nothing gets lost.",
  },
  {
    title: "Cohort Communication",
    description: "Bring everyone together and keep the conversation flowing.",
  },
  {
    title: "Pricing That's Easy on the Wallet",
    description: "Powerful features without the premium price tag.",
  },
];

const HeroSection = () => {
  return (
    <section className="relative isolate flex w-full flex-col items-center gap-4 overflow-hidden px-4 py-10 text-center sm:gap-6 sm:px-8 sm:py-16  lg:gap-8 lg:px-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[30%] bg-gradient-to-t from-blue-50/30 to-white"
      />
      <h1 className="text-2xl font-semibold leading-tight text-neutral-900 sm:text-4xl md:text-5xl text-center">
        Built for Bootcamps and{" "}
        <span className="text-primary-500">Learning</span> Communities
      </h1>
      <ul className="grid w-full max-w-5xl grid-cols-1 gap-3 text-xs text-neutral-600 sm:text-base md:grid-cols-3 md:gap-6 lg:text-lg">
        {features.map((feature) => (
          <li key={feature.title}>
            <span className="font-semibold text-neutral-900">
              {feature.title}:
            </span>{" "}
            {feature.description}
          </li>
        ))}
      </ul>
      <div className="flex w-full max-w-md flex-row items-center justify-center gap-2 sm:gap-3">
        <ArrowBtn text="Try for free" linkToHome className="justify-center" />
        <OutlineBtn text="Contact sales" href="/contact-sales" />
      </div>
      <div className="flex w-full max-w-[90%] flex-col items-center justify-center gap-1 text-center text-xs text-neutral-500 sm:max-w-2xl sm:flex-row sm:gap-2 sm:text-sm">
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-0.5" aria-hidden="true">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Star key={i} color="gold" fill="gold" size={16} />
              ))}
          </div>
          <span className="font-medium text-neutral-600">4.9</span>
        </div>
        <span className="hidden sm:inline" aria-hidden="true">
          |
        </span>
        <p className="leading-relaxed sm:leading-normal">
          Trusted by most modern educators and learners worldwide
        </p>
      </div>
      <div className="grid w-full max-w-4xl grid-cols-3 place-items-center gap-1.5 sm:gap-6 md:gap-10">
        {metrics.map((metric, i) => (
          <div
            key={i}
            className="flex w-full max-w-[260px] flex-col items-center justify-center gap-1 px-1.5 py-1 sm:flex-col sm:gap-1 sm:px-4 sm:py-3"
          >
            <p className="text-lg font-semibold text-neutral-900 sm:text-3xl">
              {metric.amount}
            </p>
            <p className="text-[10px] leading-tight text-neutral-500 sm:text-sm">
              {metric.text}
            </p>
          </div>
        ))}
      </div>{" "}
      <div className="w-full max-w-6xl overflow-hidden rounded-2xl">
        <div className="relative aspect-[16/10]  w-full sm:aspect-[16/9] lg:aspect-[2/1] ">
          <Image
            src="/images/homepage/hero-img.png"
            alt="Preview of the learning communication interface"
            fill
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 92vw, 1200px"
            className="object-contain object-center "
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
