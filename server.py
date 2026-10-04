from flask import Flask, request, jsonify

app = Flask(__name__)


@app.route("/")
def home():
    return "Bloxburg Portal server is running!"


@app.route("/api/discord-login", methods=["POST"])
def discord_login():
    data = request.get_json()

    username = data.get("username", "Unknown user")

    print(f"Login detected: {username}")

    return jsonify({
        "success": True
    })


if __name__ == "__main__":
    app.run(debug=True)