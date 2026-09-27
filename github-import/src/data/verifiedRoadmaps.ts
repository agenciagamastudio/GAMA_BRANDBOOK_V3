export interface RoadmapNode {
  id: string;
  level: 1 | 2 | 3 | 4;
  stageNumber?: number;
  title: string;
  subtitle?: string;
  description: string;
  practicalTip?: string;
  importance: 'essencial' | 'recomendado' | 'avancado';
  tags: string[];
  checkpoints: string[];
  parentId?: string;
}

export interface RoadmapData {
  title: string;
  topic: string;
  tagline: string;
  totalNodes: number;
  estimatedDuration: string;
  difficulty: 'Iniciante ao Avançado' | 'Intermediário' | 'Especialista';
  benchmarkSubject: string;
  nodes: RoadmapNode[];
}

export const verifiedRoadmaps: Record<string, RoadmapData> = {
  'construção civil': {
    title: 'Construção Civil Completa (Do Terreno à Venda)',
    topic: 'Construção Civil',
    tagline: 'Guia definitivo de ponta a ponta verificado com sabedoria de mestre de obras e engenharia.',
    totalNodes: 28,
    estimatedDuration: '6 a 12 meses de aprendizado prático',
    difficulty: 'Iniciante ao Avançado',
    benchmarkSubject: 'Construção Civil (Referência Familiar Mestre de Obras)',
    nodes: [
      // FASE 1: FUNDAMENTOS & PLANEJAMENTO
      {
        id: 'c1',
        level: 1,
        stageNumber: 1,
        title: '1. Fundamentos, Estudo de Solo & Documentação',
        subtitle: 'A base legal e geológica antes do primeiro tijolo',
        description: 'Todo projeto duradouro começa na análise do solo, levantamento topográfico e liberação legal perante prefeitura e conselho de classe.',
        practicalTip: 'Dica de Mestre: Nunca compre terreno sem pedir a sondagem de solo (SPT) e a viabilidade de água/esgoto. Terreno em declive parece barato mas triplica o gasto com muro de arrimo.',
        importance: 'essencial',
        tags: ['Solo', 'Topografia', 'Alvará', 'ART/RRT'],
        checkpoints: [
          'Sondagem a percussão (SPT) para definir tipo de fundação',
          'Levantamento topográfico planialtimétrico com demarcação de marcos',
          'Aprovação do projeto arquitetônico na prefeitura e emissão do Alvará',
          'Anotação de Responsabilidade Técnica (ART/RRT) assinada'
        ],
      },
      {
        id: 'c1-1',
        level: 2,
        parentId: 'c1',
        title: 'Sondagem de Solo & Geotecnia (SPT)',
        description: 'Determina a resistência do solo a cada metro de profundidade e o nível do lençol freático.',
        practicalTip: 'Se encontrar água a menos de 1,5m, prepare bombas de mangote e impermeabilização reforçada no baldrame.',
        importance: 'essencial',
        tags: ['Geotecnia', 'SPT', 'Lençol Freático'],
        checkpoints: ['Leitura do laudo SPT', 'Cálculo de tensão admissível do solo'],
      },
      {
        id: 'c1-2',
        level: 2,
        parentId: 'c1',
        title: 'Licenciamento & Regularização Inicial',
        description: 'Documentos obrigatórios: matrícula no cartório de imóveis, consulta prévia, aprovação na prefeitura e matrícula CNO (INSS da obra).',
        practicalTip: 'Inicie a obra somente com a placa regulamentada e alvará afixado para evitar embargo do CREA ou fiscais do município.',
        importance: 'essencial',
        tags: ['Documentação', 'Prefeitura', 'CNO', 'Cartório'],
        checkpoints: ['Matrícula atualizada do lote', 'Placa de obra com responsáveis técnicos'],
      },

      // FASE 2: PROJETOS & LEITURA DE PLANTAS
      {
        id: 'c2',
        level: 1,
        stageNumber: 2,
        title: '2. Projetos Integrados & Leitura de Plantas',
        subtitle: 'Planta baixa, cortes, estrutural, elétrica e hidrossanitário',
        description: 'A tradução do sonho em medidas milimétricas. Saber ler e compatibilizar as pranchas evita quebrar paredes prontas para passar canos.',
        practicalTip: 'Dica de Mestre: A cota na planta sempre tem preferência sobre a medição em escala com régua. Se uma cota estiver faltando, nunca adivinhe — confirme com o autor do projeto.',
        importance: 'essencial',
        tags: ['Planta Baixa', 'Cortes', 'Compatibilização', 'Projetos Complementares'],
        checkpoints: [
          'Planta Baixa cotada (alturas, peitoris, vãos de portas e janelas)',
          'Projeto Estrutural (locação de estacas, armação de vigas e pilares)',
          'Projeto Elétrico (diagrama unifilar, quadro de cargas e circuitos)',
          'Projeto Hidrossanitário (caimentos de esgoto de 2%, caixa de gordura e respiro)'
        ],
      },
      {
        id: 'c2-1',
        level: 2,
        parentId: 'c2',
        title: 'Planta Baixa, Cortes e Fachadas',
        description: 'Compreensão de planta técnica: espessura de paredes (15cm ou 20cm), peitoris de janelas (1,10m padrão), pé-direito (mínimo 2,70m livre).',
        practicalTip: 'Sempre confira os eixos dos cômodos no esquadro 3-4-5 antes de liberar a primeira fiada.',
        importance: 'essencial',
        tags: ['Arquitetura', 'Cortes', 'Pé-Direito', 'Esquadro'],
        checkpoints: ['Identificação dos símbolos de esquadria', 'Checagem de desnível entre piso molhado e seco'],
      },
      {
        id: 'c2-2',
        level: 2,
        parentId: 'c2',
        title: 'Compatibilização Estrutural e Hidráulica',
        description: 'Cruzar a planta de vigas com a passagem dos tubos de esgoto para não furar armadura de concreto estrutural.',
        practicalTip: 'Viga de concreto armado NUNCA pode ser furada no meio sem furação prevista no cálculo do engenheiro.',
        importance: 'essencial',
        tags: ['Compatibilização', 'Tubulação', 'Vigas'],
        checkpoints: ['Verificação de shafts e passagens verticais'],
      },

      // FASE 3: GABARITO & FUNDAÇÃO
      {
        id: 'c3',
        level: 1,
        stageNumber: 3,
        title: '3. Locação da Obra, Gabarito & Fundação',
        subtitle: 'Sapatas, estacas, brocas, vigas baldrames e impermeabilização',
        description: 'Montagem do gabarito de tábuas de madeira corrida (tabeira), transferência dos eixos com fio de náilon e concretagem da fundação.',
        practicalTip: 'Dica de Mestre: Feche o esquadro no triângulo retângulo (3 metros de um lado, 4 metros do outro, a diagonal tem que bater exatamente 5 metros). Se a diagonal falhar por 1 centímetro, a casa inteira sai torta.',
        importance: 'essencial',
        tags: ['Gabarito', 'Esquadro 3-4-5', 'Baldrame', 'Impermeabilização'],
        checkpoints: [
          'Fechamento do esquadro pelo método 3-4-5 com trena metálica',
          'Perfuração de estacas/sapatas na profundidade do laudo',
          'Armação com espaçadores plásticos (garantir cobrimento de 3cm a 4cm)',
          'Impermeabilização tripla da viga baldrame com manta asfáltica e emulsão'
        ],
      },
      {
        id: 'c3-1',
        level: 2,
        parentId: 'c3',
        title: 'Impermeabilização de Baldrame',
        description: 'Aplicação de tinta asfáltica elastomérica e vedacit na massa para impedir umidade ascendente que descasca rodapés.',
        practicalTip: 'Passe pelo menos 3 demãos cruzadas e suba 20cm nas primeiras fiadas de tijolo. Nunca economize em impermeabilizante de fundação.',
        importance: 'essencial',
        tags: ['Impermeabilização', 'Manta', 'Umidade Ascendente'],
        checkpoints: ['Teste de cura do asfalto', 'Pintura completa das laterais e topo do baldrame'],
      },

      // FASE 4: ESTRUTURA & ALVENARIA
      {
        id: 'c4',
        level: 1,
        stageNumber: 4,
        title: '4. Alvenaria, Pilares, Vergas & Lajes',
        subtitle: 'Levantamento de paredes, prumo, amarração e cura do concreto',
        description: 'Execução das fiadas com blocos cerâmicos ou de concreto, alinhamento com linha de pedreiro, escora metálica e concretagem de lajes treliçadas.',
        practicalTip: 'Dica de Mestre: Prumo e nível em toda fiada de canto! E JAMAIS esqueça a verga em cima de janelas/portas e a contraverga embaixo dos vãos — se não colocar, a parede trinca a 45 graus.',
        importance: 'essencial',
        tags: ['Alvenaria', 'Prumo & Nível', 'Vergas e Contravergas', 'Lajes Treliçadas'],
        checkpoints: [
          'Assentamento com argamassa no traço correto (1 cimento : 2 cal : 8 areia)',
          'Instalação de vergas e contravergas avançando 30cm para cada lado do vão',
          'Vibração correta do concreto nos pilares para não formar bicheiras',
          'Molhar a laje de concreto (cura úmida) por no mínimo 7 dias consecutivos'
        ],
      },
      {
        id: 'c4-1',
        level: 2,
        parentId: 'c4',
        title: 'Concretagem e Cura Úmida',
        description: 'Preparo ou recebimento de concreto usinado (FCK 25 a 30 MPa), ensaio de slump test na betoneira e cura para evitar retração térmica.',
        practicalTip: 'Se bater o sol do meio-dia na laje recém-concretada sem água ou lona, o concreto ferve e racha por retração hidráulica.',
        importance: 'essencial',
        tags: ['Concreto', 'FCK', 'Slump Test', 'Cura'],
        checkpoints: ['Conferência de escoramento com contra-flecha', 'Regar 3x ao dia durante a primeira semana'],
      },

      // FASE 5: COBERTURA & TELHADO
      {
        id: 'c5',
        level: 1,
        stageNumber: 5,
        title: '5. Cobertura, Calhas, Rufos & Telhados',
        subtitle: 'Madeiramento, tesouras, telhas sanduíche ou cerâmicas e escoamento',
        description: 'Montagem da estrutura do telhado, inclinação mínima calculada em percentual conforme fabricante de telhas, e isolamento com manta térmica.',
        practicalTip: 'Dica de Mestre: Telhado que vaza é telhado com inclinação abaixo da especificação. Se a telha pede 30% de inclinação, nunca coloque 25%. Calhas com caída mínima de 1% para não acumular sujeira.',
        importance: 'essencial',
        tags: ['Telhado', 'Inclinação', 'Calhas e Rufos', 'Manta Térmica'],
        checkpoints: [
          'Cálculo do caimento percentual do telhado (ex: 35cm de subida por metro)',
          'Instalação de manta térmica aluminizada subcobertura contra calor e goteiras',
          'Fixação de rufos de encunhamento nas paredes com vedação em poliuretano PU',
          'Teste de fluxo d’água nas calhas antes do forro'
        ],
      },

      // FASE 6: INSTALAÇÕES ELÉTRICA & HIDROSSANITÁRIA
      {
        id: 'c6',
        level: 1,
        stageNumber: 6,
        title: '6. Instalações Hidráulica, Esgoto & Elétrica',
        subtitle: 'Tubo de água fria/quente, esgoto com ventilação, fios e disjuntores',
        description: 'Chumbamento dos conduítes corrugados reforçados, tubos de PVC soldável ou PPR para água quente, caixas de gordura e fiação normatizada NBR 5410.',
        practicalTip: 'Dica de Mestre: Teste de estanqueidade obrigatório antes de rebocar! Encha a tubulação de água com bomba de teste e deixe com pressão por 24 horas. Se tiver vazamento, descobre agora, não depois de colocar o porcelanato.',
        importance: 'essencial',
        tags: ['PPR / PVC', 'Esgoto com Respiro', 'Quadro de Cargas', 'Teste de Pressão'],
        checkpoints: [
          'Instalação de tubo de respiro na coluna de esgoto (evita mau cheiro e sifonagem)',
          'Caixa de gordura sifonada separada da rede de esgoto cloacal',
          'Circuitos elétricos separados para chuveiros, ar-condicionado e tomadas de uso geral',
          'Instalação de Dispositivo DR (diferencial residual) e aterramento com haste de cobre'
        ],
      },

      // FASE 7: REVESTIMENTOS, CONTRAPISO & GESSO
      {
        id: 'c7',
        level: 1,
        stageNumber: 7,
        title: '7. Fechamentos: Chapisco, Emboço, Reboco & Contrapiso',
        subtitle: 'A regularização das superfícies e a mestra de nível perfeita',
        description: 'Aderência mecânica na parede com chapisco rolado ou convencional, mestras de prumo com desempenadeira e contrapiso sarrafeado com declive para ralos.',
        practicalTip: 'Dica de Mestre: Contrapiso de banheiro e sacada precisa de caimento de 1,5% em direção ao ralo linear. Use nível a laser ou mangueira de nível transparente sem bolhas.',
        importance: 'essencial',
        tags: ['Chapisco', 'Emboço', 'Reboco', 'Mestras de Nível'],
        checkpoints: [
          'Chapisco com aditivo fixador e cura de 48h antes do emboço',
          'Puxar mestras de reboco com régua de alumínio de 2 metros',
          'Contrapiso seco ("farofa") bem compactado para não esfarelar',
          'Gesso liso ou forro acartonado drywall estruturado com tirantes'
        ],
      },

      // FASE 8: ACABAMENTOS FINOS & PINTURA
      {
        id: 'c8',
        level: 1,
        stageNumber: 8,
        title: '8. Acabamento Fino, Pisos, Azulejos & Louças',
        subtitle: 'Porcelanato, argamassa AC-III, rejunte epóxi, pintura e esquadrias',
        description: 'A fase dos olhos! Assentamento com niveladores de piso, paginação planejada para os recortes ficarem escondidos atrás das portas, pintura e bancadas de granito.',
        practicalTip: 'Dica de Mestre: Para porcelanatos maiores que 60x60, a dupla colagem é lei (passa argamassa no chão e no verso da peça). Se bater a mão e soar oco, vai trincar quando colocar o móvel.',
        importance: 'essencial',
        tags: ['Porcelanato', 'Dupla Colagem', 'Argamassa AC-III', 'Pintura Acrílica'],
        checkpoints: [
          'Paginação de piso começando pelo ponto focal do ambiente',
          'Uso de cunhas e alicates niveladores para evitar dentes entre placas',
          'Impermeabilização do box de banho até 1,80m de altura com elastômero líquido',
          'Aplicação de selador, massa corrida/acrílica, lixamento fino e 3 demãos de tinta'
        ],
      },

      // FASE 9: MOBILIAMENTO, VISTORIA & HABITE-SE
      {
        id: 'c9',
        level: 1,
        stageNumber: 9,
        title: '9. Mobiliamento, Vistoria Final & Habite-se',
        subtitle: 'Limpeza pós-obra, marcenaria planejada, vistoria do corpo de bombeiros e venda',
        description: 'Montagem dos móveis planejados, limpeza técnica de resíduos de cimento, vistoria final de caimentos e fechaduras, e averbação no cartório para financiamento bancário.',
        practicalTip: 'Dica de Mestre: Faça a vistoria da água com bolinha de gude nos pisos molhados — solte a bolinha e veja se ela corre certinho pro ralo. Teste todas as tomadas com voltímetro antes da pintura final.',
        importance: 'recomendado',
        tags: ['Mobiliamento', 'Vistoria', 'Habite-se', 'Averbação'],
        checkpoints: [
          'Limpeza pós-obra ácida para cerâmicas e neutra para metais',
          'Montagem da marcenaria planejada e eletrodomésticos embutidos',
          'Vistoria da prefeitura e corpo de bombeiros (AVCB) para emissão do Habite-se',
          'Certidão negativa de débitos da Receita Federal (CND) e averbação no Cartório de RI'
        ],
      },
    ],
  },

  'front-end': {
    title: 'Desenvolvedor Front-End Moderno (Do Zero ao Sênior)',
    topic: 'Front-End',
    tagline: 'O caminho estruturado e prático para dominar a web moderna com arquitetura robusta.',
    totalNodes: 24,
    estimatedDuration: '6 a 9 meses de prática consistente',
    difficulty: 'Iniciante ao Avançado',
    benchmarkSubject: 'Engenharia de Software Front-End',
    nodes: [
      {
        id: 'fe1',
        level: 1,
        stageNumber: 1,
        title: '1. Fundamentos da Internet & Arquitetura Web',
        subtitle: 'Como a web realmente funciona sob o capô',
        description: 'Protocolos HTTP/HTTPS, DNS, servidores, clientes, DOM rendering pipeline e ciclo de requisição.',
        practicalTip: 'Entenda como o navegador pinta a tela (Parse HTML -> CSSOM -> Render Tree -> Layout -> Paint) para escrever código que não trava a 60fps.',
        importance: 'essencial',
        tags: ['HTTP/HTTPS', 'DNS', 'Bavegador', 'DOM Tree'],
        checkpoints: ['Funcionamento do DNS e handshake TLS', 'Leitura da aba Network do Chrome DevTools'],
      },
      {
        id: 'fe2',
        level: 1,
        stageNumber: 2,
        title: '2. HTML5 Semântico & Acessibilidade (a11y)',
        subtitle: 'A estrutura acessível e otimizada para SEO',
        description: 'Tags semânticas (<main>, <article>, <section>, <dialog>), formulários modernos, ARIA roles e navegação por teclado.',
        practicalTip: 'Nunca use <div> clicável sem role="button", tabIndex={0} e handler onKeyDown. Use o elemento <button> nativo sempre que possível.',
        importance: 'essencial',
        tags: ['HTML5', 'Acessibilidade', 'ARIA', 'SEO'],
        checkpoints: ['Página navegável 100% via teclado (Tab e Enter)', 'Nota 100 no Lighthouse de Acessibilidade'],
      },
      {
        id: 'fe3',
        level: 1,
        stageNumber: 3,
        title: '3. CSS3 Avançado, Flexbox, Grid & Design Tokens',
        subtitle: 'Layouts responsivos, glassmorphism e animações cinematográficas',
        description: 'CSS Grid bidimensional, Flexbox 1D, variáveis customizadas (:root tokens), Tailwind CSS e transições aceleradas por GPU.',
        practicalTip: 'Anime apenas transform e opacity. Animar width, height ou top/left força Recalculate Style e causa travamentos.',
        importance: 'essencial',
        tags: ['CSS Grid', 'Flexbox', 'Tailwind', 'Design Tokens'],
        checkpoints: ['Layout 100% responsivo mobile-first sem scroll horizontal quebrado', 'Sistema de temas dark/light com tokens CSS'],
      },
      {
        id: 'fe4',
        level: 1,
        stageNumber: 4,
        title: '4. JavaScript Moderno (ES6+) & TypeScript',
        subtitle: 'A espinha dorsal de qualquer aplicação moderna',
        description: 'Event Loop, Closures, Promises, Async/Await, manipulação de Arrays immutáveis, tipagem estática rigorosa com TypeScript.',
        practicalTip: 'Prefira sempre TypeScript estrito (noImplicitAny). A tipagem economiza 80% do tempo gasto em debug de runtime no navegador.',
        importance: 'essencial',
        tags: ['ES6+', 'TypeScript', 'Async/Await', 'Event Loop'],
        checkpoints: ['Construção de CRUD com Fetch API e tipagem de resposta', 'Configuração de tsconfig.json com regras estritas'],
      },
      {
        id: 'fe5',
        level: 1,
        stageNumber: 5,
        title: '5. React 19, Componentização & Estado',
        subtitle: 'Criando interfaces declarativas e performáticas',
        description: 'Hooks essenciais (useState, useEffect, useMemo, useCallback), context API, gerenciamento de estado assíncrono e clean code.',
        practicalTip: 'Não coloque em estado o que pode ser derivado no render. Menos estados significam menos bugs de dessincronização.',
        importance: 'essencial',
        tags: ['React', 'Hooks', 'Componentes', 'Virtual DOM'],
        checkpoints: ['Desenvolvimento de app modular desacoplado com props tipadas', 'Uso consciente de useEffect sem loops infinitos'],
      },
      {
        id: 'fe6',
        level: 1,
        stageNumber: 6,
        title: '6. Ferramental: Vite, Git, GitHub & Deploy CI/CD',
        subtitle: 'O fluxo de trabalho profissional do mercado',
        description: 'Vite para build ultra-rápido, branching strategy no Git (feature branches, PRs), linting com ESLint e deploy automatizado.',
        practicalTip: 'Commits atômicos com mensagens no padrão Conventional Commits (feat: ..., fix: ..., refactor: ...) tornam qualquer histórico legível.',
        importance: 'essencial',
        tags: ['Vite', 'Git', 'GitHub', 'CI/CD'],
        checkpoints: ['Repositório no GitHub com README impecável', 'Pipeline de build e lint passando sem warnings'],
      },
    ],
  },

  'fotografia': {
    title: 'Fotografia Profissional & Direção de Olhar',
    topic: 'Fotografia',
    tagline: 'O domínio da luz, da óptica, da composição visual e do tratamento de imagens.',
    totalNodes: 20,
    estimatedDuration: '4 a 6 meses de prática de campo',
    difficulty: 'Iniciante ao Avançado',
    benchmarkSubject: 'Artes Visuais & Técnica Fotográfica',
    nodes: [
      {
        id: 'fot1',
        level: 1,
        stageNumber: 1,
        title: '1. O Triângulo de Exposição & Controle Manual',
        subtitle: 'A física da luz na câmara',
        description: 'Abertura do diafragma (f-stop e profundidade de campo), velocidade do obturador (congelamento ou rastro) e sensibilidade ISO (ruído).',
        practicalTip: 'Fotografe sempre no modo Manual e em formato RAW para reter 14 bits de alcance dinâmico de cores e sombras.',
        importance: 'essencial',
        tags: ['Abertura', 'Obturador', 'ISO', 'RAW'],
        checkpoints: ['Dominar o fotômetro da câmera para zerar a exposição correta', 'Uso do histograma para não estourar as altas luzes'],
      },
      {
        id: 'fot2',
        level: 1,
        stageNumber: 2,
        title: '2. Lentes, Distâncias Focais & Perspectiva',
        subtitle: '50mm, Grande Angular, Teleobjetiva e Distorções',
        description: 'Compreensão de compressão de plano em 85mm/135mm para retratos versus perspectiva dramática em 24mm/35mm para arquitetura e rua.',
        practicalTip: 'Para retratos humanos, lentes de 85mm com f/1.8 entregam a proporção facial mais natural sem achatar ou esticar o nariz.',
        importance: 'essencial',
        tags: ['Lentes', 'Distância Focal', 'Bokeh', 'Distorção'],
        checkpoints: ['Teste comparativo de retrato com 35mm vs 85mm', 'Controle da distância mínima de foco'],
      },
      {
        id: 'fot3',
        level: 1,
        stageNumber: 3,
        title: '3. Composição & Direção do Olhar do Espectador',
        subtitle: 'Regra dos terços, linhas guia, enquadramentos naturais e espaço negativo',
        description: 'Como organizar os elementos visuais no quadro para contar uma história instantânea e guiar o olho para o ponto de interesse.',
        practicalTip: 'O olho humano sempre é atraído primeiro para a área mais iluminada e de maior contraste da foto.',
        importance: 'essencial',
        tags: ['Regra dos Terços', 'Linhas Guia', 'Espaço Negativo', 'Contraste'],
        checkpoints: ['Série fotográfica com 10 composições usando linhas de fuga', 'Uso deliberado de molduras naturais (janelas, folhagens)'],
      },
      {
        id: 'fot4',
        level: 1,
        stageNumber: 4,
        title: '4. Iluminação Natural & Modificadores de Luz Flash',
        subtitle: 'Luz suave vs dura, golden hour, difusores e rebatedores',
        description: 'Qualidade, direção e temperatura de cor (Kelvin) da luz. Iluminação Rembrandt com luz de recorte e preenchimento.',
        practicalTip: 'Luz bonita é luz de grande dimensão relativa: quanto maior a fonte de luz perto do assunto, mais suave a sombra transiciona.',
        importance: 'essencial',
        tags: ['Golden Hour', 'Flash Dedicado', 'Softbox', 'Rebatedor'],
        checkpoints: ['Retrato com luz de janela lateral e rebatedor branco', 'Dominar o balanço de branco manual em graus Kelvin'],
      },
      {
        id: 'fot5',
        level: 1,
        stageNumber: 5,
        title: '5. Revelação Digital, Color Grading & Arquivamento',
        subtitle: 'Lightroom, curvas de tom, calibração e exportação otimizada',
        description: 'Curva S de contraste, correção de lente, nitidez por máscara e exportação com perfil sRGB para redes e AdobeRGB para impressão fine art.',
        practicalTip: 'Faça backup 3-2-1: 3 cópias do arquivo, em 2 mídias diferentes (HD e SSD), com 1 cópia fora de casa (nuvem).',
        importance: 'essencial',
        tags: ['Lightroom', 'Color Grading', 'Curva de Tom', 'Backup 3-2-1'],
        checkpoints: ['Tratamento de ensaio com consistência de paleta cromática', 'Calibração do monitor para fidelidade de impressão'],
      },
    ],
  },
};
