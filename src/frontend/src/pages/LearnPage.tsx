import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  BookOpen,
  ChevronDown,
  Globe,
  Library,
} from "lucide-react";
import { useState } from "react";

type TabId = "spotting" | "tactics" | "resources" | "definitions";

interface CardItem {
  title: string;
  summary: string;
  detail: string;
  url?: string;
}

const TABS: {
  id: TabId;
  label: string;
  icon: React.ReactNode;
  color: string;
}[] = [
  {
    id: "spotting",
    label: "Spotting Fake News",
    icon: <AlertTriangle className="w-4 h-4" />,
    color: "text-warning",
  },
  {
    id: "tactics",
    label: "Misinformation Tactics",
    icon: <AlertTriangle className="w-4 h-4" />,
    color: "text-destructive",
  },
  {
    id: "resources",
    label: "Fact-Checking Resources",
    icon: <Globe className="w-4 h-4" />,
    color: "text-success",
  },
  {
    id: "definitions",
    label: "Media Literacy",
    icon: <Library className="w-4 h-4" />,
    color: "text-primary",
  },
];

const SPOTTING: CardItem[] = [
  {
    title: "Check the Source",
    summary:
      "Investigate the outlet publishing the story before accepting its claims as true.",
    detail:
      "The credibility of a news story starts with the credibility of its source. Go to the publication's About page, look for named editors and reporters, check how long it has been operating, and search for independent reviews of its accuracy record. Sites like Media Bias/Fact Check catalogue thousands of outlets by reliability and ideological lean. A story from a brand-new site with no About page, no named staff, and a URL designed to mimic a trusted brand should be treated with extreme skepticism regardless of how plausible its content sounds.",
  },
  {
    title: "Read Beyond the Headline",
    summary:
      "Headlines are written to attract clicks — always read the full article before sharing.",
    detail:
      "Headline writers and article writers are sometimes different people, and headlines are routinely crafted to maximize clicks rather than to accurately summarize the article. A striking headline about a medical breakthrough, a political scandal, or a natural disaster may be technically justified by a single sentence buried in paragraph nine — or may not be supported at all. Studies consistently show that most people who share news articles on social media have not read beyond the headline. Make it a rule to read the full piece before passing it on.",
  },
  {
    title: "Check the Date",
    summary:
      "Old stories recycled with misleading dates can make past events appear to be breaking news.",
    detail:
      "One of the most common forms of misleading content is a genuine article from months or years ago reshared as if it happened today. When a story arrives through social media, check the publication date explicitly — the date shown in a preview thumbnail is not always the original publication date. You can run a Google search for the headline and sort results by date to see when the story first appeared. Disaster photos and videos are especially vulnerable: a flood image from 2017 can resurface as breaking footage from a completely different country.",
  },
  {
    title: "Investigate the Author",
    summary:
      "A credible byline with a verifiable professional history is a strong trust signal.",
    detail:
      "Search the author's name to see their track record. Established journalists have a body of work across multiple recognized publications. Look for a Twitter/X profile, a LinkedIn page, or a personal website with a portfolio. If an article's byline is a generic name like Staff Reporter or Admin, or if searching the name produces no verifiable results, that is a red flag. In cases where a real journalist's name appears on suspicious content, consider whether their account or identity may have been impersonated — cross-check with the journalist's own social media to confirm they actually wrote the piece.",
  },
  {
    title: "Check Your Biases",
    summary:
      "We are all more likely to accept stories that confirm what we already believe.",
    detail:
      "Confirmation bias is universal: we instinctively apply more skepticism to stories that challenge our worldview than to those that validate it. A useful self-check is to ask whether you would be fact-checking this story if it made the opposite political claim. Before sharing anything that makes you feel vindicated, outraged, or superior, deliberately slow down and apply the same scrutiny you would apply to a story you disagreed with. Recognizing your own biases is not a sign of weakness — it is the foundation of sound judgment.",
  },
  {
    title: "Read the Supporting Sources",
    summary:
      "Follow the links and citations in an article to verify they actually say what the article claims.",
    detail:
      "Misinformation often survives on vague or misrepresented citations. An article may link to a real study or government document but describe it inaccurately, cherry-pick a single data point, or quote it out of context. Always click through to the primary source — the actual study, the official statement, the original report — and read the relevant sections yourself. Pay particular attention to sample sizes, methodology limitations, and whether the primary source's own conclusions match what the article claims they say. If the links go nowhere, or loop back to the same site, treat it as a red flag.",
  },
  {
    title: "Is It a Joke or Satire?",
    summary:
      "Satirical articles are regularly mistaken for genuine news when screenshots strip context.",
    detail:
      "Satire sites like The Onion, The Babylon Bee, and The Daily Mash publish fiction that exaggerates real events for comedic effect. They label themselves clearly, but that label disappears when someone screenshots the headline and shares it without context. Before treating a shocking quote or outrageous event as real, visit the source's About page or check whether any straight-news outlet has independently reported the same story. Satirical content is a legitimate form of expression, but sharing it as fact causes genuine harm to public discourse.",
  },
  {
    title: "Ask an Expert",
    summary:
      "For health, science, law, or finance claims — seek out credentialed domain experts.",
    detail:
      "Not all misinformation involves fabricated events. Some of the most damaging false content involves the misrepresentation of complex topics where most readers lack the background to evaluate claims independently. For medical stories, look for comment from licensed physicians and peer-reviewed research. For legal claims, consult attorneys or official court documents. Organizations like Science Feedback and Health Feedback specialize in rapid expert review of viral scientific and medical claims specifically because this category of misinformation is so persistently harmful.",
  },
  {
    title: "Check the URL Carefully",
    summary:
      "Imposter domains that mimic trusted outlets are a common vector for spreading false content.",
    detail:
      "A sophisticated misinformation campaign will register a domain that looks almost identical to a trusted news brand — adding a country code suffix, inserting a hyphen, or swapping a letter. These sites reproduce the visual design, logos, and color scheme of the real outlet, making them convincing at a glance. Always look at the full domain name in the browser address bar — not just the site's visual design. A legitimate news outlet will always be on its real registered domain. Slight variations in domain structure are a clear sign of an imposter site designed to exploit brand trust.",
  },
  {
    title: "Look for Other Coverage",
    summary:
      "Genuine major news events are covered by multiple independent outlets simultaneously.",
    detail:
      "If a dramatic story — a political assassination, a major scientific discovery, a catastrophic event — appears on only one source and no other established outlet is reporting it, that is a strong signal the story is false, premature, or fabricated. Misinformation spreads when people assume exclusivity equals credibility. In reality, exclusive major scoops are extremely rare; most legitimate breaking news is quickly picked up by wire services like AP and Reuters. A quick Google News search for the key claim will reveal whether established newsrooms have independently corroborated it.",
  },
];

const TACTICS: CardItem[] = [
  {
    title: "Emotional Manipulation",
    summary:
      "Content engineered to provoke fear, outrage, or disgust spreads faster and is scrutinized less.",
    detail:
      "Research in cognitive psychology consistently shows that high-arousal emotions — particularly fear and anger — override deliberate analytical thinking and accelerate social sharing. Misinformation architects exploit this by framing stories in the most emotionally charged way possible: existential threats, moral outrages, attacks on cherished values. The emotional trigger is usually present in the headline and lead paragraph, before any evidence is presented. When you feel a sudden spike of anger or fear from a news item, treat that as a signal to slow down and verify — not to share immediately.",
  },
  {
    title: "False Context",
    summary:
      "Real images, videos, and quotes are presented alongside false descriptions of when, where, or why they occurred.",
    detail:
      "False context is one of the most pervasive forms of misinformation because the underlying media is genuine — making it impossible to disprove by fact-checking the image or video itself. A real photograph of a crowd becomes misinformation when labeled as a protest in the wrong country or year. A genuine politician's quote becomes misinformation when attributed to a different occasion. The defense is always to trace media back to its original publication: reverse image search, geolocation analysis, and date verification can establish where and when something actually occurred.",
  },
  {
    title: "Imposter Content",
    summary:
      "Fake accounts and websites impersonate real journalists, organizations, and government agencies.",
    detail:
      "Imposter content uses borrowed credibility to lend false legitimacy to fabricated claims. This can take the form of a spoofed social media account that mimics a real journalist's handle, a website designed to look like a government health agency, or a fake press release attributed to a real company. Because the branding appears authentic, readers may not question the underlying claims. The safest approach is to verify credentials directly: check the official website of the alleged source, confirm social media account verification status, and look for any official announcement that matches the claim being made.",
  },
  {
    title: "Fabricated Content",
    summary:
      "Entirely invented stories, quotes, documents, and statistics presented as factual reporting.",
    detail:
      "At the most extreme end of the misinformation spectrum, fabricated content is created wholesale with no relationship to any real event. This includes invented quotes attributed to real public figures, forged official documents, and entirely fictional news stories. The production quality of fabricated content has risen dramatically with AI writing tools, making it harder to identify through surface-level inspection alone. The most reliable defense is corroboration: if a dramatic claim is true, at least one established, independently operating news organization will have reported it through their own sourcing.",
  },
  {
    title: "Manipulated Content",
    summary:
      "Genuine photos, videos, or audio are edited to change their meaning.",
    detail:
      "Manipulation can range from simple cropping that removes key context to sophisticated photoshopped images and AI-generated voice clones. Video can be slowed down to make a person appear impaired, or subtitles can be altered to misrepresent what someone said. Reverse image search can reveal whether an image has been cropped from a larger photo. AI detection tools exist for audio and video, though their accuracy is improving but not yet perfect. The most effective countermeasure remains corroboration from multiple independent sources.",
  },
  {
    title: "Misleading Headlines",
    summary:
      "A technically defensible headline is written to imply a conclusion the article itself does not support.",
    detail:
      "Misleading headlines operate through implication rather than outright falsehood, making them particularly difficult to challenge. A headline might ask whether a politician caused a market crash — a question the article never actually answers — but the framing plants a causal association in the reader's mind. Similarly, 'Studies show...' may refer to a single preliminary study with a tiny sample size that drew no firm conclusions. The misleading headline is optimized for social media sharing, where most users see only the headline and react accordingly without reading further.",
  },
  {
    title: "Satire and Parody Misuse",
    summary:
      "Satirical content loses its joke label when shared out of context, circulating as genuine news.",
    detail:
      "Satire and parody are valuable forms of political commentary, but they become a vector for misinformation when screenshots or direct shares remove the satirical framing. What began as clearly labeled fiction on a satire site can circulate for years on social media as a genuine quote or event. Some bad actors deliberately post satirical content and then disclaim responsibility when called out, using 'it's just a joke' as a shield. The best defense is to always verify extraordinary claims by checking whether any named news outlet without a satirical mission has reported the same thing.",
  },
  {
    title: "Bot Amplification",
    summary:
      "Automated bot networks inflate engagement metrics to make fringe content appear mainstream.",
    detail:
      "Social media platforms use algorithmic ranking that rewards content with high engagement. Bot farms exploit this by artificially inflating likes, shares, and retweets for targeted content, making it appear far more popular and credible than it actually is. When a hashtag trends or a claim racks up thousands of shares very quickly, the engagement may be largely synthetic. Signals of bot activity include accounts with generic profile photos, very recent creation dates, posting patterns that continue through the night at regular intervals, and nearly identical messages posted by many different accounts in quick succession.",
  },
  {
    title: "Deep Fakes",
    summary:
      "AI-synthesized video and audio make it possible to put words and actions into real people's mouths.",
    detail:
      "Deepfakes use deep learning neural networks trained on large datasets of real video to generate new video in which a target person appears to say or do something they never did. The quality has improved dramatically since the technology emerged around 2017, and audio deepfakes (voice clones) have outpaced video in realism. Detection tools exist but are in an arms race with generation tools. Practical defenses include looking for unnatural eye blinking, inconsistent lighting on the face, audio sync issues, and — most importantly — asking whether the claim has been corroborated by direct on-record reporting from the person or their representatives.",
  },
  {
    title: "Out-of-Context Images",
    summary:
      "Genuine photographs are relabeled with false captions to support unrelated narratives.",
    detail:
      "A photograph is inherently convincing evidence — we are trained from childhood to accept photos as visual proof. Misinformation campaigns exploit this by recycling genuine images from old events, different countries, or completely unrelated contexts and attaching new captions. A dramatic protest photo from 2015 can be relabeled as today's riots; a weather event in one country can be presented as evidence of a disaster in another. Google Reverse Image Search and TinEye allow you to upload or paste an image URL and see where it originally appeared, often exposing misrepresented captions instantly.",
  },
  {
    title: "Sponsored Content Disguised as News",
    summary:
      "Paid advertising content mimics the style and layout of editorial journalism to deceive readers.",
    detail:
      "Also called native advertising, this content is purchased by brands or political organizations and published in media outlets styled to look like independent editorial coverage. Legitimate publishers are required to label it — Sponsored, Paid Partnership, Advertisement — but the labels are often small, low-contrast, and placed in locations readers are trained to ignore. At its most harmful, native advertising promotes health products with unproven claims, political positions, or financial products using the borrowed credibility of the host publication. Always look for disclosure labels before treating any content as independent journalism.",
  },
  {
    title: "Astroturfing",
    summary:
      "Coordinated campaigns are disguised as spontaneous grassroots movements to manufacture the appearance of public consensus.",
    detail:
      "Astroturfing refers to the practice of creating the illusion of a popular grassroots movement that is actually organized and funded by a central actor — a corporation, a political campaign, or a foreign state. In the digital era, astroturfing uses networks of fake social media accounts, coordinated hashtag campaigns, and mass-produced comment spam to simulate public opinion that does not actually exist. The goal is to make a minority position appear to have broad popular support, nudging genuine members of the public toward it through social proof. Investigative journalists and academic researchers who track influence operations are the best sources for identifying specific campaigns.",
  },
];

const RESOURCES: CardItem[] = [
  {
    title: "Snopes",
    summary:
      "The oldest and most comprehensive rumor-debunking site on the web, running since 1994.",
    detail:
      "Snopes was founded in 1994 to investigate internet rumors and chain emails, making it the longest-running fact-checking operation on the web. Its researchers trace viral claims — ranging from celebrity gossip to political conspiracy theories to seasonal hoaxes — to their origins and rate them on a spectrum from True to False, with nuanced intermediate ratings like Mostly True and Mixture. Snopes is particularly strong on recurring claims that resurface year after year and on consumer and health myths. It maintains a transparent corrections policy and explains its methodology on every article.",
    url: "https://www.snopes.com",
  },
  {
    title: "FactCheck.org",
    summary:
      "Nonpartisan U.S. political fact-checker from the Annenberg Public Policy Center since 2003.",
    detail:
      "FactCheck.org was founded in 2003 by the Annenberg Public Policy Center at the University of Pennsylvania as a nonpartisan consumer advocate for voters. It focuses primarily on claims made by U.S. politicians, government officials, and political advertising at the federal and state levels. Each article presents the original claim, traces the evidence chain in detail, and provides a clear verdict with full sourcing. FactCheck also operates SciCheck for false and misleading scientific claims, and HealthWatch for health-related misinformation. Its academic institutional affiliation makes it one of the most methodologically transparent operations in fact-checking.",
    url: "https://www.factcheck.org",
  },
  {
    title: "PolitiFact",
    summary:
      "Pulitzer Prize-winning fact-checker with its memorable six-point Truth-O-Meter.",
    detail:
      "PolitiFact was founded by the Tampa Bay Times in 2007 and won the Pulitzer Prize for National Reporting in 2009. It is best known for its Truth-O-Meter, which rates political claims from True through Mostly True, Half True, Mostly False, False, and Pants on Fire — the last reserved for statements that are not just inaccurate but absurd. The site covers U.S. politics at the national level and maintains state-level franchise partners in multiple states. Each fact-check includes the full evidentiary chain, named expert sources, and the complete statement in its original context.",
    url: "https://www.politifact.com",
  },
  {
    title: "Full Fact",
    summary:
      "The UK's leading independent fact-checking charity, covering politics, health, and viral claims.",
    detail:
      "Full Fact is a UK-based independent fact-checking charity founded in 2010. It focuses primarily on claims made in British politics, media, and public discourse, covering topics including healthcare, immigration, crime statistics, and economic claims. Full Fact also operates automated fact-checking tools that scan live television broadcast transcripts and parliamentary debates for checkable claims. The organization publishes its methodology and funding sources transparently, has a formal corrections process, and is a founding member of the International Fact-Checking Network.",
    url: "https://fullfact.org",
  },
  {
    title: "AFP Fact Check",
    summary:
      "Agence France-Presse's global fact-checking operation, covering claims in more than 20 languages.",
    detail:
      "AFP is one of the world's three major wire services and operates a dedicated fact-checking division with journalists in over 80 countries. Its global reach makes it uniquely capable of verifying claims that originate outside the English-speaking world — covering viral stories in French, Spanish, Arabic, Chinese, Portuguese, and many other languages. AFP Fact Check uses open-source intelligence techniques including satellite imagery analysis, geolocation, and social media archive searches. It is an official third-party fact-checker for both Meta and Google in multiple markets.",
    url: "https://factcheck.afp.com",
  },
  {
    title: "Reuters Fact Check",
    summary:
      "Reuters' global fact-checking desk with exceptional reach for international and visual media verification.",
    detail:
      "Reuters has operated its dedicated fact-checking desk since 2018 as an extension of its journalism operations. As the world's largest international news agency with correspondents in virtually every country, Reuters brings unparalleled geographic reach to fact-checking, particularly for claims about international events. Its fact checks are typically concise and verdict-focused, with clear evidence summaries. Reuters is particularly strong in visual verification — using geolocation, metadata analysis, and satellite imagery to confirm or disprove the provenance of viral images and videos.",
    url: "https://www.reuters.com/fact-check",
  },
  {
    title: "AP Fact Check",
    summary:
      "The Associated Press brings the full resources of a global news agency to verifying viral claims.",
    detail:
      "The Associated Press launched its dedicated fact-checking operation to apply the full reporting resources of one of the world's oldest and largest news agencies to the problem of misinformation. AP fact checks cover both domestic U.S. politics and international stories, with particular depth in health and science misinformation. Articles are backed by original on-record reporting and linked primary sources. AP is notable for the speed with which it verifies rapidly spreading claims during breaking news events, when misinformation spreads fastest. AP fact checks are widely syndicated, appearing across hundreds of outlets simultaneously.",
    url: "https://apnews.com/hub/ap-fact-check",
  },
  {
    title: "The Washington Post Fact Checker",
    summary:
      "Glenn Kessler's Pinocchio-rated column scrutinizing claims by U.S. political figures since 2011.",
    detail:
      "The Washington Post Fact Checker was founded by senior correspondent Glenn Kessler in 2011. It rates claims on a scale from one to four Pinocchios, with four representing outright lies, and a rare Geppetto Checkmark for notably accurate claims. Kessler's analyses are exhaustive, often running to thousands of words with detailed breakdowns of every component claim. The Post also maintains a real-time fact-checking live blog during major political events and a Bottomless Pinocchio designation for claims that have been repeated more than 20 times after being rated false.",
    url: "https://www.washingtonpost.com/news/fact-checker",
  },
  {
    title: "Lead Stories",
    summary:
      "Fast-turnaround fact-checking focused on viral social media content and trending claims.",
    detail:
      "Lead Stories was founded in 2015 and specializes in fast-turnaround fact-checking of viral stories circulating on social media platforms. Its proprietary Trendolizer technology continuously scans hundreds of domains for trending stories and flags those making extraordinary claims for rapid verification. Lead Stories is an official third-party fact-checker for Facebook, TikTok, and YouTube, meaning its ratings are used by these platforms to downrank or label misinformation. It is registered with the International Fact-Checking Network and publishes its methodology and funding sources.",
    url: "https://leadstories.com",
  },
  {
    title: "International Fact-Checking Network (IFCN)",
    summary:
      "The global body that accredits and sets standards for fact-checking organizations worldwide.",
    detail:
      "The International Fact-Checking Network (IFCN), housed at the Poynter Institute, was founded in 2015 to foster a global fact-checking community. Its most important function is operating a Code of Principles that sets standards for nonpartisanship, transparency of funding, transparency of methodology, and commitment to corrections. Organizations that meet these standards can apply for verified signatory status — a quality mark recognized by platforms like Meta and Google when selecting fact-checking partners. IFCN also maintains a global directory of verified fact-checkers, making it the best starting point for finding a trusted fact-checker in any specific country or language.",
    url: "https://www.poynter.org/ifcn",
  },
  {
    title: "Media Bias/Fact Check",
    summary:
      "Comprehensive database rating news sources by factual accuracy, bias, and editorial credibility.",
    detail:
      "Media Bias/Fact Check (MBFC) was founded in 2015 and has grown into the most comprehensive independent database of news source ratings on the web, covering thousands of outlets. Each entry rates a source on its overall factual accuracy record, its position on a left-center-right bias spectrum, and specific credibility factors like ownership transparency and correction policies. MBFC is particularly useful as a first-pass tool: before reading deeply into a new source, checking its MBFC rating gives immediate context for how critically to engage. The site also maintains a list of sources that consistently publish pseudoscience and conspiracy theories.",
    url: "https://mediabiasfactcheck.com",
  },
  {
    title: "TinEye Reverse Image Search",
    summary:
      "Trace any image back to its original source to verify whether it has been used out of context.",
    detail:
      "TinEye is a reverse image search engine that has indexed over 66 billion images, allowing users to upload an image or paste a URL and see everywhere that image has appeared on the web, along with the dates of each appearance. This makes it invaluable for verifying whether a viral photograph has been misrepresented. If an image purportedly showing a recent protest actually appears in a news article from three years ago in a different country, TinEye will surface that original article. Google Reverse Image Search and Bing Visual Search offer similar functionality. These tools should be a first reflex whenever a compelling image is attached to a dramatic claim.",
    url: "https://tineye.com",
  },
];

const DEFINITIONS: CardItem[] = [
  {
    title: "Misinformation",
    summary:
      "False or inaccurate information shared without the intent to deceive.",
    detail:
      "Misinformation is the broadest term in the information disorder taxonomy. It covers any false, inaccurate, or misleading content — regardless of whether the person sharing it knows it is false. A grandmother forwarding a health myth she genuinely believes is true is spreading misinformation. This distinction from disinformation is critical: it tells us that most people who spread false content are not doing so maliciously. They are ordinary people making sincere but mistaken judgments. Effective responses to misinformation focus on education, accessible tools, and friction-reducing corrections — not on attributing bad faith to sharers.",
  },
  {
    title: "Disinformation",
    summary:
      "False content deliberately created and spread with the intent to deceive or cause harm.",
    detail:
      "Disinformation is distinguished from misinformation by intent: it is content that is knowingly false and deliberately created to deceive. State-sponsored influence operations, coordinated inauthentic behavior by political campaigns, and fabricated news websites operating for financial or ideological gain are all sources of disinformation. The harm from disinformation extends beyond the false content itself — it poisons the broader information environment by making it harder for citizens to trust any information source. Notable historical examples include fabricated documents circulated during elections, false flag social media campaigns, and government-funded propaganda disguised as independent journalism.",
  },
  {
    title: "Malinformation",
    summary:
      "Genuine, true information weaponized to harm a person, organization, or country.",
    detail:
      "Malinformation is the third category in the information disorder framework developed by Claire Wardle and Hossein Derakhshan at the Council of Europe. It refers to content that is factually accurate but deployed with the intent to cause harm: private personal information leaked to damage a reputation, a true but embarrassing statement taken out of its original context to maximize damage, or selective release of accurate data to support a misleading narrative. The concept challenges the idea that true information is inherently harmless — context, framing, timing, and intent all affect the impact of information, even when the underlying facts are not disputed.",
  },
  {
    title: "Propaganda",
    summary:
      "Biased or misleading information systematically used to promote a particular political agenda.",
    detail:
      "Propaganda is not always false — some of the most effective propaganda is entirely factually accurate but selectively curated to promote a particular political, ideological, or institutional agenda. What distinguishes propaganda from journalism is the relationship to truth: journalism aims to find and report accurate information wherever it leads; propaganda starts with a conclusion and selects evidence to support it. Modern propaganda techniques include framing (the same facts presented in incompatible ways), repetition (making a claim feel true through sheer frequency), and dehumanization (language that makes target groups seem less than fully human).",
  },
  {
    title: "Confirmation Bias",
    summary:
      "The cognitive tendency to seek out and believe information that confirms existing beliefs.",
    detail:
      "Confirmation bias is one of the most thoroughly documented phenomena in cognitive psychology, having been studied systematically since Peter Wason's card selection experiments in the 1960s. It operates at every stage of information processing: we are more likely to encounter information that aligns with our views (because we follow sources that share them), more likely to accept it without scrutiny (because it feels intuitively right), and more likely to remember it (because it reinforces our existing mental model). Awareness is necessary but not sufficient — research shows that simply knowing about confirmation bias does not eliminate it. Practical mitigations include deliberately seeking out high-quality sources that challenge your views.",
  },
  {
    title: "Filter Bubble",
    summary:
      "The algorithmically personalized information environment that limits exposure to diverse viewpoints.",
    detail:
      "The term filter bubble was coined by Eli Pariser in his 2011 book of the same name to describe the way platform recommendation algorithms create increasingly personalized information environments. Unlike echo chambers, which are shaped by conscious social choices, filter bubbles operate invisibly through algorithmic optimization for engagement. Platforms trained to maximize time-on-site learn that content aligned with a user's existing beliefs generates more engagement than challenging content, and progressively narrows the range of perspectives served. The long-term effect is that users in the same country can inhabit radically different information realities with almost no shared factual baseline.",
  },
  {
    title: "Echo Chamber",
    summary:
      "A social environment where a person's beliefs are reinforced by near-total agreement from those around them.",
    detail:
      "Echo chambers are social phenomena — environments, whether online or offline, where a person is surrounded predominantly by others who share their views. The reinforcing feedback of agreement makes it feel as though one's beliefs represent broad social consensus, while dissenting viewpoints come to feel strange or illegitimate. Online platforms accelerate echo chamber formation through following patterns that cluster like-minded individuals together. Research suggests that people in echo chambers tend to hold more extreme versions of the views they started with, because competition for in-group status rewards ever-more-emphatic expression of core beliefs rather than nuance or revision in response to evidence.",
  },
  {
    title: "Astroturfing",
    summary:
      "Manufacturing the appearance of a grassroots movement using coordinated but hidden organizational resources.",
    detail:
      "Astroturfing takes its name from AstroTurf — artificial grass — as a metaphor for the synthetic simulation of genuine popular feeling. The technique involves a central actor creating multiple fake accounts, funding fake advocacy organizations, or paying individuals to post testimonials that simulate spontaneous public opinion. Digitally, this has evolved into sophisticated influence operations involving thousands of coordinated fake accounts. The goal is to exploit social proof: people assume that popular positions are probably correct, so manufacturing the appearance of popularity nudges genuine members of the public toward the desired position.",
  },
  {
    title: "Sockpuppeting",
    summary:
      "Operating fake online identities to manipulate discussions and manufacture false consensus.",
    detail:
      "A sockpuppet is a fake online identity operated by a person who already has a real identity in the same community, used to create the appearance of broader agreement or to evade bans and accountability. In political contexts, a single operator may run dozens of sockpuppet accounts to make a minority position appear to have widespread support, to harass critics without accountability, or to game platform moderation systems. At scale, state actors have operated sockpuppet networks of thousands of accounts to interfere in foreign elections. Platforms maintain specialist trust and safety teams that identify and dismantle these networks — though enforcement is imperfect and often reactive.",
  },
  {
    title: "Information Disorder",
    summary:
      "The umbrella framework encompassing all forms of false, misleading, and harmful information.",
    detail:
      "Information disorder is a research framework developed primarily by Claire Wardle and Hossein Derakhshan in their influential 2017 report for the Council of Europe. The framework maps the information environment across three categories — misinformation, disinformation, and malinformation — and analyzes each according to three components: the agent creating or sharing the content, the message itself, and the interpreter receiving it. This tripartite model is more analytically useful than binary fake/real distinctions because it captures the ways in which intent, content, and reception all interact to determine whether information causes harm. The framework has been widely adopted by researchers, platform policy teams, and government bodies.",
  },
  {
    title: "Media Literacy",
    summary:
      "The ability to access, analyze, evaluate, and create media in a variety of forms.",
    detail:
      "Media literacy was formally defined by the 1992 National Leadership Conference on Media Literacy as the ability to access, analyze, evaluate, and create media in a variety of forms. It encompasses critical thinking skills applied specifically to media content: understanding how economic and political incentives shape media production, recognizing the conventions of different media formats, evaluating the credibility and reliability of sources, and identifying persuasion techniques. Media literacy education has been shown in randomized controlled trials to measurably reduce susceptibility to misinformation, with the most effective interventions using a prebunking technique — inoculating people against manipulation techniques before they encounter specific false claims.",
  },
  {
    title: "Digital Literacy",
    summary:
      "The technical and critical skills needed to navigate, evaluate, and participate in digital environments.",
    detail:
      "Digital literacy extends media literacy into the specific affordances of digital technology: understanding how algorithmic recommendation systems work and how they shape exposure to information; knowing how to evaluate a domain name and use browser safety tools; understanding how metadata, geolocation data, and digital fingerprints can be used to verify or fabricate evidence; and knowing how to protect personal data and security online. As misinformation increasingly relies on digital-native formats — viral videos, meme templates, AI-generated content — digital literacy has become a prerequisite for effective media literacy.",
  },
  {
    title: "Source Credibility",
    summary:
      "The perceived trustworthiness, expertise, and accuracy of an information source.",
    detail:
      "Source credibility is a concept from communication theory that encompasses two primary dimensions: expertise (does the source have genuine subject-matter knowledge?) and trustworthiness (does the source have a track record of honesty and accuracy?). A source can be highly expert but low in trustworthiness — a scientist paid to dispute inconvenient findings — or highly trustworthy but low in relevant expertise. Credibility assessment tools include checking the source's correction policies, examining their track record over time, looking for institutional accountability structures, and using lateral reading — opening multiple tabs to see what other credible sources say about the source itself.",
  },
  {
    title: "Lateral Reading",
    summary:
      "Verifying sources by immediately opening new tabs to see what others say about them.",
    detail:
      "Lateral reading is a verification technique developed by researchers at Stanford's Civic Online Reasoning project, inspired by observing how professional fact-checkers evaluate sources. Instead of reading deeply into an unfamiliar website to assess its credibility from internal signals, lateral readers immediately open new browser tabs and search for what others say about the source. This technique is significantly faster and more accurate than vertical reading because external assessments from credible organizations — Wikipedia, Media Bias/Fact Check, IFCN — take only seconds to find and are far harder for a bad actor to manipulate than the source's own About page. Professional fact-checkers were found to use this technique almost universally.",
  },
];

const CONTENT: Record<TabId, CardItem[]> = {
  spotting: SPOTTING,
  tactics: TACTICS,
  resources: RESOURCES,
  definitions: DEFINITIONS,
};

function ExpandableCard({
  item,
  colorClass,
  isResource,
}: { item: CardItem; colorClass: string; isResource: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="bg-card border border-border rounded-xl overflow-hidden transition-smooth"
      data-ocid="learn.card"
    >
      <button
        type="button"
        className="w-full text-left p-5 flex items-start gap-3 hover:bg-muted/30 transition-colors duration-200"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        data-ocid="learn.card.toggle"
      >
        <div className={`mt-0.5 flex-shrink-0 ${colorClass}`}>
          <BookOpen className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-display font-600 text-foreground text-sm leading-snug">
            {item.title}
          </p>
          <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
            {item.summary}
          </p>
          {isResource && item.url && (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2 transition-colors duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <Globe className="w-3 h-3" />
              {item.url.replace("https://", "")}
            </a>
          )}
        </div>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 pb-5 pt-0">
          <div className="border-t border-border pt-4">
            <p className="text-sm text-foreground/80 leading-relaxed">
              {item.detail}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const TAB_COLOR: Record<TabId, string> = {
  spotting: "text-warning",
  tactics: "text-[oklch(var(--destructive))]",
  resources: "text-success",
  definitions: "text-primary",
};

const TAB_BADGE: Record<TabId, string> = {
  spotting:
    "bg-[oklch(var(--warning)/0.12)] text-warning border-[oklch(var(--warning)/0.3)]",
  tactics:
    "bg-[oklch(var(--destructive)/0.12)] text-[oklch(var(--destructive))] border-[oklch(var(--destructive)/0.3)]",
  resources:
    "bg-[oklch(var(--success)/0.12)] text-success border-[oklch(var(--success)/0.3)]",
  definitions: "bg-primary/10 text-primary border-primary/30",
};

const TAB_DESCRIPTIONS: Record<TabId, string> = {
  spotting:
    "Learn to recognize the telltale signs of fabricated or misleading news before you share it.",
  tactics:
    "Understand the techniques bad actors use to create and spread false narratives at scale.",
  resources:
    "Trusted, independent organizations that verify claims and publish their evidence openly.",
  definitions:
    "Key concepts in media literacy that help you think critically about the information you consume.",
};

export default function LearnPage() {
  const [activeTab, setActiveTab] = useState<TabId>("spotting");
  const cards = CONTENT[activeTab];
  const colorClass = TAB_COLOR[activeTab];
  const isResource = activeTab === "resources";

  return (
    <div
      className="max-w-5xl mx-auto px-4 sm:px-6 py-10"
      data-ocid="learn.page"
    >
      {/* Page header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-5 h-5 text-primary" />
          <span className="text-xs font-600 text-primary uppercase tracking-widest">
            Media Literacy Hub
          </span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-700 text-foreground tracking-tight">
          Learn to Spot Misinformation
        </h1>
        <p className="mt-3 text-muted-foreground text-base leading-relaxed max-w-2xl">
          Build your critical-thinking toolkit with evidence-based guidance on
          spotting, understanding, and countering false information.
        </p>
      </div>

      {/* Tab navigation */}
      <div
        className="flex flex-wrap gap-2 mb-8"
        role="tablist"
        data-ocid="learn.tabs"
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            data-ocid={`learn.tab.${tab.id}`}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-600 border transition-smooth ${
              activeTab === tab.id
                ? `${TAB_BADGE[tab.id]} shadow-subtle`
                : "border-border text-muted-foreground bg-card hover:bg-muted/40"
            }`}
          >
            <span
              className={
                activeTab === tab.id
                  ? TAB_COLOR[tab.id]
                  : "text-muted-foreground"
              }
            >
              {tab.icon}
            </span>
            {tab.label}
            <Badge
              variant="outline"
              className={`ml-1 text-xs px-1.5 py-0 h-4 ${
                activeTab === tab.id
                  ? TAB_BADGE[tab.id]
                  : "border-border text-muted-foreground"
              }`}
            >
              {CONTENT[tab.id].length}
            </Badge>
          </button>
        ))}
      </div>

      {/* Section description */}
      <div
        className={`mb-6 p-4 rounded-lg border ${TAB_BADGE[activeTab]} bg-opacity-10`}
      >
        <p className="text-sm font-600">{TAB_DESCRIPTIONS[activeTab]}</p>
      </div>

      {/* Cards grid */}
      <div
        className="grid gap-3 sm:grid-cols-1"
        role="tabpanel"
        data-ocid="learn.content"
      >
        {cards.map((item, i) => (
          <ExpandableCard
            key={item.title}
            item={item}
            colorClass={colorClass}
            isResource={isResource}
            data-ocid={`learn.card.item.${i + 1}`}
          />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 text-center">
        <p className="text-muted-foreground text-sm">
          Put your knowledge to the test —{" "}
          <button
            type="button"
            className="text-primary hover:underline font-600 transition-colors duration-200"
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent("truthcheck:navigate", { detail: "home" }),
              )
            }
            data-ocid="learn.go_detect_button"
          >
            analyze a headline now
          </button>
        </p>
      </div>
    </div>
  );
}
