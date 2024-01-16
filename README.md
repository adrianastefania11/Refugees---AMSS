#  Aplicatie Refugees---AMSS

+ O platformă online pentru refugiați, unde aceștia pot căuta și rezerva locuințe în mod simplu și eficient. Interfața intuitivă permite utilizatorilor să exploreze diverse opțiuni de cazare, să filtreze rezultatele în funcție de preferințe și să realizeze rezervări sigure și rapide. 
+ *Funcționalități*
  
   1. **Înregistrare/Conectare (Register/Login):**
   - Utilizatorii pot crea conturi noi sau se pot autentifica în platformă utilizând datele lor de acces.

2. **Adăugare Case:**
   - Utilizatorii cu rolul de gazdă (manager) pot adăuga informații despre locuințele disponibile pentru refugiați, inclusiv fotografii, descrieri și facilități.

3. **Căutare Case în Anumite Locații:**
   - Utilizatorii pot căuta locuințe disponibile în funcție de locație, utilizând filtre și criterii precum orașul sau zona dorită.

4. **Crearea unei Cereri de Hosting:**
   - Utilizatorii cu rolul de refugiat (client) pot crea cereri de găzduire, specificând detalii precum numărul de persoane, perioada dorită și alte necesități.

5. **Actualizarea Statusului Cererii:**
   - Utilizatorii pot actualiza starea cererilor lor de găzduire, precum confirmarea, respingerea sau modificarea detaliilor acesteia.

6. **Vizualizarea Listei de Cereri și Case:**
   - Utilizatorii pot vizualiza o listă cu toate cererile de găzduire și locuințele disponibile în funcție de rolul lor (manager sau client).

7. **Gestionați Cererile și Casele în Funcție de Rolul Utilizatorului:**
   - Utilizatorii cu rol de manager pot să gestioneze cererile de găzduire, să aprobe sau să respingă cereri și să actualizeze informațiile despre locuințe.
   - Utilizatorii cu rol de client pot să vizualizeze starea cererilor lor și să exploreze locuințele disponibile pentru a face rezervări.

Aceste funcționalități oferă o experiență comprehensivă și eficientă pentru utilizatorii platformei, facilitând procesul de conectare și colaborare între gazde și refugiați.

+ Tehnologii folosite: Java, Spring, React, SQL Server Management Studio, Docker
+ Pentru realizarea diagramelor: app.diagrams


## Diagrama de stare
![AMSS drawio (2)](https://github.com/adrianastefania11/Refugees---AMSS/assets/79542005/afdd8468-b27d-42ab-81f7-e60afc6a1c7c)

## Design patterns 
**Singleton pattern**: 
Modelul singleton este un mecanism care asigură existența unei singure instanțe a unui obiect per aplicație. Am folosit acest model pentru toate bean-urile din proiect: Fiecare repository, service si controller este unic si este injectat in 
componenta care il foloseste. Acesta permite ca o clasă sa aiba o singură instanță, oferind în același timp un punct de acces global acestei instanțe.

**Data access object pattern**: 
Modelul Data Access Object (DAO) este un model structural care ne permite să izolăm stratul aplicației de stratul de persistență (de obicei o bază de date relațională, dar ar putea fi orice alt mecanism de persistență) folosind un API abstract.
Fiecare tabela a bazei de date este echivalenta unei entitati care este reprezentarea obiectului retinut in baza de date.

**Data transfer object pattern**: 
Modelul Data Transfer Object (DTO) este un model de proiectare structurală care se concentrează pe transferul de date între obiecte. În contextul aplicațiilor web, în ​​special al celor construite cu spring goot, DTO-urile sunt esențiale pentru transmiterea datelor între diferite părți ale aplicației. Atunci cand se acceseaza obiectul prin DAO acesta se numeste entitate si contine informatii confidentiale ex: id_ul recordului. Atunci cand se returneaza datele catre utilizator, acestea sunt mapate in data transfer object ca utilizatorul sa nu aiba acces la date confidentiale. 

![image](https://github.com/adrianastefania11/Refugees---AMSS/assets/63742125/92f18c72-bb64-4ee4-b3dd-9725986929f2)

**Proxy design pattern**:
Modelul Proxy ne permite să creăm un intermediar care acționează ca o interfață cu o altă resursă, ascunzând totodată complexitatea de bază a componentei.
Am folosit proxi-urile dinamice JDK și a proxy-urilor CGLIB pentru a implementa mecanismul de injectare a dependenței (DI). Când un bean este configurat pentru DI folosind o interfață, Spring creează un obiect proxy dinamic JDK care implementează interfața și deleagă apelurile de metodă către obiectul bean real. Iată un exemplu:

![image](https://github.com/adrianastefania11/Refugees---AMSS/assets/63742125/28d1a8e7-28df-42ae-939c-c9e07215ef5f)
![image](https://github.com/adrianastefania11/Refugees---AMSS/assets/63742125/cc28401c-95f2-4f27-b559-4a731f49c1f0)


În exemplul de mai sus, clasa DashboardConttroller are o dependență de interfața DashobardService, care este implementată de clasa DashboardServiceImplementation. Când controlerul este creat, Spring creează un obiect proxy dinamic care implementează interfața EmployeeService și deleagă apelurile de metodă obiectului EmployeeServiceImpl real. Acest lucru îi permite lui Spring să injecteze implementarea efectivă a serviciului în timpul execuției, fără a fi nevoie ca controlerul să știe despre implementare.

**Entități**

 *House* - Acest tabel stochează informații despre casele disponibile pentru rezervare. 
&emsp;id: identificator unic pentru fiecare casă.
&emsp;name, description, city, address, phone: detalii de bază despre casă.
&emsp;latitude, longitude: coordonate geografice pentru locația casei.
&emsp;image: referință la o imagine a casei.
&emsp;capacity: numărul de persoane pe care casa le poate găzdui.
&emsp;bookingPeriod: intervalul de timp în care casa este disponibilă pentru rezervare.
&emsp;owner: referință la entitatea User care deține casa.
 *Booking* - Reprezintă rezervările făcute de utilizatori. 
&emsp;id: identificator unic pentru fiecare rezervare.
&emsp;startDate, endDate: datele de început și sfârșit pentru perioada rezervării.
&emsp;guestPhone, guestMessage: contactul și un mesaj opțional din partea clientului.
&emsp;house: legătura cu casa care a fost rezervată.
&emsp;guest: legătura cu utilizatorul care a făcut rezervarea.
*User* - Stochează informații despre utilizatorii aplicației.
&emsp;id: identificator unic pentru fiecare utilizator.
&emsp;username, email, role: informații de autentificare și rolul utilizatorului (de exemplu, dacă este un client sau manager).
&emsp;providerId, provider: detalii despre furnizorul de autentificare, dacă se utilizează servicii externe pentru autentificare.
&emsp;imageUrl: legătura către o imagine de profil a utilizatorului.
*ItemControl* - Acest tabel folosit pentru a controla anumite aspecte ale rezervărilor. 
&emsp;id: identificator unic.
&emsp;currentBookingsCount, oldBookingsCount: numere care ar putea reprezenta numărul curent și cel istoric de rezervări.
&emsp;owner: legătura cu utilizatorul care deține controlul asupra acestui element.

## Diagrame individuale
Adriana Maxim

### Diagrama de clase

![RefugeesClassDiagram drawio (2)](https://github.com/adrianastefania11/Refugees---AMSS/assets/79542005/0bc3ec5f-8e9e-48ee-b722-78ef9e236449)

### Diagrama de activitate
![RefugeesActivityDiagram drawio](https://github.com/adrianastefania11/Refugees---AMSS/assets/79542005/47aba1a4-1d23-4a2b-acd4-6fdee06f258b)


Alice-Maria Pirvulescu

### Diagrama use case
![image](https://github.com/adrianastefania11/Refugees---AMSS/assets/63742125/9eb3c759-dc0f-441f-bb5e-ed86704f570e)

### Diagrama de pachete

![image](https://github.com/adrianastefania11/Refugees---AMSS/assets/63742125/82da77a5-82c0-44b6-96fb-c8d5ac39f522)


