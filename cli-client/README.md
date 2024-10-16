#### CLI README

## Manual Installation
Έχοντας εγκαταστήσει το node.js για να τρέχει η εφαρμογή, ανοίγουμε command window στο directory softeng23-10/cli-client και εκτελούμε την εντολή:
```bash
npm install
```
Αυτό θα εγκαταστήσει τις απαραίτητες εξαρτήσεις που περιλαμβάνονται στο αρχείο package.json, συμπεριλαμβανομένων των Axios, Commander και Jest.


## Εφαρμογή CLI:
 Αφού ολοκληρωθεί η εγκατάσταση και με τον server να είναι ανοιχτός, μπορούμε να χρησιμοποιήσουμε το CLI μας μέσω ενός terminal στο directory softeng23-10/cli-client.
 Οι εντολές του CLI έχουν την μορφή:
```bash
node se2310 scope --param1 value1 [--param2 value2 ...] --format fff
```

Για την προβολή όλων των πιθανών εντολών, χρησιμοποιήστε:
```bash
node se2310 --help
```

Επίσης, για να δείτε τη σωστή χρήση των εντολών χρησιμοποιήστε --help ή -h:
```bash
node se2310 scope --help 
```
 ή 
 ```bash
node se2310 scope -h
```

Για να μπορείτε να εκτελέσετε όλες τις εντολές, πρέπει πρώτα να κάνετε login:
```bash
node se2310 login --username admin --username admin
```
Τέλος, για τις εντολές που κάνουν upload αρχεία .tsv στην βάση, φροντίστε να βρίσκονται στο cli-client directory.

## CLI TESTING:

Το testing του CLI έγινε με την χρήση του Jest.
Με την χρήση διάφορων [cli options του Jest](https://jestjs.io/docs/cli), όπως του --coverage, μπορούμε να παρατηρήσουμε την συμπεριφορά του κώδικα μας.
Για την εφαρμογή του, μπορούμε να χρησιμοποιήσουμε την παρακάτω εντολή, η οποία όμως <b>δεν συνίσταται</b> γιατί δημιουργεί προβλήματα συγχρονισμού.
```bash
npm test
```

### CLI Unit Test:

Τα αρχεία των unit test των function του κώδικα είναι όλα της μορφής function.test.js. Συνίσταται να τα τρέξετε ξεχωριστά με την χρήση της εντολής:
 ```bash
npm test --t 'function.test.js'
```
ή όλα μαζί, αφαιρώντας το αρχείο functional.test.js απο το directory.


### CLI Functional Test:

Το functional test του CLI βρίσκεται στο αρχείο  functional.test.js. Μπορείτε να το τρέξετε με την εντολή:
 ```bash
npm test --t 'functional.test.js'
```
Λόγω του μεγάλου όγκου test που συμπεριλαμβάνει το αρχείο, μπορεί να υπάρχουν προβλήματα με την εκτέλεσή του ως έχει. Συνίσταται να τρέξετε τα testing suites ένα-ένα, με τη χρήση του ".only"
Για παράδειγμα, αλλάζοντας τον κώδικα του functional.test.js από
```bash
 describe('CLI Functional Test- Authentication Commands Suite', () => {
```
σε
```bash
describe.only('CLI Functional Test- Authentication Commands Suite', () => {
```
θα πραγματοποιηθούν μόνο τα test cases που συμπεριλαμβάνονται στο Authentication Commands Suite.

Επίσης, στο Uploads Commands Suite, τα test που κάνουν upload αρχεία έχουν την μορφή "test.skip" διότι αναγκάζουν τον server να κάνει restart. Για την χρήση τους, αλλάξτε το .skip σε .only έτσι ώστε να πραγματοποιήθει το συγκεκριμένο test, χωρίς να δημιουργηθούν προβλήματα με την λήξη της σύνδεσης με τον server. Για παράδειγμα, αλλάξτε το:

```bash
    test.skip('New Titles Command - Successful Upload', (done) => {
```
σε
```bash
    test.only('New Titles Command - Successful Upload', (done) => {
```


