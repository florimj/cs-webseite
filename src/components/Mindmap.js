import React, { useState, useEffect, useCallback, useRef } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  Controls,
} from 'reactflow';
import 'reactflow/dist/style.css';

const nodeDetails = {
  //Dimensionen
  '2': 'Processes & Operations: This dimension deals with the specific organisation of the operational processes and control mechanisms of a corporate startup. The focus here is on the regulations and processes that determine how the startup operates in day-to-day business, how decisions are made, how resources are provided and what criteria are used to evaluate success. The design of these processes has a significant influence on whether a startup can work efficiently and agilely or whether it is restricted by internal company structures. A high degree of process autonomy can increase the speed of innovation, while a more regulated approach ensures strategic control by the parent company. The challenge of this dimension lies in creating a balance between operational freedom and internal corporate control.',
  '3': 'Structures: The Structures dimension describes the fundamental formal anchoring of a corporate startup within the parent company. It includes decisions on the legal and organisational structure, the spatial allocation and the external appearance of the startup. The focus here is on the extent to which a corporate startup is separated or integrated from the existing company. Structural framework conditions such as the choice of location, the degree of legal independence or the proximity to the group organisation have a major influence on the operational freedom and perception of the startup - both internally and externally. This dimension therefore lays the foundation for how independently a corporate startup can operate and how closely it remains connected to the company.',
  '4': 'Relational Mechanisms: The Relational Mechanisms dimension refers to the way in which the corporate startup and the parent company work together on a cultural and interpersonal level. It includes the quality of communication, building trust, understanding shared values and dealing with cultural differences. While formal structures and processes create a framework, it is often these soft factors that determine the success or failure of the collaboration. An open, trusting relationship between the players involved makes it possible to reduce tensions, avoid conflicts and utilise synergies effectively. This dimension is particularly relevant in order to create a cooperative environment in which the start-up can act independently without losing contact with the corporate world.',
  '5': 'Autonomy is a key principle in the governance of corporate startups. It refers to the degree of independence granted to the startup unit from the parent corporation in terms of decision-making, operations, branding, and resource control. The more autonomy a corporate startup has, the more it can act like a traditional entrepreneurial venture—flexible, fast, and innovative. However, full autonomy can also lead to disconnection from corporate support structures and strategic goals. Striking the right balance is essential: too much control from the corporate side can stifle innovation and agility, while too much freedom may result in misalignment or inefficient use of corporate resources. Governance mechanisms are therefore used to shape this relationship—defining boundaries, enabling collaboration, and clarifying roles. In practice, autonomy is not binary, but exists on a spectrum. Some corporate startups operate as fully independent entities with their own legal structure and brand, while others remain tightly integrated with corporate functions but are given operational flexibility. The right level of autonomy depends on the goals of the initiative, the maturity of the startup, and the strategic priorities of the parent company. Ultimately, well-designed governance must empower startups to innovate, while maintaining enough oversight to ensure value creation for the corporate sponsor.',
  
  //Mechanismen
  '6': 'Services & Resources: This mechanism defines how corporate startups gain access to operational support and infrastructure. The extent and mode of service provision, from full integration into internal systems to minimal or externalized support, directly impacts startup autonomy, speed, and resource availability. Designing service access carefully ensures that startups receive the right level of support without being overwhelmed by corporate bureaucracy or under-equipped for execution.',
  '7': 'Structured Program: Structured programs define the framework, rhythm, and intensity of how startups are supported within corporate innovation initiatives. These can range from highly guided accelerator formats to flexible, open-access offerings. The choice of program structure determines the degree of standardization, individual coaching, speed of progress, and strategic alignment. A well-designed structure helps guide startups through growth phases while maintaining flexibility to adapt to different needs and maturity levels.',
  '8': 'Decision Processes: This mechanism defines how strategic and operational decisions are made within corporate startup structures. From centralized, board-involved gates to decentralized autonomy or hybrid approval models, decision-making processes shape the speed, flexibility, and control in innovation initiatives. Clear processes can safeguard compliance and alignment, while flexible structures enable fast iteration and experimentation. The chosen model should reflect the balance between innovation freedom and corporate governance expectations.',
  '9': 'Metrics: The metric system defines how corporate startups are evaluated and what constitutes success from the parent company’s perspective. Clear success definitions and measurement standards help align expectations and avoid misjudging startup progress. However, overly rigid KPIs may hinder innovation or fail to capture the true value of early-stage ventures. The choice of approach, defined KPIs, custom metrics, or open-ended evaluation affects transparency, objectivity, and the credibility of innovation efforts.',
  '10': 'Contracting & Policy: This mechanism governs the legal and procedural rules under which startups collaborate with the corporation. These include contractual terms, compliance requirements, administrative processes, and ownership structures. The chosen approach influences how accessible and attractive the program is for startups, and how much autonomy they retain. A well-balanced policy environment helps manage risk while enabling innovation and protecting startup agility.',
  '11': 'Entity: The entity mechanism defines the legal and ownership structure of a corporate startup. It is one of the most fundamental choices in corporate startup design and directly affects the startup’s structural autonomy. Whether a startup is fully owned, partially owned, or merely supported through soft structures (like coaching), determines how independently it can act, how closely it is tied to the corporate, and how governance is implemented. Choosing the right entity helps balance strategic alignment, agility, and risk exposure and strongly depends on the parent company’s innovation strategy and desired level of control.',
  '12': 'Corporate Management: This mechanism describes how the parent company engages with the corporate startup from a management and control perspective. The intensity of corporate involvement can vary, from light-touch governance in minority stakes to active co-management in majority setups. The right degree of involvement depends on the startup’s maturity, the parent company’s innovation goals, and the level of autonomy intended. Choosing the right approach allows companies to provide guidance, ensure compliance, and support strategic alignment, without suppressing entrepreneurial freedom.',
  '13': 'Program Management: This mechanism refers to the organizational anchoring of innovation support within the corporate structure. It defines how startup activities or internal innovation initiatives are managed, coordinated, and scaled. A dedicated program can range from fully independent units like accelerators or incubators to integrated functions within existing departments such as Business Development or Open Innovation. The chosen setup influences speed, autonomy, synergies, and the potential for scaling successful innovations. An effective program management structure acts as a bridge between entrepreneurial initiatives and corporate strategy, balancing flexibility with operational feasibility.',
  '14': 'Location: The physical setup of a corporate startup is a key factor influencing its autonomy, innovation culture, and collaboration potential. Whether the startup is co-located with the parent company, placed in a dedicated space, integrated into external innovation ecosystems, or operates virtually, each model offers different degrees of control, integration, agility, and resource access. The location decision shapes daily workflows, culture building, access to talent, and how closely the startup remains aligned with the corporation’s strategic core.',
  '15': 'Branding: Branding determines how a corporate startup is positioned in the market and perceived by customers, partners, and investors. It reflects the strategic decision of whether to leverage the parent company’s established reputation, build an independent identity, or apply a hybrid approach. Branding has strong implications for market access, credibility, autonomy, and marketing freedom. The chosen model must align with the startup’s goals, target audience, and the level of strategic affiliation intended with the corporate brand.',
  '16': 'Collaboration & Communication: This mechanism refers to how corporate startups and parent organizations interact on a day-to-day level, both formally and informally. Effective collaboration fosters trust, accelerates decision-making, and supports autonomy. Depending on the chosen setup, ranging from informal working styles to formal responsibility matrices, the partnership can either empower startups or constrain them. Clear communication structures and mutual understanding are key to long-term success.',
  '17': 'Interplay & Networking: This mechanism focuses on how corporate startups are connected to internal and external ecosystems. It includes activities such as scouting, matchmaking, incubator collaboration, and marketing support. The goal is to broaden the innovation horizon, open access to industry-specific expertise, and provide platforms that strengthen visibility and strategic partnerships. Efficient networking increases chances of success, but also requires clarity, resources, and balanced access.',
  '18': 'Roles: This mechanism defines the key roles and responsibilities assigned to support startups during their collaboration with the corporation. Dedicated contact persons, structured feedback routines, and interdisciplinary teams all shape the startup experience. Clear role allocation fosters trust, continuity, and guidance, while too much centralization or lack of diversity in perspectives may hinder innovation or autonomy.',
  '19': 'Values & Culture: This mechanism refers to the underlying beliefs, behaviors, and norms that shape how startups and corporates interact. Culture affects autonomy, collaboration, motivation, and innovation. While startups benefit from flexibility and entrepreneurial spirit, aligning or clashing with corporate values can significantly impact success. The challenge lies in managing cultural integration without compromising startup identity or agility.',

  //Auswahlmöglichkeiten
  '1001': 'Full Integration: The startup is embedded into the parent company’s infrastructure and gains access to all internal services, including IT, HR, procurement, legal, and engineering support. A centralized interface often coordinates the support flow.\n\n✔️ Broad access to in-house experts and tools\n✔️ Cost-effective use of existing resources\n✔️ Accelerated development through expert support\n✔️ Strong synergy and knowledge exchange\n⚠️ Corporate processes may slow down innovation\n⚠️ Reduced startup autonomy\n⚠️ Competition with internal projects for attention\n⚠️ Risk of dependency on corporate systems',
  '1002': 'Selective Access: Startups receive tailored access to specific corporate resources—negotiated based on project needs. This hybrid model combines flexibility with strategic support.\n\n✔️ Targeted, efficient use of internal services\n✔️ Less exposure to full corporate bureaucracy\n✔️ Adaptive support based on project phase\n✔️ Reduces overload on corporate departments\n⚠️ Partial access may miss critical capabilities\n⚠️ Requires ongoing coordination and negotiation\n⚠️ Risk of inequality between startups\n⚠️ Complexity in defining and managing access rules',
  '1003': 'External Support: Operational services are outsourced to accelerators or third-party providers. These partners offer professional, startup focused support outside of the corporation’s infrastructure.\n\n✔️ Specialized, startup-tailored expertise\n✔️ Saves internal resources and bandwidth\n✔️ Scalable for multiple startups\n✔️ Immediate access to external talent and networks\n⚠️ Higher cost due to outsourcing\n⚠️ Less control over processes and quality\n⚠️ Little or no internal knowledge transfer\n⚠️ Cultural gaps between partner and corporation may arise',
  '1004': 'Minimal Support: The startup operates mostly independently, with only basic financial or advisory input from the corporation. There is no structured access to internal services.\n\n✔️ High degree of independence and cultural freedom\n✔️ Low administrative overhead\n✔️ Fast decision-making and lean operations\n✔️ Reduces operational risks for the corporation\n⚠️ Startups may lack critical support to scale\n⚠️ No synergies or knowledge transfer with the corporate\n⚠️ Higher risk of failure due to limited resources\n⚠️ Little strategic influence from the parent company',
  '1005': 'Accelerator Program: Intensive, time-bound formats (typically 3–6 months) that provide startups with daily mentoring, workshops, and structured milestones. Focus is on rapid validation and scaling.\n\n✔️ Strong guidance through daily touchpoints and expert sessions\n✔️ Fast learning through structured modules and feedback loops\n✔️ Valuable networking with internal and external experts\n✔️ Clear progress tracking via milestone frameworks\n⚠️ High commitment required from startups and internal staff\n⚠️ Resource-intensive due to mentor involvement\n⚠️ Not suitable for all maturity stages\n⚠️ Risk of early dropout for underperforming teams',
  '1006': 'Entrepreneurship Program: Modular formats that run over longer periods and cover different development stages of startups. Workshops and trainings are offered flexibly and aligned with startup needs.\n\n✔️ Adaptable modules to match specific needs\n✔️ Continuous access to corporate expertise\n✔️ Long-term support without daily obligations\n✔️ Strong emphasis on practical application and methodology\n⚠️ Slower development pace compared to accelerators\n⚠️ Internal resource commitment required over time\n⚠️ High planning effort to coordinate content\n⚠️ Varying outcomes depending on startup engagement',
  '1007': 'Incubation Program: Long-term support model (e.g. 2+1 years) offering infrastructure, mentoring, and strategic integration over several years. Focus is on deep development and organizational embedding.\n\n✔️ Stable, long-term environment for innovation\n✔️ Time to mature complex solutions\n✔️ Gradual integration into the corporate ecosystem\n✔️ Strategic relationships for sustainable growth\n⚠️ Slow go-to-market process\n⚠️ High cost and organizational effort\n⚠️ Limited capacity for simultaneous participants\n⚠️ Risk of “blocking” space if progress is slow',
  '1008': 'Open Program: Flexible, low-threshold offerings like speaker series, roundtables, and community events. Startups can join activities as needed, without formal enrollment or structure.\n\n✔️ Easy access without binding commitments\n✔️ Exposure to knowledge, industry trends, and best practices\n✔️ Scalable to large groups of participants\n✔️ Strong potential for networking and visibility\n⚠️ Limited influence on startup development\n⚠️ No tailored support or coaching\n⚠️ Risk of low engagement and impact\n⚠️ Lack of structure may reduce learning outcomes',
  '1009': 'Gate Process: A structured, multi-phase decision model involving various stakeholders, including business units, management, and the board. Projects must pass defined milestones to advance to the next stage.\n\n✔️ Structured validation of ideas and results\n✔️ Risk mitigation through comprehensive evaluation\n✔️ Early involvement of key departments ensures alignment\n✔️ Regulatory compliance is ensured from the beginning\n⚠️ Time-consuming and bureaucratic\n⚠️ High complexity with many decision-makers\n⚠️ Risk of blocking disruptive or unconventional ideas\n⚠️ Delays due to cascading approvals in other departments',
  '1010': 'Decentralized Decisions: Teams or departments are empowered to make most decisions independently. Only major investments require approval from higher management levels.\n\n✔️ High speed and agility in decision-making\n✔️ Promotes ownership and responsibility in teams\n✔️ Encourages experimentation and innovation\n✔️ Reduces overhead and formal approval chains\n⚠️ Lower central oversight may increase risks\n⚠️ Coordination issues across departments\n⚠️ Limited scalability of large projects\n⚠️ Potential resource inefficiencies without centralized planning',
  '1011': 'Hybrid Model: Combines autonomy with oversight. Startups act independently within defined budget limits; major decisions require central approval (e.g., board, investment committees).\n\n✔️ Balanced mix of flexibility and control\n✔️ Efficient handling of small- to mid-size decisions\n✔️ Budget caps provide safeguards against excessive risk\n✔️ Promotes structured, yet adaptive governance\n⚠️ Unclear boundaries may lead to confusion\n⚠️ Bureaucracy persists for large-scale initiatives\n⚠️ Budget limits can restrict project execution\n⚠️ Potential lack of transparency across decision tiers',
  '1012': 'PoC Decision: Startups initiate with a proof of concept (PoC), and only after success is further funding and development approved. Close collaboration with business units is typical.\n\n✔️ Mitigates risk through step-by-step validation\n✔️ Enables agile iterations and early feedback\n✔️ Efficient resource allocation based on results\n✔️ Flexibility to terminate or pivot without major losses\n⚠️ Slower total project timelines due to staged approvals\n⚠️ Small PoC budgets may delay or limit innovation\n⚠️ Projects must show early success to continue\n⚠️ Evaluation criteria may differ across departments',
  '1013': 'Success Definition: Corporate startups are assessed either through predefined KPIs or through case specific, flexible criteria. Some organizations avoid strict metrics to preserve innovation freedom, while others emphasize tailored, co-developed success indicators.\n\n✔️ Allows customized definitions aligned with each startup’s context\n✔️ Encourages exploration without fear of rigid targets\n✔️ Co-developed metrics foster mutual understanding and trust\n⚠️ Lack of measurement structures can hinder accountability\n⚠️ Risk of “impact washing” if outcomes aren’t evaluated\n⚠️ Objectivity may decline over time without performance focus',
  '1014': 'Strict Conditions: Startups must adhere to clearly defined rules covering compliance, data security, and legal standards. These conditions are typically geared toward mature startups and can include supplemental contracts.\n\n✔️ Ensures regulatory compliance and legal clarity\n✔️ Strengthens corporate reputation and accountability\n✔️ Creates transparency for all parties involved\n⚠️ May discourage early-stage or unconventional startups\n⚠️ Slows down innovation through bureaucracy\n⚠️ Can reduce autonomy and increase dependency on the corporation',
  '1015': 'Flexible Processes: Lightweight contracts and simplified processes support faster collaboration. Examples include shorter payment cycles and the omission of standard procurement rules.\n\n✔️ Accelerates decision-making and startup integration\n✔️ Reduces barriers to entry and administrative burden\n✔️ Strengthens startup autonomy through tailored agreements\n⚠️ Lack of structure may lead to uncertainty or legal risk\n⚠️ Over-flexibility could weaken governance and oversight\n⚠️ Requires experienced program managers to balance risk and freedom',
  '1016': 'Separate Entity: The startup is legally and organizationally separated from the corporation, typically via a spin-off. A dedicated contract regulates HR, finance, and operations independently.\n\n✔️ Maximizes legal and operational autonomy\n✔️ Enables independent branding and identity\n✔️ Reduces corporate liability in case of failure\n⚠️ Risk of isolation from corporate resources and strategy\n⚠️ Less visible support from the parent company\n⚠️ May lead to conflicting goals between startup and corporation',
  '1017': 'Rules by Program Management: The program unit acts as a buffer between startups and corporate rules, navigating legal, administrative, and organizational hurdles on the startup’s behalf.\n\n✔️ Protects startup autonomy from excessive corporate influence\n✔️ Eases access to internal systems and decision-makers\n✔️ Facilitates efficient cooperation while maintaining compliance\n⚠️ Risk of dependency on program staff for decisions\n⚠️ Difficult to maintain a balance between freedom and control\n⚠️ May limit the startup’s ability to directly negotiate own terms',
  '1018': 'Ownership Structure: The capital and equity structure is defined based on strategic goals. Often, founders receive majority shares while the corporation retains a minority stake with optional future divestment.\n\n✔️ Flexible ownership enables founder-driven development\n✔️ Minority stakes ensure strategic alignment without overreach\n✔️ Balances influence, investment, and independence\n⚠️ May still lead to loss of corporate control\n⚠️ Complex equity setups could complicate governance\n⚠️ External investor involvement may shift strategic priorities',
  '1019': 'Minority Stakes: The corporation holds a small ownership share (typically under 25%) and receives regular updates, but has no influence over operational decisions. The startup retains full autonomy.\n\n✔️ Encourages creativity and entrepreneurial independence\n✔️ Maintains full decision-making power for the startup\n✔️ Low overhead and minimal bureaucracy\n⚠️ No direct control over the startup’s direction\n⚠️ Higher strategic risk if reporting is weak\n⚠️ Relies on trust and transparent communication',
  '1020': 'Wholly-Owned Subsidiary: The startup is fully owned by the corporate parent and legally registered as a separate entity (e.g. GmbH), often led by internal corporate staff. While it retains legal independence, it is strategically and operationally integrated.\n\n✔️ Full control over strategy, hiring, and operations\n✔️ Easy integration into corporate systems and infrastructure\n✔️ High investor security and clear legal framework\n⚠️ High administrative and legal overhead\n⚠️ Startup loses agility and might adapt corporate behavior\n⚠️ Innovation speed may be reduced by internal processes',
  '1021': 'Virtual Participation: No formal equity stake is taken. Instead, the corporation supports the startup with coaching, mentoring, and access to internal resources. Over time, support is reduced as the startup becomes more independent.\n\n✔️ Very low financial risk for the corporation\n✔️ Supports exploration and experimentation\n✔️ Facilitates knowledge and ecosystem transfer\n⚠️ No direct strategic influence\n⚠️ Risk of inconsistent support if roles aren’t defined\n⚠️ Startup may outgrow corporate interest quickly',
  '1022': 'Spin-Off: A validated internal idea or team is spun off as a separate startup. Strategic investors are brought in, while the corporation keeps a minority stake (e.g. 24.9%) to retain long-term involvement.\n\n✔️ Access to external capital markets\n✔️ Brings in new expertise through strategic partners\n✔️ Allows rapid scaling with reduced corporate constraints\n⚠️ Legal and financial setup is complex\n⚠️ Influence decreases with investor entry\n⚠️ Tension between strategic interest and investor-driven growth may occur',
  '1023': 'Joint Venture: The startup is co-founded and co-owned by the corporation and one or more external partners. Both parties contribute capital, resources, and management responsibilities.\n\n✔️ Combines complementary strengths and networks\n✔️ Shared risk and cost reduces pressure on any single party\n✔️ Balanced structure promotes collaboration and knowledge exchange\n⚠️ Governance is complex, partners may have conflicting goals\n⚠️ Influence depends on equity split and agreed leadership model\n⚠️ Success requires ongoing alignment and clear communication',
  '1024': 'Minority Stake with Governance: The corporation holds a minority share (typically <25%) and takes on a governance role. This includes annual reporting oversight, financial coaching, and compliance monitoring, without intervening in daily operations.\n\n✔️ Low resource commitment and minimal interference\n✔️ High startup autonomy in day-to-day execution\n✔️ Strategic steering without micromanagement\n⚠️ Limited control in critical phases\n⚠️ Risk if startup lacks financial/legal expertise',
  '1025': 'Majority Stake with Support: The corporation holds a majority share (>25%) and actively supports the startup’s management. This includes operational collaboration, regular performance reviews, and help with financing and scaling.\n\n✔️ Stronger influence on strategic direction\n✔️ Tailored support in key operational areas\n✔️ Improved integration and synergy potential\n⚠️ Higher internal workload and coordination effort\n⚠️ Risk of over-dependence and reduced agility',
  '1026': 'Spin-Off with Partners: The startup is spun off with strategic partners involved. The corporation remains a minority shareholder, while external investors contribute funding and expertise. Focus is on market readiness and long-term growth.\n\n✔️ New capital and strategic networks\n✔️ High flexibility and independent growth path\n✔️ Leverage of external expertise and speed\n⚠️ Complex legal and organizational setup\n⚠️ Reduced influence on future development',
  '1027': 'Internal Secondments: Corporate employees are temporarily assigned to the startup to support key functions or share expertise. This is often complemented by financial or infrastructural support.\n\n✔️ Direct access to corporate knowledge and skills\n✔️ Flexible and needs-based support model\n⚠️ Startup may adapt corporate thinking unintentionally\n⚠️ Dependency on internal resources limits autonomy',
  '1028': 'Independent Unit (Inkubator/Accelerator): A separate legal entity or internal unit is established to manage innovation programs independently from the core business. This model enables fast iteration, market proximity, and protection from corporate constraints.\n\n✔️ High autonomy and fast decision-making\n✔️ Agile prototyping and experimentation\n✔️ Strong focus on external market needs\n✔️ Avoids corporate bureaucracy (e.g., IT, procurement, HR)\n⚠️ High setup and operational cost\n⚠️ Weak integration into the parent company’s strategy\n⚠️ Risk of isolation from core teams\n⚠️ Difficulties in transferring successful results back into the business',
  '1029': 'Integration into Corporate Divisions: The innovation program is embedded into existing departments like Business Development or Open Innovation. Startups or internal teams work within corporate processes and infrastructures.\n\n✔️ Synergies with internal experts and departments\n✔️ Easier transfer into core business\n✔️ Cost-efficient use of existing systems\n✔️ Stronger support from internal stakeholders\n⚠️ Limited autonomy and innovation freedom\n⚠️ Slower processes due to internal bureaucracy\n⚠️ Competition for resources with ongoing projects\n⚠️ Risk of resistance against radical or disruptive ideas',
  '1030': 'Network-Based Support: The program management acts as a facilitator, providing startups with access to corporate networks, clients, and markets, without direct financial investment or operational involvement. Focus lies on co-innovation and partnerships.\n\n✔️ Low-cost model with minimal corporate overhead\n✔️ Startups operate independently\n✔️ Access to corporate ecosystem and contacts\n✔️ Flexible and scalable support function\n⚠️ Little control over startup direction and outcomes\n⚠️ No direct funding or resource allocation\n⚠️ Limited ability to integrate successful ideas\n⚠️ Risk of losing promising startups to competitors or external investors',
  '1031': 'PoC Projects: Innovations are tested through time-limited pilot phases, accompanied by the program team. Projects are validated based on clear KPIs before decisions on continuation or scaling are made.\n\n✔️ Practical testing under real conditions\n✔️ Risk mitigation through phased approach\n✔️ Fast iterations and adaptation\n✔️ Measurable evaluation criteria (e.g., KPIs)\n⚠️ Integration into the core business can be slow\n⚠️ Requires strong coordination between units\n⚠️ Risk of project discontinuation after testing\n⚠️ Ties up internal resources during pilot phase',
  '1032': 'Headquarter Location: The corporate startup is located within the parent company’s offices. It benefits from shared infrastructure and direct access to business units, but may be more tightly controlled.\n\n✔️ Immediate access to corporate resources and infrastructure\n✔️ Strong alignment with corporate strategy and objectives\n✔️ Lower costs through shared facilities\n⚠️ Lower autonomy due to closer supervision\n⚠️ Potential bureaucratic hurdles limiting agility\n⚠️ Risk of adopting corporate habits and losing startup spirit',
  '1033': 'Separate Location: Startups are placed in distinct office spaces, often within innovation districts or startup hubs. This setup fosters independence and a startup specific working culture.\n\n✔️ Encourages creativity and innovation away from legacy structures\n✔️ Strengthens external perception as an independent entity\n✔️ More attractive to startup-minded talent\n⚠️ Higher rental and operational costs in prime locations\n⚠️ Less spontaneous collaboration with corporate units\n⚠️ Potential disconnect from strategic corporate priorities',
  '1034': 'Ecosystem Location: The startup is embedded in a broader innovation ecosystem, such as an accelerator, venture hub, or university cluster. The environment provides access to mentoring, networking, and startup support services.\n\n✔️ Proximity to innovation partners, mentors, and investors\n✔️ Exposure to dynamic ecosystems and cutting-edge trends\n✔️ Faster learning curves through shared knowledge and events\n⚠️ Limited control due to external program rules and constraints\n⚠️ Possible dilution of corporate identity\n⚠️ Dependency on ecosystem access and program continuity',
  '1035': 'Virtual Location: The startup operates remotely or through a decentralized team, leveraging digital tools and platforms. This setup offers maximum flexibility and cost efficiency.\n\n✔️ High flexibility in team composition and location\n✔️ Lower operational costs without physical infrastructure\n✔️ Enables global talent access and remote-first culture\n⚠️ Harder to build cohesive team culture\n⚠️ Challenges in collaboration and decision-making\n⚠️ Reduced visibility and connection to corporate HQ and networks',
  '1036': 'Corporate Branding: The startup uses the parent company’s brand identity to signal trust, quality, and credibility. It benefits from the reputation and reach of the established corporate brand.\n\n✔️ Immediate credibility and customer trust\n✔️ Easier access to markets and B2B networks\n✔️ Reinforces affiliation with corporate standards\n⚠️ Must comply with corporate branding policies and guidelines\n⚠️ Limited flexibility in creative expression\n⚠️ Reputation risks if the parent brand faces negative publicity',
  '1037': 'Independent Branding: The startup develops and operates under its own brand, detached from the parent company. This allows a unique positioning in the market.\n\n✔️ Full creative freedom to target niche audiences\n✔️ Encourages innovation without corporate identity constraints\n✔️ More authentic startup appearance for talent and partners\n⚠️ No initial brand recognition or trust transfer\n⚠️ Requires time and resources to build brand awareness\n⚠️ Potential mistrust from customers unfamiliar with the new brand',
  '1038': 'Co-Branding: The startup appears with a combined identity that includes both its own and the corporate brand. This hybrid strategy aims to combine startup innovation with corporate credibility.\n\n✔️ Balanced perception of agility and reliability\n✔️ Joint marketing efforts can reduce costs\n✔️ Leverages strengths of both brands\n⚠️ Requires careful alignment of messaging and visuals\n⚠️ Risk of brand inconsistency or confusion\n⚠️ Dependent on strong collaboration between branding teams',
  '1039': 'Flexible Branding: Depending on the market or campaign, the startup alternates between its own brand and the corporate brand. This approach allows case-by-case strategic alignment.\n\n✔️ Adaptive to different target groups or geographies\n✔️ Enables experimentation with market perception\n✔️ Combines the best of both branding worlds\n⚠️ May create confusion among stakeholders\n⚠️ Requires constant evaluation and brand strategy management\n⚠️ Complex communication planning needed',
  '1040': 'Sub-Branding: The startup is positioned as a distinct sub-brand under the corporate umbrella. It has its own identity, but remains visibly tied to the parent company.\n\n✔️ Benefits from trust in the parent brand while building own image\n✔️ Easier integration into corporate marketing infrastructure\n✔️ Supports faster scaling via shared resources\n⚠️ Limited branding independence\n⚠️ Strong dependency on the reputation of the umbrella brand\n⚠️ May be seen as “just another corporate initiative”',
  '1041': 'Informal Collaboration Style: Startups and corporates work together without strict structures or rules. The focus is on trust, openness, and mutual adaptability rather than rigid processes.\n\n✔️ High flexibility and individualized interaction\n✔️ Strengthens startup autonomy through low control\n✔️ Encourages creative freedom and mutual trust\n⚠️ Risk of misunderstandings due to lack of role clarity\n⚠️ Legal or organizational conflicts may arise without formal structures\n⚠️ Informality may unintentionally reduce startup protection',
  '1042': 'Clear Responsibilities: Defined roles and responsibilities (e.g., via RACI matrix) support transparent collaboration. Onboarding, feedback loops, and structured goal-setting enhance communication and autonomy.\n\n✔️ Increased transparency and accountability\n✔️ Enables independent work through role clarity\n✔️ Strengthens startup capabilities via structured feedback and onboarding\n⚠️ Overly rigid roles may reduce startup flexibility\n⚠️ Formalization could slow down creative processes',
  '1043': 'Collaborative Approaches: Mixed teams of corporate experts, departments, and startups co-create solutions. Champions often support the process and help navigate internal structures.\n\n✔️ Problem-solving through interdisciplinary cooperation\n✔️ Champions accelerate execution and protect startup interests\n✔️ Customizable collaboration intensity supports autonomy\n⚠️ Resource-intensive for both sides\n⚠️ Dependency on key individuals may undermine startup independence if not sustainable',
  '1044': 'Peer-Level Partnerships: Startups and corporates collaborate as peers. These relationships are based on mutual respect, aligned goals, and shared responsibilities, especially with experienced startups.\n\n✔️ Supports independent decision-making and agility\n✔️ Encourages efficient resource use and shared value creation\n✔️ Fosters innovation through trust-based cooperation\n⚠️ Complex coordination can increase dependencies\n⚠️ Strategic alignment must be continuously maintained to avoid drift',
  '1045': 'Scouting/Network Expansion: Corporates build broad networks via startup associations, digital innovation events, and active ecosystem participation. Flexibility and openness are key to discovering and supporting diverse innovations.\n\n✔️ Broad access to emerging technologies and talent\n✔️ Continuous exchange fosters learning and adaptation\n✔️ Increased innovation variety through wide scouting\n⚠️ Lack of structured follow-up may miss promising startups\n⚠️ Relies heavily on individual commitment\n⚠️ Intransparent selection may reduce trust',
  '1046': 'Collaboration/Incubation: Startups are connected with established corporate partners to enhance relevance and scalability. The incubator acts as a bridge, facilitating matchmaking and joint development.\n\n✔️ Boosts startup revenue and industry fit\n✔️ Encourages long-term business relationships\n✔️ Strengthens the incubator’s role in the value chain\n✔️ Drives innovation through structured collaboration\n⚠️ Requires deep understanding of partner needs and offerings\n⚠️ May increase dependency on specific corporate partners\n⚠️ Highly resource-intensive for program managers',
  '1047': 'Marketing: Corporates provide tailored marketing formats depending on the startup’s maturity. Examples include event visibility, newsletter features, and marketplace success stories. Early-stage startups may only receive basic LinkedIn exposure.\n\n✔️ Targeted use of promotional resources\n✔️ Customized support for different growth phases\n✔️ Cost control through modular offerings\n✔️ Senior mentoring for complex campaigns\n⚠️ Uneven visibility between early- and late-stage startups\n⚠️ Potential dependency on internal marketing leads\n⚠️ High management overhead\n⚠️ Limited reach for smaller or riskier ventures',
  '1048': 'Point of Contact: Startups are typically assigned a dedicated contact within incubation or innovation programs. This person supports coordination, onboarding, and problem-solving throughout the collaboration.\n\n✔️ Ensures consistency and trust through one central point of contact\n✔️ Facilitates fast access to internal resources and decision-makers\n✔️ Builds a supportive relationship with the startup team\n⚠️ Risk of bias in performance evaluation if objectivity is lost\n⚠️ Limited access to broader networks or diverse opinions\n⚠️ Overreliance on one person may hinder resilience',
  '1049': 'Exchange: Pitching and feedback opportunities are often limited to ensure enough attention for each startup. This creates focused interaction but can limit visibility for teams.\n\n✔️ Focused, high-quality feedback through reduced group sizes\n✔️ Efficient use of decision-makers’ time\n✔️ Prevents information overload during review rounds\n⚠️ Can cause frustration if teams can’t share recent progress\n⚠️ May delay critical decisions for some projects\n⚠️ Risk of misalignment between startup timing and review cadence',
  '1050': 'Interdisciplinary Teams: Corporate spin-offs are often staffed with internal employees familiar with systems, tools, and processes. These teams can operate efficiently from day one.\n\n✔️ No onboarding delay due to system familiarity\n✔️ Shared understanding of corporate context and goals\n✔️ Smooth operational handover and process continuation\n⚠️ May lack external perspectives and creative tension\n⚠️ Innovation pathways might be limited by prior experience\n⚠️ Outside-in feedback loops may be necessary to challenge the status quo',
  '1051': 'Open Culture: Startups operate with agile methods, flat hierarchies, and open feedback cultures. Entrepreneurial spirit and trust form the foundation for innovation and identity building.\n\n✔️ Promotes creativity and rapid problem-solving\n✔️ Fosters trust and team engagement\n✔️ Fast decision-making through minimal bureaucracy\n⚠️ Lack of structure may cause uncertainty\n⚠️ Employees might feel overwhelmed by self-responsibility\n⚠️ Requires strong internal communication to stay aligned',
  '1052': 'Cultural Transfer: The startup adopts elements of the parent company’s culture, including processes, values, or expectations. While this supports integration, it may reduce flexibility.\n\n✔️ Leverages tested corporate systems and standards\n✔️ Facilitates collaboration with internal departments\n✔️ Aligns values for smoother transitions and support\n⚠️ Risk of homogenization that stifles innovation\n⚠️ Cultural mismatch may cause internal resistance\n⚠️ Loss of startup identity if not balanced',
  '1053': 'Transition to Ventures: Corporate employees shifting into startup roles must adapt to agile environments. Cultural mediators like “champions” help bridge expectations and support integration.\n\n✔️ Enables transfer of expertise and networks\n✔️ Empowers autonomy through adapted corporate practices\n✔️ Facilitates mutual value creation across teams\n⚠️ Cultural frictions due to differing workstyles\n⚠️ Identity risks if startup is overly shaped by corporate logic\n⚠️ Transition needs guidance and time to succeed',
  '1054': 'Cross-Cultural Collaboration: Corporate startups and established organizations with different working cultures collaborate intentionally. Mutual learning and complementarity are core goals.\n\n✔️ Combines strategic depth with agile execution\n✔️ Encourages co-learning and mutual respect\n✔️ Supports balanced independence through complementary skills\n⚠️ Integration challenges may weaken startup autonomy\n⚠️ Cultural gaps can lead to conflict or miscommunication\n⚠️ Risk of dependence on corporate resources and routines'
};

const rawData = {
  nodes: [
    { id: '1', label: 'Governance Dimensions and their Mechanisms', children: ['2', '3', '4', '5'] },
    { id: '2', label: 'Processes & Operations', children: ['6', '7', '8', '9', '10'] },
    { id: '6', label: 'Services & Resources', children: [] },
    { id: '7', label: 'Structured Program', children: [] },
    { id: '8', label: 'Decision Processes', children: [] },
    { id: '9', label: 'Metrics', children: [] },
    { id: '10', label: 'Contracting Policy', children: [] },
    { id: '3', label: 'Structures', children: ['11', '12', '13', '14', '15'] },
    { id: '11', label: 'Entity', children: [] },
    { id: '12', label: 'Corporate Management', children: [] },
    { id: '13', label: 'Program Management', children: [] },
    { id: '14', label: 'Location', children: [] },
    { id: '15', label: 'Branding', children: [] },
    { id: '4', label: 'Relational Mechanisms', children: ['16', '17', '18', '19'] },
    { id: '16', label: 'Collaboration & Communication', children: [] },
    { id: '17', label: 'Interplay & Networking', children: [] },
    { id: '18', label: 'Roles', children: [] },
    { id: '19', label: 'Values & Culture', children: [] },
    { id: '5', label: 'Autonomy', children: [] },

    // Auswahlmöglichkeiten
    { id: "1001", label: "Full Integration", parentId: "6", children: [] },
    { id: "1002", label: "Selective Access", parentId: "6", children: [] },
    { id: "1003", label: "External Support", parentId: "6", children: [] },
    { id: "1004", label: "Minimal Support", parentId: "6", children: [] },
    { id: "1005", label: "Accelerator Programs", parentId: "7", children: [] },
    { id: "1006", label: "Entrepreneurship Programs", parentId: "7", children: [] },
    { id: "1007", label: "Incubation Programs", parentId: "7", children: [] },
    { id: "1008", label: "Open Programs", parentId: "7", children: [] },
    { id: "1009", label: "Gate Process", parentId: "8", children: [] },
    { id: "1010", label: "Decentralized Decisions", parentId: "8", children: [] },
    { id: "1011", label: "Hybrid Models", parentId: "8", children: [] },
    { id: "1012", label: "PoC Decisions", parentId: "8", children: [] },
    { id: "1013", label: "Success Definition", parentId: "9", children: [] },
    { id: "1014", label: "Strict Conditions", parentId: "10", children: [] },
    { id: "1015", label: "Flexible Processes", parentId: "10", children: [] },
    { id: "1016", label: "Separate Entity", parentId: "10", children: [] },
    { id: "1017", label: "Rules by Program Management", parentId: "10", children: [] },
    { id: "1018", label: "Ownership Structure", parentId: "10", children: [] },
    { id: "1019", label: "Minority Stakes", parentId: "11", children: [] },
    { id: "1020", label: "Wholly-Owned Subsidiary", parentId: "11", children: [] },
    { id: "1021", label: "Virtual Participation", parentId: "11", children: [] },
    { id: "1022", label: "Spin-Off", parentId: "11", children: [] },
    { id: "1023", label: "Joint Venture", parentId: "11", children: [] },
    { id: "1024", label: "Minority Stake with Governance", parentId: "12", children: [] },
    { id: "1025", label: "Majority Stake with Support", parentId: "12", children: [] },
    { id: "1026", label: "Spin-Off with Partners", parentId: "12", children: [] },
    { id: "1027", label: "Internal Secondments", parentId: "12", children: [] },
    { id: "1028", label: "Independent Unit", parentId: "13", children: [] },
    { id: "1029", label: "Integration into Corporate Divisions", parentId: "13", children: [] },
    { id: "1030", label: "Network-Based Support", parentId: "13", children: [] },
    { id: "1031", label: "PoC Projects", parentId: "13", children: [] },
    { id: "1032", label: "Headquarter Location", parentId: "14", children: [] },
    { id: "1033", label: "Separate Location", parentId: "14", children: [] },
    { id: "1034", label: "Ecosystem Location", parentId: "14", children: [] },
    { id: "1035", label: "Virtual Location", parentId: "14", children: [] },
    { id: "1036", label: "Corporate Branding", parentId: "15", children: [] },
    { id: "1037", label: "Independent Branding", parentId: "15", children: [] },
    { id: "1038", label: "Co-Branding", parentId: "15", children: [] },
    { id: "1039", label: "Flexible Branding", parentId: "15", children: [] },
    { id: "1040", label: "Sub-Branding", parentId: "15", children: [] },
    { id: "1041", label: "Informal Collaboration Style", parentId: "16", children: [] },
    { id: "1042", label: "Clear Responsibilities", parentId: "16", children: [] },
    { id: "1043", label: "Collaborative Approaches", parentId: "16", children: [] },
    { id: "1044", label: "Peer-Level Partnerships", parentId: "16", children: [] },
    { id: "1045", label: "Scouting/Network Expansion", parentId: "17", children: [] },
    { id: "1046", label: "Collaboration/Incubation", parentId: "17", children: [] },
    { id: "1047", label: "Marketing", parentId: "17", children: [] },
    { id: "1048", label: "Point of Contact", parentId: "18", children: [] },
    { id: "1049", label: "Exchange", parentId: "18", children: [] },
    { id: "1050", label: "Interdisciplinary Teams", parentId: "18", children: [] },
    { id: "1051", label: "Open Culture", parentId: "19", children: [] },
    { id: "1052", label: "Cultural Transfer", parentId: "19", children: [] },
    { id: "1053", label: "Transition to Ventures", parentId: "19", children: [] },
    { id: "1054", label: "Cross-Cultural Collaboration", parentId: "19", children: [] }
  ],

  parentMap: {
    '2': '1', '3': '1', '4': '1', '5': '1',
    '6': '2', '7': '2', '8': '2', '9': '2', '10': '2',
    '11': '3', '12': '3', '13': '3', '14': '3', '15': '3',
    '16': '4', '17': '4', '18': '4', '19': '4',

    '1001': '6',
    '1002': '6',
    '1003': '6',
    '1004': '6',

    '1005': '7',
    '1006': '7',
    '1007': '7',
    '1008': '7',

    '1009': '8',
    '1010': '8',
    '1011': '8',
    '1012': '8',

    '1013': '9',

    '1014': '10',
    '1015': '10',
    '1016': '10',
    '1017': '10',
    '1018': '10',

    '1019': '11',
    '1020': '11',
    '1021': '11',
    '1022': '11',
    '1023': '11',

    '1024': '12',
    '1025': '12',
    '1026': '12',
    '1027': '12',

    '1028': '13',
    '1029': '13',
    '1030': '13',
    '1031': '13',

    '1032': '14',
    '1033': '14',
    '1034': '14',
    '1035': '14',

    '1036': '15',
    '1037': '15',
    '1038': '15',
    '1039': '15',
    '1040': '15',

    '1041': '16',
    '1042': '16',
    '1043': '16',
    '1044': '16',

    '1045': '17',
    '1046': '17',
    '1047': '17',

    '1048': '18',
    '1049': '18',
    '1050': '18',

    '1051': '19',
    '1052': '19',
    '1053': '19',
    '1054': '19',
  },
};

const center = { x: 800, y: 400 };
//const mainDimensionIds = ['2', '3', '4', '5'];
/*const dummyAssignment = {
  '6': 'inside-out', '7': 'inside-out', '8': 'outside-in', '9': 'outside-in', '10': 'inside-out',
  '11': 'outside-in', '12': 'inside-out', '13': 'outside-in', '14': 'inside-out', '15': 'outside-in',
  '16': 'inside-out', '17': 'outside-in', '18': 'inside-out', '19': 'outside-in',
}; wegen Filter */ 

export default function Mindmap() {
  const [focusId, setFocusId] = useState('1');
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [popupContent, setPopupContent] = useState(null);
  //const [activeFilter, setActiveFilter] = useState(null); wegen Filter
  const [expandedMechanisms, setExpandedMechanisms] = useState([]);
  const layoutRef = useRef(() => {});

  const renderPossibilities = useCallback((allNodes, edgesList) => {
    expandedMechanisms.forEach((mechanismId) => {
      const parentNode = allNodes.get(mechanismId);
      if (!parentNode) return;

      const options = rawData.nodes.filter((n) => n.parentId === mechanismId);
      const spacingY = 40;
      const startY = parentNode.position.y - ((options.length - 1) * spacingY) / 2;

      const isLeft = parentNode.position.x < center.x;
      const xOffset = isLeft ? -250 : 250;

      options.forEach((opt, i) => {
        const x = parentNode.position.x + xOffset;
        const y = startY + i * spacingY;

        allNodes.set(opt.id, {
          id: opt.id,
          data: { label: opt.label },
          position: { x, y },
          draggable: false,
          connectable: false,
          style: {
            backgroundColor: '#fef3c7',
            border: '1px solid #eab308',
            borderRadius: '6px',
            fontSize: 12,
            padding: '6px',
            textAlign: isLeft ? 'right' : 'left',
          }
        });

        edgesList.push({
          id: `e${mechanismId}-${opt.id}`,
          source: mechanismId,
          target: opt.id,
        });
      });
    });
  }, [expandedMechanisms]);

  const layout = useCallback(() => {
    const baseRadius = 150;
    const allNodes = new Map();
    const edgesList = [];

    const buildCircularLayout = (nodeId, level = 0, angleStart = 0, angleEnd = 2 * Math.PI) => {
      const children = rawData.nodes.find(n => n.id === nodeId)?.children || [];
      const radius = baseRadius + level * 180;
      const angleStep = (angleEnd - angleStart) / Math.max(children.length, 1);

      const nodeData = rawData.nodes.find(n => n.id === nodeId);
      //const isMain = mainDimensionIds.includes(nodeId);
      //const isHighlighted = nodeId === '1' || !activeFilter || isMain || dummyAssignment[nodeId] === activeFilter; Wegen Filter
      const isHighlighted = true;

      allNodes.set(nodeId, {
        id: nodeId,
        data: { label: nodeData?.label || nodeId },
        position: level === 0
          ? center
          : {
              x: center.x + radius * Math.cos((angleStart + angleEnd) / 2),
              y: center.y + radius * Math.sin((angleStart + angleEnd) / 2),
            },
        draggable: false,
        connectable: false,
        style: {
          opacity: isHighlighted ? 1 : 0.2,
          pointerEvents: isHighlighted ? 'auto' : 'none',
          backgroundColor: '#fff',
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '10px',
          fontWeight: 'bold',
          fontSize: 14,
        },
      });

      children.forEach((childId, i) => {
        const childAngleStart = angleStart + i * angleStep;
        const childAngleEnd = angleStart + (i + 1) * angleStep;

        edgesList.push({
          id: `e${nodeId}-${childId}`,
          source: nodeId,
          target: childId,
        });

        buildCircularLayout(childId, level + 1, childAngleStart, childAngleEnd);
      });
    };

    if (focusId === 'all') {
      buildCircularLayout('1');
      renderPossibilities(allNodes, edgesList);
      setNodes(Array.from(allNodes.values()));
      setEdges(edgesList);
      return;
    }

    // Möglichkeit in beiden Fällen rendern:
    buildCircularLayout(focusId);
    renderPossibilities(allNodes, edgesList);
    setNodes(Array.from(allNodes.values()));
    setEdges(edgesList);

    return;
  }, [focusId, setNodes, setEdges, renderPossibilities]);

  layoutRef.current = layout;

  useEffect(() => {
    layout();
  }, [focusId, layout]);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const onNodeClick = (event, node) => {
    const nodeData = rawData.nodes.find((n) => n.id === node.id);
    //const isMain = mainDimensionIds.includes(node.id);
    const isLeaf = !nodeData?.children?.length;
    //const isHighlighted = !activeFilter || isMain || dummyAssignment[node.id] === activeFilter; wegen Filter
    const isHighlighted = true;

    if (!isHighlighted) return; // blockiere Klicks auf ausgegraute Nodes

    if (focusId === 'all') {
      if (isLeaf) {
        const content = nodeDetails[node.id] || 'Keine weiteren Informationen verfügbar.';
        setPopupContent({ id: node.id, title: nodeData.label, text: content });
      } else {
        // Wenn Mechanismus, aber keine Kinder → trotzdem Popup mit Button
        const content = nodeDetails[node.id] || 'Keine weiteren Informationen verfügbar.';
        setPopupContent({ id: node.id, title: nodeData.label, text: content });
      }
      return;
    }

    if (node.id === focusId) {
      const parentId = rawData.parentMap[focusId];
      if (parentId) setFocusId(parentId);
      return;
    }

    const fullNode = rawData.nodes.find((n) => n.id === node.id);
    if (fullNode?.children?.length > 0) {
      setFocusId(node.id);
    } else {
      const content = nodeDetails[node.id] || 'Keine weiteren Informationen verfügbar.';
      setPopupContent({ id: node.id, title: fullNode.label, text: content });
    }
  };

  const closePopup = () => setPopupContent(null);

  return (
    <div style={{ height: '80vh', width: '100%', position: 'relative' }}>
      <div className="mindmap-controls">
        {/*
        <h4>Filter Mechanisms:</h4>
        <button onClick={() => { setActiveFilter('inside-out'); layoutRef.current(); }}>Inside-out</button>
        <button onClick={() => { setActiveFilter('outside-in'); layoutRef.current(); }}>Outside-in</button>
        <button onClick={() => { setActiveFilter(null); layoutRef.current(); }}>Reset</button>
        wegen Filter*/}
        <div>
          <h4>Ebene wählen:</h4>
          <select value={focusId} onChange={(e) => setFocusId(e.target.value)}>
            <option value="all">🌐 Gesamte Mindmap anzeigen</option>
            <option value="2">📁 Processes & Operations</option>
            <option value="3">📁 Structures</option>
            <option value="4">📁 Relational Mechanisms</option>
            <option value="5">📁 Autonomy</option>
          </select>
        </div>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodesDraggable={false}
        connectable={false}
        fitView
        edgeType="straight"
      >
        <Controls />
        <Background />
      </ReactFlow>

  {popupContent && (
    <div className="mindmap-popup">
      <h2>{popupContent.title}</h2>
      <p>{popupContent.text}</p>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '16px' }}>
        {popupContent.id &&
          rawData.nodes.some((n) => n.parentId === popupContent.id) && (
            <button
              onClick={() => {
                setExpandedMechanisms((prev) =>
                  prev.includes(popupContent.id)
                    ? prev.filter((id) => id !== popupContent.id)
                    : [...prev, popupContent.id]
                );
                closePopup();
              }}
            >
              {expandedMechanisms.includes(popupContent.id)
                ? 'Hide Possibilities'
                : 'Show Possibilities'}
            </button>
          )}

        <button onClick={closePopup}>Schließen</button>
      </div>
    </div>
  )}
    </div>
  );
}
