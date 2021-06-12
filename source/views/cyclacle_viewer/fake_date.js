let readings_a_cycle = 94 // number of expected readings per day
let number_of_cycles = 100 //numbers of days in data set

let min_in_day = 1440 //used to calculate viewer

// sample generated dat
window.fake_data  = [
]

// create fact data set
for (let index = 0; index < number_of_cycles; index++) {

    let data = []

        for (let index = 0; index < readings_a_cycle; index++) {
            let v  = ["2011-10-05T14:48:00.000Z", getRandomInt(-25, 50)]
            data.push( v )
        }

    let output = [ index, data ]
    window.fake_data.push( output )    
}

console.log(window.fake_data);
