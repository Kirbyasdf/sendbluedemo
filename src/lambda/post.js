import axios from "axios";
export async function handler(event, context) {
  const reqBody = JSON.parse(event.body);

  try {
    const data = {
      number: process.env.NUMBER,
      content: `${reqBody.name} is coming to the party`,
    };

    const options = {
      headers: {
        "sb-api-key-id": process.env.BLUE_ID,
        "sb-api-secret-key": process.env.BLUE_KEY,
      },
    };

    const response = await axios.post("https://api.sendblue.co/api/send-message", data, options);

    return {
      statusCode: 200,
      body: JSON.stringify({ data: reqBody.name }),
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }), // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
}
