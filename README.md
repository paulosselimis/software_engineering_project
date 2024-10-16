[Original Project Repository](https://github.com/ntua/softeng23-10)

<H>Github repository of NTUAflix software.</H>

## Μέλη softeng23-10:
- Ioannis Nektarios Iliopoulos | 03119919
- Christos Kavallaris | 03120044
- Georgia Kalogeropoulou | 03114174
- David Prasinos | 03120899
- Athanasios Retsas| 03120854
- Pavlos Selimis | 03120171

# Εγκατάσταση

## Manual Installation
Για περισσότερες διευκρινίσεις, διαβάστε όλα τα README της εφαρμογής

#### Database:
Ανοίγουμε πρόγραμμα ή server που μπορεί να κάνει host βάση MariaDB/MySQL.

Βεβαιωνόμαστε οτι η ΒΔ είναι με user: "root", password: "" και host: "localhost". (Αν χρησιμοποιούνται αλλά και δεν μπορούν να αλλάξουν πρέπει να γίνει αλλαγή στις πρώτες γραμμές του [database.js](back-end/database.js))

Δημιουργούμε μια ΒΔ με όνομα "ntuaflix" μέσω command line ή κάποιου workbench (π.χ MySQL Workbench) :


```bash
CREATE SCHEMA IF NOT EXISTS `ntuaflix` DEFAULT CHARACTER SET utf8 ;
```

Κάνουμε import to DB dump στην βάση μας είτε μέσω workbench έιτε απευθείας απο το bash του MariaDB:

```bash
mariadb -u root -p ntuaflix.sql
```

Μέσα στο 'ntuaflix.sql' το οποίο βρίσκεται στον φάκελο back-end υπάρχουν σε comments οι εντολές load data infile με τις οποίες μπορείτε να κάνετε populate τα tables πριν τρέξετε την εφαρμογή (προφανώς βάζοντας στο directory κάθε LOAD INFILE την τοποθεσία των αρχείων δεδομένων στον δίσκο σας). 

Αντι του παραπάνω μπορείτε σε επόμενο βήμα να χρησιμοποιήσετε το CLI, αφού έχετε κάνει setup και το API και το CLI. 

#### API:
Βεβαιωνόμαστε ότι έχουμε όλα τα requirements για να τρέξουμε το API

Πηγαίνουμε στον φάκελο `back-end` και τρέχουμε σε terminal `npm install`, και αμέσως μετα `npm start`.

Με την εκτέλεση αυτής της εντολής ανοίγει αυτόματα το front web page της εφαρμογής στο index.html

#### CLI:
<u>Για να τρέξει το CLI <b>πρέπει</b> να τρέχει και το API</u>

Βεβαιωνόμαστε ότι έχουμε όλα τα requirements για να τρέξουμε το CLI

Πηγαίνουμε στον φάκελο `cli-client` και τρέχουμε σε terminal `npm install`, και αμέσως μετα `node se2310.js ` ακολουθούμενο απο την αντίστοιχη εντολή που θέλουμε να τρέξουμε.
