## UFRJ - Universidade Federal do Rio de Janeiro
<h3>
    Escola Politécnica da Universidade Federal do Rio de Janeiro - Poli UFRJ <br>
    DEL - Departamento de Engenharia Eletrônica e de Computação<br>
    Projeto de Graduação - Edilson Fernandes Pereira
</h3>

<br>

<h4>MIrrigA - Sistema de Manejo de Irrigação para a Agricultura</h4>


Este projeto consiste na criação de uma plataforma IoT para gerenciamento de irrigação na agricultura usando o protocolo LoRa de comunicação por radiofrequências e padrão LoRaWAN para para extração de dados de sensores implantados em uma plantação agrícola.

Os softwares utilizados para esta solução, todos de código aberto (*open source*),  estão listados a seguir:

- **LWN-simulator**: Usado neste projeto para fins de teste, este software desenvolvido em Go consiste de um simulador de infraestrutura LoRA/LoRaWAN. Com ele é possível criar *gateways* e dispositivos de borda virtuais que emulam o hardware de uma verdadeira rede LoRa enviando uplinks e recebendo downlinks, o simulador conta uma interface web amigável que facilita sua utilização. O LWN-Simulator foi crucial para agilizar o processo de desenvolvimento da plataforma de IoT, **MIrrigA**, objetivo principal deste trabalho. Mais sobre o LWN-simulator em: https://github.com/UniCT-ARSLab/LWN-Simulator.

<br>

- **Chirpstack**: Este software é uma implementação da especificação dos servidores de rede e de aplicação do padrão LoRaWAN. Na plataforma ele cumpre o importante papel de receber as mensagens LoRaWAN do concentrador(*gateway*) com os dados oriundos dos sensores e disponibilizá-las num formato que se possa extrair para processamento posterior. O chirpstack possibilita a extração das mensagens armazenadas usando protocolos de redes como o HTTP (por meio de API Rest) e MQTT(via Broker Mosquitto). O chirpstack pode ser usado criando-se uma conta ou *on premise* por meio de container Docker e oferece uma interface web amigável para utilização. Mais sobre o Chirpstack em: https://www.chirpstack.io/ e https://www.chirpstack.io/docs/getting-started/docker.html.

<br>

- **Node-RED**: Este software  se trata de uma ferramenta de codificação *low code* que possibilita o uso de blocos (nós) para a implementação de fluxos para a transformação/transferência de dados por meio de uma interface web intuitiva. Ele simplifica portanto a tarefa de obtenção dos dados armazenados no chirpstack e posterior persistência em um banco de dados de série temporal (*time series database*). Mais sobre o Node-RED em: https://nodered.org/ e https://nodered.org/docs/getting-started/docker.


<br>


- **InfluxDB**: Este software é um *time series database*. O InfluxDB é o responsável por armazenar os dados provenientes dos sensores. O armazenamento das leituras dos dispositivos associadas cada uma a um instante (*timestamp*) facilita o tratamento e utilização desses dados pela nossa solução. O InfluxDB pode ser conectado facilmente ao Node-RED e oferece uma API web para integração. Conta também com uma interface amigável para configuração da ferramenta e realização de *queries* sobre os dados armazenados. Mais sobre o InfluxDB em: https://www.influxdata.com/ e https://hub.docker.com/_/influxdb.


<br>

- **Keycloak**: É um software de gerenciamento de identidade e acesso. O Keycloak é utilizado nessa solução para a gerenciamento de logon dos usuários e para autenticação na nossa ferramenta do frontend e da API web do backend. Oferece uma interface de facil utilização e é altamente customizável. Mais sobre o Keycloak em: https://www.keycloak.org/ e https://www.keycloak.org/getting-started/getting-started-docker.


<br>


- **MySQL**: O MySQL é uma solução de banco de dados relacional amplamente difundida e adotada. Utilizamo-o na nossa ferramenta para a persitência dos dados da aplicação MIrrigA propriamente dita (informações de solos, sistemas de irrigação, culturas agrícolas, areas, plantações, etc) que são entidades que se relacionam entre si. Mais sobre o MySQL: https://www.mysql.com/ e https://hub.docker.com/_/mysql.


<br>


- **Quarkus**: Criado e mantido pela Red Hat, é um *framework* para desenvolvimento de aplicações em **Java** (principalmente microsserviços) que implementa a especificação Java EE, assim nosso software foi desenvolvido com as funcionalidades do Java EE e como a confiabilidade e robustez que ela oferece. Utilizamo-o para a codificação do *backend* da nossa solução MIrrigA. Mais sobre o Quarkus em: https://quarkus.io/.


<br>


- **Angular**: Por último mas de forma nenhuma menos importante, o Angular foi o *framework* eleito para a codificação do frontend do MIrrigA. Foi criado pela Google e é mantido pela mesma além de que pela ampla comunidade de desenvolvedores que o utiliza e estende suas funcionalidades. Adota o TypeScript como linguagem de programação padrão e também suporta o bom e vellho JavaScript. Mais sobre o Angular em: https://angular.dev/.



### Execultando a Aplicação

- **Keycloak**:

<br>

- **Backend**:

<br>

- **Frontend**: O frontend é de uma SPA (*Single Page Aplication*) desenvolvida com Angular. Sendo assim, é uma aplicação *client side*, o que significa que apesar de ela ser servida de dentro de um container docker, ela está no contexto do browser qua a executa que é o contexto da máquina cliente (host do usuário). Sendo assim todas as URLs a que o frontend se refere não devem ser em relação à rede de containers (NÃO PODEM SER por exemplo: http://backend/8081, http://keycloak:8080) e sim ao caminho externo para estes serviços (DEVEM SER por exemplo: http://localhost:8081 e http://localhost:8080 para o backend e keycloak respectivamente).

- **Backend**: O backend usa o mecanismo de autenticação de cliente do Keycloak. Por isso, além do ID do cliente (cliend_id) também precisa estar no .env o segredo comun entre backend e Keycloak (client_secret).