// import * as SQLite from 'expo-sqlite';


// const db = SQLite.openDatabaseAsync('bibliothequeNum.db');

// export const initDB = async (database) => {
//   await database.withTransactionAsync(async () => {
//   // await db.withTransactionAsync(async () => {
//     // Activer les clés étrangères
//     await database.execAsync(`PRAGMA foreign_keys = ON;`);

//     // Table rôle
//     await database.execAsync(`
//       CREATE TABLE IF NOT EXISTS role (
//         id_role INTEGER PRIMARY KEY AUTOINCREMENT,

//         libelle TEXT NOT NULL
//       );
//     `);

//     const result = await database.getAllAsync(`SELECT COUNT(*) as count FROM role`);
//     const count = result?.[0]?.count ?? 0;

//     if (count === 0) {
//       await database.runAsync(
//         `INSERT INTO role (libelle) VALUES (?), (?), (?)`,
//         ['admin', 'utilisateur', 'lecteur']
//       );
//       console.log("✅ Rôles insérés !");
//     } else {
//       console.log("ℹ️ Les rôles existent déjà.");
//     }


//     // Table utilisateur
//     await database.execAsync(`
//       CREATE TABLE IF NOT EXISTS utilisateur (
//         id_utilisateur INTEGER PRIMARY KEY AUTOINCREMENT,
//         nom TEXT NOT NULL,
//         prenom TEXT NOT NULL,
//         ville TEXT,
//         login TEXT NOT NULL,
//         mot_de_passe TEXT NOT NULL,
//         id_role INTEGER,
//         FOREIGN KEY (id_role) REFERENCES role(id_role)
//       );
//     `);

//     // Table livre
//     await database.execAsync(`
//       CREATE TABLE IF NOT EXISTS livre (
//         id_livre INTEGER PRIMARY KEY AUTOINCREMENT,
//         titre TEXT NOT NULL,
//         auteur TEXT,
//         categorie TEXT,
//         annee_publication TEXT,
//         statut TEXT,
//         image TEXT
//       );
//     `);

//     await database.runAsync(
//       `INSERT INTO livre (titre, auteur, categorie, annee_publication, statut, image)
//       VALUES 
//       (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?),
//       (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?),
//       (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?),
//       (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?),
//       (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?)`,
//       [
//         'Harry Potter', 'J.K Rowling', 'Fantaisie', '1997', 'disponible', 'https://fgellaobb.filerobot.com/9782070518425_1?fit=fit&op_sharpen=1&resmode=bilin&fmt=pjpeg&qlt=85&trim=0.5&wid=450&hei=450',
//         'Le Seigneur des Anneaux', 'J. R. R. Tolkien', 'Fantaisie', '1954', 'emprunté', 'https://www.gallimard-jeunesse.fr/assets/media/cache/cover_medium/gallimard_img/image/J02275.jpg',
//         'Le Temps Figé', 'Marc Renaud', 'Fantastique', '1999', 'disponible', 'https://static2.cyberlibris.com/books_upload/136pix/9782895023227.jpg',
//       'Les Misérables', 'Victor Hugo', 'Historique', '1862', 'emprunté', 'https://images.epagine.fr/340/9782253094340_1_75.jpg',
//         'L’Éveil', 'Jean Martin', 'Thriller', '2015', 'disponible', 'https://m.media-amazon.com/images/I/71B8WSoO7wL._AC_UF1000,1000_QL80_.jpg',
//         'La Passe-miroir', 'Christelle Dabos', 'Fantastique', '2013', 'disponible', 'https://m.media-amazon.com/images/I/A1zSxAP0xxL.jpg',
//         'Dune', 'Frank Herbert', 'Science-fiction', '1965', 'disponible', 'https://m.media-amazon.com/images/I/614RBqUr5lL._UF1000,1000_QL80_.jpg',
//         'Le Chant d\'Achille', 'Madeline Miller', 'Historique', '2011', 'disponible', 'https://images.epagine.fr/426/9782266334426_1_75.jpg',
//         'Le Silence des Agneaux', 'Thomas Harris', 'Thriller', '1988', 'disponible', 'https://m.media-amazon.com/images/I/61hEowVf8rL.jpg',
//         '1984', 'George Orwell', 'Dystopie', '1949', 'disponible', 'https://static.fnac-static.com/multimedia/PE/Images/FR/NR/10/35/01/79120/1507-1/tsp20250103092736/1984.jpg',
//         'L\'Étranger', 'Albert Camus', 'Philosophie', '1942', 'emprunté', 'https://m.media-amazon.com/images/I/8130inT26AL.jpg',
//         'Les Fleurs du mal', 'Charles Baudelaire', 'Poésie', '1857', 'disponible', 'https://m.media-amazon.com/images/I/81iYflm45mL.jpg',
//         'La Vie est Facile, Ne T’inquiète Pas', 'Agnès Martin-Lugand', 'Romance', '2015', 'disponible', 'https://agnesmartinlugand.fr/wp-content/uploads/2020/04/la-vie-est-facile-poche.png',
//         'Le Livre des Baltimore', 'Joël Dicker', 'Drame', '2015', 'emprunté', 'https://m.media-amazon.com/images/I/91uz6CVs2uL._UF1000,1000_QL80_.jpg',
//         'It Ends With Us', 'Colleen Hoover', 'Romance', '2016', 'disponible', 'https://m.media-amazon.com/images/I/712zD1rKTUL._UF1000,1000_QL80_.jpg ',
//         'Sapiens', 'Yuval Noah Harari', 'Essai', '2011', 'disponible', 'https://m.media-amazon.com/images/I/61SaNiLLX-L._UF1000,1000_QL80_.jpg',
//         'Le Petit Prince', 'Antoine de Saint-Exupéry', 'Conte', '1943', 'emprunté', 'https://static.fnac-static.com/multimedia/PE/Images/FR/NR/a6/d8/1d/1956006/1507-1/tsp20241211074117/Le-Petit-Prince.jpg',
//         'L\'Alchimiste', 'Paulo Coelho', 'Développement personnel', '1988', 'disponible', 'https://cdn.cultura.com/cdn-cgi/image/width=830/media/pim/TITELIVE/83_9782290258064_1_75.jpg',
//         'La Nuit', 'Elie Wiesel', 'Témoignage', '1956', 'disponible', 'https://m.media-amazon.com/images/I/71LrqCEWjeL.jpg',
//         'Shining', 'Stephen King', 'Horreur', '1977', 'disponible', 'https://m.media-amazon.com/images/I/81imcWAv6SL._UF1000,1000_QL80_.jpg'
//       ]
//     );

//     // Table emprunt
//     await database.execAsync(`
//       CREATE TABLE IF NOT EXISTS emprunt (
//         id_emprunt INTEGER PRIMARY KEY AUTOINCREMENT,
//         date_emprunt TEXT,
//         date_retour_prevue TEXT,
//         date_retour_reelle TEXT,
//         id_utilisateur INTEGER,
//         id_livre INTEGER,
//         FOREIGN KEY (id_utilisateur) REFERENCES utilisateur(id_utilisateur),
//         FOREIGN KEY (id_livre) REFERENCES livre(id_livre)
//       );
//     `);

//     // Table réservation
//     await database.execAsync(`
//       CREATE TABLE IF NOT EXISTS reservation (
//         id_reservation INTEGER PRIMARY KEY AUTOINCREMENT,
//         date_reservation TEXT,
//         statut TEXT,
//         id_utilisateur INTEGER,
//         id_livre INTEGER,
//         FOREIGN KEY (id_utilisateur) REFERENCES utilisateur(id_utilisateur),
//         FOREIGN KEY (id_livre) REFERENCES livre(id_livre)
//       );
//     `);

//     // await database.execAsync(`
//     //   INSERT INTO reservation (date_reservation, statut, id_utilisateur, id_livre)
//     //   VALUES 
//     //     ('2025-06-15', 'en attente', 1, 3),
//     //     ('2025-06-16', 'en attente', 2, 1),
//     //     ('2025-06-17', 'en attente', 3, 4),
//     //     ('2025-06-17', 'en attente', 2, 2),
//     //     ('2025-06-18', 'en attente', 1, 5);
//     // `);

//     const rows = await (await db).getAllAsync('SELECT COUNT(*) as total FROM reservation');
//     if (rows[0].total === 0) {
//       await db.exec(`
//         INSERT INTO reservation (date_reservation, statut, id_utilisateur, id_livre)
//         VALUES 
//           ('2025-06-15', 'en attente', 1, 3),
//           ('2025-06-16', 'en attente', 2, 1),
//           ('2025-06-17', 'en attente', 3, 4),
//           ('2025-06-17', 'en attente', 2, 2),
//           ('2025-06-18', 'en attente', 1, 5);
//       `);
//     }
    

//     await database.execAsync(`
//       CREATE TABLE IF NOT EXISTS reservation (
//         id_reservation INTEGER PRIMARY KEY AUTOINCREMENT,
//         date_reservation TEXT,
//         statut TEXT,
//         id_utilisateur INTEGER,
//         id_livre INTEGER,
//         FOREIGN KEY (id_utilisateur) REFERENCES utilisateur(id_utilisateur),
//         FOREIGN KEY (id_livre) REFERENCES livre(id_livre)
//       );
//     `);
//    },
//   (error) => {
//     console.log("❌ Erreur lors de la création des tables :", error);
//   },
//   () => {
//     console.log("✅ Toutes les tables ont été créées avec succès !");
//   });
// };

// export default db;


import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseAsync('bibliothequeNum.db');

export const initDB = async (database) => {
  await database.withTransactionAsync(async () => {
    await database.execAsync(`PRAGMA foreign_keys = ON;`);

    // Table rôle
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS role (
        id_role INTEGER PRIMARY KEY AUTOINCREMENT,
        libelle TEXT NOT NULL UNIQUE
      );
    `);

    // Insertion rôles si inexistant
    const existingRoles = await database.getAllAsync(`SELECT libelle FROM role`);
    const rolesToInsert = ['admin', 'utilisateur', 'lecteur'].filter(
      role => !existingRoles.some(r => r.libelle === role)
    );
    for (const role of rolesToInsert) {
      await database.runAsync(`INSERT INTO role (libelle) VALUES (?)`, [role]);
    }

    // Table utilisateur
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS utilisateur (
        id_utilisateur INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT NOT NULL,
        prenom TEXT NOT NULL,
        ville TEXT,
        login TEXT NOT NULL UNIQUE,
        mot_de_passe TEXT NOT NULL,
        id_role INTEGER,
        FOREIGN KEY (id_role) REFERENCES role(id_role)
      );
    `);

    // Table livre avec titre unique
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS livre (
        id_livre INTEGER PRIMARY KEY AUTOINCREMENT,
        titre TEXT NOT NULL UNIQUE,
        auteur TEXT,
        categorie TEXT,
        annee_publication TEXT,
        statut TEXT,
        image TEXT
      );
    `);

    // await database.execAsync(`DELETE FROM livre`);

    const livresExistants = await database.getAllAsync(`SELECT titre FROM livre`);
    const titresExistants = livresExistants.map(l => l.titre);
    const livres = [
      ['Harry Potter', 'J.K Rowling', 'Fantaisie', '1997', 'disponible', 'https://fgellaobb.filerobot.com/9782070518425_1?fit=fit&op_sharpen=1&resmode=bilin&fmt=pjpeg&qlt=85&trim=0.5&wid=450&hei=450'],
      ['Le Seigneur des Anneaux', 'J. R. R. Tolkien', 'Fantaisie', '1954', 'emprunté', 'https://www.gallimard-jeunesse.fr/assets/media/cache/cover_medium/gallimard_img/image/J02275.jpg'],
      ['Le Temps Figé', 'Marc Renaud', 'Fantastique', '1999', 'disponible', 'https://static2.cyberlibris.com/books_upload/136pix/9782895023227.jpg'],
      ['Les Misérables', 'Victor Hugo', 'Historique', '1862', 'emprunté', 'https://images.epagine.fr/340/9782253094340_1_75.jpg'],
      ['L’Éveil', 'Jean Martin', 'Thriller', '2015', 'disponible', 'https://m.media-amazon.com/images/I/71B8WSoO7wL._AC_UF1000,1000_QL80_.jpg'],
      ['La Passe-miroir', 'Christelle Dabos', 'Fantastique', '2013', 'disponible', 'https://m.media-amazon.com/images/I/A1zSxAP0xxL.jpg'],
      ['Dune', 'Frank Herbert', 'Science-fiction', '1965', 'disponible', 'https://m.media-amazon.com/images/I/614RBqUr5lL._UF1000,1000_QL80_.jpg'],
      ['Le Chant d\'Achille', 'Madeline Miller', 'Historique', '2011', 'disponible', 'https://images.epagine.fr/426/9782266334426_1_75.jpg'],
      ['Le Silence des Agneaux', 'Thomas Harris', 'Thriller', '1988', 'disponible', 'https://m.media-amazon.com/images/I/61hEowVf8rL.jpg'],
      ['1984', 'George Orwell', 'Dystopie', '1949', 'disponible', 'https://static.fnac-static.com/multimedia/PE/Images/FR/NR/10/35/01/79120/1507-1/tsp20250103092736/1984.jpg'],
      ['L\'Étranger', 'Albert Camus', 'Philosophie', '1942', 'emprunté', 'https://m.media-amazon.com/images/I/8130inT26AL.jpg'],
      ['Les Fleurs du mal', 'Charles Baudelaire', 'Poésie', '1857', 'disponible', 'https://m.media-amazon.com/images/I/81iYflm45mL.jpg'],
      ['La Vie est Facile, Ne T’inquiète Pas', 'Agnès Martin-Lugand', 'Romance', '2015', 'disponible', 'https://agnesmartinlugand.fr/wp-content/uploads/2020/04/la-vie-est-facile-poche.png'],
      ['Le Livre des Baltimore', 'Joël Dicker', 'Drame', '2015', 'emprunté', 'https://m.media-amazon.com/images/I/91uz6CVs2uL._UF1000,1000_QL80_.jpg'],
      ['It Ends With Us', 'Colleen Hoover', 'Romance', '2016', 'disponible', 'https://m.media-amazon.com/images/I/712zD1rKTUL._UF1000,1000_QL80_.jpg'],
      ['Sapiens', 'Yuval Noah Harari', 'Essai', '2011', 'disponible', 'https://m.media-amazon.com/images/I/61SaNiLLX-L._UF1000,1000_QL80_.jpg'],
      ['Le Petit Prince', 'Antoine de Saint-Exupéry', 'Conte', '1943', 'emprunté', 'https://static.fnac-static.com/multimedia/PE/Images/FR/NR/a6/d8/1d/1956006/1507-1/tsp20241211074117/Le-Petit-Prince.jpg'],
      ['L\'Alchimiste', 'Paulo Coelho', 'Développement personnel', '1988', 'disponible', 'https://cdn.cultura.com/cdn-cgi/image/width=830/media/pim/TITELIVE/83_9782290258064_1_75.jpg'],
      ['La Nuit', 'Elie Wiesel', 'Témoignage', '1956', 'disponible', 'https://m.media-amazon.com/images/I/71LrqCEWjeL.jpg'],
      ['Shining', 'Stephen King', 'Horreur', '1977', 'disponible', 'https://m.media-amazon.com/images/I/81imcWAv6SL._UF1000,1000_QL80_.jpg']
    ];

    for (const [titre, auteur, categorie, annee, statut, image] of livres) {
      if (!titresExistants.includes(titre)) {
        await database.runAsync(
          `INSERT INTO livre (titre, auteur, categorie, annee_publication, statut, image) VALUES (?, ?, ?, ?, ?, ?)`,
          [titre, auteur, categorie, annee, statut, image]
        );
      }
    }

    // Table emprunt
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS emprunt (
        id_emprunt INTEGER PRIMARY KEY AUTOINCREMENT,
        date_emprunt TEXT,
        date_retour_prevue TEXT,
        date_retour_reelle TEXT,
        id_utilisateur INTEGER,
        id_livre INTEGER,
        FOREIGN KEY (id_utilisateur) REFERENCES utilisateur(id_utilisateur),
        FOREIGN KEY (id_livre) REFERENCES livre(id_livre)
      );
    `);

    // Table réservation
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS reservation (
        id_reservation INTEGER PRIMARY KEY AUTOINCREMENT,
        date_reservation TEXT,
        statut TEXT,
        id_utilisateur INTEGER,
        id_livre INTEGER,
        FOREIGN KEY (id_utilisateur) REFERENCES utilisateur(id_utilisateur),
        FOREIGN KEY (id_livre) REFERENCES livre(id_livre),
        UNIQUE(date_reservation, id_utilisateur, id_livre)
      );
    `);

    const emprunts = [
      ['2025-06-10', '2025-06-24', null, 1, 2593],
      ['2025-06-12', '2025-06-26', '2025-06-20', 2, 2606],
      ['2025-06-15', '2025-06-29', null, 3, 2599],
    ];

    for (const [dateEmprunt, dateRetourPrevue, dateRetourReelle, idUser, idLivre] of emprunts) {
      const existing = await database.getFirstAsync(
        `SELECT 1 FROM emprunt WHERE date_emprunt = ? AND id_utilisateur = ? AND id_livre = ?`,
        [dateEmprunt, idUser, idLivre]
      );
      if (!existing) {
        await database.runAsync(
          `INSERT INTO emprunt (
            date_emprunt,
            date_retour_prevue,
            date_retour_reelle,
            id_utilisateur,
            id_livre
          ) VALUES (?, ?, ?, ?, ?)`,
          [dateEmprunt, dateRetourPrevue, dateRetourReelle, idUser, idLivre]
        );
      }
    }

console.log("✅ Emprunts insérés sans doublons.");

    // await database.runAsync(`DELETE FROM reservation`);

    const sampleReservations = [
      ['2025-06-15', 'en attente', 'validée ?', 1, 2593],
      ['2025-06-16', 'en attente', 'validée ?', 2, 2606],
      ['2025-06-17', 'en attente', 'validée ?', 3, 2599],
    ];

    for (const [date, statut, action, idUser, idLivre] of sampleReservations) {
      const existing = await database.getFirstAsync(
        `SELECT 1 FROM reservation WHERE date_reservation = ? AND id_utilisateur = ? AND id_livre = ?`,
        [date, idUser, idLivre]
      );
      if (!existing) {
        await database.runAsync(
          `INSERT INTO reservation (date_reservation, statut, action, id_utilisateur, id_livre)
          VALUES (?, ?, ?, ?, ?)`,
          [date, statut, action, idUser, idLivre]
        );
      }
    }

    console.log("✅ Base de données initialisée sans doublons.");
  },
  (err) => console.error("❌ Erreur transaction DB :", err),
  () => console.log("🎉 Transaction terminée avec succès.")
  );
};

export default db;
