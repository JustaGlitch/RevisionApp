const db = require("./connect");


async function testInsert() {
    try {
        const result = await db.query(
            `INSERT INTO pokemon (name, image_url) VALUES ($1, $2) RETURNING pokemon_id`,
            ['TestPokemon', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png']
        );
        console.log("Insertion successful:", result.rows[0]);
    } catch (error) {
        console.error("Error in test insertion:", error);
    }
}
testInsert();
