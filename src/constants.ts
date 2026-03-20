import { Achievement, QuizQuestion, LibraryBook } from './types';

export const INITIAL_STATS = {
  hunger: 80,
  energy: 100,
  happiness: 70,
  health: 100,
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: '1',
    question: "What is a child's right regarding education?",
    questionFil: "Ano ang karapatan ng bata pagdating sa edukasyon?",
    options: ["Only if they can afford it", "Every child has the right to free primary education", "Only boys should go to school", "Education is optional"],
    optionsFil: ["Kapag kaya lang nilang bayaran", "Bawat bata ay may karapatan sa libreng primaryang edukasyon", "Mga lalaki lang ang dapat mag-aral", "Opsyonal ang edukasyon"],
    correctAnswer: 1,
    explanation: "According to the UN Convention on the Rights of the Child, every child has the right to an education. Primary education should be free.",
    explanationFil: "Ayon sa UN Convention on the Rights of the Child, bawat bata ay may karapatan sa edukasyon. Ang primaryang edukasyon ay dapat libre."
  },
  {
    id: '2',
    question: "What should you do if you see someone being bullied?",
    questionFil: "Ano ang dapat mong gawin kung may nakikita kang binu-bully?",
    options: ["Join in", "Ignore it", "Report it to a trusted adult", "Record it for social media"],
    optionsFil: ["Sumali", "Hayaan lang", "Isuspongha sa isang pinagkakatiwalaang matanda", "I-record para sa social media"],
    correctAnswer: 2,
    explanation: "Reporting bullying to a teacher, parent, or trusted adult is the best way to help stop it and keep everyone safe.",
    explanationFil: "Ang pag-uulat ng pambu-bully sa guro, magulang, o pinagkakatiwalaang matanda ang pinakamahusay na paraan upang matigil ito at mapanatiling ligtas ang lahat."
  },
  {
    id: '3',
    question: "Which of these is a basic right of every child?",
    questionFil: "Alin sa mga ito ang pangunahing karapatan ng bawat bata?",
    options: ["Right to play and rest", "Right to work 12 hours a day", "Right to drive a car", "Right to skip all chores"],
    optionsFil: ["Karapatang maglaro at magpahinga", "Karapatang magtrabaho ng 12 oras sa isang araw", "Karapatang magmaneho ng kotse", "Karapatang hindi gumawa ng gawaing bahay"],
    correctAnswer: 0,
    explanation: "Children have the right to play, rest, and participate in cultural and artistic activities.",
    explanationFil: "Ang mga bata ay may karapatang maglaro, magpahinga, at lumahok sa mga aktibidad na pangkultura at pansining."
  },
  {
    id: '4',
    question: "What is the 'Right to Participation'?",
    questionFil: "Ano ang 'Karapatan sa Pakikilahok'?",
    options: ["Right to vote in national elections", "Right to have their views heard in matters affecting them", "Right to join a sports team", "Right to skip school"],
    optionsFil: ["Karapatang bumoto sa pambansang halalan", "Karapatang mapakinggan ang kanilang mga pananaw sa mga bagay na nakakaapekto sa kanila", "Karapatang sumali sa isang sports team", "Karapatang lumiban sa paaralan"],
    correctAnswer: 1,
    explanation: "Children have the right to express their opinions and have them taken seriously in all matters that affect them.",
    explanationFil: "Ang mga bata ay may karapatang ipahayag ang kanilang mga opinyon at seryosohin ang mga ito sa lahat ng bagay na nakakaapekto sa kanila."
  },
  {
    id: '5',
    question: "Which organization primarily focuses on children's rights globally?",
    questionFil: "Aling organisasyon ang pangunahing nakatuon sa mga karapatan ng bata sa buong mundo?",
    options: ["UNESCO", "UNICEF", "WHO", "Interpol"],
    optionsFil: ["UNESCO", "UNICEF", "WHO", "Interpol"],
    correctAnswer: 1,
    explanation: "UNICEF (United Nations Children's Fund) is the leading organization working for children's rights in over 190 countries.",
    explanationFil: "Ang UNICEF (United Nations Children's Fund) ang nangungunang organisasyon na nagtatrabaho para sa mga karapatan ng bata sa mahigit 190 bansa."
  },
  {
    id: '6',
    question: "What does 'Protection from Harm' mean?",
    questionFil: "Ano ang ibig sabihin ng 'Proteksyon mula sa Kapahamakan'?",
    options: ["Children should never go outside", "Children must be protected from violence, abuse, and neglect", "Children should wear armor", "Children cannot play sports"],
    optionsFil: ["Hindi dapat lumabas ang mga bata", "Dapat protektahan ang mga bata mula sa karahasan, pang-aabuso, at pagpapabaya", "Dapat magsuot ng armor ang mga bata", "Hindi maaaring maglaro ng sports ang mga bata"],
    correctAnswer: 1,
    explanation: "Governments must ensure children are protected from all forms of physical or mental violence, injury, or abuse.",
    explanationFil: "Dapat tiyakin ng mga pamahalaan na ang mga bata ay protektado mula sa lahat ng anyo ng pisikal o mental na karahasan, pinsala, o pang-aabuso."
  },
  {
    id: '7',
    question: "At what age is someone considered a child under the UNCRC?",
    questionFil: "Sa anong edad itinuturing na bata ang isang tao sa ilalim ng UNCRC?",
    options: ["Under 12", "Under 16", "Under 18", "Under 21"],
    optionsFil: ["Wala pang 12", "Wala pang 16", "Wala pang 18", "Wala pang 21"],
    correctAnswer: 2,
    explanation: "The Convention defines a child as any person under the age of 18, unless national laws define it differently.",
    explanationFil: "Tinutukoy ng Convention ang isang bata bilang sinumang tao na wala pang 18 taong gulang, maliban kung iba ang tinutukoy ng mga pambansang batas."
  },
  {
    id: '8',
    question: "What is the right to a name and nationality?",
    questionFil: "Ano ang karapatan sa pangalan at nasyonalidad?",
    options: ["Children can pick any name they want", "Every child must be registered at birth with a name and nationality", "Children don't need names until they are 5", "Only parents need names"],
    optionsFil: ["Maaaring pumili ang mga bata ng anumang pangalan na gusto nila", "Bawat bata ay dapat mairehistro sa pagsilang na may pangalan at nasyonalidad", "Hindi kailangan ng mga bata ng pangalan hanggang sa mag-5 taon sila", "Mga magulang lang ang kailangan ng pangalan"],
    correctAnswer: 1,
    explanation: "Every child has the right to a name, a nationality, and the right to know and be cared for by their parents.",
    explanationFil: "Bawat bata ay may karapatan sa isang pangalan, nasyonalidad, at karapatang makilala at maalagaan ng kanilang mga magulang."
  },
  {
    id: '9',
    question: "What should you do if you feel unsafe online?",
    questionFil: "Ano ang dapat mong gawin kung sa tingin mo ay hindi ka ligtas online?",
    options: ["Keep it a secret", "Tell a trusted adult immediately", "Delete your account and say nothing", "Try to fix it yourself"],
    optionsFil: ["Panatilihin itong lihim", "Sabihin agad sa isang pinagkakatiwalaang matanda", "I-delete ang iyong account at huwag sabihin ang anuman", "Subukang ayusin ito nang mag-isa"],
    correctAnswer: 1,
    explanation: "If anything online makes you feel uncomfortable or unsafe, always tell a parent, teacher, or trusted adult.",
    explanationFil: "Kung may anumang bagay online na nagpapadama sa iyo ng hindi komportable o hindi ligtas, laging sabihin sa magulang, guro, o pinagkakatiwalaang matanda."
  },
  {
    id: '10',
    question: "What is 'Inclusive Education'?",
    questionFil: "Ano ang 'Inklusibong Edukasyon'?",
    options: ["Education only for gifted students", "Education that welcomes all children regardless of their abilities", "Education only in private schools", "Education without teachers"],
    optionsFil: ["Edukasyon para lamang sa mga matatalinong estudyante", "Edukasyon na tumatanggap sa lahat ng bata anuman ang kanilang kakayahan", "Edukasyon lamang sa mga pribadong paaralan", "Edukasyon na walang mga guro"],
    correctAnswer: 1,
    explanation: "Inclusive education means all children, including those with disabilities, learn together in the same schools.",
    explanationFil: "Ang inklusibong edukasyon ay nangangahulugan na ang lahat ng bata, kabilang ang mga may kapansanan, ay nag-aaral nang magkakasama sa parehong paaralan."
  },
  {
    id: '11',
    question: "What is the right to health care?",
    questionFil: "Ano ang karapatan sa pangangalagang pangkalusugan?",
    options: ["Only if you have insurance", "Children have the right to the best possible health care and clean water", "Doctors are only for adults", "Medicine should be a secret"],
    optionsFil: ["Kung may insurance ka lang", "Ang mga bata ay may karapatan sa pinakamahusay na posibleng pangangalagang pangkalusugan at malinis na tubig", "Ang mga doktor ay para lamang sa mga matatanda", "Dapat maging lihim ang gamot"],
    correctAnswer: 1,
    explanation: "Children have the right to the best health care possible, safe water to drink, nutritious food, and a clean environment.",
    explanationFil: "Ang mga bata ay may karapatan sa pinakamahusay na pangangalagang pangkalusugan, ligtas na tubig na maiinom, masustansyang pagkain, at malinis na kapaligiran."
  },
  {
    id: '12',
    question: "What is 'Cyberbullying'?",
    questionFil: "Ano ang 'Cyberbullying'?",
    options: ["Bullying that happens in a park", "Bullying using digital devices like phones or computers", "A type of video game", "A computer virus"],
    optionsFil: ["Pambu-bully na nangyayari sa parke", "Pambu-bully gamit ang mga digital na kagamitan tulad ng telepono o computer", "Isang uri ng video game", "Isang computer virus"],
    correctAnswer: 1,
    explanation: "Cyberbullying is bullying that takes place over digital devices like cell phones, computers, and tablets.",
    explanationFil: "Ang cyberbullying ay pambu-bully na nangyayari sa mga digital na kagamitan tulad ng mga cell phone, computer, at tablet."
  },
  {
    id: '13',
    question: "Why is 'Privacy' important for children?",
    questionFil: "Bakit mahalaga ang 'Privacy' para sa mga bata?",
    options: ["So they can hide things from parents", "To protect their personal information and dignity", "It's not important for children", "So they can skip chores"],
    optionsFil: ["Para makapagtago sila ng mga bagay sa mga magulang", "Upang maprotektahan ang kanilang personal na impormasyon at dignidad", "Hindi ito mahalaga para sa mga bata", "Para makaiwas sila sa mga gawaing bahay"],
    correctAnswer: 1,
    explanation: "Children have the right to privacy. The law should protect their way of life, their families, and their homes.",
    explanationFil: "Ang mga bata ay may karapatan sa privacy. Dapat protektahan ng batas ang kanilang pamumuhay, kanilang mga pamilya, at kanilang mga tahanan."
  },
  {
    id: '14',
    question: "What is the 'Best Interests of the Child' principle?",
    questionFil: "Ano ang prinsipyo ng 'Pinakamahusay na Interes ng Bata'?",
    options: ["Children always get what they want", "Decisions affecting children should prioritize what is best for them", "Parents always know best", "Teachers always know best"],
    optionsFil: ["Laging nakukuha ng mga bata ang gusto nila", "Ang mga desisyong nakakaapekto sa mga bata ay dapat magbigay-priyoridad sa kung ano ang pinakamabuti para sa kanila", "Laging alam ng mga magulang ang pinakamabuti", "Laging alam ng mga guro ang pinakamabuti"],
    correctAnswer: 1,
    explanation: "In all actions concerning children, the best interests of the child shall be a primary consideration.",
    explanationFil: "Sa lahat ng aksyon tungkol sa mga bata, ang pinakamahusay na interes ng bata ang dapat na pangunahing isaalang-alang."
  },
  {
    id: '15',
    question: "What is the right to rest and leisure?",
    questionFil: "Ano ang karapatan sa pahinga at paglilibang?",
    options: ["Children should never work", "Children have the right to relax, play, and join in activities", "Children should sleep 20 hours a day", "Leisure is only for weekends"],
    optionsFil: ["Hindi dapat magtrabaho ang mga bata", "Ang mga bata ay may karapatang mag-relax, maglaro, at sumali sa mga aktibidad", "Dapat matulog ang mga bata ng 20 oras sa isang araw", "Ang paglilibang ay para lamang sa katapusan ng linggo"],
    correctAnswer: 1,
    explanation: "Every child has the right to rest and leisure, to engage in play and recreational activities appropriate to their age.",
    explanationFil: "Bawat bata ay may karapatan sa pahinga at paglilibang, na makilahok sa paglalaro at mga aktibidad na panlibangan na angkop sa kanilang edad."
  },
  {
    id: '16',
    question: "What does 'Non-discrimination' mean in child rights?",
    questionFil: "Ano ang ibig sabihin ng 'Walang Diskriminasyon' sa mga karapatan ng bata?",
    options: ["Only some children have rights", "All children have rights regardless of race, gender, or religion", "Rights are only for citizens", "Rights are only for adults"],
    optionsFil: ["Ilang bata lang ang may karapatan", "Lahat ng bata ay may karapatan anuman ang lahi, kasarian, o relihiyon", "Ang mga karapatan ay para lamang sa mga mamamayan", "Ang mga karapatan ay para lamang sa mga matatanda"],
    correctAnswer: 1,
    explanation: "The Convention applies to every child without discrimination, whatever their ethnicity, gender, religion, or abilities.",
    explanationFil: "Nalalapat ang Convention sa bawat bata nang walang diskriminasyon, anuman ang kanilang etnisidad, kasarian, relihiyon, o kakayahan."
  },
  {
    id: '17',
    question: "What is the right to information?",
    questionFil: "Ano ang karapatan sa impormasyon?",
    options: ["Children should know everything about everyone", "Children should have access to information from the media that is important for their well-being", "Children should only read school books", "Information is only for adults"],
    optionsFil: ["Dapat malaman ng mga bata ang lahat tungkol sa lahat", "Dapat magkaroon ang mga bata ng access sa impormasyon mula sa media na mahalaga para sa kanilang kapakanan", "Dapat lamang magbasa ang mga bata ng mga libro sa paaralan", "Ang impormasyon ay para lamang sa mga matatanda"],
    correctAnswer: 1,
    explanation: "Children should have access to information from various sources, especially those aimed at promoting their social and moral well-being.",
    explanationFil: "Ang mga bata ay dapat magkaroon ng access sa impormasyon mula sa iba't ibang mapagkukunan, lalo na ang mga naglalayong itaguyod ang kanilang panlipunan at moral na kapakanan."
  },
  {
    id: '18',
    question: "What is 'Child Labor'?",
    questionFil: "Ano ang 'Child Labor'?",
    options: ["Helping with chores at home", "Work that is dangerous or interferes with a child's education", "A summer job for a 17-year-old", "Volunteering at a library"],
    optionsFil: ["Pagtulong sa mga gawaing bahay", "Trabaho na mapanganib o nakakaabala sa edukasyon ng isang bata", "Isang summer job para sa isang 17 taong gulang", "Pagboboluntaryo sa isang library"],
    correctAnswer: 1,
    explanation: "Child labor refers to work that is mentally, physically, socially or morally dangerous and harmful to children.",
    explanationFil: "Ang child labor ay tumutukoy sa trabaho na mental, pisikal, panlipunan o moral na mapanganib at nakakasama sa mga bata."
  },
  {
    id: '19',
    question: "What is the right to a standard of living?",
    questionFil: "Ano ang karapatan sa antas ng pamumuhay?",
    options: ["Every child should have a mansion", "Every child has the right to a standard of living adequate for their development", "Only rich children have this right", "Standard of living is not a right"],
    optionsFil: ["Dapat may mansyon ang bawat bata", "Bawat bata ay may karapatan sa isang antas ng pamumuhay na sapat para sa kanilang pag-unlad", "Ang mga mayayamang bata lamang ang may ganitong karapatan", "Ang antas ng pamumuhay ay hindi isang karapatan"],
    correctAnswer: 1,
    explanation: "Children have the right to a standard of living that is good enough to meet their physical and mental needs.",
    explanationFil: "Ang mga bata ay may karapatan sa isang antas ng pamumuhay na sapat upang matugunan ang kanilang pisikal at mental na pangangailangan."
  },
  {
    id: '20',
    question: "How can you be a 'Child Rights Defender'?",
    questionFil: "Paano ka magiging isang 'Tagapagtanggol ng mga Karapatan ng Bata'?",
    options: ["By ignoring problems", "By speaking up for yourself and others and learning about your rights", "By being the loudest person in the room", "By only focusing on your own needs"],
    optionsFil: ["Sa pamamagitan ng pagbabalewala sa mga problema", "Sa pamamagitan ng pagsasalita para sa iyong sarili at sa iba at pag-aaral tungkol sa iyong mga karapatan", "Sa pamamagitan ng pagiging pinakamaingay na tao sa silid", "Sa pamamagitan ng pagtuon lamang sa iyong sariling mga pangangailangan"],
    correctAnswer: 1,
    explanation: "Anyone can be a defender by learning about rights, respecting the rights of others, and speaking up when they see unfairness.",
    explanationFil: "Kahit sino ay maaaring maging tagapagtanggol sa pamamagitan ng pag-aaral tungkol sa mga karapatan, paggalang sa mga karapatan ng iba, at pagsasalita kapag nakakakita sila ng kawalan ng katarungan."
  }
];

export const LIBRARY_BOOKS: LibraryBook[] = [
  {
    id: 'ph-constitution-rights',
    title: "Children's Rights: PH Constitution",
    titleFil: "Mga Karapatan ng Bata: Konstitusyon ng PH",
    category: "Constitution",
    categoryFil: "Konstitusyon",
    content: "The 1987 Philippine Constitution and the Child and Youth Welfare Code (PD 603) protect your rights. Here are the specific rights every Filipino child has:\n\n• The right to be born well.\n• The right to a wholesome family life.\n• The right to be raised well and become a contributing member of society.\n• The right to basic needs like food, water, shelter, and health care.\n• The right to a well-rounded life in a safe environment.\n• The right to education.\n• The right to play, rest, and enjoy being a child.\n• The right to be protected from abuse, neglect, and exploitation.\n• The right to live in a peaceful and productive community.\n• The right to be helped and protected by the government.\n• The right to special care if parents or guardians are absent.\n• The right to grow up as a free individual in a democratic society.\n\nThese rights are guaranteed by Article XV of our Constitution to ensure every child can reach their full potential.",
    contentFil: "Ang 1987 Konstitusyon ng Pilipinas at ang Child and Youth Welfare Code (PD 603) ay nagpoprotekta sa iyong mga karapatan. Narito ang mga partikular na karapatan na mayroon ang bawat batang Pilipino:\n\n• Ang karapatang maisilang nang maayos.\n• Ang karapatan sa isang malusog na buhay pamilya.\n• Ang karapatang mapalaki nang maayos at maging isang kapaki-pakinabang na miyembro ng lipunan.\n• Ang karapatan sa mga pangunahing pangangailangan tulad ng pagkain, tubig, tirahan, at pangangalagang pangkalusugan.\n• Ang karapatan sa isang balanseng buhay sa isang ligtas na kapaligiran.\n• Ang karapatan sa edukasyon.\n• Ang karapatang maglaro, magpahinga, at mag-enjoy bilang isang bata.\n• Ang karapatang maprotektahan mula sa pang-aabuso, pagpapabaya, at pagsasamantala.\n• Ang karapatang manirahan sa isang mapayapa at produktibong komunidad.\n• Ang karapatang matulungan at maprotektahan ng pamahalaan.\n• Ang karapatan sa espesyal na pangangalaga kung ang mga magulang o tagapag-alaga ay wala.\n• Ang karapatang lumaki bilang isang malayang indibidwal sa isang demokratikong lipunan.\n\nAng mga karapatang ito ay ginagarantiyahan ng Artikulo XV ng ating Konstitusyon upang matiyak na ang bawat bata ay maabot ang kanilang buong potensyal."
  },
  {
    id: 'rights-101',
    title: "Child Rights 101",
    titleFil: "Karapatan ng Bata 101",
    category: "Rights",
    categoryFil: "Mga Karapatan",
    content: "The UN Convention on the Rights of the Child (UNCRC) is a legally-binding international agreement setting out the civil, political, economic, social and cultural rights of every child, regardless of their race, religion or abilities.\n\nIt consists of 54 articles that cover everything from the right to a name to the right to be protected from violence. It is the most widely ratified human rights treaty in history.",
    contentFil: "Ang UN Convention on the Rights of the Child (UNCRC) ay isang legal na nagbubuklod na internasyonal na kasunduan na nagtatakda ng mga sibil, pampulitika, pang-ekonomiya, panlipunan at pangkulturang karapatan ng bawat bata, anuman ang kanilang lahi, relihiyon o kakayahan.\n\nBinubuo ito ng 54 na artikulo na sumasaklaw sa lahat mula sa karapatan sa isang pangalan hanggang sa karapatang maprotektahan mula sa karahasan. Ito ang pinakamalawak na niratipikahang kasunduan sa karapatang pantao sa kasaysayan."
  },
  {
    id: 'safety-online',
    title: "Staying Safe Online",
    titleFil: "Pananatiling Ligtas Online",
    category: "Safety",
    categoryFil: "Kaligtasan",
    content: "Never share your password with anyone except your parents. Be careful about what you post, as it stays online forever. If someone makes you feel uncomfortable, block them and tell an adult.\n\nRemember: People online are not always who they say they are. Never meet someone you met online in person without a trusted adult with you.",
    contentFil: "Huwag kailanman ibahagi ang iyong password sa sinuman maliban sa iyong mga magulang. Maging maingat sa iyong pino-post, dahil mananatili ito online habang-buhay. Kung may nagpapadama sa iyo ng hindi komportable, i-block sila at sabihin sa isang matanda.\n\nTandaan: Ang mga tao online ay hindi laging kung sino ang sinasabi nila. Huwag kailanman makipagkita sa isang taong nakilala mo online nang personal nang walang kasamang pinagkakatiwalaang matanda."
  },
  {
    id: 'bullying-prevention',
    title: "Standing Up to Bullying",
    titleFil: "Pagtatanggol Laban sa Pambu-bully",
    category: "Well-being",
    categoryFil: "Kapakanan",
    content: "Bullying is repeated behavior intended to hurt someone physically or emotionally. It can happen in person or online.\n\nIf you are being bullied: Tell someone you trust. Don't fight back, as it might make things worse. Stay in a group. You are not alone, and it is not your fault.",
    contentFil: "Ang pambu-bully ay paulit-ulit na pag-uugali na naglalayong saktan ang isang tao nang pisikal o emosyonal. Maaari itong mangyari nang personal o online.\n\nKung ikaw ay binu-bully: Sabihin sa isang taong pinagkakatiwalaan mo. Huwag lumaban, dahil maaaring lalong lumala ang sitwasyon. Manatili sa isang grupo. Hindi ka nag-iisa, at hindi mo ito kasalanan."
  },
  {
    id: 'mental-health',
    title: "Mind Matters: Mental Health",
    titleFil: "Mahalaga ang Isip: Kalusugan ng Kaisipan",
    category: "Health",
    categoryFil: "Kalusugan",
    content: "Mental health is just as important as physical health. It's okay not to be okay. Talking about your feelings is a sign of strength, not weakness.\n\nPractice self-care: Get enough sleep, eat well, and spend time doing things you love. If you feel overwhelmed, talk to a counselor, teacher, or parent.",
    contentFil: "Ang kalusugan ng kaisipan ay kasinghalaga ng pisikal na kalusugan. Okay lang na hindi maging okay. Ang pakikipag-usap tungkol sa iyong nararamdaman ay tanda ng lakas, hindi kahinaan.\n\nMagpraktis ng self-care: Matulog nang sapat, kumain nang maayos, at maglaan ng oras sa paggawa ng mga bagay na gusto mo. Kung nakakaramdam ka ng labis na pagkabahala, makipag-usap sa isang counselor, guro, o magulang."
  },
  {
    id: 'education-future',
    title: "The Power of Education",
    titleFil: "Ang Kapangyarihan ng Edukasyon",
    category: "Education",
    categoryFil: "Edukasyon",
    content: "Education is the key to unlocking your potential. It's not just about learning facts; it's about learning how to think, solve problems, and understand the world.\n\nEvery child has the right to learn. If you are struggling in school, don't be afraid to ask for help. Your future starts with what you learn today.",
    contentFil: "Edukasyon ang susi sa pag-unlock ng iyong potensyal. Hindi lang ito tungkol sa pag-aaral ng mga katotohanan; ito ay tungkol sa pag-aaral kung paano mag-isip, malutas ang mga problema, at maunawaan ang mundo.\n\nBawat bata ay may karapatang matuto. Kung nahihirapan ka sa paaralan, huwag matakot na humingi ng tulong. Ang iyong kinabukasan ay nagsisimula sa kung ano ang natututuhan mo ngayon."
  },
  {
    id: 'environmental-rights',
    title: "A Clean World: Environmental Rights",
    titleFil: "Isang Malinis na Mundo: Mga Karapatang Pangkapaligiran",
    category: "Environment",
    categoryFil: "Kapaligiran",
    content: "Children have the right to live in a clean and safe environment. This includes clean air to breathe and safe water to drink.\n\nWe all have a responsibility to protect our planet. Small actions like recycling, saving water, and planting trees can make a big difference for your future and the generations to come.",
    contentFil: "Ang mga bata ay may karapatang manirahan sa isang malinis at ligtas na kapaligiran. Kasama rito ang malinis na hangin na malalanghap at ligtas na tubig na maiinom.\n\nLahat tayo ay may responsibilidad na protektahan ang ating planeta. Ang maliliit na aksyon tulad ng pag-recycle, pagtitipid ng tubig, at pagtatanim ng mga puno ay makakagawa ng malaking pagkakaiba para sa iyong kinabukasan at sa mga susunod na henerasyon."
  },
  {
    id: 'participation-voice',
    title: "Your Voice Matters",
    titleFil: "Mahalaga ang Iyong Boses",
    category: "Rights",
    categoryFil: "Mga Karapatan",
    content: "The right to participation means that children should be heard in all matters that affect them. Whether it's at home, in school, or in the community, your opinion counts.\n\nBeing a participant means sharing your ideas, asking questions, and helping make decisions. It's about being an active member of society and helping shape a better world for everyone.",
    contentFil: "Ang karapatan sa pakikilahok ay nangangahulugan na ang mga bata ay dapat pakinggan sa lahat ng bagay na nakakaapekto sa kanila. Sa bahay man, sa paaralan, o sa komunidad, mahalaga ang iyong opinyon.\n\nAng pagiging kalahok ay nangangahulugan ng pagbabahagi ng iyong mga ideya, pagtatanong, at pagtulong sa paggawa ng mga desisyon. Ito ay tungkol sa pagiging isang aktibong miyembro ng lipunan at pagtulong sa paghubog ng isang mas magandang mundo para sa lahat."
  },
  {
    id: 'global-citizenship',
    title: "Children of the World",
    titleFil: "Mga Bata ng Mundo",
    category: "Culture",
    categoryFil: "Kultura",
    content: "Children all over the world share the same rights, but they live in many different ways. Learning about other cultures helps us understand and respect each other.\n\nGlobal citizenship is about recognizing that we are all connected. By respecting diversity and standing up for the rights of all children everywhere, we help build a more peaceful and just world.",
    contentFil: "Ang mga bata sa buong mundo ay nagbabahagi ng parehong mga karapatan, ngunit namumuhay sila sa maraming iba't ibang paraan. Ang pag-aaral tungkol sa ibang mga kultura ay tumutulong sa atin na maunawaan at igalang ang isa't isa.\n\nAng pandaigdigang pagkamamamayan ay tungkol sa pagkilala na tayong lahat ay konektado. Sa pamamagitan ng paggalang sa pagkakaiba-iba at pagtatanggol sa mga karapatan ng lahat ng bata sa lahat ng dako, tumutulong tayo sa pagbuo ng isang mas mapayapa at makatarungang mundo."
  }
];

export const CHILD_RIGHTS = [
  { title: "Right to Education", titleFil: "Karapatan sa Edukasyon", description: "Every child has the right to go to school and learn.", descriptionFil: "Bawat bata ay may karapatang pumasok sa paaralan at matuto." },
  { title: "Right to Health", titleFil: "Karapatan sa Kalusugan", description: "Every child has the right to medical care, clean water, and nutritious food.", descriptionFil: "Bawat bata ay may karapatan sa medikal na pangangalaga, malinis na tubig, at masustansyang pagkain." },
  { title: "Right to Play", titleFil: "Karapatang Maglaro", description: "Every child has the right to rest, play, and join in cultural and artistic activities.", descriptionFil: "Bawat bata ay may karapatang magpahinga, maglaro, at sumali sa mga aktibidad na pangkultura at pansining." },
  { title: "Right to Protection", titleFil: "Karapatan sa Proteksyon", description: "Every child has the right to be protected from violence, abuse, and neglect.", descriptionFil: "Bawat bata ay may karapatang maprotektahan mula sa karahasan, pang-aabuso, at pagpapabaya." },
  { title: "Right to a Name", titleFil: "Karapatan sa Pangalan", description: "Every child has the right to a name and a nationality from birth.", descriptionFil: "Bawat bata ay may karapatan sa isang pangalan at nasyonalidad mula sa pagsilang." },
  { title: "Right to Expression", titleFil: "Karapatan sa Pagpapahayag", description: "Every child has the right to say what they think and be heard.", descriptionFil: "Bawat bata ay may karapatang sabihin ang kanilang iniisip at mapakinggan." },
  { title: "Right to Family", titleFil: "Karapatan sa Pamilya", description: "Every child has the right to live with their parents unless it's not safe for them.", descriptionFil: "Bawat bata ay may karapatang manirahan kasama ang kanilang mga magulang maliban kung hindi ito ligtas para sa kanila." },
  { title: "Right to Equality", titleFil: "Karapatan sa Pagkakapantay-pantay", description: "Every child has the right to be treated fairly regardless of race, gender, or religion.", descriptionFil: "Bawat bata ay may karapatang tratuhin nang patas anuman ang lahi, kasarian, o relihiyon." },
  { title: "Right to Privacy", titleFil: "Karapatan sa Privacy", description: "Children have the right to privacy and protection from interference in their private lives.", descriptionFil: "Ang mga bata ay may karapatan sa privacy at proteksyon mula sa pakikialam sa kanilang pribadong buhay." },
  { title: "Protection from Labor", titleFil: "Proteksyon mula sa Paggawa", description: "Children must be protected from work that is dangerous or interferes with their education.", descriptionFil: "Dapat protektahan ang mga bata mula sa trabaho na mapanganib o nakakaabala sa kanilang edukasyon." },
  { title: "Right to Information", titleFil: "Karapatan sa Impormasyon", description: "Children have the right to get information from the internet, radio, television, and newspapers.", descriptionFil: "Ang mga bata ay may karapatang makakuha ng impormasyon mula sa internet, radyo, telebisyon, at mga pahayagan." },
  { title: "Special Care", titleFil: "Espesyal na Pangangalaga", description: "Children with disabilities have the right to special care and support to live a full life.", descriptionFil: "Ang mga batang may kapansanan ay may karapatan sa espesyal na pangangalaga at suporta upang mamuhay nang ganap." }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-run',
    title: "First Steps",
    description: "Complete your first run in Survival Mode.",
    unlocked: false,
    icon: "Footprints"
  },
  {
    id: 'quiz-master',
    title: "Scholar",
    description: "Answer 5 quiz questions correctly.",
    unlocked: false,
    icon: "GraduationCap"
  },
  {
    id: 'caregiver',
    title: "Best Friend",
    description: "Keep all character stats above 90% for a day.",
    unlocked: false,
    icon: "Heart"
  }
];
