import React from 'react';
import ModelCard from './ModelCard';

const models = {
  "Outside-In": [
    {
      title: "External Startup",
      intro: "Strategic partnerships with independent startups to access innovation.",
      details: "In this model, corporations engage with startups that operate independently – typically through strategic alliances, co-development projects, or pilot initiatives. The startup remains an autonomous entity and brings in external expertise, technologies, or market insights.\n\nThis setup allows corporates to respond quickly to changes in the market without large internal investments or long-term commitments.\n\nThese partnerships are often used to fill innovation gaps or test new ideas without disrupting the existing business.\n\n🔍 Value: Flexible access to external innovation, with minimal integration and fast implementation potential."
    },
    {
      title: "Incubator",
      intro: "Providing infrastructure and support to nurture early-stage external startups.",
      details: "Corporate incubators offer selected startups office space, labs, funding, coaching, and access to experts and corporate networks. The startups remain external but benefit from the corporate’s infrastructure and experience.\n\nThe incubator serves as a bridge, enabling startups to grow while aligning with potential strategic interests of the company.\n\nAlthough the startups are not obligated to collaborate with the corporation, many incubators are designed to foster long-term relationships or even co-innovation.\n\n🔍 Value: Early access to emerging technologies and talent, while supporting startup growth in a controlled environment."
    },
    {
      title: "Accelerator",
      intro: "Time-limited programs to fast-track external startups toward scalability and corporate collaboration.",
      details: "Accelerators are intensive programs that typically run for several weeks or months, offering mentorship, technical guidance, funding opportunities, and access to business units.\n\nThey are designed to refine a startup's product-market fit and prepare for potential cooperation or investment.\n\nCorporates benefit by scouting, testing, and co-developing innovative solutions with high-growth potential startups. The model fosters visibility and brand positioning in the startup ecosystem.\n\n🔍 Value: Fast-track innovation sourcing, opportunity for early collaboration, and insights into startup trends."
    },
    {
      title: "Startup Program",
      intro: "Flexible, open programs to connect with startups and provide corporate support.",
      details: "Startup programs are ongoing or campaign-based initiatives in which startups receive benefits like discounted services, cloud credits, mentorship, or networking access.\n\nThe primary goal is to attract high-potential startups and build loyalty early in their lifecycle. Many such programs use “freemium” or benefit-based incentives to create long-term engagement.\n\nThese programs are also useful for corporations to better understand startup needs and align their offering accordingly.\n\n🔍 Value: Strategic relationship-building and brand positioning without long-term contractual obligations."
    },
    {
      title: "Venture Client",
      intro: "Acting as a paying customer of a startup rather than an investor.",
      details: "In the Venture Client model, the corporate company becomes an early user or buyer of a startup’s product or service. There is no need for equity investment – the value lies in gaining immediate access to innovation and solving concrete business challenges.\n\nBy validating startup solutions in real-world environments, corporations reduce innovation risk and can co-shape solutions to fit their needs. This model also provides startups with credibility and revenue early on.\n\n🔍 Value: Low-risk, high-impact access to startup solutions with strong potential for mutual growth and scale."
    }
  ],
  "Inside-Out": [
    {
      title: "Innovation Lab & Incubation",
      intro: "Dedicated internal units to develop new ideas, technologies, and business models.",
      details: "Innovation labs serve as internal playgrounds for experimentation, where teams work in a focused, low-risk environment. These units often operate independently from day-to-day business processes and are designed to develop early-stage prototypes, test new technologies, or explore customer-centric innovations. The approach combines structured ideation with iterative experimentation.\n\nLabs can also take the form of incubators, where corporate employees or selected innovators develop ideas into validated concepts or minimal viable products (MVPs). The emphasis is often on short development cycles, direct user feedback, and fast iteration.\n\n🔍 Value: Creates space for disruptive thinking and customer-driven innovation that would be difficult to pursue in traditional structures."
    },
    {
      title: "Excubation Program",
      intro: "Spin-off approach where internal teams build new ventures outside of corporate boundaries.",
      details: "Excubation means deliberately taking internal innovation projects outside the company structure, often by setting up a new legal entity or using external structures to develop them independently. This allows teams to work without being hindered by internal policies, hierarchies, or compliance rules.\n\nThe goal is to preserve the agility, risk-taking, and speed of a startup environment while leveraging internal knowledge and expertise. In many cases, excubation programs are aligned with corporate R&D or strategy units and follow a clearly defined process to evaluate when and how internal innovations should be externalized.\n\n🔍 Value: Combines the strengths of corporate innovation with the freedom of entrepreneurial execution – ideal for high-risk or market-disruptive ideas."
    },
    {
      title: "Corporate Startup",
      intro: "A company-founded startup created to pursue new business beyond the core.",
      details: "Corporate startups are newly created ventures initiated and owned by the parent company. They operate like startups in structure and culture but are often strategically aligned with long-term corporate goals. These entities are designed to address new customer segments, test novel business models, or commercialize internal technologies.\n\nCorporate startups can have their own team, management, branding, and decision-making processes. They are sometimes incubated internally and later turned into fully independent units.\n\n🔍 Value: Enables the company to strategically enter new markets or domains while managing risks and maintaining ownership over the innovation."
    },
    {
      title: "Venture Building",
      intro: "Structured process to build multiple internal ventures, often in collaboration with external partners.",
      details: "Venture building involves systematically creating and scaling several new startups within the corporate context. It may be run internally or with the help of external venture builders (agencies or studios). The focus is on identifying opportunity spaces, assembling entrepreneurial teams, and developing viable startups in alignment with strategic corporate goals.\n\nEach venture is supported with shared services (HR, legal, IT), frameworks, and funding. This allows ideas to scale more effectively while benefiting from startup autonomy and speed.\n\n🔍 Value: Builds a portfolio of innovation initiatives, increases experimentation capacity, and reduces the cost of failure by sharing resources and knowledge."
    },
    {
      title: "Intrapreneurship",
      intro: "Encouraging employees to act as entrepreneurs within the company.",
      details: "Intrapreneurship programs empower employees to develop their own ideas into business concepts with corporate support. This often includes dedicated time (e.g., innovation sprints), access to resources, coaching, and seed funding. Selected ideas go through validation phases and can later become corporate startups, spin-offs, or new internal business units.\n\nIntrapreneurs work with a high level of ownership and accountability, and often follow lean startup or agile methods.\n\nBeyond business impact, intrapreneurship boosts company culture, retention, and employee motivation by creating a sense of purpose and creative freedom.\n\n🔍 Value: Unlocks internal talent potential and fosters an innovation-driven culture across departments and hierarchies."
    }
  ]
};

function Models({ onNavigate }) {
  return (
    <main className="main-content">
      <h2>Corporate Startup Models</h2>

      <section>
        <h3>Outside-In Models</h3>
        <p className="model-category-intro">
          Focus: Tapping into external startup ecosystems to accelerate corporate innovation.<br />
          Outside-In models enable established companies to benefit from the agility, creativity, and speed of external startups. These collaborations range from light-touch programs to deeper strategic partnerships and help corporates quickly explore new technologies, trends, and business models without having to build everything in-house.
        </p>
        <div className="model-grid">
          {models["Outside-In"].map((model) => (
            <ModelCard
              key={model.title}
              title={model.title}
              intro={model.intro}
              details={model.details}
            />
          ))}
        </div>
      </section>

      <section>
        <h3>Inside-Out Models</h3>
        <p className="model-category-intro">
          Focus: Building internal startup structures to explore innovations beyond the corporate core.<br />
          Inside-Out models are used when companies want to drive innovation from within. These models allow employees or internal teams to develop ideas into new ventures while maintaining varying degrees of independence. The goal is to test, validate, and scale innovations that do not fit the existing structures or strategies of the core business.
        </p>
        <div className="model-grid">
          {models["Inside-Out"].map((model) => (
            <ModelCard
              key={model.title}
              title={model.title}
              intro={model.intro}
              details={model.details}
            />
          ))}
        </div>
      </section>

      <button className="start-button" onClick={() => onNavigate('landing')}>
        Back
      </button>
    </main>
  );
}

export default Models;