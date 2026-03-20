"use client";

import React, { useEffect, useState } from "react";
import { Github, X } from "lucide-react";

export default function Hero() {
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [formMessage, setFormMessage] = useState("");

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    if (isSubscribeOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalOverflow;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isSubscribeOpen]);

  return (
    <section className="relative overflow-hidden bg-[var(--accent-orange)]">
      <img
        src="/heroBg.svg"
        alt=""
        width={1609}
        height={2527}
        className="pointer-events-none select-none absolute bottom-0 left-0 w-64 md:w-80 h-auto"
      />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:gap-10 sm:py-14 md:grid-cols-2 md:py-20 items-stretch">
        <div className="flex h-full flex-col">
          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-black sm:text-5xl">
            <span className="block text-4xl sm:text-6xl font-extrabold">
              TRAIN MODELS AND
            </span>
            <span className="block text-4xl sm:text-6xl font-extrabold">
              BUILD AGENTS
            </span>
            <span className="block text-3xl sm:text-5xl font-normal">
              at practical
            </span>
            <span className="block text-2xl sm:text-4xl pl-10">
              hardware limits
            </span>
          </h1>
          <p className="text-black mt-5">The open-source AgentOps platform. Train and fine-tune models with a native C++/CUDA engine — then build, deploy, and operate autonomous AI agents on your own infrastructure.</p>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <a
              href="https://github.com/invergent-ai/surogate"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-start rounded-3xl bg-white pl-1 pr-5 py-1 text-xs font-semibold text-zinc-950 hover:bg-zinc-100 dark:bg-black dark:text-white dark:hover:bg-zinc-900 transition-colors"
            >
              <span className="mr-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#FFBB33]">
                <Github className="h-4 w-4 text-black" />
              </span>
              Give us a star
            </a>
            {/* Subscribe for Surogate Studio (disabled) */}
            {/* <button
              type="button"
              onClick={() => {
                setIsSubscribeOpen(true);
                setFormMessage("");
              }}
              className="inline-flex items-center justify-start rounded-3xl bg-[#FFBB33] px-4 py-2 sm:py-1 text-xs font-semibold text-zinc-950 border border-zinc-950 hover:bg-[#ffb000] transition-colors"
            >
              Subscribe for Surogate Studio
            </button> */}
            <a
              href="http://discord.gg/surogate"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-start rounded-3xl bg-[#FFBB33] pl-1 pr-5 py-1 text-xs font-semibold text-zinc-950 border border-zinc-950 hover:bg-[#ffb000] transition-colors"
            >
              <span className="mr-2 flex h-9 w-9 items-center justify-center rounded-full bg-black">
                <img
                  src="/discord.svg"
                  alt="Discord"
                  className="h-4 w-4 brightness-0 invert"
                />
              </span>
              join discord
            </a>
            <a
              href="http://surogate.ai/docs"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-start rounded-3xl bg-[#FFBB33] px-4 py-1 text-xs font-semibold text-zinc-950 border border-zinc-950 hover:bg-[#ffb000] transition-colors"
            >
              Read Docs
            </a>
          </div>
          <div className="mt-auto flex flex-wrap gap-3">
            {[
              "Apache 2.0",
              "C++/CUDA core",
              "Autonomous Agents",
              "Multi-GPU",
              "Self-Hosted",
            ].map((label) => (
              <span
                key={label}
                className="inline-flex items-center rounded-full bg-black px-3 py-1 text-[10px] font-medium text-white/90"
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Hero Card */}
        <div className="relative">
          <div className="absolute -inset-2 -z-10 rounded-3xl bg-gradient-to-b from-sky-400/15 via-sky-400/5 to-transparent blur-2xl dark:via-white/5"></div>
          <div className="rounded-3xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[2rem] font-bold text-black">
                  What Surogate does
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              <div className="flex items-start gap-3 rounded-[10px] bg-[#FFBB33] p-4">
                <img src="/dashboard.svg" alt="" className="mt-0.5 h-10 w-10" />
                <div>
                  <p className="text-sm font-semibold text-black">
                    Near hardware-limit training
                  </p>
                  <p className="mt-1 text-sm text-black">
                    A native C++/CUDA engine that pushes your NVIDIA GPUs to their practical limits — from single-GPU rigs to multi-node clusters.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-[10px] bg-[#FFBB33] p-4">
                <img src="/optimized.svg" alt="" className="mt-0.5 h-10 w-10" />
                <div>
                  <p className="text-sm font-semibold text-black">
                    Autonomous agent runtime
                  </p>
                  <p className="mt-1 text-sm text-black">
                    Compose agents from skills, tools, MCP servers, and sub-agents. Agents reason, plan, and execute complex multi-step workflows.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-[10px] bg-[#FFBB33] p-4">
                <img src="/native.svg" alt="" className="mt-0.5 h-10 w-10" />
                <div>
                  <p className="text-sm font-semibold text-black">
                    Closed improvement loop
                  </p>
                  <p className="mt-1 text-sm text-black">
                    Production traces become training data. Fine-tune Specialized Language Models from agent trajectories. Agents get better automatically.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-[10px] bg-[#FFBB33] p-4">
                <img
                  src="/experimentation.svg"
                  alt=""
                  className="mt-0.5 h-10 w-10"
                />
                <div>
                  <p className="text-sm font-semibold text-black">
                    Full agent observability
                  </p>
                  <p className="mt-1 text-sm text-black">
                    Complete execution traces for every agent run — every LLM call, tool invocation, sub-agent step, and failure. Visual trace viewer included.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-[10px] bg-[#FFBB33] p-4">
                <img src="/recipes-2.svg" alt="" className="mt-0.5 h-10 w-10" />
                <div>
                  <p className="text-sm font-semibold text-black">
                    Self-hosted, full control
                  </p>
                  <p className="mt-1 text-sm text-black">
                    Runs on Kubernetes. Your infrastructure, your models, your data. On-premise or cloud. Air-gap capable for regulated environments.                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isSubscribeOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 text-zinc-950 shadow-xl">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold">
                    Subscribe for Surogate Studio updates
                  </h2>
                  <p className="mt-1 text-sm text-zinc-600">
                    Leave your email and we&apos;ll let you know as soon as
                    Surogate Studio is available.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSubscribeOpen(false)}
                  className="rounded-full p-1 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div id="mc_embed_shell">
                <div
                  id="mc_embed_signup"
                  className="rounded-2xl border border-zinc-200 bg-white p-1 sm:p-2"
                >
                  <form
                    action="https://surogate.us18.list-manage.com/subscribe/post?u=fd56db4c67b61aa4092299bb7&amp;id=e8e6802153&amp;f_id=0059b3e6f0"
                    method="post"
                    id="mc-embedded-subscribe-form"
                    name="mc-embedded-subscribe-form"
                    className="validate space-y-3"
                    target="mc_embed_iframe"
                    noValidate
                    onSubmit={() =>
                      setFormMessage(
                        "Thanks! Your subscription request has been sent."
                      )
                    }
                  >
                    <div id="mc_embed_signup_scroll">
                      <h2 className="text-base font-semibold text-zinc-900">
                        Subscribe
                      </h2>
                      <div className="indicates-required mb-2 text-xs text-zinc-500">
                        <span className="asterisk text-red-600">*</span>{" "}
                        indicates required
                      </div>
                      <div className="mc-field-group space-y-1">
                        <label
                          htmlFor="mce-EMAIL"
                          className="block text-sm font-medium text-zinc-700"
                        >
                          Email Address{" "}
                          <span className="asterisk text-red-600">*</span>
                        </label>
                        <input
                          type="email"
                          name="EMAIL"
                          className="required email mt-1 block w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-950 shadow-sm outline-none ring-offset-2 focus:border-black focus:ring-2 focus:ring-black"
                          id="mce-EMAIL"
                          required
                          defaultValue=""
                        />
                      </div>
                      <div className="mc-field-group mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="mce-FNAME"
                            className="block text-sm font-medium text-zinc-700"
                          >
                            First Name
                          </label>
                          <input
                            type="text"
                            name="FNAME"
                            className="mt-1 block w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-950 shadow-sm outline-none ring-offset-2 focus:border-black focus:ring-2 focus:ring-black"
                            id="mce-FNAME"
                            defaultValue=""
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="mce-LNAME"
                            className="block text-sm font-medium text-zinc-700"
                          >
                            Last Name
                          </label>
                          <input
                            type="text"
                            name="LNAME"
                            className="mt-1 block w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-950 shadow-sm outline-none ring-offset-2 focus:border-black focus:ring-2 focus:ring-black"
                            id="mce-LNAME"
                            defaultValue=""
                          />
                        </div>
                      </div>
                      <div hidden>
                        <input type="hidden" name="tags" value="3062587" />
                      </div>
                      <div id="mce-responses" className="clear mt-2 text-sm">
                        <div
                          className="response text-red-600"
                          id="mce-error-response"
                          style={{ display: "none" }}
                        ></div>
                        <div
                          className="response text-emerald-600"
                          id="mce-success-response"
                          style={{ display: "none" }}
                        ></div>
                      </div>
                      <div
                        aria-hidden="true"
                        style={{ position: "absolute", left: "-5000px" }}
                      >
                        <input
                          type="text"
                          name="b_fd56db4c67b61aa4092299bb7_e8e6802153"
                          tabIndex={-1}
                          defaultValue=""
                        />
                      </div>
                      <div className="clear mt-4 flex items-center justify-between">
                        <input
                          type="submit"
                          name="subscribe"
                          id="mc-embedded-subscribe"
                          className="button inline-flex cursor-pointer items-center justify-center rounded-3xl bg-black px-4 py-2 text-xs font-semibold text-[var(--accent-orange)] hover:bg-zinc-900"
                          value="Subscribe"
                        />
                        <p className="max-w-[180px] text-right text-[10px] leading-snug text-zinc-500">
                          We&apos;ll only use this information to send Surogate
                          Studio updates.
                        </p>
                      </div>
                      {formMessage && (
                        <p className="mt-3 text-xs text-emerald-600">
                          {formMessage}
                        </p>
                      )}
                    </div>
                  </form>
                  <iframe
                    name="mc_embed_iframe"
                    title="Mailchimp subscription"
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
