# Learning Log - Vaja 2: Lokalna Trajna Hramba Podatkov

## Problem
Aplikacija iz Vaje 1 ni imela trajne hranjenja podatkov - vsi zaposleni so bili izgubljeni po ponovnem zagonu aplikacije. Potreboval sem rešitev za trajno shranjevanje podatkov, ki deluje v React Native/Expo okolju.

## Rešitev
Implementiral sem `expo-sqlite` knjižnico za trajno shranjevanje podatkov:

1. **Knjižnica**: Uporabil sem `expo-sqlite` namesto `react-native-sqlite-storage`, ker je to uradna Expo knjižnica, ki deluje z Expo Go in je popolnoma kompatibilna s projektom.

2. **Database Helper**: Ustvaril sem `src/database/database.ts` z funkcijami za:
   - Migracijo baze in ustvarjanje tabel (`migrateDbIfNeeded`)
   - CRUD operacije (getAllEmployees, addEmployee, deleteEmployee, clearAllEmployees)

3. **SQLiteProvider**: Ovil aplikacijo v `<SQLiteProvider>` komponentо, ki upravlja povezavo z bazo `employees.db`.

4. **Async operacije**: Vse database operacije so asinhronne (`async/await`), kar zagotavlja gladko delovanje UI brez blokiranja.

5. **Dodatne funkcionalnosti**: Dodal sem možnost brisanja posameznega zaposlenega in čiščenja vseh zaposlenih z alert dialogi za potrditev.

## Nauk
- **expo-sqlite** je priporočena izbira za Expo projekte - deluje takoj brez dodatne konfiguracije.
- SQLite omogoča relacijsko strukturiranje podatkov in SQL poizvedbe, kar je močneje od AsyncStorage.
- Uporaba `useSQLiteContext()` hook-a omogoča dostop do baze kjerkoli v React komponentnem drevesu.
- Migracije (`PRAGMA user_version`) so ključne za nadgradnjo baze v prihodnosti brez izgube podatkov.
- Pomembno je ločiti database logiko v ločene module za lažje testiranje in vzdrževanje kode.
