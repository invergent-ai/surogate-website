import { Linkedin } from 'lucide-react';

const teamMembers = [
  {
    image: '/flavius.png',
    name: 'Flavius',
    role: 'CTO',
    tags: ['Product', 'Engineer', 'Software'],
    linkedin: 'https://www.linkedin.com/in/flaviusburca/' // Update with actual LinkedIn URL
  },
  {
    image: '/ovidiu.png',
    name: 'Ovidiu Oancea',
    role: 'CEO',
    tags: ['Business'],
    linkedin: 'https://www.linkedin.com/in/ovidiu-oancea-3961a71/' // Update with actual LinkedIn URL
  },
  {
    image: '/dan.png',
    name: 'Dan Chirila',
    role: 'CDO',
    tags: ['Software', 'Architect', 'Engineer'],
    linkedin: 'https://www.linkedin.com/in/dan-chirila-897a7731/' // Update with actual LinkedIn URL
  },
  {
    image: '/george.png',
    name: 'George Zaharia',
    role: 'BDD',
    tags: ['Sales', 'Partnerships'],
    linkedin: 'https://www.linkedin.com/in/george-zaharia-b8a155153/' // Update with actual LinkedIn URL
  },
  {
    image: '/bogdan.png',
    name: 'Bogdan Lazar',
    role: 'LLM Engineer',
    tags: ['Software', 'Engineer'],
    linkedin: 'https://www.linkedin.com/in/bogdan-lazar-0b5427195/' // Update with actual LinkedIn URL
  }
];

export default function Team() {
  return (
    <section className="bg-[var(--accent-orange)]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-14">
        <div className="grid gap-y-6 gap-x-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {teamMembers.map((member, index) => {
            // Check if item is last in row for each breakpoint
            const isLastInRow2Col = (index + 1) % 2 === 0;
            const isLastInRow3Col = (index + 1) % 3 === 0;
            const isLastInRow5Col = (index + 1) % 5 === 0;

            // Build className string
            const baseClasses = 'pl-6 pr-6 text-black flex flex-col items-center text-center h-full sm:border-r sm:border-black/20';
            const responsiveClasses = [
              isLastInRow2Col && !isLastInRow3Col ? 'sm:border-r-0 lg:border-r' : '',
              isLastInRow2Col && isLastInRow3Col ? 'sm:border-r-0' : '',
              isLastInRow3Col && !isLastInRow5Col ? 'lg:border-r-0 xl:border-r' : '',
              isLastInRow3Col && isLastInRow5Col ? 'lg:border-r-0' : '',
              isLastInRow5Col ? 'xl:border-r-0' : '',
            ].filter(Boolean).join(' ');

            return (
              <div
                key={index}
                className={`${baseClasses} ${responsiveClasses}`.trim()}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 object-contain mb-4"
                />
                <h3 className="text-lg font-semibold text-black">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-black mt-1">
                  {member.role}
                </p>
                <p className="text-xs text-black mt-1 mb-4">
                  ({member.tags.join(', ')})
                </p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2 text-sm font-medium text-[var(--accent-orange)] hover:bg-zinc-900 transition-colors mt-auto"
                >
                  <Linkedin className="h-4 w-4 text-[var(--accent-orange)]" />
                  LinkedIn
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
