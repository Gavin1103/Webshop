# Automatisch online zetten van de webshop.

## Introductie

Vandaag heb ik ervoor gezorgd dat onze webshop automatisch online wordt gezet als onderdeel van onze standaard
workflow. Dit heb ik gedaan door het opzetten van een GitLab CI/CD pipeline. In deze pipeline heb ik vijf
verschillende jobs gecreëerd. Onze backend, ontwikkeld met Spring Boot, is niet eenvoudig rechtstreeks te
deployen op de SFTP-server die we gekregen hebben. Daarom hebben we besloten om twee aparte servers van Hva (
oege.ie.hva.nl), één voor live gebruik en één voor ontwikkeling, te gebruiken.

De jobs die ik heb opgezet zorgen voor het bouwen (builden) en deployen van zowel de frontend als de backend.
Afhankelijk van de branch waarin de code wordt gepusht, worden deze onderdelen automatisch naar de juiste
server (live of dev) gedeployed. Dit proces zorgt ervoor dat wijzigingen snel en efficiënt live kunnen worden
gezet.

Daarnaast heb ik ook gezorgd dat we enkele eigen runners hebben voor dit project. Dit was omdat de standaard
runners van de Hva, die door veel studenten worden gebruikt, vaak overbelast zijn en daardoor uren kunnen
duren voordat ze beschikbaar zijn. Met onze eigen runners verminderen we de afhankelijkheid van de school
runners en verbeteren we onze eigen workflow.

## STARR:

### Situatie

Bij ons project was het nodig om onze webshop automatisch online te kunnen zetten.
We hadden te maken met een backend die niet gemakkelijk op de aangeleverde standaard SFTP-server
kan worden gehost.

### Taak

Mijn taak was het maken van een pipelines om onze webshop zowel op een live server als op
een develop server te kunnen deployen, afhankelijk van de Stadium van de code (main branch of develop branch).

### Actie

Ik heb een GitLab CI/CD pipeline opgezet met vijf verschillende jobs. Deze jobs zijn gemaakt om de
frontend en backend automatisch te bouwen en te deployen. Hierbij heb ik gebruik gemaakt van drie servers van
Hva, Daarbij twee oege.ie.hva.nl servers voor de backend en de hbo-ict-cloud server voor de frontend.

### Resultaat

Het resultaat is een workflow waarbij updates automatisch worden gedeployed naar de juiste
server, wat zorgt voor een snel en efficiënt ontwikkelprocess.

### Reflectie

n dit project heb ik geleerd hoe ik een CI/CD pipeline efficiënter kan opzetten door variabelen en rules te
gebruiken, waardoor ik zonder extra jobs kon bepalen of deployments naar een ontwikkel- of live server gingen.
Ook heb ik voor het eerst gewerkt met het deployen naar SSH-servers, naast de bekende SFTP-servers, waardoor
ik veel nieuwe dingen heb geleerd.