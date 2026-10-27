import Shell from './Shell';
import Hero from './Hero';
import Problems from './Problems';
import Products from './Products';
import Stories from './Stories';
import Deployments from './Deployments';
import ContactBand from './ContactBand';
import ProductPanel from './ProductPanel';

// The solution template: hero, problems answered, products used, who runs it, where it runs, contact.
export default function SolutionPage({ s, k, visual, secondary, children }) {
  const location = `solutions_${k}`;
  return (
    <Shell>
      <Hero label={s.label} h1={s.h1} sub={s.sub} trust={s.trust} secondary={secondary} location={location}
        visual={visual && <ProductPanel k={visual} />} />
      <Problems items={s.problems} />
      <Products keys={s.products} />
      <Stories keys={s.stories || [s.story]} location={location} />
      {children}
      <Deployments />
      <ContactBand location={location} />
    </Shell>
  );
}
