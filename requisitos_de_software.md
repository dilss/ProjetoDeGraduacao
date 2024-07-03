## Gerenciamento de sensores

- [x] 1 - Criar frame da aplicação com menus
- [x] 2 - Incluir leaflet map
- [ ] 3 - Adicionar marcadores de sensores no mapa (criar com entradas por coordenadas)
- [ ] 4 - Adicionar funcionalidade de edição de sensores
- [ ] 5 - Adicionar funcionalidade de exclusão de sensores
- [ ] 6 - Mudar cor de marcadores de acordo com o health status do sensor
- [ ] 7 - Clicar nos marcadores mostra uma tabela com os últimos dados enviados pelo sensor
- [ ] 8 - Abrir o context menu do sensor (clique direito do mouse) possibilita excluir ou abrir a edição
- [ ] 9 - Se a coordenda do sensor não estiver dentro de uma área demarcada mostrar a mensagem:"Sensor fora de área demarcada" - (Usar componente 'toast' para isso)
- [ ] 10 - Se a coordenada do sensor pertencer a alguma área criada ele automaticamente é associado àquela área - mostrar a mensagem: "Sensor <nome do sensor> criado na área <nome da área>"
- [ ] 11 - Tabela sensor relacionamento many-to-one com a tabela área

## Gerenciamento de Áreas

- [x] 1 - Adicionar criação de uma área demarcada no mapa(polígono) as entradas serão as coordenadas dos vértices (nome, lista de coordenandas)
- [ ] 2 - (não é urgente) Adicionar edição de área
- [x] 3 - Adicionar exclusão da área
- [ ] 4 - Associar a área criada a um tipo de solo (tabela área relacionamento many-to-one com a tabela solo)
- [x] 5 - Abrir o context menu da área (clique direito do mouse) com as opções de edição e exclusão da área clicada
- [ ] 6 - Caso a área seja criada ao redor de um sensor existente mostrar a mensagem: "O sensor <nome do sensor> foi adicionado à área <nome da área>"
- [ ] 7 - (não é urgente ) Não permitir sobreposição de áreas na criação, o tangenciamento é permitido - implementação não é simples

## Gerenciamento de Solos

- [x] 1 - Cadastrar tipo de solo - parâmetros do solo -> **CC** = Capacidade de Campo e **PMP** = Ponto de Murcha Permanente ambos em  % ou cm³/cm³ (água/solo) **d<sub>a</sub>** = densidade do solo em g/cm³
- [x] 2 - Listar solos cadastrados
- [ ] 3 - Editar tipo de solo
- [x] 4 - Excluir tipo de solo

## Gerenciamento de Culturas

- [ ] 1 - Cadastrar uma cultura (diferentes fases de crescimento, profundidade radicular, necessidade hídrica, etc.) -> refinar
- [ ] 2 - Editar cultura
- [ ] 3 - Excluir cultura
- [ ] 4 - A necessidade hídrica da cultura é a umidade ideal do solo (capacidade de campo)
- [ ] 5 - Listar culturas cadastradas

## Gerenciamento de Plantações

- [ ] 1 - Criação de uma plantação;
- [ ] 2 - Edição de uma plantação;
- [ ] 3 - Exclusão de uma plantação (confirmação de exclusão por digitação de nome da plantação)
- [ ] 4 - Uma plantação é associada a uma área já existente
- [ ] 5 - A aréa fica indisponível para a associação a outras plantações (tabela plantação one-to-one tabela área);
- [ ] 6 - Exclusão da plantação não exclui a área a que está associada
- [ ] 7 - Exclusão da área exclui a plantação que foi associada a esta área
- [ ] 8 - Uma plantação é associada a um tipo de cultura
- [ ] 9 - A exclusão da plantação não exclui a cultura associada
- [ ] 10 - A exclusão da cultura exclui a plantação associada

## Status hídrico da área

- [ ] 1 - Cada envio de dados dos sensores de uma determinada àrea dispara o cálculo de lâmina de água faltante para a CC
- [ ] 2 - O status hídrico (composto por percentual hídrico da área e timestamp) é persistido em um banco de dados

## Gerenciamento de Sistemas de Irrigação

- [ ] 1 - Criar sistemas - tipo (gotejamento, aspersão, pivô central, etc.), vazão e eficiência; -> refinar
- [ ] 2 - Editar sistemas
- [ ] 3 - Excluir sistemas

## Gerenciamento de Irrigações

- [ ] 1 - O objetivo e sempre evitar que o solo atinja o ponto de murcha permanente
- [ ] 3 - Clicar na plantação mostra o status hídrico do solo (quantidade de água presente e proximidade desse status do PMP e da CC)
- [ ] 4 - Clicar na plantação mostra também a lâmina de água a ser aplicada para elevar a umidade do solo até a CC com um botão para confirmar a aplicação
- [ ] 5 - Clicar na plantação mostra ainda o tempo de atividade do sistema de irrigação para que a lâmina seja completamente aplicada
- [ ] 6 - É possível alternar entre diferentes sistemas de irrigação e ver esse tempo on do sistema selecionado
- [ ] 7 - Ao confirmar a aplicação uma nova irrigação é criada no banco de dados, assume-se que o sistema é ligado e um timer determinará quando o mesmo deve ser desligado - notificação
