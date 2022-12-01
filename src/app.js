const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

initializeApp({
  credential: cert({
    type: "service_account",
    project_id: "dynamic-677eb",
    private_key_id: "8d6a77fe98192cc81ccf8e2cf017af5d3fe8a6d5",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCWRRb8bG6H11+x\nix7mX4nf5S7WGwQbGFMoD9RhEQGqlLMySXFF7i8NWXpnUM+hvg+tHQVPXGAK66ph\nAhLDzxjL7ixTXyBdZVfwXGjm2qss8+73cRp4bkMLIjnAtFjpcOM3dFgYm4fKVhn5\nmBhZkiDxImwrxIgnuzeof7OLkd7JiX/mye6F/p3NYWzDC6xiME8QdFfmEtdSfbwf\nS0gypbbwuGy0ZGqnUv7U4ojFJOHb++CCStio/c4oURf8JgYeIhpgIUNlnqbVMIZQ\n4asNPMGBu5bHOkfzJ4A8NpzmKOSDyR8mbeOWQp/7fo5mdy0I71a9VJIZBHaGJrZ0\nbYglAPqpAgMBAAECggEADO3+71NJI2kVs8obq4jW7SvkHsoOTWKHbTAHfx6efRX0\nYUROecznwYdMb+1VID6hTKztkwmIvgfPDi/Ge5CrOojQyY+q0j5xFZ5t7EcuaVzH\n2ASkWW5rWF7mhz09VUDAXDonhl6DjZZg/8fleHeJXBYxJobvjDOgs1/hjAXOHJsV\nYhD2c+/IEzZEsxzMvpzozGlSajzQRjziLrMGuLn5TwsK/EJs+qeIsPCfniVYcVnO\nCR1c0vD04YXdI9B287z9eLsXr2QQVMJvuf83kUwl3wyU0jz6sj5nmDH6eCb8gp5w\nqAy2xaWWqzNzO8v7PEGNi+AcdhBhXiEZPtR2KGauTQKBgQDI6I5vgOVSAJvPFG/0\najHVxBpSax4O7jDO8OG18t7lhBlj2B56vIGXGc5EtTzalc3Z+0wpmj2uw/2GeUh0\nIBNNHIhpM7CUMOyA1nqtffGr4ErLwFS1UezoM013SkUfL2e/WgxcRvF7Lg2A6RIb\nhKwnpZs+pcrlv9Z6D7B8GqcVdwKBgQC/ecpXKjlNHeH+aH2r62OaJuSJ+NW1DMQI\nNk1cJVLHY/rIbUGRcKx7GCGKzYk13cxbSg1w5NAFIUj15qskwVz3xPTDvxWJUgPO\nb5mhD3cRTxFfQo8XotvPWQ7ME/JzIaxEw6XQv2N4Y9cWg0lrZObmBxQPwOiCoflI\nEGbtZyb43wKBgCLmy3+xW6UgN/EEcuJ55Ehndc8ljqY3WMFKdVt/YptqlGKU886M\nmtKeCAhFl9m9NnKMxlFf2yFWKN/Ih/6sZ834i/YCpcVIrn0/RTaIb4hVQYkd01lg\nbxBzgRydCV7+hD5orUcGiALHIE9prdyb8rA8g7ihYpsA9Yhk21rj4mzHAoGBAKnl\ngBOdpKB3nnpl7vSn9YXncqu1/rIaNKrwu+3CNFQ1s2U6BI7vgivq+oA15cTFHDn4\nWDrO3IFgymNenIcNh9dVjLVPjOV+v1/iCFgv57+U/94dqegYGqA97nJIVL2xqDCP\nxUaXO8SsGkKglXnUW0jKCRP9YJHg9NbrrtiBycPTAoGANiYlmEQZ07tD2J7cpl4t\nw3EkHT51Ep6k4DltlQ+QSc0HVISrSIDrFUisSPjy5+jBNs7YnVlPFo1OPgdyeR6i\ndZHL7MopgZMMIRx/IGqM3Q/jpk7V4dlxSMCfUomrrqnETJFvMWf5uxpwqNGTc0A/\nbmDoivgzYhma02hFmMAfg4c=\n-----END PRIVATE KEY-----\n",
    client_email:
      "firebase-adminsdk-v7n5l@dynamic-677eb.iam.gserviceaccount.com",
    client_id: "101476057576893537140",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-v7n5l%40dynamic-677eb.iam.gserviceaccount.com",
  }),
});

const db = getFirestore();

async function start() {
  const observer = db
    .collection("cities")
    .where("state", "==", "CA")
    .onSnapshot((querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          console.log("New city: ", change.doc.data());

          const res = db.collection("users").add({
            name: "Tokyo",
            country: "Japan",
          });
        }
        if (change.type === "modified") {
          console.log("Modified city: ", change.doc.data());
        }
        if (change.type === "removed") {
          console.log("Removed city: ", change.doc.data());
        }
      });
    });
}
console.log("sanid");
start();
