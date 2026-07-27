const MUTED = '#A3A29F';

const STEPS = [
  {
    step: 'Step 1',
    title: 'Claim your spot',
    body: 'Join the Founding 500 today. Reserve your access to the 100 prebuilt templates.',
  },
  {
    step: 'Step 2',
    title: 'Choose your template on launch day',
    body: 'Pick from 100 agents built for medical, legal, accounting, and educational professionals. One-click deploy.',
  },
  {
    step: 'Step 3',
    title: 'Customise and earn',
    body: 'A Surogate AI engineer helps you tailor your first agent - free. Then it runs 24/7 while you earn from it.',
  },
];

export default function LaunchSteps() {
  return (
    <section className="bg-brand-paper pb-8 lg:pb-10">
      <div className="w-full px-8 lg:pl-24 xl:pl-32 lg:pr-[6%] xl:pr-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {STEPS.map(({ step, title, body }, i) => {
            const isLast = i === STEPS.length - 1;
            return (
              <div
                key={step}
                className="reveal rounded-[10px] p-8"
                style={
                  isLast
                    ? { background: '#FFAF10' }
                    : {
                        background: 'linear-gradient(180deg, #FFFAF2 0%, #FFFFFF 100%)',
                        border: '1px solid #FFB00F',
                        boxShadow: '0px 9px 10px rgba(255, 176, 15, 0.1)',
                      }
                }
              >
                <div
                  className="font-serif font-bold text-[40px] leading-none mb-4"
                  style={{ color: isLast ? undefined : '#FFB00F' }}
                >
                  <span className={isLast ? 'text-brand-aubergine' : ''}>{step}</span>
                </div>
                <div className="font-serif text-[24px] leading-[1.15] text-brand-aubergine mb-3">
                  {title}
                </div>
                <p
                  className="font-sans text-[16px] leading-[1.45]"
                  style={{ color: isLast ? 'rgba(42, 16, 45, 0.75)' : MUTED }}
                >
                  {body}
                </p>
              </div>
            );
          })}
        </div>

        <div className="reveal mt-8 lg:mt-10 flex justify-center">
          <p
            className="text-center font-sans italic font-medium text-[17px] sm:text-[18px] text-brand-aubergine rounded-[10px] px-6 py-3"
            style={{ background: 'rgba(255, 176, 15, 0.12)' }}
          >
            Every template is production-ready. No code required. Your first setup call is included.
          </p>
        </div>
      </div>
    </section>
  );
}
