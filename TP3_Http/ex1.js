import { createServer } from "node:http";
import { pipeline } from "node:stream"; // ✅ import pipeline
import fs from "node:fs";

const products = [
    { id: 1, name: 'PC', price: 800 },
    { id: 2, name: 'Clavier', price: 20 }
];

const s = createServer((req, res) => {

    if (req.method === "GET" && req.url === "/") {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        const reader = fs.createReadStream('./TP3_Http/index.html');
        pipeline(reader, res, err => { if (err) console.error(err); });
    }
    else if (req.method === "GET" && req.url.startsWith("/products/")) {
        let id = parseInt(req.url.split("/")[2]);
        let produit = products.find(p => p.id === id);

        if (!produit) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Produit non trouvé" }));
        } else {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(produit));
        }
    }
    else if (req.method === "POST" && req.url === "/products") {
        let body = "";

        req.on("data", chunk => { body += chunk; });

        req.on("end", () => {
            const newProduct = JSON.parse(body);
            newProduct.id=products.length+1;
            products.push(newProduct);
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: true,})); 
        });
    }
    else if(req.method=="GET"&& req.url==="/products"){
        res.writeHead(200,{"Content-Type":"application/json"});
        res.end(JSON.stringify(products));
    }
    else {
        res.writeHead(404);
        res.end("Route non trouvée");
    }
});

s.listen(3001, () => {
    console.log("Listening on port 3000");
});