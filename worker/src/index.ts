import { createClient } from "redis";

const client = createClient();

const connection = async () => {
    try {
        await client.connect();
        console.log("Connected to Redis");
    } catch (error) {
        console.error("Error connecting to Redis:", error);
    }
}

const main = async() => {
while(true){

    try {
        const res = await client.blPop("problemSubmission",0);
        console.log(res);
        await new Promise((resolve) => setTimeout(resolve, 2000)); 
        console.log("proccessing submission");
    } catch (error) {
        console.log(error);
    }
}

}

connection().then(()=>{
        main()
})
