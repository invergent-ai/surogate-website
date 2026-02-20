export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-[var(--accent-purple)]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:gap-10 sm:py-14 md:grid-cols-2 md:py-20 items-center">
        <div className="order-2 md:order-1">
          <p className="mt-5 text-base sm:text-lg md:text-xl text-white leading-relaxed">
            <strong>Surogate</strong> is the high-performance AI engine by Invergent, designed to bridge the gap between ambitious experimentation and enterprise-grade scalability. We empower developers to train and fine-tune massive models with "speed-of-light" efficiency. By leveraging cutting-edge C++/CUDA kernels and native support for next-gen hardware like NVIDIA Blackwell, we make elite-level AI infrastructure accessible, predictable, and incredibly fast—whether on-premise, in the cloud, or air-gapped.
          </p>
        </div>

        <div className="relative flex items-center justify-center order-1 md:order-2">
          <img
            src="/surogate-mascot-tail.png"
            alt="Surogate Mascot"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md h-auto"
          />
        </div>
      </div>
    </section>
  );
}
