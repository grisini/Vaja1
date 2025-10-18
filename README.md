[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/AlLih-4j)
# RVIR – 01_vaja (React Native / Expo) — Vnos zaposlenih

## 🎯 Cilj
Zgradi mobilno aplikacijo v REact Native, ki omogoča **vnos in pregled podatkov o zaposlenih**.

### Zahtevani zasloni in funkcionalnosti
- **Seznam zaposlenih (Home)**: `FlatList` z **`testID="employeesList"`**. Vsak element naj ima **`testID="employee-<index>"`** (npr. `employee-0`).  
- **Dodaj zaposlenega**: dostopno z gumbom/FAB **`testID="fabAdd"`**, ki odpre obrazec z naslednjimi polji:
  - `TextInput` **`testID="firstNameField"`**
  - `TextInput` **`testID="lastNameField"`**
  - `TextInput` **`testID="positionField"`**
  - `TextInput` **`testID="emailField"`**
  - gumb za shranjevanje **`testID="saveEmployee"`**
- **Validacija**: ob napačnem emailu po kliku na `saveEmployee` prikaži sporočilo/element z **`testID="emailError"`** (besedilo poljubno, a *mora obstajati*).  
- **Podrobnosti**: tap na `employee-0` odpre stran z **`testID="pageDetail"`** in prikaže:
  - ime in priimek v elementu **`testID="detailName"`**
  - delovno mesto v elementu **`testID="detailPosition"`**
  - email v elementu **`testID="detailEmail"`**

> UI/besedila so poljubni; **imena testID-jev morajo biti točno taka**, kot zgoraj.

### Model in podatki
- Uporabi lokalno stanje (npr. `useState`) z **seznamom zaposlenih** (`{ firstName, lastName, position, email }`). Trajna hramba ni potrebena.

---

## ✅ Oddaja
1. Ustvari vejo **`feature/01_vaja`** in razvijaj v njej.  
2. Odpri **Pull Request v `main`**.  
3. Naredi **najmanj 5 smiselnih commitov** (CI zahteva **≥ 5** commitov na PR).  
4. Dodaj **`docs/LEARNING_LOG.md`** (10–15 vrstic): problem → rešitev → nauk (datoteka **ne sme biti prazna**).

---

## 🧪 Avtomatsko preverjanje (CI)
CI se zažene na **push/PR** in preveri:
- `npm ci` + `npm test` (Jest + `@testing-library/react-native`)  
- obstoj in vsebino `docs/LEARNING_LOG.md`  
- **≥ 5 commitov** na PR

> Če se test ali analiza sesuje, poglej **Actions → job logs** za namig, kaj manjka.

---

## 🖥️ Lokalni zagon
```bash
npm install
npm test
```

*(Expo/Metro runtime ni potreben — testiramo komponente, ne emulatorja.)*

---

## 🔑 Povzetek obveznih `testID`
```
employeesList
employee-<index>   (npr. employee-0)
fabAdd
firstNameField
lastNameField
positionField
emailField
saveEmployee
emailError
pageDetail
detailName
detailPosition
detailEmail
```
