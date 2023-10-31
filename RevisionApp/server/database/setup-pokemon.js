const fs = require('fs');
require("dotenv").config();

const db = require("./connect");

const sql = fs.readFileSync('./database/pokemon.sql').toString();

const addPokemon = async () => {
    const countResponse = await fetch("https://pokeapi.co/api/v2/evolution-chain/")
    const count = await countResponse.json()
    for(let i = 1; i <= count.count; i++){
        console.log(i) //use to see where an error is
        const chainResponse = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${i}`)
        if(chainResponse.ok){
            const chain = await chainResponse.json()
            let baby, middle, final
            baby = chain.chain.species.name
            if(chain.chain.evolves_to.length >= 1){
                if(chain.chain.evolves_to.length > 1){
                    // console.log("woo")
                    // console.log(i)
                    for(let j = 0; j < chain.chain.evolves_to.length; j++){
                        middle = chain.chain.evolves_to[j].species.name
                        if(chain.chain.evolves_to[j].evolves_to.length >= 1){
                            if(chain.chain.evolves_to[j].evolves_to.length > 1){
                                for(let k = 0; k < chain.chain.evolves_to[j].evolves_to.length; k++){
                                    final = chain.chain.evolves_to[j].evolves_to[k].species.name
                                    await addToDB(final,middle,baby)
                                }
                            }else{
                                final = chain.chain.evolves_to[j].evolves_to[0].species.name
                                await addToDB(final,middle,baby)
                            }
                        }else{
                            final = null
                            await addToDB(final,middle,baby)
                        }
                    }
                }else{
                    if(chain.chain.evolves_to[0]){
                        middle = chain.chain.evolves_to[0].species.name
                        if(chain.chain.evolves_to[0].evolves_to.length >= 1){
                            if(chain.chain.evolves_to[0].evolves_to.length > 1){
                                for(let j = 0; j < chain.chain.evolves_to[0].evolves_to.length; j++){
                                    final = chain.chain.evolves_to[0].evolves_to[j].species.name
                                    await addToDB(final,middle,baby)
                                }
                            }else{
                                final = chain.chain.evolves_to[0].evolves_to[0].species.name
                                await addToDB(final,middle,baby)
                            }
                        }else{
                            final = null
                            await addToDB(final,middle,baby)
                        }
                    }
                }
            }else{
                middle = null
                final = null
                await addToDB(final,middle,baby)
            }
        }
    }
}

const addToDB = async(final,middle,baby) => {
    // console.log(final)
    // console.log(middle)
    // console.log(baby)
    if(final){
        const finalImage = await fetch(`https://pokeapi.co/api/v2/pokemon/${final}`)
        const finalResponse = await finalImage.json()
        const middleImage = await fetch(`https://pokeapi.co/api/v2/pokemon/${middle}`)
        const middleResponse = await middleImage.json()
        const babyImage = await fetch(`https://pokeapi.co/api/v2/pokemon/${baby}`)
        const babyResponse = await babyImage.json()
        const finalID = await db.query("INSERT INTO pokemon (name, evolution_stage, evolves_to, study_time, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING pokemon_id;",[final,'final',null,null,finalResponse.sprites["front_default"]])
        const middleID = await db.query("INSERT INTO pokemon (name, evolution_stage, evolves_to, study_time, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING pokemon_id;",[middle,'middle',finalID.rows[0].pokemon_id,60,middleResponse.sprites["front_default"]])
        const babyID = await db.query("INSERT INTO pokemon (name, evolution_stage, evolves_to, study_time, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING pokemon_id;",[baby,'baby',middleID.rows[0].pokemon_id,30,babyResponse.sprites["front_default"]])
    }else if(middle){
        const middleImage = await fetch(`https://pokeapi.co/api/v2/pokemon/${middle}`)
        const middleResponse = await middleImage.json()
        const babyImage = await fetch(`https://pokeapi.co/api/v2/pokemon/${baby}`)
        const babyResponse = await babyImage.json()
        const finalID = await db.query("INSERT INTO pokemon (name, evolution_stage, evolves_to, study_time, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING pokemon_id;",[middle,'final',null,null,middleResponse.sprites["front_default"]])
        const babyID = await db.query("INSERT INTO pokemon (name, evolution_stage, evolves_to, study_time, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING pokemon_id;", [baby,'baby',finalID.rows[0].pokemon_id,30,babyResponse.sprites["front_default"]])
    }else{
        const babyImage = await fetch(`https://pokeapi.co/api/v2/pokemon/${baby}`)
        const babyResponse = await babyImage.json()
        const finalID = await db.query("INSERT INTO pokemon (name, evolution_stage, evolves_to, study_time, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING pokemon_id;",[baby,'final',null,null,babyResponse.sprites["front_default"]])
        const babyID = await db.query("INSERT INTO pokemon (name, evolution_stage, evolves_to, study_time, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING pokemon_id;", [baby,'baby',finalID.rows[0].pokemon_id,30,babyResponse.sprites["front_default"]])
    }
}

db.query(sql)
    .then(async data => {
        await addPokemon()
        db.end();
        console.log("setup complete")
    })
    .catch(error => { console.log(error)})