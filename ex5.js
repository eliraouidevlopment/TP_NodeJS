// // import fs from 'fs';
// // import path from 'path';
// // import { fileURLToPath } from 'url';

// // // Pour obtenir __dirname en ES Modules
// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = path.dirname(__filename);

// // // Créer le dossier data
// // if (!fs.existsSync('data')) fs.mkdirSync('data');

// // // Créer un fichier largeFile.txt (1 Mo de données)
// // const largeContent = 'Ligne de test '.repeat(100000);
// // fs.writeFileSync('data/largeFile.txt', largeContent);
// // console.log('✅ data/largeFile.txt créé (environ 1 Mo)');

// // // Créer logs.txt
// // const logsContent = `[2024-01-01] erreur connexion
// // [2024-01-02] utilisateur connecté
// // [2024-01-03] échec authentification
// // [2024-01-04] base de données démarrée
// // [2024-01-05] sauvegarde effectuée
// // [2024-01-06] redémarrage serveur
// // [2024-01-07] alerte sécurité
// // [2024-01-08] maintenance planifiée
// // `;
// // fs.writeFileSync('data/logs.txt', logsContent);
// // console.log('✅ data/logs.txt créé');

// // // Créer dossier copies
// // if (!fs.existsSync('copies')) fs.mkdirSync('copies');
// // console.log('✅ dossier copies créé');

// import fs from 'node:fs';
// import path from 'node:path';
// import { fileURLToPath } from 'url';

// // Pour obtenir __dirname en ES Modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


// const sourse= path.join(__dirname,"data//largeFile.txt");
// const des= path.join(__dirname,'copies//backup.txt');

// const ReadStream=new fs.createReadStream(sourse);
// const WriteStream= new fs.createWriteStream(des);
// ReadStream.pipe(WriteStream);

// WriteStream.on("finish",()=>{
//     console.log("copier, est terminer avec succee");
// })
// ReadStream.on("error",(err)=>{
//     console.error(err);

// })


// Lire depuis l'entrée standard (clavier)
// const readable = process.stdin;

// readable.setEncoding('utf8');

// console.log('📝 Saisissez du texte (tapez "exit" pour quitter) :\n');

// readable.on('data', chunk => {
//   const input = chunk.toString().trim();
  
//   if (input.toLowerCase() === 'exit') {
//     console.log('👋 Au revoir !');
//     process.exit();
//   } else if (input) {
//     console.log(`Vous avez saisi : ${input}`);
//   }
// });

// readable.on('end', () => {
//   console.log('Fin de la saisie');
// });


//Les donnéesarriventpar morceaux(chunks).
//ExemplePOST

// import http from "node:http";
// let compteur=0;



// const server=http.createServer((req,res)=>{
//   compteur++;
//   if(req.url==="/"&& req.method==="GET"){
//     res.setHeader("Centent-Type","text/html");
//     res.write(`<h1>Acceuil</h1><p>Visites:${compteur}`);
//     res.end();

//   }else if(req.url==="/api"&& req.method==="GET"){
//     res.setHeader("Centent-Type","application/json");
//     let status=req.status;
//     res.end(JSON.stringify({name:"chakib",age:"20",status:`${status}`}));

//   }else if(req.url==="/contact"&& req.method==="GET"){
//     let c="";
//     req.on("data",(chunck)=>{
//       c+=chunck;

//     })
//     req.on("end",()=>{
//       console.log(c);
//       res.end("Donnes reccue")
//     })

//     }

  
// })

// server.listen(3000);


// import fs from "node:fs"
// import path from "node:path"

// // 1. Définir les chemins avec path.join
// const sourcePath = path.join(__dirname, "gros_fichier.txt");
// const destinationPath = path.join(__dirname, "copies", "copie.txt");

// // 2. Créer les streams
// const readStream = fs.createReadStream(sourcePath);
// const writeStream = fs.createWriteStream(destinationPath);

// // Variable pour compter les octets
// let totalBytes = 0;

// // 3. Écouter l'événement data
// readStream.on("data", (chunk) => {
//   // a. compter les octets du chunk
//   const chunkSize = chunk.length;
//   totalBytes += chunkSize;

//   // b. afficher le chargement
//   console.log(`Chargement : ${chunkSize} octets reçus...`);
// });

// // 4. Utiliser pipe pour copier
// readStream.pipe(writeStream);

// // 5. Écouter la fin de l'écriture
// writeStream.on("finish", () => {
//   console.log("Copie terminée avec succès !");
//   console.log(`Total des octets copiés : ${totalBytes}`);
// });

// // Gestion d'erreurs (important en pratique)
// readStream.on("error", (err) => {
//   console.error("Erreur de lecture :", err);
// });

// writeStream.on("error", (err) => {
//   console.error("Erreur d'écriture :", err);
// });

import path from "path";
import { fileURLToPath } from "url";

// 🔹 recréer __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const source =path.join(_dirname,"gros.txt");
const destination =path.join(_dirname,"copies","copie_gros.txt");

const reader=fs.createReadStream(source);
const writer=fs.createWriteStream(destination);

let total=0;
reader.on("data",(chunck)=>{
  total+=chunck.length;
  console.log(`chargement: ${total} octets...`);
})
reader.pipe(writer);
writer.on("finish",()=>{
  console.log("copies terminer ..")
})