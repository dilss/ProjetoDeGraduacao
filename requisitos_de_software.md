## Gerenciamento de sensores

-   [x] 1 - Criar frame da aplicação com menus
-   [x] 2 - Incluir leaflet map
-   [ ] 3 - Adicionar marcadores de sensores no mapa (criar com entradas por coordenadas)
-   [ ] 4 - Adicionar funcionalidade de edição de sensores
-   [ ] 5 - Adicionar funcionalidade de exclusão de sensores
-   [ ] 6 - Mudar cor de marcadores de acordo com o health status do sensor
-   [ ] 7 - Clicar nos marcadores mostra uma tabela com os últimos dados enviados pelo sensor
-   [ ] 8 - Abrir o context menu do sensor (clique direito do mouse) possibilita excluir ou abrir a edição
-   [ ] 9 - Se a coordenda do sensor não estiver dentro de uma área demarcada mostrar a mensagem:"Sensor fora de área demarcada" - (Usar componente 'toast' para isso)
-   [ ] 10 - Se a coordenada do sensor pertencer a alguma área criada ele automaticamente é associado àquela área - mostrar a mensagem: "Sensor <nome do sensor> criado na área <nome da área>"
-   [ ] 11 - Tabela sensor relacionamento many-to-one com a tabela plantações

## Gerenciamento de Áreas

-   [x] 1 - Adicionar criação de uma área demarcada no mapa(polígono) as entradas serão as coordenadas dos vértices (nome, lista de coordenandas)
-   [ ] 2 - (não é urgente) Adicionar edição de área
-   [x] 3 - Adicionar exclusão da área
-   [x] 4 - Associar a área criada a um tipo de solo (tabela área relacionamento many-to-one com a tabela solo)
-   [x] 5 - Abrir o context menu da área (clique direito do mouse) com as opções de edição e exclusão da área clicada
-   [x] 6 - Editar área
-   [ ] 7 - Caso a área seja criada ao redor de um sensor existente mostrar a mensagem: "O sensor <nome do sensor> foi adicionado à área <nome da área>"
-   [ ] 8 - (não é urgente ) Não permitir sobreposição de áreas na criação, o tangenciamento é permitido - implementação não é simples

## Gerenciamento de Solos

-   [x] 1 - Cadastrar tipo de solo - parâmetros do solo -> **CC** = Capacidade de Campo e **PMP** = Ponto de Murcha Permanente ambos em % ou cm³/cm³ (água/solo) **d<sub>a</sub>** = densidade do solo em g/cm³
-   [x] 2 - Listar solos cadastrados
-   [x] 3 - Editar tipo de solo
-   [x] 4 - Excluir tipo de solo

## Gerenciamento de Culturas

<b>O fator de disponibilidade de água no solo é um multiplicador que diminui a quandidade de água total disponível para a planta, dando o valor real: DRA = DTA x f. Assim ele é um indicador da tolerância da cultura à escassez de água </b>

-   [x] 1 - Cadastrar uma cultura, profundidade radicular (Z em cm), fator de disponibilidade de água no solo ( f - entre 0,2 e 0,8 - é adimensional), duração do ciclo cultural (dias), percentuais de duração das fases (1, 2, 3 e 4)
-   [x] 2 - Editar cultura
-   [x] 3 - Excluir cultura
-   [x] 4 - Listar culturas cadastradas

## Gerenciamento de Plantações

<b>A criação de uma plantação requer: uma área (que esteja associada a um tipo de solo); uma cultura e um sistema de irrigação;  </b>

-   [x] 1 - Criação de uma plantação
-   [x] 2 - Listar plantações
-   [x] 3 - Edição de uma plantação
-   [x] 4 - Exclusão de uma plantação
-   [x] 5 - Uma plantação é associada a uma área já existente e a aréa fica indisponível para a associação a outras plantações (tabela plantação one-to-one tabela área)
-   [x] 6 - Exclusão da plantação não exclui a área a que está associada
-   [x] 7 - Exclusão da área exclui a plantação que foi associada a esta área
-   [x] 8 - Uma plantação é associada a um tipo de cultura
-   [x] 9 - A exclusão da plantação não exclui a cultura associada
-   [x] 10 - A exclusão da cultura exclui a plantação associada

## Status hídrico da área

-   [ ] 1 - Cada envio de dados dos sensores de uma determinada àrea dispara o cálculo de lâmina de água faltante para a CC
-   [ ] 2 - O status hídrico (composto por percentual hídrico da área e timestamp) é persistido em um banco de dados

## Gerenciamento de Sistemas de Irrigação
<b> Método (Superfície, Aspersão, Localizada), tipo (gotejamento, faixas, pivô central, sucos, etc.) e eficiência(%) e vazão total do sistema de irrigação(Q em L/h - litros por hora)</b>

-   [x] 1 - Criar sistemas
-   [x] 2 - Listar sistemas
-   [x] 2 - Editar sistemas
-   [x] 3 - Excluir sistemas

## Gerenciamento de Irrigações

<b>O objetivo é sempre evitar que o solo atinja o ponto de murcha permanente (ou ainda a umidade crítica, U<sub>c</sub> para a cultura). Lembrando que uma lâmina d'água de 1mm corresponde a 1L/m<sup>2</sup> (1 litro de água por m<sup>2</sup> da área de cultivo), A vazão total, Q (em L/h - litros por hora), do sistema de irrigação é usado para calcular o tempo de irrigação nescessário para aplicar determinada lâmina d'água.</b>

-   [ ] 1 - Clicar na plantação mostra o status hídrico do solo (quantidade de água presente e proximidade desse status do PMP e da CC)
-   [ ] 2 - Clicar na plantação mostra também a lâmina de água a ser aplicada para elevar a umidade do solo até a CC com um botão para confirmar a aplicação
-   [ ] 3 - Clicar na plantação mostra ainda o tempo de atividade do sistema de irrigação para que a lâmina seja completamente aplicada
-   [ ] 4 - É possível alternar entre diferentes sistemas de irrigação e ver esse tempo on do sistema selecionado
-   [ ] 5 - Ao confirmar a aplicação uma nova irrigação é criada no banco de dados, assume-se que o sistema é ligado e um temporizador determinará quando o mesmo deve ser desligado - notificação

## Autenticação e Autorização

-   [x] 1 - Adicionar o serviço keycloak ao docker-compose.yaml
-   [x] 2 - Personalizar páginas de login, registrar-se e esqueci minha senha do keycloak
-   [x] 3 - Adcionar autorização usando JWT à API do backend
-   [x] 6 - Alterar navbar da aplicação para conter hamburguer menu, logo, nome completo da aplicação, circle avatar e posição fixa