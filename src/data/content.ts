import {
  BookOpen,
  CalendarCheck,
  ClipboardList,
  GraduationCap,
  Heart,
  Landmark,
  MapPin,
  Megaphone,
  Microchip,
  Presentation,
  Scissors,
  Share2,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Syringe,
  Timer,
  Truck,
  Users,
} from 'lucide-react';
import { PetBowlIcon, type IconComponent } from '../components/icons';
import { BUSAO_TOTALS } from './busaoStats';

export const CONTACT = {
  whatsapp: '5586999999999',
  whatsappLabel: '(86) 99999-9999',
  /** Link do canal oficial (https://whatsapp.com/channel/...). Vazio esconde o botão "Seguir o canal". */
  whatsappChannel: '' as string,
  email: 'contato@digitaldacausaanimal.com.br',
  instagram: 'https://instagram.com/digitaldacausaanimal',
  instagramLabel: '@digitaldacausaanimal',
  facebook: 'https://facebook.com/digitaldacausaanimal',
  location: 'Teresina – Piauí',
} as const;

export interface NavItem {
  id: string;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'sobre', label: 'Sobre' },
  { id: 'pacto', label: 'Pacto pelos Animais' },
  { id: 'busao', label: 'Busão da Castração' },
  { id: 'educacao', label: 'Educação' },
  { id: 'denuncia', label: 'Denúncia' },
  { id: 'duvidas', label: 'Dúvidas' },
];

export interface Service {
  id: string;
  title: string;
  icon: IconComponent;
  href: string;
}

export const SERVICES: Service[] = [
  { id: 'castracoes', title: 'Castrações', icon: Scissors, href: '#busao' },
  { id: 'microchipagem', title: 'Microchipagem', icon: Microchip, href: '#busao' },
  { id: 'racao', title: 'Doação de ração', icon: PetBowlIcon, href: '#ajudar' },
  { id: 'denuncias', title: 'Canal de denúncias', icon: Megaphone, href: '#denuncia' },
  { id: 'educacao', title: 'Educação nas escolas', icon: BookOpen, href: '#educacao' },
];

export const PACTO_PARTNERS: string[] = [
  'Semarh',
  'Saúde',
  'Segurança Pública',
  'Educação',
  'Planejamento',
  'MPPI',
];

export interface KeyFigure {
  value: string;
  label: string;
}

export const PACTO_KEY_FIGURES: KeyFigure[] = [
  { value: '224', label: 'municípios contemplados' },
  { value: '+21 mil', label: 'castrações previstas' },
  { value: '1 t/mês', label: 'de ração distribuída' },
  { value: '+R$ 20 mi', label: 'em investimento' },
];

export interface PactoAction {
  title: string;
  description: string;
  icon: IconComponent;
}

export const PACTO_ACTIONS: PactoAction[] = [
  {
    title: 'Castração Gratuita',
    description:
      'Prevê a realização de mais de 21 mil castrações de cães e gatos através de unidades itinerantes (como o Busão da Castração / Castramóvel) que atendem a capital e o interior do estado.',
    icon: Scissors,
  },
  {
    title: 'Distribuição de Ração',
    description:
      'Previsão de entrega de uma tonelada de ração por mês para apoiar protetores e entidades da causa animal.',
    icon: PetBowlIcon,
  },
  {
    title: 'Educação Ambiental e Cidadania',
    description:
      'Inclusão de conteúdos educativos sobre guarda responsável e combate aos maus-tratos na rede estadual de ensino.',
    icon: GraduationCap,
  },
  {
    title: 'Infraestrutura e Investimento',
    description:
      'O programa é impulsionado por um aporte superior a R$ 20 milhões destinados a estruturar o atendimento e o monitoramento da fauna doméstica nos 12 territórios de desenvolvimento do Piauí.',
    icon: Landmark,
  },
  {
    title: 'Combate aos Maus-Tratos',
    description:
      'Integração com a Secretaria de Segurança Pública para reforçar a fiscalização e a denúncia de abusos contra animais.',
    icon: ShieldAlert,
  },
];

export interface Stat {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  icon: IconComponent;
}

export const STATS: Stat[] = [
  { value: BUSAO_TOTALS.pets, label: 'pets castrados e microchipados', icon: Stethoscope },
  { value: BUSAO_TOTALS.tutors, label: 'tutores atendidos', icon: Users },
  { value: BUSAO_TOTALS.hubCities, label: 'cidades-polo e região', icon: MapPin },
  { value: BUSAO_TOTALS.actions, label: 'ações do Busão da Castração', icon: Truck },
];

export interface Step {
  title: string;
  description: string;
  icon: IconComponent;
}

export const CASTRA_STEPS: Step[] = [
  {
    title: 'Inscrição',
    description: 'Acompanhe a divulgação oficial e se inscreva quando o Busão estiver na sua cidade ou numa cidade-polo vizinha.',
    icon: ClipboardList,
  },
  {
    title: 'Agendamento',
    description: 'O tutor recebe a data, o horário e o local do atendimento do Busão da Castração.',
    icon: CalendarCheck,
  },
  {
    title: 'Preparação',
    description: 'Siga o jejum e as orientações da equipe para um procedimento seguro.',
    icon: Timer,
  },
  {
    title: 'Cirurgia e pós',
    description: 'Castração com anestesia segura, microchip e orientações de recuperação.',
    icon: Stethoscope,
  },
];

export interface Feature {
  title: string;
  description: string;
  icon: IconComponent;
}

export const EDUCATION_FEATURES: Feature[] = [
  {
    title: 'Palestras interativas',
    description: 'Conteúdo adaptado para cada faixa etária, do infantil ao ensino médio.',
    icon: Presentation,
  },
  {
    title: 'Oficinas lúdicas',
    description: 'Brincadeiras, desenhos e histórias que despertam a empatia pelos animais.',
    icon: Sparkles,
  },
  {
    title: 'Material didático',
    description: 'Cartilhas gratuitas para professores continuarem o tema em sala de aula.',
    icon: BookOpen,
  },
];

export const CARE_TIPS: Feature[] = [
  {
    title: 'Vacinas em dia',
    description: 'Antirrábica e polivalentes protegem seu pet e toda a família.',
    icon: Syringe,
  },
  {
    title: 'Identificação',
    description: 'Coleira com plaquinha e microchip aumentam as chances de reencontro.',
    icon: ShieldCheck,
  },
  {
    title: 'Água e alimento',
    description: 'Água fresca sempre à vontade e ração de qualidade todos os dias.',
    icon: PetBowlIcon,
  },
  {
    title: 'Carinho e passeios',
    description: 'Atenção, brincadeiras e abrigo do sol e da chuva são essenciais.',
    icon: Heart,
  },
];

export const HELP_OPTIONS: Feature[] = [
  {
    title: 'Doe ração',
    description: 'Cada quilo vira refeição para animais resgatados e de protetores independentes.',
    icon: PetBowlIcon,
  },
  {
    title: 'Compartilhe',
    description: 'Divulgar nossas ações nas redes leva castração e informação a mais gente.',
    icon: Share2,
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'A castração é realmente gratuita?',
    answer:
      'Sim! Todo o atendimento do Busão da Castração é 100% gratuito para o tutor: avaliação, cirurgia, anestesia e microchipagem.',
  },
  {
    question: 'A partir de qual idade posso castrar meu pet?',
    answer:
      'Cães e gatos podem ser castrados a partir dos 6 meses de idade, desde que estejam saudáveis. A equipe veterinária faz uma avaliação antes do procedimento.',
  },
  {
    question: 'A fêmea precisa ter uma cria antes de castrar?',
    answer:
      'Não, isso é um mito. Castrar antes do primeiro cio reduz drasticamente o risco de tumores de mama e infecções no útero.',
  },
  {
    question: 'A castração muda o comportamento do animal?',
    answer:
      'Para melhor! Diminui fugas, brigas e marcação de território. O pet continua brincalhão e carinhoso. Com alimentação equilibrada, ele não engorda.',
  },
  {
    question: 'O microchip dói? Para que serve?',
    answer:
      'É do tamanho de um grão de arroz e aplicado sob a pele, como uma vacina. Ele guarda um número único ligado aos dados do tutor, facilitando o reencontro em caso de perda.',
  },
  {
    question: 'Como faço uma denúncia de maus-tratos?',
    answer:
      'Em casos de flagrante ou situação de emergência, ligue para o 190. Para formalizar a denúncia, informe o endereço completo do local, descreva a situação e relate os fatos com o máximo de detalhes possível. Se for seguro, reúna provas, como fotos ou vídeos, sem se colocar em risco. Sua identidade poderá ser preservada, caso você solicite.',
  },
];