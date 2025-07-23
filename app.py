from flask import Flask, render_template, request, redirect, url_for
from datetime import datetime, timedelta
import json
import os

app = Flask(__name__)

ARQUIVO = "racoes.json"

def carregar_racoes():
    if os.path.exists(ARQUIVO):
        with open(ARQUIVO, "r") as f:
            return json.load(f)
    return []

def salvar_racoes(racoes):
    with open(ARQUIVO, "w") as f:
        json.dump(racoes, f, indent=4)

@app.route("/")
def index():
    racoes = carregar_racoes()
    return render_template("index.html", racoes=racoes)

@app.route("/adicionar", methods=["GET", "POST"])
def adicionar():
    if request.method == "POST":
        nome = request.form["nome"]
        quantidade = request.form["quantidade"]
        validade = request.form["validade"]

        racoes = carregar_racoes()
        racoes.append({
            "nome": nome,
            "quantidade": quantidade,
            "validade": validade
        })
        salvar_racoes(racoes)
        return redirect(url_for("index"))

    return render_template("adicionar.html")

@app.route("/vencidas")
def vencidas():
    hoje = datetime.now().date()
    racoes = carregar_racoes()
    vencidas = [r for r in racoes if datetime.strptime(r["validade"], "%Y-%m-%d").date() < hoje]
    return render_template("vencidas.html", racoes=vencidas)

@app.route("/proximas")
def proximas():
    hoje = datetime.now().date()
    limite = hoje + timedelta(days=7)
    racoes = carregar_racoes()
    proximas = [r for r in racoes if hoje <= datetime.strptime(r["validade"], "%Y-%m-%d").date() <= limite]
    return render_template("proximas.html", racoes=proximas)

if __name__ == "__main__":
    app.run(debug=True)
