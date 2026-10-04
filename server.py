
from flask import Flask, request, jsonify, send_from_directory
import os
import requests
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__, static_folder=".", static_url_path="")


@app.route("/")
def home():
    return send_from_directory(".", "index.html")


@app.route("/api/discord-login", methods=["POST"])
def discord_login():
    data = request.get_json()

    if not data:
        return jsonify({
            "success": False,
            "error": "No data received"
        }), 400

    username = data.get("username", "Unknown user")

    webhook_url = os.getenv("DISCORD_WEBHOOK_URL")

    if not webhook_url:
        return jsonify({
            "success": False,
            "error": "Discord webhook is not configured"
        }), 500

    message = {
        "content": f"User logged into the Bloxburg Portal\nUsername: {username}"
    }

    try:
        response = requests.post(
            webhook_url,
            json=message,
            timeout=5
        )

        if response.status_code not in (200, 204):
            print("Discord webhook error:", response.status_code)
            print(response.text)

            return jsonify({
                "success": False,
                "error": "Discord webhook failed"
            }), 500

    except requests.RequestException as error:
        print("Discord connection error:", error)

        return jsonify({
            "success": False,
            "error": "Could not connect to Discord"
        }), 500

    print(f"Discord notification sent for: {username}")

    return jsonify({
        "success": True
    })


if __name__ == "__main__":
    app.run(debug=True)
