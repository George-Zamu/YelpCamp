
const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers")
const Campground = require("../models/campground");


main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
    console.log("Database connected")

}
const sample = array => array[Math.floor(Math.random() * array.length)]


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            author: "665fd74f20bcffdb14164fd9",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: "https://source.unsplash.com/collection/483251",
            description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam ut dolorum praesentium dolore quisquam aut soluta perspiciatis incidunt libero aliquam rerum debitis molestias pariatur vel unde impedit, repudiandae sit corrupti!",
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})
