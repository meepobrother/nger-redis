import { createClient, print } from 'redis';
const client = createClient();

const pub = createClient();
const sub = createClient();

client.on(`error`, (err: Error) => {
    console.log({
        err
    })
})

client.set("string key", "string val", print);
client.hset("hash key", "hashtest 1", "some value", print);
client.hset("hash key", "hashtest 2", "some value2", print);
client.hkeys("hash key", (err, replies) => {
    console.log(replies.length + " replies:");
    replies.forEach((reply, i) => {
        console.log("    " + i + ": " + reply);
    });
    client.quit();
});


let msg_count: number = 0;

sub.on(`subscribe`, (channel, count) => {
    pub.publish("a nice channel", "I am sending a message.");
    pub.publish("a nice channel", "I am sending a second message.");
    pub.publish("a nice channel", "I am sending my last message.");
})

sub.on(`message`, (channel, message) => {
    console.log("sub channel " + channel + ": " + message);
    msg_count += 1;
    if (msg_count === 3) {
        // sub.unsubscribe();
        // sub.quit();
        // pub.quit();
    }
})

sub.subscribe("a nice channel");

setTimeout(() => {
    pub.publish(`a nice channel`, 'i am')
}, 1000);
