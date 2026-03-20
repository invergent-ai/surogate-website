export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-[var(--accent-purple)]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:gap-10 sm:py-14 md:grid-cols-2 md:py-20 items-center">
        <div className="order-2 md:order-1">
          <p className="mt-5 text-base sm:text-lg md:text-xl text-white leading-relaxed">
            <strong>Surogate</strong> is the open-source AgentOps platform by Invergent — designed to close the gap between ambitious AI experimentation and reliable production deployment.
          </p>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-white leading-relaxed">
            We build the infrastructure for teams that want to train their own models, compose autonomous agents, and operate them at scale — on hardware they control.
          </p>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-white leading-relaxed">
            The training engine is native C++/CUDA, engineered to push NVIDIA GPUs to their practical limits — from consumer RTX cards to Blackwell datacenter hardware.
          </p>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-white leading-relaxed">
            The agent runtime is built on Kubernetes, with full skill lifecycle management, execution tracing, and a continuous improvement loop that makes your agents measurably better over time.
          </p>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-white leading-relaxed">
            <strong>Open-source core. Enterprise platform. Fully self-hosted.</strong>
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
