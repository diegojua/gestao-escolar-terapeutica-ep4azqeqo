import {
  Client,
  Student,
  Service,
  Appointment,
  Invoice,
  Payment,
  DiscountPackage,
  Notification,
  Dependency,
} from '@/lib/types'
import { subDays, addDays, addHours, format, sub } from 'date-fns'

export const MOCK_CLIENTS: Client[] = [
  {
    id: 'cli-1',
    fullName: 'Ana Silva',
    cpf: '123.456.789-01',
    phone: '(11) 98765-4321',
    email: 'ana.silva@example.com',
    address: 'Rua das Flores, 123, São Paulo, SP',
  },
  {
    id: 'cli-2',
    fullName: 'Bruno Costa',
    cpf: '234.567.890-12',
    phone: '(21) 91234-5678',
    email: 'bruno.costa@example.com',
    address: 'Avenida Copacabana, 456, Rio de Janeiro, RJ',
  },
  {
    id: 'cli-3',
    fullName: 'Carla Dias',
    cpf: '345.678.901-23',
    phone: '(31) 95678-1234',
    email: 'carla.dias@example.com',
    address: 'Praça da Liberdade, 789, Belo Horizonte, MG',
  },
  {
    id: 'cli-4',
    fullName: 'Daniel Martins',
    cpf: '456.789.012-34',
    phone: '(41) 98765-4321',
    email: 'daniel.martins@example.com',
    address: 'Rua XV de Novembro, 101, Curitiba, PR',
  },
  {
    id: 'cli-5',
    fullName: 'Eduarda Ferreira',
    cpf: '567.890.123-45',
    phone: '(51) 91234-5678',
    email: 'eduarda.ferreira@example.com',
    address: 'Avenida Ipiranga, 202, Porto Alegre, RS',
  },
]

export const MOCK_SERVICES: Service[] = [
  {
    id: 'ser-1',
    name: 'Aulas de Matemática',
    description:
      'Reforço escolar em matemática para ensino fundamental e médio.',
    standardPrice: 80.0,
    standardDuration: 60,
    associatedProfessionals: ['Prof. Carlos', 'Prof. Mariana'],
  },
  {
    id: 'ser-2',
    name: 'Terapia Ocupacional',
    description: 'Sessões de terapia ocupacional para crianças e adolescentes.',
    standardPrice: 150.0,
    standardDuration: 50,
    associatedProfessionals: ['Dra. Lúcia', 'Dr. Pedro'],
  },
  {
    id: 'ser-3',
    name: 'Fonoaudiologia',
    description: 'Tratamento para distúrbios da fala e linguagem.',
    standardPrice: 130.0,
    standardDuration: 45,
    associatedProfessionals: ['Dra. Sofia'],
  },
  {
    id: 'ser-4',
    name: 'Aulas de Português',
    description: 'Aulas de reforço em português e redação.',
    standardPrice: 75.0,
    standardDuration: 60,
    associatedProfessionals: ['Prof. Ricardo'],
  },
]

export const MOCK_STUDENTS: Student[] = [
  {
    id: 'stu-1',
    fullName: 'Lucas Silva',
    birthDate: '2010-05-15',
    responsibleClientId: 'cli-1',
    responsibleClientName: 'Ana Silva',
    contractedServices: ['ser-1', 'ser-4'],
    nextAppointment: format(addDays(new Date(), 2), 'dd/MM/yyyy'),
  },
  {
    id: 'stu-2',
    fullName: 'Juliana Costa',
    birthDate: '2012-09-20',
    responsibleClientId: 'cli-2',
    responsibleClientName: 'Bruno Costa',
    contractedServices: ['ser-2'],
    nextAppointment: format(addDays(new Date(), 1), 'dd/MM/yyyy'),
  },
  {
    id: 'stu-3',
    fullName: 'Pedro Dias',
    birthDate: '2011-02-10',
    responsibleClientId: 'cli-3',
    responsibleClientName: 'Carla Dias',
    contractedServices: ['ser-3'],
    nextAppointment: format(addDays(new Date(), 3), 'dd/MM/yyyy'),
  },
  {
    id: 'stu-4',
    fullName: 'Mariana Martins',
    birthDate: '2013-11-30',
    responsibleClientId: 'cli-4',
    responsibleClientName: 'Daniel Martins',
    contractedServices: ['ser-1'],
    nextAppointment: format(addDays(new Date(), 5), 'dd/MM/yyyy'),
  },
]

const now = new Date()
export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'app-1',
    studentId: 'stu-2',
    studentName: 'Juliana Costa',
    serviceId: 'ser-2',
    serviceName: 'Terapia Ocupacional',
    professional: 'Dra. Lúcia',
    start: addHours(now, 2),
    end: addHours(now, 2.83),
    status: 'Agendado',
  },
  {
    id: 'app-2',
    studentId: 'stu-1',
    studentName: 'Lucas Silva',
    serviceId: 'ser-1',
    serviceName: 'Aulas de Matemática',
    professional: 'Prof. Carlos',
    start: addHours(now, 4),
    end: addHours(now, 5),
    status: 'Agendado',
  },
  {
    id: 'app-3',
    studentId: 'stu-3',
    studentName: 'Pedro Dias',
    serviceId: 'ser-3',
    serviceName: 'Fonoaudiologia',
    professional: 'Dra. Sofia',
    start: addDays(now, 1),
    end: addDays(addHours(now, 0.75), 1),
    status: 'Agendado',
  },
  {
    id: 'app-4',
    studentId: 'stu-4',
    studentName: 'Mariana Martins',
    serviceId: 'ser-1',
    serviceName: 'Aulas de Matemática',
    professional: 'Prof. Mariana',
    start: addDays(now, 2),
    end: addDays(addHours(now, 1), 2),
    status: 'Agendado',
  },
  {
    id: 'app-5',
    studentId: 'stu-1',
    studentName: 'Lucas Silva',
    serviceId: 'ser-4',
    serviceName: 'Aulas de Português',
    professional: 'Prof. Ricardo',
    start: subDays(now, 1),
    end: subDays(addHours(now, 1), 1),
    status: 'Concluído',
  },
]

export const MOCK_INVOICES: Invoice[] = [
  {
    id: 'inv-1',
    invoiceNumber: '2024-001',
    clientId: 'cli-1',
    clientName: 'Ana Silva',
    studentName: 'Lucas Silva',
    issueDate: '2024-06-01',
    dueDate: '2024-06-10',
    totalAmount: 310.0,
    status: 'Paga',
  },
  {
    id: 'inv-2',
    invoiceNumber: '2024-002',
    clientId: 'cli-2',
    clientName: 'Bruno Costa',
    studentName: 'Juliana Costa',
    issueDate: '2024-06-05',
    dueDate: '2024-06-15',
    totalAmount: 600.0,
    status: 'Pendente',
  },
  {
    id: 'inv-3',
    invoiceNumber: '2024-003',
    clientId: 'cli-3',
    clientName: 'Carla Dias',
    studentName: 'Pedro Dias',
    issueDate: '2024-05-20',
    dueDate: '2024-05-30',
    totalAmount: 520.0,
    status: 'Atrasada',
  },
  {
    id: 'inv-4',
    invoiceNumber: '2024-004',
    clientId: 'cli-4',
    clientName: 'Daniel Martins',
    studentName: 'Mariana Martins',
    issueDate: '2024-06-10',
    dueDate: '2024-06-20',
    totalAmount: 320.0,
    status: 'Pendente',
  },
]

export const MOCK_PAYMENTS: Payment[] = [
  {
    id: 'pay-1',
    invoiceId: 'inv-1',
    clientId: 'cli-1',
    clientName: 'Ana Silva',
    paymentDate: '2024-06-08',
    amountPaid: 310.0,
    paymentMethod: 'Pix',
  },
]

export const MOCK_DISCOUNTS: DiscountPackage[] = [
  {
    id: 'dis-1',
    name: 'Desconto Irmãos',
    type: 'Desconto Percentual',
    value: 10,
    applicableServices: ['ser-1', 'ser-2', 'ser-3', 'ser-4'],
    conditions: 'Aplicável para 2 ou mais irmãos matriculados.',
  },
  {
    id: 'dis-2',
    name: 'Pacote Terapia Completa',
    type: 'Pacote de Serviços',
    value: 500,
    applicableServices: ['ser-2', 'ser-3'],
    conditions: 'Pacote mensal com 4 sessões de T.O. e 4 de Fono.',
  },
]

export const MOCK_CASH_FLOW = [
  { date: '01/06', revenue: 4000, expenses: 2400 },
  { date: '02/06', revenue: 3000, expenses: 1398 },
  { date: '03/06', revenue: 2000, expenses: 9800 },
  { date: '04/06', revenue: 2780, expenses: 3908 },
  { date: '05/06', revenue: 1890, expenses: 4800 },
  { date: '06/06', revenue: 2390, expenses: 3800 },
  { date: '07/06', revenue: 3490, expenses: 4300 },
]

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-1',
    type: 'invoice',
    title: 'Fatura Vencendo',
    message: 'A fatura #2024-002 para Bruno Costa vence em 3 dias.',
    timestamp: sub(new Date(), { days: 1 }),
    read: false,
    link: '/financeiro',
  },
  {
    id: 'notif-2',
    type: 'appointment',
    title: 'Agendamento Próximo',
    message: 'Sessão de Terapia Ocupacional com Juliana Costa em 1 hora.',
    timestamp: sub(new Date(), { hours: 2 }),
    read: false,
    link: '/agenda',
  },
  {
    id: 'notif-3',
    type: 'invoice',
    title: 'Fatura Atrasada',
    message: 'A fatura #2024-003 para Carla Dias está atrasada.',
    timestamp: sub(new Date(), { days: 5 }),
    read: true,
    link: '/financeiro',
  },
  {
    id: 'notif-4',
    type: 'system',
    title: 'Atualização do Sistema',
    message: 'Nova funcionalidade de relatórios foi adicionada.',
    timestamp: sub(new Date(), { days: 7 }),
    read: true,
  },
]

export const MOCK_DEPENDENCIES: Dependency[] = [
  {
    id: 1,
    name: 'Backend Application Framework',
    type: 'Software (Framework)',
    description:
      'Fornece a estrutura para a lógica de negócios de todos os módulos (clientes, alunos, serviços, agenda, financeiro, profissionais, estoque, relatórios, notificações). Essencial para processar requisições, gerenciar dados e integrar com outros serviços.',
    sla: 'Tempo de resposta da API (ms), Uptime (%), Taxa de erros (%)',
  },
  {
    id: 2,
    name: 'Frontend Application Framework',
    type: 'Software (Framework)',
    description:
      'Constrói a interface de usuário interativa e responsiva para todos os módulos do sistema, incluindo dashboard, formulários de cadastro, calendários e relatórios. Garante a experiência do usuário em diferentes dispositivos.',
    sla: 'Tempo de carregamento da página (s), Tempo de interação (s), Uptime da UI (%)',
  },
  {
    id: 3,
    name: 'Sistema de Gerenciamento de Banco de Dados (SGBD)',
    type: 'Software (DBMS)',
    description:
      'Armazena de forma persistente e segura todos os dados do sistema (clientes, alunos, serviços, agendamentos, transações financeiras, profissionais, estoque, notificações). Crucial para a integridade e disponibilidade dos dados.',
    sla: 'Latência de leitura/escrita (ms), Uptime do banco de dados (%), Taxa de sucesso de transações (%)',
  },
  {
    id: 4,
    name: 'Sistema Operacional (para servidores)',
    type: 'Software (OS)',
    description:
      'Base para a execução do backend, SGBD e outros serviços. Gerencia recursos de hardware e fornece um ambiente seguro para as aplicações.',
    sla: 'Uptime do servidor (%), Utilização de CPU/Memória (%)',
  },
  {
    id: 5,
    name: 'Servidor Web/Proxy Reverso',
    type: 'Software',
    description:
      'Serve os arquivos estáticos do frontend e roteia as requisições da API para o backend. Essencial para a entrega de conteúdo e balanceamento de carga.',
    sla: 'Requisições por segundo (RPS), Latência de requisição (ms), Taxa de erros (%)',
  },
  {
    id: 6,
    name: 'Infraestrutura de Nuvem',
    type: 'Hardware/Serviço Externo',
    description:
      'Fornece os recursos computacionais (servidores virtuais), armazenamento de dados e rede necessários para hospedar o sistema, garantindo escalabilidade, alta disponibilidade e resiliência.',
    sla: 'Uptime dos serviços de nuvem (%), Latência de rede (ms), Durabilidade do armazenamento (%)',
  },
  {
    id: 7,
    name: 'Gateway de Pagamento',
    type: 'Serviço Externo',
    description:
      'Processa pagamentos online, automatiza a geração de faturas e boletos, e rastreia o status dos pagamentos. Fundamental para o módulo financeiro e a integração de pagamentos online.',
    sla: 'Uptime da API do gateway (%), Tempo de processamento da transação (s), Taxa de sucesso de transações (%)',
  },
  {
    id: 8,
    name: 'Serviço de Envio de E-mails/SMS',
    type: 'Serviço Externo',
    description:
      'Envia notificações automatizadas para pais/responsáveis sobre faturas, agendamentos, lembretes e outras comunicações importantes. Essencial para o módulo de notificações avançadas.',
    sla: 'Taxa de entrega de e-mails/SMS (%), Latência de envio (s)',
  },
  {
    id: 9,
    name: 'Biblioteca/Serviço de Geração de PDF',
    type: 'Biblioteca/Serviço Externo',
    description:
      'Gera faturas, boletos e relatórios financeiros em formato PDF para impressão ou download. Crucial para a funcionalidade de exportação do módulo financeiro e de relatórios.',
    sla: 'Tempo de geração de PDF (s), Precisão do layout (%)',
  },
  {
    id: 10,
    name: 'Biblioteca de Calendário/Agendamento (Frontend)',
    type: 'Biblioteca',
    description:
      'Oferece a interface interativa de calendário para o módulo de agenda, permitindo a visualização, criação, edição e cancelamento de aulas e sessões.',
    sla: 'Tempo de renderização do calendário (ms), Responsividade da UI (%)',
  },
  {
    id: 11,
    name: 'Sistema de Autenticação e Autorização',
    type: 'Software/Configuração',
    description:
      'Gerencia o acesso dos usuários ao sistema, garantindo que apenas usuários autorizados possam realizar ações específicas e acessar dados. Essencial para a segurança e controle de acesso.',
    sla: 'Latência de autenticação (ms), Taxa de sucesso de login (%), Vulnerabilidades de segurança (CVSS Score)',
  },
  {
    id: 12,
    name: 'Sistema de Monitoramento e Logging',
    type: 'Software/Serviço Externo',
    description:
      'Coleta métricas de desempenho e logs de eventos do sistema para identificar problemas, otimizar performance e garantir a resiliência.',
    sla: 'Tempo de ingestão de logs (s), Latência de alerta (s), Cobertura de métricas (%)',
  },
  {
    id: 13,
    name: 'Solução de Backup e Recuperação de Dados',
    type: 'Software/Serviço Externo/Configuração',
    description:
      'Garante que os dados do sistema possam ser restaurados em caso de falha, corrupção ou perda de dados, assegurando a continuidade do negócio.',
    sla: 'RPO (Recovery Point Objective), RTO (Recovery Time Objective)',
  },
  {
    id: 14,
    name: 'Sistema de Controle de Versão',
    type: 'Software',
    description:
      'Gerencia o código-fonte do sistema, permitindo o controle de alterações, colaboração entre desenvolvedores e rastreabilidade do histórico de desenvolvimento.',
    sla: 'Disponibilidade do repositório (%)',
  },
  {
    id: 15,
    name: 'Pipeline de CI/CD (Integração Contínua/Entrega Contínua)',
    type: 'Software/Serviço Externo',
    description:
      'Automatiza os processos de construção, teste e implantação do sistema, garantindo entregas rápidas, consistentes e com menos erros.',
    sla: 'Tempo de execução do pipeline (min), Taxa de sucesso do pipeline (%), Frequência de deploy',
  },
  {
    id: 16,
    name: 'Balanceador de Carga',
    type: 'Hardware/Software/Serviço Externo',
    description:
      'Distribui o tráfego de rede entre múltiplas instâncias do backend, garantindo alta disponibilidade, escalabilidade e melhor desempenho sob carga.',
    sla: 'Uptime do balanceador (%), Latência de distribuição (ms)',
  },
  {
    id: 17,
    name: 'Firewall/Grupos de Segurança',
    type: 'Hardware/Software/Configuração',
    description:
      'Controla o tráfego de rede de entrada e saída, protegendo o sistema contra acessos não autorizados e ataques cibernéticos.',
    sla: 'Número de tentativas de acesso bloqueadas, Tempo de resposta a incidentes de segurança',
  },
  {
    id: 18,
    name: 'Rede de Entrega de Conteúdo (CDN)',
    type: 'Serviço Externo',
    description:
      'Armazena em cache os ativos estáticos do frontend (imagens, CSS, JavaScript) em servidores geograficamente distribuídos, acelerando o carregamento da página para os usuários.',
    sla: 'Taxa de acerto do cache (%), Latência de entrega de conteúdo (ms)',
  },
  {
    id: 19,
    name: 'Sistema de Cache',
    type: 'Software/Serviço Externo',
    description:
      'Armazena dados frequentemente acessados na memória para reduzir a carga no banco de dados e acelerar o tempo de resposta das requisições.',
    sla: 'Taxa de acerto do cache (%), Latência de leitura/escrita do cache (ms)',
  },
  {
    id: 20,
    name: 'Orquestração de Contêineres',
    type: 'Software/Serviço Externo',
    description:
      'Automatiza a implantação, escalonamento e gerenciamento de aplicações conteinerizadas, aumentando a resiliência e a eficiência operacional.',
    sla: 'Uptime dos pods/contêineres (%), Tempo de deploy de novas versões (min)',
  },
  {
    id: 21,
    name: 'Biblioteca de Visualização de Dados (Frontend)',
    type: 'Biblioteca',
    description:
      'Renderiza gráficos e tabelas interativas para o dashboard e relatórios financeiros detalhados, facilitando a compreensão dos dados.',
    sla: 'Tempo de renderização do gráfico (ms), Precisão da visualização',
  },
  {
    id: 22,
    name: 'Gerenciamento de Configurações/Variáveis de Ambiente',
    type: 'Configuração',
    description:
      'Gerencia configurações específicas do ambiente (desenvolvimento, produção), chaves de API, strings de conexão com banco de dados, garantindo segurança e flexibilidade.',
    sla: 'Consistência das configurações entre ambientes (%)',
  },
  {
    id: 23,
    name: 'Conectividade de Rede',
    type: 'Hardware/Infraestrutura',
    description:
      'Conexão de internet estável e de alta velocidade para acesso dos usuários ao sistema e comunicação entre os componentes da infraestrutura.',
    sla: 'Uptime da rede (%), Largura de banda (Mbps), Latência (ms)',
  },
  {
    id: 24,
    name: 'Sistema de Nomes de Domínio (DNS)',
    type: 'Serviço Externo/Configuração',
    description:
      'Traduz nomes de domínio amigáveis (ex: `minhaescola.com.br`) para endereços IP, tornando o sistema acessível na internet.',
    sla: 'Tempo de resolução de DNS (ms), Uptime do serviço DNS (%)',
  },
  {
    id: 25,
    name: 'Certificados SSL/TLS',
    type: 'Configuração',
    description:
      'Criptografa a comunicação entre o navegador do usuário e o servidor, garantindo a segurança dos dados transmitidos (ex: informações de login, dados financeiros).',
    sla: 'Validade do certificado (dias), Força da criptografia',
  },
]
