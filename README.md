# ProjetoDeGraduacao
Projeto de Graduação - Engenharia Eletrônica e de Computação


LWN-Simulator

    Para iniciar o Simulador de Infraestrutura LoRaWAN (Gateway e end-devices) copiar o conteúdo do arquivo lwn-simulator.dockerfile para Dockerfile contido na pasta do simulador 'LWN-Simulator'. Estes dispositivos, gateways  e configurações de região já estão configuradas no container do chirpstack. Esse procedimento é nescessário pois o container do LWN-simulator não persiste os dados e assim teríamos que configurar tudo de novo todo vez que reiniciássemos o container, ou criássemos uma nova imagem com novas configurações.

    Gateway Virtual Região EU868
        - Gateway ID (EUI64): F9307673CFF51B2E

    Sensor Virtual Classe A Região EU868
        - Device EUI (EUI64): 4FC4B1AC646E209B
        - Application Key (OTAA): 8A43F59B8CA7459E0C7C5495D97BD569