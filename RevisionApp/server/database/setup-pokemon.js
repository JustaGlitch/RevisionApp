const fs = require('fs');
require("dotenv").config();

const db = require("./connect");

const sql = fs.readFileSync('./database/pokemon.sql').toString();

// const addPokemon = async () => {
//     const countResponse = await fetch("https://pokeapi.co/api/v2/evolution-chain/")
//     const count = await countResponse.json()
//     for(let i = 1; i <= count.count; i++){
//         console.log(i) //use to see where an error is
//         const chainResponse = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${i}`)
//         if(chainResponse.ok){
//             const chain = await chainResponse.json()
//             let baby, middle, final
//             baby = chain.chain.species.name
//             if(chain.chain.evolves_to.length >= 1){
//                 if(chain.chain.evolves_to.length > 1){
//                     // console.log("woo")
//                     // console.log(i)
//                     for(let j = 0; j < chain.chain.evolves_to.length; j++){
//                         middle = chain.chain.evolves_to[j].species.name
//                         if(chain.chain.evolves_to[j].evolves_to.length >= 1){
//                             if(chain.chain.evolves_to[j].evolves_to.length > 1){
//                                 for(let k = 0; k < chain.chain.evolves_to[j].evolves_to.length; k++){
//                                     final = chain.chain.evolves_to[j].evolves_to[k].species.name
//                                     await addToDB(final,middle,baby)
//                                 }
//                             }else{
//                                 final = chain.chain.evolves_to[j].evolves_to[0].species.name
//                                 await addToDB(final,middle,baby)
//                             }
//                         }else{
//                             final = null
//                             await addToDB(final,middle,baby)
//                         }
//                     }
//                 }else{
//                     if(chain.chain.evolves_to[0]){
//                         middle = chain.chain.evolves_to[0].species.name
//                         if(chain.chain.evolves_to[0].evolves_to.length >= 1){
//                             if(chain.chain.evolves_to[0].evolves_to.length > 1){
//                                 for(let j = 0; j < chain.chain.evolves_to[0].evolves_to.length; j++){
//                                     final = chain.chain.evolves_to[0].evolves_to[j].species.name
//                                     await addToDB(final,middle,baby)
//                                 }
//                             }else{
//                                 final = chain.chain.evolves_to[0].evolves_to[0].species.name
//                                 await addToDB(final,middle,baby)
//                             }
//                         }else{
//                             final = null
//                             await addToDB(final,middle,baby)
//                         }
//                     }
//                 }
//             }else{
//                 middle = null
//                 final = null
//                 await addToDB(final,middle,baby)
//             }
//         }
//     }
// }

const addToDB = async(final,middle,baby) => {
    // console.log(final)
    // console.log(middle)
    // console.log(baby)
    // remove gmax and mega
    // const tag = name.replace('name-','')
    // if substring(4) == gmax || mega
    // SELECT * FROM pokemon WHERE name = baby, rowscount = next form for new species ie perrserker
    // fetch pokemon-species/name 
    // if variety 
    // fetch pokemon/name
    // varieties[1...+],pokemon.url
    // if forms
    // fetch pokemon-form/name
    // forms[1...+].url
    // if(forms.count - currentform.index >= )

    if(final){
        const babyImage = await fetch(`https://pokeapi.co/api/v2/pokemon/${baby}`)
        const babyResponse = await babyImage.json()
        const middleImage = await fetch(`https://pokeapi.co/api/v2/pokemon/${middle}`)
        const middleResponse = await middleImage.json()
        const finalImage = await fetch(`https://pokeapi.co/api/v2/pokemon/${final}`)
        const finalResponse = await finalImage.json()
        const finalID = await db.query("INSERT INTO pokemon (name, evolution_stage, evolves_to, study_time, sprite_url, 3D_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING pokemon_id;",[final,'final',null,null,finalResponse.sprites["front_default"], finalResponse.sprites.other.home["front_default"]])
        const middleID = await db.query("INSERT INTO pokemon (name, evolution_stage, evolves_to, study_time, sprite_url, 3D_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING pokemon_id;",[middle,'middle',finalID.rows[0].pokemon_id,60,middleResponse.sprites["front_default"], middleResponse.sprites.other.home["front_default"]])
        const babyID = await db.query("INSERT INTO pokemon (name, evolution_stage, evolves_to, study_time, sprite_url, 3D_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING pokemon_id;",[baby,'baby',middleID.rows[0].pokemon_id,30,babyResponse.sprites["front_default"], babyResponse.sprites.other.home["front_default"]])
    }else if(middle){
        const babyImage = await fetch(`https://pokeapi.co/api/v2/pokemon/${baby}`)
        const babyResponse = await babyImage.json()
        const middleImage = await fetch(`https://pokeapi.co/api/v2/pokemon/${middle}`)
        const middleResponse = await middleImage.json()
        const finalID = await db.query("INSERT INTO pokemon (name, evolution_stage, evolves_to, study_time, sprite_url, 3D_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING pokemon_id;",[middle,'final',null,null,middleResponse.sprites["front_default"], middleResponse.sprites.other.home["front_default"]])
        const babyID = await db.query("INSERT INTO pokemon (name, evolution_stage, evolves_to, study_time, sprite_url, 3D_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING pokemon_id;", [baby,'baby',finalID.rows[0].pokemon_id,30,babyResponse.sprites["front_default"], babyResponse.sprites.other.home["front_default"]])
    }else{
        const babyImage = await fetch(`https://pokeapi.co/api/v2/pokemon/${baby}`)
        const babyResponse = await babyImage.json()
        const finalID = await db.query("INSERT INTO pokemon (name, evolution_stage, evolves_to, study_time, sprite_url, 3D_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING pokemon_id;",[baby,'final',null,null,babyResponse.sprites["front_default"], babyResponse.sprites.other.home["front_default"]])
        const babyID = await db.query("INSERT INTO pokemon (name, evolution_stage, evolves_to, study_time, sprite_url, 3D_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING pokemon_id;", [baby,'baby',finalID.rows[0].pokemon_id,30,babyResponse.sprites["front_default"], babyResponse.sprites.other.home["front_default"]])
    }
}

const checkInGen = async (final,middle,baby,pokeList) => {
    //check baby exists in gen
    //then check that line hasn't already been added
    //SELECT * FROM pokemon where final doesn't exist or something
    //if true => addToDB
    //if(theGot.pokemon_species.findIndex((poke) => poke.name == baby) > -1){}
    if(pokeList.findIndex((poke) => poke.name == baby) == -1){
        baby = middle
        middle = final
        final = null
    }
    //find evo line
    //select * from where baby, middle, final
    
    if(!false){
        await addToDB(final,middle,baby)
    }
}

const addGen1Pokemon = async () => {
    const getThem = await fetch("https://pokeapi.co/api/v2/generation/1")
    const theGot = await getThem.json()
    for (let j = 0; j < theGot.pokemon_species.length; j++) {
        const getTheCurrent = await fetch(theGot.pokemon_species[j].url)
        const theCurrent = await getTheCurrent.json()
        const getTheLine = await fetch(theCurrent.evolution-chain.url)
        const theLine = await getTheLine.json()
        let baby, middle, final
        baby = theLine.chain.species.name
        if(theLine.chain.evolves_to.length >= 1){
            for (let i = 0; i < theLine.chain.evolves_to.length; i++) {
                middle = theLine.chain.evolves_to[i].species.name
                if(theLine.chain.evolves_to[i].evolves_to.length >= 1){
                    for (let j = 0; j < array.length; j++) {
                        final = theLine.chain.evolves_to[i].evolves_to[j].species.name
                        await checkInGen(final,middle,baby,theGot.pokemon_species)
                    }
                }else{
                    final = null
                    await checkInGen(final,middle,baby,theGot.pokemon_species)
                }
            }
        }else{
            middle = null
            final = null
            await checkInGen(final,middle,baby,theGot.pokemon_species)
        }
        // if(theLine.chain.evolves_to.length > 1){
        //     for (let i = 0; i < theLine.chain.evolves_to.length; i++) {
        //         middle = theLine.chain.evolves_to[i].species.name
        //         if(theLine.chain.evolves_to[i].evolves_to.length > 1){
        //             for (let j = 0; j < theLine.chain.evolves_to[i].evolves_to.length; j++) {
        //                 final = theLine.chain.evolves_to[i].evolves_to[j].species.name
        //                 await checkInGen(final,middle,baby,theGot.pokemon_species)
        //             }
        //         }else {
        //             final = theLine.chain.evolves_to[i].evolves_to[0].species.name
        //         }
        //     }
        // }else {
        //     if(theLine.chain.evolves_to[0].evolves_to.length > 1){

        //     }else {
                
        //     }
        // }
        //             baby = chain.chain.species.name
//             if(chain.chain.evolves_to.length >= 1){
//                 if(chain.chain.evolves_to.length > 1){
//                     // console.log("woo")
//                     // console.log(i)
//                     for(let j = 0; j < chain.chain.evolves_to.length; j++){
//                         middle = chain.chain.evolves_to[j].species.name
//                         if(chain.chain.evolves_to[j].evolves_to.length >= 1){
//                             if(chain.chain.evolves_to[j].evolves_to.length > 1){
//                                 for(let k = 0; k < chain.chain.evolves_to[j].evolves_to.length; k++){
//                                     final = chain.chain.evolves_to[j].evolves_to[k].species.name
//                                     await addToDB(final,middle,baby)
//                                 }
//                             }else{
//                                 final = chain.chain.evolves_to[j].evolves_to[0].species.name
//                                 await addToDB(final,middle,baby)
//                             }
//                         }else{
//                             final = null
//                             await addToDB(final,middle,baby)
//                         }
//                     }
//                 }else{
//                     if(chain.chain.evolves_to[0]){
//                         middle = chain.chain.evolves_to[0].species.name
//                         if(chain.chain.evolves_to[0].evolves_to.length >= 1){
//                             if(chain.chain.evolves_to[0].evolves_to.length > 1){
//                                 for(let j = 0; j < chain.chain.evolves_to[0].evolves_to.length; j++){
//                                     final = chain.chain.evolves_to[0].evolves_to[j].species.name
//                                     await addToDB(final,middle,baby)
//                                 }
//                             }else{
//                                 final = chain.chain.evolves_to[0].evolves_to[0].species.name
//                                 await addToDB(final,middle,baby)
//                             }
//                         }else{
//                             final = null
//                             await addToDB(final,middle,baby)
//                         }
//                     }
//                 }
    }
}

db.query(sql)
    .then(async data => {
        await addGen1Pokemon()
        db.end();
        console.log("setup complete")
    })
    .catch(error => { console.log(error)})